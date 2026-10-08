export interface Session {
  activity: string;
  day: number;
  start: string | null;
  end: string | null;
  whoCanAttend: string[];
}
