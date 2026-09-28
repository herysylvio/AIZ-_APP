import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { MousePointerClick, X } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { ModerationList, type ModerationTab } from '../components/moderation/ModerationList';
import { ReviewPanel } from '../components/moderation/ReviewPanel';
import { useModeration } from '../contexts/ModerationContext';
import { useIsDesktop } from '../hooks/useIsDesktop';
import type { Submission } from '../types/aize';

const tabIds: ModerationTab[] = ['pending', 'report', 'validated'];

export function ModerationQueue() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { submissions, pendingCount, reportCount, approve, reject } = useModeration();
  const routeSelected = submissions.find((s) => s.id === submissionId);
  const [tab, setTab] = useState<ModerationTab>(() =>
  routeSelected && tabIds.includes(routeSelected.status as ModerationTab) ?
  routeSelected.status as ModerationTab :
  'pending'
  );

  useEffect(() => {
    if (routeSelected && tabIds.includes(routeSelected.status as ModerationTab)) {
      setTab(routeSelected.status as ModerationTab);
    }
    // Sync the tab only when the selected id changes, not on status updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  const list = submissions.filter((s) => s.status === tab);
  const desktopSelected = routeSelected && list.some((s) => s.id === routeSelected.id) ? routeSelected : list[0];

  const handleApprove = (s: Submission) => {
    approve(s.id);
    toast.success(s.status === 'report' ? `${s.name} : correction enregistrée` : `${s.name} est en ligne`);
  };

  const handleReject = (s: Submission) => {
    reject(s.id);
    toast(s.status === 'report' ? 'Signalement ignoré' : `${s.name} renvoyé pour correction`);
  };

  const confirmFromPanel = (s: Submission) => {
    handleApprove(s);
    navigate('/moderation');
  };

  const rejectFromPanel = (s: Submission) => {
    handleReject(s);
    navigate('/moderation');
  };

  // Mobile: full-screen review sheet
  if (!isDesktop && routeSelected) {
    return (
      <div className="min-h-screen bg-aize-navy">
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-[13px] font-semibold text-white/70">Revue rapide</p>
          <button
            type="button"
            onClick={() => navigate('/moderation')}
            aria-label="Fermer"
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            
            <X className="size-5" />
          </button>
        </div>
        <main className="min-h-[calc(100vh-68px)] rounded-t-3xl bg-white px-5 pb-10 pt-3">
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-aize-slate/60" aria-hidden="true" />
          <ReviewPanel
            key={routeSelected.id}
            submission={routeSelected}
            onConfirm={() => confirmFromPanel(routeSelected)}
            onReject={() => rejectFromPanel(routeSelected)} />
          
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-aize-mist pb-10 lg:min-h-0 lg:bg-white lg:pb-16">
      <TopBar
        title="Modération AIZÉ"
        backTo={isDesktop ? '/' : '/menu'}
        right={
        <span className="rounded-full bg-aize-coral px-2.5 py-1 text-[11.5px] font-bold text-white lg:text-[13px]">
            {pendingCount} en attente
          </span>
        } />
      

      <div className="mx-auto w-full max-w-6xl lg:mt-4 lg:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-8 lg:px-8">
        <ModerationList
          tab={tab}
          onTabChange={setTab}
          list={list}
          reportCount={reportCount}
          selectedId={isDesktop ? desktopSelected?.id : undefined}
          onApprove={handleApprove}
          onReject={handleReject} />
        

        {isDesktop &&
        <aside aria-label="Revue de la fiche">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-aize-slate/60 bg-white p-6 pb-4">
              {desktopSelected ?
            <ReviewPanel
              key={desktopSelected.id}
              submission={desktopSelected}
              onConfirm={() => confirmFromPanel(desktopSelected)}
              onReject={() => rejectFromPanel(desktopSelected)} /> :


            <div className="flex flex-col items-center py-20 text-center">
                  <MousePointerClick className="size-8 text-aize-slate" aria-hidden="true" />
                  <p className="mt-3 text-[15px] font-bold text-aize-navy">Aucune fiche sélectionnée</p>
                  <p className="mt-1 text-[13px] text-aize-ink">Cette file est vide pour le moment.</p>
                </div>
            }
            </div>
          </aside>
        }
      </div>
    </div>);

}