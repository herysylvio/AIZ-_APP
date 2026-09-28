import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Cross, Search, X } from 'lucide-react';
import { PlaceCard } from '../components/PlaceCard';
import { places } from '../data/places';
import { searchPlaces } from '../utils/search';

const frequentSearches = ['pharmacie', 'garage moto', 'hotely', 'mairie', 'dentiste de nuit'];

export function SearchResults() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [value, setValue] = useState(q);

  useEffect(() => setValue(q), [q]);

  const results = searchPlaces(places, q);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = value.trim();
    if (next) setParams({ q: next });
  };

  return (
    <div className="min-h-screen bg-white pb-10 lg:min-h-0 lg:pb-16">
      <header className="sticky top-0 z-20 border-b border-aize-slate/40 bg-white lg:static lg:border-0">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-1 px-2 py-2.5 lg:px-8 lg:pt-10">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Retour"
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-aize-navy hover:bg-aize-mist lg:hidden">
            
            <ArrowLeft className="size-5" />
          </button>
          <form onSubmit={submit} role="search" className="flex-1 pr-2 lg:max-w-2xl lg:pr-0">
            <label htmlFor="search-input" className="sr-only">
              Rechercher
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-aize-slate px-3 py-2.5 focus-within:border-aize-navy lg:rounded-2xl lg:px-5 lg:py-4">
              <Search className="size-4 shrink-0 text-aize-navy lg:size-5" aria-hidden="true" />
              <input
                id="search-input"
                type="search"
                autoFocus={!q}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Rechercher à Moramanga..."
                className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-aize-navy outline-none placeholder:font-normal placeholder:text-aize-slate lg:text-[16px]" />
              
              {value &&
              <button
                type="button"
                aria-label="Effacer"
                onClick={() => setValue('')}
                className="flex size-5 items-center justify-center rounded-full bg-aize-slate/40 text-aize-navy">
                
                  <X className="size-3" />
                </button>
              }
            </div>
          </form>
        </div>
      </header>

      {!q ?
      <main className="mx-auto w-full max-w-6xl px-5 pt-5 lg:px-8 lg:pt-8">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-aize-ink">Recherches fréquentes</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {frequentSearches.map((s) =>
          <button
            key={s}
            type="button"
            onClick={() => setParams({ q: s })}
            className="rounded-full border border-aize-slate px-3.5 py-2 text-[13px] font-semibold text-aize-navy hover:bg-aize-mist">
            
                {s}
              </button>
          )}
          </div>
        </main> :
      results.length > 0 ?
      <main className="mx-auto w-full max-w-6xl px-4 pt-4 lg:px-8 lg:pt-6">
          <p className="mb-3 text-[12.5px] font-semibold text-aize-ink lg:mb-4 lg:text-[14px]">
            {results.length} résultat{results.length > 1 ? 's' : ''} pour « {q} »
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {results.map((p) =>
          <PlaceCard key={p.id} place={p} />
          )}
          </div>
        </main> :

      <main className="mx-auto w-full max-w-3xl px-5 pt-8 lg:pt-12">
          <div className="flex flex-col items-center text-center">
            <img
            src="/c7492791-cddc-4845-b5e7-5490673c6abb.jpg"
            alt=""
            className="size-40 object-contain lg:size-48" />
          
            <h1 className="mt-4 text-[21px] font-extrabold leading-tight text-aize-navy lg:text-[30px]">
              Aucun résultat trouvé à Moramanga
            </h1>
            <p className="mt-2 max-w-[290px] text-[14px] leading-relaxed text-aize-ink lg:max-w-md lg:text-[16px]">
              Nous n'avons pas encore référencé ce service dans notre annuaire.
            </p>
          </div>

          <h2 className="mb-3 mt-8 text-[13px] font-bold uppercase tracking-wider text-aize-ink lg:mt-10">Suggestions</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
            <Link
            to="/categorie/sante?filtre=garde"
            className="flex items-center gap-3 rounded-2xl border border-aize-slate/70 p-4 hover:bg-aize-mist lg:p-5">
            
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <Cross className="size-5 fill-emerald-600 text-emerald-600" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block text-[14.5px] font-bold text-aize-navy">Consulter les pharmacies de garde</span>
                <span className="block text-[12px] text-aize-ink">Ouvertes ce soir et ce week-end</span>
              </span>
              <ChevronRight className="size-5 text-aize-slate" aria-hidden="true" />
            </Link>

            <div className="rounded-2xl bg-aize-cream p-4 lg:p-5">
              <p className="text-[15px] font-extrabold leading-snug text-aize-navy">
                Vous connaissez ce prestataire ? Proposez-le en 1 minute
              </p>
              <p className="mt-1 text-[12.5px] text-aize-navy/75">
                Votre contribution aide tous les habitants de Moramanga.
              </p>
              <Link
              to="/ajouter"
              className="mt-3 flex h-11 items-center justify-center rounded-xl bg-aize-coral text-[14px] font-bold text-white hover:bg-aize-coral-dark">
              
                Proposer une adresse
              </Link>
            </div>
          </div>
        </main>
      }
    </div>);

}