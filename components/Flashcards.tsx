
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      {/* Modal container: mugikorrean zabalagoa (w-[98%]), pantaila handietan max-w-2xl */}
      <div className="bg-white w-[98%] sm:w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl my-auto">
        
        {/* Header txikiagoa mugikorrean */}
        <div className="p-4 sm:p-6 bg-green-600 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-black opacity-80 uppercase tracking-[0.2em]">{categoryName}</span>
            <span className="text-sm sm:text-lg font-bold">Karta <span className="opacity-60 font-normal">{currentIndex + 1}/{idioms.length}</span></span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-all active:scale-90">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Padding-ak (p-4 mugikorrean) eta altuera egokituta */}
        <div className="p-4 sm:p-10 h-72 sm:h-96 flex items-center justify-center perspective-1000 bg-gray-50/30">
          <div 
            className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front side (Euskara) - p-5 mugikorrean espazio gehiago emateko */}
            <div className="absolute inset-0 bg-white border border-gray-100 rounded-[1.5rem] sm:rounded-[2.5rem] flex flex-col items-center justify-center p-5 sm:p-12 backface-hidden shadow-lg shadow-gray-200/50">
              <span className="absolute top-4 sm:top-8 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">EUSKARA</span>
              <p className="text-xl sm:text-4xl font-black text-center text-gray-900 heading-font leading-snug sm:leading-tight">
                {currentIdiom.eu}
              </p>
              <div className="absolute bottom-4 sm:bottom-8 flex items-center gap-2 text-gray-400">
                <span className="text-[9px] uppercase font-bold tracking-widest opacity-60">Sakatu itzultzeko</span>
              </div>
            </div>

            {/* Back side (Gaztelaniaz) */}
            <div className="absolute inset-0 bg-green-50 border border-green-100 rounded-[1.5rem] sm:rounded-[2.5rem] flex flex-col items-center justify-center p-5 sm:p-12 backface-hidden rotate-y-180 shadow-lg shadow-green-200/50">
              <span className="absolute top-4 sm:top-8 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white px-3 py-1 rounded-full">GAZTELANIAZ</span>
              <p className="text-xl sm:text-4xl font-black text-center text-green-900 heading-font leading-snug sm:leading-tight italic">
                {currentIdiom.es}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons - p-4 mugikorrean ertzetara gehiago hurbiltzeko */}
        <div className="p-4 sm:p-8 bg-white flex justify-between gap-3 sm:gap-4 border-t border-gray-100">
          <button 
            onClick={handlePrev}
            className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl font-black text-gray-700 hover:bg-gray-100 active:scale-95 transition-all text-[11px] sm:text-sm uppercase tracking-widest"
          >
            Aurrekoa
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-green-600 text-white rounded-xl sm:rounded-2xl font-black hover:bg-green-700 active:scale-95 transition-all shadow-xl shadow-green-100 text-[11px] sm:text-sm uppercase tracking-widest"
          >
            Hurrengoa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
