// lib/quiz/quizHelpers.ts

export const getLetter = (index: number): string => ['A', 'B', 'C', 'D'][index];

export const getFeedbackQuote = (accuracy: number, playerName: string): string => {
  if (accuracy === 100) {
    return `Flawless performance, ${playerName}! You display advanced command of technology jargon.`;
  } else if (accuracy >= 80) {
    return `Phenomenal, ${playerName}! Your understanding of tech terms is top-tier. Keep soaring!`;
  } else if (accuracy >= 50) {
    return `Good job, ${playerName}! You have a solid grasp of IT concepts, but there's room to perfect it.`;
  } else {
    return `Don't give up, ${playerName}! Revision is key. Let's head back to the learning materials.`;
  }
};

export interface OptionColorTheme {
  border: string;
  active: string;
  correct: string;
  wrong: string;
}

export const getOptionColorStyles = (
  idx: number,
  isSelected: boolean,
  isSubmittingPhase: boolean,
  isThisOptionCorrect: boolean
): string => {
  const baseColors: OptionColorTheme[] = [
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