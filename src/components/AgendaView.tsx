import React, { useState } from 'react';
import { Meetup, DesignConceptId, Category } from '../types';
import { IconCalendar, IconClock, IconMapPin, IconUsers, IconFilter } from './Icons';

interface AgendaViewProps {
  meetups: Meetup[];
  conceptId: DesignConceptId;
  attendingIds: string[];
  onOpenDetail: (meetupId: string) => void;
  onToggleAttend: (meetupId: string) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  meetups,
  conceptId,
  attendingIds,
  onOpenDetail,
  onToggleAttend
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');

  const filteredMeetups = meetups.filter(m => 
    selectedCategory === 'todos' ? true : m.category === selectedCategory
  );

  return (
    <div className="p-4 md:p-6 space-y-5 pb-24 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <IconCalendar className="w-6 h-6 text-indigo-400" />
            <span>Agenda de Actividades</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cronograma ordenado de próximas salidas, quedadas y encuentros comunitarios
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {(['todos', 'senderismo', 'gastronomia', 'cultura', 'nocturno'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-white/10">
        {filteredMeetups.map((meetup) => {
          const isAttending = attendingIds.includes(meetup.id);
          const isFull = meetup.currentAttendees >= meetup.maxAttendees;

          return (
            <div key={meetup.id} className="relative pl-12 group">
              {/* Timeline Node Icon */}
              <div className="absolute left-2.5 top-3.5 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-400 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
              </div>

              {/* Agenda Card */}
              <div 
                onClick={() => onOpenDetail(meetup.id)}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-indigo-400/40 transition-all cursor-pointer shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400">{meetup.date}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                      <IconClock className="w-3.5 h-3.5 text-slate-400" />
                      {meetup.time} h
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 capitalize">
                      {meetup.category}
                    </span>
                    <span className="text-xs font-bold text-white bg-black/40 px-2 py-0.5 rounded">
                      {meetup.price}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <img
                    src={meetup.image}
                    alt={meetup.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {meetup.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <IconMapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span>{meetup.location}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Organiza: <span className="text-slate-300 font-medium">{meetup.organizer.name}</span>
                    </p>
                  </div>
                </div>

                {/* Footer and Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <span className={`font-semibold ${isFull ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {meetup.currentAttendees}/{meetup.maxAttendees} plazas ocupadas
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleAttend(meetup.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                      isAttending
                        ? 'bg-emerald-600 text-white'
                        : isFull
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {isAttending ? '✓ Apuntado' : isFull ? 'Completa' : 'Apuntarme'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
