import React, { useState, useEffect } from 'react';
import { 
  Meetup, 
  Member, 
  ModerationItem, 
  AuditLog, 
  UserRole, 
  DesignConceptId, 
  DeviceMode,
  Category 
} from './types';
import { 
  INITIAL_MEETUPS, 
  INITIAL_MEMBERS, 
  INITIAL_MODERATION, 
  INITIAL_AUDIT_LOGS 
} from './mockData';
import { DESIGN_CONCEPTS } from './designTokens';

// Components
import { TopControls } from './components/TopControls';
import { AppHeader } from './components/AppHeader';
import { BottomNav } from './components/BottomNav';
import { MeetupCard } from './components/MeetupCard';
import { MeetupDetail } from './components/MeetupDetail';
import { InteractiveMap } from './components/InteractiveMap';
import { AgendaView } from './components/AgendaView';
import { MyMeetupsView } from './components/MyMeetupsView';
import { CommunityView } from './components/CommunityView';
import { ProfileView } from './components/ProfileView';
import { AdminViews } from './components/AdminViews';
import { ModerationView } from './components/ModerationView';
import { AuthViews } from './components/AuthViews';
import { CreateMeetupModal } from './components/CreateMeetupModal';
import { AuditView } from './components/AuditView';
import { PromptView } from './components/PromptView';
import { Toast } from './components/Toast';
import { 
  IconCompass, 
  IconSearch, 
  IconFilter, 
  IconSparkles, 
  IconMapPin, 
  IconAlertCircle,
  IconRefreshCw,
  IconPlus,
  IconShield
} from './components/Icons';

export default function App() {
  // Navigation Route State
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedMeetupId, setSelectedMeetupId] = useState<string | null>(null);

  // Active Design Concept & Role State
  const [activeConcept, setActiveConcept] = useState<DesignConceptId>('concept1');
  const [userRole, setUserRole] = useState<UserRole>('socio');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile');

  // Application Data State (Mock in-memory with local persistence)
  const [meetups, setMeetups] = useState<Meetup[]>(INITIAL_MEETUPS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [moderationList, setModerationList] = useState<ModerationItem[]>(INITIAL_MODERATION);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  // User attending meetup IDs
  const [attendingIds, setAttendingIds] = useState<string[]>(['m-1', 'm-4']);

  // Modals & UI Controls
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTabletSidebarOpen, setIsTabletSidebarOpen] = useState(false);

  // Search & Filter State on Home
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');

  // QA / Simulated UI States
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const handleNavigate = (route: string) => {
    setSelectedMeetupId(null);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMeetupDetail = (id: string) => {
    setSelectedMeetupId(id);
    setCurrentRoute(`/quedada/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Attend/Leave Meetup
  const handleToggleAttend = (meetupId: string) => {
    const isAttending = attendingIds.includes(meetupId);
    if (isAttending) {
      setAttendingIds(prev => prev.filter(id => id !== meetupId));
      setMeetups(prev => prev.map(m => {
        if (m.id === meetupId) {
          return {
            ...m,
            currentAttendees: Math.max(0, m.currentAttendees - 1),
            attendeesList: m.attendeesList.filter(a => a.name !== 'Laura Gómez')
          };
        }
        return m;
      }));
      showToast('Te has desapuntado de la quedada');
    } else {
      setAttendingIds(prev => [...prev, meetupId]);
      setMeetups(prev => prev.map(m => {
        if (m.id === meetupId) {
          return {
            ...m,
            currentAttendees: m.currentAttendees + 1,
            attendeesList: [
              ...m.attendeesList,
              {
                id: 'usr-2',
                name: 'Laura Gómez',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                role: 'socio'
              }
            ]
          };
        }
        return m;
      }));
      showToast('¡Plaza confirmada! Te has apuntado a la quedada');
    }
  };

  // Create new meetup handler
  const handleCreateMeetup = (data: Partial<Meetup>) => {
    const newId = `m-${Date.now()}`;
    const newMeetup: Meetup = {
      id: newId,
      title: data.title || 'Nueva Quedada',
      category: data.category || 'senderismo',
      description: data.description || '',
      date: data.date || 'Próximo Sábado',
      time: data.time || '11:00',
      location: data.location || 'Madrid Centro',
      city: data.city || 'Madrid',
      coordinates: { x: 50, y: 50 },
      price: data.price || 'Gratis',
      maxAttendees: data.maxAttendees || 15,
      currentAttendees: 1,
      image: data.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      organizer: {
        id: 'usr-2',
        name: 'Laura Gómez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        badge: 'Socio Organizador'
      },
      status: 'publicada',
      requirements: data.requirements || [],
      attendeesList: [
        {
          id: 'usr-2',
          name: 'Laura Gómez',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          role: 'organizador'
        }
      ]
    };

    setMeetups(prev => [newMeetup, ...prev]);
    setAttendingIds(prev => [...prev, newId]);
  };

  // Moderation handlers
  const handleApproveModeration = (id: string) => {
    setModerationList(prev => prev.map(item => item.id === id ? { ...item, status: 'aprobado' } : item));
  };

  const handleRejectModeration = (id: string) => {
    setModerationList(prev => prev.map(item => item.id === id ? { ...item, status: 'rechazado' } : item));
  };

  const handleUpdateMemberRole = (memberId: string, newRole: UserRole) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  // Active theme tokens
  const currentTokens = DESIGN_CONCEPTS[activeConcept];

  // Filtered meetups on home screen
  const displayedMeetups = simulateEmpty 
    ? [] 
    : meetups.filter(m => {
        const matchesCategory = selectedCategory === 'todos' ? true : m.category === selectedCategory;
        const matchesSearch = searchQuery.trim() === '' ? true : (
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesCategory && matchesSearch;
      });

  const selectedMeetup = meetups.find(m => m.id === selectedMeetupId) || meetups[0];

  // Render view router based on currentRoute
  const renderCurrentView = () => {
    if (simulateError) {
      return (
        <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <IconAlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white">Error de conexión simulado</h2>
          <p className="text-xs text-slate-400">
            No se han podido cargar las quedadas del servidor. Pulsa reintentar para restablecer la conexión local.
          </p>
          <button
            onClick={() => setSimulateError(false)}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold"
          >
            Reintentar Carga
          </button>
        </div>
      );
    }

    if (simulateLoading) {
      return (
        <div className="p-4 space-y-4 max-w-4xl mx-auto">
          <div className="h-44 w-full rounded-2xl bg-slate-800 animate-pulse" />
          <div className="h-6 w-3/4 rounded-md bg-slate-800 animate-pulse" />
          <div className="h-4 w-1/2 rounded-md bg-slate-800 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="h-48 rounded-2xl bg-slate-800 animate-pulse" />
            <div className="h-48 rounded-2xl bg-slate-800 animate-pulse" />
          </div>
        </div>
      );
    }

    if (currentRoute === '/auditoria-ux') {
      return (
        <AuditView
          activeConcept={activeConcept}
          onSelectConcept={setActiveConcept}
          onShowToast={showToast}
        />
      );
    }

    if (currentRoute === '/prompt') {
      return <PromptView onShowToast={showToast} />;
    }

    if (currentRoute === '/mapa') {
      return (
        <div className="h-[calc(100vh-120px)] flex flex-col">
          <InteractiveMap
            meetups={meetups}
            activeConcept={activeConcept}
            onSelectMeetup={handleOpenMeetupDetail}
          />
        </div>
      );
    }

    if (currentRoute === '/agenda') {
      return (
        <AgendaView
          meetups={meetups}
          conceptId={activeConcept}
          attendingIds={attendingIds}
          onOpenDetail={handleOpenMeetupDetail}
          onToggleAttend={handleToggleAttend}
        />
      );
    }

    if (currentRoute === '/mis') {
      return (
        <MyMeetupsView
          meetups={meetups}
          conceptId={activeConcept}
          deviceMode={deviceMode}
          attendingIds={attendingIds}
          onOpenDetail={handleOpenMeetupDetail}
          onToggleAttend={(e, id) => {
            e.stopPropagation();
            handleToggleAttend(id);
          }}
          onOpenCreate={() => setIsCreateModalOpen(true)}
        />
      );
    }

    if (currentRoute === '/comunidad') {
      return <CommunityView members={members} deviceMode={deviceMode} onShowToast={showToast} />;
    }

    if (currentRoute === '/perfil') {
      return (
        <ProfileView
          userRole={userRole}
          onSelectRole={setUserRole}
          onShowToast={showToast}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentRoute === '/entrada' || currentRoute === '/unirme') {
      return (
        <AuthViews
          mode={currentRoute === '/entrada' ? 'entrada' : 'unirme'}
          onLoginAsRole={(role) => {
            setUserRole(role);
            handleNavigate('/');
          }}
          onShowToast={showToast}
          onSwitchMode={(m) => handleNavigate(m === 'entrada' ? '/entrada' : '/unirme')}
        />
      );
    }

    if (currentRoute === '/moderacion') {
      return (
        <ModerationView
          items={moderationList}
          onApprove={handleApproveModeration}
          onReject={handleRejectModeration}
          onShowToast={showToast}
        />
      );
    }

    if (currentRoute.startsWith('/admin')) {
      const sub = currentRoute.split('/')[2] || 'resumen';
      return (
        <AdminViews
          subRoute={sub}
          members={members}
          meetups={meetups}
          moderationList={moderationList}
          auditLogs={auditLogs}
          onApproveModeration={handleApproveModeration}
          onRejectModeration={handleRejectModeration}
          onUpdateMemberRole={handleUpdateMemberRole}
          onShowToast={showToast}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentRoute.startsWith('/quedada/') && selectedMeetupId) {
      return (
        <MeetupDetail
          meetup={selectedMeetup}
          conceptId={activeConcept}
          userRole={userRole}
          isAttending={attendingIds.includes(selectedMeetup.id)}
          onToggleAttend={handleToggleAttend}
          onBack={() => handleNavigate('/')}
          onShowToast={showToast}
        />
      );
    }

    // Default: Home Explorer View ('/')
    return (
      <div className="p-4 md:p-6 space-y-5 pb-24 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Welcome Header & Search */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                Comunidad ADYP
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-white leading-tight">
                A Disfrutar y Punto
              </h1>
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="h-7 px-2 sm:px-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-[10px] sm:text-[11px] font-bold shadow-md shadow-rose-950/40 flex items-center gap-1 active:scale-95 transition-all shrink-0"
            >
              <IconPlus className="w-3 h-3" />
              <span className="hidden sm:inline">Proponer Quedada</span>
              <span className="sm:hidden">Proponer</span>
            </button>
          </div>

          {/* Search Bar with live filter - Compact iOS Glass Style */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plan, montaña, cata..."
              className="w-full h-8 sm:h-9 bg-slate-900/60 backdrop-blur-md border border-white/12 rounded-xl py-1 pl-8 pr-3 text-[11px] sm:text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 shadow-inner"
            />
            <IconSearch className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category Chips - Compact iOS Segmented control (Anti-Pill Bloat) */}
          <div 
            className="flex gap-1 overflow-x-auto no-scrollbar py-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {(['todos', 'senderismo', 'gastronomia', 'cultura', 'nocturno', 'escapadas', 'deportes'] as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`h-6 px-2.5 rounded-lg text-[10px] font-semibold capitalize whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow-sm font-bold'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Meetups Highlight banner */}
        {!searchQuery && selectedCategory === 'todos' && (
          <div 
            onClick={() => handleOpenMeetupDetail('m-1')}
            className="relative rounded-3xl overflow-hidden border border-white/15 cursor-pointer group shadow-2xl"
          >
            <div className="h-48 md:h-64 w-full bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Peñalara"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow">
                ★ Quedada Destacada de la Semana
              </span>
              <h2 className="text-base md:text-xl font-black text-white leading-tight drop-shadow">
                Ruta Circular Laguna de Peñalara & Puesta de Sol
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <span>Sábado, 24 Oct · 09:30 h</span>
                <span>·</span>
                <span className="text-emerald-400 font-bold">15/18 plazas</span>
                <span>·</span>
                <span className="text-white font-bold">Gratis</span>
              </div>
            </div>
          </div>
        )}

        {/* Meetup Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Próximas Quedadas ({displayedMeetups.length})</span>
            </h2>
            <button
              onClick={() => handleNavigate('/mapa')}
              className="text-xs text-rose-400 hover:underline flex items-center gap-1"
            >
              <IconMapPin className="w-3.5 h-3.5" />
              <span>Ver en mapa</span>
            </button>
          </div>

          {displayedMeetups.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-white/5 space-y-2">
              <p className="text-sm font-bold text-white">No se han encontrado quedadas</p>
              <p className="text-xs text-slate-400">
                Prueba con otro término de búsqueda o selecciona otra categoría.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                  setSimulateEmpty(false);
                }}
                className="mt-2 px-3.5 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-semibold"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className={`grid gap-3.5 items-stretch ${
              deviceMode === 'mobile' 
                ? 'grid-cols-1' 
                : deviceMode === 'tablet' 
                ? 'grid-cols-2' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayedMeetups.map(meetup => (
                <MeetupCard
                  key={meetup.id}
                  meetup={meetup}
                  conceptId={activeConcept}
                  isAttending={attendingIds.includes(meetup.id)}
                  onToggleAttend={(e, id) => {
                    e.stopPropagation();
                    handleToggleAttend(id);
                  }}
                  onOpenDetail={handleOpenMeetupDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${currentTokens.classes.bgApp} transition-colors duration-300 font-sans`}>
      {/* Top Controls: Switcher A/B/C, Roles, Devices, QA States, Audit & Prompt Links */}
      <TopControls
        activeConcept={activeConcept}
        onSelectConcept={setActiveConcept}
        userRole={userRole}
        onSelectRole={setUserRole}
        deviceMode={deviceMode}
        onSelectDevice={setDeviceMode}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        simulateLoading={simulateLoading}
        onToggleLoading={() => setSimulateLoading(prev => !prev)}
        simulateEmpty={simulateEmpty}
        onToggleEmpty={() => setSimulateEmpty(prev => !prev)}
        simulateError={simulateError}
        onToggleError={() => setSimulateError(prev => !prev)}
      />

      {/* Main Wrapper with Device Frame Simulation */}
      <main className="w-full flex justify-center p-0 md:py-6">
        {deviceMode === 'mobile' ? (
          // iPhone 16 Pro Mockup Frame (Barras Fijas Permanentes y Viewport Nativo)
          <div className="w-full max-w-[430px] h-[calc(100vh-60px)] md:h-[840px] bg-slate-950 rounded-[36px] md:rounded-[44px] border-[8px] md:border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col ring-1 ring-white/10">
            {/* Dynamic Island Header */}
            <div className="sticky top-0 left-0 right-0 z-40 bg-slate-950 pt-3 pb-2 px-6 flex justify-between items-center text-white text-xs select-none">
              <span className="font-bold text-[11px] tracking-tight">09:41</span>
              {/* Dynamic Island pill */}
              <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-slate-300 font-mono">ADYP Live</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Native Mobile Header with Campanita de Notificaciones & Menú de Usuario */}
            <AppHeader
              userRole={userRole}
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {renderCurrentView()}
            </div>

            {/* Bottom Safe Area & Natural Integrated Bottom Bar */}
            <BottomNav
              currentRoute={currentRoute}
              userRole={userRole}
              conceptId={activeConcept}
              onNavigate={handleNavigate}
              onOpenCreate={() => setIsCreateModalOpen(true)}
            />
            {/* iOS Home Bar Indicator */}
            <div className="w-28 h-1 bg-white/30 rounded-full mx-auto my-1 pointer-events-none" />
          </div>
        ) : deviceMode === 'tablet' ? (
          // iPad Pro Split-View Frame con Menú Lateral Dinámico y Barras Fijas
          <div className="w-full max-w-[1020px] h-[780px] bg-slate-950 rounded-[32px] border-[12px] border-slate-800 shadow-2xl overflow-hidden relative flex flex-col md:flex-row ring-1 ring-white/10">
            {/* Dynamic Left Sidebar Nav for Tablet (Auto-collapsible / Hidden by default or toggleable) */}
            <aside 
              className={`bg-slate-900/95 border-r border-white/10 flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out z-20 ${
                isTabletSidebarOpen 
                  ? 'w-64 p-4 opacity-100' 
                  : 'w-0 p-0 opacity-0 overflow-hidden pointer-events-none border-r-0'
              }`}
            >
              <div className="space-y-4 min-w-[224px]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-sm">
                      AD
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">ADYP Tablet</h2>
                      <p className="text-[10px] text-slate-400">Menú Lateral Dinámico</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsTabletSidebarOpen(false)}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                    title="Ocultar menú"
                  >
                    ✕
                  </button>
                </div>

                <nav className="space-y-1">
                  {[
                    { route: '/', label: 'Explorar Quedadas' },
                    { route: '/agenda', label: 'Agenda Cronológica' },
                    { route: '/mapa', label: 'Mapa Interactivo' },
                    { route: '/mis', label: 'Mis Quedadas' },
                    { route: '/comunidad', label: 'Comunidad & Socios' },
                    { route: '/perfil', label: 'Mi Perfil' },
                    { route: '/auditoria-ux', label: 'Auditoría UX/UI' },
                    { route: '/prompt', label: 'Prompt Completo' }
                  ].map(item => (
                    <button
                      key={item.route}
                      onClick={() => handleNavigate(item.route)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        currentRoute === item.route 
                          ? 'bg-rose-500 text-white font-bold shadow-md' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 min-w-[224px]">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full py-2 px-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  + Proponer Quedada
                </button>
                <div className="text-[10px] text-slate-400 text-center">
                  Rol: <span className="text-emerald-400 font-bold uppercase">{userRole}</span>
                </div>
              </div>
            </aside>

            {/* Tablet Right Pane con Header y BottomNav FIJOS en pantalla */}
            <div className="flex-1 flex flex-col overflow-hidden h-full bg-slate-950 relative">
              {/* Dynamic Tablet Bar with Sidebar Toggle */}
              <div className="px-3 py-1.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs shrink-0 z-30">
                <button
                  onClick={() => setIsTabletSidebarOpen(prev => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[11px] font-medium active:scale-95 transition-all"
                >
                  <span>{isTabletSidebarOpen ? '⇤ Ocultar Menú' : '⇥ Menú Tablet'}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">Disf. Dinámico</span>
                </button>
                <span className="text-[10px] text-slate-400">
                  Pantalla Tablet · Barra Superior e Inferior fijadas
                </span>
              </div>

              {/* Native Header Fijo */}
              <div className="shrink-0 z-20">
                <AppHeader
                  userRole={userRole}
                  currentRoute={currentRoute}
                  onNavigate={handleNavigate}
                  onShowToast={showToast}
                />
              </div>

              {/* Contenido Central con Scroll Independiente */}
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {renderCurrentView()}
              </div>

              {/* Bottom Nav Fijo Inamovible */}
              <div className="shrink-0 z-20">
                <BottomNav
                  currentRoute={currentRoute}
                  userRole={userRole}
                  conceptId={activeConcept}
                  onNavigate={handleNavigate}
                  onOpenCreate={() => setIsCreateModalOpen(true)}
                />
              </div>
            </div>
          </div>
        ) : (
          // Fullscreen Responsive Web (Header y Barra Inferior FIJOS en pantalla sin scroll)
          <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-16px)] sm:h-[calc(100vh-28px)] bg-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
            {/* Header Fijo */}
            <div className="shrink-0 z-30">
              <AppHeader
                userRole={userRole}
                currentRoute={currentRoute}
                onNavigate={handleNavigate}
                onShowToast={showToast}
              />
            </div>

            {/* Contenido con scroll independiente */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {renderCurrentView()}
            </div>

            {/* Barra Inferior Fija Inamovible */}
            <div className="shrink-0 z-30">
              <BottomNav
                currentRoute={currentRoute}
                userRole={userRole}
                conceptId={activeConcept}
                onNavigate={handleNavigate}
                onOpenCreate={() => setIsCreateModalOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Create Meetup Modal */}
      <CreateMeetupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateMeetup}
        onShowToast={showToast}
      />

      {/* Global Toast Alert */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
