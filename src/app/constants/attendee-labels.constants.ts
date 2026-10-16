export const ATTENDEE_LABELS = (() => {
  const labels: Record<string, string> = {
    'key-holders': 'Key holders only',
    'any-member': 'Open to both Probationary Members & Full Members',
    'full-members': 'Only Full Members of the club',
    'probationary-fac': 'Probationary FAC holders',
  };
  return Object.freeze(labels);
})();
