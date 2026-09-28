import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Cross, PlusCircle, Search, ShieldCheck, BoxIcon } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useModeration } from "../contexts/ModerationContext";
interface MenuItem {
  to: string;
  label: string;
  hint: string;
  icon: BoxIcon;
  badge?: number;
}
export function Menu() {
  const {
    pendingCount,
    reportCount
  } = useModeration();
  const groups: {
    title: string;
    items: MenuItem[];
  }[] = [{
    title: 'Contribuer',
    items: [{
      to: '/ajouter',
      label: 'Ajouter un commerce ou service',
      hint: 'Gratuit, validé sous 48h',
      icon: PlusCircle
    }, {
      to: '/recherche',
      label: 'Rechercher',
      hint: 'Services, pharmacies, garages…',
      icon: Search
    }]
  }, {
    title: 'Utile',
    items: [{
      to: '/categorie/sante?filtre=garde',
      label: 'Pharmacies de garde',
      hint: 'Cette semaine',
      icon: Cross
    }]
  }, {
    title: 'Équipe AIZÉ',
    items: [{
      to: '/moderation',
      label: 'Modération',
      hint: 'Fiches soumises et signalements',
      icon: ShieldCheck,
      badge: pendingCount + reportCount
    }]
  }];
  return <div className="min-h-screen bg-white pb-28 lg:min-h-0 lg:pb-16">
      <header className="mx-auto w-full max-w-2xl px-5 pb-2 pt-6 lg:pt-10">
        <h1 className="text-[24px] font-extrabold text-aize-navy lg:text-[32px]">Menu</h1>
      </header>
      <main className="mx-auto w-full max-w-2xl px-5">
        {groups.map((g) => <section key={g.title} className="mt-5">
            <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wider text-aize-ink">{g.title}</h2>
            <ul className="divide-y divide-aize-slate/40 overflow-hidden rounded-2xl border border-aize-slate/60">
              {g.items.map(({
            to,
            label,
            hint,
            icon: Icon,
            badge
          }) => <li key={to}>
                  <Link to={to} className="flex items-center gap-3 px-4 py-3.5 hover:bg-aize-mist">
                    <Icon className="size-5 text-aize-coral" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="block text-[14.5px] font-bold text-aize-navy">{label}</span>
                      <span className="block text-[12px] text-aize-ink">{hint}</span>
                    </span>
                    {!!badge && <span className="rounded-full bg-aize-coral px-2 py-0.5 text-[11px] font-bold text-white">
                        {badge}
                      </span>}
                    <ChevronRight className="size-4 text-aize-slate" aria-hidden="true" />
                  </Link>
                </li>)}
            </ul>
          </section>)}
        <p className="mt-8 text-center text-[11px] text-aize-slate">AIZÉ · L'annuaire local de Moramanga · v1.0</p>
      </main>
      <BottomNav />
    </div>;
}