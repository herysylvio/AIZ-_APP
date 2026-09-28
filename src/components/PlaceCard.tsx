import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from './Button';
import { StatusPill, VerifiedBadge } from './PlaceBadges';
import type { Place } from '../types/aize';
import { telHref, whatsappHref } from '../utils/phone';

export function PlaceCard({ place }: {place: Place;}) {
  return (
    <article className="rounded-2xl border border-aize-slate/70 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <Link
          to={`/lieu/${place.id}`}
          className="min-w-0 flex-1 focus-visible:outline-2 focus-visible:outline-aize-coral">
          
          <h3 className="text-[16px] font-bold leading-snug text-aize-navy">{place.name}</h3>
          <p className="mt-0.5 text-[12px] text-aize-ink">
            {place.categoryLabel} · {place.quartier}
          </p>
        </Link>
        <StatusPill isOpen={place.isOpen} className="mt-0.5 shrink-0" />
      </div>

      <div className="mt-2">
        <VerifiedBadge verified={place.verified} />
      </div>

      <Link
        to={`/lieu/${place.id}`}
        className="mt-3 flex items-start gap-2 rounded-xl bg-aize-cream/60 px-3 py-2.5">
        
        <MapPin className="mt-0.5 size-4 shrink-0 text-aize-coral" aria-hidden="true" />
        <p className="text-[13px] leading-snug text-aize-navy">
          <span className="font-bold">Repère :</span> {place.landmark}
        </p>
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          className="h-11 rounded-xl bg-aize-coral text-[14px] font-bold text-white hover:bg-aize-coral-dark"
          onClick={() => {
            window.location.href = telHref(place.phone);
          }}>
          
          <Phone className="size-4" aria-hidden="true" />
          Appeler
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-xl border-aize-navy text-[14px] font-bold text-aize-navy hover:bg-aize-mist"
          disabled={!place.whatsapp}
          onClick={() => place.whatsapp && window.open(whatsappHref(place.whatsapp), '_blank')}>
          
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </Button>
      </div>
    </article>);

}