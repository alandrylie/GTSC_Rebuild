import { Contact } from './contact';
export interface ClubContact {
  enquiryEmails: string[]; // Join us enquiries go to every address in this list
  contacts: Contact[]; // general contact list for site
}
