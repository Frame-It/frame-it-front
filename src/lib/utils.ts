import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calInputRows = (length: number) => {
  if (length <= 40) return 1;
  if (length <= 80) return 3;
  if (length <= 100) return 4;
};

export const calTextAreaRows = (length: number) => {
  if (length <= 75) return 3;
  if (length <= 105) return 4;
  if (length <= 135) return 5;
  if (length <= 165) return 6;
  if (length <= 195) return 7;
  if (length <= 225) return 8;
  if (length <= 255) return 9;
  return 10;
};
