"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, BookOpen, Gamepad2 } from 'lucide-react';

export default function Navbar() {
  // 1. Ambil path URL saat ini (misal: '/', '/quiz', atau '/feedback')
  const pathname = usePathname();

  // 2. Bungkus menu dalam array objek agar kode rapi (DRY)
  const navItems = [
    {
      name: '1. Landing & Learn',
      path: '/',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      name: '2. Interactive Quiz',
      path: '/quiz',
      icon: <Gamepad2 className="w-4 h-4" />
    },
    {
      name: '3. Presentation',
      path: '/presentation',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  return (
    <header className="border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo (Klik untuk kembali ke Home) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Code2 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">TechVocab</h1>
            <p className="text-xs text-slate-400">English for IT • Group MI 24</p>
          </div>
        </Link>

        {/* 3. Navigasi Dinamis */}
        <div className="hidden md:flex items-center bg-[#131B2B] rounded-full p-1 border border-slate-800">
          {navItems.map((item) => {
            // Cek apakah halaman item ini sedang dibuka oleh user
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Status Project */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          UAS Project Ready
        </div>

      </div>
    </header>
  );
}