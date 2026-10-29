import React, { useState } from 'react';
import { Copy, Check, Download, Info, Code2, ArrowDownCircle, BookOpen } from 'lucide-react';
import { BASIC_PYTHON_CODE, LOOP_PYTHON_CODE } from '../data/pythonCode';

interface CodeViewerProps {
  onDownload: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onDownload }) => {
  const [selectedVersion, setSelectedVersion] = useState<'basic' | 'loop'>('basic');
  const [copied, setCopied] = useState(false);
  const [activeNoteLine, setActiveNoteLine] = useState<number | null>(null);

  const activeCode = selectedVersion === 'basic' ? BASIC_PYTHON_CODE : LOOP_PYTHON_CODE;
  const lines = activeCode.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const getLineAnnotation = (lineNum: number, text: string): string | null => {
    if (selectedVersion === 'basic') {
      if (text.includes('def somar(a, b):')) return 'Aqui definimos a função somar com 2 parâmetros: a e b. Ela só roda quando chamada.';
      if (text.includes('return a + b')) return 'O comando "return" devolve o resultado da conta para quem chamou a função.';
      if (text.includes('if b == 0:')) return 'Prevenção de erro: o divisor nunca pode ser 0, senão o programa travaria!';
      if (text.includes('opcao = input(')) return 'A função input() aguarda o usuário digitar uma opção no teclado.';
      if (text.includes('float(input(')) return 'O float() transforma o texto digitado pelo usuário em número real (com decimais).';
      if (text.includes('try:')) return 'O bloco try/except impede o programa de fechar se o usuário digitar letras no lugar de números.';
      if (text.includes('if opcao == \'1\':')) return 'Estrutura condicional que avalia a escolha do usuário e chama a função correta.';
      if (text.includes('if __name__ == "__main__":')) return 'Boas práticas do Python: só roda se o arquivo for executado diretamente como script principal.';
    } else {
      if (text.includes('while True:')) return 'Cria um loop infinito que mantém a calculadora aberta até o usuário digitar 0.';
      if (text.includes('break')) return 'O comando "break" interrompe imediatamente o loop e encerra o programa com elegância.';
      if (text.includes('continue')) return 'O "continue" pula para o início do loop sem executar o restante das instruções.';
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top action bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Arquivo Python</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">calculadora.py</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {selectedVersion === 'basic' ? 'Versão Didática Básica (Recomendada)' : 'Versão Contínua (com Repetição while)'}
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Version Switcher */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-lg text-xs font-medium">
            <button
              onClick={() => { setSelectedVersion('basic'); setActiveNoteLine(null); }}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedVersion === 'basic' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Versão Inicial
            </button>
            <button
              onClick={() => { setSelectedVersion('loop'); setActiveNoteLine(null); }}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedVersion === 'loop' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Com Loop (while)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap"
            title="Copiar código para área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors shadow-2xs whitespace-nowrap"
            title="Baixar arquivo calculadora.py"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Tutor Hint Banner */}
      <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-100 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold">Dica do Tutor:</strong> Clique em qualquer linha marcada com{' '}
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mx-1 align-middle"></span> para ver a explicação didática daquele comando específico.
        </p>
      </div>

      {/* Code Container */}
      <div className="relative font-mono text-xs sm:text-[13px] bg-slate-950 text-slate-100 overflow-x-auto p-4 sm:p-6 max-h-[640px] overflow-y-auto">
        <div className="min-w-[620px]">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const annotation = getLineAnnotation(lineNum, line);
            const isComment = line.trim().startsWith('#');
            const isDocString = line.trim().startsWith('"""') || line.trim().endsWith('"""');
            const isKeyword = /^\s*(def|return|if|elif|else|try|except|while|break|continue|import|isinstance)\b/.test(line);
            const isSpecial = line.includes('__name__');
            const isSelected = activeNoteLine === lineNum;

            return (
              <div key={lineNum} className="group">
                <div
                  onClick={() => annotation && setActiveNoteLine(isSelected ? null : lineNum)}
                  className={`flex items-start py-0.5 px-2 rounded transition-colors ${
                    annotation ? 'cursor-pointer hover:bg-slate-800/80' : ''
                  } ${isSelected ? 'bg-amber-950/70 border border-amber-600/50' : ''}`}
                >
                  {/* Line Number */}
                  <span className="w-8 shrink-0 select-none text-slate-600 text-right pr-4 font-mono text-xs">
                    {lineNum}
                  </span>

                  {/* Indicator if has annotation */}
                  <span className="w-3 shrink-0 text-center select-none">
                    {annotation && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                  </span>

                  {/* Code Line with Simple Syntax Tinting */}
                  <span
                    className={`flex-1 whitespace-pre ${
                      isComment
                        ? 'text-emerald-400/90 italic'
                        : isDocString
                        ? 'text-teal-300 italic'
                        : isKeyword
                        ? 'text-sky-300 font-semibold'
                        : isSpecial
                        ? 'text-purple-300'
                        : 'text-slate-200'
                    }`}
                  >
                    {line || ' '}
                  </span>
                </div>

                {/* Inline Annotation Box if active */}
                {isSelected && annotation && (
                  <div className="my-1.5 ml-12 mr-4 p-3 bg-amber-900/40 border border-amber-500/40 rounded-lg text-amber-200 text-xs font-sans animate-in fade-in duration-150">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-amber-300 shrink-0">Explicação:</span>
                      <span>{annotation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Code footer stats */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-3">
          <span>{lines.length} linhas de código</span>
          <span>·</span>
          <span>Sintaxe limpa PEP 8</span>
          <span>·</span>
          <span>Compatível com Python 3.6+</span>
        </div>
        <div className="text-slate-400">
          Dica: Salve como <code className="text-slate-700 bg-slate-200/60 px-1 rounded font-mono">calculadora.py</code>
        </div>
      </div>
    </div>
  );
};
