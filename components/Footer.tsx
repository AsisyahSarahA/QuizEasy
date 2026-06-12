import React from 'react';
import { Globe, Code2, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#070A10] py-10 ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-300 font-medium text-sm mb-6">
          © 2026 ESP 2 Final Project • Group MI 24
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Tema: English for Technology (Hardware & Software)</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Media: React + Tailwind CSS</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Deploy target: Vercel</span>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-600 max-w-2xl mx-auto">
          Dirancang secara dinamis untuk interaksi yang mulus tanpa hambatan. Mudah disesuaikan untuk kebutuhan pembelajaran bahasa Inggris IT yang spesifik.
        </p>
      </div>
    </footer>
  );
}