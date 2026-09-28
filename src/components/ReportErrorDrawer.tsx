import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './Drawer';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Textarea } from './Textarea';
import { Label } from './Label';
import { Button } from './Button';
import { reportReasons } from '../data/reportReasons';
import { cn } from '../utils/cn';

interface ReportErrorDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeName: string;
}

export function ReportErrorDrawer({ open, onOpenChange, placeName }: ReportErrorDrawerProps) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setReason('');
    setNote('');
    setSubmitting(false);
  };

  const close = () => {
    onOpenChange(false);
    reset();
  };

  const submit = () => {
    if (!reason) return;
    setSubmitting(true);
    window.setTimeout(() => {
      toast.success('Merci ! Votre signalement a été envoyé', {
        description: `L'équipe AIZÉ va vérifier la fiche « ${placeName} ».`
      });
      close();
    }, 900);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}>
      
      <DrawerContent className="mx-auto max-h-[88vh] w-full max-w-lg rounded-t-3xl">
        <DrawerHeader className="px-5 pb-2 pt-3 text-left">
          <DrawerTitle className="text-[18px] font-extrabold text-aize-navy">
            Signaler une information inexacte
          </DrawerTitle>
          <DrawerDescription className="text-[13px] text-aize-ink">
            Aidez-nous à garder AIZÉ à jour pour Moramanga
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-5 pb-2">
          <RadioGroup value={reason} onValueChange={setReason} className="gap-2" aria-label="Type de problème">
            {reportReasons.map((r) => {
              const selected = reason === r.id;
              return (
                <Label
                  key={r.id}
                  htmlFor={`reason-${r.id}`}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 font-normal transition-colors',
                    selected ? 'border-aize-coral bg-aize-cream/50' : 'border-aize-slate/70 hover:bg-aize-mist'
                  )}>
                  
                  <span className="text-lg leading-none" aria-hidden="true">
                    {r.emoji}
                  </span>
                  <span className="flex-1 text-[13.5px] font-medium leading-snug text-aize-navy">{r.label}</span>
                  <RadioGroupItem value={r.id} id={`reason-${r.id}`} />
                </Label>);

            })}
          </RadioGroup>

          <Label htmlFor="report-note" className="mt-4 block text-[13px] font-semibold text-aize-navy">
            Précision <span className="font-normal text-aize-ink">(facultatif)</span>
          </Label>
          <Textarea
            id="report-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Précisez votre remarque..."
            className="mt-1.5 min-h-[84px] rounded-xl border-aize-slate text-[14px]"
            maxLength={280} />
          
        </div>

        <div className="flex flex-col gap-1 px-5 pb-5 pt-3">
          <Button
            className="h-12 rounded-xl bg-aize-coral text-[15px] font-bold text-white hover:bg-aize-coral-dark"
            disabled={!reason || submitting}
            onClick={submit}>
            
            {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {submitting ? 'Envoi en cours…' : 'Envoyer le signalement'}
          </Button>
          <Button variant="ghost" className="h-10 text-[14px] font-semibold text-aize-ink" onClick={close}>
            Annuler
          </Button>
        </div>
      </DrawerContent>
    </Drawer>);

}