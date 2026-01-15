'use client';

import { useState } from 'react';

export default function Home() {
  // State
  const [stepsToday, setStepsToday] = useState(5234);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('Enter a number to continue');

  // Constants
  const goalToday = 7500;
  const stepsWeek = 35234;
  const goalWeek = 52500;

  // Calculate percentages
  const percentage = Math.min(Math.round((stepsToday / goalToday) * 100), 100);
  const weekPercentage = Math.min(Math.round((stepsWeek / goalWeek) * 100), 100);
  const remaining = Math.max(0, goalToday - stepsToday);

  // Week days (fake data)
  const weekDays = [
    { day: 'Sun', date: 12, done: true, today: false },
    { day: 'Mon', date: 13, done: true, today: false },
    { day: 'Tue', date: 14, done: true, today: false },
    { day: 'Wed', date: 15, done: true, today: false },
    { day: 'Thu', date: 16, done: false, today: true },
    { day: 'Fri', date: 17, done: false, today: false },
    { day: 'Sat', date: 18, done: false, today: false },
  ];

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setInputError('Enter a number to continue');
      return;
    }

    const num = Number(value);
    if (!Number.isFinite(num)) {
      setInputError('Please enter a valid number');
    } else if (num <= 0) {
      setInputError('Steps must be greater than 0');
    } else if (num > 50000) {
      setInputError('That seems too high! Max 50,000 steps');
    } else {
      setInputError(`Adding ${num.toLocaleString()} steps`);
    }
  };

  const handleAddSteps = () => {
    const num = Number(inputValue);
    if (num > 0 && num <= 50000) {
      setStepsToday(stepsToday + Math.floor(num));
      setIsSheetOpen(false);
      setInputValue('');
      setInputError('Enter a number to continue');
    }
  };

  const isValid = inputValue && !inputError.includes('Please') && !inputError.includes('must') && !inputError.includes('too high');

  // SVG ring calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen w-full flex justify-center px-4 py-8">
      {/* <main className="w-full max-w-[28rem] pb-32"> */}
      <main className="w-full max-w-[28rem] pb-32 outline outline-1 outline-purple-500/40 rounded-2xl">
        {/* Header */}
        <header className="sticky top-0 z-40 mb-4 border-b border-purple-500/15 bg-[#131324]/80 backdrop-blur-[20px] px-4 py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-slate-50">Good morning, Sumeet</h1>
              <p className="mt-1 text-[0.8125rem] text-zinc-400">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <button className="flex-shrink-0 grid place-items-center h-11 w-11 rounded-full border border-purple-500/40 bg-gradient-to-br from-purple-500/20 to-indigo-500/15 text-base font-semibold text-purple-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4)]">
              S
            </button>
          </div>
        </header>

        {/* Week Calendar */}
        <section className="mt-2 mb-8">
          <div className="flex justify-between items-center px-1 mb-3 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-200">This Week</span>
            <span className="text-[0.7rem] text-zinc-500">
              4/7 days • {stepsWeek.toLocaleString()}/{goalWeek.toLocaleString()} steps
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <div
                key={day.day}
                className={`text-center relative ${day.today ? 'bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.18),transparent_70%)] rounded-xl py-1' : ''}`}
              >
                <button
                  className={`
                  mx-auto grid place-items-center h-11 w-11 rounded-full border shadow-[0_2px_4px_0_rgba(0,0,0,0.4)]
                  transition-all duration-150 text-[15px] leading-none
                  ${day.done
                      ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white border-purple-500/60 shadow-[0_4px_12px_0_rgba(124,58,237,0.5)]'
                      : 'bg-[#18182766] text-zinc-600 border-zinc-700/30'
                    }
                  ${day.today ? 'border-[2px] border-purple-500/80 animate-pulse' : 'border-purple-500/25'}
                `}
                >
                  {day.done ? '✓' : day.date}
                </button>

                <div className="mt-1 text-[10px] font-semibold text-zinc-400">{day.day}</div>
                <div className="mt-0.5 text-[9px] font-medium text-zinc-500">{day.date}</div>

                {day.today && (
                  <div className="w-5 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-sm mx-auto mt-1 shadow-[0_0_10px_rgba(124,58,237,0.7)]" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 px-1 text-[11px] text-zinc-400">
            <span className="font-semibold text-zinc-200">Current streak:</span> 4 days
          </div>
        </section>

        {/* Progress Ring */}
        <div className="relative mx-auto h-52 w-52 [filter:drop-shadow(0_8px_20px_rgba(124,58,237,0.4))]">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            <circle cx="80" cy="80" r={radius} strokeWidth="12" fill="none" stroke="#18181b" />

            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth="12"
              fill="none"
              stroke="url(#ringGradient)"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />

            <circle cx="80" cy="22" r="4" fill="#7c3aed" opacity="0.5" />
            <circle cx="80" cy="22" r="2" fill="#d8b4fe" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-semibold tracking-tight text-slate-50">
              {stepsToday.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-zinc-400">Today</div>
            <div className="mt-1 text-[11px] text-zinc-500">{percentage}% complete</div>
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-xs">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl font-semibold bg-purple-500/20 border border-purple-500/40 text-purple-200">
              <span>🎯</span>
              <span>{goalToday.toLocaleString()}</span>
            </div>

            {stepsToday >= goalToday ? (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl font-semibold bg-green-500/18 border border-green-500/35 text-green-300">
                <span>✓</span>
                <span>Goal reached!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl font-semibold bg-blue-500/18 border border-blue-500/35 text-blue-200">
                <span>{remaining.toLocaleString()} to go</span>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-8 w-full">
          <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-200">Weekly Progress</span>
            <span>{stepsWeek.toLocaleString()} / {goalWeek.toLocaleString()}</span>
          </div>

          <div className="mt-2 h-3 rounded-full bg-[#18182766] p-0.5 relative border border-zinc-700/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 shadow-[0_0_24px_rgba(124,58,237,0.6)] transition-all duration-300"
              style={{ width: `${weekPercentage}%` }}
            />
          </div>
        </div>

        {/* AI Insight Card */}
        <section className="mt-8 mb-8">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/18 to-indigo-500/18 backdrop-blur-[20px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4)]">
            <div className="text-[2rem] mb-2 text-center">🚀</div>
            <div className="text-[0.7rem] font-bold uppercase tracking-wider text-zinc-400 mb-2 text-center">
              MOTIVATION
            </div>
            <div className="text-sm leading-relaxed text-slate-100 text-center">
              You're doing great! Just {remaining.toLocaleString()} more steps to hit your goal today.
            </div>
            <div className="mt-2 p-2 bg-black/25 rounded-lg text-xs text-purple-200 text-center">
              That's like walking around your building 3 times!
            </div>
          </div>
        </section>

        {/* FAB Button */}
        <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center px-4 py-4 bg-gradient-to-t from-[#0a0a1a]/95 to-transparent backdrop-blur-[12px] pointer-events-none">
          <button
            onClick={() => setIsSheetOpen(true)}
            className="pointer-events-auto flex items-center justify-center gap-2 h-14 min-w-14 rounded-full px-5 text-sm font-semibold shadow-[0_8px_16px_-2px_rgba(124,58,237,0.6)] bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 text-white hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-xl leading-none">+</span>
            <span>Add Steps</span>
          </button>
        </div>

        {/* Bottom Sheet */}
        {isSheetOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setIsSheetOpen(false)}
            />

            <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[28rem] rounded-t-3xl border border-purple-500/30 bg-[#131324]/95 backdrop-blur-[20px] p-5 pb-8 shadow-[0_-10px_40px_rgba(124,58,237,0.3)] animate-slideUp">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-sm font-semibold text-slate-50">Add Steps</h2>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="grid place-items-center h-11 w-11 rounded-full border border-purple-500/35 bg-[#18182766] text-zinc-400 text-lg hover:bg-purple-500/25 hover:text-purple-200 active:scale-95"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter steps (e.g., 1200)"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && isValid && handleAddSteps()}
                autoFocus
                className="w-full rounded-2xl border border-purple-500/35 bg-[#18182766] backdrop-blur-[12px] px-4 py-3 text-sm text-slate-50 outline-none focus:border-purple-600 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.35)] placeholder:text-zinc-500"
              />

              <div className={`mt-2 text-xs text-center ${inputError.includes('Please') || inputError.includes('must') || inputError.includes('too high') ? 'text-red-400' : 'text-zinc-500'}`}>
                {inputError}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setInputValue('');
                    setInputError('Enter a number to continue');
                  }}
                  className="rounded-2xl border border-purple-500/35 bg-[#18182766] px-4 py-3 text-sm font-semibold text-purple-200 active:scale-98"
                >
                  Clear
                </button>
                <button
                  onClick={handleAddSteps}
                  disabled={!isValid}
                  className="rounded-2xl px-5 py-3 text-sm font-semibold bg-gradient-to-br from-purple-600 to-indigo-500 text-white active:scale-98 disabled:bg-zinc-800/60 disabled:text-zinc-600 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}