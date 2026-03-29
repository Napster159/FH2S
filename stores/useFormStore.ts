import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: 'M' | 'F';
  isSchooled: boolean;
  baseRegimeInsurer: string;
  situation: 'N' | 'H' | '';
}

export interface Spouse {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  profession: string;
}

export interface FormState {
  // Top references
  ppr: string;
  insuranceAffiliation: string;
  cnopsRegistration: string;
  foundationAffiliation: string;

  // Bulletin & Member Status
  bulletinType: 'nouvelle_adhesion' | 'avenant';
  memberStatus: 'actif' | 'retraite';
  civility: 'mr' | 'mme';

  // Identity
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthPlace: string;
  cin: string; // Used for identityDocumentNumber
  documentType: string;
  documentExpiry: string;
  familyStatus: 'celibataire' | 'marie' | 'divorce' | 'veuf';
  numberOfDependentChildren: string;

  // Contact
  address: string;
  city: string;
  phoneFixed: string;
  gsm: string;
  email: string;

  // Spouses & Children
  spouses: Spouse[];
  children: Child[];

  // Bank
  rib: string;

  // Signature
  signedAt: string;
  signedDate: string;

  // Actions
  updateField: (field: keyof Omit<FormState, 'spouses' | 'children' | 'updateField' | 'resetForm' | 'addChild' | 'removeChild' | 'updateChild' | 'addSpouse' | 'removeSpouse' | 'updateSpouse' | 'loadSampleData'>, value: string) => void;
  resetForm: () => void;
  
  addSpouse: () => void;
  removeSpouse: (id: string) => void;
  updateSpouse: (id: string, updates: Partial<Spouse>) => void;

  addChild: () => void;
  removeChild: (id: string) => void;
  updateChild: (id: string, updates: Partial<Child>) => void;
  
  loadSampleData: () => void;
}

const initialState: Omit<FormState, 'updateField' | 'resetForm' | 'addSpouse' | 'removeSpouse' | 'updateSpouse' | 'addChild' | 'removeChild' | 'updateChild' | 'loadSampleData'> = {
  ppr: '',
  insuranceAffiliation: '',
  cnopsRegistration: '',
  foundationAffiliation: '',
  bulletinType: 'nouvelle_adhesion',
  memberStatus: 'actif',
  civility: 'mr',
  firstName: '',
  lastName: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  birthPlace: '',
  cin: '',
  documentType: 'La Carte Nationale d’Identité',
  documentExpiry: '',
  familyStatus: 'celibataire',
  numberOfDependentChildren: '0',
  address: '',
  city: '',
  phoneFixed: '',
  gsm: '',
  email: '',
  spouses: [],
  children: [],
  rib: '',
  signedAt: '',
  signedDate: new Date().toISOString().split('T')[0],
};

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,

      updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
      
      resetForm: () => set(initialState),

      addSpouse: () => set((state) => ({
        spouses: [
          ...state.spouses,
          {
            id: crypto.randomUUID(),
            firstName: '',
            lastName: '',
            birthDate: '',
            profession: '',
          },
        ],
      })),

      removeSpouse: (id) => set((state) => ({
        spouses: state.spouses.filter((s) => s.id !== id),
      })),

      updateSpouse: (id, updates) => set((state) => ({
        spouses: state.spouses.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      })),

      addChild: () => set((state) => ({
        children: [
          ...state.children,
          {
            id: crypto.randomUUID(),
            name: '',
            birthDate: '',
            gender: 'M',
            isSchooled: false,
            baseRegimeInsurer: '',
            situation: '',
          },
        ],
      })),

      removeChild: (id) => set((state) => ({
        children: state.children.filter((child) => child.id !== id),
      })),

      updateChild: (id, updates) => set((state) => ({
        children: state.children.map((child) =>
          child.id === id ? { ...child, ...updates } : child
        ),
      })),

      loadSampleData: () => set({
        ppr: '1234567',
        insuranceAffiliation: 'POL-123456',
        cnopsRegistration: 'REG-98765',
        foundationAffiliation: 'FOND-5544',
        bulletinType: 'nouvelle_adhesion',
        memberStatus: 'actif',
        civility: 'mr',
        firstName: 'Jhone',
        lastName: 'DOE',
        birthDay: '15',
        birthMonth: '05',
        birthYear: '1985',
        birthPlace: 'Casablanca',
        cin: 'AB123456',
        documentType: 'La Carte Nationale d’Identité',
        documentExpiry: '2028-12-31',
        familyStatus: 'marie',
        numberOfDependentChildren: '2',
        address: '123 Rue de la Liberté',
        city: 'Casablanca',
        phoneFixed: '0522123456',
        gsm: '0661234567',
        email: 'jhone.doe@example.com',
        rib: '123456789012345678901234',
        signedAt: 'Casablanca',
        signedDate: '2026-03-29',
        spouses: [
          { id: crypto.randomUUID(), firstName: 'Jane', lastName: 'DOE', birthDate: '1988-10-20', profession: '-' },
        ],
        children: [
          { id: crypto.randomUUID(), name: 'Jimmy Doe', birthDate: '2015-03-10', gender: 'M', isSchooled: true, baseRegimeInsurer: 'CNOPS', situation: 'N' },
          { id: crypto.randomUUID(), name: 'Jenny Doe', birthDate: '2018-07-22', gender: 'F', isSchooled: false, baseRegimeInsurer: 'CNSS', situation: 'H' },
        ],
      }),
    }),
    {
      name: 'form-storage-v2',
      version: 1, // Incremented version to trigger migration
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // If the old state had 'CIN', migrate it to the new full name
          if (persistedState && persistedState.documentType === 'CIN') {
            return {
              ...persistedState,
              documentType: 'La Carte Nationale d’Identité',
            };
          }
        }
        return persistedState;
      },
    }
  )
);
