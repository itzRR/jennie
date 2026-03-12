import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioSynth } from '../utils/audioSynth';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);
  const symbolRefs = useRef([]);

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

    // Parallax and fade for gallery background symbols
    symbolRefs.current.forEach((el, index) => {
      gsap.fromTo(el,
        { autoAlpha: 0, rotation: 45, scale: 0.8 },
        {
          autoAlpha: 0.15, // keep subtly hidden behind the gallery cards
          rotation: -45,
          scale: 1,
          duration: 3,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 1
          }
        }
      );
    });
  }, []);

  const galleryItems = [
    { id: 1, title: 'The Awakening', image: '/dark.png' },
    { id: 2, title: 'Corrupted Soul', image: '/dark1.png' },
    { id: 3, title: 'Abyssal Stare', image: '/dark2.png' },
    { id: 4, title: 'Crimson Pact', image: '/dark3.png' },
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
              <img 
                src={item.image} 
                alt={item.title} 
                className="gallery-image"
              />
              <div 
                className="glitch-overlay"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
            </div>
            <h3 className="item-title">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Background Occult Symbols */}
      <div ref={el => symbolRefs.current[0] = el} className="gallery-symbol symbol-1">⛧</div>
      <div ref={el => symbolRefs.current[1] = el} className="gallery-symbol symbol-2">🜔</div>
      <div ref={el => symbolRefs.current[2] = el} className="gallery-symbol symbol-3">☾</div>
      <div ref={el => symbolRefs.current[3] = el} className="gallery-symbol symbol-4">⸸</div>
    </section>
  );
};

export default Gallery;
