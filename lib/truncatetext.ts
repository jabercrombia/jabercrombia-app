export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
