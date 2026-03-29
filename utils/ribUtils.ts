/**
 * Splits a 24-digit RIB string into an array of individual digits.
 * @param rib 24-digit RIB string
 * @returns Array of 24 characters
 */
export const splitRib = (rib: string): string[] => {
  const cleanRib = rib.replace(/\D/g, '').padEnd(24, ' ');
  return cleanRib.slice(0, 24).split('');
};

/**
 * Validates if the RIB is exactly 24 digits.
 */
export const validateRib = (rib: string): boolean => {
  return /^\d{24}$/.test(rib);
};

/**
 * Formats a RIB for display (e.g., groups of 4 or custom groups if needed).
 */
export const formatRib = (rib: string): string => {
  const clean = rib.replace(/\D/g, '');
  // RIB is typically: 3 (Banque) + 3 (Agence) + 16 (Compte) + 2 (Clé)
  // For simplicity, we just keep it as a 24-digit string for the input
  return clean;
};
