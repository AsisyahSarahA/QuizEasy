// lib/quiz/audioEngine.ts
// Semua fungsi audio dipisah agar tidak di-recreate setiap render

export type SoundType = 'correct' | 'incorrect' | 'tick' | 'victory' | 'timeout' | 'countdown';

/**
 * Play synthesized sound effects using Web Audio API
 */
export const playSound = (type: SoundType): void => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'correct') {
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.5);
      });
    } else if (type === 'incorrect' || type === 'timeout') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'tick' || type === 'countdown') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'victory') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    }
  } catch (e) {
    console.log('Audio not supported');
  }
};

/**
 * Text to Speech function
 */
export const speakText = (text: string, rate: number = 0.9, pitch: number = 1.0): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

/**
 * Synthesize applause sound using Web Audio API (fallback)
 */
export const synthesizeApplause = (duration: number = 4): void => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const sampleRate = ctx.sampleRate;
    const totalSamples = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(2, totalSamples, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      const numClaps = Math.floor(duration * 18);

      for (let i = 0; i < numClaps; i++) {
        const clapTime = Math.random() * duration;
        const clapStart = Math.floor(clapTime * sampleRate);
        const clapDuration = 0.015 + Math.random() * 0.025;
        const clapSamples = Math.floor(clapDuration * sampleRate);
        const amplitude = 0.3 + Math.random() * 0.5;
        const pan = Math.random();

        for (let j = 0; j < clapSamples; j++) {
          const idx = clapStart + j;
          if (idx < totalSamples) {
            const envelope = Math.exp(-j / (clapSamples * 0.25));
            const noise = Math.random() * 2 - 1;
            const channelGain = channel === 0 ? 1 - pan : pan;
            data[idx] += noise * envelope * amplitude * channelGain;
          }
        }
      }

      let max = 0;
      for (let i = 0; i < totalSamples; i++) {
        max = Math.max(max, Math.abs(data[i]));
      }
      if (max > 0) {
        for (let i = 0; i < totalSamples; i++) {
          data[i] = (data[i] / max) * 0.5;
        }
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const hipass = ctx.createBiquadFilter();
    hipass.type = 'highpass';
    hipass.frequency.value = 500;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 2000;
    bandpass.Q.value = 0.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.7, ctx.currentTime + duration - 1.2);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    source.connect(hipass);
    hipass.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch (e) {
    console.log('Applause synthesis error:', e);
  }
};

/**
 * Play applause - tries external file first, falls back to synthesis
 */
export const playApplause = (
  applauseRef: React.RefObject<HTMLAudioElement | null>,
  applauseAvailable: boolean,
  duration: number = 4
): void => {
  if (applauseAvailable && applauseRef.current) {
    try {
      applauseRef.current.currentTime = 0;
      applauseRef.current.volume = 0.7;
      applauseRef.current.play().catch(() => synthesizeApplause(duration));
    } catch (e) {
      synthesizeApplause(duration);
    }
  } else {
    synthesizeApplause(duration);
  }
};