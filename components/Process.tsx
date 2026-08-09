import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Audit",
    subtitle: "LENS & ANALYSIS",
    desc: "We analyze your current customer acquisition, conversion bottlenecks, sales pipeline leakage, and existing metrics to identify where growth is stuck."
  },
  {
    number: "02",
    title: "Custom Strategy & Roadmap",
    subtitle: "POSITIONING & BLUEPRINT",
    desc: "We architect a bespoke growth blueprint tailored to your unit economics — choosing the exact mix of ads, landing pages, and WhatsApp/CRM triggers needed."
  },
  {
    number: "03",
    title: "System Build & Creative",
    subtitle: "ARCHITECTURE & ASSETS",
    desc: "We write conversion-focused copy, design high-converting React landing pages, craft disruption ad creatives, and set up automated CRM workflows."
  },
  {
    number: "04",
    title: "Precision Launch",
    subtitle: "DEPLOYMENT & TRACKING",
    desc: "We deploy high-intent search campaigns and targeted Meta ad funnels, connecting analytics tracking for 100% lead attribution and speed."
  },
  {
    number: "05",
    title: "Optimize & Scale",
    subtitle: "COMPOUNDING & GROWTH",
    desc: "We continuously test ad variations, optimize landing page conversion rates, and refine WhatsApp nurture flows to lower your acquisition cost as budget scales."
  }
];

const PARTICLE_COUNT = 2200;

// ============================================================================
// 3D THREE.JS PROCEDURAL GEOMETRY CREATION & SURFACE POINT SAMPLING
// ============================================================================

// Helper to sample surface & interior points uniformly from any Three.js Group/Mesh
function samplePointsFromGroup(group: THREE.Group, totalPoints: number): THREE.Vector3[] {
  group.updateMatrixWorld(true);

  interface TriInfo {
    a: THREE.Vector3;
    b: THREE.Vector3;
    c: THREE.Vector3;
    cumArea: number;
  }

  const flatTriangles: TriInfo[] = [];
  let grandTotalArea = 0;

  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const geometry = mesh.geometry.clone();
      const posAttr = geometry.attributes.position;
      if (!posAttr) return;

      const indexAttr = geometry.index;
      const getVertex = (i: number) => {
        const v = new THREE.Vector3(
          posAttr.getX(i),
          posAttr.getY(i),
          posAttr.getZ(i)
        );
        v.applyMatrix4(mesh.matrixWorld);
        return v;
      };

      if (indexAttr) {
        for (let i = 0; i < indexAttr.count; i += 3) {
          const a = getVertex(indexAttr.getX(i));
          const b = getVertex(indexAttr.getX(i + 1));
          const c = getVertex(indexAttr.getX(i + 2));

          const edge1 = new THREE.Vector3().subVectors(b, a);
          const edge2 = new THREE.Vector3().subVectors(c, a);
          const area = 0.5 * new THREE.Vector3().crossVectors(edge1, edge2).length();

          if (area > 0.000001) {
            grandTotalArea += area;
            flatTriangles.push({ a, b, c, cumArea: grandTotalArea });
          }
        }
      } else {
        for (let i = 0; i < posAttr.count; i += 3) {
          const a = getVertex(i);
          const b = getVertex(i + 1);
          const c = getVertex(i + 2);

          const edge1 = new THREE.Vector3().subVectors(b, a);
          const edge2 = new THREE.Vector3().subVectors(c, a);
          const area = 0.5 * new THREE.Vector3().crossVectors(edge1, edge2).length();

          if (area > 0.000001) {
            grandTotalArea += area;
            flatTriangles.push({ a, b, c, cumArea: grandTotalArea });
          }
        }
      }
    }
  });

  const points: THREE.Vector3[] = [];
  if (grandTotalArea === 0 || flatTriangles.length === 0) {
    for (let i = 0; i < totalPoints; i++) {
      points.push(new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5));
    }
    return points;
  }

  for (let i = 0; i < totalPoints; i++) {
    const r = Math.random() * grandTotalArea;
    let low = 0;
    let high = flatTriangles.length - 1;
    let selectedIdx = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (flatTriangles[mid].cumArea >= r) {
        selectedIdx = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    const tri = flatTriangles[selectedIdx];
    const r1 = Math.sqrt(Math.random());
    const r2 = Math.random();

    const u = 1 - r1;
    const v = r1 * (1 - r2);
    const w = r1 * r2;

    const pt = new THREE.Vector3(
      u * tri.a.x + v * tri.b.x + w * tri.c.x,
      u * tri.a.y + v * tri.b.y + w * tri.c.y,
      u * tri.a.z + v * tri.b.z + w * tri.c.z
    );

    // 12% subtle volumetric depth offset for rich tactile density
    if (Math.random() < 0.12) {
      const shrink = 0.70 + Math.random() * 0.28;
      pt.multiplyScalar(shrink);
    }

    points.push(pt);
  }

  return points;
}

// 01: DISCOVERY & AUDIT — 3D Volumetric Magnifying Glass
function createMagnifyingGlassMesh(): THREE.Group {
  const group = new THREE.Group();

  // Outer Lens Torus Rim
  const rimGeo = new THREE.TorusGeometry(0.58, 0.09, 24, 48);
  const rimMesh = new THREE.Mesh(rimGeo);
  rimMesh.position.set(-0.16, 0.16, 0);
  group.add(rimMesh);

  // Glass Convex Disk Lens
  const lensGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.12, 36);
  const lensMesh = new THREE.Mesh(lensGeo);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.set(-0.16, 0.16, 0);
  group.add(lensMesh);

  // Handle Connector Ferrule
  const connGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 20);
  const connMesh = new THREE.Mesh(connGeo);
  connMesh.position.set(0.24, -0.24, 0);
  connMesh.rotation.z = -Math.PI / 4;
  group.add(connMesh);

  // Main Cylindrical Handle
  const handleGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.85, 24);
  const handleMesh = new THREE.Mesh(handleGeo);
  handleMesh.position.set(0.60, -0.60, 0);
  handleMesh.rotation.z = -Math.PI / 4;
  group.add(handleMesh);

  return group;
}

// 02: CUSTOM STRATEGY & ROADMAP — 3D Staunton Chess King
function createChessKingMesh(): THREE.Group {
  const group = new THREE.Group();

  // 1. Tiered Pedestal Base
  const base1 = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.58, 0.12, 36));
  base1.position.set(0, -0.68, 0);
  group.add(base1);

  const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.10, 36));
  base2.position.set(0, -0.57, 0);
  group.add(base2);

  const base3 = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.05, 16, 36));
  base3.rotation.x = Math.PI / 2;
  base3.position.set(0, -0.50, 0);
  group.add(base3);

  // 2. Pedestal Waist (Concave body)
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 0.32, 36));
  pedestal.position.set(0, -0.30, 0);
  group.add(pedestal);

  const midRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.045, 16, 36));
  midRing.rotation.x = Math.PI / 2;
  midRing.position.set(0, -0.12, 0);
  group.add(midRing);

  // 3. Upper Torso Chest
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.34, 36));
  torso.position.set(0, 0.07, 0);
  group.add(torso);

  const shoulderRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 16, 36));
  shoulderRing.rotation.x = Math.PI / 2;
  shoulderRing.position.set(0, 0.26, 0);
  group.add(shoulderRing);

  // 4. Flared Crown Cup
  const crownCup = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.26, 0.28, 36));
  crownCup.position.set(0, 0.42, 0);
  group.add(crownCup);

  const crownDome = new THREE.Mesh(new THREE.SphereGeometry(0.20, 24, 24));
  crownDome.position.set(0, 0.54, 0);
  group.add(crownDome);

  // 5. Iconic King's Cross on Top
  const crossVert = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.08));
  crossVert.position.set(0, 0.74, 0);
  group.add(crossVert);

  const crossHoriz = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.08));
  crossHoriz.position.set(0, 0.78, 0);
  group.add(crossHoriz);

  return group;
}

// 03: SYSTEM BUILD & CREATIVE — 3D Interconnected Framework
function createArchitecturalSystemMesh(): THREE.Group {
  const group = new THREE.Group();

  // Central Architectural Core Cube
  const coreMesh = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44));
  coreMesh.rotation.y = Math.PI / 4;
  group.add(coreMesh);

  // Outer Node Cubes & Spheres at 3D offsets
  const nodeOffsets: [number, number, number, boolean][] = [
    [-0.58, 0, 0, true], [0.58, 0, 0, true],
    [0, -0.58, 0, true], [0, 0.58, 0, true],
    [0, 0, -0.58, false], [0, 0, 0.58, false],
    [-0.42, 0.42, 0.42, false], [0.42, 0.42, -0.42, false],
    [-0.42, -0.42, -0.42, false], [0.42, -0.42, 0.42, false]
  ];

  nodeOffsets.forEach(([x, y, z, isBox]) => {
    const nodeGeo = isBox ? new THREE.BoxGeometry(0.22, 0.22, 0.22) : new THREE.SphereGeometry(0.14, 18, 18);
    const nodeMesh = new THREE.Mesh(nodeGeo);
    nodeMesh.position.set(x, y, z);
    group.add(nodeMesh);

    // Connector Beams to Core
    const len = Math.sqrt(x*x + y*y + z*z);
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, len, 14);
    const beamMesh = new THREE.Mesh(beamGeo);
    beamMesh.position.set(x/2, y/2, z/2);
    beamMesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(x, y, z).normalize()
    );
    group.add(beamMesh);
  });

  return group;
}

// 04: PRECISION LAUNCH — 3D Rocket
function createRocketMesh(): THREE.Group {
  const group = new THREE.Group();

  // Streamlined Cylinder Fuselage
  const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.85, 32));
  bodyMesh.position.set(0, -0.05, 0);
  group.add(bodyMesh);

  // Aerodynamic Nose Cone
  const noseMesh = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.55, 32));
  noseMesh.position.set(0, 0.65, 0);
  group.add(noseMesh);

  // Engine Nozzle
  const nozzleMesh = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.24, 24));
  nozzleMesh.rotation.x = Math.PI;
  nozzleMesh.position.set(0, -0.59, 0);
  group.add(nozzleMesh);

  // 4 Swept-back 3D Fins
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0.35, -0.28);
    finShape.lineTo(0.35, -0.50);
    finShape.lineTo(0, -0.35);
    finShape.closePath();

    const finGeo = new THREE.ExtrudeGeometry(finShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSize: 0.015,
      bevelThickness: 0.015
    });
    finGeo.center();

    const finMesh = new THREE.Mesh(finGeo);
    finMesh.position.set(Math.cos(angle) * 0.30, -0.32, Math.sin(angle) * 0.30);
    finMesh.rotation.y = -angle + Math.PI / 2;
    group.add(finMesh);
  }

  // Thruster Plume
  const plumeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.48, 24));
  plumeMesh.rotation.x = Math.PI;
  plumeMesh.position.set(0, -0.92, 0);
  group.add(plumeMesh);

  return group;
}

// 05: OPTIMIZE & SCALE — 3D Upward Growth Arrow & Bar Chart
function createGrowthArrowMesh(): THREE.Group {
  const group = new THREE.Group();

  // 4 3D Bar Chart Columns
  const colXs = [-0.52, -0.25, 0.02, 0.29];
  const colHeights = [0.28, 0.48, 0.68, 0.92];

  colXs.forEach((cx, idx) => {
    const h = colHeights[idx];
    const colMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, h, 0.18));
    colMesh.position.set(cx, -0.52 + h / 2, 0);
    group.add(colMesh);
  });

  // 3D Angled Upward Arrow Shaft
  const shaftMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.45, 0.16));
  shaftMesh.rotation.z = -Math.PI / 3.8;
  shaftMesh.position.set(-0.02, 0.05, 0.14);
  group.add(shaftMesh);

  // 3D Pyramid Arrowhead
  const headMesh = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.58, 4));
  headMesh.rotation.z = -Math.PI / 3.8;
  headMesh.position.set(0.58, 0.62, 0.14);
  group.add(headMesh);

  return group;
}

const Process: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndexRef = useRef<number>(0);
  const morphStartTimeRef = useRef<number>(0);

  // References to hold Three.js objects across renders
  const targetPointSetsRef = useRef<THREE.Vector3[][]>([]);
  const startPositionsRef = useRef<Float32Array | null>(null);

  // Pre-generate all 5 3D point target arrays once
  if (targetPointSetsRef.current.length === 0) {
    targetPointSetsRef.current = [
      samplePointsFromGroup(createMagnifyingGlassMesh(), PARTICLE_COUNT),
      samplePointsFromGroup(createChessKingMesh(), PARTICLE_COUNT),
      samplePointsFromGroup(createArchitecturalSystemMesh(), PARTICLE_COUNT),
      samplePointsFromGroup(createRocketMesh(), PARTICLE_COUNT),
      samplePointsFromGroup(createGrowthArrowMesh(), PARTICLE_COUNT)
    ];
  }

  // Handle stage change
  useEffect(() => {
    activeIndexRef.current = activeIndex;
    morphStartTimeRef.current = performance.now();
  }, [activeIndex]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // 2. BufferGeometry Initialization
    const initialPoints = targetPointSetsRef.current[0];
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const startPositions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pt = initialPoints[i];
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;

      startPositions[i * 3] = pt.x;
      startPositions[i * 3 + 1] = pt.y;
      startPositions[i * 3 + 2] = pt.z;

      sizes[i] = 1.6 + Math.random() * 2.0;
      seeds[i] = Math.random() * Math.PI * 2;
    }

    startPositionsRef.current = startPositions;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    // 3. Shader Material for Crisp Point-Cloud Particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uColor: { value: new THREE.Color('#F8F8F6') }
      },
      vertexShader: `
        uniform float uPixelRatio;
        attribute float aSize;
        varying float vDepth;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Depth-aware size attenuation (~40% larger for clean continuous form)
          gl_PointSize = aSize * uPixelRatio * (4.2 / -mvPosition.z);
          vDepth = mvPosition.z;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vDepth;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.08, dist);
          
          // Depth shading (closer = brighter, further = slightly softer)
          float depthFactor = clamp((-vDepth - 1.2) / 3.0, 0.35, 1.0);
          gl_FragColor = vec4(uColor, alpha * depthFactor * 0.95);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particleGroup = new THREE.Group();
    // Slight pitch tilt (10 deg) so 3D depth and tops of objects are visible
    particleGroup.rotation.x = 0.18;

    const particleSystem = new THREE.Points(geometry, material);
    particleGroup.add(particleSystem);
    scene.add(particleGroup);

    // 4. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / (height || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 5. Morphing & Render Loop
    let animId: number;
    const MORPH_DURATION = 1400; // ms
    let prevActiveIndex = 0;

    const render = (now: number) => {
      const currentActiveIndex = activeIndexRef.current;

      // If stage index changed, snapshot current positions as startPositions
      if (currentActiveIndex !== prevActiveIndex) {
        const posAttr = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
          startPositions[i] = posAttr[i];
        }
        prevActiveIndex = currentActiveIndex;
      }

      const elapsed = now - morphStartTimeRef.current;
      const morphProgress = Math.min(Math.max(elapsed / MORPH_DURATION, 0), 1);
      
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - morphProgress, 3);
      const transitAmount = Math.sin(morphProgress * Math.PI);

      const posAttr = geometry.attributes.position.array as Float32Array;
      const targetPoints = targetPointSetsRef.current[currentActiveIndex];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx3 = i * 3;
        const targetPt = targetPoints[i];

        const startX = startPositions[idx3];
        const startY = startPositions[idx3 + 1];
        const startZ = startPositions[idx3 + 2];

        // Organic 3D fluid swirl offset during particle reorganization
        const swirlAngle = seeds[i] + morphProgress * Math.PI * 2.2;
        const swirlX = Math.sin(swirlAngle) * 0.08 * transitAmount;
        const swirlY = Math.cos(swirlAngle) * 0.08 * transitAmount;
        const swirlZ = Math.sin(swirlAngle * 1.4) * 0.08 * transitAmount;

        posAttr[idx3] = startX + (targetPt.x - startX) * ease + swirlX;
        posAttr[idx3 + 1] = startY + (targetPt.y - startY) * ease + swirlY;
        posAttr[idx3 + 2] = startZ + (targetPt.z - startZ) * ease + swirlZ;
      }

      geometry.attributes.position.needsUpdate = true;

      // Smooth continuous 3D rotation around Y axis (1 full 360° turn every ~10 seconds)
      particleGroup.rotation.y += 0.0085;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      id="process" 
      className="py-24 sm:py-32 bg-[#000000] text-[#F5F5F2] relative z-10 scroll-mt-12 border-t border-white/10 overflow-hidden select-none"
    >
      {/* Oversized Subtle Background Typography */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <span className="text-[23vw] font-heading font-serif uppercase tracking-[-0.07em] leading-none text-white/[0.04] whitespace-nowrap select-none">
          PROCESS
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Intro Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-gray-400 mb-4"
          >
            // THE PROCESS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-serif font-normal uppercase tracking-tighter text-white leading-[0.95] mb-6"
          >
            HOW WE BUILD<br />
            <span className="text-gray-400 italic font-serif">SYSTEMS THAT GROW.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-400 font-body font-light leading-relaxed max-w-2xl"
          >
            Every engagement follows a deliberate process. We understand the business first, build the right system around it, launch with intent, and continuously refine what works.
          </motion.p>
        </div>

        {/* Main Two Column Layout: Process List (Left) + Three.js Canvas (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Process List (approx 45% width) */}
          <div className="lg:col-span-5 space-y-2">
            
            {/* Stage Counter Label */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-gray-400">
              <span>STAGE SELECTION</span>
              <span className="text-white font-medium">
                [ 0{activeIndex + 1} / 05 ]
              </span>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-white/15 border-b border-white/15">
              {processSteps.map((step, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveIndex(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`process-panel-${idx}`}
                    className={`w-full text-left py-6 sm:py-7 transition-all duration-300 group focus:outline-none cursor-pointer flex flex-col justify-center relative ${
                      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300 ${
                      isActive ? 'bg-white' : 'bg-transparent'
                    }`} />

                    <div className="flex items-center justify-between gap-4 pl-3">
                      <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                        <span className={`font-mono text-xs sm:text-sm uppercase tracking-widest shrink-0 transition-colors ${
                          isActive ? 'text-white font-semibold' : 'text-gray-500'
                        }`}>
                          {step.number}
                        </span>

                        <h3 className={`text-lg sm:text-xl lg:text-2xl font-body font-normal tracking-[-0.01em] transition-colors leading-snug ${
                          isActive ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      <span className={`text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase shrink-0 transition-colors ${
                        isActive ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {step.subtitle}
                      </span>
                    </div>

                    {/* Animated Expandable Description for Active Item */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`process-panel-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pl-3"
                        >
                          <p className="pt-3 sm:pt-4 text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-lg">
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Interactive Three.js WebGL Particle System Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] rounded-xs border border-white/10 bg-black/50 backdrop-blur-xs p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden">
              
              {/* Corner Watermark Details */}
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 z-10 pointer-events-none">
                <span>[ STAGE 0{activeIndex + 1} — FORMATION ]</span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  THREE.JS WEBGL SYSTEM
                </span>
              </div>

              {/* Main Three.js Container */}
              <div 
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center my-auto pointer-events-none overflow-hidden"
              />

              {/* Bottom Technical Subtitle Watermark */}
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 z-10 pointer-events-none pt-2 border-t border-white/5">
                <span>{processSteps[activeIndex].title}</span>
                <span className="text-gray-600">2200 3D NODES // ROTATION ACTIVE</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
