import React, { useState, useEffect, useRef } from 'react';
import Splash from './components/Splash';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import CanvasScene from './components/CanvasScene';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Summon from './sections/Summon';
import AudioToggle from './components/AudioToggle';
import { audioSynth } from './utils/audioSynth';
import './components/AudioToggle.css';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handleEnterRealm = () => {
    setHasEntered(true);
    
    // Safely unlock all audio contexts inside user interaction
    audioSynth.init();
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }

    // Start loading sequence
    setTimeout(() => {
      setLoading(false);
    }, 2800);
  };

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Toggle Synth
    audioSynth.toggleMute(newMutedState);

    // Toggle Background MP3
    if (audioRef.current) {
      if (newMutedState) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play blocked", e));
      }
    }
  };

  return (
    <>
      <CustomCursor />
      {!hasEntered && <Splash onEnter={handleEnterRealm} />}
      {hasEntered && loading && <LoadingScreen />}
      
      {/* Background Audio */}
      <audio ref={audioRef} src="/Veiled_Sanctorum.mp3" loop />
      
      {hasEntered && (
        <>
          <AudioToggle isMuted={isMuted} toggleMute={handleToggleMute} />
          <main className="app-container" style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}>
            <CanvasScene />
            <Hero />
            <About />
            <Gallery />
            <Summon />
          </main>
        </>
      )}
    </>
  );
}

export default App;
