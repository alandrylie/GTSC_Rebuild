import { RESET_PASSWORD_ERRORS } from '../constants/reset-password-errors.constants';

// Turns a Firebase error into a message a member can understand
export function resetErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again later.',
): string {
  const code = (error as { code?: string })?.code ?? '';
  return RESET_PASSWORD_ERRORS[code] ?? fallback;
}
