import React from 'react';
import { IconCheck, IconSparkles } from './Icons';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900/95 border border-white/20 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <IconCheck className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold text-slate-100">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
