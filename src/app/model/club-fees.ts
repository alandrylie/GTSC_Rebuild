// All amounts are in pence (7000 = £70.00): whole numbers avoid decimal rounding errors
export interface ClubFees {
  adult: number;
  senior: number; // senior age (65) is in the AI rules, as it changes rarely
  junior: number;
  familyMemberSameAddress: number;
  weeklyRangeFeeAdult: number;
  weeklyRangeFeeJunior: number;
  adultVisitorOwnEquipment: number;
  adultVisitorClubEquipment: number;
  juniorVisitorOwnEquipment: number;
  juniorVisitorClubEquipment: number;
  rangeHireAllDay: number;
  lockers: LockerFees;
  groupVisits: GroupVisitFees;
}

export interface LockerFees {
  note: string; // e.g. "subject to availability"
  fac: number;
  clubRoomFullHeight: number;
  clubRoomHalfHeight: number;
  smallLockerFiringPoint: number;
}

export interface GroupVisitFees {
  airCadets: number;
  scoutingGroups: number;
  allOtherGroups: string; // who to contact, as other groups are at the Treasurer's discretion
  costCovers: string; // what the fee includes
}
