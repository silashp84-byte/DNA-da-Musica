let audioCtx: AudioContext | null = null;
const activeOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a single note at a given frequency, duration in seconds, and wave type.
 * Includes a volume envelope (fade-in, sustain, fade-out) to prevent clipping.
 */
export function playNote(frequency: number, duration = 0.6, type: OscillatorType = 'triangle'): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Volume envelope to prevent popping/clicking sounds
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      // Fast fade-in
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      // Sustain then fade-out before completion
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + duration - 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      const record = { osc, gain: gainNode };
      activeOscillators.push(record);

      setTimeout(() => {
        // Clean up
        const index = activeOscillators.indexOf(record);
        if (index > -1) {
          activeOscillators.splice(index, 1);
        }
        resolve();
      }, duration * 1000);
    } catch (error) {
      console.warn('Audio Context failed to start or play note:', error);
      resolve();
    }
  });
}

/**
 * Plays two frequencies to demonstrate an interval.
 * Can be sequential (one after another) or simultaneous (harmony).
 */
export async function playInterval(freq1: number, freq2: number, simultaneous = false) {
  if (simultaneous) {
    playNote(freq1, 1.2, 'sine');
    playNote(freq2, 1.2, 'sine');
  } else {
    await playNote(freq1, 0.6, 'triangle');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await playNote(freq2, 0.8, 'triangle');
  }
}

/**
 * Plays an entire scale (frequencies array) sequentially with a small delay.
 */
export async function playScaleSequence(frequencies: number[], delayMs = 400) {
  for (const freq of frequencies) {
    playNote(freq, 0.4, 'sine');
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

/**
 * Stop any active sound instantly.
 */
export function stopAllSounds() {
  activeOscillators.forEach(({ osc, gain }) => {
    try {
      gain.gain.cancelScheduledValues(0);
      osc.stop();
    } catch (e) {
      // Ignore already stopped
    }
  });
  activeOscillators.length = 0;
}
