/**
 * Password validation function
 * @param password
 * @returns an error string or null if no error found!
 */
export function validatePassword(password: string): string | null {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLetter) {
    return "Password must contain at least 1 letter";
  }

  if (!hasNumber) {
    return "Password must contain at least 1 number";
  }

  if (!hasSpecialChar) {
    return "Password must contain at least 1 special character";
  }

  return null;
}
