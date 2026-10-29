import React, { useState } from 'react';
import { Download, Sparkles, Terminal, FileText, Code2, ShieldCheck, Laptop, Check } from 'lucide-react';
import { AERO_PYTHON_CODE, TEST_PYTHON_CODE, BUILD_BAT_SCRIPT, GITHUB_README_MARKDOWN } from '../data/frutigerAeroData';

interface HeaderProps {
  activeView: 'calc' | 'tests' | 'exe' | 'readme';
  setActiveView: (view: 'calc' | 'tests' | 'exe' | 'readme') => void;
  onDownloadAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, onDownloadAll }) => {
  const [downloadDropdown, setDownloadDropdown] = useState(false);

  const triggerDownload = (filename: string, content: string, type: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-sky-500/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-15">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveView('calc')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-teal-600 border border-cyan-200/50 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_12px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">
                ✨
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight block">
                  AeroCalc 2000
                </span>
                <span className="text-[10px] text-cyan-400/80 -mt-0.5 block">
                  Edição Frutiger Aero
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveView('calc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'calc'
                  ? 'bg-gradient-to-b from-cyan-400 to-sky-600 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calculadora</span>
            </button>

            <button
              onClick={() => setActiveView('tests')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'tests'
                  ? 'bg-gradient-to-b from-cyan-400 to-sky-600 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Testes Unitários</span>
            </button>

            <button
              onClick={() => setActiveView('exe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'exe'
                  ? 'bg-gradient-to-b from-cyan-400 to-sky-600 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Gerar .EXE</span>
            </button>

            <button
              onClick={() => setActiveView('readme')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'readme'
                  ? 'bg-gradient-to-b from-cyan-400 to-sky-600 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>README.md</span>
            </button>
          </nav>

          {/* Action: Download Files */}
          <div className="relative shrink-0">
            <button
              onClick={() => setDownloadDropdown(!downloadDropdown)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-sky-950 bg-gradient-to-b from-cyan-300 via-sky-300 to-sky-400 rounded-lg hover:brightness-105 active:scale-98 transition-all shadow-[0_0_14px_rgba(56,189,248,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-cyan-100"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Arquivos</span>
            </button>

            {downloadDropdown && (
              <div
                className="absolute right-0 mt-2 w-64 bg-slate-950 border border-sky-400/30 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in text-xs font-mono"
                onMouseLeave={() => setDownloadDropdown(false)}
              >
                <div className="px-2.5 py-1.5 text-[10px] text-slate-400 font-sans uppercase font-bold border-b border-slate-800">
                  Arquivos Prontos para Uso
                </div>
                <button
                  onClick={() => {
                    triggerDownload('calculadora_frutiger_aero.py', AERO_PYTHON_CODE, 'text/x-python');
                    setDownloadDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 hover:bg-sky-950 text-sky-300 rounded-lg flex items-center justify-between transition-colors"
                >
                  <span>calculadora_frutiger_aero.py</span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    triggerDownload('test_calculadora.py', TEST_PYTHON_CODE, 'text/x-python');
                    setDownloadDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 hover:bg-sky-950 text-emerald-300 rounded-lg flex items-center justify-between transition-colors"
                >
                  <span>test_calculadora.py</span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    triggerDownload('compilar_exe.bat', BUILD_BAT_SCRIPT, 'text/plain');
                    setDownloadDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 hover:bg-sky-950 text-amber-300 rounded-lg flex items-center justify-between transition-colors"
                >
                  <span>compilar_exe.bat</span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    triggerDownload('README.md', GITHUB_README_MARKDOWN, 'text/markdown');
                    setDownloadDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 hover:bg-sky-950 text-slate-200 rounded-lg flex items-center justify-between transition-colors"
                >
                  <span>README.md (GitHub)</span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
