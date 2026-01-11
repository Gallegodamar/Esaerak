
import React, { useEffect, useState } from 'react';
import { Idiom, AIExplanation } from '../types';
import { getIdiomExplanation } from '../services/geminiService';

interface AIAssistantProps {
  idiom: Idiom;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ idiom, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AIExplanation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAI = async () => {
      setLoading(true);
      setError(null);
      try {
        const explanation = await getIdiomExplanation(idiom.eu);
        setData(explanation);
      } catch (err) {
        console.error(err);
        setError("Ezin izan dugu azalpena kargatu une honetan.");
      } finally {
        setLoading(false);
      }
    };

    loadAI();
  }, [idiom]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold heading-font">{idiom.eu}</h2>
            <p className="text-green-100 text-sm italic">{idiom.es}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Adimen artifiziala esaera aztertzen ari da...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-red-50 text-red-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <p className="text-gray-700 font-bold mb-2">{error}</p>
              <button 
                onClick={onClose}
                className="text-green-600 font-semibold hover:underline"
              >
                Itxi eta berriro saiatu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Azalpena</h3>
                <p className="text-lg text-gray-800 leading-relaxed font-medium">{data?.azalpena}</p>
              </section>

              <section className="bg-green-50 p-4 rounded-xl border border-green-100">
                <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Adibidea</h3>
                <p className="text-gray-700 italic">"{data?.adibidea}"</p>
              </section>

              <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Erabilera Testuingurua</h3>
                <p className="text-gray-700">{data?.testuingurua}</p>
              </section>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={onClose}
                  className="bg-gray-900 text-white px-8 py-2.5 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                >
                  Ulertuta!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
