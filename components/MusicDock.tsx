// components/quiz/MusicDock.tsx
import React from 'react';
import { Music, Play, Pause, Square } from 'lucide-react';

interface MusicDockProps {
  isMusicPlaying: boolean;
  isMusicEnabled: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function MusicDock({
  isMusicPlaying, isMusicEnabled,
  onPlay, onPause, onStop
}: MusicDockProps) {
  return (
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
              onClick={onPlay}
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
              onClick={onPause}
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
              onClick={onStop}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 text-white hover:from-rose-400 hover:to-rose-500 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-rose-900/30"
              title="Stop Music"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}