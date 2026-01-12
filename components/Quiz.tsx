
import React, { useState, useEffect, useCallback } from 'react';
import { Idiom } from '../types';

interface QuizProps {
  idioms: Idiom[];
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ idioms, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [answered, setAnswered] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Idiom[]>([]);

  useEffect(() => {
    // Shuffle and pick 10 random questions
    const shuffled = [...idioms].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, [idioms]);

  const generateOptions = useCallback((correctAnswer: string) => {
    const wrongAnswers = idioms
      .filter(i => i.es !== correctAnswer)
      .map(i => i.es)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    return [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());
  }, [idioms]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      setOptions(generateOptions(questions[currentQuestion].es));
      setAnswered(null);
    }
  }, [currentQuestion, questions, generateOptions]);

  const handleAnswer = (option: string) => {
    if (answered) return;
    setAnswered(option);
    if (option === questions[currentQuestion].es) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return null;

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-3xl font-bold mb-2 heading-font">Galdetegia Amaituta!</h2>
        <p className="text-xl text-gray-600 mb-8">Zure emaitza: <span className="font-bold text-green-600">{score} / {questions.length}</span></p>
        <button 
          onClick={onClose}
          className="bg-green-600 text-white px-12 py-4 rounded-3xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100"
        >
          Hasierara Itzuli
        </button>
      </div>
    );
  }

  const idiom = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-gray-50 z-[60] flex flex-col overflow-y-auto">
      <header className="sticky top-0 p-4 bg-white border-b border-gray-100 flex justify-between items-center z-10 shadow-sm">
        <div className="flex flex-col flex-1 max-w-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Galdetegia</span>
          <div className="flex gap-1 mt-1">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < currentQuestion ? 'bg-green-500' : i === currentQuestion ? 'bg-green-400 animate-pulse' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        </div>
        <button onClick={onClose} className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-2xl mx-auto w-full py-8">
        <div className="mb-10 text-center w-full">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Itzulpena asmatu</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 heading-font leading-tight px-2">"{idiom.eu}"</h2>
        </div>

        <div className="w-full space-y-3 sm:space-y-4 mb-8">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={!!answered}
              className={`w-full p-5 sm:p-6 text-left rounded-2xl border-2 transition-all font-semibold text-base sm:text-lg relative overflow-hidden ${
                answered 
                  ? option === idiom.es 
                    ? 'bg-green-50 border-green-500 text-green-800' 
                    : answered === option 
                      ? 'bg-red-50 border-red-500 text-red-800' 
                      : 'bg-white border-gray-100 text-gray-300'
                  : 'bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50 text-gray-700 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="relative z-10">{option}</span>
                {answered && option === idiom.es && (
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                )}
                {answered === option && option !== idiom.es && (
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-gray-100 mt-auto">
        <button 
          onClick={handleNext}
          disabled={!answered}
          className={`w-full max-w-md mx-auto block py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${answered ? 'bg-gray-900 text-white hover:bg-black active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          {currentQuestion === questions.length - 1 ? 'Emaitza Ikusi' : 'Hurrengo Galdera'}
        </button>
        {/* Spacer for iPhone home bar */}
        <div className="h-4 w-full"></div>
      </footer>
    </div>
  );
};

export default Quiz;
