export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

export function whatsappHref(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${text}`;
}

/** Local Malagasy mobile number without the leading 0, e.g. "34 12 345 67". */
export function isValidMgLocal(value: string): boolean {
  const digits = value.replace(/\D/g, '').replace(/^0/, '');
  return /^3[2-9]\d{7}$/.test(digits);
}

export function formatMgLocal(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^0/, '').slice(0, 9);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 7), digits.slice(7, 9)];
  return parts.filter(Boolean).join(' ');
}