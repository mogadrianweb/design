import React from 'react';
import { ModerationItem } from '../types';
import { IconShield, IconCheck, IconX, IconAlertCircle } from './Icons';

interface ModerationViewProps {
  items: ModerationItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const ModerationView: React.FC<ModerationViewProps> = ({
  items,
  onApprove,
  onReject,
  onShowToast
}) => {
  const pendingItems = items.filter(i => i.status === 'pendiente');

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <IconShield className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-white">Cola de Moderación</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Supervisión de seguridad de quedadas, comentarios y reportes de la comunidad
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            {pendingItems.length} pendientes
          </span>
        </div>
      </div>

      {pendingItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-white/5 space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <IconCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">Todo al día</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No quedan elementos pendientes de revisión en la cola de moderación.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.authorAvatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.author}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 flex items-center gap-1">
                  <IconAlertCircle className="w-3.5 h-3.5" />
                  <span>{item.reason}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-slate-400 leading-relaxed">{item.details}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => {
                    onApprove(item.id);
                    onShowToast(`Elemento aprobado y validado`);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <IconCheck className="w-4 h-4" />
                  <span>Aprobar</span>
                </button>
                <button
                  onClick={() => {
                    onReject(item.id);
                    onShowToast(`Elemento rechazado y retirado`);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <IconX className="w-4 h-4" />
                  <span>Rechazar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
