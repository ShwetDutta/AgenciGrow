import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color = '#7B7481',
  noiseIntensity = 1.5,
  rotation = 0,
  style = {},
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const parseColor = (colStr: string) => {
      try {
        return new THREE.Color(colStr);
      } catch {
        return new THREE.Color('#7B7481');
      }
    };

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uColor: { value: parseColor(color) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uRotation: { value: rotation },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor;
      uniform float uSpeed;
      uniform float uScale;
      uniform float uNoiseIntensity;
      uniform float uRotation;

      varying vec2 vUv;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float silkHeight(vec2 p, float time) {
        vec2 q = p * uScale * 1.8;
        float w1 = sin(q.x * 1.5 + q.y * 2.0 + time * 0.8);
        float w2 = cos(q.x * 2.2 - q.y * 1.8 - time * 0.6);
        float w3 = sin(q.x * 3.8 + q.y * 3.2 + time * 1.1);
        
        float n1 = snoise(q * 1.1 + vec2(time * 0.15, -time * 0.12));
        float n2 = snoise(q * 2.5 - vec2(time * 0.2, time * 0.2));
        
        return (w1 * 0.35 + w2 * 0.25 + w3 * 0.15 + n1 * 0.3 + n2 * 0.15) * uNoiseIntensity;
      }

      void main() {
        vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
        
        float rad = uRotation * 3.14159265359 / 180.0;
        mat2 rot = mat2(cos(rad), -sin(rad), sin(rad), cos(rad));
        st = rot * st;

        float time = uTime * (uSpeed * 0.15);
        
        float eps = 0.004;
        float hCenter = silkHeight(st, time);
        float hRight  = silkHeight(st + vec2(eps, 0.0), time);
        float hUp     = silkHeight(st + vec2(0.0, eps), time);
        
        vec3 normal = normalize(vec3(
          (hCenter - hRight) / eps,
          (hCenter - hUp) / eps,
          1.0
        ));
        
        vec3 lightDir1 = normalize(vec3(0.5, 0.8, 0.9));
        vec3 lightDir2 = normalize(vec3(-0.6, -0.5, 0.7));
        vec3 viewDir  = vec3(0.0, 0.0, 1.0);
        
        float diff1 = max(dot(normal, lightDir1), 0.0);
        float diff2 = max(dot(normal, lightDir2), 0.0);
        
        vec3 halfDir1 = normalize(lightDir1 + viewDir);
        float spec1 = pow(max(dot(normal, halfDir1), 0.0), 28.0);
        
        vec3 halfDir2 = normalize(lightDir2 + viewDir);
        float spec2 = pow(max(dot(normal, halfDir2), 0.0), 14.0);
        
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
        
        vec3 baseColor = uColor;
        vec3 highlightColor = mix(baseColor, vec3(0.95, 0.95, 1.0), 0.65);
        vec3 shadowColor = baseColor * 0.25;
        
        vec3 finalColor = shadowColor;
        finalColor += baseColor * (diff1 * 0.65 + diff2 * 0.35);
        finalColor += highlightColor * (spec1 * 0.75 + spec2 * 0.45);
        finalColor += baseColor * fresnel * 0.35;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: false,
      });
    } catch (e) {
      console.warn('Silk: WebGL context creation failed or is unsupported.', e);
      geometry.dispose();
      material.dispose();
      return;
    }

    if (!renderer.getContext()) {
      console.warn('Silk: WebGL context is null.');
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const clock = new THREE.Clock();

    const animate = () => {
      const gl = renderer.getContext();
      if (gl && gl.isContextLost()) return;
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      }
      try {
        renderer.render(scene, camera);
      } catch (e) {
        return;
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !materialRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      try {
        rendererRef.current.setSize(w, h);
        materialRef.current.uniforms.uResolution.value.set(w, h);
      } catch (e) {}
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      resizeObserver.disconnect();
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener('webglcontextlost', handleContextLost);
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;
    const uniforms = materialRef.current.uniforms;
    try {
      uniforms.uColor.value = new THREE.Color(color);
    } catch {
      // fallback
    }
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    uniforms.uRotation.value = rotation;
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ minWidth: '100%', minHeight: '100%', ...style }}
    />
  );
};

export default Silk;
