import React, { useEffect, useState } from 'react';
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
      const newDrops = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 1 + 0.5}s`,
        animationDelay: `${Math.random() * 2}s`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 20 + 10}px`,
        opacity: Math.random() * 0.5 + 0.3
      }));
      setDrops(newDrops);
    };

    createDrops();
  }, [isActive]);

  if (!isActive) return null;

  return (
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
    </div>
  );
};

export default BloodRain;
