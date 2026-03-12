import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './BloodRain.css';

const BloodRain = ({ isActive }) => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setDrops([]);
      return;
    }

    // Generate random blood drops
    const createDrops = () => {
      const newDrops = Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 0.8 + 0.4}s`,
        animationDelay: `${Math.random() * 2}s`,
        width: `${Math.random() * 2 + 2}px`,
        height: `${Math.random() * 40 + 20}px`,
        opacity: Math.random() * 0.6 + 0.4
      }));
      setDrops(newDrops);
    };

    createDrops();
  }, [isActive]);

  if (!isActive) return null;

  return createPortal(
    <div className="blood-rain-container">
      {drops.map((drop) => (
        <div 
          key={drop.id} 
          className="blood-drop"
          style={{
            left: drop.left,
            animationDuration: drop.animationDuration,
            animationDelay: drop.animationDelay,
            width: drop.width,
            height: drop.height,
            opacity: drop.opacity
          }}
        ></div>
      ))}
      <div className="blood-overlay"></div>
    </div>,
    document.body
  );
};

export default BloodRain;
