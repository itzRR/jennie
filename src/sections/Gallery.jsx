import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioSynth } from '../utils/audioSynth';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      gsap.fromTo(el,
        { autoAlpha: 0, scale: 0.8, y: 100 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    });
  }, []);

  const galleryItems = [
    { id: 1, title: 'The Awakening', filter: 'hue-rotate(320deg) contrast(1.2)' },
    { id: 2, title: 'Corrupted Soul', filter: 'sepia(1) hue-rotate(300deg) saturate(3)' },
    { id: 3, title: 'Abyssal Stare', filter: 'grayscale(1) contrast(2)' },
    { id: 4, title: 'Crimson Pact', filter: 'brightness(0.8) contrast(1.5) sepia(0.8) hue-rotate(-50deg)' },
  ];

  return (
    <section ref={galleryRef} className="gallery-section">
      <h2 className="gallery-heading">Fragments of Her Mind</h2>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div 
            key={item.id} 
            ref={el => itemsRef.current[index] = el}
            className="gallery-item"
            onMouseEnter={() => audioSynth.playGlitch()}
          >
            <div className="image-wrapper">
              {/* Note: We reuse jennie.webp to create thematic variations */}
              <img 
                src="/jennie.webp" 
                alt={item.title} 
                className="gallery-image"
                style={{ filter: item.filter }}
              />
              <div className="glitch-overlay"></div>
            </div>
            <h3 className="item-title">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
