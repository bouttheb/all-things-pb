import { formatDistanceToNow, parseISO } from "date-fns";

export function timeAgo(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}

export function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}
