import { useState, useEffect } from "react";
import { Pause, Play, SkipForward } from "lucide-react";
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
  const [secondsRemaining, setSecondsRemaining] = useState(RITUAL.steps[1].duration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = RITUAL.steps[currentStepIndex];
  const totalSeconds = currentStep.duration;

  // One persistent interval for the whole countdown; recreating it on every tick made the timer drift.
  useEffect(() => {
    if (!isActive) return;
    const interval = window.setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Reaching zero ends the step: advance to the next one, or finish the ritual on the last step.
  useEffect(() => {
    if (secondsRemaining !== 0 || isComplete) return;
    setIsActive(false);
    if (currentStepIndex < RITUAL.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setSecondsRemaining(RITUAL.steps[nextIdx].duration);
    } else {
      setIsComplete(true);
    }
  }, [secondsRemaining, currentStepIndex, isComplete]);

  const toggleTimer = () => setIsActive(!isActive);

  const nextStep = () => {
    if (currentStepIndex < RITUAL.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setSecondsRemaining(RITUAL.steps[nextIdx].duration);
      setIsActive(false);
    } else {
      // Skipping on the final step finishes the ritual instead of swallowing the click.
      setIsActive(false);
      setIsComplete(true);
    }
  };

  const restart = () => {
    setCurrentStepIndex(1);
    setSecondsRemaining(RITUAL.steps[1].duration);
    setIsActive(false);
    setIsComplete(false);
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

        {isComplete ? (
          <section className="text-center bg-surface-container-low rounded-xl p-10 mb-12">
            <h3 className="font-headline text-3xl font-bold text-primary mb-2">Ritual Complete</h3>
            <p className="text-outline font-medium italic mb-8">
              Your {RITUAL.name} has finished brewing. Enjoy.
            </p>
            <button
              onClick={restart}
              className="bg-primary text-on-primary font-headline font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Start Again
            </button>
          </section>
        ) : (
          <>
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
            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            {isActive ? "Pause Timer" : secondsRemaining < totalSeconds ? "Resume Timer" : "Start Timer"}
          </button>
          <button 
            onClick={nextStep}
            className="w-16 h-16 bg-tertiary-container text-on-tertiary-container rounded-xl flex items-center justify-center hover:opacity-90 transition-all"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>
          </>
        )}
      </main>

      {!isComplete && <MiniTimer seconds={secondsRemaining} totalSeconds={totalSeconds} />}
      <BottomNav />
    </div>
  );
}
