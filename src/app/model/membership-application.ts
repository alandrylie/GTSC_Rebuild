// One person in the household who wants to join
export interface ApplicantPerson {
  firstName: string;
  lastName: string;
  dateOfBirth: Date; // saved as a Firestore Timestamp; juniors are worked out from this
  // Separate questions: a person can hold either, both or neither
  hasAwl: boolean;
  hasFac: boolean;
}

export interface HouseholdAddress {
  line1: string;
  line2: string;
  town: string;
  postcode: string;
}

// What the Join us enquiry email contains (nothing is stored on the website)
export interface MembershipApplication {
  email: string;
  mobile: string;
  address: HouseholdAddress;
  notProhibited: boolean;
  canAttendInduction: boolean;
  termsAcknowledged: boolean; // ticked in the club terms pop-up before sending
  guardianAcknowledged: boolean; // true when only juniors applied and the guardian rules were agreed
  people: ApplicantPerson[];
  disciplines: {
    rifles: boolean;
    pistols: boolean;
  };
}
