import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, Home, LayoutGrid, Menu } from 'lucide-react';
import { cn } from '../utils/cn';

const tabs = [
{ to: '/', label: 'Accueil', icon: Home, end: true },
{ to: '/categories', label: 'Catégories', icon: LayoutGrid, end: false },
{ to: '/evenements', label: 'Événements', icon: CalendarDays, end: false },
{ to: '/menu', label: 'Menu', icon: Menu, end: false }];


export function BottomNav() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-30 w-full border-t border-aize-slate/50 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      
      <ul className="grid grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, end }) =>
        <li key={to}>
            <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
            cn(
              'relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors',
              isActive ? 'text-aize-coral' : 'text-aize-ink hover:text-aize-navy'
            )
            }>
            
              {({ isActive }) =>
            <>
                  {isActive && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-aize-coral" />}
                  <Icon className="size-[22px]" strokeWidth={isActive ? 2.4 : 2} aria-hidden="true" />
                  {label}
                </>
            }
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}