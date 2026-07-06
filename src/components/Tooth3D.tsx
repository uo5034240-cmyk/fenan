import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function ToothMesh() {
  const meshRef = useRef<Mesh>(null);
  const { pointer } = useThree();

  // Spring state — tracked as refs to avoid React re-renders
  const velY = useRef(0);
  const velX = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const spinAccum = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Continuous natural spin
    spinAccum.current += 0.2 * delta;

    // Mouse targets (normalized pointer -1 → 1)
    const targetOffsetY = pointer.x * 0.88;
    const targetOffsetX = pointer.y * -0.4;

    // True spring integration: a = k*(target - pos) - b*vel
    const stiffness = 52;
    const damping = 7.5;

    velY.current +=
      (targetOffsetY - offsetY.current) * stiffness * delta -
      velY.current * damping * delta;
    velX.current +=
      (targetOffsetX - offsetX.current) * stiffness * delta -
      velX.current * damping * delta;

    offsetY.current += velY.current * delta;
    offsetX.current += velX.current * delta;

    // Compose: base spin + mouse spring offset
    meshRef.current.rotation.y = spinAccum.current + offsetY.current;
    meshRef.current.rotation.x =
      Math.sin(_ .clock.elapsedTime * 0.36) * 0.07 + offsetX.current;
  });

  return (
    <group ref={meshRef}>
      {/* Crown — slightly distorted sphere for organic feel */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <sphereGeometry args={[1.02, 72, 72]} />
        <MeshDistortMaterial
          color="#eef4f8"
          roughness={0.07}
          metalness={0.2}
          distort={0.12}
          speed={1.1}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* Root — left */}
      <mesh position={[-0.44, -0.9, 0]} rotation={[0, 0, 0.21]}>
        <coneGeometry args={[0.37, 1.18, 36]} />
        <meshStandardMaterial color="#d9e5ec" roughness={0.3} metalness={0.06} />
      </mesh>

      {/* Root — right */}
      <mesh position={[0.44, -0.9, 0]} rotation={[0, 0, -0.21]}>
        <coneGeometry args={[0.37, 1.18, 36]} />
        <meshStandardMaterial color="#d9e5ec" roughness={0.3} metalness={0.06} />
      </mesh>

      {/* Gold sparkle gem — brand accent */}
      <mesh position={[0.6, 0.68, 0.9]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={1.6}
          metalness={0.92}
          roughness={0.08}
        />
      </mesh>
    </group>
  );
}

export function Tooth3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 44 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 7, 6]} intensity={1.35} color="#7ED6CF" />
      <directionalLight position={[-5, -3, -5]} intensity={0.45} color="#0FA3A3" />
      <pointLight position={[0, 4, 3]} intensity={0.5} color="#ffffff" />
      <Suspense fallback={null}>
        <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.52}>
          <ToothMesh />
        </Float>
        <Sparkles count={50} scale={5.5} size={2.2} speed={0.3} color="#7ED6CF" opacity={0.55} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
