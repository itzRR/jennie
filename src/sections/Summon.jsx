import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioSynth } from '../utils/audioSynth';
import BloodRain from '../components/BloodRain';
import './Summon.css';

gsap.registerPlugin(ScrollTrigger);

const Summon = () => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [isSummoned, setIsSummoned] = useState(false);

  useEffect(() => {
    // Scroll reveal
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
    
    // Ambient rotation of inner rune ring
    gsap.to(ringRef.current, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'linear'
    });
  }, []);

  const handleSummon = () => {
    setIsSummoned(true);
    
    // Broadcast global event to extinguish candles in About section
    window.dispatchEvent(new CustomEvent('summonRitual', { detail: { isSummoned: true } }));
    
    // Play the audio synth drop
    audioSynth.playSummonRitual();

    // Intense animation upon click
    gsap.to(ringRef.current, {
      rotation: '+=720',
      duration: 2,
      ease: 'power4.inOut',
      boxShadow: '0 0 50px 20px rgba(255, 69, 0, 0.8)'
    });
    
    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        textRef.current.innerText = "SHE IS HERE";
        gsap.to(textRef.current, { opacity: 1, color: '#ff4500', scale: 1.5, textShadow: '0 0 20px #ff4500', duration: 1, ease: 'elastic.out(1, 0.3)' });
      }
    });

    // Darken background globally
    gsap.to('.app-container', {
      backgroundColor: '#000',
      filter: 'contrast(1.5) hue-rotate(30deg)',
      duration: 2
    });

    // Reversal sequence after the ritual finishes (e.g. 6 seconds)
    setTimeout(() => {
      // Revert ring
      gsap.to(ringRef.current, {
        boxShadow: '0 0 20px rgba(122, 0, 0, 0.3), inset 0 0 20px rgba(122, 0, 0, 0.3)',
        duration: 2,
        ease: 'power2.out'
      });
      
      // Revert text
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          textRef.current.innerText = "SUMMON JENNIE";
          gsap.to(textRef.current, { opacity: 1, color: '#7a0000', scale: 1, textShadow: 'none', duration: 1 });
          setIsSummoned(false);
          // Reignite candles
          window.dispatchEvent(new CustomEvent('summonRitual', { detail: { isSummoned: false } }));
        }
      });

      // Revert global background
      gsap.to('.app-container', {
        backgroundColor: 'transparent',
        filter: 'none',
        duration: 3
      });

    }, 10000); // 10 seconds wait before returning to normal
  };

  return (
    <section className="summon-section">
      <div className="summon-container" ref={containerRef}>
        <div className={`ritual-circle ${isSummoned ? 'summoned' : ''}`} ref={ringRef}>
          {/* Decorative Runes */}
          <span className="rune top">Ψ</span>
          <span className="rune right">Ω</span>
          <span className="rune bottom">λ</span>
          <span className="rune left">⍙</span>
        </div>
        
        <button 
          className={`summon-btn ${isSummoned ? 'disabled' : ''}`} 
          onClick={handleSummon}
          disabled={isSummoned}
        >
          <span className="btn-text" ref={textRef}>
            SUMMON JENNIE
          </span>
          <div className="btn-glow"></div>
        </button>
      </div>
      <p className="footer-warning">Do not stare directly into her eyes.</p>
      
      {/* Footer Hellfire and Credit */}
      <div className="footer-fire-container">
        {/* SVG Filter for realistic licking flame displacement */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="fire-turbulence">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <div className="fire-effects">
          <div className="flame main"></div>
          <div className="flame sub1"></div>
          <div className="flame sub2"></div>
        </div>
        
        <a 
          href="https://r2-vision.firebaseapp.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="developer-credit"
        >
          Developed by Rehan
        </a>
      </div>
      <BloodRain isActive={isSummoned} />
    </section>
  );
};

export default Summon;
