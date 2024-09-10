import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import Satellite from './SatelliteModel'; // Ensure the correct import path

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

const CoordinateMarkers = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);

  // Fetch data from FastAPI
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/coordinates'); // Replace with your FastAPI endpoint
        const data = await response.json();
        setCoordinates(data);
        // Automatically select the first coordinate for demonstration
        if (data.length > 0) {
          setSelectedCoordinate(data[0]);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <Canvas
      style={{ height: '100vh' }} // Ensure the canvas takes full height or adjust as needed
      camera={{ position: [0, 0, 10], fov: 50 }} // Adjust camera position and field of view as needed
    >
      {coordinates.map((coord, index) => (
        <Sphere key={index} args={[0.1, 16, 16]} position={[coord.x, coord.y, coord.z]}>
          <meshBasicMaterial color="red" />
        </Sphere>
      ))}

      {/* Render the Satellite component */}
      {selectedCoordinate && (
        <Satellite position={[0, 0, 5]} target={selectedCoordinate} />
      )}
    </Canvas>
  );
};

export default CoordinateMarkers;
