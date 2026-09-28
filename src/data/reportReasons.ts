import type { ReportReason } from '../types/aize';

export const reportReasons: ReportReason[] = [
{ id: 'phone', emoji: '❌', label: 'Le numéro de téléphone ne répond plus / a changé' },
{ id: 'closed', emoji: '🔒', label: "L'établissement a définitivement fermé" },
{ id: 'address', emoji: '📍', label: "Le repère ou l'adresse est incorrecte" },
{ id: 'hours', emoji: '🕒', label: "Les horaires d'ouverture sont faux" },
{ id: 'other', emoji: '✍️', label: 'Autre précision' }];