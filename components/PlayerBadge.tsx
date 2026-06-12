// components/quiz/PlayerBadge.tsx
import React from 'react';
import { User, Edit3 } from 'lucide-react';

interface PlayerBadgeProps {
  name: string;
  variant?: 'default' | 'large';
  onEdit?: () => void;
}

export default function PlayerBadge({ name, variant = 'default', onEdit }: PlayerBadgeProps) {
  if (variant === 'large') {
    return (
      <div className="relative flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-950/60 to-indigo-950/60 border border-fuchsia-600/50 shadow-lg shadow-fuchsia-900/30">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-md">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-[9px] uppercase tracking-widest text-fuchsia-400 font-bold">Player</div>
            <div className="text-sm font-black text-white">{name}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-950/50 to-indigo-950/50 border border-fuchsia-700/40 shadow-lg shadow-fuchsia-900/20">
      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-fuchsia-500 to-pink-500 flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-bold text-white">{name}</span>
      {onEdit && (
        <button
          onClick={onEdit}
          className="ml-1 p-1 rounded-md hover:bg-fuchsia-800/40 text-slate-400 hover:text-fuchsia-300 transition-colors"
          title="Change Name"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}