'use client'; // Ensures the component runs on the client side

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingEarth from './RotatingEarth'; // Adjust import path as needed

export default function EarthModel() {
  return (
    <Canvas
      style={{ height: '110vh', backgroundColor: '#000' }} // Canvas setup
      camera={{ position: [0, 0, 5], fov: 50 }} // Camera setup
    >
      <OrbitControls enableZoom={true} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingEarth /> {/* Render RotatingEarth within Canvas */}
    </Canvas>
  );
}
