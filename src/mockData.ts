import { Meetup, Member, ModerationItem, AuditLog } from './types';

export const INITIAL_MEETUPS: Meetup[] = [
  {
    id: 'm-1',
    title: 'Ruta Circular Laguna de Peñalara & Puesta de Sol',
    category: 'senderismo',
    description: 'Recorrido de nivel medio por el Parque Nacional de Guadarrama. Disfrutaremos de vistas panorámicas, aire puro y culminaremos viendo el atardecer con un picoteo compartido en el mirador.',
    date: 'Sábado, 24 Octubre',
    time: '09:30',
    location: 'Puerto de Cotos, Rascafría',
    city: 'Madrid',
    coordinates: { x: 42, y: 32 },
    price: 'Gratis',
    maxAttendees: 18,
    currentAttendees: 15,
    featured: true,
    distanceKm: 45,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    organizer: {
      id: 'usr-1',
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Líder Senderismo',
      phone: '+34 612 345 678'
    },
    status: 'publicada',
    requirements: ['Botas de montaña', '1.5L de agua', 'Cortavientos'],
    meetingPointDetails: 'Frente a la taquilla de la estación de tren de Cotos a las 09:15 h.',
    attendeesList: [
      { id: 'usr-1', name: 'Carlos Mendoza', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'organizador' },
      { id: 'usr-2', name: 'Laura Gómez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', role: 'socio' },
      { id: 'usr-3', name: 'Javier Roca', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', role: 'socio' },
      { id: 'usr-4', name: 'Elena Santos', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', role: 'socio' }
    ]
  },
  {
    id: 'm-2',
    title: 'Cata de Vinos & Tapas Castizas en Barrio de La Latina',
    category: 'gastronomia',
    description: 'Ruta enológica privada con sommelier en dos bodegas históricas de la Cava Baja. Degustación de 4 vinos DO Madrid y Ribera del Duero maridados con quesos curados y tostas artesanales.',
    date: 'Viernes, 23 Octubre',
    time: '20:00',
    location: 'Cava Baja 14, La Latina',
    city: 'Madrid',
    coordinates: { x: 50, y: 52 },
    price: '24 €',
    maxAttendees: 14,
    currentAttendees: 14, // Completa para testear badge lleno
    featured: true,
    distanceKm: 2.1,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    organizer: {
      id: 'usr-2',
      name: 'Laura Gómez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      badge: 'Sommelier & Host'
    },
    status: 'publicada',
    meetingPointDetails: 'Puerta de Taberna Los Huevos de Lucio.',
    attendeesList: [
      { id: 'usr-2', name: 'Laura Gómez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', role: 'organizador' },
      { id: 'usr-5', name: 'Pablo Morales', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', role: 'socio' }
    ]
  },
  {
    id: 'm-3',
    title: 'Visita Nocturna Guiada: Leyendas y Misterios de Madrid',
    category: 'cultura',
    description: 'Paseo guiado a la luz de las farolas descubriendo crímenes no resueltos, apariciones y secretos de la Inquisición en el Madrid de los Austrias. Incluye audioguía personal.',
    date: 'Domingo, 25 Octubre',
    time: '19:45',
    location: 'Plaza de Oriente (Frente a Palacio Real)',
    city: 'Madrid',
    coordinates: { x: 47, y: 48 },
    price: '10 €',
    maxAttendees: 20,
    currentAttendees: 9,
    featured: false,
    distanceKm: 1.5,
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80',
    organizer: {
      id: 'usr-3',
      name: 'Javier Roca',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'Historiador Cultural'
    },
    status: 'publicada',
    meetingPointDetails: 'Junto a la estatua ecuestre de Felipe IV en Plaza de Oriente.',
    attendeesList: [
      { id: 'usr-3', name: 'Javier Roca', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', role: 'organizador' }
    ]
  },
  {
    id: 'm-4',
    title: 'Tardeo & Acústico en Azotea con Vistas 360°',
    category: 'nocturno',
    description: 'Encuentro relajado al caer la tarde en una de las terrazas más exclusivas de Gran Vía. Música acústica en directo, coctelería y el mejor ambiente de socios ADYP.',
    date: 'Jueves, 22 Octubre',
    time: '18:30',
    location: 'Gran Vía 56, Azotea',
    city: 'Madrid',
    coordinates: { x: 52, y: 45 },
    price: 'Consumición',
    maxAttendees: 25,
    currentAttendees: 21,
    featured: true,
    distanceKm: 0.8,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80',
    organizer: {
      id: 'usr-4',
      name: 'Elena Santos',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      badge: 'Relaciones Públicas'
    },
    status: 'publicada',
    meetingPointDetails: 'Recepción del edificio planta baja, preguntar por el grupo ADYP.',
    attendeesList: [
      { id: 'usr-4', name: 'Elena Santos', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', role: 'organizador' }
    ]
  },
  {
    id: 'm-5',
    title: 'Fin de Semana Medieval en Pedraza y Sepúlveda',
    category: 'escapadas',
    description: 'Escapada de 2 días en furgonetas compartidas. Alojamiento rural con encanto, visita a las hoces del Río Duratón y cena de lechazo tradicional.',
    date: '31 Oct - 1 Nov',
    time: '08:00',
    location: 'Salida desde Intercambiador de Moncloa',
    city: 'Segovia',
    coordinates: { x: 38, y: 22 },
    price: '85 €',
    maxAttendees: 12,
    currentAttendees: 10,
    featured: false,
    distanceKm: 110,
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80',
    organizer: {
      id: 'usr-1',
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Líder Senderismo'
    },
    status: 'publicada',
    meetingPointDetails: 'Frente a la dársena 15 en Moncloa (Nivel -1).',
    attendeesList: [
      { id: 'usr-1', name: 'Carlos Mendoza', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'organizador' }
    ]
  },
  {
    id: 'm-6',
    title: 'Torneo Relámpago de Pádel & Tercer Tiempo',
    category: 'deportes',
    description: 'Nivel iniciación y medio. Formato americano de partidos cortos rotatorios en 4 pistas cubiertas. Al terminar, cañas y tapeo en la terraza del club.',
    date: 'Domingo, 25 Octubre',
    time: '11:00',
    location: 'Club Padel Madrid Río, Arganzuela',
    city: 'Madrid',
    coordinates: { x: 53, y: 62 },
    price: '12 €',
    maxAttendees: 16,
    currentAttendees: 12,
    featured: false,
    distanceKm: 3.4,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80',
    organizer: {
      id: 'usr-5',
      name: 'Pablo Morales',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'Capitán Deportivo'
    },
    status: 'publicada',
    meetingPointDetails: 'Pista central 1 a las 10:45 h.',
    attendeesList: [
      { id: 'usr-5', name: 'Pablo Morales', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', role: 'organizador' }
    ]
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'usr-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'moderador',
    status: 'activo',
    joinedDate: '12 Ene 2024',
    meetupsAttended: 34,
    meetupsOrganized: 18,
    interests: ['Senderismo', 'Escapadas', 'Fotografía'],
    city: 'Madrid',
    bio: 'Apasionado de la montaña, las rutas poco conocidas y la buena compañía alrededor de una fogata.'
  },
  {
    id: 'usr-2',
    name: 'Laura Gómez',
    email: 'laura.gomez@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    status: 'activo',
    joinedDate: '03 Feb 2023',
    meetupsAttended: 58,
    meetupsOrganized: 29,
    interests: ['Gastronomía', 'Vinos', 'Teatro'],
    city: 'Madrid',
    bio: 'Cofundadora de eventos culinarios en ADYP. Amante del producto local y las tertulias hasta tarde.'
  },
  {
    id: 'usr-3',
    name: 'Javier Roca',
    email: 'javier.roca@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'socio',
    status: 'activo',
    joinedDate: '15 Mar 2024',
    meetupsAttended: 12,
    meetupsOrganized: 4,
    interests: ['Cultura', 'Historia', 'Museos'],
    city: 'Madrid',
    bio: 'Profesor de historia y guía aficionado. Me encanta redescubrir rincones de la ciudad.'
  },
  {
    id: 'usr-4',
    name: 'Elena Santos',
    email: 'elena.santos@email.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    role: 'socio',
    status: 'activo',
    joinedDate: '28 Abr 2024',
    meetupsAttended: 19,
    meetupsOrganized: 7,
    interests: ['Música en vivo', 'Tardeo', 'Viajes'],
    city: 'Madrid',
    bio: 'Siempre con una sonrisa y lista para planificar la siguiente salida con el grupo.'
  },
  {
    id: 'usr-5',
    name: 'Pablo Morales',
    email: 'pablo.morales@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'socio',
    status: 'activo',
    joinedDate: '02 Jun 2024',
    meetupsAttended: 8,
    meetupsOrganized: 2,
    interests: ['Pádel', 'Running', 'Ciclismo'],
    city: 'Madrid',
    bio: 'Aficionado al deporte amateur y fanático del tercer tiempo con aperitivo.'
  },
  {
    id: 'usr-6',
    name: 'Marina Bellver',
    email: 'marina.b@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'invitado',
    status: 'pendiente',
    joinedDate: 'Ayer',
    meetupsAttended: 0,
    meetupsOrganized: 0,
    interests: ['Cine', 'Senderismo'],
    city: 'Alcalá de Henares',
    bio: 'Recién llegada a Madrid, buscando conocer gente con ganas de compartir actividades sanas.'
  }
];

export const INITIAL_MODERATION: ModerationItem[] = [
  {
    id: 'mod-1',
    type: 'quedada',
    title: 'Barbacoa Secreta en Azotea Privada Malasaña',
    author: 'Marcos R.',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    reason: 'Comprobar límite de ruidos y normas de la comunidad',
    date: 'Hace 2 horas',
    status: 'pendiente',
    details: 'Quedada con cobro previo de 15€ por bizum. Requiere confirmación de consentimiento vecinal y política de cancelación.',
    targetId: 'm-draft-9'
  },
  {
    id: 'mod-2',
    type: 'comentario',
    title: 'Comentario con teléfono personal visible en muro público',
    author: 'Usuario_921',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    reason: 'Violación de privacidad RGPD (datos de contacto en abierto)',
    date: 'Hace 5 horas',
    status: 'pendiente',
    details: 'En la quedada de Senderismo Peñalara: "Llamadme al 699xxxxxx si vais en coche desde Plaza Castilla".',
    targetId: 'c-88'
  },
  {
    id: 'mod-3',
    type: 'reporte_usuario',
    title: 'No asistencia reiterada sin aviso (No-Show)',
    author: 'Carlos Mendoza',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    reason: 'Falta de compromiso con plazas limitadas',
    date: 'Ayer',
    status: 'aprobado',
    details: 'Usuario acumuló 3 ausencias seguidas bloqueando plazas a compañeros en lista de espera.',
    targetId: 'usr-99'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '12/10/2026 09:14:22',
    user: 'admin@adyp.org (Laura Gómez)',
    action: 'APROBACION_ALTA_SOCIO',
    details: 'Solicitud aprobada para socio ID #usr-208 con cuota anual confirmada.',
    severity: 'info'
  },
  {
    id: 'log-2',
    timestamp: '12/10/2026 08:45:10',
    user: 'sistema_cron',
    action: 'CIERRE_AUTOMATICO_INSCRIPCIONES',
    details: 'Quedada m-2 (Cata de Vinos) alcanzó aforo completo (14/14 plazas).',
    severity: 'info'
  },
  {
    id: 'log-3',
    timestamp: '11/10/2026 23:18:04',
    user: 'moderador@adyp.org (Carlos Mendoza)',
    action: 'BLOQUEO_TEMPORAL_COMENTARIOS',
    details: 'Se ocultó comentario con información confidencial en quedada #m-1.',
    severity: 'warning'
  },
  {
    id: 'log-4',
    timestamp: '11/10/2026 19:30:15',
    user: 'admin@adyp.org (Laura Gómez)',
    action: 'ACTUALIZACION_AJUSTES_PLATAFORMA',
    details: 'Cambio de aforo máximo permitido por defecto para quedadas libres (25 a 30).',
    severity: 'warning'
  }
];

export const FULL_PROMPT_TEXT = `# PROMPT MAESTRO DEFINITIVO PARA ARENA.AI / SISTEMAS DE IA (MODO AGENTE)
## REDISEÑO INTEGRAL DE ADYP: SISTEMA DE DISEÑO «GLASSMORPHISM iOS», OPTIMIZACIÓN MÓVIL APK / TABLET / WEB Y PARIDAD FUNCIONAL TOTAL

---

### 🎭 ROL Y OBJETIVO DE LA MISIÓN PARA LA IA
Actúa como **Lead Apple iOS Design Architect & Principal Mobile Frontend Engineer** especializado en **Human Interface Guidelines (HIG 2026)**, arquitecturas reactivas táctiles y sistemas de diseño translúcidos basados en **Glassmorphism iOS puro (Frosted Glass Acrylic)** para aplicaciones web y empaquetadas en APK móvil.

Tu misión es transformar el sitio web actual de **ADYP (A Disfrutar y Punto)** en una experiencia nativa ultra-pulida, premium y profesional, asegurando:
1. **Estética Glass iOS pura:** Translucidez esmerilada (\`backdrop-filter: blur(24px) saturate(190%)\`), reflejos especulares de luz superior (\`inset 0 1px 0 rgba(255,255,255,0.18)\`), bordes sutiles de 1px (\`rgba(255,255,255,0.12)\`) y fondos profundos (\`#020617\` / \`#05070f\`).
2. **Cabecera y Barra Inferior Fijas Permanentes (Sin Scroll en Móvil, Tablet y Web):** Tanto la cabecera (\`AppHeader\`) como la barra de navegación (\`BottomNav\`) deben estar **siempre fijadas en pantalla sin desaparecer al hacer scroll**, con botones compactos y sin botón flotante (+) grande.
3. **Eliminación Total del Botón Flotante (+) en Móvil:** La barra inferior debe ser una **Tab Bar nativa estilo iOS de 5 botones proporcionados y limpios** (Explorar, Agenda, Mapa, Mis Planes, Perfil). La acción de «Proponer Quedada» se gestiona en la cabecera o mediante CTA contextual.
4. **Punto de Encuentro con Mini-Mapa y WhatsApp Oficial:** En la ficha de quedada (\`/quedada/:id\`), se **elimina por completo el muro de dudas y comentarios** (los usuarios usan el grupo de WhatsApp privado) y se integra un **mini-mapa visual interactivo** con radar GPS pulsante en la taquilla exacta (ej: *«Frente a la taquilla de la estación de tren de Cotos a las 09:15 h.»*) con coordenadas GPS, waypoint y enlace directo a Google Maps.
5. **Menú Lateral Dinámico en Tablet:** En versión tablet, el menú lateral debe ser dinámico y auto-ocultable/colapsable con un botón de alternancia (*toggle*), maximizando el espacio de lectura sin perder nunca las barras fijas superior e inferior.
6. **Botones compactos y optimizados para APK móvil:** Cero botones gigantescos o descuadrados. Alturas estandarizadas de 30px a 34px (\`h-8\`), padding táctil exacto y microinteracción háptica (\`active:scale-95\`).
7. **Cuadratura y alineación perfecta de quedadas:** Cero descuadres en el grid móvil/tablet. Relación de aspecto fija en fotos, títulos con altura reservada idéntica (\`h-10\`) y filas de acción que nunca se desbordan ni parten línea.
8. **Ventanas flotantes y Bottom Sheets auténticos:** Hojas inferiores táctiles en móvil con tirador visual (*drag handle*) de cristal, modales flotantes elevados en tablet y **supresión total de barras de arrastre grises/blancas del navegador**.
9. **Pestaña Mapa de alta fidelidad:** Motor vectorial cartográfico local de Madrid y Sierra de Guadarrama, controles de zoom compactos, filtros sin scrollbar y ficha flotante despegada al pulsar pines.
10. **Referencia Visual Descargable (\`diseño.html\`):** Existe un archivo maestro autónomo \`diseño.html\` (o \`/diseno.html\`) con la maqueta real de iPhone 15 Pro, los tokens CSS exactos y la botonera interactiva para comprobar en vivo el estándar esperado.

---

### 📌 FUENTES DE ENTRADA Y CONTEXTO
- **Repositorio Código Fuente en GitHub:** https://github.com/mogadrianweb/adyp
- **Web en Producción (Vista pública original):** https://adisfrutarypunto.alwaysdata.net/
- **Copia de referencia HTML:** https://adisfrutarypunto.alwaysdata.net/testdesign/index.html
- **Autonomía de Ejecución:** El código generado debe ser 100% autónomo y funcionar sin depender de bases de datos externas ni de APIs PHP que pudieran estar inactivas, utilizando un estado en memoria (*mock data*) enriquecido en JavaScript/TypeScript.

---

### 🔗 RECURSOS OFICIALES, ENLACES DE DESCARGA Y CÓDIGOS DE DISEÑO UX

#### 1. Iconografía Vectorial SVG (Limpia, sin fuentes externas)
- **Lucide Icons (Librería recomendada):**
  - Web & Catálogo: https://lucide.dev/
  - Repositorio GitHub: https://github.com/lucide-icons/lucide
  - Paquete NPM: \`npm install lucide-react\` o usar SVGs inline con:
    \`\`\`html
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">...</svg>
    \`\`\`
- **Heroicons (Alternativa oficial Tailwind):**
  - Web: https://heroicons.com/
- **Apple SF Symbols (Guía ergonómica):**
  - https://developer.apple.com/sf-symbols/

#### 2. Tipografía del Sistema y Escala
- **Plus Jakarta Sans / Inter (Google Fonts):**
  - Enlace: https://fonts.google.com/specimen/Plus+Jakarta+Sans
  - Inclusión HTML:
    \`\`\`html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    \`\`\`
  - Fallback nativo Apple/Android:
    \`font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, sans-serif;\`

#### 3. Sistemas de Componentes de Referencia
- **shadcn/ui & Radix UI (Arquitectura de modales, sheets y dropdowns):**
  - https://ui.shadcn.com/
  - https://www.radix-ui.com/
- **Apple Human Interface Guidelines (Materiales y Translúcidos iOS):**
  - https://developer.apple.com/design/human-interface-guidelines/

---

### 💎 DESIGN TOKENS EXACTOS DEL CONCEPTO «GLASS iOS»

Implementa exactamente la siguiente configuración de tokens en tu CSS o Tailwind:

\`\`\`css
:root {
  /* Fondo Base Oscuro y Profundo */
  --bg-app: #020617;                   /* Slate-950 puro */
  --bg-glass-base: rgba(15, 23, 42, 0.75); /* Slate-900 esmerilado */
  --bg-glass-card: rgba(30, 41, 59, 0.65); /* Slate-800 con translucidez */
  --bg-glass-elevated: rgba(15, 23, 42, 0.90);
  
  /* Filtros Ópticos Glassmorphism */
  --glass-blur: blur(20px) saturate(180%);
  --glass-blur-heavy: blur(28px) saturate(190%);
  --glass-border: 1px solid rgba(255, 255, 255, 0.12);
  --glass-border-subtle: 1px solid rgba(255, 255, 255, 0.06);
  --glass-highlight: inset 0 1px 0 0 rgba(255, 255, 255, 0.14);
  
  /* Sombras Profundas */
  --glass-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.60);
  --glass-shadow-sm: 0 4px 16px -2px rgba(0, 0, 0, 0.35);
  
  /* Acentos de Marca ADYP */
  --accent-primary: #6366f1;           /* Índigo iOS */
  --accent-rose: #f43f5e;              /* Rosa Coral ADYP */
  --accent-amber: #f59e0b;             /* Ámbar / Destacados */
  --accent-emerald: #10b981;           /* Verde confirmado */
  
  /* Radios de Curvatura iOS */
  --radius-card: 18px;
  --radius-btn-compact: 10px;
  --radius-sheet: 28px;
}
\`\`\`

---

### 📱 REGLA UX 1: BOTONES COMPACTOS OPTIMIZADOS PARA MÓVIL APK Y TABLET

> **PROHIBIDO:** Botones inflados, gigantescos o de más de 42px de alto que coman espacio en pantalla. Deben ser compactos, elegantes y con acabado nativo de APK/iOS.

1. **Dimensiones Específicas:**
   - **Botón Primario de Acción (Ej: «¡Me apunto!», «Publicar»):** Altura fija entre **32px y 36px** (\`h-8\` o \`h-9\`), padding horizontal de 10px a 14px (\`px-2.5\` a \`px-3.5\`).
   - **Botón Secundario (Ej: «Ficha», «Detalles», «Atrás»):** Altura de **28px a 32px** (\`h-7\` a \`h-8\`), padding de 10px.
   - **Chips de Categoría / Segmentos:** Altura de **28px** (\`h-7\`), padding de 10px (\`px-2.5\`), texto en \`text-[11px] font-bold\`. Cero píldoras gordas de 40px.
   - **Tipografía de Botones:** \`text-[11px]\` a \`text-xs\`, \`font-weight: 700\`, \`white-space: nowrap\` (para evitar rotura de palabras).
   - **Curvatura:** \`border-radius: 10px\` a \`12px\` (\`rounded-lg\` o \`rounded-xl\`).

2. **Microinteracciones Hápticas:**
   - Efecto tap: \`active:scale-[0.96]\`.
   - Transición ultra-rápida: \`transition: all 0.12s cubic-bezier(0.16, 1, 0.3, 1)\`.

---

### 📐 REGLA UX 2: CUADRATURA Y ALINEACIÓN ESTRICTA DE TARJETAS (CERO DESCUADRES)

> **PROBLEMA DETECTADO Y RESUELTO:** En pantallas móviles, las tarjetas no pueden tener alturas desiguales ni salirse de los márgenes.

1. **Estructura Interna de la Tarjeta:**
   - Contenedor con \`flex flex-col justify-between h-full\` para que todas las tarjetas de una misma fila midan exactamente lo mismo.
   - **Cabecera Fotográfica:** Proporción de aspecto fija \`aspect-[16/10]\` con altura de 160px (\`h-40\`), \`object-cover\` y gradiente oscuro inferior para asegurar contraste del texto.
   - **Badges sobre la foto:** Compactos (\`px-2 py-0.5 rounded-md text-[10px] font-bold\`), flotando a 10px de las esquinas.
   - **Bloque de Título:** Contenedor con altura reservada fija (\`h-10\`), \`line-clamp-2\`, \`text-xs sm:text-sm font-bold\` para que títulos de 1 línea y de 2 líneas ocupen exactamente el mismo espacio vertical.
   - **Barra de Progreso y Aforo:** Altura de 4px (\`h-1\`), con textos compactos (\`text-[11px]\`).
   - **Fila de Botones:** \`flex items-center gap-2 pt-0.5\`, con botón primario que muestra \`Apuntado ✓\` (en vez de frases largas que quiebren la caja) y botón secundario \`Ficha\`.
2. **Distribución en el Grid:**
   - Móvil: 1 columna estricta (\`grid-cols-1\`) con márgenes laterales limpios.
   - Tablet: 2 columnas simétricas con alineación forzada (\`grid-cols-2 items-stretch gap-3.5\`).
   - Escritorio: 3 columnas simétricas (\`lg:grid-cols-3 items-stretch gap-4\`).

---

### 🚫 REGLA UX 3: SUPRESIÓN TOTAL DE BARRAS DE ARRASTRE FEAS (ZERO UNSTYLED SCROLLBARS)

> **REQUERIMIENTO ESTRICTO:** En ningún dispositivo o navegador (Chrome, Safari, Firefox, WebView Android/iOS) debe mostrarse la barra de scroll gris o blanca del sistema operativo.

Código CSS indispensable a incluir en la hoja de estilos global:
\`\`\`css
/* Eliminación universal de barras de desplazamiento nativas */
* {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

*::-webkit-scrollbar,
::-webkit-scrollbar,
.no-scrollbar::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
  -webkit-appearance: none !important;
}

.no-scrollbar {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
\`\`\`

---

### 🪟 VENTANAS FLOTANTES GLASS iOS (BOTTOM SHEETS & MODALES ELEVADOS)

1. **En Móvil (< 640px):**
   - Emerge desde abajo como una **hoja inferior flotante (*Bottom Sheet*)**.
   - **Tirador Táctil Superior (*Drag Handle*):**
     \`<div class="pt-2.5 pb-1 flex justify-center items-center"><div class="w-12 h-1 bg-white/30 rounded-full"></div></div>\`
   - Bordes superiores redondeados: \`rounded-t-[28px]\`.
   - Altura máxima: \`max-h-[90vh]\` con scroll táctil interno sin barras visibles.
2. **En Tablet y Escritorio (>= 640px):**
   - Diálogo modal flotante centrado, elevado con sombra profunda (\`shadow-2xl\`), bordes \`rounded-2xl\` y desenfoque exterior \`backdrop-blur-md\`.

---

### 🗺️ PESTAÑA MAPA CON ACABADO ULTRA-PREMIUM

1. **Cartografía Vectorial SVG Local (Sin APIs externas de pago):**
   - Representación estilizada en modo oscuro de Madrid Centro, anillo M-30, M-40, río Manzanares y orografía de la Sierra de Guadarrama.
   - Pines de actividad interactivos con halo pulsante (\`animate-ping\` al seleccionarse) y etiqueta con el precio o aforo.
2. **Barra Superior de Filtros Flotante:**
   - Chips compactos de 28px de altura con fondo esmerilado translúcido y scroll horizontal fluido sin barra visible.
3. **Controles Flotantes Compactos:**
   - Cubos táctiles de 28x28px (\`w-7 h-7 rounded-lg\`) para recentrar mapa (📍), Zoom (+) y Zoom (-).
4. **Ficha de Detalle Flotante Inferior:**
   - Al tocar un pin, se despliega una tarjeta de cristal esmerilado despegada de la parte inferior, con tirador táctil, miniatura 16:9, aforo en tiempo real y botón compacto «Ficha».

---

### 📝 FORMULARIO COMPLETO Y REALISTA DE «PROPONER QUEDADA»

> El formulario debe ser completo, estructurado en un asistente (*wizard*) de 5 pasos con datos 100% reales de la comunidad:

- **Paso 1: Plan y Estilo:**
  - Título oficial (mín. 6 caracteres).
  - Categoría (Senderismo, Gastronomía, Cultura, Tardeo, Escapadas, Deportes).
  - Selector de foto de portada con 4 presets fotográficos de alta calidad (Montaña, Gastronomía, Cultura, Tardeo) o URL personalizada.
  - Exigencia física (Baja / Paseo, Media / Ritmo estándar, Alta / Exigente).
  - Descripción detallada (itinerario, ambiente).
- **Paso 2: Fecha y Horarios:**
  - Fecha formateada, hora de inicio y hora aproximada de fin.
  - Logística de desplazamiento (Coches compartidos, Metro/Cercanías, Transporte libre).
- **Paso 3: Punto de Encuentro:**
  - Nombre del punto de reunión y dirección exacta.
  - Instrucciones visuales para reconocer al organizador y al grupo (ej: «Llevo polo azul ADYP»).
- **Paso 4: Plazas y Aspectos Económicos:**
  - Aforo máximo con Stepper numérico táctil compacto (+ / -).
  - Modalidad de coste (Gratis, Consumición libre en local, Aporte previo Bizum, Fianza retornable).
  - Importe exacto en € y desglose de lo que incluye.
- **Paso 5: Normas y Requisitos:**
  - Equipamiento y material obligatorio que debe traer cada socio.
  - Plazo mínimo de aviso para cancelar sin penalización.
  - Enlace temporal al grupo de WhatsApp/Telegram para la coordinación del día.
  - Checkbox obligatorio de aceptación de las Normas de Convivencia y Respeto de ADYP.

---

### 🔔 CABECERA NATIVA Y BARRA INFERIOR FIJAS PERMANENTES (MÓVIL, TABLET Y WEB)

1. **Cabecera Nativa Superior (\`AppHeader\`):**
   - **Fijación Permanente:** Anclada en la parte superior (\`sticky top-0 z-30\` o \`shrink-0\`), nunca se oculta al hacer scroll en móvil, tablet ni web.
   - Logotipo y acrónimo ADYP con gradiente distintivo.
   - **Campanita de Notificaciones (🔔):**
     - Contador de avisos no leídos con badge rojo pulsante.
     - Al tocar, abre panel flotante en cristal esmerilado con avisos reales (nuevas quedadas, comentarios, plazas) y opción «Marcar leídas».
   - **Menú de Usuario / Avatar:**
     - Avatar con indicador online verde y rol activo.
     - Desplegable con: carnet de socio, cuota anual 2026 al corriente, accesos a «Mi Perfil», «Mis Planes», paneles de moderación/administración y «Cerrar Sesión».

2. **Barra de Navegación Inferior Fija e Inamovible (Siempre Visible sin Scroll en Móvil, Tablet y Web):**
   - **Fijación Absoluta Permanente:** La barra de navegación debe estar **siempre fija en la parte inferior de la pantalla sin scroll** (\`sticky bottom-0\` o contenedor \`flex-col\` con scroll central independiente), visible al 100% en todo momento tanto en versión móvil, tablet como web responsive.
   - **Botones Compactos y Proporcionados:** Cero botones gigantescos o toscos. La barra debe tener una altura compacta (~50px a 54px + safe-area), con iconos estilizados de 16px a 18px (\`w-4 h-4\`) y textos en \`text-[9px]\` o \`text-[10px]\`.
   - **ELIMINACIÓN DEL BOTÓN (+):** **No incluir ningún botón flotante (+) grande ni central en la barra inferior.** La acción de «Proponer Quedada» se gestiona de forma limpia y accesible desde la cabecera del explorador o la barra superior, manteniendo la barra inferior despejada, equilibrada y minimalista.
   - **5 Accesos Esenciales Equidistantes:**
     1. 🧭 **Explorar** (\`/\`)
     2. 📅 **Agenda** (\`/agenda\`)
     3. 🗺️ **Mapa** (\`/mapa\`)
     4. 👥 **Mis Planes** (\`/mis\`) con punto de notificación sutil
     5. 👤 **Perfil** (\`/perfil\`)
   - **Estética Glass:** Fondo translúcido \`rgba(15, 23, 42, 0.95)\` con \`backdrop-filter: blur(24px)\`, borde superior de 1px sutil (\`rgba(255, 255, 255, 0.1)\`) y punto indicador activo en rosa coral ADYP.

3. **Menú Lateral Dinámico en Tablet:**
   - En versión tablet, el menú lateral debe ser **dinámico y auto-ocultable**:
     - Botón toggle superior \`[⇥ Menú Tablet / ⇤ Ocultar Menú]\` para mostrar/ocultar el panel lateral con una transición suave (\`transition-all duration-300\`).
     - Al ocultarse, el contenido principal se expande al 100% de la pantalla para máxima legibilidad.
     - Tanto el Header como la Barra Inferior permanecen fijadas en el panel derecho en todo momento.

4. **Punto de Encuentro con Mini-Mapa & Sustitución del Muro de Dudas por WhatsApp:**
   - **SUPRESIÓN DEL MURO DE COMENTARIOS:** No implementar muro de comentarios ni hilos de dudas en la quedada (los usuarios usan el grupo de WhatsApp privado).
   - **GRUPO OFICIAL DE WHATSAPP:** En su lugar, incluir un módulo destacado: *«Grupo de WhatsApp de la Quedada · Las dudas y la coordinación de coches compartidos se tratan directamente en el grupo privado de WhatsApp de los asistentes confirmados»* con botón de acción directo.
   - **MINI-MAPA DEL PUNTO DE ENCUENTRO:** En la sección *«Punto de encuentro y cómo llegar»* (ej: *«Frente a la taquilla de la estación de tren de Cotos a las 09:15 h.»*), insertar un **mini-mapa visual integrado** con:
     - Waypoint con halo pulsante en la ubicación exacta.
     - Coordenadas GPS (ej: \`40.8252, -3.9625\`).
     - Botón directo \`🗺️ Abrir en Google Maps / GPS\`.
     - Botón \`📋 Copiar GPS\`.
     - Resumen de cómo llegar (Cercanías C-9, Bus 691 Moncloa, Parking).

---

### 🗺️ INVENTARIO COMPLETO DE RUTAS A CONSTRUIR
- \`/\`: Explorador principal con buscador dinámico compacto, chips estilizados, quedada destacada y grid cuadrado de actividades.
- \`/agenda\`: Timeline cronológico de quedadas organizadas por días y fines de semana con reserva directa.
- \`/mapa\`: Mapa interactivo SVG local de Madrid y Sierra con pines táctiles y sheet flotante.
- \`/quedada/:id\`: Ficha técnica con cabecera inmersiva, aforo, **punto de encuentro con mini-mapa interactivo GPS**, asistentes confirmados y **acceso directo al grupo privado de WhatsApp (sin muro de dudas)**.
- \`/mis\`: Mis planes (Apuntadas, Organizadas por mí, Historial de asistencias).
- \`/comunidad\`: Directorio de socios y grupos temáticos de afinidad.
- \`/perfil\`: Carnet digital del socio, estadísticas y selector rápido de roles para pruebas (Invitado, Socio, Moderador, Admin).
- \`/moderacion\`: Cola de revisión de nuevas actividades y reportes vecinales con botones Aprobar / Rechazar.
- \`/admin/*\`: Dashboard de métricas, directorio de socios con cambio de roles en vivo y auditoría.

---

### 🛠️ INSTRUCCIONES DE EJECUCIÓN PASO A PASO PARA EL AGENTE ARENA.AI
1. **Fase 1: Configurar el Layout con Barras Fijas Permanentes (iOS Viewport):**
   - Configura el contenedor principal con altura completa de pantalla (\`h-screen\` / \`h-[100dvh]\`) con \`flex flex-col overflow-hidden\`.
   - Coloca la cabecera (\`AppHeader\`) arriba con \`shrink-0\` o \`sticky top-0 z-30\`.
   - Coloca el contenido central con \`flex-1 overflow-y-auto no-scrollbar\`.
   - Coloca la barra de navegación (\`BottomNav\`) abajo con \`shrink-0\` o \`sticky bottom-0 z-30\`. Nunca se oculta al hacer scroll.
2. **Fase 2: Aplicar Estilo Glassmorphism iOS Nativo:**
   - Usa fondos translúcidos (\`rgba(15, 23, 42, 0.78)\` con \`backdrop-filter: blur(24px) saturate(190%)\`).
   - Agrega bordes sutiles de 1px (\`rgba(255, 255, 255, 0.12)\`) y reflejo especular superior (\`inset 0 1px 0 rgba(255, 255, 255, 0.18)\`).
   - Mantén la filosofía **Zero-Pill Discipline**: botones compactos (\`h-8\` o \`h-9\`), tipografía \`text-[11px]\` a \`text-xs\` en negrita y microinteracción háptica (\`active:scale-95\`).
3. **Fase 3: Barra Inferior sin Botón (+):**
   - 5 accesos simétricos de igual ancho: Explorar, Agenda, Mapa, Mis Planes, Perfil.
   - Elimina cualquier botón (+) gigante del medio.
4. **Fase 4: Ficha de Quedada con Mini-Mapa y WhatsApp (Sin Muro de Dudas):**
   - En \`/quedada/:id\`, elimina completamente la sección de comentarios o muro de dudas.
   - Agrega la tarjeta del **Punto de Encuentro** con el texto exacto (*«Frente a la taquilla de la estación de tren de Cotos a las 09:15 h.»*), mini-mapa visual con radar pulsante, coordenadas GPS (\`40.8252, -3.9625\`) y botón directo de Google Maps.
   - Agrega la tarjeta del **Grupo de WhatsApp de la Quedada** con botón verde directo para unirse.
5. **Fase 5: Menú Lateral Dinámico en Tablet:**
   - En vistas tablet/iPad, incluye un toggle para abrir y colapsar el menú lateral con transición suave, permitiendo lectura a pantalla completa.
6. **Fase 6: Archivo de Referencia \`diseño.html\`:**
   - Puedes abrir y descargar \`diseño.html\` (o \`/diseno.html\`) para inspeccionar la maqueta interactiva completa en tiempo real.`;
