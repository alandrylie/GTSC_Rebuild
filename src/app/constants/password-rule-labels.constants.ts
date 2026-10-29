// Checklist wording for each rule Firebase's validatePassword() reports.
// {min} is swapped for the minimum length set in the console's password policy.
export const PASSWORD_RULE_LABELS = (() => {
  const labels = {
    meetsMinPasswordLength: 'At least {min} characters',
    containsUppercaseLetter: 'An uppercase letter',
    containsLowercaseLetter: 'A lowercase letter',
    containsNumericCharacter: 'A number',
    containsNonAlphanumericCharacter: 'A symbol, e.g. ! or ?',
  };
  return Object.freeze(labels);
})();
