import React, { useState } from 'react';
import { AERO_PYTHON_CODE } from '../data/frutigerAeroData';
import { Copy, Check, Download, Code2, Sparkles, Terminal } from 'lucide-react';

export const FrutigerAeroCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AERO_PYTHON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([AERO_PYTHON_CODE], { type: 'text/x-python;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora_frutiger_aero.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lines = AERO_PYTHON_CODE.split('\n');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">Código Python Completo</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">calculadora_frutiger_aero.py</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Código Gráfico em Python & Tkinter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Utiliza a biblioteca nativa Tkinter com renderização vetorial de botões convexos glossy e controle de 4 operações.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Código Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="bg-slate-950 text-slate-100 font-mono text-xs sm:text-[13px] p-4 sm:p-6 max-h-[580px] overflow-y-auto overflow-x-auto">
        <div className="min-w-[640px]">
          {lines.map((line: string, idx: number) => {
            const lineNum = idx + 1;
            const isComment = line.trim().startsWith('#') || line.trim().startsWith('"""') || line.trim().endsWith('"""');
            const isKeyword = /^\s*(class|def|return|if|elif|else|try|except|import|from|super)\b/.test(line);
            const isSelf = line.includes('self.');

            return (
              <div key={lineNum} className="flex items-start py-0.5 hover:bg-slate-900/80 px-2 rounded">
                <span className="w-10 select-none text-slate-600 text-right pr-4 font-mono text-xs shrink-0">
                  {lineNum}
                </span>
                <span
                  className={`flex-1 whitespace-pre ${
                    isComment
                      ? 'text-emerald-400/90 italic'
                      : isKeyword
                      ? 'text-sky-300 font-semibold'
                      : isSelf
                      ? 'text-teal-200'
                      : 'text-slate-200'
                  }`}
                >
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>{lines.length} linhas de código Python estruturado</span>
        <span className="font-mono text-slate-600">Zero dependências externas (Tkinter padrão)</span>
      </div>
    </div>
  );
};
