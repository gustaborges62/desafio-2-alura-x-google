import React from 'react';
import { Sparkles, Terminal, BookOpen, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface TutorIntroProps {
  onSelectTab: (tab: string) => void;
}

export const TutorIntro: React.FC<TutorIntroProps> = ({ onSelectTab }) => {
  return (
    <div className="bg-white border-b border-slate-200 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>TUTORIAL DE PROGRAMAÇÃO PARA INICIANTES</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">Python 3.x</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
              Construa sua primeira Calculadora em Python: do zero à execução real
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              Bem-vindo ao seu espaço de aprendizado! Criar uma calculadora com as quatro operações básicas (
              <span className="font-semibold text-slate-800">adição</span>,{' '}
              <span className="font-semibold text-slate-800">subtração</span>,{' '}
              <span className="font-semibold text-slate-800">multiplicação</span> e{' '}
              <span className="font-semibold text-slate-800">divisão</span>
              ) é o projeto clássico mais eficaz para dominar os três pilares da programação:{' '}
              <em>funções</em>, <em>tomada de decisão com condicionais</em> e <em>tratamento de dados</em>.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-md px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>4 Operações com Funções Modulares</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-md px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Proteção contra Divisão por Zero</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-md px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulador Interativo Passo a Passo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Trilha do Aprendizado</h2>
            <p className="text-xs text-slate-500 mb-4">Escolha por onde deseja começar ou siga a ordem pedagógica:</p>

            <div className="space-y-2">
              <button
                onClick={() => onSelectTab('code')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100/80 rounded-lg border border-slate-200 text-left text-xs font-medium text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-600">1</span>
                  <span>Ver o Código Completo e Comentado</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>

              <button
                onClick={() => onSelectTab('simulator')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100/80 rounded-lg border border-slate-200 text-left text-xs font-medium text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-600">2</span>
                  <span>Testar no Simulador de Terminal</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>

              <button
                onClick={() => onSelectTab('concepts')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100/80 rounded-lg border border-slate-200 text-left text-xs font-medium text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-600">3</span>
                  <span>Entender os Componentes Chave</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>

              <button
                onClick={() => onSelectTab('run')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100/80 rounded-lg border border-slate-200 text-left text-xs font-medium text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-600">4</span>
                  <span>Como Executar no seu Computador</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
