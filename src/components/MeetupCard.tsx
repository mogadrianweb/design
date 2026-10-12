import React from 'react';
import { Meetup, DesignConceptId } from '../types';
import { IconMapPin, IconCalendar, IconClock, IconUsers, IconHeart } from './Icons';

interface MeetupCardProps {
  meetup: Meetup;
  conceptId: DesignConceptId;
  isAttending: boolean;
  onToggleAttend: (e: React.MouseEvent, meetupId: string) => void;
  onOpenDetail: (meetupId: string) => void;
}

export const MeetupCard: React.FC<MeetupCardProps> = ({
  meetup,
  conceptId,
  isAttending,
  onToggleAttend,
  onOpenDetail
}) => {
  const isFull = meetup.currentAttendees >= meetup.maxAttendees;
  const occupancyPercentage = Math.min(100, Math.round((meetup.currentAttendees / meetup.maxAttendees) * 100));

  // Concept-specific styles
  const getContainerStyle = () => {
    switch (conceptId) {
      case 'concept1': // iOS Glassmorphism
        return 'glass-ios-card rounded-2xl shadow-xl shadow-black/40 hover:border-white/20';
      case 'concept2': // Vibrant Material 3
        return 'bg-[#1e293b] border border-amber-500/20 rounded-3xl shadow-xl shadow-orange-950/20 hover:border-amber-400/50';
      case 'concept3': // Neo-Editorial Warmth
        return 'bg-white border border-[#E6DFD5] rounded-xl shadow-md shadow-stone-900/5 hover:border-amber-900/30';
      default:
        return 'bg-slate-900 border border-slate-800 rounded-2xl';
    }
  };

  const getTitleStyle = () => {
    switch (conceptId) {
      case 'concept1':
        return 'text-white font-bold tracking-tight';
      case 'concept2':
        return 'text-white font-extrabold tracking-normal';
      case 'concept3':
        return 'text-stone-900 font-serif font-bold tracking-tight text-lg';
      default:
        return 'text-white font-bold';
    }
  };

  const getSubtextStyle = () => {
    switch (conceptId) {
      case 'concept1':
        return 'text-slate-300';
      case 'concept2':
        return 'text-amber-100/80';
      case 'concept3':
        return 'text-stone-600';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <article
      onClick={() => onOpenDetail(meetup.id)}
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 active:scale-[0.99] group ${getContainerStyle()}`}
    >
      {/* Top Banner Image with Gradient Overlay */}
      <div className="relative h-40 w-full aspect-[16/10] overflow-hidden bg-slate-950 shrink-0">
        <img
          src={meetup.image}
          alt={meetup.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Top Badges / Metadata - Compact iOS APK Style (Zero oversized pills) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/65 backdrop-blur-md text-white border border-white/15">
              {meetup.category}
            </span>
            {meetup.featured && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950">
                ★ Top
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-7 h-7 rounded-xl glass-ios-button flex items-center justify-center text-white/90 hover:text-rose-400 active:scale-90 transition-all"
            aria-label="Guardar en favoritos"
          >
            <IconHeart className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] gap-2">
          <div className="flex items-center gap-1.5 font-medium drop-shadow-sm min-w-0 truncate">
            <IconCalendar className="w-3 h-3 text-amber-300 shrink-0" />
            <span className="truncate">{meetup.date}</span>
            <span className="opacity-50">·</span>
            <span className="shrink-0 font-mono text-[10px]">{meetup.time}h</span>
          </div>

          <div className="font-bold text-[10px] bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 shrink-0">
            {meetup.price}
          </div>
        </div>
      </div>

      {/* Card Content Body - Strict Square Alignment */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
        {/* Title & Location with fixed height to prevent vertical descuadre */}
        <div>
          <div className="h-10 flex items-start overflow-hidden">
            <h3 className={`text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-rose-400 transition-colors ${getTitleStyle()}`}>
              {meetup.title}
            </h3>
          </div>
          <p className={`text-[11px] flex items-center gap-1 mt-1 truncate ${getSubtextStyle()}`}>
            <IconMapPin className="w-3 h-3 opacity-60 shrink-0" />
            <span className="truncate">{meetup.location} ({meetup.city})</span>
            {meetup.distanceKm !== undefined && (
              <>
                <span className="opacity-40">·</span>
                <span className="text-[10px] opacity-80 shrink-0">{meetup.distanceKm} km</span>
              </>
            )}
          </p>
        </div>

        {/* Organizer mini line */}
        <div className="flex items-center gap-2 pt-1.5 border-t border-white/5">
          <img
            src={meetup.organizer.avatar}
            alt={meetup.organizer.name}
            className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0"
          />
          <div className="flex items-center gap-1.5 text-[11px] truncate">
            <span className="font-medium text-white/90 truncate">{meetup.organizer.name}</span>
            <span className="text-[9px] text-slate-400 px-1 py-0.2 bg-white/5 rounded shrink-0">
              {meetup.organizer.badge}
            </span>
          </div>
        </div>

        {/* Attendance Progress & CTA Area */}
        <div className="space-y-2 pt-1">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between items-center text-[11px] mb-1 gap-1">
              <span className={`font-medium flex items-center gap-1 truncate ${
                isFull ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                <IconUsers className="w-3 h-3 shrink-0" />
                <span className="truncate">{isFull ? 'Aforo Completo' : `${meetup.currentAttendees}/${meetup.maxAttendees} plazas`}</span>
              </span>
              <span className="text-[10px] text-slate-400 shrink-0">
                {occupancyPercentage}%
              </span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull 
                    ? 'bg-amber-500' 
                    : occupancyPercentage > 75 
                    ? 'bg-rose-500' 
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>

          {/* Action Row - Ultra-Compact Native APK Style (Nunca se descuadra) */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={(e) => onToggleAttend(e, meetup.id)}
              disabled={isFull && !isAttending}
              className={`flex-1 h-8 px-2.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 active:scale-95 shadow-sm whitespace-nowrap ${
                isAttending
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
                  : isFull
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : conceptId === 'concept1'
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40'
                  : conceptId === 'concept2'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-orange-950/40'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
              }`}
            >
              {isAttending ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Apuntado ✓</span>
                </>
              ) : isFull ? (
                <span>Lista espera</span>
              ) : (
                <span>¡Me apunto!</span>
              )}
            </button>

            <button
              onClick={() => onOpenDetail(meetup.id)}
              className="h-8 px-2.5 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 active:scale-95 text-slate-200 border border-white/10 transition-all shrink-0"
            >
              Ficha
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
