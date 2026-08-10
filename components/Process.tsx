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

const WIRE_SEGMENTS_COUNT = 1400;

interface LineSegment {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

// ============================================================================
// 3D THREE.JS PROCEDURAL GEOMETRY & WIREFRAME LINE SAMPLING SYSTEM
// ============================================================================

function sampleLineSegmentsFromGroup(group: THREE.Group, totalSegments: number): LineSegment[] {
  group.updateMatrixWorld(true);

  interface RawEdge {
    a: THREE.Vector3;
    b: THREE.Vector3;
    len: number;
    cumLen: number;
  }

  const rawEdges: RawEdge[] = [];
  let totalLength = 0;

  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (!mesh.geometry) return;

      const wireGeo = new THREE.WireframeGeometry(mesh.geometry);
      const posAttr = wireGeo.attributes.position;
      if (!posAttr) return;

      for (let i = 0; i < posAttr.count; i += 2) {
        const a = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
        const b = new THREE.Vector3(posAttr.getX(i + 1), posAttr.getY(i + 1), posAttr.getZ(i + 1));

        a.applyMatrix4(mesh.matrixWorld);
        b.applyMatrix4(mesh.matrixWorld);

        const len = a.distanceTo(b);
        if (len > 0.0001) {
          totalLength += len;
          rawEdges.push({ a, b, len, cumLen: totalLength });
        }
      }
      wireGeo.dispose();
    }
  });

  const segments: LineSegment[] = [];

  if (rawEdges.length === 0 || totalLength === 0) {
    for (let i = 0; i < totalSegments; i++) {
      const p1 = new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5);
      const p2 = p1.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2));
      segments.push({ start: p1, end: p2 });
    }
    return segments;
  }

  // 1. If rawEdges fit inside totalSegments, take all and subdivide remaining
  if (rawEdges.length <= totalSegments) {
    for (let i = 0; i < rawEdges.length; i++) {
      segments.push({ start: rawEdges[i].a.clone(), end: rawEdges[i].b.clone() });
    }

    const remaining = totalSegments - segments.length;
    for (let i = 0; i < remaining; i++) {
      const r = Math.random() * totalLength;
      let low = 0;
      let high = rawEdges.length - 1;
      let selectedIdx = 0;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (rawEdges[mid].cumLen >= r) {
          selectedIdx = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      const edge = rawEdges[selectedIdx];
      const t1 = Math.random() * 0.5;
      const t2 = t1 + 0.5;
      const p1 = new THREE.Vector3().lerpVectors(edge.a, edge.b, t1);
      const p2 = new THREE.Vector3().lerpVectors(edge.a, edge.b, t2);
      segments.push({ start: p1, end: p2 });
    }
  } else {
    // Uniformly stride across rawEdges so EVERY child mesh (lens, rim, handle, rings, pommel) is represented
    const step = rawEdges.length / totalSegments;
    for (let i = 0; i < totalSegments; i++) {
      const idx = Math.min(Math.floor(i * step), rawEdges.length - 1);
      segments.push({ start: rawEdges[idx].a.clone(), end: rawEdges[idx].b.clone() });
    }
  }

  return segments;
}

// 01: DISCOVERY & AUDIT — 3D Volumetric Optical Magnifying Glass
function createMagnifyingGlassMesh(): THREE.Group {
  const group = new THREE.Group();
  
  // Position lens in upper-left quadrant so the handle extends down-right naturally centered
  const lensCenter = new THREE.Vector3(-0.16, 0.20, 0);

  // 1. Primary Outer Torus Rim (Generates thick rounded 3D rim outline)
  const rimOuter = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.065, 12, 28));
  rimOuter.position.copy(lensCenter);
  group.add(rimOuter);

  // 2. Inner Aperture Bevel Ring (Defines inner lens frame edge)
  const rimInner = new THREE.Mesh(new THREE.TorusGeometry(0.40, 0.03, 10, 28));
  rimInner.position.copy(lensCenter);
  group.add(rimInner);

  // 3. Outer Cylindrical Shell Wall (Provides 3D depth quads along Z-axis)
  const frameCylOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.545, 0.545, 0.13, 28, 2, true));
  frameCylOuter.rotation.x = Math.PI / 2;
  frameCylOuter.position.copy(lensCenter);
  group.add(frameCylOuter);

  // 4. Inner Cylindrical Aperture Wall (Internal 3D depth quads)
  const frameCylInner = new THREE.Mesh(new THREE.CylinderGeometry(0.395, 0.395, 0.13, 28, 2, true));
  frameCylInner.rotation.x = Math.PI / 2;
  frameCylInner.position.copy(lensCenter);
  group.add(frameCylInner);

  // 5. Connecting Ferrule Collar (-45 degree angle towards bottom right)
  const angle = -Math.PI / 4;
  const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0); // (0.7071, -0.7071, 0)
  
  const ferrulePos = lensCenter.clone().add(dir.clone().multiplyScalar(0.48));
  const ferruleCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.18, 16, 2));
  ferruleCyl.position.copy(ferrulePos);
  ferruleCyl.rotation.z = angle + Math.PI / 2;
  group.add(ferruleCyl);

  const ferruleRing = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.02, 8, 16));
  ferruleRing.position.copy(ferrulePos);
  ferruleRing.rotation.z = angle + Math.PI / 2;
  ferruleRing.rotation.x = Math.PI / 2;
  group.add(ferruleRing);

  // 6. Main Cylindrical Handle
  const handleLength = 0.84;
  const handlePos = ferrulePos.clone().add(dir.clone().multiplyScalar(0.09 + handleLength / 2));
  const handleCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, handleLength, 16, 6));
  handleCyl.position.copy(handlePos);
  handleCyl.rotation.z = angle + Math.PI / 2;
  group.add(handleCyl);

  // 7. Handle Structural Accent Rings & End Cap
  const ringDistances = [0.25, 0.50, 0.75];
  ringDistances.forEach((fraction) => {
    const ringPos = ferrulePos.clone().add(dir.clone().multiplyScalar(0.09 + handleLength * fraction));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.082, 0.015, 8, 16));
    ring.position.copy(ringPos);
    ring.rotation.z = angle + Math.PI / 2;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
  });

  const capPos = ferrulePos.clone().add(dir.clone().multiplyScalar(0.09 + handleLength));
  const baseCap = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.04, 16));
  baseCap.position.copy(capPos);
  baseCap.rotation.z = angle + Math.PI / 2;
  group.add(baseCap);

  return group;
}

// 02: CUSTOM STRATEGY & ROADMAP — 3D Staunton Chess King
function createChessKingMesh(): THREE.Group {
  const group = new THREE.Group();

  // Tiered Pedestal Base
  const base1 = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.58, 0.12, 28));
  base1.position.set(0, -0.68, 0);
  group.add(base1);

  const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.10, 28));
  base2.position.set(0, -0.57, 0);
  group.add(base2);

  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.04, 12, 28));
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.set(0, -0.50, 0);
  group.add(baseRing);

  // Pedestal Waist
  const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 0.32, 28));
  waist.position.set(0, -0.30, 0);
  group.add(waist);

  const midRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 12, 28));
  midRing.rotation.x = Math.PI / 2;
  midRing.position.set(0, -0.12, 0);
  group.add(midRing);

  // Torso Chest
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.34, 28));
  torso.position.set(0, 0.07, 0);
  group.add(torso);

  const shoulderRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.04, 12, 28));
  shoulderRing.rotation.x = Math.PI / 2;
  shoulderRing.position.set(0, 0.26, 0);
  group.add(shoulderRing);

  // Crown Cup & Dome
  const crownCup = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.26, 0.28, 28));
  crownCup.position.set(0, 0.42, 0);
  group.add(crownCup);

  const crownDome = new THREE.Mesh(new THREE.SphereGeometry(0.20, 20, 20));
  crownDome.position.set(0, 0.54, 0);
  group.add(crownDome);

  const crownRim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 12, 24));
  crownRim.rotation.x = Math.PI / 2;
  crownRim.position.set(0, 0.64, 0);
  group.add(crownRim);

  // Iconic King's 3D Cross
  const crossVert = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.08));
  crossVert.position.set(0, 0.77, 0);
  group.add(crossVert);

  const crossHoriz = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.08));
  crossHoriz.position.set(0, 0.81, 0);
  group.add(crossHoriz);

  return group;
}

// 03: SYSTEM BUILD & CREATIVE — 3D Interconnected Architectural System
function createArchitecturalSystemMesh(): THREE.Group {
  const group = new THREE.Group();

  // Central Core 3D Cube
  const coreBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42));
  coreBox.rotation.x = Math.PI / 6;
  coreBox.rotation.y = Math.PI / 4;
  group.add(coreBox);

  // Inner Core Sphere
  const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.20, 16, 16));
  group.add(coreSphere);

  // 6 Primary Axial Spherical Nodes
  const axialNodes: THREE.Vector3[] = [
    new THREE.Vector3(0.68, 0, 0),
    new THREE.Vector3(-0.68, 0, 0),
    new THREE.Vector3(0, 0.68, 0),
    new THREE.Vector3(0, -0.68, 0),
    new THREE.Vector3(0, 0, 0.68),
    new THREE.Vector3(0, 0, -0.68)
  ];

  // 8 Diagonal Corner Spherical Nodes
  const cubeNodes: THREE.Vector3[] = [
    new THREE.Vector3(0.42, 0.42, 0.42),
    new THREE.Vector3(-0.42, 0.42, 0.42),
    new THREE.Vector3(0.42, -0.42, 0.42),
    new THREE.Vector3(-0.42, -0.42, 0.42),
    new THREE.Vector3(0.42, 0.42, -0.42),
    new THREE.Vector3(-0.42, 0.42, -0.42),
    new THREE.Vector3(0.42, -0.42, -0.42),
    new THREE.Vector3(-0.42, -0.42, -0.42)
  ];

  const allNodes = [...axialNodes, ...cubeNodes];

  // Add Sphere meshes for each node
  allNodes.forEach((pos) => {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14));
    sphere.position.copy(pos);
    group.add(sphere);

    // Beams connecting node to center
    const len = pos.length();
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, len, 10));
    beam.position.copy(pos.clone().multiplyScalar(0.5));
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      pos.clone().normalize()
    );
    group.add(beam);
  });

  // Perimeter connecting beams between axial nodes
  const outerBeams: [number, number][] = [
    [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 4], [2, 5], [3, 4], [3, 5]
  ];

  outerBeams.forEach(([i, j]) => {
    const p1 = axialNodes[i];
    const p2 = axialNodes[j];
    const dir = new THREE.Vector3().subVectors(p2, p1);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, len, 10));
    beam.position.copy(mid);
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize()
    );
    group.add(beam);
  });

  return group;
}

// 04: PRECISION LAUNCH — 3D Rocket with Porthole Window
function createRocketMesh(): THREE.Group {
  const group = new THREE.Group();

  // Cylindrical Fuselage
  const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.85, 28));
  bodyMesh.position.set(0, -0.05, 0);
  group.add(bodyMesh);

  // Aerodynamic Nose Cone
  const noseMesh = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.58, 28));
  noseMesh.position.set(0, 0.665, 0);
  group.add(noseMesh);

  // ICONIC PORTHOLE WINDOW
  const portholeFrame = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 12, 24));
  portholeFrame.position.set(0, 0.15, 0.28);
  group.add(portholeFrame);

  const portholeGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 20));
  portholeGlass.rotation.x = Math.PI / 2;
  portholeGlass.position.set(0, 0.15, 0.27);
  group.add(portholeGlass);

  // Body Belt Ring
  const bodyRing = new THREE.Mesh(new THREE.TorusGeometry(0.285, 0.025, 10, 28));
  bodyRing.rotation.x = Math.PI / 2;
  bodyRing.position.set(0, -0.15, 0);
  group.add(bodyRing);

  // Engine Nozzle
  const nozzleMesh = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.26, 24));
  nozzleMesh.rotation.x = Math.PI;
  nozzleMesh.position.set(0, -0.60, 0);
  group.add(nozzleMesh);

  // 4 Swept 3D Fins
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0.38, -0.30);
    finShape.lineTo(0.38, -0.52);
    finShape.lineTo(0, -0.38);
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

  // Thruster Plume Flame
  const plumeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.48, 20));
  plumeMesh.rotation.x = Math.PI;
  plumeMesh.position.set(0, -0.92, 0);
  group.add(plumeMesh);

  return group;
}

// 05: OPTIMIZE & SCALE — 3D Exponential Growth Chart & Upward Arrow
function createGrowthArrowMesh(): THREE.Group {
  const group = new THREE.Group();

  // 5 Rising 3D Bar Chart Columns forming a curved graph
  const colXs = [-0.58, -0.34, -0.10, 0.14, 0.38];
  const colHeights = [0.18, 0.30, 0.48, 0.72, 1.02];

  colXs.forEach((cx, idx) => {
    const h = colHeights[idx];
    const colMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, h, 0.22));
    colMesh.position.set(cx, -0.58 + h / 2, 0);
    group.add(colMesh);
  });

  // Base Foundation Plate
  const basePlate = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.08, 0.30));
  basePlate.position.set(-0.10, -0.62, 0);
  group.add(basePlate);

  // 3D Angled Upward Arrow Shaft
  const shaftMesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.48, 0.20));
  shaftMesh.rotation.z = -Math.PI / 3.6;
  shaftMesh.position.set(-0.02, 0.08, 0.12);
  group.add(shaftMesh);

  // 3D Pyramid Arrowhead
  const headMesh = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.62, 4));
  headMesh.rotation.z = -Math.PI / 3.6;
  headMesh.position.set(0.58, 0.64, 0.12);
  group.add(headMesh);

  return group;
}

const Process: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndexRef = useRef<number>(0);
  const morphStartTimeRef = useRef<number>(0);

  // References to hold Three.js objects across renders
  const targetSegmentSetsRef = useRef<LineSegment[][]>([]);
  const startPositionsRef = useRef<Float32Array | null>(null);

  // Pre-generate all 5 3D wireframe line segment target sets once
  if (targetSegmentSetsRef.current.length === 0) {
    targetSegmentSetsRef.current = [
      sampleLineSegmentsFromGroup(createMagnifyingGlassMesh(), WIRE_SEGMENTS_COUNT),
      sampleLineSegmentsFromGroup(createChessKingMesh(), WIRE_SEGMENTS_COUNT),
      sampleLineSegmentsFromGroup(createArchitecturalSystemMesh(), WIRE_SEGMENTS_COUNT),
      sampleLineSegmentsFromGroup(createRocketMesh(), WIRE_SEGMENTS_COUNT),
      sampleLineSegmentsFromGroup(createGrowthArrowMesh(), WIRE_SEGMENTS_COUNT)
    ];
  }

  // Handle stage change
  useEffect(() => {
    activeIndexRef.current = activeIndex;
    morphStartTimeRef.current = performance.now();
  }, [activeIndex]);

  // Optional automatic stage cycling every 7 seconds if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % processSteps.length);
    }, 7000);
    return () => clearInterval(timer);
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

    // 2. BufferGeometry Initialization for LineSegments
    const initialSegments = targetSegmentSetsRef.current[0];
    const positions = new Float32Array(WIRE_SEGMENTS_COUNT * 6);
    const startPositions = new Float32Array(WIRE_SEGMENTS_COUNT * 6);

    for (let i = 0; i < WIRE_SEGMENTS_COUNT; i++) {
      const seg = initialSegments[i];
      const idx = i * 6;

      positions[idx] = seg.start.x;
      positions[idx + 1] = seg.start.y;
      positions[idx + 2] = seg.start.z;
      positions[idx + 3] = seg.end.x;
      positions[idx + 4] = seg.end.y;
      positions[idx + 5] = seg.end.z;

      startPositions[idx] = seg.start.x;
      startPositions[idx + 1] = seg.start.y;
      startPositions[idx + 2] = seg.start.z;
      startPositions[idx + 3] = seg.end.x;
      startPositions[idx + 4] = seg.end.y;
      startPositions[idx + 5] = seg.end.z;
    }

    startPositionsRef.current = startPositions;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 3. Shader Material for Elegant Minimal Wireframe Lines
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#FFFFFF') }
      },
      vertexShader: `
        varying float vDepth;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          vDepth = mvPosition.z;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vDepth;

        void main() {
          // Subtle depth shading (closer lines = crisp ~0.95, further lines = softer ~0.35)
          float depthFactor = clamp((-vDepth - 1.0) / 3.2, 0.35, 0.95);
          gl_FragColor = vec4(uColor, depthFactor);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const wireframeGroup = new THREE.Group();
    // Subtle pitch tilt (10 deg) for optimal 3D perspective
    wireframeGroup.rotation.x = 0.18;

    const lineSegmentsSystem = new THREE.LineSegments(geometry, material);
    wireframeGroup.add(lineSegmentsSystem);
    scene.add(wireframeGroup);

    // 4. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / (height || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 5. Morphing & Render Loop
    let animId: number;
    const MORPH_DURATION = 1500; // ms
    let prevActiveIndex = 0;

    const render = (now: number) => {
      const currentActiveIndex = activeIndexRef.current;

      // If stage index changed, snapshot current positions as startPositions
      if (currentActiveIndex !== prevActiveIndex) {
        const posAttr = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < WIRE_SEGMENTS_COUNT * 6; i++) {
          startPositions[i] = posAttr[i];
        }
        prevActiveIndex = currentActiveIndex;
      }

      const elapsed = now - morphStartTimeRef.current;
      const morphProgress = Math.min(Math.max(elapsed / MORPH_DURATION, 0), 1);
      
      // Smooth cubic ease in-out
      const ease = morphProgress < 0.5 
        ? 4 * morphProgress * morphProgress * morphProgress 
        : 1 - Math.pow(-2 * morphProgress + 2, 3) / 2;

      const posAttr = geometry.attributes.position.array as Float32Array;
      const targetSegments = targetSegmentSetsRef.current[currentActiveIndex];

      for (let i = 0; i < WIRE_SEGMENTS_COUNT; i++) {
        const idx6 = i * 6;
        const targetSeg = targetSegments[i];

        const s1x = startPositions[idx6];
        const s1y = startPositions[idx6 + 1];
        const s1z = startPositions[idx6 + 2];

        const s2x = startPositions[idx6 + 3];
        const s2y = startPositions[idx6 + 4];
        const s2z = startPositions[idx6 + 5];

        posAttr[idx6] = s1x + (targetSeg.start.x - s1x) * ease;
        posAttr[idx6 + 1] = s1y + (targetSeg.start.y - s1y) * ease;
        posAttr[idx6 + 2] = s1z + (targetSeg.start.z - s1z) * ease;

        posAttr[idx6 + 3] = s2x + (targetSeg.end.x - s2x) * ease;
        posAttr[idx6 + 4] = s2y + (targetSeg.end.y - s2y) * ease;
        posAttr[idx6 + 5] = s2z + (targetSeg.end.z - s2z) * ease;
      }

      geometry.attributes.position.needsUpdate = true;

      // Smooth continuous 3D compound rotation around Y and X axes
      wireframeGroup.rotation.y += 0.007;
      wireframeGroup.rotation.x = 0.18 + Math.sin(now * 0.0006) * 0.04;

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
                <span className="text-gray-600">3D WIREFRAME SYSTEM // ROTATION ACTIVE</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
