// components/quiz/PlayingScreen.tsx
import React from 'react';
import {
  Check, X, Timer, Target, Flame, Sparkles, Info,
  ChevronRight, CheckCircle2, XCircle, User
} from 'lucide-react';
import { getLetter, getOptionColorStyles } from '@/lib/quiz/quizHelpers';
import type { QUIZ_QUESTIONS } from '@/data/quizData';

type Question = typeof QUIZ_QUESTIONS[number];

interface PlayingScreenProps {
  activeQuestion: Question;
  currentQuestionIdx: number;
  totalQuestions: number;
  timeLeft: number;
  score: number;
  streak: number;
  selectedOptionIdx: number | null;
  quizState: 'playing' | 'submitted';
  playerName: string;
  onSelectOption: (idx: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
}

export default function PlayingScreen({
  activeQuestion, currentQuestionIdx, totalQuestions,
  timeLeft, score, streak, selectedOptionIdx,
  quizState, playerName,
  onSelectOption, onSubmitAnswer, onNextQuestion
}: PlayingScreenProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slideUp">
      {/* Player Name Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-950/30 border border-fuchsia-800/40">
          <User className="w-3.5 h-3.5 text-fuchsia-400" />
          <span className="text-xs font-bold text-fuchsia-300">{playerName}</span>
        </div>
      </div>

      {/* Progress Header */}
      <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <div>
            <div className="text-[10px] text-slate-500 mb-0.5">PROGRESS</div>
            <div className="text-base font-black text-white tracking-normal">
              Question <span className="text-fuchsia-400">{currentQuestionIdx + 1}</span>
              <span className="text-slate-600 mx-1">/</span>
              <span className="text-slate-300">{totalQuestions}</span>
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
            style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
          />
          <div
            className={`absolute top-0 right-0 h-full transition-all duration-1000 rounded-full ${
              timeLeft <= 5 ? 'bg-rose-500/60' : 'bg-fuchsia-400/30'
            }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-gradient-to-br from-[#0f1530] to-[#0a0f24] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-900/60 px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Target className="w-3 h-3" />
            Vocabulary & Technical Check
          </span>
          <span className="text-[10px] text-slate-500 font-medium">{activeQuestion.points} pts</span>
        </div>
        <h4 className="text-lg md:text-xl font-bold leading-relaxed text-white relative">
          {activeQuestion.question}
        </h4>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {activeQuestion.options.map((option, idx) => {
          const isSelected = selectedOptionIdx === idx;
          const isSubmitted = quizState === 'submitted';
          const isCorrectOption = option.isCorrect;

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => onSelectOption(idx)}
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
                <span className="text-sm font-semibold tracking-wide leading-snug">{option.text}</span>
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

      {/* Explanation & Actions */}
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
                    ? `✨ Splendid! Correct Answer, ${playerName}!`
                    : selectedOptionIdx === null
                    ? `⏰ Time's Up! Unanswered`
                    : `❌ Oops! Incorrect Answer, ${playerName}`}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">{activeQuestion.explanation}</p>
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
              onClick={onSubmitAnswer}
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
              onClick={onNextQuestion}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-white to-slate-100 text-[#0a0f24] font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-white/20 active:scale-95 transition-all flex items-center gap-2"
            >
              Next Question
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}