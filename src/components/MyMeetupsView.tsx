import React, { useState } from 'react';
import { Meetup, DesignConceptId } from '../types';
import { MeetupCard } from './MeetupCard';
import { IconCalendar, IconPlus, IconUsers } from './Icons';

interface MyMeetupsViewProps {
  meetups: Meetup[];
  conceptId: DesignConceptId;
  deviceMode?: 'mobile' | 'tablet' | 'responsive';
  attendingIds: string[];
  onOpenDetail: (meetupId: string) => void;
  onToggleAttend: (e: React.MouseEvent, meetupId: string) => void;
  onOpenCreate: () => void;
}

export const MyMeetupsView: React.FC<MyMeetupsViewProps> = ({
  meetups,
  conceptId,
  deviceMode = 'mobile',
  attendingIds,
  onOpenDetail,
  onToggleAttend,
  onOpenCreate
}) => {
  const [subTab, setSubTab] = useState<'apuntadas' | 'organizadas' | 'historial'>('apuntadas');

  const myAttending = meetups.filter(m => attendingIds.includes(m.id));
  const myOrganized = meetups.filter(m => m.organizer.id === 'usr-1' || m.organizer.id === 'usr-2');
  const gridClass = deviceMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className="p-4 md:p-6 space-y-5 pb-24 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <IconUsers className="w-6 h-6 text-rose-400" />
            <span>Mis Planes & Quedadas</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestiona tus inscripciones, planes propuestos y eventos completados
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 self-start sm:self-auto active:scale-95 transition-all"
        >
          <IconPlus className="w-4 h-4" />
          <span>Proponer Actividad</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-white/10">
        <button
          onClick={() => setSubTab('apuntadas')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            subTab === 'apuntadas' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Apuntadas ({myAttending.length})
        </button>
        <button
          onClick={() => setSubTab('organizadas')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            subTab === 'organizadas' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Organizadas ({myOrganized.length})
        </button>
        <button
          onClick={() => setSubTab('historial')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            subTab === 'historial' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Historial Pasado (14)
        </button>
      </div>

      {/* Content */}
      {subTab === 'apuntadas' && (
        <div>
          {myAttending.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-white/5 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <IconCalendar className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">No te has apuntado a ninguna quedada todavía</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explora las próximas actividades de senderismo, cenas o escapadas y confirma tu plaza en un clic.
              </p>
            </div>
          ) : (
            <div className={`grid gap-4 ${gridClass}`}>
              {myAttending.map(meetup => (
                <MeetupCard
                  key={meetup.id}
                  meetup={meetup}
                  conceptId={conceptId}
                  isAttending={true}
                  onToggleAttend={onToggleAttend}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {subTab === 'organizadas' && (
        <div className={`grid gap-4 ${gridClass}`}>
          {myOrganized.map(meetup => (
            <MeetupCard
              key={meetup.id}
              meetup={meetup}
              conceptId={conceptId}
              isAttending={attendingIds.includes(meetup.id)}
              onToggleAttend={onToggleAttend}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}

      {subTab === 'historial' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">Recuerdos y quedadas finalizadas de la temporada:</p>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Ruta de las Cascadas del Purgatorio</span>
              <span className="text-slate-500">14 Septiembre 2026</span>
            </div>
            <p className="text-xs text-slate-400">18 socios participaron · 42 fotos compartidas en el álbum del grupo</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Cena de Verano en Terraza Cibeles</span>
              <span className="text-slate-500">28 Agosto 2026</span>
            </div>
            <p className="text-xs text-slate-400">24 socios participaron · Gran noche de despedida de vacaciones</p>
          </div>
        </div>
      )}
    </div>
  );
};
