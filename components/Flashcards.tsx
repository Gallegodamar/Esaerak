
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-start sm:items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Container zabalagoa: max-w-2xl (672px) lehengo max-w-md (448px) ordez */}
      <div className="bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl my-auto transition-all duration-300">
        <div className="p-5 sm:p-6 bg-green-600 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="text-[11px] font-black opacity-80 uppercase tracking-[0.2em]">{categoryName}</span>
            <span className="text-base sm:text-lg font-bold">Ikasketa Kartak <span className="opacity-60 font-normal">({currentIndex + 1}/{idioms.length})</span></span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-all active:scale-90">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 sm:p-12 h-80 sm:h-96 flex items-center justify-center perspective-1000 bg-gray-50/50">
          <div 
            className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front side (Euskara) */}
            <div className="absolute inset-0 bg-white border-2 border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 sm:p-12 backface-hidden shadow-xl shadow-gray-200/50">
              <span className="absolute top-8 text-xs font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">EUSKARA</span>
              <p className="text-2xl sm:text-4xl font-black text-center text-gray-900 heading-font leading-[1.2] sm:leading-tight">
                {currentIdiom.eu}
              </p>
              <div className="absolute bottom-8 flex items-center gap-3 text-gray-400 group">
                <div className="w-10 h-[1px] bg-gray-200"></div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Klikatu itzultzeko</span>
                <div className="w-10 h-[1px] bg-gray-200"></div>
              </div>
            </div>

            {/* Back side (Gaztelaniaz) */}
            <div className="absolute inset-0 bg-green-50 border-2 border-green-200 rounded-[2.5rem] flex flex-col items-center justify-center p-8 sm:p-12 backface-hidden rotate-y-180 shadow-xl shadow-green-200/50">
              <span className="absolute top-8 text-xs font-black text-gray-500 uppercase tracking-widest bg-white px-3 py-1 rounded-full">GAZTELANIAZ</span>
              <p className="text-2xl sm:text-4xl font-black text-center text-green-900 heading-font leading-[1.2] sm:leading-tight italic">
                {currentIdiom.es}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white flex justify-between gap-4 border-t border-gray-100">
          <button 
            onClick={handlePrev}
            className="flex-1 py-4 px-6 bg-gray-50 border border-gray-200 rounded-2xl font-black text-gray-700 hover:bg-gray-100 active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            Aurrekoa
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-4 px-6 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 active:scale-95 transition-all shadow-xl shadow-green-100 text-sm uppercase tracking-widest"
          >
            Hurrengoa
          </button>
        </div>
      </div>
      {/* Spacer for bottom mobile bars */}
      <div className="h-12 w-full block sm:hidden"></div>
    </div>
  );
};

export default Flashcards;
