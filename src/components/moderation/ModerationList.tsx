import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Inbox, MoveHorizontal } from 'lucide-react';
import { SubmissionCard } from '../SubmissionCard';
import type { Submission, SubmissionStatus } from '../../types/aize';
import { cn } from '../../utils/cn';

export type ModerationTab = Extract<SubmissionStatus, 'pending' | 'report' | 'validated'>;

interface ModerationListProps {
  tab: ModerationTab;
  onTabChange: (tab: ModerationTab) => void;
  list: Submission[];
  reportCount: number;
  selectedId?: string;
  onApprove: (s: Submission) => void;
  onReject: (s: Submission) => void;
}

export function ModerationList({
  tab,
  onTabChange,
  list,
  reportCount,
  selectedId,
  onApprove,
  onReject
}: ModerationListProps) {
  const tabs: {id: ModerationTab;label: string;badge?: number;}[] = [
  { id: 'pending', label: 'En attente' },
  { id: 'report', label: "Signalements d'erreur", badge: reportCount },
  { id: 'validated', label: 'Validées' }];


  return (
    <div>
      <div className="border-b border-aize-slate/40 bg-white lg:rounded-t-2xl lg:border lg:border-b lg:border-aize-slate/50">
        <div role="tablist" aria-label="Files de modération" className="no-scrollbar flex gap-1 overflow-x-auto px-3">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(t.id)}
                className={cn(
                  'relative flex shrink-0 items-center gap-1.5 px-2.5 py-3 text-[13px] font-bold transition-colors',
                  active ? 'text-aize-navy' : 'text-aize-ink hover:text-aize-navy'
                )}>
                
                {t.label}
                {!!t.badge &&
                <span className="flex size-5 items-center justify-center rounded-full bg-aize-coral text-[10.5px] text-white">
                    {t.badge}
                  </span>
                }
                {active && <span className="absolute inset-x-2 bottom-0 h-[3px] rounded-t-full bg-aize-coral" />}
              </button>);

          })}
        </div>
      </div>

      <div className="px-4 pt-4 lg:px-0">
        {tab !== 'validated' && list.length > 0 &&
        <p className="mb-3 flex items-center gap-1.5 text-[11.5px] font-medium text-aize-ink">
            <MoveHorizontal className="size-3.5" aria-hidden="true" />
            Glissez → pour approuver, ← pour rejeter
          </p>
        }

        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s) =>
            <SubmissionCard
              key={s.id}
              submission={s}
              selected={s.id === selectedId}
              onApprove={() => onApprove(s)}
              onReject={() => onReject(s)} />

            )}
          </AnimatePresence>
        </div>

        {list.length === 0 &&
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-aize-slate bg-white px-6 py-12 text-center">
            <Inbox className="size-8 text-aize-slate" aria-hidden="true" />
            <p className="mt-3 text-[15px] font-bold text-aize-navy">Tout est traité 🎉</p>
            <p className="mt-1 text-[13px] text-aize-ink">Aucune fiche dans cette file pour le moment.</p>
          </div>
        }
      </div>
    </div>);

}