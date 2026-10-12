import React from 'react';
import { DesignConceptId, UserRole, DeviceMode } from '../types';
import { 
  IconSmartphone, 
  IconTablet, 
  IconMonitor, 
  IconShield, 
  IconSparkles, 
  IconLayers, 
  IconFileText,
  IconCheck
} from './Icons';
import { DESIGN_CONCEPTS } from '../designTokens';

interface TopControlsProps {
  activeConcept: DesignConceptId;
  onSelectConcept: (concept: DesignConceptId) => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  deviceMode: DeviceMode;
  onSelectDevice: (device: DeviceMode) => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  simulateLoading: boolean;
  onToggleLoading: () => void;
  simulateEmpty: boolean;
  onToggleEmpty: () => void;
  simulateError: boolean;
  onToggleError: () => void;
}

export const TopControls: React.FC<TopControlsProps> = ({
  activeConcept,
  onSelectConcept,
  userRole,
  onSelectRole,
  deviceMode,
  onSelectDevice,
  currentRoute,
  onNavigate,
  simulateLoading,
  onToggleLoading,
  simulateEmpty,
  onToggleEmpty,
  simulateError,
  onToggleError
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-white/10 backdrop-blur-xl px-3 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Concept A/B/C Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 cursor-pointer pr-2 border-r border-white/10"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-black text-white text-xs">
              AD
            </div>
            <span className="font-extrabold text-white tracking-tight hidden sm:inline">ADYP</span>
          </div>

          {/* 3 Visual Concepts Switcher */}
          <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-white/10">
            {(['concept1', 'concept2', 'concept3'] as DesignConceptId[]).map((cid) => {
              const active = activeConcept === cid;
              const label = cid === 'concept1' ? 'A: Glass iOS' : cid === 'concept2' ? 'B: Vibrant M3' : 'C: Editorial';
              return (
                <button
                  key={cid}
                  onClick={() => onSelectConcept(cid)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                    active 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={DESIGN_CONCEPTS[cid].name}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Device Mockup Toggle */}
          <div className="hidden md:flex items-center bg-slate-900 rounded-xl p-0.5 border border-white/10">
            <button
              onClick={() => onSelectDevice('mobile')}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Móvil (iPhone 16 Pro)"
            >
              <IconSmartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectDevice('tablet')}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Tablet Split-View (iPad Pro)"
            >
              <IconTablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectDevice('responsive')}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === 'responsive' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Completa Responsive"
            >
              <IconMonitor className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Role Selector & Navigation Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Active Role Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-400">Rol:</span>
            <select
              value={userRole}
              onChange={(e) => onSelectRole(e.target.value as UserRole)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="invitado" className="bg-slate-900 text-slate-200">Invitado (Público)</option>
              <option value="socio" className="bg-slate-900 text-slate-200">Socio Activo</option>
              <option value="moderador" className="bg-slate-900 text-slate-200">Moderador</option>
              <option value="admin" className="bg-slate-900 text-slate-200">Administrador</option>
            </select>
          </div>

          {/* Quick links to Audit & Prompt tabs */}
          <button
            onClick={() => onNavigate('/auditoria-ux')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all flex items-center gap-1 ${
              currentRoute === '/auditoria-ux'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            <IconLayers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Auditoría UX/UI</span>
            <span className="sm:hidden">Auditoría</span>
          </button>

          <button
            onClick={() => onNavigate('/prompt')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all flex items-center gap-1 ${
              currentRoute === '/prompt'
                ? 'bg-rose-600 text-white'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            <IconFileText className="w-3.5 h-3.5 text-rose-400" />
            <span>Prompt Completo</span>
          </button>

          {/* Admin shortcut if admin/moderator */}
          {(userRole === 'admin' || userRole === 'moderador') && (
            <button
              onClick={() => onNavigate(userRole === 'admin' ? '/admin/resumen' : '/moderacion')}
              className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold hover:bg-amber-500/30 transition-all flex items-center gap-1"
            >
              <IconShield className="w-3.5 h-3.5" />
              <span>{userRole === 'admin' ? 'Admin' : 'Moderación'}</span>
            </button>
          )}

          {/* UI State Toggles for Audit & QA */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-0.5 rounded-xl border border-white/5">
            <button
              onClick={onToggleLoading}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                simulateLoading ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Simular Skeleton Loading"
            >
              Skeleton
            </button>
            <button
              onClick={onToggleEmpty}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                simulateEmpty ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Simular Empty State"
            >
              Vacío
            </button>
            <button
              onClick={onToggleError}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                simulateError ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Simular Error de Carga"
            >
              Error
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
