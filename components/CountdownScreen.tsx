// components/quiz/CountdownScreen.tsx
import React from 'react';

interface CountdownScreenProps {
  countdown: number;
  playerName: string;
}

export default function CountdownScreen({ countdown, playerName }: CountdownScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#070b16]/95 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="text-center space-y-8">
        {countdown > 0 ? (
          <>
            <div className="text-sm uppercase tracking-[0.3em] text-fuchsia-400 font-bold animate-pulse">
              Get Ready, <span className="text-pink-400">{playerName}</span>
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
            <div className="text-slate-400 text-sm font-medium">Prepare your answers...</div>
          </>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-7xl animate-float">🎯</div>
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-indigo-400 animate-pulse">
              QUIZ BEGINS!
            </h2>
            <p className="text-slate-300 text-lg font-medium">
              Good luck, <span className="text-fuchsia-400 font-bold">{playerName}</span>! Give it your best!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}