/**
 * Generate a unique hash for a given string
 * 
 * @param {string} str - The string to hash
 * @returns {string} - The hash converted in hexadecimal
 */
export function hash(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}