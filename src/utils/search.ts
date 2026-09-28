import type { Place } from '../types/aize';

export function normalizeText(value: string): string {
  return value.
  toLowerCase().
  normalize('NFD').
  replace(/[\u0300-\u036f]/g, '');
}

export function searchPlaces(list: Place[], query: string): Place[] {
  const terms = normalizeText(query).
  split(/\s+/).
  filter((t) => t.length > 2);
  if (terms.length === 0) return [];
  return list.filter((place) => {
    const haystack = normalizeText(
      [place.name, place.categoryLabel, place.landmark, place.quartier, ...place.services].join(' ')
    );
    return terms.every((term) => haystack.includes(term));
  });
}

/** Monday = 0 … Sunday = 6 */
export function todayScheduleIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}