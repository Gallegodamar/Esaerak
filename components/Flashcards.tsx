
import React, { useState } from 'react';
import { Idiom } from '../types';

interface FlashcardsProps {
  idioms: Idiom[];
  categoryName: string;
  onClose: () => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ idioms, categoryName, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentIdiom = idioms[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % idioms.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + idioms.length) % idioms.length);
    }, 150);
  };

  if (idioms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-gray-500 mb-4">Ez dago esaerarik kategoria honetan.</p>
        <button onClick={onClose} className="px-6 py-2 bg-green-600 text-white rounded-xl">Atzera</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl my-auto">
        <div className="p-4 bg-green-600 text-white flex justify-between items-center sticky top-0 z-10">
          <h2 className="font-bold flex flex-col">
            <span className="text-[10px] opacity-75 uppercase tracking-widest">{categoryName}</span>
            <span className="text-sm">Ikasketa Kartak ({currentIndex + 1}/{idioms.length})</span>
          </h2>
          <button onClick={onClose} className="hover:bg-green-700 p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 sm:p-8 h-72 sm:h-80 flex items-center justify-center perspective-1000">
          <div 
            className={`relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 bg-gray-50 border-2 border-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden shadow-sm">
              <span className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-widest">{currentIdiom.category}</span>
              <p className="text-xl sm:text-2xl font-bold text-center text-gray-800 heading-font leading-tight">{currentIdiom.eu}</p>
              <div className="mt-8 flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                <span className="text-[10px] uppercase font-bold tracking-widest">Klikatu itzultzeko</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-green-50 border-2 border-green-200 rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest font-bold">Gaztelaniaz</span>
              <p className="text-xl sm:text-2xl font-bold text-center text-green-800 heading-font">{currentIdiom.es}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-between gap-3 border-t border-gray-100">
          <button 
            onClick={handlePrev}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-colors text-sm shadow-sm"
          >
            Aurrekoa
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100 text-sm"
          >
            Hurrengoa
          </button>
        </div>
      </div>
      {/* Spacer for bottom mobile bars */}
      <div className="h-8 w-full block sm:hidden"></div>
    </div>
  );
};

export default Flashcards;
