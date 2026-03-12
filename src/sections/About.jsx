import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Candles from '../components/Candles';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const symbolRefs = useRef([]);

  useEffect(() => {
    // Parallax text reveal
    textRefs.current.forEach((el, index) => {
      gsap.fromTo(el, 
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    });

    // Occult symbols rotation and fade
    symbolRefs.current.forEach((el, index) => {
      gsap.fromTo(el,
        { autoAlpha: 0, rotation: -45, scale: 0.8 },
        {
          autoAlpha: 0.2, // Keep them subtle
          rotation: 45,
          scale: 1,
          duration: 3,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-content">
        <h2 ref={el => textRefs.current[0] = el} className="about-heading">The Entity Known as Jennie</h2>
        
        <p ref={el => textRefs.current[1] = el} className="about-text">
          She was not born of this world. Bound to the shadows of an ancient throne, her presence corrupts the very air around her.
        </p>

        <p ref={el => textRefs.current[2] = el} className="about-text">
          Those who seek her wisdom never return. They become the embers that float endlessly in her domain.
        </p>

        <p ref={el => textRefs.current[3] = el} className="about-text highlight">
          Will you offer your soul?
        </p>
      </div>

      {/* Background Occult Symbols */}
      <div ref={el => symbolRefs.current[0] = el} className="symbol symbol-1">⛧</div>
      <div ref={el => symbolRefs.current[1] = el} className="symbol symbol-2">⸸</div>
      <div ref={el => symbolRefs.current[2] = el} className="symbol symbol-3">🜏</div>
      
      {/* Interactive Candles */}
      <Candles />
    </section>
  );
};

export default About;
