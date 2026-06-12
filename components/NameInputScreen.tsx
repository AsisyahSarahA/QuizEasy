'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, ArrowRight, XCircle, UserCircle2 } from 'lucide-react';

interface NameInputScreenProps {
  onSubmit: (name: string) => void;
}

// ✅ FIX: Generate floating letters HANYA di client side
// Pakai useState + useEffect agar tidak ada hydration mismatch
const generateFloatingLetters = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[];';
  const colors = ['#f472b6', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24'];
  
  return Array.from({ length: 35 }, (_, i) => ({
    char: letters[i % letters.length],
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 20,
    size: 1.2 + Math.random() * 3.5,
    opacity: 0.03 + Math.random() * 0.12,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

export default function NameInputScreen({ onSubmit }: NameInputScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [isInputShaking, setIsInputShaking] = useState(false);
  const [floatingLetters, setFloatingLetters] = useState<any[]>([]); // ✅ Empty array initially
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ FIX: Generate floating letters HANYA setelah component mount di client
  useEffect(() => {
    setFloatingLetters(generateFloatingLetters());
  }, []); // Empty dependency = run once on mount

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed.length < 2) {
      setError('Name must be at least 2 characters');
      setIsInputShaking(true);
      setTimeout(() => setIsInputShaking(false), 500);
      return;
    }
    setError('');
    setIsTransitioning(true);

    const capitalizedName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= capitalizedName.length) {
        setDisplayedName(capitalizedName.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => onSubmit(capitalizedName), 1400);
      }
    }, 90);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim().length >= 2) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b16] overflow-hidden">
      {/* Floating Letters Background - hanya render jika sudah ada data */}
      {floatingLetters.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingLetters.map((item, i) => (
            <span
              key={i}
              className="absolute font-black"
              style={{
                left: `${item.left}%`,
                fontSize: `${item.size}rem`,
                opacity: item.opacity,
                color: item.color,
                animation: `floatLetter ${item.duration}s linear ${item.delay}s infinite`,
                top: '-10%',
                textShadow: `0 0 20px ${item.color}40`,
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
      )}

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {!isTransitioning ? (
        <div className={`relative max-w-md w-full mx-4 animate-slideUp ${isInputShaking ? 'animate-shake' : ''}`}>
          <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-fuchsia-900/40 animate-float">
                <UserCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 mx-auto rounded-3xl border-2 border-fuchsia-400/30 animate-spin-slow" style={{ animationDuration: '8s' }} />
            </div>

            <div className="text-center mb-8 relative">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">Challenger!</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enter your name to begin the vocabulary challenge
              </p>
            </div>

            <div className="relative mb-4 group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-pink-500 animate-gradientShift opacity-60 blur group-focus-within:opacity-100 group-focus-within:blur-md transition-all duration-500" />
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-pink-500 animate-gradientShift">
                <div className="bg-[#0a0f24] rounded-2xl flex items-center px-5 py-4 transition-all">
                  <User className="w-5 h-5 text-fuchsia-400 mr-3 shrink-0 group-focus-within:text-pink-400 transition-colors" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your name..."
                    maxLength={30}
                    className="flex-1 bg-transparent text-white text-lg font-semibold placeholder:text-slate-600 outline-none tracking-wide"
                  />
                  {inputValue.length > 0 && (
                    <span className={`text-xs font-bold ml-2 transition-colors ${
                      inputValue.trim().length >= 2 ? 'text-emerald-400' : 'text-slate-500'
                    }`}>
                      {inputValue.length}/30
                    </span>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-xs text-rose-400 text-center flex items-center justify-center gap-1.5 font-medium">
                <XCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={inputValue.trim().length < 2}
              className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group ${
                inputValue.trim().length >= 2
                  ? 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 text-white hover:shadow-2xl hover:shadow-fuchsia-500/40 hover:scale-[1.02] active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Start Challenge</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${
                inputValue.trim().length >= 2 ? 'group-hover:translate-x-1' : ''
              }`} />
            </button>

            <p className="text-center text-[10px] text-slate-500 mt-4 tracking-wide">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">Enter</kbd> to continue • Minimum 2 characters
            </p>
          </div>
        </div>
      ) : (
        <div className="relative text-center animate-fadeIn px-4">
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  background: ['#f472b6', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24'][i % 5],
                  animation: `confettiPop 1.5s ease-out ${i * 0.05}s both`,
                }}
              />
            ))}
          </div>

          <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 font-bold mb-6 animate-pulse">
            ✨ Welcome ✨
          </div>

          <div className="relative mb-6">
            <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-indigo-400 min-h-[6rem] leading-tight">
              {displayedName}
              <span className="inline-block w-1 h-14 md:h-20 bg-fuchsia-400 ml-1 animate-pulse align-middle" />
            </div>
            <div className="absolute inset-0 text-6xl md:text-8xl font-black text-fuchsia-500/20 blur-2xl leading-tight pointer-events-none">
              {displayedName}
            </div>
          </div>

          <div className="text-slate-300 text-lg font-medium animate-slideUp" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            Get ready for the challenge, <span className="text-fuchsia-400 font-bold">{displayedName}</span>!
          </div>
        </div>
      )}
    </div>
  );
}