import React, { useState } from 'react';
import { Meetup, DesignConceptId, UserRole } from '../types';
import { 
  IconCalendar, 
  IconClock, 
  IconMapPin, 
  IconUsers, 
  IconChevronLeft, 
  IconShare, 
  IconHeart, 
  IconCheck, 
  IconAlertCircle,
  IconSparkles
} from './Icons';

interface MeetupDetailProps {
  meetup: Meetup;
  conceptId: DesignConceptId;
  userRole: UserRole;
  isAttending: boolean;
  onToggleAttend: (meetupId: string) => void;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const MeetupDetail: React.FC<MeetupDetailProps> = ({
  meetup,
  conceptId,
  userRole,
  isAttending,
  onToggleAttend,
  onBack,
  onShowToast
}) => {
  const isFull = meetup.currentAttendees >= meetup.maxAttendees;

  const handleCopyCoordinates = () => {
    navigator.clipboard?.writeText?.('40.8252, -3.9625');
    onShowToast('📍 Coordenadas copiadas: 40.8252° N, 3.9625° O');
  };

  const handleOpenGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Estacion+de+Tren+Puerto+de+Cotos+Madrid', '_blank');
  };

  const handleJoinWhatsApp = () => {
    navigator.clipboard?.writeText?.('https://chat.whatsapp.com/ADYP-Guadarrama-Exclusivo');
    onShowToast('💬 Enlace del grupo de WhatsApp copiado al portapapeles');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    onShowToast('Enlace de la quedada copiado al portapapeles');
  };

  return (
    <div className="pb-24 animate-in fade-in duration-300">
      {/* Hero Header with Media */}
      <div className="relative h-72 md:h-80 w-full overflow-hidden bg-slate-950">
        <img
          src={meetup.image}
          alt={meetup.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/60" />

        {/* Top Floating App Bar - Sleek Compact Glass iOS */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-xl glass-ios-button flex items-center justify-center text-white active:scale-90 transition-all shadow-lg"
            aria-label="Volver"
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-xl glass-ios-button flex items-center justify-center text-white active:scale-90 transition-all shadow-lg"
              aria-label="Compartir quedada"
            >
              <IconShare className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onShowToast('Añadido a favoritos')}
              className="w-8 h-8 rounded-xl glass-ios-button flex items-center justify-center text-white hover:text-rose-400 active:scale-90 transition-all shadow-lg"
              aria-label="Favorito"
            >
              <IconHeart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category & Date in Hero */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-md">
              {meetup.category}
            </span>
            <span className="text-xs text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
              {meetup.price}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
            {meetup.title}
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
        {/* Quick Meta Grid - Perfectly Spaced 2-Column Responsive Layout */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <IconCalendar className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Fecha</p>
              <p className="text-xs font-bold text-white truncate">{meetup.date}</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <IconClock className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Hora</p>
              <p className="text-xs font-bold text-white font-mono truncate">{meetup.time} h</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <IconMapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Ciudad</p>
              <p className="text-xs font-bold text-white truncate">{meetup.city}</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <IconUsers className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Plazas</p>
              <p className="text-xs font-bold text-emerald-400 truncate">
                {meetup.currentAttendees} / {meetup.maxAttendees}
              </p>
            </div>
          </div>
        </div>

        {/* Organizer Profile Card - Sleek Compact Alignment */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={meetup.organizer.avatar}
              alt={meetup.organizer.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400/50 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-xs md:text-sm text-white truncate">{meetup.organizer.name}</span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 whitespace-nowrap">
                  {meetup.organizer.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">Organizador de la quedada · Socio Verificado</p>
            </div>
          </div>

          <button
            onClick={() => onShowToast('Chat privado directo con organizador abierto')}
            className="h-8 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 transition-all shrink-0"
          >
            Contactar
          </button>
        </div>

        {/* Description Section */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Sobre esta quedada</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {meetup.description}
          </p>
        </div>

        {/* Meeting Point & Instructions with Interactive Visual Mini-Map */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconMapPin className="w-4 h-4 text-rose-400" />
              <span>Punto de encuentro y cómo llegar</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
              09:15 h puntual
            </span>
          </div>

          <p className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5">
            📍 {meetup.meetingPointDetails || 'Frente a la taquilla de la estación de tren de Cotos a las 09:15 h.'}
          </p>

          {/* Mini-Mapa Visual Integrado con Waypoint */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/15 bg-slate-950 shadow-inner group">
            <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none">
              <defs>
                <pattern id="topoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                </pattern>
                <radialGradient id="mountainShade" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="60%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
              </defs>

              {/* Terrain Background */}
              <rect width="400" height="200" fill="url(#mountainShade)" />
              <rect width="400" height="200" fill="url(#topoGrid)" />

              {/* Contour / Mountain Curves */}
              <path d="M 0,160 Q 100,120 200,140 T 400,100" fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" />
              <path d="M 0,110 Q 120,70 200,85 T 400,60" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" />
              <path d="M 0,60 Q 150,30 240,40 T 400,20" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />

              {/* Mountain Pass Road M-601 / C-9 Line */}
              <path d="M 40,200 C 120,170 160,110 200,95 C 240,80 320,60 380,0" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.85" />
              <path d="M 120,200 C 170,160 195,120 200,95" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.9" />

              {/* Labels on Map */}
              <text x="210" y="80" fill="#f8fafc" fontSize="10" fontWeight="bold">Estación Cotos (C-9)</text>
              <text x="210" y="93" fill="#cbd5e1" fontSize="8">Altitud: 1.830 m · Puerto de Cotos</text>
              <text x="50" y="185" fill="#64748b" fontSize="8">M-601 Navacerrada ↗</text>
              <text x="290" y="45" fill="#64748b" fontSize="8">Laguna Peñalara ↗</text>

              {/* Animated Radar Beacon / Pin Marker */}
              <g transform="translate(200, 95)">
                <circle r="22" fill="#f43f5e" opacity="0.2">
                  <animate attributeName="r" values="8;24;8" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle r="10" fill="#f43f5e" opacity="0.5" />
                <circle r="5" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              </g>
            </svg>

            {/* Map Overlay Badge with GPS */}
            <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-slate-300 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Punto GPS: <strong className="text-white font-mono">40.8252, -3.9625</strong></span>
            </div>

            {/* Floating Action Map Bar inside */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
              <button
                onClick={handleOpenGoogleMaps}
                className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 text-white text-[11px] font-bold backdrop-blur-md shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>🗺️ Abrir en Google Maps</span>
              </button>
              <button
                onClick={handleCopyCoordinates}
                className="py-1.5 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/15 text-[11px] font-medium backdrop-blur-md shadow-md active:scale-95 transition-transform"
                title="Copiar Coordenadas"
              >
                <span>📋 Copiar GPS</span>
              </button>
            </div>
          </div>

          {/* Cómo Llegar & Parking details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <p className="font-bold text-slate-200">🚆 Tren Cercanías C-9</p>
              <p className="text-slate-400 text-[10px]">Cercedilla ➜ Cotos (salida 08:20)</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <p className="font-bold text-slate-200">🚌 Autobús 691</p>
              <p className="text-slate-400 text-[10px]">Moncloa ➜ Puerto de Cotos</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <p className="font-bold text-slate-200">🚗 En Coche / Parking</p>
              <p className="text-slate-400 text-[10px]">Parking Cotos (llegar antes de 09:00)</p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        {meetup.requirements && meetup.requirements.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconAlertCircle className="w-4 h-4 text-amber-400" />
              <span>Qué debes traer / Requisitos</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {meetup.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attendees List (Socios apuntados) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <IconUsers className="w-4 h-4 text-emerald-400" />
              <span>Asistentes confirmados ({meetup.attendeesList.length})</span>
            </h3>
            <span className="text-xs text-slate-400">
              Quedan {Math.max(0, meetup.maxAttendees - meetup.currentAttendees)} plazas libres
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {meetup.attendeesList.map((attendee) => (
              <div 
                key={attendee.id} 
                className="inline-flex items-center gap-2 py-1 px-2.5 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors"
              >
                <img
                  src={attendee.avatar}
                  alt={attendee.name}
                  className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0"
                />
                <span className="font-medium text-slate-200">{attendee.name}</span>
                {attendee.role === 'organizador' && (
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Grupo Oficial de WhatsApp (Sustituye al Muro de dudas y comentarios) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-900/90 border border-emerald-500/20 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base shadow-sm">
                💬
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Grupo de WhatsApp de la Quedada</h3>
                <p className="text-[10px] text-emerald-400/90 font-medium">Canal oficial de coordinación directa</p>
              </div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Exclusivo Socios
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Las dudas sobre la ruta, la coordinación de coches compartidos y cualquier aviso meteorológico se gestionan directamente a través del grupo privado de WhatsApp de los asistentes confirmados.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={handleJoinWhatsApp}
              className="flex-1 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-xs font-bold text-white shadow-md shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
            >
              <span>💬 Entrar al Grupo de WhatsApp</span>
            </button>
            <button
              onClick={() => onShowToast('Publicada petición de coche compartido en el grupo de WhatsApp')}
              className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-semibold text-slate-200 border border-white/10 transition-all flex items-center justify-center gap-1.5"
            >
              <span>🚗 Compartir Coche</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar (Glass iOS Sticky Safe Area) */}
      <div className="sticky bottom-0 left-0 right-0 p-3 glass-ios border-t border-white/12 z-30 flex items-center justify-between gap-3 max-w-3xl mx-auto shadow-2xl">
        <div>
          <p className="text-[10px] text-slate-400">Precio</p>
          <p className="text-sm font-black text-white">{meetup.price}</p>
        </div>

        <button
          onClick={() => onToggleAttend(meetup.id)}
          disabled={isFull && !isAttending}
          className={`flex-1 h-10 px-4 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 ${
            isAttending
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
              : isFull
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
          }`}
        >
          {isAttending ? (
            <>
              <IconCheck className="w-4 h-4" />
              <span>¡Apuntado! (Cancelar)</span>
            </>
          ) : isFull ? (
            <span>Completa (Sin plazas)</span>
          ) : (
            <>
              <IconSparkles className="w-3.5 h-3.5" />
              <span>Confirmar Asistencia ({meetup.maxAttendees - meetup.currentAttendees} libres)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
