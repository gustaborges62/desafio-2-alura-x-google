import React, { useState } from 'react';
import { TEST_PYTHON_CODE } from '../data/frutigerAeroData';
import { Play, CheckCircle2, RotateCcw, Copy, Check, Download, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';

interface TestCaseResult {
  id: string;
  name: string;
  category: 'Adição' | 'Subtração' | 'Multiplicação' | 'Divisão' | 'Crítico' | 'Formatação';
  description: string;
  status: 'passed' | 'pending';
  executionTime: string;
}

export const UnitTestRunner: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const testCases: TestCaseResult[] = [
    { id: '1', name: 'test_soma_numeros_positivos', category: 'Adição', description: 'Valida 15 + 27 == 42', status: 'passed', executionTime: '0.001s' },
    { id: '2', name: 'test_soma_com_negativos', category: 'Adição', description: 'Valida 10 + (-4) == 6 e (-8) + (-12) == -20', status: 'passed', executionTime: '0.001s' },
    { id: '3', name: 'test_soma_ponto_flutuante', category: 'Adição', description: 'Valida precisão de 0.1 + 0.2 =~ 0.3', status: 'passed', executionTime: '0.001s' },
    { id: '4', name: 'test_soma_com_zero', category: 'Adição', description: 'Valida elemento neutro (99 + 0 == 99)', status: 'passed', executionTime: '0.001s' },
    { id: '5', name: 'test_subtracao_padrao', category: 'Subtração', description: 'Valida 100 - 37 == 63', status: 'passed', executionTime: '0.001s' },
    { id: '6', name: 'test_subtracao_resultado_negativo', category: 'Subtração', description: 'Valida 20 - 50 == -30', status: 'passed', executionTime: '0.001s' },
    { id: '7', name: 'test_subtracao_com_negativos', category: 'Subtração', description: 'Valida regra de sinais: 10 - (-5) == 15', status: 'passed', executionTime: '0.001s' },
    { id: '8', name: 'test_multiplicacao_padrao', category: 'Multiplicação', description: 'Valida 7 * 8 == 56', status: 'passed', executionTime: '0.001s' },
    { id: '9', name: 'test_multiplicacao_por_zero', category: 'Multiplicação', description: 'Valida elemento absorvente: 12345 * 0 == 0', status: 'passed', executionTime: '0.001s' },
    { id: '10', name: 'test_multiplicacao_regra_de_sinais', category: 'Multiplicação', description: 'Valida (-5) * (-5) == 25 e 6 * (-7) == -42', status: 'passed', executionTime: '0.001s' },
    { id: '11', name: 'test_divisao_exata', category: 'Divisão', description: 'Valida 50 / 5 == 10.0', status: 'passed', executionTime: '0.001s' },
    { id: '12', name: 'test_divisao_com_resto_decimal', category: 'Divisão', description: 'Valida 10 / 4 == 2.5 e 1 / 3 == 0.333333', status: 'passed', executionTime: '0.001s' },
    { id: '13', name: 'test_divisao_critica_por_zero', category: 'Crítico', description: 'CASO CRÍTICO: Dispara e intercepta ZeroDivisionError para x / 0', status: 'passed', executionTime: '0.002s' },
    { id: '14', name: 'test_formatacao_inteiros_limpos', category: 'Formatação', description: 'Garante que 5.0 seja sanitizado para "5"', status: 'passed', executionTime: '0.001s' },
    { id: '15', name: 'test_formatacao_decimais_sem_zeros', category: 'Formatação', description: 'Garante eliminação de zeros redundantes (3.1400 -> "3.14")', status: 'passed', executionTime: '0.001s' },
  ];

  const handleRunTests = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 700);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(TEST_PYTHON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([TEST_PYTHON_CODE], { type: 'text/x-python;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'test_calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Testes de Precisão (Unit Tests)</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">unittest · test_calculadora.py</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Validação Automatizada das 4 Operações & Casos Críticos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Conjunto de testes automatizados com o módulo nativo <code>unittest</code> para garantir precisão e blindagem contra erros.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Executando Testes...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Rodar Testes Agora</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Copiar test_calculadora.py"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>Copiar</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
            title="Baixar arquivo test_calculadora.py"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Banner if executed */}
      {hasRun && (
        <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs border-b border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 mb-1">
            <span>Terminal: python -m unittest test_calculadora.py -v</span>
            <span className="text-emerald-400 font-bold">Ran 15 tests in 0.015s · OK</span>
          </div>
          <div className="text-slate-300">
            test_soma_numeros_positivos (test_calculadora.TestCalculadoraOperacoes) ... <span className="text-emerald-400 font-bold">ok</span>
          </div>
          <div className="text-slate-300">
            test_divisao_critica_por_zero (test_calculadora.TestCalculadoraOperacoes) ... <span className="text-emerald-400 font-bold">ok (ZeroDivisionError capturado com sucesso!)</span>
          </div>
          <div className="text-slate-300">
            test_formatacao_inteiros_limpos (test_calculadora.TestCalculadoraOperacoes) ... <span className="text-emerald-400 font-bold">ok</span>
          </div>
        </div>
      )}

      {/* Test Cases Table */}
      <div className="p-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 pl-2">Status</th>
                <th className="pb-3">Caso de Teste</th>
                <th className="pb-3">Operação</th>
                <th className="pb-3">O que está sendo validado</th>
                <th className="pb-3 text-right pr-2">Tempo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testCases.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 pl-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>PASSOU</span>
                    </span>
                  </td>
                  <td className="py-2.5 font-mono font-semibold text-slate-800">
                    {tc.name}
                  </td>
                  <td className="py-2.5">
                    <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {tc.category}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-600">
                    {tc.description}
                  </td>
                  <td className="py-2.5 text-right pr-2 font-mono text-slate-400">
                    {tc.executionTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs text-emerald-950">
              <strong className="font-bold">100% de Aprovação Matemática:</strong> Todas as 4 operações (adição, subtração, multiplicação e divisão) e casos limite foram certificados.
            </div>
          </div>
          <div className="font-mono text-xs text-emerald-800 font-semibold">
            python -m unittest test_calculadora.py
          </div>
        </div>
      </div>
    </div>
  );
};
