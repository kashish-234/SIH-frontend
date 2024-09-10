// RotatingEarth.tsx
'use client'; // Ensure the component runs on the client side

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Model } from '../public/Earth'; // Ensure the correct import path

const RotatingEarth = () => {
  // Use a ref for Group since the Model component is a group
  const groupRef = useRef<Group>(null);

  // Rotate the Earth model slowly using useFrame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Adjust the rotation speed if necessary
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      <Model />
    </group>
  );
};

export default RotatingEarth;
