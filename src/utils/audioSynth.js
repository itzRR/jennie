class HorrorAudioContext {
  constructor() {
    this.ctx = null;
    this.isInitialized = false;
    this.isMuted = false;
    this.masterGain = null;
    this.ambientNodes = [];
  }

  init() {
    if (this.isInitialized) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.ctx.destination);
    
    this.isInitialized = true;
    
    this.startAmbientDrone();
  }

  toggleMute(isMuted) {
    this.isMuted = isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(isMuted ? 0 : 1, this.ctx.currentTime, 0.5);
    }
  }

  startAmbientDrone() {
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.value = 45; // very low rumble
    osc2.frequency.value = 47; // dissonance

    filter.type = 'lowpass';
    filter.frequency.value = 100;

    gain.gain.value = 0.1; // quiet

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();

    // LFO for breath-like volume changes
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // 10 seconds per cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();
    
    this.ambientNodes = [osc1, osc2, lfo];
  }

  playGlitch() {
    if (!this.ctx || this.ctx.state !== 'running' || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * 0.2; // 0.2 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000 + Math.random() * 2000;
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start();
  }

  playSummonRitual() {
    if (!this.ctx || this.ctx.state !== 'running' || this.isMuted) return;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime); // loud
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 4);

    // Chaos screech
    this.playGlitch();
    setTimeout(() => this.playGlitch(), 100);
    setTimeout(() => this.playGlitch(), 300);
    setTimeout(() => this.playGlitch(), 400);
  }
}

export const audioSynth = new HorrorAudioContext();
