
import React, { useState } from 'react';
import { saveIdiom } from '../services/storageService';

interface AddIdiomProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddIdiom: React.FC<AddIdiomProps> = ({ onSuccess, onCancel }) => {
  const [eu, setEu] = useState('');
  const [es, setEs] = useState('');
  const [category, setCategory] = useState('Erabiltzailea');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eu || !es) return;
    
    saveIdiom({ eu, es, category });
    onSuccess();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 heading-font mb-2">Esaera Berria Gehitu</h1>
        <p className="text-gray-600">Zure esaera gogokoenak hiztegian sar ditzakezu.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Euskarazko Esaera</label>
          <input 
            type="text" 
            required
            value={eu}
            onChange={(e) => setEu(e.target.value)}
            placeholder="Adibidez: Goiz ibili eta berandu jaiki..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Gaztelaniazko Itzulpena</label>
          <input 
            type="text" 
            required
            value={es}
            onChange={(e) => setEs(e.target.value)}
            placeholder="Traducción en castellano..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Kategoria</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
          >
            <option value="Erabiltzailea">Erabiltzailea</option>
            <option value="Egunerokoa">Egunerokoa</option>
            <option value="Zaharra">Zaharra</option>
            <option value="Modernoa">Modernoa</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            Utzi
          </button>
          <button 
            type="submit"
            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
          >
            Gorde Esaera
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIdiom;
