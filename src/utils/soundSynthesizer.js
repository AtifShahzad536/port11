/**
 * High-Quality Procedural Romantic Audio Synthesizer (Web Audio API)
 * Plays soothing romantic arpeggios, heart pops, chimes, and celebration fanfare!
 */

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.timerId = null;
    this.scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25, 587.33, 659.25]; // C major / romantic pentatonic
    this.currentNoteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.5, gainLevel = 0.15) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Heart pop sound effect
  playHeartPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  // Sparkle chime on interactions
  playChime() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, "triangle", 0.4, 0.08);
      }, i * 60);
    });
  }

  // Celebration Fanfare when Shally clicks "Yes / Maaf Kiya"
  playCelebrationFanfare() {
    if (this.isMuted) return;
    const melody = [
      { f: 523.25, d: 0.18, t: 0 },
      { f: 659.25, d: 0.18, t: 150 },
      { f: 783.99, d: 0.22, t: 300 },
      { f: 1046.50, d: 0.6, t: 450 },
      { f: 880.00, d: 0.25, t: 750 },
      { f: 1046.50, d: 0.9, t: 950 }
    ];

    melody.forEach((item) => {
      setTimeout(() => {
        this.playTone(item.f, "sine", item.d, 0.22);
      }, item.t);
    });
  }

  // Soft Ambient Romantic Lo-fi Melody Loop
  startAmbientMusic() {
    this.init();
    this.isPlaying = true;
    if (this.timerId) clearInterval(this.timerId);

    const romanticChords = [
      [261.63, 329.63, 392.00, 523.25], // C maj
      [220.00, 261.63, 329.63, 440.00], // A min
      [174.61, 220.00, 261.63, 349.23], // F maj
      [196.00, 246.94, 293.66, 392.00]  // G maj
    ];

    let chordIdx = 0;
    let step = 0;

    this.timerId = setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      const chord = romanticChords[chordIdx];
      const note = chord[step % chord.length];

      this.playTone(note, "sine", 0.8, 0.06);

      step++;
      if (step >= chord.length) {
        step = 0;
        chordIdx = (chordIdx + 1) % romanticChords.length;
      }
    }, 450);
  }

  stopAmbientMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

export const romanticSound = new RomanticAudioEngine();
