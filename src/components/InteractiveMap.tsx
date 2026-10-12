import React, { useState } from 'react';
import { Meetup, Category } from '../types';
import { IconMapPin, IconClock, IconUsers, IconChevronRight, IconFilter } from './Icons';

interface InteractiveMapProps {
  meetups: Meetup[];
  activeConcept: 'concept1' | 'concept2' | 'concept3';
  onSelectMeetup: (meetupId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  meetups,
  activeConcept,
  onSelectMeetup
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string | null>(meetups[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<Category>('todos');

  const filteredMeetups = meetups.filter(m => 
    activeCategory === 'todos' ? true : m.category === activeCategory
  );

  const selectedMeetup = meetups.find(m => m.id === selectedPinId) || filteredMeetups[0];

  return (
    <div className="relative w-full h-full flex flex-col min-h-[560px]">
      {/* Simulation Notice Banner */}
      <div className="px-4 py-2 bg-indigo-950/70 border-b border-indigo-500/20 text-indigo-200 text-xs flex items-center justify-between z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium">Motor de Mapas SVG Local (Sin API Keys externas)</span>
        </div>
        <span className="text-[10px] text-indigo-300/80 bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-400/20">
          Radio Madrid & Sierra
        </span>
      </div>

      {/* Floating Category Filter (Pure Glass without scrollbar) */}
      <div 
        className="absolute top-11 left-3 right-3 z-20 flex gap-1.5 overflow-x-auto no-scrollbar py-0.5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {(['todos', 'senderismo', 'gastronomia', 'cultura', 'nocturno', 'escapadas'] as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`h-7 px-2.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 ${
              activeCategory === cat
                ? 'bg-rose-500 text-white shadow-rose-950/40'
                : 'bg-slate-900/90 text-slate-300 border border-white/10 backdrop-blur-xl'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Floating Map Utility Controls (Top Right) */}
      <div className="absolute top-22 right-3 z-20 flex flex-col gap-1">
        <button
          onClick={() => setSelectedPinId(meetups[0]?.id || null)}
          className="w-7 h-7 rounded-xl glass-ios-button text-white flex items-center justify-center shadow-md active:scale-90 transition-all text-xs"
          title="Recentrar mapa en Madrid"
        >
          📍
        </button>
        <button
          className="w-7 h-7 rounded-xl glass-ios-button text-white flex items-center justify-center shadow-md active:scale-90 transition-all text-xs font-bold"
          title="Zoom +"
        >
          +
        </button>
        <button
          className="w-7 h-7 rounded-xl glass-ios-button text-white flex items-center justify-center shadow-md active:scale-90 transition-all text-xs font-bold"
          title="Zoom -"
        >
          -
        </button>
      </div>

      {/* Interactive Map Area (Vector Graphic Map of Madrid Area) */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden select-none">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full object-cover opacity-80"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
            </pattern>
          </defs>

          {/* Background & Grid */}
          <rect width="100" height="100" fill="#0b1120" />
          <rect width="100" height="100" fill="url(#grid)" />
          <circle cx="50" cy="50" r="45" fill="url(#mapGlow)" />

          {/* Stylized Geography: Sierra de Guadarrama contour lines */}
          <path 
            d="M 10,25 Q 30,15 50,28 T 90,20 L 95,5 L 5,5 Z" 
            fill="#1e293b" 
            opacity="0.4" 
          />
          <path 
            d="M 25,32 Q 40,24 60,34 T 85,28" 
            stroke="#38bdf8" 
            strokeWidth="0.6" 
            strokeDasharray="1,1" 
            fill="none" 
            opacity="0.5" 
          />
          <text x="35" y="24" fill="#64748b" fontSize="2.8" fontWeight="600" letterSpacing="0.5">SIERRA DE GUADARRAMA</text>

          {/* Stylized River Manzanares */}
          <path 
            d="M 20,40 C 35,46 45,62 56,75 C 65,85 70,95 75,100" 
            stroke="#0284c7" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.6" 
          />
          <text x="58" y="82" fill="#0284c7" fontSize="2" opacity="0.8">Río Manzanares</text>

          {/* Stylized Ring Roads (M-30 & M-40) */}
          <ellipse cx="50" cy="52" rx="16" ry="14" stroke="#334155" strokeWidth="0.8" fill="none" strokeDasharray="2,1" />
          <ellipse cx="50" cy="52" rx="28" ry="24" stroke="#1e293b" strokeWidth="0.6" fill="none" />
          <text x="52" y="39" fill="#475569" fontSize="2">M-30</text>
          <text x="52" y="29" fill="#475569" fontSize="2">M-40</text>

          {/* City Centers */}
          <circle cx="50" cy="50" r="1.5" fill="#f43f5e" />
          <text x="52" y="51" fill="#cbd5e1" fontSize="3" fontWeight="bold">MADRID CENTRO</text>

          <circle cx="78" cy="46" r="1" fill="#64748b" />
          <text x="80" y="47" fill="#64748b" fontSize="2.2">Alcalá de Henares</text>

          <circle cx="36" cy="88" r="1" fill="#64748b" />
          <text x="38" y="89" fill="#64748b" fontSize="2.2">Toledo</text>
        </svg>

        {/* Interactive SVG Pins Overlay */}
        <div className="absolute inset-0">
          {filteredMeetups.map((meetup) => {
            const isSelected = selectedMeetup?.id === meetup.id;
            return (
              <button
                key={meetup.id}
                onClick={() => setSelectedPinId(meetup.id)}
                style={{
                  left: `${meetup.coordinates.x}%`,
                  top: `${meetup.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute p-1 group transition-all duration-300 focus:outline-none cursor-pointer ${
                  isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                }`}
                title={meetup.title}
              >
                {/* Ping animation if selected */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-rose-500/40 animate-ping" />
                )}

                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 transition-all ${
                  isSelected
                    ? 'bg-rose-500 border-white text-white shadow-rose-500/50'
                    : 'bg-slate-900 border-slate-600 text-slate-200 group-hover:border-amber-400'
                }`}>
                  <IconMapPin className="w-4 h-4" />
                </div>

                {/* Price/Spots tag */}
                <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap shadow-md ${
                  isSelected
                    ? 'bg-white text-slate-950 font-extrabold'
                    : 'bg-slate-900/90 text-slate-300 border border-white/10'
                }`}>
                  {meetup.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Meetup Floating Glass Window / Bottom Sheet */}
      {selectedMeetup && (
        <div className="p-3 z-30 pb-3">
          <div className="glass-ios-card rounded-2xl p-3 shadow-2xl shadow-black/70 animate-in slide-in-from-bottom-4 duration-300">
            {/* iOS Sheet Drag Handle */}
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-2" />
            
            <div className="flex gap-2.5 items-center">
              <img 
                src={selectedMeetup.image} 
                alt={selectedMeetup.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-md border border-white/10" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-bold mb-0.5">
                  <span className="capitalize">{selectedMeetup.category}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300">{selectedMeetup.date.split(',')[0]}</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate leading-tight">
                  {selectedMeetup.title}
                </h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                  <IconMapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{selectedMeetup.location}</span>
                </p>
                
                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <span className="font-semibold text-emerald-400">{selectedMeetup.currentAttendees}/{selectedMeetup.maxAttendees}</span>
                    <span className="text-slate-500">·</span>
                    <span className="font-bold text-white">{selectedMeetup.price}</span>
                  </div>
                  <button
                    onClick={() => onSelectMeetup(selectedMeetup.id)}
                    className="h-7 px-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm"
                  >
                    <span>Ficha</span>
                    <IconChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
