'use client';

import React from 'react';
import Link from 'next/link'; // For linking to different pages
import RotatingEarthModel from './RotatingEarth';
import StarsBackground from './StarsBackground'; // Import the starry background

const Home: React.FC = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 md:px-12">
   
      <StarsBackground />

      {/* Header Section with Project Name and Navbar */}
      <header className="w-full fixed top-0 left-0 flex items-center justify-between py-4 px-6 bg-black z-50 border-b border-white-700">
        {/* Project Name */}
        <div className="text-2xl font-bold">Project Name</div>

        {/* Navbar */}
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/oil-spill" className="hover:text-gray-400">Oil Spill</Link>
          <Link href="/vessel" className="hover:text-gray-400">Vessel</Link>
        </nav>
      </header>

      {/* Main Content Section with Earth Model and About Us */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mt-16">
        {/* Earth Model on the Left */}
        <div className="flex-1 flex justify-center mb-12 md:mb-0">
          <RotatingEarthModel />
        </div>

        {/* About Us Section on the Right */}
        <div className="flex-1 md:pl-12 text-left py-8 md:py-12">
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
