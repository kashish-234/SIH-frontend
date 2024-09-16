import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { Model as SatelliteModel } from '../public/Satellite'; // Import Satellite model

interface SatelliteProps {
  position: [number, number, number];
  target: { x: number; y: number; z: number };
}

const Satellite: React.FC<SatelliteProps> = ({ position, target }) => {
  const satelliteRef = useRef<Group>(null);

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.lookAt(target.x, target.y, target.z);
    }
  });

  // Function to adjust material properties for brightness
  const adjustMaterialProperties = (object: Group) => {
    object.traverse((child) => {
      if (child instanceof Mesh) {
        const material = child.material as MeshStandardMaterial;
        material.emissive.set('#ff0000'); // Bright red emissive color
        material.emissiveIntensity = 1; // Increase intensity
        material.needsUpdate = true; // Ensure the material updates
      }
    });
  };

  // Use effect to adjust material properties after the component mounts
  useEffect(() => {
    if (satelliteRef.current) {
      adjustMaterialProperties(satelliteRef.current);
    }
  }, []);

  return (
    <group ref={satelliteRef} position={position}>
      <SatelliteModel
        position={[0, 0, 0]}
        scale={[0.2, 0.2, 0.2]} // Smaller scale for the satellite
      />
    </group>
  );
};

export default Satellite;
