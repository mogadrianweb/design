export type UserRole = 'invitado' | 'socio' | 'moderador' | 'admin';

export type DesignConceptId = 'concept1' | 'concept2' | 'concept3';

export type DeviceMode = 'mobile' | 'tablet' | 'responsive';

export type Category = 
  | 'todos' 
  | 'senderismo' 
  | 'gastronomia' 
  | 'cultura' 
  | 'nocturno' 
  | 'escapadas' 
  | 'deportes';

export interface Assistant {
  id: string;
  name: string;
  avatar: string;
  role: 'organizador' | 'socio' | 'invitado';
}

export interface Meetup {
  id: string;
  title: string;
  category: Category;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  coordinates: { x: number; y: number }; // Relative percentage on SVG map
  price: string;
  maxAttendees: number;
  currentAttendees: number;
  attendeesList: Assistant[];
  image: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    badge: string;
    phone?: string;
  };
  status: 'publicada' | 'pendiente_moderacion' | 'cancelada' | 'finalizada';
  featured?: boolean;
  distanceKm?: number;
  requirements?: string[];
  meetingPointDetails?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'activo' | 'pendiente' | 'suspendido';
  joinedDate: string;
  meetupsAttended: number;
  meetupsOrganized: number;
  interests: string[];
  city: string;
  bio?: string;
}

export interface ModerationItem {
  id: string;
  type: 'quedada' | 'comentario' | 'reporte_usuario';
  title: string;
  author: string;
  authorAvatar: string;
  reason: string;
  date: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  details: string;
  targetId: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}
