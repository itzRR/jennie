import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Fade out after 2 seconds
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 2,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="pentagram-container">
        <svg viewBox="0 0 100 100" className="pentagram">
          <circle cx="50" cy="50" r="45" />
          <polygon points="50,5 20,95 95,35 5,35 80,95" />
        </svg>
      </div>
      <h2 className="loading-text">Summoning...</h2>
    </div>
  );
};

export default LoadingScreen;
