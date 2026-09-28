import type { Submission } from '../types/aize';

const IMG_PHARMACY = "/ec551b30-a13a-4271-aabe-fe97fb17c79b.jpg";

const IMG_CLINIC = "/4ac94538-5c41-4ba3-891a-61d0de22cec8.jpg";

const IMG_GARAGE = "/2c70dcee-07f4-4f20-a6a1-5293ac827698.jpg";

const IMG_RESTAURANT = "/2c51ede4-6aa5-4e11-950e-c9105e5f0d12.jpg";


export const initialSubmissions: Submission[] = [
{
  id: 's1',
  name: 'Pharmacie Espoir Ambohitsara',
  category: 'Santé & Médecins',
  submittedAt: "Aujourd'hui · 09:42",
  source: 'Commerçant',
  phone: '034 60 772 31',
  whatsapp: '034 60 772 31',
  quartier: 'Ambohitsara',
  landmark: 'à coté marché',
  image: IMG_PHARMACY,
  status: 'pending',
  checks: [
  { field: 'Nom', submitted: 'Pharmacie Espoir Ambohitsara', standard: 'Pharmacie Espoir Ambohitsara', status: 'ok' },
  { field: 'Téléphone', submitted: '034 60 772 31', standard: '+261 34 60 772 31', status: 'fix' },
  { field: 'Catégorie', submitted: 'Santé & Médecins', standard: 'Santé › Pharmacie', status: 'fix' },
  { field: 'Repère', submitted: 'à coté marché', standard: 'À côté du marché Bazary Be', status: 'fix' },
  { field: 'Photo', submitted: 'Devanture fournie', standard: 'Photo nette, enseigne lisible', status: 'ok' }]

},
{
  id: 's2',
  name: 'Garage Tsiky Moto',
  category: 'Mécaniciens',
  submittedAt: "Aujourd'hui · 08:15",
  source: 'Équipe terrain',
  phone: '+261 32 44 910 06',
  whatsapp: '+261 32 44 910 06',
  quartier: 'Antsahatsiresy',
  landmark: 'Après le pont, à droite vers Anosibe',
  image: IMG_GARAGE,
  status: 'pending',
  checks: [
  { field: 'Nom', submitted: 'Garage Tsiky Moto', standard: 'Garage Tsiky Moto', status: 'ok' },
  { field: 'Téléphone', submitted: '+261 32 44 910 06', standard: '+261 32 44 910 06', status: 'ok' },
  { field: 'Catégorie', submitted: 'Mécaniciens', standard: 'Mécaniciens › Moto', status: 'fix' },
  { field: 'Repère', submitted: 'Après le pont, à droite vers Anosibe', standard: 'Repère précis et vérifiable', status: 'ok' }]

},
{
  id: 's3',
  name: 'Hotely Mamy',
  category: 'Restaurants & Snacks',
  submittedAt: 'Hier · 17:30',
  source: 'Commerçant',
  phone: '0348812093',
  quartier: 'Camp des Mariés',
  landmark: 'En face de l’EPP Camp des Mariés',
  image: IMG_RESTAURANT,
  status: 'pending',
  checks: [
  { field: 'Nom', submitted: 'Hotely Mamy', standard: 'Hotely Mamy', status: 'ok' },
  { field: 'Téléphone', submitted: '0348812093', standard: '+261 34 88 120 93', status: 'fix' },
  { field: 'WhatsApp', submitted: '—', standard: 'Facultatif', status: 'missing' },
  { field: 'Repère', submitted: 'En face de l’EPP Camp des Mariés', standard: 'Repère précis et vérifiable', status: 'ok' }]

},
{
  id: 's4',
  name: 'Cabinet Dentaire Dr Hery',
  category: 'Santé & Médecins',
  submittedAt: 'Hier · 11:02',
  source: 'Équipe terrain',
  phone: '+261 33 07 145 88',
  whatsapp: '+261 33 07 145 88',
  quartier: 'Moramanga Ambony',
  landmark: 'Étage de la quincaillerie Rabe, RN2',
  image: IMG_CLINIC,
  status: 'pending',
  checks: [
  { field: 'Nom', submitted: 'Cabinet Dentaire Dr Hery', standard: 'Cabinet Dentaire Dr Hery', status: 'ok' },
  { field: 'Téléphone', submitted: '+261 33 07 145 88', standard: '+261 33 07 145 88', status: 'ok' },
  { field: 'Catégorie', submitted: 'Santé & Médecins', standard: 'Santé › Dentiste', status: 'fix' },
  { field: 'Horaires', submitted: 'Non renseignés', standard: 'Horaires jour par jour', status: 'missing' }]

},
{
  id: 's5',
  name: 'Bajaj Express Moramanga',
  category: 'Transports',
  submittedAt: '26 sept. · 15:48',
  source: 'Commerçant',
  phone: '038 21 670 45',
  whatsapp: '038 21 670 45',
  quartier: 'Gare routière',
  landmark: 'Stationnement devant la gare routière',
  status: 'pending',
  checks: [
  { field: 'Nom', submitted: 'Bajaj Express Moramanga', standard: 'Bajaj Express Moramanga', status: 'ok' },
  { field: 'Téléphone', submitted: '038 21 670 45', standard: '+261 38 21 670 45', status: 'fix' },
  { field: 'Photo', submitted: 'Aucune photo', standard: 'Photo du véhicule ou du point', status: 'missing' }]

},
{
  id: 'r1',
  name: 'Pharmacie du Centre',
  category: 'Santé & Médecins',
  submittedAt: "Aujourd'hui · 10:05",
  source: 'Habitant',
  phone: '+261 34 12 345 67',
  whatsapp: '+261 34 12 345 67',
  quartier: 'Moramanga Ville',
  landmark: 'À 50m du restaurant Bezanozano, près de la Mairie',
  image: IMG_PHARMACY,
  status: 'report',
  reportReason: "Les horaires d'ouverture sont faux",
  reportNote: 'Ferme maintenant à 12h le samedi, pas 12h30.',
  checks: [
  { field: 'Samedi', submitted: '08:00 – 12:00', standard: '08:00 – 12:30 (fiche actuelle)', status: 'fix' },
  { field: 'Téléphone', submitted: '+261 34 12 345 67', standard: '+261 34 12 345 67', status: 'ok' }]

},
{
  id: 'r2',
  name: 'Taxi-brousse Kofmad',
  category: 'Transports',
  submittedAt: 'Hier · 19:20',
  source: 'Habitant',
  phone: '+261 34 03 552 10',
  quartier: 'Gare routière',
  landmark: 'Guichet n°3 de la gare routière',
  status: 'report',
  reportReason: 'Le numéro de téléphone ne répond plus / a changé',
  reportNote: 'Nouveau numéro affiché au guichet : 034 03 552 19',
  checks: [
  { field: 'Téléphone', submitted: '034 03 552 19', standard: '+261 34 03 552 10 (fiche actuelle)', status: 'fix' }]

},
{
  id: 'v1',
  name: 'Cabinet Médical Fanantenana',
  category: 'Santé & Médecins',
  submittedAt: '24 sept. · 10:12',
  source: 'Équipe terrain',
  phone: '+261 33 11 204 58',
  whatsapp: '+261 33 11 204 58',
  quartier: 'Moramanga Ambony',
  landmark: 'En face de la station Jovena',
  image: IMG_CLINIC,
  status: 'validated',
  checks: [
  { field: 'Téléphone', submitted: '+261 33 11 204 58', standard: '+261 33 11 204 58', status: 'ok' }]

},
{
  id: 'v2',
  name: 'Hotely Bezanozano',
  category: 'Restaurants & Snacks',
  submittedAt: '22 sept. · 16:40',
  source: 'Commerçant',
  phone: '+261 34 98 003 27',
  quartier: 'Moramanga Ville',
  landmark: 'Près de la Mairie, rue principale',
  image: IMG_RESTAURANT,
  status: 'validated',
  checks: [
  { field: 'Téléphone', submitted: '+261 34 98 003 27', standard: '+261 34 98 003 27', status: 'ok' }]

}];