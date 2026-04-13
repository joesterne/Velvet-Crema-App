import { Droplets, Thermometer, Clock } from "lucide-react";
import { motion } from "motion/react";

interface StepCardProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  instruction: string;
  targetTemp?: string;
  extractionTime?: string;
}

export default function StepCard({ 
  stepNumber, 
  totalSteps, 
  title, 
  description, 
  instruction,
  targetTemp,
  extractionTime
}: StepCardProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-primary-container text-white p-8 rounded-xl shadow-xl relative overflow-hidden mb-12"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Step {stepNumber} of {totalSteps}
          </span>
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-headline text-3xl font-bold mb-2">{title}</h3>
        <p className="font-body text-outline-variant text-lg leading-relaxed mb-6">
          {description} <span className="text-white font-bold">{instruction}</span>
        </p>

        {/* Additional Metrics Section */}
        <div className="flex gap-6 pt-6 border-t border-white/10">
          {targetTemp && (
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Thermometer className="w-4 h-4 text-on-tertiary-container" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-outline-variant font-bold">Temp</span>
                <span className="text-sm font-headline font-bold">{targetTemp}</span>
              </div>
            </div>
          )}
          {extractionTime && (
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Clock className="w-4 h-4 text-on-tertiary-container" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-outline-variant font-bold">Start Time</span>
                <span className="text-sm font-headline font-bold">{extractionTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Abstract background shape */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary rounded-full opacity-20 blur-2xl"></div>
    </motion.div>
  );
}
