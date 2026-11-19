// One range officer on a session. uid is null until they have a login.
export interface RotaRo {
  name: string;
  uid: string | null;
}

// One document in roRota, ID like '2026-11-19_rifle'
export interface RotaSession {
  id: string;
  date: string; // 'YYYY-MM-DD', so it sorts in date order
  discipline: string; // 'pistol' | 'rifle' | 'fac_rifles'
  ros: RotaRo[];
  closed: boolean;
}
