// components/quiz/QuizStyles.tsx
// Semua CSS animations dikumpulkan di satu tempat

export default function QuizStyles() {
  return (
    <style jsx global>{`
      @keyframes countdownPulse {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(217, 70, 239, 0.3); }
        50% { box-shadow: 0 0 40px rgba(217, 70, 239, 0.6); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes equalizer1 { 0%, 100% { height: 30%; } 50% { height: 100%; } }
      @keyframes equalizer2 { 0%, 100% { height: 60%; } 50% { height: 30%; } }
      @keyframes equalizer3 { 0%, 100% { height: 80%; } 50% { height: 40%; } }
      @keyframes equalizer4 { 0%, 100% { height: 40%; } 50% { height: 90%; } }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes floatLetter {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
        5% { opacity: 1; }
        95% { opacity: 1; }
        100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes confettiPop {
        0% { transform: scale(0) translateY(0); opacity: 1; }
        50% { opacity: 1; }
        100% { transform: scale(1.5) translateY(-100px); opacity: 0; }
      }
      @keyframes nameReveal {
        0% { opacity: 0; transform: translateY(20px) scale(0.8); filter: blur(10px); }
        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }

      .animate-countdown { animation: countdownPulse 0.6s ease-out; }
      .animate-slideUp { animation: slideUp 0.5s ease-out; }
      .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      .animate-shake { animation: shake 0.4s ease-out; }
      .animate-glow { animation: glow 2s ease-in-out infinite; }
      .animate-float { animation: float 3s ease-in-out infinite; }
      .animate-spin-slow { animation: spin 3s linear infinite; }
      .animate-shimmer {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
      .animate-gradientShift {
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
      }
      .animate-nameReveal { animation: nameReveal 0.6s ease-out both; }
      .eq-bar-1 { animation: equalizer1 0.8s ease-in-out infinite; }
      .eq-bar-2 { animation: equalizer2 0.6s ease-in-out infinite; }
      .eq-bar-3 { animation: equalizer3 0.7s ease-in-out infinite; }
      .eq-bar-4 { animation: equalizer4 0.9s ease-in-out infinite; }
    `}</style>
  );
}