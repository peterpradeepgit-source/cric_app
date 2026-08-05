export function formatScore(runs, wickets, overs) {
  if (overs === 0 && runs === 0) return 'Yet to bat';
  return `${runs}-${wickets} (${overs})`;
}

export function formatMatchType(type) {
  const map = { T20: 'T20', ODI: 'ODI', Test: 'TEST' };
  return map[type] || type;
}

export function getStatusColor(status) {
  if (status === 'live') return 'bg-cblive';
  if (status === 'upcoming') return 'bg-cbupcoming';
  return 'bg-cbcompleted';
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
