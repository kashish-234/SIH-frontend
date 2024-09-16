import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { MeshBasicMaterial, SphereGeometry, Mesh, TextureLoader, BufferGeometry, BufferAttribute } from 'three';
import { useFrame } from '@react-three/fiber';

type Coordinate = { x: number; y: number; z: number };

// Component to create a red overlay based on given coordinates
const RedOverlay: React.FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
  const geometry = new BufferGeometry();
  const vertices: number[] = [];

  coordinates.forEach(coord => {
    vertices.push(coord.x, coord.y, coord.z);
  });

  // Close the shape
  const firstCoord = coordinates[0];
  vertices.push(firstCoord.x, firstCoord.y, firstCoord.z);

  geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={0xff0000} side={2} transparent opacity={0.5} />
    </mesh>
  );
};

// Component to display the Earth model
const StaticEarthModel: React.FC<{ coordinates?: Coordinate[] }> = ({ coordinates }) => {
  const texture = useLoader(TextureLoader, '/textures/8k_earth_daymap.jpg'); // Update the path as needed

  return (
    <>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {coordinates && <RedOverlay coordinates={coordinates} />}
    </>
  );
};

export default StaticEarthModel;
