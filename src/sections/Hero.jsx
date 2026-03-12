import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 }); // sync with loading screen exit
    tl.fromTo(videoRef.current, { opacity: 0, scale: 1.1 }, { opacity: 0.8, scale: 1, duration: 4, ease: 'power2.out' })
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }, '-=2.5')
      .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '-=1');
      
    // Breathing animation for title
    gsap.to(titleRef.current, {
      scale: 1.02,
      textShadow: '0 0 20px var(--color-crimson)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 5
    });

  }, []);

  return (
    <section className="hero-section">
      <div className="hero-background">
        {/* The Jennie Video Layer */}
        <video 
          ref={videoRef}
          src="/jennie.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
          poster="/jennie.webp"
        />
        <div className="video-overlay" />
      </div>
      
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">Jennie's Realm</h1>
        <p ref={subtitleRef} className="hero-subtitle">The gateway opens. Do not let her see you.</p>
      </div>
    </section>
  );
};

export default Hero;
