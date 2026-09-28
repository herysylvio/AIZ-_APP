import type { LucideIcon } from 'lucide-react';

export type CategoryId =
'sante' |
'transports' |
'hotels' |
'restaurants' |
'mecaniciens' |
'services-publics';

export interface Category {
  id: CategoryId;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  tileClass: string;
  count: number;
}

export interface DaySchedule {
  day: string;
  hours: string;
}

export interface Place {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryLabel: string;
  verified: boolean;
  landmark: string;
  quartier: string;
  phone: string;
  whatsapp?: string;
  isOpen: boolean;
  closesAt?: string;
  opensAt?: string;
  onDuty?: boolean;
  image?: string;
  services: string[];
  hours: DaySchedule[];
}

export interface ReportReason {
  id: string;
  emoji: string;
  label: string;
}

export type SubmissionStatus = 'pending' | 'report' | 'validated' | 'rejected';
export type SubmissionSource = 'Commerçant' | 'Équipe terrain' | 'Habitant';

export interface FieldCheck {
  field: string;
  submitted: string;
  standard: string;
  status: 'ok' | 'fix' | 'missing';
}

export interface Submission {
  id: string;
  name: string;
  category: string;
  submittedAt: string;
  source: SubmissionSource;
  phone: string;
  whatsapp?: string;
  quartier: string;
  landmark: string;
  image?: string;
  status: SubmissionStatus;
  reportReason?: string;
  reportNote?: string;
  checks: FieldCheck[];
}