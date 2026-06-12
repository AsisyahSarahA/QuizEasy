// components/quiz/Fireworks.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FireworksProps {
  onComplete?: () => void;
}

export default function Fireworks({ onComplete }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let allBurstsLaunched = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      color: string; life: number; maxLife: number;
      size: number; trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const colors = ['#f472b6', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#fb923c', '#c084fc', '#22d3ee', '#e879f9', '#fde047'];

    const createBurst = (x?: number, y?: number) => {
      const bx = x ?? Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const by = y ?? Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const numParticles = 50 + Math.floor(Math.random() * 30);

      for (let i = 0; i < numParticles; i++) {
        const angle = (Math.PI * 2 * i) / numParticles + Math.random() * 0.3;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x: bx, y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color, life: 1,
          maxLife: 80 + Math.random() * 40,
          size: 1 + Math.random() * 2.5,
          trail: []
        });
      }
    };

    const burstSchedule = [0, 350, 800, 1400, 2100, 2900];
    burstSchedule.forEach((delay) => {
      setTimeout(() => {
        createBurst();
        if (Math.random() > 0.5) setTimeout(() => createBurst(), 180);
      }, delay);
    });

    setTimeout(() => { allBurstsLaunched = true; }, burstSchedule[burstSchedule.length - 1] + 200);

    const animate = () => {
      ctx.fillStyle = 'rgba(7, 11, 22, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        p.x += p.vx; p.y += p.vy;
        p.vy += 0.06; p.vx *= 0.99;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        if (p.trail.length > 1) {
          ctx.globalAlpha = p.life * 0.4;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          for (let j = 0; j < p.trail.length; j++) {
            const t = p.trail[j];
            if (j === 0) ctx.moveTo(t.x, t.y);
            else ctx.lineTo(t.x, t.y);
          }
          ctx.stroke();
        }

        ctx.globalAlpha = p.life;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;

      if (allBurstsLaunched && particles.length === 0) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsFadingOut(true);
        setTimeout(() => {
          window.removeEventListener('resize', resize);
          if (onCompleteRef.current) onCompleteRef.current();
        }, 600);
        return;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[100] transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}