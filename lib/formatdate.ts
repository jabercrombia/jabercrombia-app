export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('en-US', { month: 'short', year: 'numeric' });
}
