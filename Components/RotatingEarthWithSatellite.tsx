import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingEarth from './RotatingEarth'; // Ensure the correct import path
import Satellite from './SatelliteModel'; // Ensure the correct import path

const RotatingEarthWithSatellite: React.FC = () => {
  const [target, setTarget] = useState<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 });
  const [coordinates, setCoordinates] = useState<{ x: number, y: number, z: number }[]>([]);

  useEffect(() => {
    // Fetch coordinates from the API
    const fetchCoordinates = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/coordinates'); // Replace with your FastAPI endpoint
        const data = await response.json();
        if (data.length > 0) {
          setCoordinates(data);
        }
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
      style={{ height: '100vh', backgroundColor: '#000' }}
      camera={{ position: [0, 0, 15], fov: 20 }} // Adjust camera settings for a better view
    >
      {/* Lights */}
      <ambientLight intensity={1.0} /> 
      <spotLight position={[10, 10, 10]} angle={-4.45} penumbra={1} intensity={2.0} /> 
      
      {/* Controls */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

      {/* Earth and Satellite */}
      <RotatingEarth />
      <Satellite position={[-2, 1.3, 1.2]} target={target} /> {/* Adjust position of the satellite and pass the target */}
    </Canvas>
  );
};

export default RotatingEarthWithSatellite;
