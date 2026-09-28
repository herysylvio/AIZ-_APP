import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TopBarProps {
  title: string;
  backTo?: string;
  right?: React.ReactNode;
}

export function TopBar({ title, backTo, right }: TopBarProps) {
  const navigate = useNavigate();
  const goBack = () => {
    if (backTo) navigate(backTo);else
    if (window.history.length > 1) navigate(-1);else
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-aize-slate/40 bg-white lg:static lg:border-0 lg:bg-transparent">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-2 lg:h-auto lg:gap-3 lg:px-8 lg:pb-2 lg:pt-8">
        <button
          type="button"
          onClick={goBack}
          aria-label="Retour"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-aize-navy transition-colors hover:bg-aize-mist focus-visible:outline-2 focus-visible:outline-aize-coral lg:border lg:border-aize-slate/60">
          
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-[17px] font-bold text-aize-navy lg:text-[28px] lg:font-extrabold">
          {title}
        </h1>
        {right && <div className="pr-2 lg:pr-0">{right}</div>}
      </div>
    </header>);

}