import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { cn } from '../utils/cn';

export function VerifiedBadge({ verified }: {verified: boolean;}) {
  if (!verified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-aize-slate px-2 py-0.5 text-[11px] font-semibold text-aize-ink">
        En cours de vérification
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      Vérifié &amp; Validé
    </span>);

}

export function StatusPill({ isOpen, className }: {isOpen: boolean;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold',
        isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-aize-coral-dark',
        className
      )}>
      
      <span className={cn('size-1.5 rounded-full', isOpen ? 'bg-emerald-500' : 'bg-aize-coral')} />
      {isOpen ? 'Ouvert' : 'Fermé'}
    </span>);

}