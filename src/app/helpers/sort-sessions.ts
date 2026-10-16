import { Session } from '../model/session';

//Returns a new array Sorting out the days so Monday is always first so if sessions are added it does not matter the order.
export function sortSessions(sessions: Session[]): Session[] {
  return [...sessions].sort((a, b) => a.day - b.day);
}
