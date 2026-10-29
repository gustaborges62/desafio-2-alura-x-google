import React, { useState } from 'react';
import { CONCEPTS, ConceptItem } from '../data/pythonCode';
import { Lightbulb, CheckCircle2, ChevronRight, Code2, Sparkles, BookOpen } from 'lucide-react';

export const ConceptExplanations: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<string>('funcoes');

  const currentConcept = CONCEPTS.find(c => c.id === selectedConcept) || CONCEPTS[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Section Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Desmistificando os Conceitos</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">Fundamentos de Programação</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Como os componentes trabalham juntos na sua calculadora
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Entenda de forma simples e intuitiva o propósito de cada estrutura de código utilizada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Navigation / Concept selector (Left column) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 sm:p-5 bg-slate-50/50 space-y-2">
          {CONCEPTS.map((concept) => {
            const isSelected = concept.id === selectedConcept;
            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-white border-amber-400 shadow-xs ring-1 ring-amber-400/30'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-900">{concept.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{concept.subtitle}</p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-amber-600 translate-x-1' : 'text-slate-300 group-hover:text-slate-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card (Right column) */}
        <div className="lg:col-span-8 p-5 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <span>{currentConcept.badge}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Explicação Detalhada</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{currentConcept.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{currentConcept.subtitle}</p>
          </div>

          {/* Real-World Analogy */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4.5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Analogia do Mundo Real
                </h4>
                <p className="text-sm text-amber-900/90 leading-relaxed">
                  {currentConcept.analogy}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Description */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2">No código do computador:</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentConcept.description}
            </p>
          </div>

          {/* Code Snippet */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto">
            <div className="text-[11px] text-slate-400 mb-2 select-none border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Trecho de Código em Python</span>
              <span className="text-amber-400 font-sans text-xs">Exemplo real</span>
            </div>
            <pre className="text-amber-200 whitespace-pre">{currentConcept.snippet}</pre>
          </div>

          {/* Bullet Breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Pontos Essenciais para Lembrar:</h4>
            <ul className="space-y-2">
              {currentConcept.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutor Pro Tip */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>{currentConcept.tips}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
