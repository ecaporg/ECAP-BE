import * as bcrypt from 'bcrypt';

/**
 * Hash a password using bcrypt
 * @param password Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hash
 * @param plainPassword Plain text password
 * @param hashedPassword Hashed password
 * @returns True if the password matches the hash
 */
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Generate a random password of specified length
 * @param length Length of the password (default: 12)
 * @returns Random password
 */
export function generateRandomPassword(length = 12): string {
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  const allChars = upperChars + lowerChars + numbers + specialChars;

  let password = '';

  // Ensure at least one character from each category
  password += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
  password += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length),
  );

  // Fill the rest with random characters
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
