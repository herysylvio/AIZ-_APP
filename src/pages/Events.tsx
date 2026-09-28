import React from 'react';
import { CalendarDays } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function Events() {
  return (
    <div className="min-h-screen bg-white pb-28 lg:min-h-0 lg:pb-16">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <header className="pb-2 pt-6 lg:pt-10">
          <h1 className="text-[24px] font-extrabold text-aize-navy lg:text-[32px]">Événements</h1>
          <p className="mt-1 text-[13px] text-aize-ink lg:text-[15px]">Marchés, fêtes et rendez-vous à Moramanga</p>
        </header>
        <main className="pt-10">
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-dashed border-aize-slate px-6 py-12 text-center lg:py-16">
            <span className="flex size-14 items-center justify-center rounded-full bg-aize-cream">
              <CalendarDays className="size-7 text-aize-coral" aria-hidden="true" />
            </span>
            <p className="mt-4 text-[16px] font-bold text-aize-navy">Aucun événement pour le moment</p>
            <p className="mt-1 text-[13px] leading-relaxed text-aize-ink">
              Les prochains événements de la ville apparaîtront ici dès leur publication.
            </p>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>);

}