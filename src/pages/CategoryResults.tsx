import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { PlaceCard } from '../components/PlaceCard';
import { Button } from '../components/Button';
import { categories } from '../data/categories';
import { places } from '../data/places';
import { cn } from '../utils/cn';

type FilterId = 'all' | 'verified' | 'open';

const filters: {id: FilterId;label: string;}[] = [
{ id: 'all', label: 'Tous' },
{ id: 'verified', label: '✓ Vérifiés uniquement' },
{ id: 'open', label: 'Ouvert maintenant' }];


export function CategoryResults() {
  const { categoryId } = useParams();
  const [params] = useSearchParams();
  const onDuty = params.get('filtre') === 'garde';
  const [filter, setFilter] = useState<FilterId>('verified');

  const category = categories.find((c) => c.id === categoryId);
  const title = onDuty ? 'Pharmacies de garde' : category?.title ?? 'Catégorie';

  const base = places.filter((p) => onDuty ? p.onDuty : p.categoryId === categoryId);
  const list = base.filter((p) => {
    if (filter === 'verified') return p.verified;
    if (filter === 'open') return p.isOpen;
    return true;
  });

  return (
    <div className="min-h-screen bg-white pb-8 lg:min-h-0 lg:pb-16">
      <TopBar title={title} />

      <div
        className="no-scrollbar mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-3 lg:px-8 lg:py-4"
        role="tablist"
        aria-label="Filtres">
        
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-bold transition-colors',
                active ?
                'border-aize-navy bg-aize-navy text-white' :
                'border-aize-slate bg-white text-aize-navy hover:bg-aize-mist'
              )}>
              
              {f.label}
            </button>);

        })}
      </div>

      <main className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        <p className="mb-3 text-[12.5px] font-semibold text-aize-ink lg:text-[14px]">
          {list.length} résultat{list.length > 1 ? 's' : ''} à Moramanga
        </p>

        {list.length > 0 ?
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {list.map((p) =>
          <PlaceCard key={p.id} place={p} />
          )}
          </div> :

        <div className="flex flex-col items-center rounded-2xl border border-dashed border-aize-slate px-6 py-10 text-center">
            <SearchX className="size-8 text-aize-slate" aria-hidden="true" />
            <p className="mt-3 text-[15px] font-bold text-aize-navy">Aucune adresse avec ce filtre</p>
            <p className="mt-1 text-[13px] text-aize-ink">Essayez d'afficher toutes les adresses.</p>
            {filter !== 'all' &&
          <Button
            variant="outline"
            className="mt-4 rounded-xl border-aize-navy font-bold text-aize-navy"
            onClick={() => setFilter('all')}>
            
                Voir tous
              </Button>
          }
          </div>
        }
      </main>
    </div>);

}