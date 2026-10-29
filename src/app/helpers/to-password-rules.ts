import type { PasswordValidationStatus } from '@angular/fire/auth';
import { PASSWORD_RULE_LABELS } from '../constants/password-rule-labels.constants';
import { PasswordRule } from '../model/password-rule';

type RuleKey = keyof typeof PASSWORD_RULE_LABELS;

// Builds the checklist from Firebase's result. Rules the policy doesn't use come back
// undefined, so they're left out.
export function toPasswordRules(status: PasswordValidationStatus): PasswordRule[] {
  const minLength = status.passwordPolicy.customStrengthOptions.minPasswordLength ?? 6;
  return (Object.keys(PASSWORD_RULE_LABELS) as RuleKey[])
    .filter((key) => status[key] !== undefined)
    .map((key) => ({
      label: PASSWORD_RULE_LABELS[key].replace('{min}', String(minLength)),
      met: status[key] === true,
    }));
}
