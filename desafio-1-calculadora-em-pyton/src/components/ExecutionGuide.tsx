import React, { useState } from 'react';
import { Terminal, Laptop, Globe, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

export const ExecutionGuide: React.FC = () => {
  const [platform, setPlatform] = useState<'windows' | 'mac_linux' | 'vscode' | 'online'>('windows');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Passo a Passo Prático</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">Execução Local</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Como rodar a calculadora no seu computador
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Escolha seu sistema operacional ou editor preferido para ver as instruções rápidas:
        </p>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="p-4 bg-slate-100/70 border-b border-slate-200 flex flex-wrap gap-2 text-xs font-medium">
        <button
          onClick={() => setPlatform('windows')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            platform === 'windows' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🪟 Windows (CMD / PowerShell)</span>
        </button>

        <button
          onClick={() => setPlatform('mac_linux')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            platform === 'mac_linux' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🍎 macOS & 🐧 Linux</span>
        </button>

        <button
          onClick={() => setPlatform('vscode')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            platform === 'vscode' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>💻 Visual Studio Code</span>
        </button>

        <button
          onClick={() => setPlatform('online')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            platform === 'online' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🌐 No Navegador (Sem instalar)</span>
        </button>
      </div>

      {/* Guide Content */}
      <div className="p-5 sm:p-7 space-y-6">
        {platform === 'windows' && (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Certifique-se de ter o Python instalado</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Acesse o site oficial <strong className="text-slate-800">python.org/downloads</strong> e baixe a versão recomendada.
                </p>
                <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-900">
                  ⚠️ <strong>Atenção Crucial no Windows:</strong> Na primeira tela do instalador, marque obrigatoriamente a caixinha{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">Add python.exe to PATH</code> antes de clicar em Install Now. Isso permite rodar o comando python em qualquer pasta!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Salve o arquivo do código</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clique no botão &quot;Baixar .py&quot; no topo desta página ou crie um arquivo no Bloco de Notas, cole o código e salve com o nome exato de{' '}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-semibold text-slate-800">calculadora.py</code> na sua pasta de Downloads ou Documentos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Abra o Prompt de Comando (CMD) e execute</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  Aperte <kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-[11px] font-mono">Windows + R</kbd>, digite <kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-[11px] font-mono">cmd</kbd> e tecle Enter. Em seguida, navegue até a pasta onde salvou o arquivo:
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 bg-slate-950 text-slate-100 rounded-lg flex items-center justify-between">
                    <span>cd Downloads</span>
                    <button
                      onClick={() => copyToClipboard('cd Downloads', 'cd')}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copiar comando"
                    >
                      {copiedCmd === 'cd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-950 text-emerald-400 rounded-lg flex items-center justify-between">
                    <span>python calculadora.py</span>
                    <button
                      onClick={() => copyToClipboard('python calculadora.py', 'py')}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copiar comando"
                    >
                      {copiedCmd === 'py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-500">
                  (Caso o comando <code>python</code> dê erro, tente digitar <code>py calculadora.py</code>)
                </p>
              </div>
            </div>
          </div>
        )}

        {platform === 'mac_linux' && (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Abra o Terminal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No Mac: abra o Spotlight (<kbd className="bg-slate-100 border border-slate-300 px-1 rounded text-[11px] font-mono">Cmd + Barra de Espaço</kbd>) e digite <code className="font-mono">Terminal</code>. No Linux: abra o atalho <kbd className="bg-slate-100 border border-slate-300 px-1 rounded text-[11px] font-mono">Ctrl + Alt + T</kbd>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Navegue até o arquivo e execute com python3</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  No macOS e na maioria das distribuições Linux, o Python 3 é chamado pelo comando <code className="font-mono font-bold">python3</code>:
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 bg-slate-950 text-slate-100 rounded-lg flex items-center justify-between">
                    <span>cd ~/Downloads</span>
                    <button
                      onClick={() => copyToClipboard('cd ~/Downloads', 'cd_mac')}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedCmd === 'cd_mac' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-950 text-emerald-400 rounded-lg flex items-center justify-between">
                    <span>python3 calculadora.py</span>
                    <button
                      onClick={() => copyToClipboard('python3 calculadora.py', 'py3')}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedCmd === 'py3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {platform === 'vscode' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Usando o VS Code (Ambiente Recomendado para Desenvolvedores)</h3>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
              <li>Abra o VS Code e vá em <strong>File &gt; Open Folder</strong> na pasta onde você guardou o <code className="font-mono">calculadora.py</code>.</li>
              <li>Instale a extensão oficial <strong>Python</strong> (da Microsoft) na aba de Extensões (<kbd className="bg-slate-100 border px-1 rounded font-mono">Ctrl + Shift + X</kbd>).</li>
              <li>Abra o arquivo <code className="font-mono">calculadora.py</code> no editor.</li>
              <li>Clique no botão <strong>▶️ Executar (Run Python File)</strong> localizado no canto superior direito da janela do VS Code.</li>
              <li>O terminal integrado abrirá na parte inferior e você poderá interagir diretamente com a calculadora digitando os números!</li>
            </ol>
          </div>
        )}

        {platform === 'online' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Quer testar agora sem instalar absolutamente nada?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Você pode usar ambientes de nuvem gratuitos diretamente no seu navegador:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Google Colab</h4>
                  <p className="text-slate-500 mb-3">Notebook Python gratuito do Google executado na nuvem.</p>
                </div>
                <a
                  href="https://colab.research.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-700 font-semibold hover:text-amber-800"
                >
                  <span>Abrir Google Colab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Replit / Programiz</h4>
                  <p className="text-slate-500 mb-3">Compilador online com console interativo completo.</p>
                </div>
                <a
                  href="https://www.programiz.com/python-programming/online-compiler/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-700 font-semibold hover:text-amber-800"
                >
                  <span>Abrir Compilador Online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting Box */}
        <div className="pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Problemas comuns de primeira viagem e como resolver:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-800 block mb-1">
                &quot;&apos;python&apos; não é reconhecido como um comando interno&quot;
              </strong>
              <p className="text-slate-600">
                Significa que o Python foi instalado sem a opção &quot;Add Python to PATH&quot;. Reinstale o instalador do Python e lembre-se de marcar essa caixinha na primeira tela!
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-800 block mb-1">
                &quot;IndentationError: unexpected indent&quot;
              </strong>
              <p className="text-slate-600">
                Ocorre se você misturar espaços com a tecla Tab ou desalinhar os 4 espaços das funções e blocos <code>if</code>. Mantenha sempre o alinhamento padrão de 4 espaços.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
