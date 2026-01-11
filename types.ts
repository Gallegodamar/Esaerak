
export interface Idiom {
  id: number | string;
  eu: string;
  es: string;
  category: string;
}

export interface AIExplanation {
  azalpena: string;
  adibidea: string;
  testuingurua: string;
}

export type View = 'home' | 'explorer' | 'flashcards' | 'quiz' | 'add';
