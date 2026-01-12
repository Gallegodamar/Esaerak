
import React, { useState, useEffect } from 'react';
import { getIdioms } from './services/storageService';
import { View, Idiom } from './types';
import Explorer from './components/Explorer';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import AddIdiom from './components/AddIdiom';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setIdioms(getIdioms());
  }, [currentView]);

  const categories = Array.from(new Set(idioms.map(i => i.category))).sort();

  const handleFlashcardClick = () => {
    setSelectedCategory(null);
    setCurrentView('flashcards');
  };

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
      <header className="text-center mb-12 sm:mb-20">
        <div className="inline-block p-5 bg-green-100 rounded-[2.5rem] mb-8 shadow-sm">
          <svg className="w-14 h-14 sm:w-20 sm:h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 heading-font tracking-tight mb-6">
          Esaerak <span className="text-green-600">Master</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 font-medium opacity-80">
          Euskal esaera zaharrak eta modernoa modu dibertigarrian ikasteko eta praktikatzeko zure tresna nagusia.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <button 
          onClick={handleFlashcardClick}
          className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-100 hover:border-green-300 transition-all text-left flex flex-col items-start active:scale-95"
        >
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Kartak</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Ikasi kategoriaz kategoria flashcard sistema erabiliz.</p>
        </button>

        <button 
          onClick={() => setCurrentView('quiz')}
          className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-100 hover:border-blue-300 transition-all text-left flex flex-col items-start active:scale-95"
        >
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Galdetegia</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Probatu zure ezagutzak eta lortu puntuaziorik altuena.</p>
        </button>

        <button 
          onClick={() => setCurrentView('explorer')}
          className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-100 hover:border-orange-300 transition-all text-left flex flex-col items-start active:scale-95"
        >
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Hiztegia</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{idioms.length} esaera baino gehiago arakatu eta bilatzeko.</p>
        </button>

        <button 
          onClick={() => setCurrentView('add')}
          className="group bg-gray-900 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-800 hover:border-green-500 transition-all text-left flex flex-col items-start text-white active:scale-95"
        >
          <div className="p-4 bg-green-500/20 text-green-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <h3 className="text-2xl font-black mb-2">Gehitu</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Lagundu komunitateari eta sartu zure esaera gogokoenak.</p>
        </button>
      </div>
    </div>
  );

  const renderCategorySelector = () => (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
      <header className="mb-12 sm:mb-16">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-3 text-green-600 font-black mb-6 hover:translate-x-[-4px] transition-all group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          ATZERA HASIERARA
        </button>
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 heading-font mb-4">Aukeratu Kategoria</h1>
        <p className="text-xl text-gray-500 font-medium">Hautatu zer talde ikasi nahi duzun gaur gure bilduma osotik.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <button
          onClick={() => setSelectedCategory('Guztiak')}
          className="group relative p-10 bg-gray-900 text-white rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-all text-center border-4 border-transparent hover:border-green-500 overflow-hidden"
        >
          <div className="relative z-10">
            <span className="text-3xl font-black block mb-2 uppercase tracking-widest">GUZTIAK</span>
            <span className="text-green-400 font-bold text-lg">{idioms.length} ESAERA</span>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
        </button>
        
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="p-10 bg-white text-gray-900 rounded-[2.5rem] shadow-sm border-2 border-gray-100 hover:shadow-2xl hover:border-green-200 transition-all text-center group active:scale-95"
          >
            <span className="text-2xl font-black block mb-2 group-hover:text-green-600 transition-colors uppercase tracking-tight">{cat}</span>
            <span className="text-gray-400 font-bold text-lg">
              {idioms.filter(i => i.category === cat).length} ESAERA
            </span>
          </button>
        ))}
      </div>
      <div className="h-20 w-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-green-100 antialiased">
      {/* Navigation */}
      {currentView !== 'home' && (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-40">
          <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-3 text-gray-900 font-black heading-font text-xl group"
            >
              <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-200 group-hover:rotate-12 transition-transform">E</div>
              <span className="hidden xs:inline tracking-tighter">Esaerak Master</span>
            </button>
            <div className="flex gap-2 sm:gap-4">
              <button 
                onClick={() => setCurrentView('explorer')} 
                className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${currentView === 'explorer' ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                HIZTEGIA
              </button>
              <button 
                onClick={() => setCurrentView('add')} 
                className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${currentView === 'add' ? 'bg-green-600 text-white shadow-xl shadow-green-100' : 'text-gray-600 hover:bg-green-50'}`}
              >
                GEHITU
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {currentView === 'home' && renderHome()}
        
        {currentView === 'explorer' && (
          <Explorer idioms={idioms} />
        )}

        {currentView === 'flashcards' && (
          !selectedCategory ? renderCategorySelector() : (
            <Flashcards 
              idioms={selectedCategory === 'Guztiak' ? idioms : idioms.filter(i => i.category === selectedCategory)} 
              categoryName={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          )
        )}

        {currentView === 'quiz' && (
          <Quiz 
            idioms={idioms} 
            onClose={() => setCurrentView('home')}
          />
        )}

        {currentView === 'add' && (
          <AddIdiom 
            onSuccess={() => setCurrentView('explorer')}
            onCancel={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm font-black tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Esaerak Master &bull; PWA
          </p>
          <div className="flex justify-center gap-4 mt-8 opacity-30">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
             <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
             <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
