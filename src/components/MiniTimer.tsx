import { Maximize2 } from "lucide-react";

interface MiniTimerProps {
  seconds: number;
  totalSeconds: number;
}

export default function MiniTimer({ seconds, totalSeconds }: MiniTimerProps) {
  const progress = (seconds / totalSeconds) * 100;
  
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 glass-effect p-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 cursor-pointer select-none">
      {/* Circular Progress */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle className="text-surface-container" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
          <circle 
            className="text-primary transition-all duration-300" 
            cx="24" 
            cy="24" 
            fill="transparent" 
            r="20" 
            stroke="currentColor" 
            strokeDasharray="125.6" 
            strokeDashoffset={125.6 - (125.6 * progress) / 100} 
            strokeWidth="4"
          ></circle>
        </svg>
        <span className="absolute text-[10px] font-bold text-primary">{Math.round(progress)}%</span>
      </div>
      {/* Timer Info */}
      <div className="flex flex-col">
        <span className="text-primary font-headline font-extrabold text-lg leading-none">{formatTime(seconds)}</span>
        <span className="text-outline text-[10px] uppercase tracking-tighter font-bold">Remaining</span>
      </div>
      {/* Actions */}
      <div className="flex items-center ml-2 pl-4 border-l border-outline-variant/30">
        <button className="text-primary hover:bg-primary/10 rounded-full p-1">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
