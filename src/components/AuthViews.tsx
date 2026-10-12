import React, { useState } from 'react';
import { UserRole } from '../types';
import { IconCheck, IconAlertCircle, IconUser, IconSparkles } from './Icons';

interface AuthViewsProps {
  mode: 'entrada' | 'unirme';
  onLoginAsRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
  onSwitchMode: (mode: 'entrada' | 'unirme') => void;
}

export const AuthViews: React.FC<AuthViewsProps> = ({
  mode,
  onLoginAsRole,
  onShowToast,
  onSwitchMode
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Madrid');
  const [interests, setInterests] = useState('Senderismo, Gastronomía, Cultura');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'entrada') {
      if (!email.trim()) {
        onShowToast('Por favor, indica un correo electrónico');
        return;
      }
      onLoginAsRole('socio');
      onShowToast(`Sesión iniciada con éxito como Socio (${email})`);
    } else {
      if (!name.trim() || !email.trim()) {
        onShowToast('Por favor, completa nombre y correo');
        return;
      }
      onLoginAsRole('socio');
      onShowToast(`¡Solicitud enviada! Bienvenido a ADYP, ${name}`);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto pb-24 animate-in fade-in duration-300">
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-500 mx-auto flex items-center justify-center shadow-xl shadow-rose-950/40">
          <span className="text-white font-black text-xl tracking-tighter">ADYP</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          {mode === 'entrada' ? 'Acceso de Socios' : 'Unirse a la Comunidad'}
        </h1>
        <p className="text-xs text-slate-400">
          {mode === 'entrada' 
            ? 'A Disfrutar y Punto: quedadas, ocio y amigos en España' 
            : 'Forma parte de nuestro club de actividades y planes de ocio'}
        </p>
      </div>

      {/* Quick Role Switcher for instant testing */}
      <div className="p-3.5 mb-6 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>Acceso Rápido Simulador (Cambio de Rol)</span>
          </span>
          <span className="text-[10px] text-slate-500">1 clic</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              onLoginAsRole('invitado');
              onShowToast('Cambiado a rol Invitado (Vista pública)');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-all text-left"
          >
            👤 Invitado
          </button>
          <button
            type="button"
            onClick={() => {
              onLoginAsRole('socio');
              onShowToast('Cambiado a rol Socio (Laura Gómez)');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900/90 text-xs font-bold text-indigo-300 border border-indigo-500/30 transition-all text-left"
          >
            ⭐ Socio Activo
          </button>
          <button
            type="button"
            onClick={() => {
              onLoginAsRole('moderador');
              onShowToast('Cambiado a rol Moderador (Carlos Mendoza)');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900/90 text-xs font-bold text-amber-300 border border-amber-500/30 transition-all text-left"
          >
            🛡️ Moderador
          </button>
          <button
            type="button"
            onClick={() => {
              onLoginAsRole('admin');
              onShowToast('Cambiado a rol Administrador (Acceso Total)');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900/90 text-xs font-bold text-rose-300 border border-rose-500/30 transition-all text-left"
          >
            👑 Administrador
          </button>
        </div>
      </div>

      {/* Main Auth Form */}
      <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4 shadow-2xl">
        {mode === 'unirme' && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Marcos Valiente"
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@ejemplo.com"
            className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300">Contraseña</label>
            {mode === 'entrada' && (
              <button
                type="button"
                onClick={() => onShowToast('Simulación: enlace de recuperación enviado')}
                className="text-[11px] text-rose-400 hover:underline"
              >
                ¿Olvidaste tu clave?
              </button>
            )}
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        {mode === 'unirme' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Ciudad o zona habitual</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">¿Qué tipo de actividades te gustan?</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-rose-950/40 active:scale-95 transition-all"
        >
          {mode === 'entrada' ? 'Iniciar Sesión' : 'Enviar Solicitud de Socio'}
        </button>

        <div className="text-center pt-2">
          {mode === 'entrada' ? (
            <p className="text-xs text-slate-400">
              ¿Aún no eres socio?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('unirme')}
                className="text-rose-400 font-bold hover:underline ml-1"
              >
                Solicitar Unirme
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              ¿Ya tienes cuenta activa?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('entrada')}
                className="text-rose-400 font-bold hover:underline ml-1"
              >
                Acceder aquí
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
