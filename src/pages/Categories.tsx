import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';

export function Categories() {
  return (
    <div className="min-h-screen bg-white pb-28 lg:min-h-0 lg:pb-16">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <header className="pb-2 pt-6 lg:pt-10">
          <h1 className="text-[24px] font-extrabold text-aize-navy lg:text-[32px]">Catégories</h1>
          <p className="mt-1 text-[13px] text-aize-ink lg:text-[15px]">Tous les services référencés à Moramanga</p>
        </header>
        <main className="grid grid-cols-2 gap-3 pt-3 md:grid-cols-3 lg:gap-4 lg:pt-6">
          {categories.map((c) =>
          <CategoryCard key={c.id} category={c} />
          )}
        </main>
      </div>
      <BottomNav />
    </div>);

}