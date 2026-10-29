import React, { useState } from 'react';
import { FolderGit2, Download, Copy, Check, FileCode, FileText, Terminal, X } from 'lucide-react';
import {
  CALCULATOR_CORE_CODE,
  UNITTEST_CODE,
  MAIN_GUI_CODE,
  BUILD_EXE_BAT_SCRIPT,
  STANDALONE_README_MD
} from '../data/frutigerAeroData';

interface ProjectFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectFilesModal: React.FC<ProjectFilesModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('README.md');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const filesMap: Record<string, { content: string; lang: string; desc: string }> = {
    'README.md': {
      content: STANDALONE_README_MD,
      lang: 'markdown',
      desc: 'Documentação explicativa completa formatada para publicação no GitHub.'
    },
    'calculator_core.py': {
      content: CALCULATOR_CORE_CODE,
      lang: 'python',
      desc: 'Motor com as 4 operações matemáticas puras, desacoplado de UI e preparado para testes.'
    },
    'test_calculator.py': {
      content: UNITTEST_CODE,
      lang: 'python',
      desc: 'Suite de testes unitários automatizados cobrindo casos normais e críticos (divisão por zero).'
    },
    'main.py': {
      content: MAIN_GUI_CODE,
      lang: 'python',
      desc: 'Interface gráfica em Tkinter estilizada no padrão Frutiger Aero dos anos 2000.'
    },
    'build_exe.bat': {
      content: BUILD_EXE_BAT_SCRIPT,
      lang: 'bat',
      desc: 'Script de 1 clique para Windows que roda os testes e compila o executável .EXE via PyInstaller.'
    }
  };

  const currentFile = filesMap[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
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
    Object.entries(filesMap).forEach(([name, data]) => {
      handleDownload(name, data.content);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/20 bg-gradient-to-r from-sky-950 via-slate-900 to-teal-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Arquivos do Repositório</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-mono">Python + GitHub</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Estrutura Modular do Projeto</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b from-cyan-400 to-sky-600 hover:brightness-110 active:scale-95 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-xs"
              title="Baixar todos os 5 arquivos individuais"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Todos</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* File Navigator Tabs */}
        <div className="p-3 bg-slate-950/80 border-b border-cyan-500/10 flex items-center gap-2 overflow-x-auto">
          {Object.keys(filesMap).map((fileName) => {
            const isSelected = selectedFile === fileName;
            return (
              <button
                key={fileName}
                onClick={() => { setSelectedFile(fileName); setCopied(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {fileName.endsWith('.py') ? (
                  <FileCode className="w-3.5 h-3.5 text-sky-400" />
                ) : fileName.endsWith('.md') ? (
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>{fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected File Details Bar */}
        <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
          <p className="text-slate-400 text-[11px] truncate">{currentFile.desc}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={() => handleDownload(selectedFile, currentFile.content)}
              className="flex items-center gap-1 px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar {selectedFile}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-950 font-mono text-xs sm:text-[13px] text-slate-200">
          <pre className="text-cyan-300/90 whitespace-pre leading-relaxed">
            {currentFile.content}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-cyan-500/10 flex items-center justify-between text-xs text-slate-400">
          <span>{selectedFile} · Pronto para publicação no repositório GitHub</span>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
