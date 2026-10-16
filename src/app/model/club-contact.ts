import { Contact } from './contact';
export interface ClubContact {
  contacts: Contact[]; // general contact list for site
  joinEmails: {
    // join us go to the emails for the disciplines selected
    rifles: string[];
    pistols: string[];
  };
}
