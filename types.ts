export interface Idiom {
  id: number | string;
  eu: string;
  es: string;
  category: string;
}

export type View = 'home' | 'explorer' | 'flashcards' | 'quiz' | 'add';