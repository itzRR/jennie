import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Splash.css';

const Splash = ({ onEnter }) => {
  const containerRef = useRef(null);

  const handleEnter = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: onEnter
    });
  };

  return (
    <div ref={containerRef} className="splash-screen">
      <div className="splash-content">
        <h1 className="splash-title">Jennie's Realm</h1>
        <p className="splash-warning">This experience contains flashing lights, loud noises, and dark themes.</p>
        <button className="enter-btn" onClick={handleEnter}>
          <span className="enter-text">OFFER SOUL</span>
          <div className="enter-glow"></div>
        </button>
      </div>
    </div>
  );
};

export default Splash;
