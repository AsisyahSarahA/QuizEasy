import React from 'react';
import { Code2, BookOpen, Gamepad2 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Code2 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">TechVocab</h1>
            <p className="text-xs text-slate-400">English for IT • Group MI 24</p>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-[#131B2B] rounded-full p-1 border border-slate-800">
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            1. Landing & Learn
          </button>
          <button className="px-5 py-2 rounded-full text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            2. Interactive Quiz
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          UAS Project Ready
        </div>
      </div>
    </header>
  );
}