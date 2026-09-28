import React from 'react';
import { DesktopHeader } from './DesktopHeader';

export function AppShell({ children }: {children: React.ReactNode;}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-aize-navy">
      <DesktopHeader />
      <div className="flex-1">{children}</div>
      <footer className="hidden border-t border-aize-slate/40 lg:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-6 text-[12.5px] text-aize-ink">
          <span>© 2026 AIZÉ · L'annuaire local de Moramanga</span>
          <span>Fiches vérifiées par appel par l'équipe AIZÉ</span>
        </div>
      </footer>
    </div>);

}