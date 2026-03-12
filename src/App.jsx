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
  const bgAudioRef = useRef(null);
  const summonAudioRef = useRef(null);

  const handleEnterRealm = () => {
    setHasEntered(true);
    
    // Safely unlock all audio contexts inside user interaction
    audioSynth.init();
    if (bgAudioRef.current && summonAudioRef.current) {
      bgAudioRef.current.volume = 0.2;
      summonAudioRef.current.volume = 0; // Starts silent
      
      bgAudioRef.current.play().catch(e => console.log("Bg Audio play blocked", e));
      // Pre-start summon track in background so it's ready to crossfade
      summonAudioRef.current.play().catch(e => console.log("Summon Audio play blocked", e)); 
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

    // Toggle MP3s
    if (bgAudioRef.current && summonAudioRef.current) {
      if (newMutedState) {
        bgAudioRef.current.pause();
        summonAudioRef.current.pause();
      } else {
        bgAudioRef.current.play().catch(e => console.log("Play blocked", e));
        summonAudioRef.current.play().catch(e => console.log("Play blocked", e));
      }
    }
  };

  useEffect(() => {
    // Listen for the global summonRitual event to trigger a music swap
    const handleMusicSwap = (e) => {
      const isSummoned = e.detail.isSummoned;
      if (!bgAudioRef.current || !summonAudioRef.current || isMuted) return;

      if (isSummoned) {
        // Fade out Veiled Sanctorum, Fade in Rite of the Obsidian Gate
        bgAudioRef.current.volume = 0;
        summonAudioRef.current.currentTime = 0; // Restart summon track for max impact
        summonAudioRef.current.volume = 0.5; // Louder for the ritual
      } else {
        // Revert to Veiled Sanctorum
        summonAudioRef.current.volume = 0;
        bgAudioRef.current.volume = 0.2;
      }
    };

    window.addEventListener('summonRitual', handleMusicSwap);
    return () => window.removeEventListener('summonRitual', handleMusicSwap);
  }, [isMuted]);

  return (
    <>
      <CustomCursor />
      {!hasEntered && <Splash onEnter={handleEnterRealm} />}
      {hasEntered && loading && <LoadingScreen />}
      
      {/* Background Audio Tracks */}
      <audio ref={bgAudioRef} src="/Veiled_Sanctorum.mp3" loop />
      <audio ref={summonAudioRef} src="/Rite_of_the_Obsidian_Gate.mp3" loop />
      
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
