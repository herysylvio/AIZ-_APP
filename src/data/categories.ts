import { BedDouble, Bus, Landmark, Stethoscope, UtensilsCrossed, Wrench } from 'lucide-react';
import type { Category } from '../types/aize';

export const categories: Category[] = [
{
  id: 'sante',
  title: 'Santé & Médecins',
  subtitle: 'Pharmacies, cabinets, CSB',
  icon: Stethoscope,
  tileClass: 'bg-emerald-50 text-emerald-600',
  count: 24
},
{
  id: 'transports',
  title: 'Transports',
  subtitle: 'Bajaj / Taxi-brousse',
  icon: Bus,
  tileClass: 'bg-sky-50 text-sky-600',
  count: 18
},
{
  id: 'hotels',
  title: 'Hôtels & Hébergements',
  subtitle: 'Chambres, bungalows',
  icon: BedDouble,
  tileClass: 'bg-violet-50 text-violet-600',
  count: 12
},
{
  id: 'restaurants',
  title: 'Restaurants & Snacks',
  subtitle: 'Hotely, gargotes, snacks',
  icon: UtensilsCrossed,
  tileClass: 'bg-amber-50 text-amber-600',
  count: 31
},
{
  id: 'mecaniciens',
  title: 'Mécaniciens',
  subtitle: 'Auto & Moto',
  icon: Wrench,
  tileClass: 'bg-blue-50 text-blue-600',
  count: 15
},
{
  id: 'services-publics',
  title: 'Services Publics & Mairie',
  subtitle: 'Mairie, police, pompiers',
  icon: Landmark,
  tileClass: 'bg-rose-50 text-aize-coral',
  count: 9
}];