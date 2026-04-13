import { motion } from "motion/react";

interface TimerDisplayProps {
  seconds: number;
  totalSeconds: number;
}

export default function TimerDisplay({ seconds, totalSeconds }: TimerDisplayProps) {
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (seconds / totalSeconds) * 100;

  return (
    <div className="relative flex justify-center items-center mb-16">
      {/* Progress Circle */}
      <div 
        className="w-72 h-72 rounded-full flex items-center justify-center p-4 transition-all duration-300"
        style={{ 
          background: `conic-gradient(from 0deg, var(--color-primary) ${progress}%, var(--color-surface-container) 0%)` 
        }}
      >
        <div className="w-full h-full rounded-full bg-surface-bright flex flex-col items-center justify-center shadow-inner">
          <motion.span 
            key={seconds}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-headline font-extrabold text-primary tracking-tighter"
          >
            {formatTime(seconds)}
          </motion.span>
          <span className="font-body font-bold text-outline text-sm uppercase tracking-widest mt-2">Remaining</span>
        </div>
      </div>

      {/* Floating Bean Progress Indicator */}
      <div className="absolute -right-4 top-0 glass-effect p-4 rounded-xl border border-white/20 shadow-sm flex flex-col gap-2">
        <div className="w-2 h-6 bg-tertiary rounded-full"></div>
        <div className="w-2 h-6 bg-tertiary opacity-40 rounded-full"></div>
        <div className="w-2 h-6 bg-tertiary opacity-40 rounded-full"></div>
      </div>
    </div>
  );
}
