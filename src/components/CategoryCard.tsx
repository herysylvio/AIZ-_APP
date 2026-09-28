import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types/aize';
import { cn } from '../utils/cn';

export function CategoryCard({ category }: {category: Category;}) {
  const Icon = category.icon;
  return (
    <Link
      to={`/categorie/${category.id}`}
      className="group flex min-h-[132px] flex-col rounded-2xl border border-aize-slate/60 bg-white p-3.5 transition-all hover:border-aize-navy/40 hover:shadow-[0_4px_16px_rgba(10,25,49,0.06)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-aize-coral">
      
      <span className={cn('flex size-11 items-center justify-center rounded-xl', category.tileClass)}>
        <Icon className="size-[22px]" aria-hidden="true" />
      </span>
      <span className="mt-3 text-[14px] font-bold leading-tight text-aize-navy">{category.title}</span>
      {category.subtitle &&
      <span className="mt-0.5 text-[12px] leading-snug text-aize-ink">{category.subtitle}</span>
      }
      <span className="mt-auto pt-2 text-[11px] font-semibold text-aize-slate">{category.count} adresses</span>
    </Link>);

}