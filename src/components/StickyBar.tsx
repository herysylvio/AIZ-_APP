import React from 'react';
import { cn } from '../utils/cn';

/** Fixed to the bottom on mobile; flows inline on desktop. */
export function StickyBar({ children, className }: {children: React.ReactNode;className?: string;}) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 w-full border-t border-aize-slate/50 bg-white px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3',
        'lg:static lg:z-auto lg:mt-8 lg:border-0 lg:bg-transparent lg:p-0',
        className
      )}>
      
      {children}
    </div>);

}