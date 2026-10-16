import { ClubContact } from '../model/club-contact';

// Picks the remail addressed for the club disciplines selected.

export function recipientsFor(
  ticked: { rifles: boolean; pistols: boolean },
  joinEmails: ClubContact['joinEmails'],
): string[] {
  const recipients: string[] = [];
  if (ticked.rifles) recipients.push(...joinEmails.rifles);
  if (ticked.pistols) recipients.push(...joinEmails.pistols);
  return [...new Set(recipients)];
}
