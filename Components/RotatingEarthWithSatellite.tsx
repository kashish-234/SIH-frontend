import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Satellite from './SatelliteModel'; // Ensure the correct import path
import StaticEarthModel from './EarthModel';
import { Mesh, MeshBasicMaterial, BufferGeometry, BufferAttribute } from 'three';

type Coordinate = { x: number; y: number; z: number };

// Helper function to convert lat/long to 3D Cartesian coordinates on a unit sphere
const latLongToCartesian = (lat: number, lon: number, radius: number = 1.5): Coordinate => {
  const phi = (90 - lat) * (Math.PI / 180); // Convert latitude to phi
  const theta = (lon + 180) * (Math.PI / 180); // Convert longitude to theta

  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
};

// Helper function to create a red overlay on the Earth's surface
const createRedOverlay = (coordinates: Coordinate[]) => {
  const geometry = new BufferGeometry();
  const vertices: number[] = [];

  coordinates.forEach(coord => {
    vertices.push(coord.x, coord.y, coord.z);
  });

  // Add the first vertex again to close the shape
  const firstCoord = coordinates[0];
  vertices.push(firstCoord.x, firstCoord.y, firstCoord.z);

  geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
  const material = new MeshBasicMaterial({ color: 0xff0000, side: 2, transparent: true, opacity: 0.5 });
  
  return <mesh geometry={geometry} material={material} />;
};

const RotatingEarthWithSatellite: React.FC = () => {
  const [target, setTarget] = useState<Coordinate>({ x: 0, y: 0, z: 0 });
  const [satellitePosition, setSatellitePosition] = useState<Coordinate>({ x: 0, y: 0, z: 0 });
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    // Fetch coordinates from the API
    const fetchCoordinates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get-satellite-image?min_lon=68.7&min_lat=6.55&max_lon=97.25&max_lat=37.1');
        const data = await response.json();

        // Extracting min/max latitudes and longitudes from the response
        const { min_lat, min_lon, max_lat, max_lon } = data;

        // Convert the bounding box corners to Cartesian coordinates
        const topLeft = latLongToCartesian(max_lat, min_lon);
        const topRight = latLongToCartesian(max_lat, max_lon);
        const bottomLeft = latLongToCartesian(min_lat, min_lon);
        const bottomRight = latLongToCartesian(min_lat, max_lon);

        // Calculate the center point of the area
        const center = {
          x: (topLeft.x + topRight.x + bottomLeft.x + bottomRight.x) / 4,
          y: (topLeft.y + topRight.y + bottomLeft.y + bottomRight.y) / 4,
          z: (topLeft.z + topRight.z + bottomLeft.z + bottomRight.z) / 4,
        };

        // Position the satellite slightly further away from the Earth's model
        const satelliteDist = 1.2; // Distance from Earth
        const randomPosition = {
          x: center.x * satelliteDist,
          y: center.y * satelliteDist + 1, // Adjust for height
          z: center.z * satelliteDist,
        };

        setCoordinates([topLeft, topRight, bottomLeft, bottomRight]); // Set all corner points
        setTarget(center); // Set target to the center of the area
        setSatellitePosition(randomPosition); // Set satellite position
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    // Function to update the target to the next coordinate
    const updateTarget = () => {
      if (coordinates.length > 0) {
        setTarget(coordinates[currentIndex]);
        console.log('Pointing to Target:', coordinates[currentIndex]);
        currentIndex = (currentIndex + 1) % coordinates.length; // Loop back to the start
      }
    };

    // Set an interval to update the target every 5 seconds
    const intervalId = setInterval(updateTarget, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [coordinates]);

  return (
    <Canvas
      style={{ height: '110vh', backgroundColor: '#000' }}
      camera={{ position: [0, 0, 15], fov: 20 }} // Adjust camera settings for a better view
    >
      {/* Lights */}
      <ambientLight intensity={0.8} /> 
      <spotLight position={[10, 10, 10]} angle={-4.45} penumbra={1} intensity={1.5} /> 
      <directionalLight position={[0, 0, 5]} intensity={1} />
      {/* Controls */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

      {/* Earth and Satellite */}
      <StaticEarthModel />
      {coordinates.length > 0 && createRedOverlay(coordinates)} {/* Add red overlay to the Earth */}
      <Satellite position={[satellitePosition.x, satellitePosition.y, satellitePosition.z]} target={target} /> {/* Pass the satellite position and target */}
    </Canvas>
  );
};

export default RotatingEarthWithSatellite;
