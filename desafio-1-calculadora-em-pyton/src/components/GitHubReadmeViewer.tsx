import React, { useState } from 'react';
import { GITHUB_README_MARKDOWN } from '../data/frutigerAeroData';
import { Copy, Check, Download, FileText, ExternalLink } from 'lucide-react';

export const GitHubReadmeViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GITHUB_README_MARKDOWN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([GITHUB_README_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Documentação para o GitHub</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">README.md</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Documentação pronta para seu repositório
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Formato Markdown pronto para publicação, com badges, instruções de clone, tabela de componentes e licença MIT.
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
                <span className="text-emerald-700">README Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar README.md</span>
          </button>
        </div>
      </div>

      {/* Markdown Preview Container */}
      <div className="p-5 sm:p-6 bg-slate-950 text-slate-100 font-mono text-xs sm:text-[13px] overflow-x-auto max-h-[500px] overflow-y-auto">
        <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
          {GITHUB_README_MARKDOWN}
        </pre>
      </div>
    </div>
  );
};
