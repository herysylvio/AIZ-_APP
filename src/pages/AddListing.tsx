import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle2, Heart, Loader2, RefreshCw } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { StickyBar } from '../components/StickyBar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';
import { categories } from '../data/categories';
import { formatMgLocal, isValidMgLocal } from '../utils/phone';
import { cn } from '../utils/cn';

interface FormState {
  name: string;
  category: string;
  phone: string;
  whatsapp: string;
  quartier: string;
  landmark: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: '', category: '', phone: '', whatsapp: '', quartier: '', landmark: '' };

export function AddListing() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Indiquez le nom de l'établissement.";
    if (!form.category) e.category = 'Choisissez une catégorie.';
    if (!isValidMgLocal(form.phone)) e.phone = 'Numéro invalide. Exemple : 34 12 345 67';
    if (form.whatsapp && !isValidMgLocal(form.whatsapp)) e.whatsapp = 'Numéro WhatsApp invalide.';
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(`field-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      window.scrollTo(0, 0);
    }, 1100);
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col bg-white lg:min-h-[70vh] lg:[&>main]:mx-auto lg:[&>main]:w-full lg:[&>main]:max-w-md">
        <TopBar title="Fiche envoyée" backTo="/" />
        <main className="flex flex-1 flex-col items-center px-8 pt-16 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-aize-cream">
            <CheckCircle2 className="size-10 text-aize-coral" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-[22px] font-extrabold text-aize-navy">Merci, fiche reçue !</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-aize-ink">
            L'équipe AIZÉ va appeler le <span className="font-bold text-aize-navy">+261 {form.phone}</span> pour
            vérifier « {form.name} ». La fiche sera en ligne sous 48h.
          </p>
          <Link
            to="/"
            className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-aize-coral text-[15px] font-bold text-white">
            
            Retour à l'accueil
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setPhoto(null);
              setDone(false);
            }}
            className="mt-3 flex items-center gap-1.5 text-[14px] font-semibold text-aize-navy">
            
            <RefreshCw className="size-4" aria-hidden="true" /> Ajouter une autre adresse
          </button>
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-white pb-28 lg:min-h-0 lg:pb-16">
      <TopBar title="Ajouter un commerce ou service" />

      <main className="mx-auto w-full max-w-2xl px-5 pt-4 lg:px-0 lg:pt-6">
        <div className="flex gap-3 rounded-2xl bg-aize-cream p-4">
          <Heart className="mt-0.5 size-5 shrink-0 fill-aize-coral text-aize-coral" aria-hidden="true" />
          <p className="text-[13.5px] leading-snug text-aize-navy">
            Aidez les habitants de Moramanga à trouver votre activité.{' '}
            <span className="font-bold">Inscription 100% gratuite.</span>
          </p>
        </div>

        <form id="add-listing" noValidate onSubmit={submit} className="mt-5 flex flex-col gap-5">
          <Field id="name" label="Nom de l'établissement / prestataire" required error={errors.name}>
            <Input
              id="field-name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ex: Pharmacie Espoir"
              aria-invalid={!!errors.name}
              className={inputClass(!!errors.name)} />
            
          </Field>

          <Field id="category" label="Catégorie" required error={errors.category}>
            <Select value={form.category} onValueChange={(v) => set('category', v)}>
              <SelectTrigger id="field-category" className={cn(inputClass(!!errors.category), 'w-full')}>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) =>
                <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
          <Field
              id="phone"
              label="Numéro de téléphone"
              required
              error={errors.phone}
              helper="Format : +261 34 12 345 67 (Telma, Orange, Airtel)">
              
            <PhoneInput
                id="field-phone"
                value={form.phone}
                invalid={!!errors.phone}
                onChange={(v) => set('phone', v)} />
              
          </Field>

          <Field id="whatsapp" label="Numéro WhatsApp" optional error={errors.whatsapp}>
            <PhoneInput
                id="field-whatsapp"
                value={form.whatsapp}
                invalid={!!errors.whatsapp}
                onChange={(v) => set('whatsapp', v)} />
              
          </Field>
          </div>

          <Field id="quartier" label="Quartier">
            <Input
              id="field-quartier"
              value={form.quartier}
              onChange={(e) => set('quartier', e.target.value)}
              placeholder="Ex: Moramanga Ambony, Camp des Mariés..."
              className={inputClass(false)} />
            
          </Field>

          <Field
            id="landmark"
            label="Repère physique"
            helper="Le plus important ! À Moramanga, on se repère aux lieux connus.">
            
            <Input
              id="field-landmark"
              value={form.landmark}
              onChange={(e) => set('landmark', e.target.value)}
              placeholder="Ex: En face de la pharmacie Espoir, à côté de..."
              className={inputClass(false)} />
            
          </Field>

          <div>
            <p className="text-[14px] font-bold text-aize-navy">Photo de la devanture</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              id="field-photo"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPhoto(URL.createObjectURL(file));
              }} />
            
            {photo ?
            <div className="relative mt-2 overflow-hidden rounded-2xl border border-aize-slate">
                <img src={photo} alt="Aperçu de la devanture" className="h-44 w-full object-cover" />
                <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-2 right-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-aize-navy shadow">
                
                  Changer la photo
                </button>
              </div> :

            <label
              htmlFor="field-photo"
              className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-aize-slate px-4 py-7 text-center transition-colors hover:bg-aize-mist">
              
                <span className="flex size-12 items-center justify-center rounded-full bg-aize-cream">
                  <Camera className="size-6 text-aize-coral" aria-hidden="true" />
                </span>
                <span className="text-[14px] font-bold text-aize-navy">Prendre ou importer une photo</span>
                <span className="text-[12px] text-aize-ink">Enseigne bien visible, en journée</span>
              </label>
            }
          </div>
        </form>

      <StickyBar>
        <Button
            type="submit"
            form="add-listing"
            disabled={submitting}
            className="h-12 w-full rounded-xl bg-aize-coral text-[15px] font-bold text-white hover:bg-aize-coral-dark">
            
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {submitting ? 'Envoi en cours…' : 'Soumettre la fiche pour validation'}
        </Button>
      </StickyBar>
      </main>
    </div>);

}

function inputClass(invalid: boolean): string {
  return cn(
    'h-12 rounded-xl bg-white text-[15px] text-aize-navy placeholder:text-aize-slate',
    invalid ? 'border-aize-coral' : 'border-aize-slate'
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, optional, helper, error, children }: FieldProps) {
  return (
    <div>
      <Label htmlFor={`field-${id}`} className="text-[14px] font-bold text-aize-navy">
        {label}
        {required && <span className="text-aize-coral"> *</span>}
        {optional && <span className="font-normal text-aize-ink"> (facultatif)</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error ?
      <p role="alert" className="mt-1.5 text-[12px] font-semibold text-aize-coral-dark">
          {error}
        </p> :

      helper && <p className="mt-1.5 text-[12px] text-aize-ink">{helper}</p>
      }
    </div>);

}

interface PhoneInputProps {
  id: string;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
}

function PhoneInput({ id, value, invalid, onChange }: PhoneInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-aize-slate/60 pl-3.5 pr-2.5 text-[15px] font-bold text-aize-navy">
        +261
      </span>
      <Input
        id={id}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(formatMgLocal(e.target.value))}
        placeholder="34 12 345 67"
        aria-invalid={invalid}
        className={cn(inputClass(invalid), 'pl-[70px]')} />
      
    </div>);

}