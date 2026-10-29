import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, Cpu, ArrowRightLeft, ShieldCheck, PlayCircle } from 'lucide-react';

export const ExplorationSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const explorationCards = [
    {
      question: "Quais são os principais componentes do código gerado?",
      icon: Cpu,
      summary: "Estrutura orientada a objetos (OOP) dividida entre renderização visual Frutiger Aero e controlador lógico.",
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            O código em Python foi estruturado com foco em boas práticas de engenharia de software e separação de responsabilidades:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-700">
            <li>
              <strong className="text-slate-900">FrutigerAeroButton (Custom Canvas Widget):</strong> Classe herdada de <code>tk.Canvas</code> responsável por desenhar a geometria dos botões estilo bolha/gel, o chanfro exterior (<em>bevel</em>) e a calota elíptica superior de brilho especular (<em>specular reflection</em>).
            </li>
            <li>
              <strong className="text-slate-900">FrutigerAeroCalculator (Main Window Controller):</strong> Janela principal herdada de <code>tk.Tk</code>. Constrói o layout em grade (<em>Grid Layout</em>), aloca o visor LCD com fundo ciano profundo e orquestra a máquina de estados.
            </li>
            <li>
              <strong className="text-slate-900">Visor Duplo (History & Main LCD):</strong> Dois labels separados: um menor para mostrar a expressão pendente (ex: <code>150 ×</code>) e um grande em fonte monospaçada para o operando ativo.
            </li>
            <li>
              <strong className="text-slate-900">Mecanismo de Eventos de Teclado:</strong> Método <code>bind_keyboard()</code> que conecta os atalhos físicos do teclado aos manipuladores de ação.
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "Como a aplicação recebe os números e identifica a operação escolhida?",
      icon: ArrowRightLeft,
      summary: "Event-Driven Programming: captura de cliques e teclas acionando métodos específicos de transição de estado.",
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            A aplicação segue o paradigma orientada a eventos (<em>Event-Driven</em>):
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-700">
            <li>
              <strong className="text-slate-900">Recepção de Dígitos (action_digit):</strong> Quando o usuário clica em um botão ou tecla um número de 0 a 9, o caractere é passado como argumento. Se a calculadora estiver em estado de &quot;novo cálculo&quot;, ela substitui o 0 inicial; senão, faz a concatenação de strings na variável <code>self.current_operand</code>.
            </li>
            <li>
              <strong className="text-slate-900">Identificação do Operador (action_operator):</strong> Ao clicar em <code>+</code>, <code>−</code>, <code>×</code> ou <code>÷</code>, a aplicação guarda o valor atual em <code>self.stored_operand</code> (convertendo para <code>float</code>), grava o símbolo da operação em <code>self.pending_operator</code> e ativa a flag <code>self.should_reset_operand = True</code>, preparando a tela para o próximo número.
            </li>
            <li>
              <strong className="text-slate-900">Encadeamento Automático:</strong> Se o usuário já tiver uma operação pendente e pressionar outro operador sem teclar igual (ex: <code>10 + 5 * 2</code>), a aplicação detecta e calcula primeiro a soma parcial para evitar inconsistência.
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "Como a lógica de programação é utilizada para realizar os cálculos e apresentar os resultados?",
      icon: ShieldCheck,
      summary: "Método calculate com tratamento de exceções, conversão segura de ponto flutuante e sanitização de zeros.",
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            O coração do processamento matemático está no método <code>calculate()</code>:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-700">
            <li>
              <strong className="text-slate-900">Estrutura Condicional (if / elif):</strong> Avalia a string <code>self.pending_operator</code> e executa o operador aritmético nativo correspondente (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>).
            </li>
            <li>
              <strong className="text-slate-900">Blindagem de Divisão por Zero:</strong> Na operação de divisão (<code>/</code>), verifica previamente se <code>b == 0</code>. Se for, interrompe o cálculo e define o visor como <code>Erro: Div por 0</code>, sem deixar o interpretador disparar a exceção <code>ZeroDivisionError</code>.
            </li>
            <li>
              <strong className="text-slate-900">Formatação Elegante (format_number):</strong> Converte números inteiros (como <code>8.0</code>) para <code>8</code>, e em números decimais remove zeros excedentes no final (<code>3.140000 &rarr; 3.14</code>), garantindo um visor sempre limpo.
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "Experimente também realizar diferentes operações e observar como a aplicação se comporta.",
      icon: PlayCircle,
      summary: "Cenários de teste recomendados para validar a robustez e a usabilidade.",
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Abra o simulador ou execute o script no computador e teste estes 4 cenários clássicos:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
              <strong className="text-sky-950 block text-xs mb-1">1. Divisão por Zero</strong>
              <p className="text-[11px] text-sky-800">
                Digite <code>25 ÷ 0 =</code>. Observe a mensagem <em>&quot;Erro: Div por 0&quot;</em> e como ao digitar o próximo número a calculadora se recupera automaticamente.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <strong className="text-emerald-950 block text-xs mb-1">2. Operações Encadeadas</strong>
              <p className="text-[11px] text-emerald-800">
                Digite <code>10 + 20 + 30 =</code> sem apertar o igual no meio. Veja a soma acumulada ocorrendo no visor superior.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-teal-50 border border-teal-200">
              <strong className="text-teal-950 block text-xs mb-1">3. Decimais e Ponto Flutuante</strong>
              <p className="text-[11px] text-teal-800">
                Calcule <code>0.1 + 0.2</code> ou <code>12.5 × 3.4</code>. Note que não é possível inserir dois pontos decimais no mesmo número.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200">
              <strong className="text-cyan-950 block text-xs mb-1">4. Inversão de Sinal e Backspace</strong>
              <p className="text-[11px] text-cyan-800">
                Digite um número, inverta com <code>±</code> e apague dígitos individuais com <code>⌫</code>.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">Análise Didática & Exploração</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">Engenharia de Software</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Seção de Exploração & Compreensão do Projeto
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Explore as respostas técnicas completas para cada um dos quatro eixos fundamentais do código gerado:
        </p>
      </div>

      <div className="p-5 sm:p-6 space-y-3">
        {explorationCards.map((card, idx) => {
          const isOpen = openIndex === idx;
          const Icon = card.icon;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isOpen
                  ? 'border-cyan-400 bg-cyan-50/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isOpen ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {card.question}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {card.summary}
                    </p>
                  </div>
                </div>

                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                  isOpen ? 'rotate-180 text-cyan-600' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-cyan-100/60 animate-in fade-in duration-150">
                  {card.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
