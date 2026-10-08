import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sun,
  SunMedium,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../types';

interface ScreenCookingProps {
  recipe: Recipe;
  servings: number;
  activeSubstitutions: Record<string, boolean>;
  onExit: () => void;
}

export const ScreenCooking: React.FC<ScreenCookingProps> = ({
  recipe,
  servings,
  activeSubstitutions,
  onExit,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer state for current step
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const steps = recipe.steps;
  const currentStep = steps[currentStepIndex];

  // Screen WakeLock implementation
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
          wakeLock.addEventListener('release', () => {
            setWakeLockActive(false);
          });
        }
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, []);

  // Initialize timer whenever current step changes
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerRunning(false);

    if (currentStep?.timerSeconds) {
      setTimeLeft(currentStep.timerSeconds);
    } else {
      setTimeLeft(null);
    }
  }, [currentStepIndex, currentStep]);

  // Handle timer countdown
  useEffect(() => {
    if (timerRunning && timeLeft !== null && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerRunning(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // Audio fallback
    }
  };

  const toggleTimer = () => {
    if (timeLeft === 0 && currentStep?.timerSeconds) {
      setTimeLeft(currentStep.timerSeconds);
      setTimerRunning(true);
    } else {
      setTimerRunning((prev) => !prev);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    if (currentStep?.timerSeconds) {
      setTimeLeft(currentStep.timerSeconds);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#F59E0B', '#10B981', '#EF4444']
      });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Compute step instruction with substitutions
  let displayInstruction = currentStep?.instruction || '';
  Object.keys(activeSubstitutions).forEach((origId) => {
    if (activeSubstitutions[origId]) {
      const sub = recipe.availableSubstitutions?.[origId];
      if (sub?.stepReplacements) {
        Object.entries(sub.stepReplacements).forEach(([fromWord, toWord]) => {
          displayInstruction = displayInstruction.split(fromWord).join(toWord);
        });
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2420] flex flex-col justify-between max-w-md mx-auto">
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between border-b border-stone-200/60 bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-30">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-stone-700 font-bold text-sm hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kilépés</span>
        </button>

        {/* Step Indicator 3/7 */}
        <div className="flex items-center gap-2">
          <span className="bg-[#C85A32] text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
            {currentStepIndex + 1} / {steps.length} LÉPÉS
          </span>
        </div>

        {/* Screen WakeLock status pill */}
        <div
          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
            wakeLockActive
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : 'bg-stone-100 border-stone-200 text-stone-500'
          }`}
          title="A telefon kijelzője nem kapcsol ki főzés közben"
        >
          <SunMedium className="w-3 h-3 text-amber-600" />
          <span>Ébren tartva</span>
        </div>
      </div>

      {/* Main Step Content */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto pb-28">
        {/* Step Action Photo (Specific kitchen action) */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-soft border border-stone-200 bg-stone-100">
          <img
            src={currentStep.imageUrl}
            alt={currentStep.title || `Lépés ${currentStep.stepNumber}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
            {recipe.title} ({servings} főre)
          </div>
        </div>

        {/* Step Text & Title with Large Typography */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-soft">
          {currentStep.title && (
            <h2 className="text-xl font-black text-[#C85A32] mb-2 tracking-tight">
              {currentStep.title}
            </h2>
          )}
          <p className="text-lg md:text-xl font-medium text-stone-900 leading-relaxed">
            {displayInstruction}
          </p>
        </div>

        {/* Interactive Timer (if applicable) */}
        {timeLeft !== null && (
          <div className="bg-white rounded-3xl p-4 border border-amber-200/90 shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${
                  timeLeft === 0
                    ? 'bg-red-500 text-white animate-bounce'
                    : timerRunning
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {timerRunning ? (
                  <Volume2 className="w-5 h-5 animate-pulse" />
                ) : (
                  '⏱️'
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  {currentStep.timerLabel || 'Időzítő'}
                </span>
                <span className="text-2xl font-black text-stone-900 tracking-tight font-mono">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTimer}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all ${
                  timerRunning
                    ? 'bg-stone-800 text-white hover:bg-stone-900'
                    : 'bg-[#C85A32] text-white hover:bg-[#B34B25]'
                }`}
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Szünet</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{timeLeft === 0 ? 'Újra' : 'Indítás'}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                title="Visszaállítás"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Completion Modal / Celebration */}
        {isCompleted && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center shadow-soft animate-fade-in">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-emerald-900 mb-1">
              Elkészült a fogás!
            </h3>
            <p className="text-sm text-emerald-700 mb-4 font-medium">
              Jó étvágyat kívánunk a {recipe.title.toLowerCase()}hoz!
            </p>
            <button
              onClick={onExit}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm shadow-md"
            >
              Vissza a receptekhez
            </button>
          </div>
        )}
      </div>

      {/* Fixed Bottom Step Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent backdrop-blur-md z-40">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-1 border transition-all ${
              currentStepIndex > 0
                ? 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50 shadow-sm'
                : 'bg-stone-100 border-stone-200 text-stone-400 opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Előző</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 px-6 rounded-2xl font-black text-base tracking-wider flex items-center justify-center gap-2 bg-[#C85A32] hover:bg-[#B34B25] text-white shadow-floating touch-press cursor-pointer"
          >
            <span>
              {currentStepIndex === steps.length - 1
                ? 'KÉSZ VAGYOK!'
                : 'KÖVETKEZŐ LÉPÉS'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
