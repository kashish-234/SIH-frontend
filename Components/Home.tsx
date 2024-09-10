// Components/Home.tsx
'use client';

import React from 'react';
import EarthModel from './EarthModel'; // Ensure this path is correct
import RotatingEarth from './RotatingEarth';

interface HomeProps {
  onEarthClick: () => void; // Define prop type for click handler
}

const Home: React.FC<HomeProps> = ({ onEarthClick }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 md:px-12">
      {/* Heading Section */}
      <header className="text-center mt-10 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Oil Spill Detection Platform</h1>
        <p className="text-lg md:text-xl mt-4">
          Leveraging advanced technologies to protect our marine environments.
        </p>
      </header>

      {/* Main Content Section with Earth Model and About Us */}
      <section className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Earth Model on the Left */}
        <div className="flex-1 flex justify-center mb-12 md:mb-0" onClick={onEarthClick}>
          <EarthModel />
        </div>

        {/* About Us Section on the Right */}
        <div className="flex-1 md:pl-12 text-left bg-black py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Us</h2>
          <p className="text-md md:text-lg leading-relaxed">
            Our platform specializes in detecting oil spills in marine environments using Automatic Identification System (AIS) data and satellite imagery. By integrating advanced algorithms and real-time data analysis, we aim to minimize the environmental impact of oil spills, providing crucial insights for quick response and mitigation efforts.
          </p>
          <p className="text-md md:text-lg leading-relaxed mt-4">
            Our mission is to protect our oceans and coastlines by offering cutting-edge solutions that help detect and address oil spills promptly, reducing harm to marine life and ecosystems.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
