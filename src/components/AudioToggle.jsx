import { Volume2, VolumeX } from 'lucide-react';

const AudioToggle = ({ isMuted, toggleMute }) => {
  return (
    <button 
      className="audio-toggle-btn"
      onClick={toggleMute}
      aria-label="Toggle Audio"
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default AudioToggle;
