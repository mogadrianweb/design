import React, { useState } from 'react';
import { Member } from '../types';
import { IconUsers, IconSearch, IconSparkles, IconShield } from './Icons';

interface CommunityViewProps {
  members: Member[];
  deviceMode?: 'mobile' | 'tablet' | 'responsive';
  onShowToast: (msg: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ 
  members, 
  deviceMode = 'mobile', 
  onShowToast 
}) => {
  const [search, setSearch] = useState('');
  const colClass = deviceMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2';

  const groups = [
    { name: 'Montaña & Senderismo Guadarrama', membersCount: 142, icon: '🏔️', leader: 'Carlos Mendoza' },
    { name: 'Rutas Enológicas & Tapeo Madrid', membersCount: 118, icon: '🍷', leader: 'Laura Gómez' },
    { name: 'Tardeos, Azoteas & Conciertos', membersCount: 96, icon: '🎷', leader: 'Elena Santos' },
    { name: 'Pádel & Deporte Amateur', membersCount: 64, icon: '🎾', leader: 'Pablo Morales' }
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.city.toLowerCase().includes(search.toLowerCase()) ||
    m.interests.some(i => i.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Community Header */}
      <div className="pb-2 border-b border-white/10 space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
          <IconUsers className="w-6 h-6 text-amber-400" />
          <span>Comunidad ADYP</span>
        </h1>
        <p className="text-xs text-slate-400">
          Conoce a los socios, únete a grupos de afinidad y haz nuevos amigos para tus planes de ocio
        </p>
      </div>

      {/* Featured Affinity Groups */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center justify-between">
          <span>Grupos de Afinidad Activos</span>
          <span className="text-xs text-indigo-400 cursor-pointer hover:underline" onClick={() => onShowToast('¡Te has unido al grupo de avisos!')}>
            Ver todos
          </span>
        </h2>

        <div className={`grid gap-3 ${colClass}`}>
          {groups.map((grp, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="text-2xl w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  {grp.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white leading-tight">{grp.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{grp.membersCount} socios · Coordina {grp.leader}</p>
                </div>
              </div>
              <button
                onClick={() => onShowToast(`Unido al canal de ${grp.name}`)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all active:scale-95 shrink-0"
              >
                Unirme
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Member Directory */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-white">Directorio de Socios ({members.length})</h2>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, afición o ciudad..."
              className="bg-slate-900 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 w-full sm:w-64"
            />
          </div>
        </div>

        <div className={`grid gap-3 ${colClass}`}>
          {filteredMembers.map(member => (
            <div key={member.id} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{member.name}</h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 uppercase">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{member.city} · Socio desde {member.joinedDate}</p>
                  </div>
                </div>

                <button
                  onClick={() => onShowToast(`Mensaje enviado a ${member.name}`)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-all"
                >
                  Saludar
                </button>
              </div>

              {member.bio && (
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic">
                  "{member.bio}"
                </p>
              )}

              <div className="flex flex-wrap gap-1 pt-1 border-t border-white/5">
                {member.interests.map((interest, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-white/5">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
