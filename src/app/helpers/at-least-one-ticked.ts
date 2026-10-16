import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Group rule: Only Valid when at least one checkbox in the group is ticked.

export const atLeastOneTicked: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const anyTicket = Object.values(group.value).some(Boolean);
  if (anyTicket) return null;
  return { nonTicked: true };
};
