import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import CanvasScene from './components/CanvasScene';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Summon from './sections/Summon';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for dramatic effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen />}
      
      <main className="app-container" style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}>
        <CanvasScene />
        <Hero />
        <About />
        <Gallery />
        <Summon />
      </main>
    </>
  );
}

export default App;
