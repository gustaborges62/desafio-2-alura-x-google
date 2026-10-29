import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, AlertTriangle, Terminal as TerminalIcon, Cpu, HelpCircle } from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const InteractiveTerminal: React.FC = () => {
  // Simulator state
  const [stage, setStage] = useState<'idle' | 'input_op' | 'input_n1' | 'input_n2' | 'finished'>('idle');
  const [selectedOp, setSelectedOp] = useState<string>('1');
  const [num1Str, setNum1Str] = useState<string>('10');
  const [num2Str, setNum2Str] = useState<string>('5');
  
  // Execution logs
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: '1', type: 'system', text: 'Ambiente Python 3.12 pronto para execução.' },
    { id: '2', type: 'system', text: 'Clique em "Iniciar Execução" ou escolha um cenário pré-configurado abaixo.' },
  ]);

  // Memory inspect state
  const [variables, setVariables] = useState<{
    opcao?: string;
    num1?: number | string;
    num2?: number | string;
    resultado?: number | string;
    funcao?: string;
  }>({});

  const [activeStepText, setActiveStepText] = useState<string>('Aguardando início do programa.');

  const handleStart = () => {
    setLogs([
      { id: '1', type: 'system', text: 'Executando: python calculadora.py' },
      { id: '2', type: 'output', text: '================================' },
      { id: '3', type: 'output', text: '      CALCULADORA EM PYTHON     ' },
      { id: '4', type: 'output', text: '================================' },
      { id: '5', type: 'output', text: 'Selecione a operação desejada:' },
      { id: '6', type: 'output', text: '1 - Adição (+)' },
      { id: '7', type: 'output', text: '2 - Subtração (-)' },
      { id: '8', type: 'output', text: '3 - Multiplicação (*)' },
      { id: '9', type: 'output', text: '4 - Divisão (/)' },
      { id: '10', type: 'output', text: '--------------------------------' },
      { id: '11', type: 'system', text: 'Aguardando digitação da opção (input)...' },
    ]);
    setStage('input_op');
    setVariables({});
    setActiveStepText('Etapa 1: O programa exibiu o menu e aguarda a variável "opcao" ser preenchida via input().');
  };

  const handleConfirmOp = (opVal: string) => {
    setSelectedOp(opVal);
    const newLogs: TerminalLog[] = [
      ...logs,
      { id: String(Date.now()), type: 'input', text: `Digite o número da operação (1/2/3/4): ${opVal}` }
    ];

    if (!['1', '2', '3', '4'].includes(opVal)) {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'error',
        text: 'Opção inválida! Escolha um número entre 1 e 4.'
      });
      setLogs(newLogs);
      setStage('finished');
      setVariables({ opcao: opVal });
      setActiveStepText('O programa entrou no bloco "else" da validação e encerrou devido a entrada inválida.');
      return;
    }

    newLogs.push({
      id: String(Date.now() + 2),
      type: 'system',
      text: 'Opção válida! Agora o programa solicita o primeiro número (num1)...'
    });

    setLogs(newLogs);
    setStage('input_n1');
    setVariables({ opcao: opVal });
    setActiveStepText('Etapa 2: A opção foi validada. O script agora executa num1 = float(input(...)).');
  };

  const handleConfirmN1 = (val: string) => {
    setNum1Str(val);
    const n1 = parseFloat(val);
    const newLogs: TerminalLog[] = [
      ...logs,
      { id: String(Date.now()), type: 'input', text: `Digite o primeiro número: ${val}` }
    ];

    if (isNaN(n1)) {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'error',
        text: 'Erro: Por favor, digite apenas números válidos! (Capturado pelo bloco except ValueError)'
      });
      setLogs(newLogs);
      setStage('finished');
      setActiveStepText('O float() não conseguiu converter o texto para número e o bloco "except ValueError" impediu o crash.');
      return;
    }

    newLogs.push({
      id: String(Date.now() + 2),
      type: 'system',
      text: 'num1 armazenado na memória. Agora solicita o segundo número (num2)...'
    });

    setLogs(newLogs);
    setStage('input_n2');
    setVariables(prev => ({ ...prev, num1: n1 }));
    setActiveStepText('Etapa 3: num1 registrado como ' + n1 + '. Agora o script solicita num2.');
  };

  const handleConfirmN2AndCalculate = (val: string) => {
    setNum2Str(val);
    const n1 = parseFloat(num1Str);
    const n2 = parseFloat(val);

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: String(Date.now()), type: 'input', text: `Digite o segundo número: ${val}` }
    ];

    if (isNaN(n2)) {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'error',
        text: 'Erro: Por favor, digite apenas números válidos! (Capturado pelo bloco except ValueError)'
      });
      setLogs(newLogs);
      setStage('finished');
      setActiveStepText('Erro de conversão capturado pelo try/except.');
      return;
    }

    newLogs.push({ id: String(Date.now() + 1), type: 'output', text: '--------------------------------' });
    newLogs.push({ id: String(Date.now() + 2), type: 'output', text: 'RESULTADO:' });

    let res: number | string = 0;
    let funcName = '';

    if (selectedOp === '1') {
      res = n1 + n2;
      funcName = 'somar(a, b)';
      newLogs.push({
        id: String(Date.now() + 3),
        type: 'success',
        text: `${n1} + ${n2} = ${res}`
      });
      setActiveStepText(`Executou a função somar(${n1}, ${n2}), retornando ${res}.`);
    } else if (selectedOp === '2') {
      res = n1 - n2;
      funcName = 'subtrair(a, b)';
      newLogs.push({
        id: String(Date.now() + 3),
        type: 'success',
        text: `${n1} - ${n2} = ${res}`
      });
      setActiveStepText(`Executou a função subtrair(${n1}, ${n2}), retornando ${res}.`);
    } else if (selectedOp === '3') {
      res = n1 * n2;
      funcName = 'multiplicar(a, b)';
      newLogs.push({
        id: String(Date.now() + 3),
        type: 'success',
        text: `${n1} * ${n2} = ${res}`
      });
      setActiveStepText(`Executou a função multiplicar(${n1}, ${n2}), retornando ${res}.`);
    } else if (selectedOp === '4') {
      funcName = 'dividir(a, b)';
      if (n2 === 0) {
        res = 'Erro: Não é possível dividir por zero!';
        newLogs.push({
          id: String(Date.now() + 3),
          type: 'error',
          text: 'Erro: Não é possível dividir por zero!'
        });
        setActiveStepText(`A função dividir(${n1}, ${n2}) identificou b == 0 e preveniu o ZeroDivisionError!`);
      } else {
        res = Number((n1 / n2).toFixed(4));
        // Remove trailing zeroes if whole
        if (n1 % n2 === 0) res = n1 / n2;
        newLogs.push({
          id: String(Date.now() + 3),
          type: 'success',
          text: `${n1} / ${n2} = ${res}`
        });
        setActiveStepText(`Executou a função dividir(${n1}, ${n2}), retornando ${res}.`);
      }
    }

    newLogs.push({ id: String(Date.now() + 4), type: 'output', text: '--------------------------------' });
    newLogs.push({ id: String(Date.now() + 5), type: 'system', text: 'Programa finalizado com sucesso (código 0).' });

    setLogs(newLogs);
    setStage('finished');
    setVariables({
      opcao: selectedOp,
      num1: n1,
      num2: n2,
      resultado: res,
      funcao: funcName
    });
  };

  const handleQuickScenario = (op: string, n1: string, n2: string) => {
    setSelectedOp(op);
    setNum1Str(n1);
    setNum2Str(n2);
    setVariables({});

    const simulatedLogs: TerminalLog[] = [
      { id: '1', type: 'system', text: 'Executando: python calculadora.py' },
      { id: '2', type: 'output', text: '================================' },
      { id: '3', type: 'output', text: '      CALCULADORA EM PYTHON     ' },
      { id: '4', type: 'output', text: '================================' },
      { id: '5', type: 'output', text: 'Selecione a operação desejada:' },
      { id: '6', type: 'output', text: '1 - Adição (+)' },
      { id: '7', type: 'output', text: '2 - Subtração (-)' },
      { id: '8', type: 'output', text: '3 - Multiplicação (*)' },
      { id: '9', type: 'output', text: '4 - Divisão (/)' },
      { id: '10', type: 'output', text: '--------------------------------' },
      { id: '11', type: 'input', text: `Digite o número da operação (1/2/3/4): ${op}` },
      { id: '12', type: 'input', text: `Digite o primeiro número: ${n1}` },
      { id: '13', type: 'input', text: `Digite o segundo número: ${n2}` },
      { id: '14', type: 'output', text: '--------------------------------' },
      { id: '15', type: 'output', text: 'RESULTADO:' }
    ];

    const v1 = parseFloat(n1);
    const v2 = parseFloat(n2);
    let finalRes: string | number = 0;
    let fName = '';

    if (op === '1') {
      finalRes = v1 + v2;
      fName = 'somar(a, b)';
      simulatedLogs.push({ id: '16', type: 'success', text: `${v1} + ${v2} = ${finalRes}` });
    } else if (op === '2') {
      finalRes = v1 - v2;
      fName = 'subtrair(a, b)';
      simulatedLogs.push({ id: '16', type: 'success', text: `${v1} - ${v2} = ${finalRes}` });
    } else if (op === '3') {
      finalRes = v1 * v2;
      fName = 'multiplicar(a, b)';
      simulatedLogs.push({ id: '16', type: 'success', text: `${v1} * ${v2} = ${finalRes}` });
    } else if (op === '4') {
      fName = 'dividir(a, b)';
      if (v2 === 0) {
        finalRes = 'Erro: Não é possível dividir por zero!';
        simulatedLogs.push({ id: '16', type: 'error', text: 'Erro: Não é possível dividir por zero!' });
      } else {
        finalRes = Number((v1 / v2).toFixed(4));
        simulatedLogs.push({ id: '16', type: 'success', text: `${v1} / ${v2} = ${finalRes}` });
      }
    }

    simulatedLogs.push({ id: '17', type: 'output', text: '--------------------------------' });
    simulatedLogs.push({ id: '18', type: 'system', text: 'Programa finalizado com sucesso (código 0).' });

    setLogs(simulatedLogs);
    setStage('finished');
    setVariables({
      opcao: op,
      num1: v1,
      num2: v2,
      resultado: finalRes,
      funcao: fName
    });
    setActiveStepText(`Cenário executado com sucesso: ${fName} calculou o valor final.`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Simulador Interativo</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">Terminal Python 3.12</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Execute e teste o código em tempo real</h2>
        </div>

        <div className="flex items-center gap-2">
          {stage === 'idle' ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Iniciar Execução</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setStage('idle');
                setLogs([
                  { id: '1', type: 'system', text: 'Ambiente reiniciado. Pronto para nova execução.' },
                ]);
                setVariables({});
                setActiveStepText('Pronto para novo teste.');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Terminal</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Test Scenarios Bar */}
      <div className="px-4 py-3 bg-slate-100/60 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium shrink-0">Cenários Prontos:</span>
        <button
          onClick={() => handleQuickScenario('1', '15', '27')}
          className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors shadow-2xs font-mono"
        >
          ➕ Adição (15 + 27)
        </button>
        <button
          onClick={() => handleQuickScenario('2', '100', '37.5')}
          className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors shadow-2xs font-mono"
        >
          ➖ Subtração (100 - 37.5)
        </button>
        <button
          onClick={() => handleQuickScenario('3', '8.5', '4')}
          className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-slate-700 transition-colors shadow-2xs font-mono"
        >
          ✖️ Multiplicação (8.5 * 4)
        </button>
        <button
          onClick={() => handleQuickScenario('4', '42', '0')}
          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-800 rounded transition-colors shadow-2xs font-mono font-medium"
          title="Ver como a verificação impede o erro de divisão por zero"
        >
          🛡️ Divisão por Zero (42 / 0)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Terminal Screen (Left/Center) */}
        <div className="lg:col-span-8 bg-slate-950 p-4 sm:p-5 flex flex-col justify-between min-h-[380px] font-mono text-xs sm:text-[13px]">
          {/* Logs */}
          <div className="space-y-1.5 overflow-y-auto max-h-[340px] pr-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`leading-relaxed whitespace-pre-wrap ${
                  log.type === 'system'
                    ? 'text-slate-500 italic'
                    : log.type === 'input'
                    ? 'text-amber-300 font-semibold'
                    : log.type === 'error'
                    ? 'text-rose-400 font-semibold'
                    : log.type === 'success'
                    ? 'text-emerald-400 font-bold text-sm'
                    : 'text-slate-200'
                }`}
              >
                {log.text}
              </div>
            ))}
          </div>

          {/* Dynamic Interactive Input Prompt according to current stage */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            {stage === 'idle' && (
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Pressione &quot;Iniciar Execução&quot; acima para interagir passo a passo.</span>
              </div>
            )}

            {stage === 'input_op' && (
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-3">
                <p className="text-amber-300 font-semibold mb-2">
                  &gt; input(&quot;Digite o número da operação (1/2/3/4): &quot;)
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { val: '1', label: '1: Adição (+)' },
                    { val: '2', label: '2: Subtração (-)' },
                    { val: '3', label: '3: Multiplicação (*)' },
                    { val: '4', label: '4: Divisão (/)' },
                    { val: '9', label: '9: [Opção Inválida para Testar]' }
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => handleConfirmOp(btn.val)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition-colors"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stage === 'input_n1' && (
              <div className="bg-slate-900/90 border border-sky-500/30 rounded-lg p-3">
                <p className="text-sky-300 font-semibold mb-2">
                  &gt; num1 = float(input(&quot;Digite o primeiro número: &quot;))
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={num1Str}
                    onChange={(e) => setNum1Str(e.target.value)}
                    placeholder="Ex: 25.5"
                    className="bg-slate-950 border border-slate-700 text-white px-3 py-1.5 rounded text-xs font-mono w-40 focus:outline-none focus:border-sky-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmN1(num1Str)}
                  />
                  <button
                    onClick={() => handleConfirmN1(num1Str)}
                    className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold transition-colors"
                  >
                    Confirmar Valor (Enter)
                  </button>
                </div>
              </div>
            )}

            {stage === 'input_n2' && (
              <div className="bg-slate-900/90 border border-sky-500/30 rounded-lg p-3">
                <p className="text-sky-300 font-semibold mb-2">
                  &gt; num2 = float(input(&quot;Digite o segundo número: &quot;))
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={num2Str}
                    onChange={(e) => setNum2Str(e.target.value)}
                    placeholder="Ex: 5 ou 0"
                    className="bg-slate-950 border border-slate-700 text-white px-3 py-1.5 rounded text-xs font-mono w-40 focus:outline-none focus:border-sky-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmN2AndCalculate(num2Str)}
                  />
                  <button
                    onClick={() => handleConfirmN2AndCalculate(num2Str)}
                    className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold transition-colors"
                  >
                    Calcular Resultado
                  </button>
                  {selectedOp === '4' && (
                    <button
                      onClick={() => handleConfirmN2AndCalculate('0')}
                      className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded text-xs font-semibold transition-colors"
                      title="Testa a divisão por zero para ver a proteção do código"
                    >
                      Testar com 0 (Zero)
                    </button>
                  )}
                </div>
              </div>
            )}

            {stage === 'finished' && (
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Fluxo concluído com êxito!
                </span>
                <button
                  onClick={handleStart}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
                >
                  Fazer Outro Cálculo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Python Memory & Variable Inspector (Right Column) */}
        <div className="lg:col-span-4 bg-slate-50 p-5 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>Memória do Python (Variáveis)</span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Veja exatamente o que o interpretador Python está armazenando em cada variável durante a execução:
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500">opcao:</span>
                <span className="font-bold text-amber-600">
                  {variables.opcao ? `"${variables.opcao}"` : '<não definida>'}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500">num1 (float):</span>
                <span className="font-bold text-sky-600">
                  {variables.num1 !== undefined ? variables.num1 : '<não definida>'}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500">num2 (float):</span>
                <span className="font-bold text-sky-600">
                  {variables.num2 !== undefined ? variables.num2 : '<não definida>'}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500">resultado:</span>
                <span className={`font-bold ${typeof variables.resultado === 'string' && variables.resultado.includes('Erro') ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {variables.resultado !== undefined ? String(variables.resultado) : '<aguardando cálculo>'}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500">função chamada:</span>
                <span className="font-bold text-purple-600">
                  {variables.funcao ? variables.funcao : '<nenhuma>'}
                </span>
              </div>
            </div>
          </div>

          {/* Explanation Callout */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              O que está acontecendo agora?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
              {activeStepText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
