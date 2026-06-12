<<<<<<< HEAD
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Cpu, Monitor, Code, Sparkles, Layers, Zap, BookOpen, Volume2, Award, Users, Play, Maximize, Minimize, X } from 'lucide-react';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSimulatedFullscreen, setIsSimulatedFullscreen] = useState(false);
  const presentationRef = useRef<HTMLDivElement | null>(null);

  const teamMembers = [
    { name: "Asisyah Sarah Azzahra", role: "Developer" },
    { name: "Esa Permana", role: "Developer" },
    { name: "Rayi Dwika Nugraha", role: "Developer" }
  ];

  const techStack = [
    { name: "Next.js (TSX)", icon: <Code className="w-8 h-8 text-blue-400" />, desc: "Framework React dengan TypeScript untuk performa dan struktur yang solid." },
    { name: "Tailwind CSS", icon: <Sparkles className="w-8 h-8 text-teal-400" />, desc: "Framework CSS Utility-first untuk styling UI yang cepat dan futuristik." },
  { name: "GitHub", icon: <Code className="w-8 h-8 text-gray-300" />, desc: "Version control dan kolaborasi tim yang efisien." }
  ];

  const slides = [
    // Slide 1: App Identity (Fokus langsung pada detail APK)
    <div key="slide1" className="flex flex-col items-center justify-center h-full text-center space-y-8 w-full">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse">
        <Monitor className="w-4 h-4" /> Interactive Learning Application
      </div>
      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-2 leading-tight">
        Master English for <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Software & Hardware</span>
      </h1>
      <p className="text-base md:text-xl text-gray-400 max-w-3xl font-light leading-relaxed">
        An interactive and immersive tool designed to enrich your English IT vocabulary, pronunciation, and technical definitions in a fun Kahoot-style environment.
      </p>
      <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 rounded-full bg-[#111827] border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
              Start Learning <ChevronRight className="w-4 h-4" />
          </button>
          <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
              <Play className="w-4 h-4" fill="currentColor" /> Try Kahoot! Quiz
          </button>
      </div>
    </div>,

    // Slide 2: Fitur Utama Aplikasi (Detail APK)
    <div key="slide2" className="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Fitur <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Unggulan</span>
        </h2>
        <p className="text-gray-400">Apa yang membuat QuizEasy berbeda?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-[#0B101E]/80 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Rich Vocabulary</h3>
          <p className="text-gray-400 leading-relaxed">Pelajari kosakata krusial seputar dunia software dan hardware secara mendalam dengan konteks nyata di industri IT.</p>
        </div>
        
        <div className="p-8 rounded-2xl bg-[#0B101E]/80 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Pronunciation Keys</h3>
          <p className="text-gray-400 leading-relaxed">Dengarkan pelafalan yang benar dan baca transkrip fonetik standar untuk meningkatkan kepercayaan diri dalam berbicara.</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0B101E]/80 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Gamified Testing</h3>
          <p className="text-gray-400 leading-relaxed">Tantang diri Anda dengan kuis bergaya Kahoot yang seru, kumpulkan poin, dan berkompetisi secara interaktif.</p>
        </div>
      </div>
    </div>,

    // Slide 3: Teknologi Utama
    <div key="slide3" className="flex flex-col justify-center h-full max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Teknologi <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Utama</span>
        </h2>
        <p className="text-gray-400">Tools modern yang kami gunakan untuk membangun QuizEasy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techStack.map((tech, idx) => (
          <div key={idx} className="relative group p-8 rounded-2xl bg-[#111827]/60 border border-gray-800 hover:border-gray-600 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {tech.icon}
            </div>
            <div className="mb-6 p-4 inline-block rounded-xl bg-gray-900/80 border border-gray-800 shadow-inner">
              {tech.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{tech.name}</h3>
            <p className="text-gray-400 leading-relaxed">
              {tech.desc}
            </p>
          </div>
        ))}
      </div>
    </div>,

    // Slide 4: Tim Kelompok
    <div key="slide4" className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-5xl mx-auto w-full py-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
           <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Tim <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Pengembang</span>
        </h2>
        <p className="text-gray-400">Kelompok MI 24 - Kreator di balik QuizEasy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="p-8 pb-10 rounded-3xl bg-[#0a0e1a] border border-indigo-500/30 hover:border-purple-500/60 transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center shadow-lg">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#8b5cf6] to-[#d946ef] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              <span className="text-white font-bold text-4xl">{member.name.charAt(0)}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 text-center w-full">{member.name}</h3>
            <p className="text-purple-400 text-sm font-medium uppercase tracking-wider text-center w-full">{member.role}</p>
          </div>
        ))}
      </div>
    </div>,

    // Slide 5: Penutup / Demo Call
    <div key="slide5" className="flex flex-col items-center justify-center h-full text-center space-y-8">
      <div className="w-24 h-24 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.2)] animate-pulse">
        <Layers className="w-12 h-12 text-indigo-400" />
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
        Siap Untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Mencoba?</span>
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mb-8">
        Mari uji pengetahuan IT Anda dengan cara yang lebih menyenangkan dan futuristik bersama QuizEasy.
      </p>
      <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 flex items-center gap-2">
        Mulai Demo Aplikasi <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape' && isSimulatedFullscreen) {
        setIsSimulatedFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, slides.length, isSimulatedFullscreen]);

  // Fungsi toggle full screen (Mendukung Native & Simulasi CSS fallback)
  const toggleFullscreen = () => {
    const element = presentationRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      // Coba Native Fullscreen terlebih dahulu
      // vendor-prefixed APIs are not standard in TypeScript DOM lib, cast to any
      const elAny = element as any;
      const requestMethod = elAny.requestFullscreen || elAny.webkitRequestFullscreen || elAny.mozRequestFullScreen || elAny.msRequestFullscreen;
      if (requestMethod) {
        try {
          // Some implementations return a promise, others don't — handle both
          const maybePromise = requestMethod.call(element);
          if (maybePromise && typeof maybePromise.then === 'function') {
            maybePromise.then(() => setIsFullscreen(true)).catch((err: any) => {
              console.warn("Native fullscreen diblokir, mengaktifkan mode simulasi layar penuh (Theater Mode).", err);
              setIsSimulatedFullscreen(true);
            });
          } else {
            setIsFullscreen(true);
          }
        } catch (err) {
          console.warn("Error saat mencoba fullscreen native, fallback ke simulasi.", err);
          setIsSimulatedFullscreen(true);
        }
      } else {
        // Fallback langsung jika browser lama tidak mendukung API
        setIsSimulatedFullscreen(true);
      }
    } else {
      // Keluar dari Native Fullscreen
      const docAny = document as any;
      const exitMethod = docAny.exitFullscreen || docAny.webkitExitFullscreen || docAny.mozCancelFullScreen || docAny.msExitFullscreen;
      if (exitMethod) {
        try {
          exitMethod.call(document);
        } catch (err) {
          // ignore
        }
      }
      setIsFullscreen(false);
    }
  };

  // Sinkronisasi state saat keluar mode native fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeNative = !!document.fullscreenElement;
      setIsFullscreen(activeNative);
      // Jika keluar native, pastikan simulasi juga mati
      if (!activeNative) {
        setIsSimulatedFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Membantu menutup mode simulasi fullscreen
  const closeSimulatedFullscreen = () => {
    setIsSimulatedFullscreen(false);
  };

  const isAnyFullscreen = isFullscreen || isSimulatedFullscreen;

  return (
    <div 
      ref={presentationRef}
      className={`bg-[#070B14] text-slate-200 font-sans relative flex items-center justify-center selection:bg-purple-500/30 transition-all duration-300
        ${isSimulatedFullscreen 
          ? 'fixed inset-0 z-[9999] w-screen h-screen p-6 md:p-16 overflow-y-auto' 
          : 'min-h-screen w-full'
        }`}
    >
      
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      
      {/* Presentation Container */}
      <div className={`relative w-full max-w-6xl flex flex-col justify-between z-10 transition-all duration-300
        ${isSimulatedFullscreen 
          ? 'h-full min-h-[90vh] py-4' 
          : 'min-h-[85vh] px-6 md:px-16 py-10'
        }`}
      >
        
        {/* Header / Nav */}
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">Quiz<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Easy</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Tombol Show/Layar Penuh */}
            <button
              onClick={isSimulatedFullscreen ? closeSimulatedFullscreen : toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800 text-sm font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-gray-300 hover:text-white"
            >
              {isAnyFullscreen ? (
                <>
                  <Minimize className="w-4 h-4 text-purple-400" />
                  <span>Keluar Layar Penuh</span>
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4 text-purple-400" />
                  <span>Layar Penuh</span>
                </>
              )}
            </button>

            <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              UAS Project Ready
            </div>
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="flex-grow relative flex items-center justify-center py-4 min-h-[50vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out flex items-center justify-center overflow-y-auto overflow-x-hidden
                ${index === currentSlide 
                  ? 'opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-y-10 scale-95 z-0 pointer-events-none' 
                    : 'opacity-0 translate-y-10 scale-95 z-0 pointer-events-none'
                }`}
            >
              {slide}
            </div>
          ))}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if(!isAnimating && idx !== currentSlide) {
                    setIsAnimating(true);
                    setCurrentSlide(idx);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'w-3 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700 transition-all backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700 transition-all backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;
=======
export default function PresentationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-4">
      
      {/* Teks penanda halaman */}
      <h1 className="text-4xl font-extrabold text-blue-400 tracking-wide uppercase">
        ini halaman presentation
      </h1>
      
      <p className="text-slate-400 mt-3 text-sm">
        [ Halaman ini sedang dalam mode testing ]
      </p>

    </div>
  );
}
>>>>>>> 77f5d7a6cdfb617d180bbbab6537704706ac62b4
