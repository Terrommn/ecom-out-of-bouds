"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";

function GoldTorus() {
  const meshRef = useRef(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.11;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={meshRef} scale={1.15}>
        <torusGeometry args={[1, 0.32, 64, 128]} />
        <meshStandardMaterial
          color="#e1c071"
          metalness={0.92}
          roughness={0.22}
          envMapIntensity={1.1}
        />
      </mesh>
    </Float>
  );
}

export default function LuxuryHeroScene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0.2, 4.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <fog attach="fog" args={["#f4f9f7", 5, 14]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <spotLight
        position={[-4, 5, 2]}
        intensity={0.6}
        angle={0.5}
        penumbra={1}
        color="#f4e8c8"
      />
      <Suspense fallback={null}>
        <GoldTorus />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
