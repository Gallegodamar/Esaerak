
import { Idiom } from '../types';
import { ESAERAK_DATA } from '../constants';

const STORAGE_KEY = 'esaerak_master_user_data';

export const getIdioms = (): Idiom[] => {
  const userData = localStorage.getItem(STORAGE_KEY);
  if (!userData) return ESAERAK_DATA;
  
  const userIdioms: Idiom[] = JSON.parse(userData);
  return [...ESAERAK_DATA, ...userIdioms];
};

export const saveIdiom = (idiom: Omit<Idiom, 'id'>): Idiom => {
  const userData = localStorage.getItem(STORAGE_KEY);
  const userIdioms: Idiom[] = userData ? JSON.parse(userData) : [];
  
  const newIdiom: Idiom = {
    ...idiom,
    id: `user_${Date.now()}`
  };
  
  userIdioms.push(newIdiom);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userIdioms));
  return newIdiom;
};
