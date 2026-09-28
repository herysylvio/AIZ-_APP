import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Camera, Check, ChevronRight, Clock, MessageCircle, Phone, X } from 'lucide-react';
import { Button } from './Button';
import type { Submission } from '../types/aize';
import { cn } from '../utils/cn';

interface SubmissionCardProps {
  submission: Submission;
  selected?: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export function SubmissionCard({ submission: s, selected = false, onApprove, onReject }: SubmissionCardProps) {
  const actionable = s.status === 'pending' || s.status === 'report';
  const isReport = s.status === 'report';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      drag={actionable ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.45}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110) onApprove();else
        if (info.offset.x < -110) onReject();
      }}
      className={cn(
        'touch-pan-y rounded-2xl border bg-white p-3.5 transition-shadow',
        selected ? 'border-aize-navy ring-2 ring-aize-navy/10' : 'border-aize-slate/70'
      )}>
      
      <Link
        to={`/moderation/${s.id}`}
        aria-current={selected ? 'true' : undefined}
        className="flex gap-3 focus-visible:outline-2 focus-visible:outline-aize-coral">
        
        <div className="size-[72px] shrink-0 overflow-hidden rounded-xl bg-aize-mist">
          {s.image ?
          <img src={s.image} alt={`Devanture de ${s.name}`} className="size-full object-cover" /> :

          <div className="flex size-full flex-col items-center justify-center gap-0.5 text-aize-slate">
              <Camera className="size-5" aria-hidden="true" />
              <span className="text-[9px] font-semibold">Sans photo</span>
            </div>
          }
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-1">
            <h3 className="min-w-0 flex-1 truncate text-[15px] font-bold text-aize-navy">{s.name}</h3>
            <ChevronRight className="mt-0.5 size-4 shrink-0 text-aize-slate" aria-hidden="true" />
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-aize-ink">
            <Clock className="size-3" aria-hidden="true" />
            {s.submittedAt} · {s.category}
          </p>
          <span
            className={cn(
              'mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-bold',
              s.source === 'Équipe terrain' ? 'bg-aize-navy text-white' : 'bg-aize-cream text-aize-navy'
            )}>
            
            Soumis par : {s.source}
          </span>
        </div>
      </Link>

      {isReport && s.reportReason &&
      <div className="mt-3 flex gap-2 rounded-xl bg-rose-50 px-3 py-2">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-aize-coral" aria-hidden="true" />
          <div className="text-[12.5px] leading-snug text-aize-navy">
            <p className="font-bold">{s.reportReason}</p>
            {s.reportNote && <p className="mt-0.5 text-aize-ink">« {s.reportNote} »</p>}
          </div>
        </div>
      }

      <dl className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
        <div className="rounded-lg border border-aize-slate/50 px-2.5 py-1.5">
          <dt className="flex items-center gap-1 text-aize-ink">
            <Phone className="size-3" aria-hidden="true" /> Téléphone
          </dt>
          <dd className="mt-0.5 truncate font-bold text-aize-navy">{s.phone}</dd>
        </div>
        <div className="rounded-lg border border-aize-slate/50 px-2.5 py-1.5">
          <dt className="flex items-center gap-1 text-aize-ink">
            <MessageCircle className="size-3" aria-hidden="true" /> WhatsApp
          </dt>
          <dd className={cn('mt-0.5 truncate font-bold', s.whatsapp ? 'text-aize-navy' : 'text-aize-slate')}>
            {s.whatsapp ?? 'Non fourni'}
          </dd>
        </div>
      </dl>

      {actionable ?
      <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
          className="h-11 rounded-xl bg-aize-navy text-[13px] font-bold text-white hover:bg-aize-navy-soft"
          onClick={onApprove}>
          
            <Check className="size-4" aria-hidden="true" />
            {isReport ? 'Marquer corrigé' : 'Approuver & Publier'}
          </Button>
          <Button
          variant="outline"
          className="h-11 rounded-xl border-aize-coral text-[13px] font-bold text-aize-coral hover:bg-rose-50 hover:text-aize-coral-dark"
          onClick={onReject}>
          
            <X className="size-4" aria-hidden="true" />
            {isReport ? 'Ignorer' : 'Rejeter / Corriger'}
          </Button>
        </div> :

      <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700">
          <Check className="size-4" aria-hidden="true" /> En ligne sur AIZÉ
        </p>
      }
    </motion.article>);

}