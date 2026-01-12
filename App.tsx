
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <div className="inline-block p-4 bg-green-100 rounded-3xl mb-6">
          <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 heading-font tracking-tight mb-4">
          Esaerak <span className="text-green-600">Master</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Euskal esaera zaharrak eta modernoa modu dibertigarrian ikasteko eta praktikatzeko zure tresna nagusia.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={handleFlashcardClick}
          className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-green-300 transition-all text-left flex flex-col items-start"
        >
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Kartak</h3>
          <p className="text-gray-500 text-xs">Aukeratu kategoria bat.</p>
        </button>

        <button 
          onClick={() => setCurrentView('quiz')}
          className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-300 transition-all text-left flex flex-col items-start"
        >
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Galdetegia</h3>
          <p className="text-gray-500 text-xs">Probatu zure ezagutzak.</p>
        </button>

        <button 
          onClick={() => setCurrentView('explorer')}
          className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-300 transition-all text-left flex flex-col items-start"
        >
          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Hiztegia</h3>
          <p className="text-gray-500 text-xs">{idioms.length} esaera guztira.</p>
        </button>

        <button 
          onClick={() => setCurrentView('add')}
          className="group bg-gray-900 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-800 hover:border-green-500 transition-all text-left flex flex-col items-start text-white"
        >
          <div className="p-3 bg-green-500/20 text-green-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <h3 className="text-lg font-bold mb-1">Gehitu</h3>
          <p className="text-gray-400 text-xs">Sartu esaera berriak.</p>
        </button>
      </div>
    </div>
  );

  const renderCategorySelector = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-green-600 font-bold mb-4 hover:gap-3 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Atzera
        </button>
        <h1 className="text-4xl font-bold text-gray-900 heading-font mb-2">Aukeratu Kategoria</h1>
        <p className="text-gray-600">Hautatu zer talde ikasi nahi duzun gaur.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedCategory('Guztiak')}
          className="p-8 bg-gray-900 text-white rounded-3xl shadow-lg hover:scale-[1.02] transition-all text-center border-4 border-transparent hover:border-green-500"
        >
          <span className="text-2xl font-bold block mb-1">Guztiak</span>
          <span className="text-gray-400 text-sm">{idioms.length} esaera</span>
        </button>
        
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="p-8 bg-white text-gray-900 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all text-center group"
          >
            <span className="text-xl font-bold block mb-1 group-hover:text-green-600 transition-colors">{cat}</span>
            <span className="text-gray-400 text-sm">
              {idioms.filter(i => i.category === cat).length} esaera
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      {currentView !== 'home' && (
        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-gray-900 font-bold heading-font text-lg"
            >
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">E</div>
              <span className="hidden sm:inline">Esaerak Master</span>
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentView('explorer')} 
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${currentView === 'explorer' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Hiztegia
              </button>
              <button 
                onClick={() => setCurrentView('add')} 
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${currentView === 'add' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'}`}
              >
                Gehitu
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
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
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Esaerak Master. PWA bertsioa.
          </p>
          <div className="flex justify-center gap-4 mt-4">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
