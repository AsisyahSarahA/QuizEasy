
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
    { name: "Asisyah Sarah Azzahra", role: "Core Developer", image: '/asisyah.jpg' },
    { name: "Esa Permana", role: "Project Manager / Pimpro", image: '/esa.jpg' },
    { name: "Rayi Dwika Nugraha", role: "Frontend Developer", image: '/rayi.jpg' }
  ];

  const techStack = [
    { name: "Next.js (TSX)", icon: <Code className="w-8 h-8 text-blue-400" />, desc: "Framework React dengan TypeScript untuk performa dan struktur yang solid." },
    { name: "Tailwind CSS", icon: <Sparkles className="w-8 h-8 text-teal-400" />, desc: "Framework CSS Utility-first untuk styling UI yang cepat dan futuristik." },
  { name: "GitHub", icon: <Code className="w-8 h-8 text-gray-300" />, desc: "Version control dan kolaborasi tim yang efisien." }
  ];

  const slides = [
  // Slide 1: App Identity (focus on app details)
    <div key="slide1" className="flex flex-col items-center justify-center h-full text-center space-y-8 w-full">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse">
        <Monitor className="w-4 h-4" /> Presentation: Master English for Software & Hardware
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
        Presentation: Master English for <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 md:text-6xl">Software & Hardware</span>
      </h1>
      <p className="text-sm md:text-lg text-gray-400 max-w-3xl font-light leading-relaxed">
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

  // Slide 2: Main App Features
    <div key="slide2" className="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Features <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Highlights</span>
        </h2>
        <p className="text-gray-400">What makes QuizEasy different?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-[#0B101E]/80 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Rich Vocabulary</h3>
          <p className="text-gray-400 leading-relaxed">Learn crucial software and hardware vocabulary in depth with real-world industry context.</p>
        </div>
        
        <div className="p-8 rounded-2xl bg-[#0B101E]/80 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Pronunciation Keys</h3>
          <p className="text-gray-400 leading-relaxed">Listen to correct pronunciations and read standard phonetic transcriptions to boost speaking confidence.</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0B101E]/80 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Gamified Testing</h3>
          <p className="text-gray-400 leading-relaxed">Challenge yourself with fun Kahoot-style quizzes, earn points, and compete interactively.</p>
        </div>
      </div>
    </div>,

  // Slide 3: Key Technologies
    <div key="slide3" className="flex flex-col justify-center h-full max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Key Technologies <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">Used</span>
        </h2>
        <p className="text-gray-400">Modern tools we use to build QuizEasy</p>
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

 // Slide 4: Team Members
<div key="slide4" className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-5xl mx-auto w-full py-4">
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
       <Users className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
  Team <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Developers</span>
    </h2>
    <p className="text-gray-400">MI 24 Group - Creators behind QuizEasy</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
    {teamMembers.map((member, idx) => (
      <div key={idx} className="p-8 pb-10 rounded-3xl bg-[#0a0e1a] border border-indigo-500/30 hover:border-purple-500/60 transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center shadow-lg">
        
        {/* CONTAINER FOTO / INISIAL */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#8b5cf6] to-[#d946ef] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(168,85,247,0.5)] overflow-hidden">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-4xl">{member.name.charAt(0)}</span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 text-center w-full">{member.name}</h3>
        <p className="text-purple-400 text-sm font-medium uppercase tracking-wider text-center w-full">{member.role}</p>
      </div>
    ))}
  </div>
</div>,

  // Slide 5: Closing / Demo Call
    <div key="slide5" className="flex flex-col items-center justify-center h-full text-center space-y-8">
      <div className="w-24 h-24 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.2)] animate-pulse">
        <Layers className="w-12 h-12 text-indigo-400" />
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
        Ready to <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Try?</span>
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mb-8">
        Put your IT knowledge to the test in a more fun and futuristic way with QuizEasy.
      </p>
      <button className="px-8 py-4 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 flex items-center gap-2">
        Start App Demo <ChevronRight className="w-5 h-5" />
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
  // Try native Fullscreen first
      // vendor-prefixed APIs are not standard in TypeScript DOM lib, cast to any
      const elAny = element as any;
      const requestMethod = elAny.requestFullscreen || elAny.webkitRequestFullscreen || elAny.mozRequestFullScreen || elAny.msRequestFullscreen;
      if (requestMethod) {
        try {
          // Some implementations return a promise, others don't — handle both
          const maybePromise = requestMethod.call(element);
          if (maybePromise && typeof maybePromise.then === 'function') {
            maybePromise.then(() => setIsFullscreen(true)).catch((err: any) => {
              console.warn("Native fullscreen blocked, falling back to simulated full-screen (Theater Mode).", err);
              setIsSimulatedFullscreen(true);
            });
          } else {
            setIsFullscreen(true);
          }
        } catch (err) {
          console.warn("Error while requesting native fullscreen, falling back to simulated mode.", err);
          setIsSimulatedFullscreen(true);
        }
      } else {
        // Fallback langsung jika browser lama tidak mendukung API
        setIsSimulatedFullscreen(true);
      }
    } else {
  // Exit native fullscreen
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

  // Synchronize state when exiting native fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      const activeNative = !!document.fullscreenElement;
      setIsFullscreen(activeNative);
      // If native fullscreen ended, ensure simulated fullscreen is also turned off
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
          {/* Logo removed per request; spacer keeps header layout */}
          <div style={{ width: 0 }} />
          
          <div className="flex items-center gap-4">
            {/* Fullscreen toggle button */}
            <button
              onClick={isSimulatedFullscreen ? closeSimulatedFullscreen : toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800 text-sm font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-gray-300 hover:text-white"
            >
              {isAnyFullscreen ? (
                  <>
                    <Minimize className="w-4 h-4 text-purple-400" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize className="w-4 h-4 text-purple-400" />
                    <span>Fullscreen</span>
                  </>
                )}
            </button>

            <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              Final Project Ready
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

export default function PresentationPage() {
  // PresentationPage is the Next.js page entry — render the App presentation component.
  return <App />;
}

