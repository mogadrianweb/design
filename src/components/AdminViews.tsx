import React, { useState } from 'react';
import { Member, Meetup, ModerationItem, AuditLog, UserRole } from '../types';
import { 
  IconShield, 
  IconUsers, 
  IconCalendar, 
  IconBarChart, 
  IconCheck, 
  IconX, 
  IconAlertCircle, 
  IconSettings,
  IconFileText,
  IconSparkles
} from './Icons';

interface AdminViewsProps {
  subRoute: string; // 'resumen' | 'altas' | 'socios' | 'quedadas' | 'auditoria' | 'ajustes' | 'datos'
  members: Member[];
  meetups: Meetup[];
  moderationList: ModerationItem[];
  auditLogs: AuditLog[];
  onApproveModeration: (id: string) => void;
  onRejectModeration: (id: string) => void;
  onUpdateMemberRole: (memberId: string, newRole: UserRole) => void;
  onShowToast: (msg: string) => void;
  onNavigate: (route: string) => void;
}

export const AdminViews: React.FC<AdminViewsProps> = ({
  subRoute,
  members,
  meetups,
  moderationList,
  auditLogs,
  onApproveModeration,
  onRejectModeration,
  onUpdateMemberRole,
  onShowToast,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(subRoute || 'resumen');

  // Change tab and update route seamlessly
  const switchTab = (tab: string) => {
    setActiveTab(tab);
    onNavigate(`/admin/${tab}`);
  };

  const pendingModerations = moderationList.filter(m => m.status === 'pendiente');
  const pendingMembers = members.filter(m => m.status === 'pendiente');

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Admin Header with Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
              <IconShield className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-white">Panel de Administración ADYP</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gestión integral de socios, eventos, cola de aprobación y auditoría de seguridad
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
            Entorno Seguro · Rol Administrador
          </span>
        </div>
      </div>

      {/* Admin Navigation Horizontal Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-900/90 rounded-2xl border border-white/10">
        {[
          { id: 'resumen', label: 'Resumen KPI', icon: IconBarChart },
          { id: 'altas', label: `Altas (${pendingMembers.length})`, icon: IconUsers },
          { id: 'socios', label: `Socios (${members.length})`, icon: IconUsers },
          { id: 'quedadas', label: `Quedadas (${meetups.length})`, icon: IconCalendar },
          { id: 'auditoria', label: 'Auditoría', icon: IconFileText },
          { id: 'ajustes', label: 'Ajustes', icon: IconSettings },
          { id: 'datos', label: 'Datos & Backup', icon: IconSparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: RESUMEN / KPIS */}
      {activeTab === 'resumen' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Total Socios</p>
              <p className="text-2xl font-black text-white mt-1">{members.length}</p>
              <p className="text-[11px] text-emerald-400 mt-1">↑ +14% este mes</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Quedadas Activas</p>
              <p className="text-2xl font-black text-white mt-1">{meetups.length}</p>
              <p className="text-[11px] text-indigo-400 mt-1">92% plazas ocupadas</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Altas Pendientes</p>
              <p className="text-2xl font-black text-amber-400 mt-1">{pendingMembers.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">Tiempo resp: &lt;4h</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Moderación</p>
              <p className="text-2xl font-black text-rose-400 mt-1">{pendingModerations.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">Casos en revisión</p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white">Acciones rápidas de administración</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button 
                onClick={() => switchTab('altas')}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-white/5 transition-all text-xs text-white"
              >
                <span className="font-bold block text-rose-400">Revisar Nuevas Solicitudes</span>
                <span className="text-[11px] text-slate-400">Comprobar perfil y cuota de nuevos socios</span>
              </button>
              <button 
                onClick={() => switchTab('socios')}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-white/5 transition-all text-xs text-white"
              >
                <span className="font-bold block text-emerald-400">Directorio de Miembros</span>
                <span className="text-[11px] text-slate-400">Gestionar roles, permisos y estados</span>
              </button>
              <button 
                onClick={() => switchTab('auditoria')}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-white/5 transition-all text-xs text-white"
              >
                <span className="font-bold block text-indigo-400">Registro de Seguridad</span>
                <span className="text-[11px] text-slate-400">Trazabilidad de cambios y accesos</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALTAS PENDIENTES */}
      {activeTab === 'altas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">
              Solicitudes de admisión pendientes ({pendingMembers.length})
            </h2>
            <button
              onClick={() => onShowToast('Todas las altas validadas')}
              className="text-xs text-emerald-400 hover:underline"
            >
              Aprobar todas
            </button>
          </div>

          {pendingMembers.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-white/5 text-slate-400 text-xs">
              No hay solicitudes pendientes de validación en este momento.
            </div>
          ) : (
            <div className="space-y-2">
              {pendingMembers.map(m => (
                <div key={m.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-white">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.email} · {m.city}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Intereses: {m.interests.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        onUpdateMemberRole(m.id, 'socio');
                        onShowToast(`Alta aprobada para ${m.name}`);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <IconCheck className="w-4 h-4" />
                      <span>Aprobar</span>
                    </button>
                    <button
                      onClick={() => onShowToast(`Solicitud de ${m.name} desestimada`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SOCIOS */}
      {activeTab === 'socios' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-white">Directorio General de Socios ({members.length})</h2>
            <input
              type="text"
              placeholder="Buscar por nombre, email o ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white max-w-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="space-y-2">
            {members
              .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.city.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(m => (
                <div key={m.id} className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{m.name}</span>
                        <span className={`text-[10px] px-2 py-0.2 rounded font-bold uppercase ${
                          m.role === 'admin' 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : m.role === 'moderador'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {m.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{m.email} · {m.city} · {m.meetupsAttended} quedadas</p>
                    </div>
                  </div>

                  {/* Role Switcher Action */}
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-400">Rol:</label>
                    <select
                      value={m.role}
                      onChange={(e) => {
                        onUpdateMemberRole(m.id, e.target.value as UserRole);
                        onShowToast(`Rol de ${m.name} actualizado a ${e.target.value}`);
                      }}
                      className="bg-slate-950 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                    >
                      <option value="socio">Socio</option>
                      <option value="moderador">Moderador</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUEDADAS */}
      {activeTab === 'quedadas' && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white">Supervisión Global de Quedadas ({meetups.length})</h2>
          <div className="space-y-2">
            {meetups.map(m => (
              <div key={m.id} className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={m.image} alt={m.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-white">{m.title}</p>
                    <p className="text-[11px] text-slate-400">{m.date} · {m.location} · {m.currentAttendees}/{m.maxAttendees} plazas</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowToast(`Quedada "${m.title}" editada`)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onShowToast(`Quedada cancelada y avisados los ${m.currentAttendees} socios`)}
                    className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUDITORÍA */}
      {activeTab === 'auditoria' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Registro de Auditoría de Seguridad & Operaciones</h2>
            <button
              onClick={() => onShowToast('Registro de auditoría exportado en CSV')}
              className="text-xs text-indigo-400 hover:underline"
            >
              Descargar CSV
            </button>
          </div>

          <div className="space-y-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      log.severity === 'critical' ? 'bg-rose-500' : log.severity === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                    }`} />
                    <span className="font-mono font-bold text-slate-300">{log.action}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                </div>
                <p className="text-slate-400 pl-4">{log.details}</p>
                <p className="text-[10px] text-slate-500 pl-4">Usuario: {log.user}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AJUSTES */}
      {activeTab === 'ajustes' && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white">Parámetros Globales de la Plataforma ADYP</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
              <div>
                <p className="text-xs font-semibold text-white">Moderación previa de quedadas</p>
                <p className="text-[11px] text-slate-400">Exigir visto bueno de moderador antes de ser públicas</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-rose-500 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
              <div>
                <p className="text-xs font-semibold text-white">Registro público abierto</p>
                <p className="text-[11px] text-slate-400">Permitir que invitados soliciten admisión sin invitación</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-rose-500 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
              <div>
                <p className="text-xs font-semibold text-white">Notificaciones push inmediatas</p>
                <p className="text-[11px] text-slate-400">Avisar por móvil de nuevas quedadas en un radio de 30km</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-rose-500 cursor-pointer" />
            </div>
          </div>

          <button
            onClick={() => onShowToast('Ajustes guardados con éxito')}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold"
          >
            Guardar Configuración
          </button>
        </div>
      )}

      {/* TAB 7: DATOS & BACKUP */}
      {activeTab === 'datos' && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <h2 className="text-sm font-bold text-white">Exportación de Datos & Respaldo</h2>
          <p className="text-xs text-slate-400">
            Todos los datos residen en la sesión actual en memoria sin backend externo. Puedes exportar o resetear el estado simulado cuando desees.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => onShowToast('Copia JSON de datos generada')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
            >
              Exportar JSON Completo
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                onShowToast('Estado de demostración restablecido a valores por defecto');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Restablecer Datos Iniciales
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
