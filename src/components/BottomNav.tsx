import React from 'react';
import { 
  IconCompass, 
  IconCalendar, 
  IconMap, 
  IconUsers, 
  IconUser, 
  IconPlus,
  IconShield
} from './Icons';
import { UserRole, DesignConceptId } from '../types';

interface BottomNavProps {
  currentRoute: string;
  userRole: UserRole;
  conceptId: DesignConceptId;
  onNavigate: (route: string) => void;
  onOpenCreate: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentRoute,
  userRole,
  conceptId,
  onNavigate,
  onOpenCreate
}) => {
  const isSelected = (route: string) => {
    if (route === '/' && currentRoute === '/') return true;
    if (route !== '/' && currentRoute.startsWith(route)) return true;
    return false;
  };

  const navItems = [
    { route: '/', label: 'Explorar', icon: IconCompass },
    { route: '/agenda', label: 'Agenda', icon: IconCalendar },
    { route: '/mapa', label: 'Mapa', icon: IconMap },
    { route: '/mis', label: 'Mis Planes', icon: IconUsers },
    { route: '/perfil', label: 'Perfil', icon: IconUser }
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 w-full glass-ios border-t border-white/12 shadow-2xl">
      <div className="px-2 pb-[env(safe-area-inset-bottom,6px)] pt-1.5 flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isSelected(item.route);

          return (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
                active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${active ? 'scale-105 text-rose-400' : ''}`} />
                {item.route === '/mis' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium tracking-tight ${
                active ? 'text-white font-bold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>

              {/* Active indicator dot */}
              {active && (
                <span className="w-1 h-1 rounded-full bg-rose-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
