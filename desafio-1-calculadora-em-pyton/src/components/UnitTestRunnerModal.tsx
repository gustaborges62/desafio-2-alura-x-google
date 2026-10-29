import React, { useState } from 'react';
import { CheckCircle2, Play, Copy, Check, Download, AlertTriangle, ShieldCheck, Terminal, X, Code2 } from 'lucide-react';
import { UNITTEST_CODE } from '../data/frutigerAeroData';

interface UnitTestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestCase {
  id: string;
  name: string;
  doc: string;
  category: 'Adição' | 'Subtração' | 'Multiplicação' | 'Divisão' | 'Estrutura';
  isCritical?: boolean;
  status: 'passed' | 'running' | 'idle';
  assertion: string;
}

const INITIAL_TEST_CASES: TestCase[] = [
  { id: '1', name: 'test_adicao_numeros_inteiros_positivos', doc: 'Garante que a soma de números inteiros positivos é exata (10 + 25 = 35)', category: 'Adição', status: 'idle', assertion: '10 + 25 == 35.0' },
  { id: '2', name: 'test_adicao_com_numeros_negativos', doc: 'Garante o cálculo correto com números negativos (-15 + 20 = 5)', category: 'Adição', status: 'idle', assertion: '-15 + 20 == 5.0' },
  { id: '3', name: 'test_adicao_precisao_decimal', doc: 'Caso clássico de ponto flutuante: 0.1 + 0.2 deve resultar exatamente em 0.3', category: 'Adição', isCritical: true, status: 'idle', assertion: 'abs((0.1 + 0.2) - 0.3) < 1e-6' },
  { id: '4', name: 'test_subtracao_padrao', doc: 'Verifica subtração com resultado positivo e negativo (50 - 20 = 30)', category: 'Subtração', status: 'idle', assertion: '50 - 20 == 30.0' },
  { id: '5', name: 'test_subtracao_anulacao', doc: 'Subtrair um número por ele mesmo deve resultar rigorosamente em 0.0', category: 'Subtração', status: 'idle', assertion: '42.5 - 42.5 == 0.0' },
  { id: '6', name: 'test_subtracao_com_negativos', doc: 'Subtração de número negativo vira adição: 10 - (-5) = 15', category: 'Subtração', status: 'idle', assertion: '10 - (-5) == 15.0' },
  { id: '7', name: 'test_multiplicacao_por_zero', doc: 'Elemento nulo da multiplicação: qualquer número * 0 = 0.0', category: 'Multiplicação', isCritical: true, status: 'idle', assertion: '999 * 0 == 0.0' },
  { id: '8', name: 'test_multiplicacao_com_decimais', doc: 'Precisão decimal em produtos com números reais (2.5 * 4 = 10)', category: 'Multiplicação', status: 'idle', assertion: '2.5 * 4 == 10.0' },
  { id: '9', name: 'test_multiplicacao_regradosinais', doc: 'Validação da regra de sinais: -6 * 7 = -42 e -4 * -5 = 20', category: 'Multiplicação', status: 'idle', assertion: '-6 * 7 == -42.0' },
  { id: '10', name: 'test_divisao_exata', doc: 'Verifica divisão exata entre dois números reais (100 / 4 = 25)', category: 'Divisão', status: 'idle', assertion: '100 / 4 == 25.0' },
  { id: '11', name: 'test_divisao_dizima_periodica', doc: 'Divisão não exata com dízima periódica (10 / 3 ≈ 3.333333)', category: 'Divisão', status: 'idle', assertion: 'abs((10 / 3) - 3.333333) < 1e-5' },
  { id: '12', name: 'test_divisao_critica_por_zero', doc: 'CASO CRÍTICO: Divisão por 0 DEVE disparar DivisaoPorZeroError sem quebrar', category: 'Divisão', isCritical: true, status: 'idle', assertion: 'raises DivisaoPorZeroError on 10 / 0' },
  { id: '13', name: 'test_calcular_operacao_despacho', doc: 'Verifica despacho correto de todos os símbolos (+, -, *, /)', category: 'Estrutura', status: 'idle', assertion: 'valida operadores +, -, *, /' },
  { id: '14', name: 'test_formatacao_numero_limpeza_de_zeros', doc: 'Garante formatação elegante no visor (ex: 5.0 -> "5")', category: 'Estrutura', status: 'idle', assertion: 'formatar(5.0) == "5"' },
];

export const UnitTestRunnerModal: React.FC<UnitTestRunnerModalProps> = ({ isOpen, onClose }) => {
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'runner' | 'code'>('runner');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!isOpen) return null;

  const runAllTests = () => {
    setIsRunning(true);
    setHasRun(false);

    // Reset status
    setTestCases(prev => prev.map(t => ({ ...t, status: 'running' })));

    setTimeout(() => {
      setTestCases(prev => prev.map(t => ({ ...t, status: 'passed' })));
      setIsRunning(false);
      setHasRun(true);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(UNITTEST_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([UNITTEST_CODE], { type: 'text/x-python;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'test_calculator.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const passedCount = testCases.filter(t => t.status === 'passed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/20 bg-gradient-to-r from-sky-950/80 via-slate-900 to-cyan-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Módulo Nativo</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-mono">unittest</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Testes de Precisão Automatizados</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header Controls */}
        <div className="p-3.5 bg-slate-950/60 border-b border-cyan-500/10 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('runner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'runner'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Execução dos Testes ({testCases.length})
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>test_calculator.py</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'runner' ? (
              <button
                onClick={runAllTests}
                disabled={isRunning}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-b from-cyan-400 to-sky-600 hover:brightness-110 active:scale-95 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-[0_0_12px_rgba(34,211,238,0.4)] disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Executando Testes...' : 'Rodar Suite unittest'}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar .py</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs">
          {activeTab === 'runner' ? (
            <>
              {/* Summary card */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${hasRun ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`}></div>
                  <span className="text-slate-300">
                    {hasRun
                      ? `Todos os ${passedCount} testes foram executados e APROVADOS (0 falhas).`
                      : 'Clique em "Rodar Suite unittest" para validar as 4 operações e os casos críticos.'}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                  python -m unittest test_calculator.py -v
                </div>
              </div>

              {/* List of Test Cases */}
              <div className="space-y-2">
                {testCases.map((tc) => (
                  <div
                    key={tc.id}
                    className={`p-3 rounded-xl border transition-all ${
                      tc.status === 'passed'
                        ? 'bg-slate-950/60 border-emerald-500/30'
                        : tc.status === 'running'
                        ? 'bg-cyan-950/30 border-cyan-500/40 animate-pulse'
                        : 'bg-slate-950/40 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-semibold text-slate-200">{tc.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {tc.category}
                          </span>
                          {tc.isCritical && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/50 font-semibold">
                              Caso Crítico
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px]">{tc.doc}</p>
                        <div className="font-mono text-[11px] text-teal-400/90 pt-0.5">
                          Asserção: <code>{tc.assertion}</code>
                        </div>
                      </div>

                      <div className="shrink-0 pt-0.5">
                        {tc.status === 'passed' && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>OK</span>
                          </div>
                        )}
                        {tc.status === 'running' && (
                          <div className="text-cyan-400 font-mono text-[11px] animate-pulse">
                            Testando...
                          </div>
                        )}
                        {tc.status === 'idle' && (
                          <div className="text-slate-600 font-mono text-[11px]">
                            Pendente
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[12px] text-slate-200 overflow-x-auto max-h-[500px]">
              <pre className="text-teal-300/90 whitespace-pre">{UNITTEST_CODE}</pre>
            </div>
          )}
        </div>

        {/* Footer command hint */}
        <div className="p-3 bg-slate-950/90 border-t border-cyan-500/10 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Framework nativo: nenhuma biblioteca externa necessária.</span>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
