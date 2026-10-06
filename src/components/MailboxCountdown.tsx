import React, { useState, useEffect } from 'react';

interface MailboxCountdownProps {
  expiresAt: number;
}

/**
 * Isolated Countdown Subcomponent
 * 
 * Prevents 1-second interval timer state updates from re-rendering
 * parent components (HeroGenerator and LiveInbox message lists).
 */
export const MailboxCountdown: React.FC<MailboxCountdownProps> = React.memo(({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, expiresAt - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    const updateTimer = () => {
      const diff = Math.max(0, expiresAt - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="grid grid-cols-4 gap-2 mb-4 text-center">
      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-slate-400 uppercase">Days</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-slate-400 uppercase">Hrs</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-slate-400 uppercase">Min</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-slate-400 uppercase">Sec</span>
      </div>
    </div>
  );
});

MailboxCountdown.displayName = 'MailboxCountdown';
