// components/quiz/IdleScreen.tsx
import React from 'react';
import { Trophy, Zap, Flame, Info, Timer, XCircle, CheckCircle2 } from 'lucide-react';
import PlayerBadge from './PlayerBadge';

interface IdleScreenProps {
  playerName: string;
  onStartQuiz: (length: number) => void;
  onChangeName: () => void;
}

export default function IdleScreen({ playerName, onStartQuiz, onChangeName }: IdleScreenProps) {
  return (
    <div className="max-w-3xl mx-auto animate-slideUp">
      <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex justify-center">
          <PlayerBadge name={playerName} onEdit={onChangeName} />
        </div>

        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-fuchsia-900/40 animate-glow">
            <Trophy className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-3 relative">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Ready, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">{playerName}</span>?
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
              <span>If time runs out, you will move to the <strong className="text-slate-200">explanation screen</strong> with 0 points.</span>
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
              onClick={() => onStartQuiz(5)}
              className="group py-5 px-4 rounded-2xl border border-slate-800 hover:border-fuchsia-500/60 bg-gradient-to-br from-[#0c1024] to-[#0a0e1f] hover:from-fuchsia-950/30 hover:to-[#0c1024] transition-all text-xs font-bold flex flex-col items-center justify-center gap-2 text-slate-200 shadow-lg hover:shadow-fuchsia-500/20 hover:scale-105"
            >
              <Zap className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black text-fuchsia-400">5</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Quick Run</span>
            </button>
            <button
              onClick={() => onStartQuiz(20)}
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
  );
}