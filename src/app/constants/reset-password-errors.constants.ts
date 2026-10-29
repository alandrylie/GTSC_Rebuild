// Friendly messages for the Firebase error codes the reset page can hit
export const RESET_PASSWORD_ERRORS = (() => {
  const errors: Record<string, string> = {
    'auth/expired-action-code':
      'This reset link has expired. Links only work for 1 hour, so please request a new one.',
    'auth/invalid-action-code':
      'This reset link is not valid or has already been used. Please request a new one.',
    'auth/password-does-not-meet-requirements':
      'That password does not meet all the rules. Please check the list.',
    'auth/weak-password': 'That password does not meet all the rules. Please check the list.',
  };
  return Object.freeze(errors);
})();
