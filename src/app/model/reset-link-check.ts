// Result of checking the code in a password reset link
export interface ResetLinkCheck {
  email: string; // whose password is being reset ('' if the link is bad)
  error: string; // message to show if the link is bad ('' if it's fine)
}
