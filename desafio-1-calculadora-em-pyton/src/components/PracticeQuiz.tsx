import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/pythonCode';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

export const PracticeQuiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const score = Object.entries(userAnswers).filter(
    ([qId, ans]) => QUIZ_QUESTIONS.find(q => q.id === Number(qId))?.correctIndex === ans
  ).length;

  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Desafio Prático</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Fixação de Conhecimento</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Quiz Rápido: Teste seu entendimento sobre o código
          </h2>
        </div>

        {showResults && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer Quiz</span>
          </button>
        )}
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-slate-200/90 bg-slate-50/40 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <span>{q.question}</span>
              </h3>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                    } else if (isThisSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    btnStyle = 'bg-amber-50 border-amber-500 text-amber-900 font-semibold ring-1 ring-amber-400';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {showResults && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                  isCorrect ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-900' : 'bg-slate-100 border border-slate-200 text-slate-700'
                }`}>
                  <strong className="font-semibold block mb-0.5">
                    {isCorrect ? 'Correto! 🌟' : 'Explicação Pedagógica:'}
                  </strong>
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit or Score Bar */}
        {!showResults ? (
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              {Object.keys(userAnswers).length} de {QUIZ_QUESTIONS.length} respondidas
            </span>
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                allAnswered
                  ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Verificar Respostas
            </button>
          </div>
        ) : (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Você acertou {score} de {QUIZ_QUESTIONS.length} perguntas!
                </h4>
                <p className="text-xs text-amber-800">
                  {score === QUIZ_QUESTIONS.length
                    ? 'Excelente! Você compreendeu perfeitamente toda a base da calculadora.'
                    : 'Bom trabalho! Revise os pontos comentados acima para fixar o aprendizado.'}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
