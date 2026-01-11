
import React, { useState } from 'react';
import { Idiom } from '../types';

interface FlashcardsProps {
  idioms: Idiom[];
  onClose: () => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ idioms, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-green-600 text-white flex justify-between items-center">
          <h2 className="font-bold">Ikasketa Kartak ({currentIndex + 1}/{idioms.length})</h2>
          <button onClick={onClose} className="hover:bg-green-700 p-1 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 h-80 flex items-center justify-center perspective-1000">
          <div 
            className={`relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 bg-gray-50 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 backface-hidden shadow-sm">
              <span className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-widest">{currentIdiom.category}</span>
              <p className="text-2xl font-bold text-center text-gray-800 heading-font leading-tight">{currentIdiom.eu}</p>
              <p className="mt-8 text-xs text-gray-400 italic">Klik egin itzulpena ikusteko</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-green-50 border-2 border-green-200 rounded-xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 shadow-sm">
              <span className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-widest">Gaztelaniaz</span>
              <p className="text-2xl font-bold text-center text-green-800 heading-font">{currentIdiom.es}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-between gap-4 border-t border-gray-100">
          <button 
            onClick={handlePrev}
            className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Aurrekoa
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-md"
          >
            Hurrengoa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
