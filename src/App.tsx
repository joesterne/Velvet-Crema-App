import { useState, useEffect } from "react";
import { Pause, SkipForward } from "lucide-react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import TimerDisplay from "./components/TimerDisplay";
import StepCard from "./components/StepCard";
import MiniTimer from "./components/MiniTimer";

const RITUAL = {
  name: "Ethiopia Yirgacheffe",
  method: "V60 Pour Over",
  ratio: "1:16 Ratio",
  targetYield: "320ml",
  coffeeDose: "20g",
  temperature: "94°C",
  grindSize: "Medium-Fine",
  steps: [
    {
      id: 1,
      title: "Prep Phase",
      description: "Rinse the filter with hot water and discard. Add coffee grounds and",
      instruction: "level the bed.",
      duration: 30,
      targetTemp: "94°C",
      extractionTime: "0:00",
    },
    {
      id: 2,
      title: "Bloom Phase",
      description: "Gently pour",
      instruction: "50g of water in a circular motion. Ensure all grounds are saturated.",
      duration: 45,
      targetTemp: "94°C",
      extractionTime: "0:30",
    },
    {
      id: 3,
      title: "Main Pour",
      description: "Slowly pour the remaining",
      instruction: "270g of water in concentric circles.",
      duration: 90,
      targetTemp: "92°C",
      extractionTime: "1:15",
    },
    {
      id: 4,
      title: "Draw Down",
      description: "Wait for the water to completely",
      instruction: "drain through the coffee bed.",
      duration: 45,
      targetTemp: "90°C",
      extractionTime: "2:45",
    }
  ]
};

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // Starting at Step 2 as per screenshot
  const [secondsRemaining, setSecondsRemaining] = useState(45);
  const [isActive, setIsActive] = useState(false);

  const currentStep = RITUAL.steps[currentStepIndex];
  const totalSeconds = currentStep.duration;

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && secondsRemaining > 0) {
      interval = window.setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const toggleTimer = () => setIsActive(!isActive);

  const nextStep = () => {
    if (currentStepIndex < RITUAL.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setSecondsRemaining(RITUAL.steps[nextIdx].duration);
      setIsActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      
      <main className="pt-28 px-6 max-w-2xl mx-auto">
        {/* Ritual Header */}
        <section className="mb-12 text-center">
          <span className="font-body text-tertiary font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            Current Ritual
          </span>
          <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">
            {RITUAL.name}
          </h2>
          <p className="text-outline mt-2 font-medium italic">
            {RITUAL.method} • {RITUAL.ratio}
          </p>
        </section>

        {/* Timer Display */}
        <TimerDisplay seconds={secondsRemaining} totalSeconds={totalSeconds} />

        {/* Step Card */}
        <StepCard 
          stepNumber={currentStepIndex + 1}
          totalSteps={RITUAL.steps.length}
          title={currentStep.title}
          description={currentStep.description}
          instruction={currentStep.instruction}
          targetTemp={currentStep.targetTemp}
          extractionTime={currentStep.extractionTime}
        />

        {/* Brew Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-surface-container-low p-6 rounded-xl flex flex-col">
            <span className="font-body text-outline text-xs uppercase tracking-wider mb-1">Target Yield</span>
            <span className="text-2xl font-headline font-bold text-primary">{RITUAL.targetYield}</span>
          </div>
          <div className="bg-surface-container-high p-6 rounded-xl flex flex-col">
            <span className="font-body text-outline text-xs uppercase tracking-wider mb-1">Coffee Dose</span>
            <span className="text-2xl font-headline font-bold text-primary">{RITUAL.coffeeDose}</span>
          </div>
          <div className="col-span-2 bg-surface-container p-6 rounded-xl flex justify-between items-center">
            <div>
              <span className="font-body text-outline text-xs uppercase tracking-wider mb-1 block">Temperature</span>
              <span className="text-2xl font-headline font-bold text-primary">{RITUAL.temperature}</span>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant opacity-30 mx-4"></div>
            <div className="flex-1">
              <span className="font-body text-outline text-xs uppercase tracking-wider mb-1 block">Grind Size</span>
              <span className="text-2xl font-headline font-bold text-primary">{RITUAL.grindSize}</span>
            </div>
          </div>
        </div>

        {/* Control Actions */}
        <div className="flex gap-4 items-center">
          <button 
            onClick={toggleTimer}
            className="flex-1 bg-primary text-on-primary font-headline font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Pause className="w-5 h-5 fill-current" />
            {isActive ? "Pause Timer" : "Resume Timer"}
          </button>
          <button 
            onClick={nextStep}
            className="w-16 h-16 bg-tertiary-container text-on-tertiary-container rounded-xl flex items-center justify-center hover:opacity-90 transition-all"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>
      </main>

      <MiniTimer seconds={secondsRemaining} totalSeconds={totalSeconds} />
      <BottomNav />
    </div>
  );
}
