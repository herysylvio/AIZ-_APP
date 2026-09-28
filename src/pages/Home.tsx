import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Cross, MapPin, Navigation, Plus, Search, ShieldAlert } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/recherche?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="pb-28 lg:pb-16">
      <header className="px-5 pb-4 pt-6 lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1">
              <MapPin className="size-7 fill-aize-coral text-aize-coral [&>circle]:fill-white [&>circle]:stroke-white" aria-hidden="true" />
              <span className="text-[28px] font-extrabold leading-none tracking-tight text-aize-navy">AIZÉ</span>
            </div>
            <p className="mt-1.5 text-[13px] font-medium text-aize-ink">L'annuaire local de Moramanga</p>
          </div>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-aize-cream px-3 py-1.5 text-[12px] font-bold text-aize-navy">
            <Navigation className="size-3.5 text-aize-coral" aria-hidden="true" />
            Moramanga Ville
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <section className="lg:mt-8 lg:rounded-3xl lg:bg-aize-navy lg:px-12 lg:py-14" aria-label="Recherche">
          <div className="hidden lg:block">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-bold text-aize-cream">
              <Navigation className="size-3.5" aria-hidden="true" />
              Moramanga Ville
            </span>
            <h1 className="mt-4 max-w-2xl text-[44px] font-extrabold leading-[1.1] tracking-tight text-white">
              Tous les services de Moramanga, vérifiés et à portée d'appel.
            </h1>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/70">
              Pharmacies, médecins, transports, garages… Trouvez le bon contact et le repère pour y aller.
            </p>
          </div>

          <form onSubmit={submit} role="search" className="lg:mt-8 lg:max-w-2xl">
            <label htmlFor="home-search" className="sr-only">
              Rechercher
            </label>
            <div className="flex items-center gap-2.5 rounded-2xl border border-aize-slate bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(10,25,49,0.05)] focus-within:border-aize-navy lg:border-0 lg:py-2 lg:pl-5 lg:pr-2">
              <Search className="size-5 shrink-0 text-aize-navy" aria-hidden="true" />
              <input
                id="home-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un service, une pharmacie, un garage..."
                className="min-w-0 flex-1 bg-transparent text-[14px] text-aize-navy outline-none placeholder:text-aize-slate lg:py-2.5 lg:text-[16px]" />
              
              <button
                type="submit"
                className="hidden h-11 shrink-0 items-center rounded-xl bg-aize-coral px-5 text-[14px] font-bold text-white hover:bg-aize-coral-dark lg:flex">
                
                Rechercher
              </button>
            </div>
          </form>

          <div className="mt-4 grid grid-cols-2 gap-2.5 lg:flex lg:max-w-2xl lg:gap-3">
            <Link
              to="/categorie/sante?filtre=garde"
              className="flex items-center gap-2 rounded-xl bg-aize-cream px-3 py-3 text-[13px] font-bold leading-tight text-aize-navy active:scale-[0.98] lg:px-4 lg:text-[14px]">
              
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white">
                <Cross className="size-4 fill-aize-coral text-aize-coral" aria-hidden="true" />
              </span>
              Pharmacies de garde
            </Link>
            <Link
              to="/categorie/services-publics"
              className="flex items-center gap-2 rounded-xl bg-aize-cream px-3 py-3 text-[13px] font-bold leading-tight text-aize-navy active:scale-[0.98] lg:px-4 lg:text-[14px]">
              
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white">
                <ShieldAlert className="size-4 text-aize-coral" aria-hidden="true" />
              </span>
              Urgences &amp; Sécurité
            </Link>
          </div>
        </section>

        <section className="mt-7 lg:mt-12" aria-labelledby="cat-heading">
          <div className="mb-3 flex items-center justify-between lg:mb-5">
            <h2 id="cat-heading" className="text-[18px] font-extrabold text-aize-navy lg:text-[24px]">
              Catégories
            </h2>
            <Link to="/categories" className="flex items-center text-[13px] font-bold text-aize-coral lg:text-[14px]">
              Tout voir <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {categories.map((c) =>
            <CategoryCard key={c.id} category={c} />
            )}
          </div>
        </section>

        <Link
          to="/ajouter"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-aize-slate px-4 py-3.5 lg:mt-10 lg:gap-4 lg:px-6 lg:py-5 lg:hover:bg-aize-mist">
          
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-aize-coral text-white lg:size-12">
            <Plus className="size-5" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block text-[14px] font-bold text-aize-navy lg:text-[16px]">Vous avez un commerce ?</span>
            <span className="block text-[12px] text-aize-ink lg:text-[13.5px]">Ajoutez-le gratuitement en 1 minute</span>
          </span>
          <ChevronRight className="size-5 text-aize-slate" aria-hidden="true" />
        </Link>
      </main>

      <BottomNav />
    </div>);

}