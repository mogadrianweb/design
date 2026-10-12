import React, { useState } from 'react';
import { Meetup, Category } from '../types';
import { IconX, IconCheck, IconAlertCircle, IconSparkles, IconMapPin, IconCalendar, IconClock, IconUsers } from './Icons';

interface CreateMeetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newMeetup: Partial<Meetup>) => void;
  onShowToast: (msg: string) => void;
}

export const CreateMeetupModal: React.FC<CreateMeetupModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onShowToast
}) => {
  // Active Form Section Tab
  const [activeStep, setActiveStep] = useState<'basico' | 'horario' | 'logistica' | 'aforo' | 'requisitos'>('basico');

  // Step 1: Basic Information
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('senderismo');
  const [subType, setSubType] = useState('Ruta senderista');
  const [difficulty, setDifficulty] = useState<'baja' | 'media' | 'alta'>('media');
  const [description, setDescription] = useState('');

  // Step 2: Date & Schedule
  const [date, setDate] = useState('Sábado, 31 Octubre');
  const [timeStart, setTimeStart] = useState('09:30');
  const [timeEnd, setTimeEnd] = useState('14:30');
  const [transportType, setTransportType] = useState('Coches compartidos desde Moncloa');

  // Step 3: Meeting Point & Location
  const [locationName, setLocationName] = useState('Puerto de Cotos (Aparcamiento Estación)');
  const [city, setCity] = useState('Madrid');
  const [meetingInstructions, setMeetingInstructions] = useState('En la taquilla de la estación 15 min antes, llevo mochila roja');

  // Step 4: Capacity & Economics
  const [minAttendees, setMinAttendees] = useState(6);
  const [maxAttendees, setMaxAttendees] = useState(16);
  const [enableWaitlist, setEnableWaitlist] = useState(true);
  const [priceType, setPriceType] = useState<'gratis' | 'consumicion' | 'bizum' | 'fianza'>('gratis');
  const [priceAmount, setPriceAmount] = useState('Gratis');
  const [priceIncludes, setPriceIncludes] = useState('Organización, seguro de accidentes y coordinación');

  // Step 5: Requirements & Rules
  const [requirements, setRequirements] = useState('Botas de montaña, 1.5L agua, ropa de abrigo');
  const [cancellationNoticeHours, setCancellationNoticeHours] = useState('24 horas');
  const [whatsappLink, setWhatsappLink] = useState('https://chat.whatsapp.com/adyp-demo');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80');
  const [contactPhone, setContactPhone] = useState('+34 612 345 678');
  const [acceptTerms, setAcceptTerms] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (title.trim().length < 6) {
      errs.title = 'El título debe tener al menos 6 caracteres';
    }
    if (description.trim().length < 15) {
      errs.description = 'Añade una descripción más detallada (mín. 15 caracteres)';
    }
    if (!locationName.trim()) {
      errs.locationName = 'Indica el punto de encuentro exacto';
    }
    if (!acceptTerms) {
      errs.acceptTerms = 'Debes aceptar las normas de convivencia de ADYP';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast('Revisa los campos obligatorios señalados');
      return;
    }

    const newMeetup: Partial<Meetup> = {
      title,
      category,
      description: `${description}\n\n[Dificultad: ${difficulty.toUpperCase()}] · [Transporte: ${transportType}] · [Incluye: ${priceIncludes}]${whatsappLink ? ` · [WhatsApp: ${whatsappLink}]` : ''}`,
      date,
      time: timeStart,
      location: locationName,
      city,
      price: priceType === 'gratis' ? 'Gratis' : priceAmount,
      maxAttendees,
      meetingPointDetails: meetingInstructions,
      requirements: requirements.split(',').map(r => r.trim()).filter(Boolean),
      image: coverImage || (category === 'senderismo' 
        ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
        : category === 'gastronomia'
        ? 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80'
        : category === 'cultura'
        ? 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80'
        : 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80'),
      status: 'publicada'
    };

    onCreate(newMeetup);
    onShowToast('¡Quedada completa creada y publicada en ADYP!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900/95 border border-white/15 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-6 duration-300 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Tactile Sheet Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center items-center">
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Floating Modal Header */}
        <div className="px-4 pb-3 border-b border-white/10 relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="text-base font-black text-white flex items-center gap-1.5">
                  <span>Proponer Nueva Quedada</span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Formulario oficial de actividades comunitarias ADYP</p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-all text-xs"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>

          {/* Stepper Wizard Progress Tabs */}
          <div 
            className="flex gap-1.5 overflow-x-auto no-scrollbar pt-3" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { id: 'basico', label: '1. Plan' },
              { id: 'horario', label: '2. Fecha' },
              { id: 'logistica', label: '3. Punto' },
              { id: 'aforo', label: '4. Plazas' },
              { id: 'requisitos', label: '5. Normas' }
            ].map(step => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeStep === step.id
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body Scroll Area */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto flex-1 no-scrollbar">
          {/* TAB 1: DATOS BÁSICOS DEL PLAN */}
          {activeStep === 'basico' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Título de la quedada *</span>
                  {title.length >= 6 && <span className="text-emerald-400 text-[10px]">✓ Válido</span>}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Ruta al Yelmo y Puesta de Sol en La Pedriza"
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none ${
                    errors.title ? 'border-rose-500 bg-rose-950/20' : 'border-white/15 focus:border-indigo-400'
                  }`}
                />
                {errors.title && <p className="text-[11px] text-rose-400">{errors.title}</p>}
              </div>

              {/* Categoría principal */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Categoría principal</label>
                <div className="flex flex-wrap gap-1.5">
                  {(['senderismo', 'gastronomia', 'cultura', 'nocturno', 'escapadas', 'deportes'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                        category === cat
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-slate-950 border border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dificultad física */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Exigencia física</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'baja', label: 'Baja (Paseo)', desc: 'Apto para todos' },
                    { id: 'media', label: 'Media (Estándar)', desc: 'Buen ritmo' },
                    { id: 'alta', label: 'Alta (Exigente)', desc: 'Experiencia previa' }
                  ].map(dif => (
                    <button
                      key={dif.id}
                      type="button"
                      onClick={() => setDifficulty(dif.id as any)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        difficulty === dif.id
                          ? 'bg-indigo-600/30 border-indigo-500 text-white'
                          : 'bg-slate-950 border-white/10 text-slate-400'
                      }`}
                    >
                      <p className="text-xs font-bold">{dif.label}</p>
                      <p className="text-[10px] opacity-70">{dif.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Descripción detallada del plan *</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalla el itinerario, paradas para comer, ambiente esperado..."
                  className={`w-full bg-slate-950 border rounded-xl p-3 text-xs text-white focus:outline-none ${
                    errors.description ? 'border-rose-500' : 'border-white/15 focus:border-indigo-400'
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => setActiveStep('horario')}
                className="w-full h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1"
              >
                <span>Continuar a Fechas y Horarios →</span>
              </button>
            </div>
          )}

          {/* TAB 2: FECHA, HORARIOS Y LOGÍSTICA */}
          {activeStep === 'horario' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Fecha del evento</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Hora de quedada (salida)</label>
                  <input
                    type="text"
                    value={timeStart}
                    onChange={(e) => setTimeStart(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Hora fin aproximada</label>
                  <input
                    type="text"
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Logística de transporte</label>
                <input
                  type="text"
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                  placeholder="Ej: Coches compartidos / Cercanías C-9 / Metro"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('basico')}
                  className="h-9 px-4 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('logistica')}
                  className="flex-1 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Siguiente: Punto de Encuentro →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PUNTO DE ENCUENTRO EXACTO */}
          {activeStep === 'logistica' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Lugar o Nombre del punto *</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Ej: Cafetería La Glorieta, Puerto de Navacerrada"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Instrucciones de encuentro (cómo reconocerte)</label>
                <textarea
                  rows={2}
                  value={meetingInstructions}
                  onChange={(e) => setMeetingInstructions(e.target.value)}
                  placeholder="Ej: En la terraza exterior 10 min antes, llevo polo azul ADYP"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('horario')}
                  className="h-9 px-4 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('aforo')}
                  className="flex-1 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Siguiente: Aforo y Coste →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: AFORO Y ASPECTOS ECONÓMICOS */}
          {activeStep === 'aforo' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {/* Stepper de Aforo Máximo */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Aforo máximo de plazas</p>
                  <p className="text-[11px] text-slate-400">Límite de asistentes por seguridad</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMaxAttendees(prev => Math.max(4, prev - 2))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-black text-amber-400">{maxAttendees}</span>
                  <button
                    type="button"
                    onClick={() => setMaxAttendees(prev => Math.min(50, prev + 2))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Modalidad de precio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Modalidad de coste / aporte</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'gratis', label: 'Gratis', desc: 'Sin coste' },
                    { id: 'consumicion', label: 'Consumición', desc: 'Pago en el local' },
                    { id: 'bizum', label: 'Aporte / Bizum', desc: 'Reserva previa' },
                    { id: 'fianza', label: 'Fianza', desc: 'Retornable' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriceType(p.id as any)}
                      className={`p-2 rounded-xl text-left border ${
                        priceType === p.id
                          ? 'bg-rose-500/20 border-rose-500 text-white'
                          : 'bg-slate-950 border-white/10 text-slate-400'
                      }`}
                    >
                      <p className="text-xs font-bold">{p.label}</p>
                      <p className="text-[10px] opacity-70">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {priceType !== 'gratis' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Importe exacto (€)</label>
                  <input
                    type="text"
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(e.target.value)}
                    placeholder="Ej: 15 € / persona"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('logistica')}
                  className="h-9 px-4 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('requisitos')}
                  className="flex-1 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Siguiente: Requisitos y Publicar →
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: REQUISITOS, MATERIAL Y CONFIRMACIÓN */}
          {activeStep === 'requisitos' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Qué deben traer los asistentes</label>
                <input
                  type="text"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Separados por coma"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Plazo mínimo de cancelación sin penalización</label>
                <input
                  type="text"
                  value={cancellationNoticeHours}
                  onChange={(e) => setCancellationNoticeHours(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              {/* Aceptación de normas ADYP */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-rose-500 cursor-pointer shrink-0"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-300 cursor-pointer">
                  Confirmo que esta quedada cumple las normas de respeto, puntualidad y convivencia sana de la comunidad ADYP.
                </label>
              </div>
              {errors.acceptTerms && <p className="text-[11px] text-rose-400">{errors.acceptTerms}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep('aforo')}
                  className="h-9 px-4 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  ← Atrás
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 flex items-center justify-center gap-1.5"
                >
                  <IconSparkles className="w-3.5 h-3.5" />
                  <span>Publicar Quedada Completa</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
