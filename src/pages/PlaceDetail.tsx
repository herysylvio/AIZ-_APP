import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, Check, Clock, Flag, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/Button';
import { StickyBar } from '../components/StickyBar';
import { StatusPill, VerifiedBadge } from '../components/PlaceBadges';
import { ReportErrorDrawer } from '../components/ReportErrorDrawer';
import { places } from '../data/places';
import { telHref, whatsappHref } from '../utils/phone';
import { todayScheduleIndex } from '../utils/search';
import { cn } from '../utils/cn';

export function PlaceDetail() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = useState(false);
  const place = places.find((p) => p.id === placeId);
  const today = todayScheduleIndex();

  if (!place) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
        <p className="text-[17px] font-bold text-aize-navy">Fiche introuvable</p>
        <p className="mt-1 text-[13px] text-aize-ink">Cette adresse a peut-être été retirée de l'annuaire.</p>
        <Link to="/" className="mt-4 text-[14px] font-bold text-aize-coral">
          Retour à l'accueil
        </Link>
      </div>);

  }

  const statusText = place.isOpen ?
  place.closesAt ?
  `Ouvert actuellement (ferme à ${place.closesAt})` :
  'Ouvert actuellement (24h/24)' :
  `Fermé actuellement${place.opensAt ? ` (ouvre à ${place.opensAt})` : ''}`;

  const goBack = () => window.history.length > 1 ? navigate(-1) : navigate('/');

  const share = async () => {
    const data = { title: place.name, text: `${place.name} — ${place.landmark}`, url: window.location.href };
    if (navigator.share) {
      await navigator.share(data).catch(() => undefined);
    } else {
      await navigator.clipboard?.writeText(window.location.href);
      toast.success('Lien de la fiche copié');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-28 lg:min-h-0 lg:pb-16">
      <div className="mx-auto w-full max-w-6xl lg:px-8 lg:pt-6">
        <button
          type="button"
          onClick={goBack}
          className="mb-4 hidden items-center gap-1.5 text-[14px] font-bold text-aize-ink hover:text-aize-navy lg:inline-flex">
          
          <ArrowLeft className="size-4" aria-hidden="true" /> Retour aux résultats
        </button>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
          <div>
            <div className="relative h-56 w-full bg-aize-navy lg:h-[380px] lg:overflow-hidden lg:rounded-3xl">
              {place.image ?
              <img src={place.image} alt={`Devanture de ${place.name}`} className="size-full object-cover" /> :

              <div className="flex size-full items-center justify-center">
                  <Building2 className="size-14 text-white/40" aria-hidden="true" />
                </div>
              }
              <div className="absolute inset-x-0 top-0 flex justify-between p-3 lg:hidden">
                <button
                  type="button"
                  onClick={goBack}
                  aria-label="Retour"
                  className="flex size-10 items-center justify-center rounded-full bg-white text-aize-navy shadow-md">
                  
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={share}
                  aria-label="Partager la fiche"
                  className="flex size-10 items-center justify-center rounded-full bg-white text-aize-navy shadow-md">
                  
                  <Share2 className="size-[18px]" />
                </button>
              </div>
            </div>

            <main className="relative -mt-5 rounded-t-3xl bg-white px-5 pt-5 lg:mt-0 lg:rounded-none lg:px-0 lg:pt-8">
              <div className="flex flex-wrap items-center gap-1.5">
                <VerifiedBadge verified={place.verified} />
                <span className="rounded-full border border-aize-slate px-2 py-0.5 text-[11px] font-semibold text-aize-navy">
                  {place.categoryLabel}
                </span>
              </div>
              <h1 className="mt-2 text-[24px] font-extrabold leading-tight text-aize-navy lg:text-[34px]">{place.name}</h1>
              <p className="mt-0.5 text-[13px] text-aize-ink lg:text-[15px]">{place.quartier}, Moramanga</p>

              <section aria-label="Repère physique" className="mt-4 flex gap-3 rounded-2xl bg-aize-cream p-4 lg:mt-6 lg:p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white lg:size-11">
                  <MapPin className="size-5 text-aize-coral" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-aize-navy/70">Repère</p>
                  <p className="mt-0.5 text-[15px] font-bold leading-snug text-aize-navy lg:text-[17px]">{place.landmark}</p>
                </div>
              </section>

              <div className="lg:mt-2 lg:grid lg:grid-cols-2 lg:gap-8">
                <section className="mt-6" aria-labelledby="hours-heading">
                  <h2 id="hours-heading" className="flex items-center gap-2 text-[16px] font-extrabold text-aize-navy lg:text-[18px]">
                    <Clock className="size-[18px]" aria-hidden="true" /> Horaires
                  </h2>
                  <p
                    className={cn(
                      'mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-bold',
                      place.isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-aize-coral-dark'
                    )}>
                    
                    <span className={cn('size-2 rounded-full', place.isOpen ? 'bg-emerald-500' : 'bg-aize-coral')} />
                    {statusText}
                  </p>
                  <ul className="mt-3 divide-y divide-aize-slate/40 rounded-2xl border border-aize-slate/60">
                    {place.hours.map((h, i) =>
                    <li
                      key={h.day}
                      className={cn(
                        'flex justify-between px-4 py-2.5 text-[13.5px]',
                        i === today ? 'font-bold text-aize-navy' : 'text-aize-ink'
                      )}>
                      
                        <span>
                          {h.day}
                          {i === today &&
                        <span className="ml-1.5 text-[11px] font-bold text-aize-coral">Aujourd'hui</span>
                        }
                        </span>
                        <span className={h.hours === 'Fermé' ? 'text-aize-slate' : undefined}>{h.hours}</span>
                      </li>
                    )}
                  </ul>
                </section>

                <section className="mt-6" aria-labelledby="services-heading">
                  <h2 id="services-heading" className="text-[16px] font-extrabold text-aize-navy lg:text-[18px]">
                    À propos &amp; services
                  </h2>
                  <ul className="mt-3 space-y-2 lg:mt-4 lg:space-y-3">
                    {place.services.map((s) =>
                    <li key={s} className="flex items-start gap-2.5 text-[14px] text-aize-navy">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-aize-cream">
                          <Check className="size-3 text-aize-coral" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {s}
                      </li>
                    )}
                  </ul>
                </section>
              </div>

              <div className="mt-6 rounded-2xl border border-aize-slate/60 px-4 py-3 lg:hidden">
                <p className="text-[12px] text-aize-ink">Téléphone</p>
                <p className="text-[15px] font-bold text-aize-navy">{place.phone}</p>
              </div>

              <button
                type="button"
                onClick={() => setReportOpen(true)}
                className="mx-auto mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-aize-ink underline underline-offset-4 hover:text-aize-navy lg:hidden">
                
                <Flag className="size-3.5" aria-hidden="true" />
                Signaler une erreur sur cette fiche
              </button>
            </main>
          </div>

          <aside aria-label="Contact">
            <div className="lg:sticky lg:top-24 lg:rounded-3xl lg:border lg:border-aize-slate/60 lg:p-6">
              <div className="hidden lg:block">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-aize-ink">Contacter</p>
                  <StatusPill isOpen={place.isOpen} />
                </div>
                <p className="mt-1 text-[24px] font-extrabold tracking-wide text-aize-navy">{place.phone}</p>
                <p className="mt-1 flex items-start gap-1.5 text-[13px] text-aize-ink">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-aize-coral" aria-hidden="true" />
                  {place.landmark}
                </p>
              </div>

              <StickyBar className="lg:mt-5">
                <div className="flex gap-2 lg:flex-col">
                  <Button
                    className="h-12 flex-1 rounded-xl bg-aize-coral text-[15px] font-bold text-white hover:bg-aize-coral-dark lg:flex-none"
                    onClick={() => {
                      window.location.href = telHref(place.phone);
                    }}>
                    
                    <Phone className="size-[18px]" aria-hidden="true" />
                    Appeler le contact
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-aize-navy px-4 text-[14px] font-bold text-aize-navy hover:bg-aize-mist"
                    disabled={!place.whatsapp}
                    aria-label="Écrire sur WhatsApp"
                    onClick={() =>
                    place.whatsapp &&
                    window.open(whatsappHref(place.whatsapp, `Bonjour, j'ai trouvé ${place.name} sur AIZÉ.`), '_blank')
                    }>
                    
                    <MessageCircle className="size-[18px]" aria-hidden="true" />
                    WhatsApp
                  </Button>
                </div>
              </StickyBar>

              <div className="mt-5 hidden border-t border-aize-slate/40 pt-4 lg:flex lg:flex-col lg:gap-3">
                <button
                  type="button"
                  onClick={share}
                  className="flex items-center gap-2 text-[13.5px] font-bold text-aize-navy hover:text-aize-coral">
                  
                  <Share2 className="size-4" aria-hidden="true" /> Partager la fiche
                </button>
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="flex items-center gap-2 text-[13.5px] font-semibold text-aize-ink underline underline-offset-4 hover:text-aize-navy">
                  
                  <Flag className="size-4" aria-hidden="true" /> Signaler une erreur sur cette fiche
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ReportErrorDrawer open={reportOpen} onOpenChange={setReportOpen} placeName={place.name} />
    </div>);

}