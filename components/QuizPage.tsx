// components/quiz/QuizPage.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { QUIZ_QUESTIONS } from '@/data/quizData';
import { playSound, speakText, playApplause } from '@/lib/quiz/audioEngine';

import QuizStyles from './QuizStyles';
import NameInputScreen from './NameInputScreen';
import CountdownScreen from './CountdownScreen';
import IdleScreen from './IdleScreen';
import PlayingScreen from './PlayingScreen';
import SummaryScreen from './SummaryScreen';
import MusicDock from './MusicDock';

const Fireworks = lazy(() => import('./Fireworks'));

type QuizState = 'nameInput' | 'idle' | 'countdown' | 'playing' | 'submitted' | 'summary';

export default function QuizPage() {
  // ============ STATE MANAGEMENT ============
  const [playerName, setPlayerName] = useState<string>('');
  const [quizLength, setQuizLength] = useState<number>(5);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<typeof QUIZ_QUESTIONS>([]);
  const [quizState, setQuizState] = useState<QuizState>('nameInput');
  const [countdown, setCountdown] = useState<number>(3);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showFireworks, setShowFireworks] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<{
    question: string; selected: string | null; correct: string;
    isCorrect: boolean; wasTimeout: boolean;
  }[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [applauseAvailable, setApplauseAvailable] = useState<boolean>(true);

  // ============ REFS ============
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const applauseRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // ============ MUSIC CONTROLS ============
  const playBgMusic = useCallback(() => {
    if (isMusicEnabled && bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3;
      bgMusicRef.current.play().then(() => setIsMusicPlaying(true))
        .catch((e) => console.log('Music autoplay blocked:', e));
    }
  }, [isMusicEnabled]);

  const pauseBgMusic = useCallback(() => {
    if (bgMusicRef.current && isMusicPlaying) {
      bgMusicRef.current.pause();
      setIsMusicPlaying(false);
    }
  }, [isMusicPlaying]);

  const handlePlay = () => {
    setIsMusicEnabled(true);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3;
      bgMusicRef.current.play().then(() => setIsMusicPlaying(true))
        .catch((e) => console.log('Play failed:', e));
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

  // ============ RESULT FEEDBACK ============
  const playResultFeedback = useCallback((accuracy: number) => {
    if (accuracy === 100) {
      setShowFireworks(true);
      setTimeout(() => {
        speakText(`Congratulations ${playerName}! Perfect score! You are absolutely amazing!`, 0.95, 1.2);
      }, 300);
      setTimeout(() => {
        playApplause(applauseRef, applauseAvailable, 5);
      }, 1500);
    } else if (accuracy >= 50) {
      setTimeout(() => {
        speakText(`Great job ${playerName}! You did really well! Keep up the excellent work!`, 0.95, 1.1);
      }, 300);
      setTimeout(() => {
        playApplause(applauseRef, applauseAvailable, 4);
      }, 1800);
    } else {
      setTimeout(() => {
        speakText(`Don't give up ${playerName}! Keep practicing and you will do better next time!`, 0.9, 1.0);
      }, 300);
    }
  }, [playerName, applauseAvailable]);

  // ============ QUIZ HANDLERS ============
  // ✅ FIX: Pindahkan SEMUA handler ke ATAS sebelum useEffect
  
  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setQuizState('idle');
    setTimeout(() => speakText(`Welcome ${name}! Ready for the challenge?`, 0.95, 1.1), 300);
  };

  const handleChangeName = () => {
    setPlayerName('');
    setQuizState('nameInput');
    pauseBgMusic();
    window.speechSynthesis.cancel();
  };

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

  // ✅ FIX: handleTimeOut sekarang dideklarasikan SEBELUM useEffect yang memanggilnya
  const handleTimeOut = () => {
    pauseBgMusic();
    playSound('timeout');
    setStreak(0);

    const activeQuestion = currentQuizQuestions[currentQuestionIdx];
    const correctOption = activeQuestion.options.find(opt => opt.isCorrect);

    setTimeout(() => {
      speakText(`Time's up! The correct answer is ${correctOption?.text}`, 0.85, 0.9);
    }, 600);

    setQuizHistory(prev => [...prev, {
      question: activeQuestion.question,
      selected: null,
      correct: correctOption?.text || '',
      isCorrect: false,
      wasTimeout: true
    }]);

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
          `Correct! Well done ${playerName}!`,
          `Excellent! That's right!`,
          `Perfect! Great job ${playerName}!`,
          `Yes! You got it!`
        ];
        speakText(phrases[Math.floor(Math.random() * phrases.length)], 0.95, 1.2);
      }, 500);
    } else {
      playSound('incorrect');
      setStreak(0);
      setTimeout(() => {
        speakText(`Incorrect. The correct answer is ${correctOption?.text}`, 0.85, 0.9);
      }, 600);
    }

    setQuizHistory(prev => [...prev, {
      question: activeQuestion.question,
      selected: chosenOption.text,
      correct: correctOption?.text || '',
      isCorrect,
      wasTimeout: false
    }]);

    setQuizState('submitted');
  };

  const handleNextQuestion = () => {
    const isLast = currentQuestionIdx === currentQuizQuestions.length - 1;
    if (isLast) {
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      pauseBgMusic();
      playSound('victory');

      const accuracy = Math.round((correctCount / currentQuizQuestions.length) * 100);

      setTimeout(() => {
        setQuizState('summary');
        setTimeout(() => playResultFeedback(accuracy), 400);
      }, 800);
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setTimeLeft(15);
      setQuizState('playing');
      setTimeout(() => playBgMusic(), 300);
    }
  };

  const handleResetQuiz = () => {
    setQuizState('nameInput');
    setPlayerName('');
    setShowFireworks(false);
    pauseBgMusic();
    if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    window.speechSynthesis.cancel();
  };

  const handleFireworksComplete = () => setShowFireworks(false);

  // ============ EFFECTS ============
  // ✅ SEKARANG useEffect bisa memanggil handleTimeOut tanpa error
  
  useEffect(() => {
    if (quizState === 'countdown') {
      if (countdown > 0) {
        playSound('countdown');
        countdownRef.current = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      } else {
        speakText(`Quiz begins! Good luck ${playerName}!`, 0.9, 1.1);
        countdownRef.current = setTimeout(() => {
          setQuizState('playing');
          playBgMusic();
          durationIntervalRef.current = setInterval(() => setTotalDuration(prev => prev + 1), 1000);
        }, 1800);
      }
    }
    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [quizState, countdown, playerName, playBgMusic]);

  useEffect(() => {
    if (quizState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();  // ✅ Sekarang aman, handleTimeOut sudah dideklarasikan
            return 0;
          }
          if (prev <= 5) playSound('tick');
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, currentQuestionIdx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
      bgMusicRef.current?.pause();
      applauseRef.current?.pause();
      window.speechSynthesis.cancel();
    };
  }, []);

  // ============ RENDER ============
  if (quizState === 'nameInput') {
    return (
      <>
        <QuizStyles />
        <NameInputScreen onSubmit={handleNameSubmit} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b16] text-[#e2e8f0] font-sans selection:bg-fuchsia-500/30 selection:text-white relative overflow-hidden">
      <QuizStyles />

      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-3xl" />
      </div>

      {/* Audio Elements */}
      <audio ref={bgMusicRef} src="/audio/bg-music.mp3" loop preload="auto"
        onError={() => console.log('Background music file not found.')} />
      <audio ref={applauseRef} src="/audio/applause.mp3" preload="auto"
        onError={() => setApplauseAvailable(false)} />

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10 pb-32">
        {quizState === 'countdown' && (
          <CountdownScreen countdown={countdown} playerName={playerName} />
        )}

        {quizState === 'idle' && (
          <IdleScreen
            playerName={playerName}
            onStartQuiz={handleStartQuiz}
            onChangeName={handleChangeName}
          />
        )}

        {(quizState === 'playing' || quizState === 'submitted') && currentQuizQuestions[currentQuestionIdx] && (
          <PlayingScreen
            activeQuestion={currentQuizQuestions[currentQuestionIdx]}
            currentQuestionIdx={currentQuestionIdx}
            totalQuestions={currentQuizQuestions.length}
            timeLeft={timeLeft}
            score={score}
            streak={streak}
            selectedOptionIdx={selectedOptionIdx}
            quizState={quizState}
            playerName={playerName}
            onSelectOption={setSelectedOptionIdx}
            onSubmitAnswer={handleSubmitAnswer}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {quizState === 'summary' && (
          <SummaryScreen
            playerName={playerName}
            score={score}
            correctCount={correctCount}
            totalQuestions={currentQuizQuestions.length}
            totalDuration={totalDuration}
            quizHistory={quizHistory}
            onReset={handleResetQuiz}
            onTryAgain={() => handleStartQuiz(quizLength)}
          />
        )}
      </main>

      <MusicDock
        isMusicPlaying={isMusicPlaying}
        isMusicEnabled={isMusicEnabled}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
      />

      {showFireworks && (
        <Suspense fallback={null}>
          <Fireworks onComplete={handleFireworksComplete} />
        </Suspense>
      )}
    </div>
  );
}