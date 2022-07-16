import { format } from 'date-fns';

export function formatDate(date: any) {
  return new Date(date * 1000).toLocaleDateString('en-US');
}
