import React, { useState } from 'react';
import { BUILD_BAT_SCRIPT } from '../data/frutigerAeroData';
import { Download, Copy, Check, Terminal, Laptop, ShieldCheck, FileCode, CheckCircle2 } from 'lucide-react';

export const ExeBuilderGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [copiedBat, setCopiedBat] = useState<boolean>(false);

  const pyinstallerCommand = 'pip install pyinstaller && pyinstaller --noconsole --onefile --name "CalculadoraFrutigerAero" calculadora_frutiger_aero.py';

  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText(pyinstallerCommand);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyBat = async () => {
    try {
      await navigator.clipboard.writeText(BUILD_BAT_SCRIPT);
      setCopiedBat(true);
      setTimeout(() => setCopiedBat(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadBat = () => {
    const element = document.createElement('a');
    const file = new Blob([BUILD_BAT_SCRIPT], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'compilar_exe.bat';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Empacotamento Desktop Windows</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">PyInstaller · .exe Standalone</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Como Gerar e Usar a Calculadora como Executável (.exe)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Crie um arquivo <code>.exe</code> independente que roda em qualquer computador Windows com dois cliques, mesmo sem Python instalado.
          </p>
        </div>

        <button
          onClick={handleDownloadBat}
          className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Baixar compilar_exe.bat</span>
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Method 1: Automated Script */}
        <div className="p-4 sm:p-5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3">
          <div className="flex items-center gap-2 text-sky-950 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>Método 1: Script Automatizado de 1 Clique (Recomendado)</span>
          </div>
          <p className="text-xs text-sky-900/80 leading-relaxed">
            Baixe o arquivo <code>compilar_exe.bat</code> e coloque-o na mesma pasta onde está o <code>calculadora_frutiger_aero.py</code> e o <code>test_calculadora.py</code>. Depois, basta dar <strong>dois cliques</strong> nele!
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadBat}
              className="px-3 py-1.5 bg-sky-600 text-white text-xs font-bold rounded hover:bg-sky-700 transition-colors"
            >
              Baixar compilar_exe.bat
            </button>
            <button
              onClick={handleCopyBat}
              className="px-3 py-1.5 bg-white border border-sky-300 text-sky-800 text-xs font-medium rounded hover:bg-sky-50 transition-colors"
            >
              {copiedBat ? 'Script Copiado!' : 'Ver Código do Script'}
            </button>
          </div>
        </div>

        {/* Method 2: Command Line */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Método 2: Linha de Comando Manual (Prompt de Comando ou PowerShell)
          </h3>
          <p className="text-xs text-slate-600">
            Abra o terminal na pasta do projeto e execute este comando único:
          </p>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs flex items-center justify-between text-sky-300">
            <span className="truncate pr-4">{pyinstallerCommand}</span>
            <button
              onClick={handleCopyCmd}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs shrink-0 flex items-center gap-1.5"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Anatomy of the PyInstaller flags */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            O que cada parâmetro do comando faz:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <code className="text-sky-700 font-bold block mb-1">--onefile</code>
              <p className="text-slate-600">
                Empacota o interpretador Python, a biblioteca gráfica Tkinter e todo o código em um <strong>único arquivo executável portátil</strong>.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <code className="text-sky-700 font-bold block mb-1">--noconsole</code>
              <p className="text-slate-600">
                Oculta a tela preta do Prompt de Comando (CMD). A aplicação abre diretamente como uma <strong>janela de aplicativo nativo profissional</strong>.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <code className="text-sky-700 font-bold block mb-1">dist/Calculadora...exe</code>
              <p className="text-slate-600">
                O PyInstaller gera a pasta <code>dist/</code> com o seu executável pronto para ser compartilhado por pendrive ou enviado para qualquer pessoa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
