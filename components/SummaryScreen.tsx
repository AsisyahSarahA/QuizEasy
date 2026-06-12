// components/quiz/SummaryScreen.tsx
import React from 'react';
import { Trophy, RotateCcw, Layers, Check, X, Clock } from 'lucide-react';
import PlayerBadge from '@/components/PlayerBadge';
import { getFeedbackQuote } from '@/lib/quiz/quizHelpers';

interface QuizHistoryItem {
  question: string;
  selected: string | null;
  correct: string;
  isCorrect: boolean;
  wasTimeout: boolean;
}

interface SummaryScreenProps {
  playerName: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  totalDuration: number;
  quizHistory: QuizHistoryItem[];
  onReset: () => void;
  onTryAgain: () => void;
}

export default function SummaryScreen({
  playerName, score, correctCount, totalQuestions, totalDuration,
  quizHistory, onReset, onTryAgain
}: SummaryScreenProps) {
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const isPerfect = accuracy === 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-slideUp">
      {/* Congratulations Card */}
      <div className={`bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border rounded-3xl p-6 md:p-10 text-center space-y-6 relative overflow-hidden shadow-2xl ${
        isPerfect ? 'border-amber-500/50 animate-glow' : 'border-slate-800/80'
      }`}>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <PlayerBadge name={playerName} variant="large" />

        <div className="relative">
          <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white shadow-2xl animate-float ${
            isPerfect
              ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shadow-amber-900/40'
              : 'bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-indigo-500 shadow-fuchsia-900/40'
          }`}>
            <Trophy className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2 relative">
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight animate-nameReveal">
            {isPerfect
              ? <>🏆 PERFECT SCORE, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">{playerName.toUpperCase()}</span>!</>
              : <>🎉 Congratulations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">{playerName}</span>!</>}
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {isPerfect
              ? `Incredible ${playerName}! You've achieved a flawless victory. You are a true tech vocabulary master!`
              : `You have finished the English for IT vocabulary test, ${playerName}. Here is your performance evaluation:`}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-2 relative">
          <div className="bg-gradient-to-br from-[#090d22] to-[#070b16] border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center shadow-lg">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Final Score</span>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-400 mt-1">{score}</span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-medium">points</span>
          </div>

          <div className="bg-gradient-to-br from-[#090d22] to-[#070b16] border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center shadow-lg">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Accuracy</span>
            <span className={`text-3xl font-black mt-1 ${
              isPerfect
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400'
            }`}>
              {accuracy}%
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-medium">{correctCount}/{totalQuestions}</span>
          </div>

          <div className="bg-gradient-to-br from-[#090d22] to-[#070b16] border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center shadow-lg">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Duration</span>
            <span className="text-3xl font-black text-white mt-1">{totalDuration}s</span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-medium">total time</span>
          </div>
        </div>

        <div className="bg-[#080c1e]/80 backdrop-blur-sm border border-slate-900 rounded-xl p-4 max-w-xl mx-auto relative">
          <p className="text-xs italic text-slate-300 leading-relaxed font-medium">
            💬 "{getFeedbackQuote(accuracy, playerName)}"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 relative">
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 text-slate-300 font-bold text-xs uppercase tracking-widest transition-all hover:scale-105"
          >
            Back to Home
          </button>
          <button
            onClick={onTryAgain}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/30 hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>

      {/* Detailed Review */}
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
  );
}