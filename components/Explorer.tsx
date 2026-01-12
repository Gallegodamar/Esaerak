
import React, { useState } from 'react';
import { Idiom } from '../types';

interface ExplorerProps {
  idioms: Idiom[];
}

const Explorer: React.FC<ExplorerProps> = ({ idioms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(idioms.map(i => i.category))];

  const filteredIdioms = idioms.filter(i => {
    const matchesSearch = i.eu.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.es.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || i.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 heading-font mb-2">Esaeren Hiztegia</h1>
        <p className="text-gray-600">Arakatu eta bilatu behar duzun esaera.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="Bilatu esaera bat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
          />
          <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'All' ? 'Kategoria Guztiak' : cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIdioms.map(idiom => (
          <div 
            key={idiom.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-green-600 uppercase tracking-tighter">{idiom.category}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 leading-snug">{idiom.eu}</h3>
            <p className="text-sm text-gray-500 italic">{idiom.es}</p>
          </div>
        ))}

        {filteredIdioms.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Ez dugu esaerarik aurkitu bilaketa horrekin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
