import React from 'react';
import { UserRole } from '../types';
import { IconUser, IconShield, IconSettings, IconCheck, IconCalendar, IconLogOut } from './Icons';

interface ProfileViewProps {
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
  onNavigate: (route: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userRole,
  onSelectRole,
  onShowToast,
  onNavigate
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 max-w-2xl mx-auto animate-in fade-in duration-200">
      {/* Profile Card Header */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-white/10 shadow-xl space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
              alt="Avatar de socio"
              className="w-20 h-20 rounded-full object-cover border-4 border-rose-500/30 shadow-lg"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <h1 className="text-xl font-black text-white">Laura Gómez</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase self-center sm:self-auto ${
                userRole === 'admin' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : userRole === 'moderador'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {userRole.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400">laura.gomez@email.com · Madrid, España</p>
            <p className="text-xs text-slate-300 italic pt-1">
              "Amante de las catas, el senderismo de otoño y las charlas que se alargan hasta el amanecer."
            </p>
          </div>
        </div>

        {/* Member Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-slate-950/60">
            <p className="text-lg font-black text-white">34</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Quedadas</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60">
            <p className="text-lg font-black text-rose-400">12</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Organizadas</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60">
            <p className="text-lg font-black text-indigo-400">182</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Compañeros</p>
          </div>
        </div>
      </div>

      {/* Membership Status Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-white">Estado de Membresía: Socio al Corriente</p>
              <p className="text-[11px] text-slate-400">Cuota Anual ADYP 2026 renovada</p>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Comprobante digital descargado')}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300"
          >
            Carnet Digital
          </button>
        </div>
      </div>

      {/* Role Testing Box */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <IconShield className="w-4 h-4 text-amber-400" />
          <span>Simulador de Rol Activo</span>
        </h3>
        <p className="text-xs text-slate-400">
          Cambia tu rol en tiempo real para verificar los permisos y vistas dinámicas:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['invitado', 'socio', 'moderador', 'admin'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => {
                onSelectRole(r);
                onShowToast(`Rol cambiado a: ${r.toUpperCase()}`);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all ${
                userRole === r
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-slate-950 border border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
        <h3 className="text-sm font-bold text-white">Acceso a Secciones Especiales</h3>
        <div className="space-y-1.5 pt-1">
          <button
            onClick={() => onNavigate('/auditoria-ux')}
            className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-left text-xs text-slate-200 flex justify-between items-center transition-all"
          >
            <span>Auditoría UX/UI y Matriz de 3 Conceptos</span>
            <span className="text-slate-500">→</span>
          </button>
          <button
            onClick={() => onNavigate('/prompt')}
            className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-left text-xs text-slate-200 flex justify-between items-center transition-all"
          >
            <span>Módulo Prompt Completo (con botón de copia)</span>
            <span className="text-slate-500">→</span>
          </button>
          {(userRole === 'admin' || userRole === 'moderador') && (
            <button
              onClick={() => onNavigate(userRole === 'admin' ? '/admin/resumen' : '/moderacion')}
              className="w-full p-2.5 rounded-xl bg-amber-950/30 hover:bg-amber-950/50 text-left text-xs text-amber-300 border border-amber-500/20 flex justify-between items-center transition-all"
            >
              <span>{userRole === 'admin' ? 'Panel de Administración Global' : 'Cola de Moderación'}</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
