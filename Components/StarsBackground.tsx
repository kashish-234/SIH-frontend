'use client';
import React, { useEffect, useRef } from 'react';

const StarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Function to generate and render stars
    const renderStars = () => {
      const { width, height } = canvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Adjust star density
      const stars = Array.from({ length: Math.floor(width * height * 0.0005) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.9 + 0.4,
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();
        });
        requestAnimationFrame(render);
      };

      render();
    };

    // Initial rendering of stars
    renderStars();

    // Handle window resize
    window.addEventListener('resize', renderStars);
    
    return () => {
      window.removeEventListener('resize', renderStars);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

export default StarsBackground;
