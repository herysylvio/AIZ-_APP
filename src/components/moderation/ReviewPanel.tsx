import React, { useState } from 'react';
import { AlertTriangle, Camera, Check, CircleAlert, MessageCircle, Phone, PhoneCall, X } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';
import { StickyBar } from '../StickyBar';
import type { FieldCheck, Submission } from '../../types/aize';
import { telHref, whatsappHref } from '../../utils/phone';
import { cn } from '../../utils/cn';

interface ReviewPanelProps {
  submission: Submission;
  onConfirm: () => void;
  onReject: () => void;
}

export function ReviewPanel({ submission: s, onConfirm, onReject }: ReviewPanelProps) {
  const [called, setCalled] = useState(false);
  const [verified, setVerified] = useState(false);
  const actionable = s.status === 'pending' || s.status === 'report';
  const fixes = s.checks.filter((c) => c.status !== 'ok').length;

  return (
    <div className={cn(actionable && 'pb-32 lg:pb-0')}>
      <div className="flex gap-3">
        <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-aize-mist lg:size-20">
          {s.image ?
          <img src={s.image} alt={`Devanture de ${s.name}`} className="size-full object-cover" /> :

          <div className="flex size-full items-center justify-center text-aize-slate">
              <Camera className="size-5" aria-hidden="true" />
            </div>
          }
        </div>
        <div className="min-w-0">
          <h2 className="text-[19px] font-extrabold leading-tight text-aize-navy lg:text-[22px]">{s.name}</h2>
          <p className="mt-0.5 text-[12px] text-aize-ink lg:text-[13px]">
            {s.category} · {s.submittedAt}
          </p>
          <span className="mt-1 inline-block rounded-full bg-aize-cream px-2 py-0.5 text-[10.5px] font-bold text-aize-navy">
            Soumis par : {s.source}
          </span>
        </div>
      </div>

      {s.reportReason &&
      <div className="mt-4 flex gap-2 rounded-xl bg-rose-50 px-3 py-2.5">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-aize-coral" aria-hidden="true" />
          <div className="text-[13px] leading-snug text-aize-navy">
            <p className="font-bold">{s.reportReason}</p>
            {s.reportNote && <p className="mt-0.5 text-aize-ink">« {s.reportNote} »</p>}
          </div>
        </div>
      }

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="mt-5" aria-labelledby="compare-heading">
          <div className="flex items-center justify-between">
            <h3 id="compare-heading" className="text-[15px] font-extrabold text-aize-navy">
              Comparaison des données
            </h3>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-bold',
                fixes ? 'bg-aize-cream text-aize-navy' : 'bg-emerald-50 text-emerald-700'
              )}>
              
              {fixes ? `${fixes} à corriger` : 'Conforme'}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 px-1 text-[10.5px] font-bold uppercase tracking-wider text-aize-ink">
            <span>Soumis</span>
            <span>Standard AIZÉ</span>
          </div>
          <ul className="mt-1.5 flex flex-col gap-2">
            {s.checks.map((c) =>
            <CheckRow key={c.field} check={c} />
            )}
          </ul>
        </section>

        {actionable &&
        <section
          className="mt-5 self-start rounded-2xl border border-aize-slate/70 p-4"
          aria-labelledby="verify-heading">
          
            <h3 id="verify-heading" className="text-[15px] font-extrabold text-aize-navy">
              Vérifier le numéro
            </h3>
            <p className="mt-0.5 text-[12.5px] text-aize-ink">Un appel rapide avant de publier.</p>
            <p className="mt-3 text-[20px] font-extrabold tracking-wide text-aize-navy">{s.phone}</p>
            <div className="mt-3 flex gap-2">
              <Button
              className="h-12 flex-1 rounded-xl bg-aize-navy text-[14px] font-bold text-white hover:bg-aize-navy-soft"
              onClick={() => {
                setCalled(true);
                window.location.href = telHref(s.phone);
              }}>
              
                {called ?
              <PhoneCall className="size-4" aria-hidden="true" /> :

              <Phone className="size-4" aria-hidden="true" />
              }
                {called ? 'Rappeler' : 'Appeler maintenant'}
              </Button>
              {s.whatsapp &&
            <Button
              variant="outline"
              aria-label="Écrire sur WhatsApp"
              className="h-12 rounded-xl border-aize-navy px-4 text-aize-navy"
              onClick={() => window.open(whatsappHref(s.whatsapp ?? ''), '_blank')}>
              
                  <MessageCircle className="size-[18px]" aria-hidden="true" />
                </Button>
            }
            </div>

            <Label
            htmlFor={`verified-${s.id}`}
            className={cn(
              'mt-4 flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 font-normal transition-colors',
              verified ? 'border-emerald-500 bg-emerald-50' : 'border-aize-slate/70'
            )}>
            
              <Checkbox id={`verified-${s.id}`} checked={verified} onCheckedChange={(v) => setVerified(v === true)} />
              <span className="text-[14px] font-bold text-aize-navy">Numéro testé et vérifié par appel</span>
            </Label>
          </section>
        }
      </div>

      {actionable &&
      <StickyBar className="lg:sticky lg:bottom-0 lg:mt-6 lg:border-t lg:border-aize-slate/40 lg:bg-white lg:pb-1 lg:pt-4">
          {!verified &&
        <p className="mb-2 flex items-center gap-1.5 text-[11.5px] font-medium text-aize-ink">
              <CircleAlert className="size-3.5" aria-hidden="true" />
              Cochez la vérification par appel pour publier
            </p>
        }
          <div className="flex gap-2">
            <Button
            variant="outline"
            className="h-12 rounded-xl border-aize-coral px-4 font-bold text-aize-coral hover:bg-rose-50"
            onClick={onReject}>
            
              <X className="size-5" aria-hidden="true" />
              <span className="hidden lg:inline">Rejeter / Corriger</span>
              <span className="sr-only lg:hidden">Rejeter</span>
            </Button>
            <Button
            disabled={!verified}
            onClick={onConfirm}
            className="h-12 flex-1 rounded-xl bg-aize-coral text-[15px] font-bold text-white hover:bg-aize-coral-dark">
            
              <Check className="size-[18px]" aria-hidden="true" />
              Confirmer et mettre en ligne
            </Button>
          </div>
        </StickyBar>
      }
    </div>);

}

function CheckRow({ check }: {check: FieldCheck;}) {
  const tone =
  check.status === 'ok' ?
  { icon: Check, cls: 'text-emerald-600', label: 'Conforme' } :
  check.status === 'fix' ?
  { icon: CircleAlert, cls: 'text-aize-coral', label: 'À corriger' } :
  { icon: CircleAlert, cls: 'text-aize-slate', label: 'Manquant' };
  const Icon = tone.icon;

  return (
    <li className="rounded-xl border border-aize-slate/50 p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-aize-navy">{check.field}</span>
        <span className={cn('flex items-center gap-1 text-[11px] font-bold', tone.cls)}>
          <Icon className="size-3.5" aria-hidden="true" /> {tone.label}
        </span>
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-2 text-[12.5px] leading-snug">
        <span
          className={cn(
            'rounded-lg px-2 py-1.5',
            check.status === 'ok' ? 'bg-aize-mist text-aize-navy' : 'bg-rose-50 text-aize-navy'
          )}>
          
          {check.submitted}
        </span>
        <span className="rounded-lg bg-emerald-50 px-2 py-1.5 font-semibold text-aize-navy">{check.standard}</span>
      </div>
    </li>);

}