import { Session } from '../model/session';
import { sortSessions } from './sort-sessions';

// Fake timetable, deliberately out of order (Friday, Monday, Wednesday)
const jumbledSessions: Session[] = [
  { activity: 'Rimfire', day: 5, start: '19:30', end: null, whoCanAttend: ['full-members'] },
  { activity: 'Open range', day: 1, start: null, end: null, whoCanAttend: ['key-holders'] },
  { activity: 'Pistols', day: 3, start: '20:00', end: '21:45', whoCanAttend: ['any-member'] },
];

describe('sortSessions', () => {
  it('Sorts Monday First', () => {
    //act runs the function and keeps the result.
    const sorted = sortSessions(jumbledSessions);

    //assert pulls out just the day numbers and checks there order.
    expect(sorted.map((session) => session.day)).toEqual([1, 3, 5]);
  });
  it('origanol does not change', () => {
    //act
    sortSessions(jumbledSessions);
    //assert expecting the original jumbledSessions[0].day to still be 5.
    expect(jumbledSessions[0].day).toBe(5);
  });
});
