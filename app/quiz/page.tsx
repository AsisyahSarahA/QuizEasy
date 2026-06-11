'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Sparkles, 
  Timer, 
  ChevronRight,
  Info,
  Check,
  X,
  Zap,
  Target,
  Trophy,
  Flame,
  Play,
  Pause,
  Square,
  Music
} from 'lucide-react';

// Import data dari file terpisah
import { QUIZ_QUESTIONS } from '../../data/quizData';

// ==========================================
// FIREWORKS COMPONENT
// Setiap burst akan meledak, partikel menghilang natural,
// lalu canvas fade out otomatis setelah semua selesai.
// ==========================================
const Fireworks: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Keep callback ref up to date without re-triggering effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let allBurstsLaunched = false;

    // Setup canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
      maxLife: number;
      size: number;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const colors = [
      '#f472b6', '#a78bfa', '#60a5fa', '#34d399',
      '#fbbf24', '#f87171', '#fb923c', '#c084fc',
      '#22d3ee', '#e879f9', '#fde047'
    ];

    // Create a single burst of particles
    const createBurst = (x?: number, y?: number) => {
      const bx = x ?? Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const by = y ?? Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const numParticles = 50 + Math.floor(Math.random() * 30);

      for (let i = 0; i < numParticles; i++) {
        const angle = (Math.PI * 2 * i) / numParticles + Math.random() * 0.3;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: color,
          life: 1,
          maxLife: 80 + Math.random() * 40,
          size: 1 + Math.random() * 2.5,
          trail: []
        });
      }
    };

    // Schedule bursts like real fireworks (natural timing)
    // No more continuous interval - just a few planned bursts
    const burstSchedule = [0, 350, 800, 1400, 2100, 2900];
    burstSchedule.forEach((delay) => {
      setTimeout(() => {
        createBurst();
        // Occasional double-burst for variety
        if (Math.random() > 0.5) {
          setTimeout(() => createBurst(), 180);
        }
      }, delay);
    });

    // Mark all bursts as launched after the last scheduled burst
    const lastBurstTime = burstSchedule[burstSchedule.length - 1];
    setTimeout(() => {
      allBurstsLaunched = true;
    }, lastBurstTime + 200);

    // Animation loop
    const animate = () => {
      // Fade trail effect
      ctx.fillStyle = 'rgba(7, 11, 22, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Save trail position
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.99; // air resistance

        // Decrease life
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw trail
        if (p.trail.length > 1) {
          ctx.globalAlpha = p.life * 0.4;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          for (let j = 0; j < p.trail.length; j++) {
            const t = p.trail[j];
            if (j === 0) ctx.moveTo(t.x, t.y);
            else ctx.lineTo(t.x, t.y);
          }
          ctx.stroke();
        }

        // Draw particle with glow
        ctx.globalAlpha = p.life;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;

      // Check if all bursts are done AND no particles remain
      if (allBurstsLaunched && particles.length === 0) {
        cancelAnimationFrame(animationId);

        // Clear canvas to transparent (important for smooth fade)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Trigger fade-out animation via state
        setIsFadingOut(true);

        // After fade completes, notify parent to unmount
        setTimeout(() => {
          window.removeEventListener('resize', resize);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 600);

        return; // Stop animation loop
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[100] transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// ==========================================
// MAIN QUIZ PAGE COMPONENT
// ==========================================
export default function QuizPage() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [quizLength, setQuizLength] = useState<number>(5);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<typeof QUIZ_QUESTIONS>([]);
  const [quizState, setQuizState] = useState<'idle' | 'countdown' | 'playing' | 'submitted' | 'summary'>('idle');

  const [countdown, setCountdown] = useState<number>(3);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showFireworks, setShowFireworks] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<{
    question: string;
    selected: string | null;
    correct: string;
    isCorrect: boolean;
    wasTimeout: boolean;
  }[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [applauseAvailable, setApplauseAvailable] = useState<boolean>(true);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const applauseRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================================
  // AUDIO & SPEECH FUNCTIONS
  // ==========================================

  const playSound = (type: 'correct' | 'incorrect' | 'tick' | 'victory' | 'timeout' | 'countdown') => {
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

  const speakText = (text: string, rate: number = 0.9, pitch: number = 1.0) => {
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

  const synthesizeApplause = (duration: number = 4) => {
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
              const noise = (Math.random() * 2 - 1);
              const channelGain = channel === 0 ? (1 - pan) : pan;
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

  const playApplause = (duration: number = 4) => {
    if (applauseAvailable && applauseRef.current) {
      try {
        applauseRef.current.currentTime = 0;
        applauseRef.current.volume = 0.7;
        applauseRef.current.play().catch(() => {
          synthesizeApplause(duration);
        });
      } catch (e) {
        synthesizeApplause(duration);
      }
    } else {
      synthesizeApplause(duration);
    }
  };

  const playResultFeedback = (accuracy: number) => {
    if (accuracy === 100) {
      setShowFireworks(true);
      setTimeout(() => {
        speakText("Congratulations! Perfect score! You are absolutely amazing!", 0.95, 1.2);
      }, 300);
      setTimeout(() => {
        playApplause(5);
      }, 1500);
    } else if (accuracy >= 50) {
      setTimeout(() => {
        speakText("Great job! You did really well! Keep up the excellent work!", 0.95, 1.1);
      }, 300);
      setTimeout(() => {
        playApplause(4);
      }, 1800);
    } else {
      setTimeout(() => {
        speakText("Don't give up! Keep practicing and you will do better next time! You can do it!", 0.9, 1.0);
      }, 300);
    }
  };

  // ==========================================
  // MUSIC CONTROLS
  // ==========================================

  const playBgMusic = () => {
    if (isMusicEnabled && bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3;
      bgMusicRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch((e) => {
        console.log('Music autoplay blocked:', e);
      });
    }
  };

  const pauseBgMusic = () => {
    if (bgMusicRef.current && isMusicPlaying) {
      bgMusicRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  const handlePlay = () => {
    setIsMusicEnabled(true);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3;
      bgMusicRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch((e) => {
        console.log('Play failed:', e);
      });
    }
  };

  const handlePause = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  const handleStop = () => {
    setIsMusicEnabled(false);
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
      setIsMusicPlaying(false);
    }
  };

  // ==========================================
  // QUIZ LOGIC
  // ==========================================

  const handleStartQuiz = (length: number = 5) => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, length);

    setQuizLength(length);
    setCurrentQuizQuestions(selected);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setQuizHistory([]);
    setTotalDuration(0);
    setCountdown(3);
    setShowFireworks(false);
    setIsMusicEnabled(true);
    setQuizState('countdown');

    if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (quizState === 'countdown') {
      if (countdown > 0) {
        playSound('countdown');
        countdownRef.current = setTimeout(() => {
          setCountdown(prev => prev - 1);
        }, 1000);
      } else {
        speakText("Quiz begins! Good luck!", 0.9, 1.1);
        countdownRef.current = setTimeout(() => {
          setQuizState('playing');
          playBgMusic();

          durationIntervalRef.current = setInterval(() => {
            setTotalDuration(prev => prev + 1);
          }, 1000);
        }, 1800);
      }
    }

    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [quizState, countdown]);

  useEffect(() => {
    if (quizState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          if (prev <= 5) {
            playSound('tick');
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, currentQuestionIdx]);

  const handleTimeOut = () => {
    pauseBgMusic();
    playSound('timeout');
    setStreak(0);

    const activeQuestion = currentQuizQuestions[currentQuestionIdx];
    const correctOption = activeQuestion.options.find(opt => opt.isCorrect);

    setTimeout(() => {
      speakText(`Time's up! The correct answer is ${correctOption?.text}`, 0.85, 0.9);
    }, 600);

    setQuizHistory(prev => [
      ...prev,
      {
        question: activeQuestion.question,
        selected: null,
        correct: correctOption?.text || '',
        isCorrect: false,
        wasTimeout: true
      }
    ]);

    setQuizState('submitted');
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || quizState !== 'playing') return;

    if (timerRef.current) clearInterval(timerRef.current);
    pauseBgMusic();

    const activeQuestion = currentQuizQuestions[currentQuestionIdx];
    const chosenOption = activeQuestion.options[selectedOptionIdx];
    const isCorrect = chosenOption.isCorrect;
    const correctOption = activeQuestion.options.find(opt => opt.isCorrect);

    if (isCorrect) {
      playSound('correct');
      setScore(prev => prev + activeQuestion.points);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);

      setTimeout(() => {
        const phrases = [
          "Correct! Well done!",
          "Excellent! That's right!",
          "Perfect! Great job!",
          "Yes! You got it!"
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        speakText(randomPhrase, 0.95, 1.2);
      }, 500);
    } else {
      playSound('incorrect');
      setStreak(0);

      setTimeout(() => {
        speakText(`Incorrect. The correct answer is ${correctOption?.text}`, 0.85, 0.9);
      }, 600);
    }

    setQuizHistory(prev => [
      ...prev,
      {
        question: activeQuestion.question,
        selected: chosenOption.text,
        correct: correctOption?.text || '',
        isCorrect,
        wasTimeout: false
      }
    ]);

    setQuizState('submitted');
  };

  const handleNextQuestion = () => {
    const isLast = currentQuestionIdx === currentQuizQuestions.length - 1;
    if (isLast) {
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      pauseBgMusic();
      playSound('victory');

      const finalCorrectCount = correctCount;
      const finalTotal = currentQuizQuestions.length;
      const accuracy = Math.round((finalCorrectCount / finalTotal) * 100);

      setTimeout(() => {
        setQuizState('summary');
        setTimeout(() => {
          playResultFeedback(accuracy);
        }, 400);
      }, 800);
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setTimeLeft(15);
      setQuizState('playing');

      setTimeout(() => {
        playBgMusic();
      }, 300);
    }
  };

  const handleResetQuiz = () => {
    setQuizState('idle');
    setShowFireworks(false);
    pauseBgMusic();
    if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    window.speechSynthesis.cancel();
  };

  // Handler saat fireworks selesai (dipanggil oleh Fireworks component)
  const handleFireworksComplete = () => {
    setShowFireworks(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
      if (applauseRef.current) {
        applauseRef.current.pause();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  const getFeedbackQuote = (accuracy: number) => {
    if (accuracy === 100) {
      return "Flawless performance! You display advanced command of technology jargon.";
    } else if (accuracy >= 80) {
      return "Phenomenal! Your understanding of tech terms is top-tier. Keep soaring!";
    } else if (accuracy >= 50) {
      return "Good job! You have a solid grasp of IT concepts, but there's room to perfect it.";
    } else {
      return "Don't give up! Revision is key. Let's head back to the learning materials.";
    }
  };

  const activeQuestion = currentQuizQuestions[currentQuestionIdx];
  const getLetter = (index: number) => ['A', 'B', 'C', 'D'][index];

  const getOptionColorStyles = (idx: number, isSelected: boolean, isSubmittingPhase: boolean, isThisOptionCorrect: boolean) => {
    const baseColors = [
      {
        border: 'border-rose-900/30 hover:border-rose-500/50 bg-gradient-to-r from-rose-950/20 to-rose-900/10 text-rose-100',
        active: 'ring-2 ring-rose-500 border-rose-500 bg-gradient-to-r from-rose-950/40 to-rose-900/30 text-rose-50 shadow-lg shadow-rose-500/20',
        correct: 'border-emerald-500 bg-gradient-to-r from-emerald-950/40 to-emerald-900/30 text-emerald-100 ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20',
        wrong: 'border-rose-600/50 bg-rose-950/20 text-rose-200/60'
      },
      {
        border: 'border-blue-900/30 hover:border-blue-500/50 bg-gradient-to-r from-blue-950/20 to-blue-900/10 text-blue-100',
        active: 'ring-2 ring-blue-500 border-blue-500 bg-gradient-to-r from-blue-950/40 to-blue-900/30 text-blue-50 shadow-lg shadow-blue-500/20',
        correct: 'border-emerald-500 bg-gradient-to-r from-emerald-950/40 to-emerald-900/30 text-emerald-100 ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20',
        wrong: 'border-blue-900/20 bg-blue-950/10 text-blue-300/40'
      },
      {
        border: 'border-amber-900/30 hover:border-amber-500/50 bg-gradient-to-r from-amber-950/20 to-amber-900/10 text-amber-100',
        active: 'ring-2 ring-amber-500 border-amber-500 bg-gradient-to-r from-amber-950/40 to-amber-900/30 text-amber-50 shadow-lg shadow-amber-500/20',
        correct: 'border-emerald-500 bg-gradient-to-r from-emerald-950/40 to-emerald-900/30 text-emerald-100 ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20',
        wrong: 'border-amber-900/20 bg-amber-950/10 text-amber-300/40'
      },
      {
        border: 'border-emerald-900/30 hover:border-emerald-500/50 bg-gradient-to-r from-emerald-950/20 to-emerald-900/10 text-emerald-100',
        active: 'ring-2 ring-emerald-500 border-emerald-500 bg-gradient-to-r from-emerald-950/40 to-emerald-900/30 text-emerald-50 shadow-lg shadow-emerald-500/20',
        correct: 'border-emerald-500 bg-gradient-to-r from-emerald-950/40 to-emerald-900/30 text-emerald-100 ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20',
        wrong: 'border-emerald-900/20 bg-emerald-950/10 text-emerald-300/40'
      }
    ];

    const currentTheme = baseColors[idx] || baseColors[0];

    if (isSubmittingPhase) {
      if (isThisOptionCorrect) return currentTheme.correct;
      if (isSelected && !isThisOptionCorrect) {
        return 'border-rose-500 ring-2 ring-rose-500 bg-gradient-to-r from-rose-950/40 to-rose-900/30 text-rose-100';
      }
      return 'border-slate-800/50 bg-slate-900/20 text-slate-500';
    }

    if (isSelected) return currentTheme.active;
    return currentTheme.border;
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070b16] text-[#e2e8f0] font-sans selection:bg-fuchsia-500/30 selection:text-white relative overflow-hidden">

      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-3xl" />
      </div>

      {/* Audio Elements */}
      <audio
        ref={bgMusicRef}
        src="/audio/bg-music.mp3"
        loop
        preload="auto"
        onError={() => console.log('Background music file not found.')}
      />
      <audio
        ref={applauseRef}
        src="/audio/applause.mp3"
        preload="auto"
        onError={() => setApplauseAvailable(false)}
      />

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes countdownPulse {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 70, 239, 0.3); }
          50% { box-shadow: 0 0 40px rgba(217, 70, 239, 0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes equalizer1 { 0%, 100% { height: 30%; } 50% { height: 100%; } }
        @keyframes equalizer2 { 0%, 100% { height: 60%; } 50% { height: 30%; } }
        @keyframes equalizer3 { 0%, 100% { height: 80%; } 50% { height: 40%; } }
        @keyframes equalizer4 { 0%, 100% { height: 40%; } 50% { height: 90%; } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-countdown { animation: countdownPulse 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .eq-bar-1 { animation: equalizer1 0.8s ease-in-out infinite; }
        .eq-bar-2 { animation: equalizer2 0.6s ease-in-out infinite; }
        .eq-bar-3 { animation: equalizer3 0.7s ease-in-out infinite; }
        .eq-bar-4 { animation: equalizer4 0.9s ease-in-out infinite; }
      `}</style>

      {/* HEADER */}
      {/* <header className="border-b border-slate-800/60 bg-[#0a0f24]/80 backdrop-blur-xl sticky top-0 z-40 px-4 py-3 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-900/30 animate-float">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">TechVocab Quiz</h1>
              <p className="text-xs text-slate-400">English for IT • Interactive Challenge</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium tracking-wide">UAS Project Ready</span>
          </div>
        </div>
      </header> */}

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10 pb-32">

        {/* COUNTDOWN SCREEN */}
        {quizState === 'countdown' && (
          <div className="fixed inset-0 bg-[#070b16]/95 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="text-center space-y-8">
              {countdown > 0 ? (
                <>
                  <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 font-bold animate-pulse">
                    Get Ready
                  </div>
                  <div className="relative">
                    <div
                      key={countdown}
                      className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-400 via-pink-400 to-indigo-600 animate-countdown leading-none"
                    >
                      {countdown}
                    </div>
                    <div
                      key={`glow-${countdown}`}
                      className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-fuchsia-500/20 blur-2xl animate-countdown leading-none flex items-center justify-center"
                    >
                      {countdown}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm font-medium">
                    Prepare your answers...
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-7xl animate-float">🎯</div>
                  <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-indigo-400 animate-pulse">
                    QUIZ BEGINS!
                  </h2>
                  <p className="text-slate-300 text-lg font-medium">
                    Good luck and give it your best!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* IDLE / START SCREEN */}
        {quizState === 'idle' && (
          <div className="max-w-3xl mx-auto animate-slideUp">
            <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl text-center space-y-8 relative overflow-hidden">

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-fuchsia-900/40 animate-glow">
                  <Trophy className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-3 relative">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Interactive Vocabulary Test
                </h2>
                <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Challenge yourself with our intense 15-second countdown quiz. Test your knowledge of hardware, software, and IT terminology!
                </p>
              </div>

              <div className="bg-[#090d22]/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3 relative">
                <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-400 uppercase tracking-widest">
                  <Info className="w-4 h-4" />
                  <span>Rule Book</span>
                </div>
                <ul className="text-xs text-slate-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <Timer className="w-3.5 h-3.5 text-fuchsia-400 mt-0.5 shrink-0" />
                    <span>Each question has exactly <strong className="text-slate-200">15 seconds</strong> to respond.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span>If time runs out, you'll move to the <strong className="text-slate-200">explanation screen</strong> with 0 points.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Read explanations carefully after each answer to learn more!</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 max-w-sm mx-auto pt-2 relative">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Select Quiz Mode
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleStartQuiz(5)}
                    className="group py-5 px-4 rounded-2xl border border-slate-800 hover:border-fuchsia-500/60 bg-gradient-to-br from-[#0c1024] to-[#0a0e1f] hover:from-fuchsia-950/30 hover:to-[#0c1024] transition-all text-xs font-bold flex flex-col items-center justify-center gap-2 text-slate-200 shadow-lg hover:shadow-fuchsia-500/20 hover:scale-105"
                  >
                    <Zap className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-black text-fuchsia-400">5</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Quick Run</span>
                  </button>
                  <button
                    onClick={() => handleStartQuiz(20)}
                    className="group py-5 px-4 rounded-2xl border border-slate-800 hover:border-indigo-500/60 bg-gradient-to-br from-[#0c1024] to-[#0a0e1f] hover:from-indigo-950/30 hover:to-[#0c1024] transition-all text-xs font-bold flex flex-col items-center justify-center gap-2 text-slate-200 shadow-lg hover:shadow-indigo-500/20 hover:scale-105"
                  >
                    <Flame className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-black text-indigo-400">20</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Full Challenge</span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-500 italic pt-2">
                  💡 Press either button to start the countdown and begin the quiz!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PLAYING & SUBMITTED STATE */}
        {(quizState === 'playing' || quizState === 'submitted') && activeQuestion && (
          <div className="max-w-3xl mx-auto space-y-5 animate-slideUp">

            <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <div>
                  <div className="text-[10px] text-slate-500 mb-0.5">PROGRESS</div>
                  <div className="text-base font-black text-white tracking-normal">
                    Question <span className="text-fuchsia-400">{currentQuestionIdx + 1}</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-slate-300">{currentQuizQuestions.length}</span>
                  </div>
                </div>

                {streak > 0 && (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold">STREAK</span>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-950/80 to-amber-950/80 border border-amber-700/40">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-400">{streak}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-slate-500 font-semibold">DIFFICULTY</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeQuestion.difficulty === 'Easy' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' :
                    activeQuestion.difficulty === 'Medium' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/40' :
                    'bg-rose-950/80 text-rose-400 border border-rose-800/40'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-slate-500 font-semibold">TIME LEFT</span>
                  <div className={`flex items-center gap-1.5 text-sm font-black px-3 py-1 rounded-full ${
                    timeLeft <= 5
                      ? 'text-rose-400 bg-rose-950/50 border border-rose-800/50 animate-pulse'
                      : 'text-fuchsia-400 bg-fuchsia-950/30 border border-fuchsia-800/30'
                  }`}>
                    <Timer className="w-3.5 h-3.5" />
                    {timeLeft}s
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 mb-0.5">SCORE</div>
                  <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400">
                    {score}
                  </div>
                </div>
              </div>

              <div className="w-full h-2 bg-slate-900/80 rounded-full overflow-hidden relative border border-slate-800/50">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 transition-all duration-500 rounded-full shadow-lg shadow-fuchsia-500/50"
                  style={{ width: `${((currentQuestionIdx + 1) / currentQuizQuestions.length) * 100}%` }}
                />
                <div
                  className={`absolute top-0 right-0 h-full transition-all duration-1000 rounded-full ${
                    timeLeft <= 5 ? 'bg-rose-500/60' : 'bg-fuchsia-400/30'
                  }`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-900/60 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  <Target className="w-3 h-3" />
                  Vocabulary & Technical Check
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {activeQuestion.points} pts
                </span>
              </div>

              <h4 className="text-lg md:text-xl font-bold leading-relaxed text-white relative">
                {activeQuestion.question}
              </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const isSubmitted = quizState === 'submitted';
                const isCorrectOption = option.isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => setSelectedOptionIdx(idx)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 relative flex items-center justify-between group backdrop-blur-sm ${
                      getOptionColorStyles(idx, isSelected, isSubmitted, isCorrectOption)
                    } ${!isSubmitted ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}
                  >
                    <div className="flex items-center gap-4 pr-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase transition-all ${
                        isSubmitted && isCorrectOption
                          ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30'
                          : isSelected
                          ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30'
                          : 'bg-slate-900/80 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                      }`}>
                        {getLetter(idx)}
                      </div>

                      <span className="text-sm font-semibold tracking-wide leading-snug">
                        {option.text}
                      </span>
                    </div>

                    <div className="shrink-0">
                      {isSubmitted && isCorrectOption && (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center animate-fadeIn">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      {isSubmitted && isSelected && !isCorrectOption && (
                        <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-400 flex items-center justify-center animate-shake">
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col space-y-4">

              {quizState === 'submitted' && (
                <div className={`p-5 rounded-2xl border-2 transition-all duration-500 animate-slideUp ${
                  selectedOptionIdx !== null && activeQuestion.options[selectedOptionIdx].isCorrect
                    ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 to-emerald-900/10'
                    : 'border-rose-500/40 bg-gradient-to-br from-rose-950/20 to-rose-900/10'
                }`}>
                  <div className="flex items-start gap-3">
                    {selectedOptionIdx !== null && activeQuestion.options[selectedOptionIdx].isCorrect ? (
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5 text-rose-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h5 className={`font-bold text-sm tracking-wide mb-1 ${
                        selectedOptionIdx !== null && activeQuestion.options[selectedOptionIdx].isCorrect
                          ? 'text-emerald-300'
                          : 'text-rose-300'
                      }`}>
                        {selectedOptionIdx !== null && activeQuestion.options[selectedOptionIdx].isCorrect
                          ? "✨ Splendid! Correct Answer"
                          : selectedOptionIdx === null
                          ? "⏰ Time's Up! Unanswered"
                          : "❌ Oops! Incorrect Answer"
                        }
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 italic">
                  {quizState === 'playing' ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Choose an option to lock in your answer.</span>
                    </>
                  ) : (
                    <>
                      <Info className="w-4 h-4 text-indigo-400" />
                      <span>Review details, then advance when ready.</span>
                    </>
                  )}
                </div>

                {quizState === 'playing' ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOptionIdx === null}
                    className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                      selectedOptionIdx !== null
                        ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white cursor-pointer hover:shadow-fuchsia-500/40 hover:scale-105 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-white to-slate-100 text-[#0a0f24] font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-white/20 active:scale-95 transition-all flex items-center gap-2"
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUMMARY / RESULTS SCREEN */}
        {quizState === 'summary' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-slideUp">

            <div className={`bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border rounded-3xl p-6 md:p-10 text-center space-y-6 relative overflow-hidden shadow-2xl ${
              Math.round((correctCount / currentQuizQuestions.length) * 100) === 100
                ? 'border-amber-500/50 animate-glow'
                : 'border-slate-800/80'
            }`}>
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white shadow-2xl animate-float ${
                  Math.round((correctCount / currentQuizQuestions.length) * 100) === 100
                    ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shadow-amber-900/40'
                    : 'bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-indigo-500 shadow-fuchsia-900/40'
                }`}>
                  <Trophy className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-2 relative">
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {Math.round((correctCount / currentQuizQuestions.length) * 100) === 100 ? '🏆 PERFECT SCORE!' : '🎉 Congratulations!'}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {Math.round((correctCount / currentQuizQuestions.length) * 100) === 100
                    ? "Incredible! You've achieved a flawless victory. You are a true tech vocabulary master!"
                    : "You have finished the English for IT vocabulary test. Here is your performance evaluation:"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-2 relative">

                <div className="bg-gradient-to-br from-[#090d22] to-[#070b16] border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center shadow-lg">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Final Score</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400 mt-1">
                    {score}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 font-medium">points</span>
                </div>

                <div className="bg-gradient-to-br from-[#090d22] to-[#070b16] border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center shadow-lg">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Accuracy</span>
                  <span className={`text-3xl font-black mt-1 ${
                    Math.round((correctCount / currentQuizQuestions.length) * 100) === 100
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400'
                  }`}>
                    {Math.round((correctCount / currentQuizQuestions.length) * 100)}%
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 font-medium">
                    {correctCount}/{currentQuizQuestions.length}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#090d22] to-[#070b16] border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center shadow-lg">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Duration</span>
                  <span className="text-3xl font-black text-white mt-1">
                    {totalDuration}s
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 font-medium">total time</span>
                </div>
              </div>

              <div className="bg-[#080c1e]/80 backdrop-blur-sm border border-slate-900 rounded-xl p-4 max-w-xl mx-auto relative">
                <p className="text-xs italic text-slate-300 leading-relaxed font-medium">
                  💬 "{getFeedbackQuote(Math.round((correctCount / currentQuizQuestions.length) * 100))}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 relative">
                <button
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 text-slate-300 font-bold text-xs uppercase tracking-widest transition-all hover:scale-105"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => handleStartQuiz(quizLength)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/30 hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-fuchsia-400" />
                Detailed Performance Review
              </h4>

              <div className="space-y-3 divide-y divide-slate-800/40">
                {quizHistory.map((hist, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 space-y-2 text-xs animate-fadeIn">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-bold text-slate-200 leading-relaxed">
                        <span className="text-fuchsia-400 mr-2">{idx + 1}.</span>
                        {hist.question}
                      </span>
                      <span className={`shrink-0 flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full text-[10px] ${
                        hist.isCorrect
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                          : hist.wasTimeout
                          ? 'bg-amber-950/50 text-amber-400 border border-amber-800/40'
                          : 'bg-rose-950/50 text-rose-400 border border-rose-800/40'
                      }`}>
                        {hist.isCorrect ? (
                          <><Check className="w-3 h-3 stroke-[3]" /> Correct</>
                        ) : hist.wasTimeout ? (
                          <><Clock className="w-3 h-3" /> Timeout</>
                        ) : (
                          <><X className="w-3 h-3 stroke-[3]" /> Wrong</>
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 pl-6">
                      <div>
                        Your answer: <span className={hist.isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                          {hist.selected || 'No Response'}
                        </span>
                      </div>
                      <div>
                        Correct: <span className="text-emerald-400 font-semibold">{hist.correct}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MUSIC PLAYER BAR */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-40 sm:min-w-[340px] animate-slideUp">
        <div className="bg-gradient-to-br from-[#0f1530]/95 to-[#0a0f24]/95 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-fuchsia-950/20 overflow-hidden">
          
          {isMusicPlaying && (
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          )}

          <div className="relative p-3 flex items-center gap-3">
            
            <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-fuchsia-900/40 shrink-0 ${
              isMusicPlaying ? 'animate-glow' : ''
            }`}>
              <Music className={`w-5 h-5 text-white ${isMusicPlaying ? 'animate-spin-slow' : ''}`} />
              
              {isMusicPlaying && (
                <div className="absolute inset-0 rounded-xl border-2 border-fuchsia-400/50 animate-ping" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">Background Music</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    {isMusicPlaying ? (
                      <span className="text-fuchsia-400">♫ Now Playing</span>
                    ) : isMusicEnabled ? (
                      <span className="text-amber-400">⏸ Paused</span>
                    ) : (
                      <span className="text-slate-500">⏹ Stopped</span>
                    )}
                  </div>
                </div>

                {isMusicPlaying && (
                  <div className="flex items-end gap-0.5 h-5 shrink-0">
                    <div className="w-0.5 bg-gradient-to-t from-fuchsia-500 to-pink-400 rounded-full eq-bar-1" />
                    <div className="w-0.5 bg-gradient-to-t from-fuchsia-500 to-pink-400 rounded-full eq-bar-2" />
                    <div className="w-0.5 bg-gradient-to-t from-fuchsia-500 to-pink-400 rounded-full eq-bar-3" />
                    <div className="w-0.5 bg-gradient-to-t from-fuchsia-500 to-pink-400 rounded-full eq-bar-4" />
                  </div>
                )}
              </div>

              <div className="mt-1.5 h-1 bg-slate-800/80 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isMusicPlaying
                      ? 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 w-full'
                      : 'bg-slate-600 w-0'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handlePlay}
                disabled={isMusicPlaying}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isMusicPlaying
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 hover:scale-110 active:scale-95 shadow-lg shadow-emerald-900/30'
                }`}
                title="Play Music"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={handlePause}
                disabled={!isMusicPlaying}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  !isMusicPlaying
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 hover:scale-110 active:scale-95 shadow-lg shadow-amber-900/30'
                }`}
                title="Pause Music"
              >
                <Pause className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={handleStop}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 text-white hover:from-rose-400 hover:to-rose-500 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-rose-900/30"
                title="Stop Music"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          FIREWORKS OVERLAY
          Muncul saat skor 100%, lalu otomatis
          menghilang setelah semua partikel selesai
          ========================================== */}
      {showFireworks && <Fireworks onComplete={handleFireworksComplete} />}

    </div>
  );
}