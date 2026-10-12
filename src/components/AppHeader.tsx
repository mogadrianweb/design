import React, { useState } from 'react';
import { UserRole } from '../types';
import { IconUser, IconShield, IconLogOut, IconSettings, IconCheck, IconCalendar } from './Icons';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'meetup' | 'comment' | 'system';
}

interface AppHeaderProps {
  userRole: UserRole;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onShowToast: (msg: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  userRole,
  currentRoute,
  onNavigate,
  onShowToast
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: '¡Nueva Quedada en la Sierra!',
      message: 'Carlos Mendoza ha publicado "Ruta Laguna de Peñalara & Puesta de Sol".',
      time: 'Hace 15 min',
      read: false,
      type: 'meetup'
    },
    {
      id: 'notif-2',
      title: 'Comentario en tu quedada',
      message: 'Laura Gómez: "¿Llevamos algo para compartir al llegar a la cima?"',
      time: 'Hace 1 hora',
      read: false,
      type: 'comment'
    },
    {
      id: 'notif-3',
      title: 'Inscripción Confirmada',
      message: 'Tienes plaza reservada para la Cata de Vinos en La Latina.',
      time: 'Ayer',
      read: true,
      type: 'system'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    onShowToast('Todas las notificaciones marcadas como leídas');
  };

  return (
    <header className="sticky top-0 z-30 glass-ios border-b border-white/12 px-4 py-2.5 flex items-center justify-between select-none">
      {/* Brand Cluster */}
      <div 
        onClick={() => onNavigate('/')}
        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-500 flex items-center justify-center font-black text-white text-xs shadow-md shadow-rose-950/40">
          AD
        </div>
        <div>
          <span className="font-extrabold text-sm text-white tracking-tight block leading-none">ADYP</span>
          <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">A Disfrutar y Punto</span>
        </div>
      </div>

      {/* Action Icons: Notification Bell & User Avatar Menu */}
      <div className="flex items-center gap-2">
        {/* Campanita de Notificaciones */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(prev => !prev);
              setShowUserMenu(false);
            }}
            className="w-8 h-8 rounded-xl glass-ios-button text-white flex items-center justify-center active:scale-90 transition-all relative"
            aria-label="Notificaciones"
          >
            {/* Bell SVG */}
            <svg className="w-4 h-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>

            {/* Notification Badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Floating Glass Notification Panel */}
          {showNotifications && (
            <div className="absolute top-11 right-0 w-80 bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white">Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded font-bold">
                      {unreadCount} nuevas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-indigo-400 hover:underline"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>

              <div className="space-y-2 py-2 max-h-64 overflow-y-auto no-scrollbar">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      n.read = true;
                      setShowNotifications(false);
                      onNavigate('/agenda');
                    }}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                      n.read
                        ? 'bg-slate-950/40 border-white/5 text-slate-400'
                        : 'bg-indigo-950/30 border-indigo-500/30 text-white shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <p className="font-bold text-xs text-white">{n.title}</p>
                      <span className="text-[9px] text-slate-500 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('/agenda');
                  }}
                  className="text-[11px] font-bold text-slate-300 hover:text-white"
                >
                  Ver todas las alertas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menú de Usuario / Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(prev => !prev);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 p-1 rounded-xl glass-ios-button active:scale-95 transition-all"
            aria-label="Menú de usuario"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              alt="Laura Gómez"
              className="w-7 h-7 rounded-lg object-cover border border-white/20"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* Floating Glass User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute top-11 right-0 w-64 bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-2">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Laura Gómez"
                  className="w-9 h-9 rounded-xl object-cover border border-white/20"
                />
                <div className="min-w-0">
                  <p className="font-bold text-xs text-white truncate">Laura Gómez</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                      {userRole}
                    </span>
                    <span className="text-[10px] text-slate-400">· Cuota 2026 ✓</span>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('/perfil');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-white/10 text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconUser className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Mi Perfil de Socio</span>
                  </span>
                  <span className="text-slate-500 text-[10px]">→</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('/mis');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-white/10 text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconCalendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>Mis Quedadas & Planes</span>
                  </span>
                  <span className="text-slate-500 text-[10px]">→</span>
                </button>

                {(userRole === 'admin' || userRole === 'moderador') && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate(userRole === 'admin' ? '/admin/resumen' : '/moderacion');
                    }}
                    className="w-full text-left p-2 rounded-xl bg-amber-950/40 border border-amber-500/20 text-amber-300 hover:bg-amber-950/60 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <IconShield className="w-3.5 h-3.5 text-amber-400" />
                      <span>{userRole === 'admin' ? 'Panel Administración' : 'Cola Moderación'}</span>
                    </span>
                    <span className="text-amber-400 text-[10px]">→</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onShowToast('Sesión de demostración reiniciada');
                    onNavigate('/entrada');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-rose-950/30 text-rose-300 flex items-center justify-between transition-colors pt-2 border-t border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <IconLogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Cerrar Sesión</span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
