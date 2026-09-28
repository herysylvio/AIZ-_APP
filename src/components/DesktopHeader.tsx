import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Plus, Search, ShieldCheck } from 'lucide-react';
import { useModeration } from '../contexts/ModerationContext';
import { cn } from '../utils/cn';

const links = [
{ to: '/', label: 'Accueil', end: true },
{ to: '/categories', label: 'Catégories', end: false },
{ to: '/evenements', label: 'Événements', end: false }];


export function DesktopHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { pendingCount, reportCount } = useModeration();
  const [query, setQuery] = useState('');
  const showSearch = pathname !== '/' && pathname !== '/recherche';
  const modCount = pendingCount + reportCount;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/recherche?q=${encodeURIComponent(q)}`);
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 hidden border-b border-aize-slate/50 bg-white lg:block">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-8">
        <Link to="/" className="flex shrink-0 items-center gap-1" aria-label="AIZÉ — Accueil">
          <MapPin className="size-6 fill-aize-coral text-aize-coral [&>circle]:fill-white [&>circle]:stroke-white" aria-hidden="true" />
          <span className="text-[22px] font-extrabold tracking-tight text-aize-navy">AIZÉ</span>
          <span className="ml-2 hidden border-l border-aize-slate/60 pl-3 text-[12px] font-medium text-aize-ink xl:inline">
            L'annuaire local de Moramanga
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="flex items-center gap-1">
          {links.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
            cn(
              'rounded-lg px-3 py-2 text-[14px] font-bold transition-colors',
              isActive ? 'bg-aize-cream text-aize-navy' : 'text-aize-ink hover:text-aize-navy'
            )
            }>
            
              {l.label}
            </NavLink>
          )}
        </nav>

        <div className="flex-1">
          {showSearch &&
          <form onSubmit={submit} role="search" className="ml-auto max-w-xs">
              <label htmlFor="header-search" className="sr-only">
                Rechercher
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-aize-slate px-3 py-2 focus-within:border-aize-navy">
                <Search className="size-4 text-aize-navy" aria-hidden="true" />
                <input
                id="header-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un service…"
                className="min-w-0 flex-1 bg-transparent text-[13.5px] text-aize-navy outline-none placeholder:text-aize-slate" />
              
              </div>
            </form>
          }
        </div>

        <NavLink
          to="/moderation"
          className={({ isActive }) =>
          cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-bold transition-colors',
            isActive ? 'bg-aize-cream text-aize-navy' : 'text-aize-ink hover:text-aize-navy'
          )
          }>
          
          <ShieldCheck className="size-4" aria-hidden="true" />
          Modération
          {modCount > 0 &&
          <span className="rounded-full bg-aize-coral px-1.5 py-0.5 text-[10.5px] font-bold text-white">{modCount}</span>
          }
        </NavLink>

        <Link
          to="/ajouter"
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-aize-coral px-4 text-[14px] font-bold text-white transition-colors hover:bg-aize-coral-dark">
          
          <Plus className="size-4" aria-hidden="true" />
          Ajouter un commerce
        </Link>
      </div>
    </header>);

}