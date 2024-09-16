'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model as EarthModel } from '../public/Earth'; 
import { Group } from 'three';

const RotatingEarth: React.FC = () => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Adjust the speed as needed
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      <EarthModel />
    </group>
  );
};

const RotatingEarthModel: React.FC = () => {
  return (
    <Canvas
      style={{ height: '110vh', backgroundColor: 'transparent' }} // Canvas setup
      camera={{ position: [0, 0, 5], fov: 50 }} // Camera setup
    >
      {/* Lights and controls */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <RotatingEarth />
    </Canvas>
  );
};

export default RotatingEarthModel;
