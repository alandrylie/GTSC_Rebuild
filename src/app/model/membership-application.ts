export interface ApplicantPerson {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  hasAwl: boolean;
  hasFac: boolean;
}

export interface HouseholdAddress {
  line1: string;
  line2: string;
  town: string;
  postcode: string;
}

export interface MembershipApplication {
  email: string;
  mobile: string;
  address: HouseholdAddress;
  notProhibited: boolean;
  canAttendInduction: boolean;
  termsAcknowledged: boolean;
  guardianAcknowledged: boolean;
  people: ApplicantPerson[];
}
