import React, { useState } from 'react';
import { Package, Download, Copy, Check, Terminal, ExternalLink, X, ShieldAlert, Cpu } from 'lucide-react';
import { BUILD_EXE_BAT_SCRIPT } from '../data/frutigerAeroData';

interface ExeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExeBuilderModal: React.FC<ExeBuilderModalProps> = ({ isOpen, onClose }) => {
  const [copiedBat, setCopiedBat] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyBat = () => {
    navigator.clipboard.writeText(BUILD_EXE_BAT_SCRIPT);
    setCopiedBat(true);
    setTimeout(() => setCopiedBat(false), 2000);
  };

  const handleDownloadBat = () => {
    const element = document.createElement('a');
    const file = new Blob([BUILD_EXE_BAT_SCRIPT], { type: 'application/x-bat;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'build_exe.bat';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyPyinstallerCmd = () => {
    navigator.clipboard.writeText('pyinstaller --onefile --noconsole --name "AeroCalc2000" main.py');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-sky-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sky-500/20 bg-gradient-to-r from-sky-950 via-slate-900 to-teal-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Compilação Windows</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-mono">PyInstaller .EXE</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Como Gerar o Executável .EXE</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
          
          {/* Quick Option 1: 1-Click BAT */}
          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sky-200 text-sm">
                <span>Método 1: Script Automático (1 Clique)</span>
              </div>
              <button
                onClick={handleDownloadBat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b from-cyan-400 to-sky-600 hover:brightness-110 active:scale-95 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(34,211,238,0.4)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar build_exe.bat</span>
              </button>
            </div>
            <p className="text-slate-400 text-xs">
              Basta colocar o arquivo <code className="text-cyan-300">build_exe.bat</code> na mesma pasta dos arquivos Python e dar dois cliques. Ele roda os testes automatizados, instala o PyInstaller e compila o executável na pasta <code className="text-cyan-300 font-mono">dist/AeroCalc2000.exe</code>.
            </p>
          </div>

          {/* Option 2: Manual command */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm">Método 2: Linha de Comando Manual</h3>
            
            <div className="space-y-2">
              <p className="text-slate-400">1. Instale o PyInstaller via terminal:</p>
              <div className="p-2.5 bg-slate-950 rounded-lg font-mono text-[11px] text-teal-300 border border-slate-800">
                pip install pyinstaller
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-slate-400">2. Execute o comando de compilação sem console (janela limpa):</p>
              <div className="p-2.5 bg-slate-950 rounded-lg font-mono text-[11px] text-cyan-300 border border-slate-800 flex items-center justify-between gap-2">
                <span className="truncate">pyinstaller --onefile --noconsole --name "AeroCalc2000" main.py</span>
                <button
                  onClick={handleCopyPyinstallerCmd}
                  className="shrink-0 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copiar comando"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Flags explanation table */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2 text-[11px]">
              <div className="font-semibold text-slate-200">O que significa cada parâmetro:</div>
              <ul className="space-y-1.5 text-slate-400">
                <li><code className="text-cyan-300 font-bold">--onefile</code>: Agrupa todo o interpretador Python e bibliotecas dentro de um único arquivo executável <code className="text-slate-200">.exe</code> portátil.</li>
                <li><code className="text-cyan-300 font-bold">--noconsole</code>: Oculta a janela preta do prompt de comando (CMD) ao abrir, mostrando puramente a interface visual gráfica Frutiger Aero.</li>
                <li><code className="text-cyan-300 font-bold">--name "AeroCalc2000"</code>: Nome do arquivo final (<code className="text-slate-200">AeroCalc2000.exe</code>).</li>
              </ul>
            </div>
          </div>

          {/* Result location */}
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
            🎉 <strong>Onde fica o arquivo final?</strong> O executável compilado será salvo automaticamente na subpasta <code className="text-white font-mono font-bold">dist/AeroCalc2000.exe</code>. Você pode movê-lo para qualquer lugar ou enviá-lo para qualquer computador com Windows!
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950/80 border-t border-sky-500/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Compatível com Windows 10 e Windows 11</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
