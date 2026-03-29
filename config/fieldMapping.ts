export type FieldType = 'text' | 'checkbox' | 'digit';

export interface FieldMapping {
  type: FieldType;
  x: number;
  y: number;
  fontSize?: number;
  options?: {
    lineHeight?: number;
    maxWidth?: number;
    spacing?: number; // for digits
  };
}

export const FIELD_MAPPING: Record<string, FieldMapping> = {
  // Top References (User's Updated)
  insuranceAffiliation: { type: 'text', x: 140, y: 690, fontSize: 9 },
  cnopsRegistration: { type: 'text', x: 140, y: 680, fontSize: 9 },
  foundationAffiliation: { type: 'text', x: 140, y: 670, fontSize: 9 },

  // Bulletin Type & Status (User's Updated)
  bulletinAdhesion: { type: 'checkbox', x: 93, y: 629 },
  bulletinAvenant: { type: 'checkbox', x: 341, y: 629 },
  memberActif: { type: 'checkbox', x: 170, y: 583 },
  memberRetraite: { type: 'checkbox', x: 307, y: 583 },

  // Identity (User's Updated)
  ppr: { type: 'text', x: 148, y: 700, fontSize: 10 },
  cnops: { type: 'text', x: 140, y: 680, fontSize: 10 },
  civilityMr: { type: 'checkbox', x: 27, y: 572 },
  civilityMme: { type: 'checkbox', x: 50, y: 572 },
  firstName: { type: 'text', x: 104, y: 577, fontSize: 11 },
  lastName: { type: 'text', x: 348, y: 577, fontSize: 11 },

  birthDay: { type: 'digit', x: 113, y: 563, fontSize: 10, options: { spacing: 10 } },
  birthMonth: { type: 'digit', x: 142, y: 563, fontSize: 10, options: { spacing: 10 } },
  birthYear: { type: 'digit', x: 171, y: 563, fontSize: 10, options: { spacing: 11 } },
  birthPlace: { type: 'text', x: 250, y: 564, fontSize: 10 },

  cin: { type: 'text', x: 326, y: 553, fontSize: 11 },
  docType: { type: 'text', x: 113, y: 553, fontSize: 10 },
  docExpiry: { type: 'text', x: 483, y: 553, fontSize: 10 },

  // Family Status (User's Updated)
  statusCelibataire: { type: 'checkbox', x: 86, y: 541 },
  statusMarie: { type: 'checkbox', x: 135, y: 541 },
  statusDivorce: { type: 'checkbox', x: 176, y: 541 },
  statusVeuf: { type: 'checkbox', x: 224, y: 541 },
  numChildren: { type: 'text', x: 409, y: 540, fontSize: 10 },

  // Contact (User's Updated)
  address: { type: 'text', x: 57, y: 533, fontSize: 10 },
  city: { type: 'text', x: 331, y: 533, fontSize: 10 },
  phoneFixed: { type: 'text', x: 60, y: 521, fontSize: 10 },
  gsm: { type: 'text', x: 199, y: 521, fontSize: 10 },
  email: { type: 'text', x: 339, y: 521, fontSize: 10 },

  // RIB (User's Updated)
  rib_digit_start: { type: 'digit', x: 52, y: 264, options: { spacing: 11.65 } },

  // Signature (Placeholders)
  signedAt: { type: 'text', x: 31, y: 131, fontSize: 10 },
  signedDate: { type: 'text', x: 144, y: 131, fontSize: 10 },
};

/**
 * HORIZONTAL TABLE: Spouses (Bénéficiaires Conjoints)
 */
export const SPOUSE_START_X = 142; // Start of "Conjoint 1" column
export const SPOUSE_COL_WIDTH = 118; // Space between "Conjoint 1" and "Conjoint 2"

export const SPOUSE_FIELD_Y = {
  lastName: 469,
  firstName: 459,
  birthDate: 449,
  profession: 439,
};

/**
 * HORIZONTAL TABLE: Children (Bénéficiaires Enfants)
 */
export const CHILD_START_X = 215; // Start of "1er enfant" column
export const CHILD_COL_WIDTH = 65;

export const CHILD_FIELD_Y = {
  firstName: 370,
  birthDate: 360,
  baseRegime: 350,
  situation: 340,
};
