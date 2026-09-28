import type { DaySchedule, Place } from '../types/aize';

const IMG_PHARMACY = "/ec551b30-a13a-4271-aabe-fe97fb17c79b.jpg";

const IMG_CLINIC = "/4ac94538-5c41-4ba3-891a-61d0de22cec8.jpg";

const IMG_GARAGE = "/2c70dcee-07f4-4f20-a6a1-5293ac827698.jpg";

const IMG_RESTAURANT = "/2c51ede4-6aa5-4e11-950e-c9105e5f0d12.jpg";


const shopHours: DaySchedule[] = [
{ day: 'Lundi', hours: '07:30 – 18:00' },
{ day: 'Mardi', hours: '07:30 – 18:00' },
{ day: 'Mercredi', hours: '07:30 – 18:00' },
{ day: 'Jeudi', hours: '07:30 – 18:00' },
{ day: 'Vendredi', hours: '07:30 – 18:00' },
{ day: 'Samedi', hours: '08:00 – 12:30' },
{ day: 'Dimanche', hours: 'Fermé' }];


const allDayHours: DaySchedule[] = [
{ day: 'Lundi', hours: '24h/24' },
{ day: 'Mardi', hours: '24h/24' },
{ day: 'Mercredi', hours: '24h/24' },
{ day: 'Jeudi', hours: '24h/24' },
{ day: 'Vendredi', hours: '24h/24' },
{ day: 'Samedi', hours: '24h/24' },
{ day: 'Dimanche', hours: '24h/24' }];


export const places: Place[] = [
{
  id: 'pharmacie-du-centre',
  name: 'Pharmacie du Centre',
  categoryId: 'sante',
  categoryLabel: 'Pharmacie',
  verified: true,
  landmark: 'À 50m du restaurant Bezanozano, près de la Mairie',
  quartier: 'Moramanga Ville',
  phone: '+261 34 12 345 67',
  whatsapp: '+261 34 12 345 67',
  isOpen: true,
  closesAt: '18h',
  onDuty: true,
  image: IMG_PHARMACY,
  services: [
  'Médicaments génériques et de marque',
  'Conseils pharmaceutiques sans rendez-vous',
  'Prise de tension artérielle',
  'Produits bébé, hygiène et parapharmacie'],

  hours: shopHours
},
{
  id: 'cabinet-fanantenana',
  name: 'Cabinet Médical Fanantenana',
  categoryId: 'sante',
  categoryLabel: 'Médecin généraliste',
  verified: true,
  landmark: 'En face de la station Jovena',
  quartier: 'Moramanga Ambony',
  phone: '+261 33 11 204 58',
  whatsapp: '+261 33 11 204 58',
  isOpen: true,
  closesAt: '17h',
  image: IMG_CLINIC,
  services: [
  'Consultations générales adultes et enfants',
  'Suivi de grossesse',
  'Petite chirurgie et pansements',
  'Certificats médicaux'],

  hours: shopHours
},
{
  id: 'csb-ambohitsara',
  name: 'CSB II Ambohitsara',
  categoryId: 'sante',
  categoryLabel: 'Centre de santé public',
  verified: true,
  landmark: "Derrière l'église FJKM Ambohitsara",
  quartier: 'Ambohitsara',
  phone: '+261 32 07 889 12',
  isOpen: true,
  image: IMG_CLINIC,
  services: ['Urgences 24h/24', 'Vaccinations', 'Maternité', 'Consultations prénatales'],
  hours: allDayHours
},
{
  id: 'pharmacie-espoir',
  name: 'Pharmacie Espoir',
  categoryId: 'sante',
  categoryLabel: 'Pharmacie',
  verified: false,
  landmark: 'À côté du marché Bazary Be',
  quartier: 'Camp des Mariés',
  phone: '+261 34 60 772 31',
  whatsapp: '+261 34 60 772 31',
  isOpen: false,
  opensAt: '7h30',
  image: IMG_PHARMACY,
  services: ['Médicaments courants', 'Produits d’hygiène', 'Tests de paludisme rapides'],
  hours: shopHours
},
{
  id: 'pharmacie-soa',
  name: 'Pharmacie Soa',
  categoryId: 'sante',
  categoryLabel: 'Pharmacie',
  verified: true,
  landmark: 'Sur la RN2, à côté de la BOA',
  quartier: 'Moramanga Ambony',
  phone: '+261 38 42 115 90',
  whatsapp: '+261 38 42 115 90',
  isOpen: true,
  closesAt: '22h',
  onDuty: true,
  image: IMG_PHARMACY,
  services: ['Garde de nuit cette semaine', 'Médicaments sur ordonnance', 'Conseils'],
  hours: shopHours
},
{
  id: 'garage-mahery',
  name: 'Garage Mahery Auto & Moto',
  categoryId: 'mecaniciens',
  categoryLabel: 'Mécanicien',
  verified: true,
  landmark: 'Sur la RN2, sortie vers Toamasina',
  quartier: 'Antsahatsiresy',
  phone: '+261 34 55 120 44',
  whatsapp: '+261 34 55 120 44',
  isOpen: true,
  closesAt: '18h',
  image: IMG_GARAGE,
  services: ['Réparation moto et bajaj', 'Vidange et pneus', 'Soudure', 'Dépannage sur route'],
  hours: shopHours
},
{
  id: 'hotely-bezanozano',
  name: 'Hotely Bezanozano',
  categoryId: 'restaurants',
  categoryLabel: 'Restaurant malagasy',
  verified: true,
  landmark: 'Près de la Mairie, rue principale',
  quartier: 'Moramanga Ville',
  phone: '+261 34 98 003 27',
  isOpen: true,
  closesAt: '21h',
  image: IMG_RESTAURANT,
  services: ['Vary sy laoka', 'Petit-déjeuner dès 6h', 'Plats à emporter'],
  hours: shopHours
},
{
  id: 'commissariat',
  name: 'Commissariat de Police',
  categoryId: 'services-publics',
  categoryLabel: 'Sécurité',
  verified: true,
  landmark: 'En face du jardin public, avenue de l’Indépendance',
  quartier: 'Moramanga Ville',
  phone: '+261 20 56 820 17',
  isOpen: true,
  services: ['Urgences police 24h/24', 'Dépôt de plainte', 'Objets perdus'],
  hours: allDayHours
},
{
  id: 'mairie',
  name: 'Mairie de Moramanga',
  categoryId: 'services-publics',
  categoryLabel: 'Service public',
  verified: true,
  landmark: 'Place de la Mairie, à côté de la Poste',
  quartier: 'Moramanga Ville',
  phone: '+261 20 56 822 01',
  isOpen: true,
  closesAt: '16h',
  services: ['État civil', 'Légalisation de documents', 'Certificat de résidence'],
  hours: shopHours
}];