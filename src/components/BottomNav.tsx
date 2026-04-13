import { Coffee, Timer, Brain, History, Library } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-background/90 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-4px_40px_rgba(30,27,19,0.04)] z-50 rounded-t-3xl">
      <a className="flex flex-col items-center justify-center text-outline px-4 py-1.5 hover:text-primary transition-all" href="#">
        <Coffee className="w-6 h-6" />
        <span className="font-body font-semibold text-[11px] uppercase tracking-wider mt-1">Brew</span>
      </a>
      <a className="flex flex-col items-center justify-center bg-tertiary text-white rounded-xl px-4 py-1.5 transition-all" href="#">
        <Timer className="w-6 h-6" />
        <span className="font-body font-semibold text-[11px] uppercase tracking-wider mt-1">Timer</span>
      </a>
      <a className="flex flex-col items-center justify-center text-outline px-4 py-1.5 hover:text-primary transition-all" href="#">
        <Brain className="w-6 h-6" />
        <span className="font-body font-semibold text-[11px] uppercase tracking-wider mt-1">Beans</span>
      </a>
      <a className="flex flex-col items-center justify-center text-outline px-4 py-1.5 hover:text-primary transition-all" href="#">
        <History className="w-6 h-6" />
        <span className="font-body font-semibold text-[11px] uppercase tracking-wider mt-1">Log</span>
      </a>
      <a className="flex flex-col items-center justify-center text-outline px-4 py-1.5 hover:text-primary transition-all" href="#">
        <Library className="w-6 h-6" />
        <span className="font-body font-semibold text-[11px] uppercase tracking-wider mt-1">Explore</span>
      </a>
    </nav>
  );
}
