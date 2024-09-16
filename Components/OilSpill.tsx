'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import Satellite from './SatelliteModel'; // Import the Satellite component

const EarthModel = ({ position }: { position: [number, number, number] }) => {
  const [earthTexture] = useTexture(['/textures/8k_earth_daymap.jpg']);
  
  return (
    <mesh position={position}>
      {/* Increase the radius of the sphere geometry */}
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

const OilSpill: React.FC = () => {
  const [earthPosition, setEarthPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [showSatellite, setShowSatellite] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const shiftAmount = scrollPosition * 0.01; // Adjust this factor as needed

    setEarthPosition([-shiftAmount, 0, 0]); // Move Earth to the left
    setShowSatellite(scrollPosition > 10); // Adjust this threshold as needed
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Canvas
      style={{ height: '100vh', backgroundColor: 'black' }} // Canvas setup
      camera={{ position: [0, 0, 10], fov: 40 }} // Adjust camera position
    >
      {/* Lights and controls */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      
      {/* Earth model with dynamic position */}
      <EarthModel position={earthPosition} />
      
      {/* Conditionally render the satellite */}
      {showSatellite && (
        <Satellite
          position={[5, 5, 5]} // Adjust the position to the top right
          target={{ x: 0, y: 0, z: 0 }} // Target Earth model
        />
      )}
    </Canvas>
  );
};

export default OilSpill;
