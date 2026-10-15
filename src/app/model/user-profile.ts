// A signed-in person's own document: users/{uid}
export interface UserProfile {
  firstName?: string; // optional: older test accounts don't have it yet
  lastName?: string;
  displayName: string; // e.g. "Test M." (shown on chat messages)
  position: string[]; // committee/club roles, e.g. ['range-officer']
}
