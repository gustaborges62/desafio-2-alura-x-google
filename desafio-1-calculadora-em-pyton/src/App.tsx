import React, { useState } from 'react';
import { FrutigerAeroCalculatorUI } from './components/FrutigerAeroCalculatorUI';
import { UnitTestRunnerModal } from './components/UnitTestRunnerModal';
import { ExeBuilderModal } from './components/ExeBuilderModal';
import { ProjectFilesModal } from './components/ProjectFilesModal';
import { ExplorationSection } from './components/ExplorationSection';
import {
  CALCULATOR_CORE_CODE,
  UNITTEST_CODE,
  MAIN_GUI_CODE,
  BUILD_EXE_BAT_SCRIPT,
  STANDALONE_README_MD
} from './data/frutigerAeroData';
import { ShieldCheck, Package, FolderGit2, Download, HelpCircle, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [showUnitTestModal, setShowUnitTestModal] = useState<boolean>(false);
  const [showExeModal, setShowExeModal] = useState<boolean>(false);
  const [showFilesModal, setShowFilesModal] = useState<boolean>(false);
  const [showExploration, setShowExploration] = useState<boolean>(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const downloadFile = (filename: string, content: string) => {
    const mime = filename.endsWith('.py')
      ? 'text/x-python;charset=utf-8'
      : filename.endsWith('.md')
      ? 'text/markdown;charset=utf-8'
      : 'application/x-bat;charset=utf-8';

    const element = document.createElement('a');
    const file = new Blob([content], { type: mime });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadAll = () => {
    downloadFile('calculator_core.py', CALCULATOR_CORE_CODE);
    downloadFile('test_calculator.py', UNITTEST_CODE);
    downloadFile('main.py', MAIN_GUI_CODE);
    downloadFile('build_exe.bat', BUILD_EXE_BAT_SCRIPT);
    downloadFile('README.md', STANDALONE_README_MD);

    setDownloadFeedback('Todos os 5 arquivos foram baixados com sucesso!');
    setTimeout(() => setDownloadFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-slate-950 to-teal-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Background Frutiger Aero Atmosphere */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Glossy Top Glass Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-sky-400/20 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark (Zone 1) */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-600 border border-cyan-200/60 flex items-center justify-center text-white font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)] text-sm">
              ✨
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight drop-shadow-xs">AeroCalc 2000</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] text-cyan-300 font-mono bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                Python 100% Puro
              </span>
            </div>
          </div>

          {/* Quick Actions (Zone 2 & 3) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowUnitTestModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900/80 text-cyan-300 border border-cyan-400/30 text-xs font-semibold transition-all hover:scale-102 active:scale-98 shadow-xs"
              title="Executar bateria de testes automatizados com o framework nativo unittest"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Testes de Precisão</span>
            </button>

            <button
              onClick={() => setShowExeModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900/80 text-sky-200 border border-sky-400/30 text-xs font-semibold transition-all hover:scale-102 active:scale-98 shadow-xs"
              title="Ver comando e script para compilar em arquivo executável .EXE"
            >
              <Package className="w-3.5 h-3.5 text-sky-400" />
              <span>Gerar .EXE</span>
            </button>

            <button
              onClick={() => setShowFilesModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900/80 text-emerald-200 border border-emerald-400/30 text-xs font-semibold transition-all hover:scale-102 active:scale-98 shadow-xs"
              title="Ver e copiar arquivos separados (main.py, core, unittest e README)"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Arquivos</span>
              <span>README.md</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-b from-cyan-300 via-sky-300 to-sky-400 text-slate-950 rounded-lg text-xs font-bold hover:brightness-105 active:scale-98 transition-all shadow-[0_0_12px_rgba(56,189,248,0.4)] border border-cyan-100"
              title="Baixar pacote completo de arquivos para o seu computador"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Baixar Pacote</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Focus: Pure Frutiger Aero Calculator Interface */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        
        {/* Download notification toast if triggered */}
        {downloadFeedback && (
          <div className="mb-4 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{downloadFeedback}</span>
          </div>
        )}

        {/* The Star of the Interface: The Frutiger Aero Calculator */}
        <div className="w-full max-w-[420px] transition-all">
          <FrutigerAeroCalculatorUI />
        </div>

        {/* Discreet bottom toggle to expand the exploration section */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowExploration(!showExploration)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-sky-400/30 text-xs font-medium text-sky-200 hover:text-white hover:bg-slate-800 transition-all shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showExploration ? 'Ocultar Seção de Exploração' : 'Ver Perguntas da Seção de Exploração'}</span>
          </button>
        </div>

        {/* Collapsible Exploration Section */}
        {showExploration && (
          <div className="w-full max-w-4xl mt-6 animate-in fade-in duration-200">
            <ExplorationSection />
          </div>
        )}
      </main>

      {/* Modals */}
      <UnitTestRunnerModal
        isOpen={showUnitTestModal}
        onClose={() => setShowUnitTestModal(false)}
      />

      <ExeBuilderModal
        isOpen={showExeModal}
        onClose={() => setShowExeModal(false)}
      />

      <ProjectFilesModal
        isOpen={showFilesModal}
        onClose={() => setShowFilesModal(false)}
      />

      {/* Clean Minimal Footer */}
      <footer className="border-t border-sky-400/10 bg-slate-950/70 py-4 text-center text-xs text-slate-500">
        AeroCalc 2000 · Feito estritamente em Python puro com Tkinter e suite nativa unittest
      </footer>
    </div>
  );
}
