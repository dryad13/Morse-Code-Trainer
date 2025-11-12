class MorseAudio {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  playDot() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(600, 0.08); // 80ms for dot
  }

  playDash() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(600, 0.24); // 240ms for dash (3x dot duration)
  }

  private playTone(frequency: number, duration: number) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Envelope for smooth attack and release
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
    gainNode.gain.linearRampToValueAtTime(0.3, now + duration - 0.01); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  playSuccess() {
    if (!this.enabled || !this.audioContext) return;
    // Play a quick ascending tone for successful decode
    this.playTone(600, 0.05);
    setTimeout(() => this.playTone(800, 0.05), 60);
  }

  playError() {
    if (!this.enabled || !this.audioContext) return;
    // Play a descending tone for error
    this.playTone(400, 0.15);
  }
}

export const morseAudio = new MorseAudio();
