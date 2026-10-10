import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Zap, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  X,
  Flame,
  Award
} from 'lucide-react';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogStudyTime?: (hours: number) => void;
}

const MODE_DURATIONS: Record<PomodoroMode, number> = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

const STUDY_TASKS = [
  '💻 LeetCode & DSA Problem Solving',
  '🌐 DevConnect Full-Stack Capstone',
  '📚 Core CS: Operating Systems & DBMS',
  '🎯 TCS & Amazon Placement Aptitude',
  '🚀 System Design & API Architecture',
];

export const PomodoroWidget: React.FC<PomodoroWidgetProps> = ({
  isOpen,
  onToggle,
  onLogStudyTime,
}) => {
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(MODE_DURATIONS.focus);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mitra_pomodoro_completed');
      if (saved) return Number(saved);
    } catch (e) {}
    return 2;
  });
  const [selectedTask, setSelectedTask] = useState<string>(STUDY_TASKS[0]);
  const [isCustomTask, setIsCustomTask] = useState(false);
  const [customTaskText, setCustomTaskText] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);
  const [totalFocusedMinutes, setTotalFocusedMinutes] = useState(() => {
    try {
      const saved = localStorage.getItem('mitra_pomodoro_minutes');
      if (saved) return Number(saved);
    } catch (e) {}
    return 50;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play gentle Web Audio chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  // Timer interval tick
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Completed current timer!
      setIsActive(false);
      playChime();

      if (mode === 'focus') {
        const newCount = completedSessions + 1;
        setCompletedSessions(newCount);
        const addedMinutes = Math.round(MODE_DURATIONS.focus / 60);
        const newTotalMin = totalFocusedMinutes + addedMinutes;
        setTotalFocusedMinutes(newTotalMin);

        try {
          localStorage.setItem('mitra_pomodoro_completed', String(newCount));
          localStorage.setItem('mitra_pomodoro_minutes', String(newTotalMin));
        } catch (e) {}

        if (onLogStudyTime) {
          onLogStudyTime(Math.round((addedMinutes / 60) * 10) / 10);
        }

        setShowCompletionBanner(true);

        // Switch to break
        if (newCount % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(MODE_DURATIONS.longBreak);
        } else {
          setMode('shortBreak');
          setTimeLeft(MODE_DURATIONS.shortBreak);
        }
      } else {
        // Break ended, back to focus
        setMode('focus');
        setTimeLeft(MODE_DURATIONS.focus);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode, completedSessions, totalFocusedMinutes, onLogStudyTime, soundEnabled]);

  // Handle Switch Mode
  const handleSelectMode = (newMode: PomodoroMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODE_DURATIONS[newMode]);
    setShowCompletionBanner(false);
  };

  const handleToggleTimer = () => {
    setIsActive(!isActive);
    setShowCompletionBanner(false);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODE_DURATIONS[mode]);
    setShowCompletionBanner(false);
  };

  // Quick preset adjust
  const handleSetQuickMinutes = (mins: number) => {
    setIsActive(false);
    setTimeLeft(mins * 60);
    setShowCompletionBanner(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalModeDuration = MODE_DURATIONS[mode];
  const progressPercent = Math.min(100, Math.max(0, ((totalModeDuration - timeLeft) / totalModeDuration) * 100));

  // If closed, render a floating or docked pill button
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-xs shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border border-white/20 backdrop-blur-md"
        title="Open Pomodoro Study Timer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-amber-400' : 'bg-white'}`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isActive ? 'bg-amber-400' : 'bg-white'}`} />
        </span>
        <Clock className="w-4 h-4 text-amber-300" />
        <span>
          {isActive ? `${formattedTime} • Focus Active` : 'Pomodoro Study Timer'}
        </span>
        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">
          #{completedSessions}
        </span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-surface-container-high shadow-md transition-all duration-300 overflow-hidden relative">
      {/* Decorative top accent gradient */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 ${
          mode === 'focus' 
            ? 'bg-gradient-to-r from-primary to-indigo-500' 
            : mode === 'shortBreak'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
            : 'bg-gradient-to-r from-amber-500 to-orange-400'
        }`}
      />

      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
            mode === 'focus'
              ? 'bg-primary/10 text-primary'
              : mode === 'shortBreak'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-800'
          }`}>
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-on-surface">
              Pomodoro Study Timer
            </h3>
            <p className="text-[11px] text-outline">
              Track focused learning intervals for SDE prep
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg transition-colors ${
              soundEnabled ? 'text-primary hover:bg-surface-container' : 'text-outline hover:bg-surface-container'
            }`}
            title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Close/Minimize */}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Minimize Timer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="pt-4 grid grid-cols-3 gap-1.5">
        <button
          onClick={() => handleSelectMode('focus')}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'focus'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Focus (25m)
        </button>

        <button
          onClick={() => handleSelectMode('shortBreak')}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'shortBreak'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          Short (5m)
        </button>

        <button
          onClick={() => handleSelectMode('longBreak')}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mode === 'longBreak'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          Long (15m)
        </button>
      </div>

      {/* Big Digits Display with Circular/Linear Progress */}
      <div className="py-6 flex flex-col items-center justify-center space-y-3">
        <div className="relative">
          <div className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-on-surface font-mono select-none">
            {formattedTime}
          </div>
          {isActive && (
            <span className="absolute -top-1 -right-3 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          )}
        </div>

        {/* Linear progress bar */}
        <div className="w-full max-w-xs bg-surface-container rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              mode === 'focus' 
                ? 'bg-primary' 
                : mode === 'shortBreak' 
                ? 'bg-emerald-500' 
                : 'bg-amber-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Current Active Task Tag */}
        <div className="pt-1 w-full max-w-sm">
          {!isCustomTask ? (
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-xl border border-surface-container-high text-xs">
              <span className="text-[10px] font-bold uppercase text-outline shrink-0">Session:</span>
              <select
                value={selectedTask}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setIsCustomTask(true);
                  } else {
                    setSelectedTask(e.target.value);
                  }
                }}
                className="w-full bg-transparent font-medium text-on-surface border-none outline-none text-xs truncate cursor-pointer"
              >
                {STUDY_TASKS.map((task, idx) => (
                  <option key={idx} value={task}>
                    {task}
                  </option>
                ))}
                <option value="custom">✏️ Custom Task / Topic...</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-xl border border-surface-container-high text-xs">
              <input
                type="text"
                value={customTaskText}
                onChange={(e) => setCustomTaskText(e.target.value)}
                placeholder="Type specific topic (e.g. Graph BFS, DP)..."
                autoFocus
                className="flex-1 bg-transparent text-xs text-on-surface outline-none"
              />
              <button
                onClick={() => {
                  if (customTaskText.trim()) {
                    setSelectedTask(`🎯 ${customTaskText.trim()}`);
                  }
                  setIsCustomTask(false);
                }}
                className="text-[11px] font-bold text-primary hover:underline"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Play / Pause / Reset Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleToggleTimer}
          className={`px-6 py-2.5 rounded-2xl font-extrabold text-xs text-white shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 ${
            isActive
              ? 'bg-amber-600 hover:bg-amber-700'
              : mode === 'focus'
              ? 'bg-primary hover:bg-primary-container'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              Pause Timer
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Start {mode === 'focus' ? 'Session' : 'Break'}
            </>
          )}
        </button>

        <button
          onClick={handleResetTimer}
          className="p-2.5 rounded-2xl border border-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Preset Buttons */}
      <div className="pt-4 flex items-center justify-center gap-2 text-[11px]">
        <span className="text-outline font-semibold">Quick Time:</span>
        <button
          onClick={() => handleSetQuickMinutes(15)}
          className="px-2 py-0.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container-high font-semibold text-on-surface"
        >
          15m
        </button>
        <button
          onClick={() => handleSetQuickMinutes(25)}
          className="px-2 py-0.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container-high font-semibold text-on-surface"
        >
          25m
        </button>
        <button
          onClick={() => handleSetQuickMinutes(45)}
          className="px-2 py-0.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container-high font-semibold text-on-surface"
        >
          45m
        </button>
        <button
          onClick={() => handleSetQuickMinutes(50)}
          className="px-2 py-0.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container-high font-semibold text-on-surface"
        >
          50m OA Mock
        </button>
      </div>

      {/* Completion Celebration Banner */}
      {showCompletionBanner && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Awesome focus!</strong> Session #{completedSessions} recorded toward your goal.
            </span>
          </div>
          <button
            onClick={() => setShowCompletionBanner(false)}
            className="text-emerald-700 hover:text-emerald-900 font-bold p-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats Summary Footer */}
      <div className="mt-4 pt-3 border-t border-surface-container-high grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <p className="font-extrabold text-on-surface font-display">{completedSessions}</p>
          <p className="text-[10px] text-outline">Sessions Done</p>
        </div>
        <div className="border-x border-surface-container-high">
          <p className="font-extrabold text-primary font-display">{totalFocusedMinutes}m</p>
          <p className="text-[10px] text-outline">Focused Today</p>
        </div>
        <div>
          <p className="font-extrabold text-emerald-600 font-display">
            {completedSessions % 4}/4
          </p>
          <p className="text-[10px] text-outline">Next Long Break</p>
        </div>
      </div>
    </div>
  );
};
