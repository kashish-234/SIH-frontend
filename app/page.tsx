// app/page.tsx
'use client';

import React, { useState } from 'react';
import Home from '../Components/Home'; // Import the Home component
import RotatingEarthWithSatellite from '../Components/RotatingEarthWithSatellite'; // Import the rotating earth component

export default function HomePage() {
  const [showEarth, setShowEarth] = useState(false); // State to toggle between components

  // Handler to switch to the rotating earth page
  const handleEarthClick = () => {
    setShowEarth(true); // Update state to show the rotating earth component
  };

  return (
    <div>
      {showEarth ? (
        <RotatingEarthWithSatellite /> // Show the rotating earth component
      ) : (
        <Home onEarthClick={handleEarthClick} /> // Show the home component with click handler
      )}
    </div>
  );
}
