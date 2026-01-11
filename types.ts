
export interface Idiom {
  id: number;
  eu: string;
  es: string;
  category: string;
}

// Added AIExplanation interface to resolve import errors in components and services
export interface AIExplanation {
  azalpena: string;
  adibidea: string;
  testuingurua: string;
}

export type View = 'home' | 'explorer' | 'flashcards' | 'quiz';
