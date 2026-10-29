import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, History, Sparkles, RefreshCw, Delete } from 'lucide-react';

interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

export const FrutigerAeroCalculatorUI: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<string>('0');
  const [historyExpression, setHistoryExpression] = useState<string>('');
  const [storedOperand, setStoredOperand] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Web Audio Context for tactile 2000s click sound
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = (type: 'number' | 'operator' | 'equals' | 'clear' = 'number') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (type === 'number') {
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.04);
      } else if (type === 'operator') {
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      } else if (type === 'equals') {
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1050, ctx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
      }

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio not supported or blocked
    }
  };

  const handleDigit = (digit: string) => {
    playClickSound('number');
    if (shouldResetDisplay || currentDisplay === '0' || currentDisplay.startsWith('Erro')) {
      setCurrentDisplay(digit);
      setShouldResetDisplay(false);
    } else {
      if (currentDisplay.length < 13) {
        setCurrentDisplay(prev => prev + digit);
      }
    }
  };

  const handleDecimal = () => {
    playClickSound('number');
    if (shouldResetDisplay || currentDisplay.startsWith('Erro')) {
      setCurrentDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!currentDisplay.includes('.')) {
      setCurrentDisplay(prev => prev + '.');
    }
  };

  const handleOperator = (op: '+' | '-' | '*' | '/') => {
    playClickSound('operator');
    const val = parseFloat(currentDisplay);
    if (isNaN(val)) return;

    if (storedOperand !== null && !shouldResetDisplay && pendingOperator !== null) {
      executeCalculation(val);
    } else {
      setStoredOperand(val);
    }

    setPendingOperator(op);
    setShouldResetDisplay(true);

    const symbols: Record<string, string> = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    setHistoryExpression(`${val} ${symbols[op]}`);
  };

  const executeCalculation = (currentVal: number) => {
    if (storedOperand === null || pendingOperator === null) return;

    const a = storedOperand;
    const b = currentVal;
    let res = 0;
    let symbol = '';

    if (pendingOperator === '+') {
      res = a + b;
      symbol = '+';
    } else if (pendingOperator === '-') {
      res = a - b;
      symbol = '−';
    } else if (pendingOperator === '*') {
      res = a * b;
      symbol = '×';
    } else if (pendingOperator === '/') {
      symbol = '÷';
      if (b === 0) {
        setCurrentDisplay('Erro: Div por 0');
        setHistoryExpression(`${a} ÷ 0 =`);
        setStoredOperand(null);
        setPendingOperator(null);
        setShouldResetDisplay(true);
        return;
      }
      res = a / b;
    }

    // Format number nicely
    let formattedRes = String(Number(res.toFixed(6)));
    if (res.toString().includes('e')) {
      formattedRes = res.toPrecision(6);
    }

    setCurrentDisplay(formattedRes);
    setHistoryExpression(`${a} ${symbol} ${b} =`);
    setStoredOperand(res);

    // Save to history list
    const newItem: CalculationHistoryItem = {
      id: String(Date.now()),
      expression: `${a} ${symbol} ${b}`,
      result: formattedRes,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setHistoryList(prev => [newItem, ...prev.slice(0, 9)]);
  };

  const handleEquals = () => {
    playClickSound('equals');
    const val = parseFloat(currentDisplay);
    if (isNaN(val) || storedOperand === null || pendingOperator === null) return;

    executeCalculation(val);
    setStoredOperand(null);
    setPendingOperator(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    playClickSound('clear');
    setCurrentDisplay('0');
    setHistoryExpression('');
    setStoredOperand(null);
    setPendingOperator(null);
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    playClickSound('number');
    if (shouldResetDisplay || currentDisplay.length <= 1 || currentDisplay.startsWith('Erro')) {
      setCurrentDisplay('0');
    } else {
      setCurrentDisplay(prev => prev.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    playClickSound('operator');
    if (currentDisplay !== '0' && !currentDisplay.startsWith('Erro')) {
      if (currentDisplay.startsWith('-')) {
        setCurrentDisplay(prev => prev.slice(1));
      } else {
        setCurrentDisplay(prev => '-' + prev);
      }
    }
  };

  const handlePercentage = () => {
    playClickSound('operator');
    const val = parseFloat(currentDisplay);
    if (isNaN(val)) return;

    if (storedOperand !== null && pendingOperator !== null) {
      const fatia = (storedOperand * val) / 100;
      setCurrentDisplay(String(Number(fatia.toFixed(6))));
    } else {
      const res = val / 100;
      setCurrentDisplay(String(Number(res.toFixed(6))));
      setShouldResetDisplay(true);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperator('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('/');
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-cyan-900/40 via-sky-950/60 to-emerald-950/50 backdrop-blur-2xl border border-sky-300/30 shadow-2xl flex flex-col items-center">
      {/* Background Frutiger Aero glowing orbs & aurora */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Calculator Device Chassis */}
      <div className="relative w-full max-w-[360px] rounded-3xl p-5 bg-gradient-to-b from-sky-400/30 via-sky-600/20 to-teal-800/40 border border-sky-200/50 shadow-[0_20px_50px_rgba(8,47,73,0.5),inset_0_1px_2px_rgba(255,255,255,0.7)] backdrop-blur-md">
        
        {/* Aero Glass Top Bevel Reflection */}
        <div className="absolute top-0 inset-x-8 h-4 bg-gradient-to-b from-white/60 to-transparent rounded-t-3xl pointer-events-none"></div>

        {/* Chassis Header Bar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></div>
            <span className="text-xs font-bold tracking-wider text-sky-100 uppercase drop-shadow-xs">
              AeroCalc 2000
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-full text-sky-200 hover:text-white hover:bg-sky-400/20 transition-all text-xs"
              title={soundEnabled ? 'Desativar som de clique' : 'Ativar som de clique'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-sky-400/60" />}
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-1.5 rounded-full text-sky-200 hover:text-white hover:bg-sky-400/20 transition-all text-xs ${
                showHistory ? 'bg-sky-400/30 text-white' : ''
              }`}
              title="Histórico de operações"
            >
              <History className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* LCD Visor Display with Sunken Glass & Cyan Glow */}
        <div className="relative rounded-2xl p-4 mb-5 bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 border-2 border-teal-800/80 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.2)]">
          {/* Glass specular sheen arc on visor */}
          <div className="absolute top-0 inset-x-3 h-3.5 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl pointer-events-none"></div>

          {/* Pending Operator / History Line */}
          <div className="h-5 flex items-center justify-between text-xs font-mono text-teal-400/80 mb-1 select-none">
            <span className="text-[10px] tracking-wider uppercase text-teal-300/60">
              {pendingOperator ? 'OPERANDO' : 'PRONTO'}
            </span>
            <span className="truncate ml-2">{historyExpression || '\u00A0'}</span>
          </div>

          {/* Main Display Digits */}
          <div className="text-right font-mono font-bold text-3xl sm:text-4xl text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] select-all truncate">
            {currentDisplay}
          </div>
        </div>

        {/* History Flyout if active */}
        {showHistory && (
          <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-sky-400/30 text-xs font-mono max-h-36 overflow-y-auto">
            <div className="flex items-center justify-between text-sky-300 mb-2 border-b border-sky-800/50 pb-1 font-sans font-semibold">
              <span>Histórico de Cálculos</span>
              <button
                onClick={() => setHistoryList([])}
                className="text-[10px] text-sky-400/70 hover:text-sky-200 transition-colors"
              >
                Limpar
              </button>
            </div>
            {historyList.length === 0 ? (
              <p className="text-slate-400 text-[11px] italic">Nenhuma conta realizada ainda.</p>
            ) : (
              <div className="space-y-1.5">
                {historyList.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-slate-300 text-[11px]">
                    <span className="text-teal-300">{item.expression} =</span>
                    <span className="font-bold text-sky-300">{item.result}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Glossy Gel Button Matrix (The 4 Operations + Keypad) */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Row 1: Function Keys */}
          <button
            onClick={handleClear}
            className="group relative h-13 rounded-xl font-bold text-sm text-sky-950 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400 border border-sky-100 shadow-[0_4px_8px_rgba(2,132,199,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>C</span>
          </button>

          <button
            onClick={handleToggleSign}
            className="group relative h-13 rounded-xl font-bold text-sm text-sky-950 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400 border border-sky-100 shadow-[0_4px_8px_rgba(2,132,199,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>±</span>
          </button>

          <button
            onClick={handleBackspace}
            className="group relative h-13 rounded-xl font-bold text-sm text-sky-950 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400 border border-sky-100 shadow-[0_4px_8px_rgba(2,132,199,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden flex items-center justify-center"
            title="Apagar último dígito"
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>⌫</span>
          </button>

          <button
            onClick={() => handleOperator('/')}
            className={`group relative h-13 rounded-xl font-bold text-lg text-emerald-950 bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 border border-emerald-100 shadow-[0_4px_10px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden ${
              pendingOperator === '/' ? 'ring-2 ring-white scale-98 brightness-110' : ''
            }`}
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>÷</span>
          </button>

          {/* Row 2: 7, 8, 9, × */}
          {['7', '8', '9'].map(d => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="group relative h-13 rounded-xl font-bold text-base text-white bg-gradient-to-b from-sky-600 via-sky-700 to-sky-800 border border-sky-400/50 shadow-[0_4px_8px_rgba(3,105,161,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
            >
              <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none"></div>
              <span>{d}</span>
            </button>
          ))}
          <button
            onClick={() => handleOperator('*')}
            className={`group relative h-13 rounded-xl font-bold text-lg text-emerald-950 bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 border border-emerald-100 shadow-[0_4px_10px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden ${
              pendingOperator === '*' ? 'ring-2 ring-white scale-98 brightness-110' : ''
            }`}
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>×</span>
          </button>

          {/* Row 3: 4, 5, 6, - */}
          {['4', '5', '6'].map(d => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="group relative h-13 rounded-xl font-bold text-base text-white bg-gradient-to-b from-sky-600 via-sky-700 to-sky-800 border border-sky-400/50 shadow-[0_4px_8px_rgba(3,105,161,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
            >
              <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none"></div>
              <span>{d}</span>
            </button>
          ))}
          <button
            onClick={() => handleOperator('-')}
            className={`group relative h-13 rounded-xl font-bold text-lg text-emerald-950 bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 border border-emerald-100 shadow-[0_4px_10px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden ${
              pendingOperator === '-' ? 'ring-2 ring-white scale-98 brightness-110' : ''
            }`}
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>−</span>
          </button>

          {/* Row 4: 1, 2, 3, + */}
          {['1', '2', '3'].map(d => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="group relative h-13 rounded-xl font-bold text-base text-white bg-gradient-to-b from-sky-600 via-sky-700 to-sky-800 border border-sky-400/50 shadow-[0_4px_8px_rgba(3,105,161,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
            >
              <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none"></div>
              <span>{d}</span>
            </button>
          ))}
          <button
            onClick={() => handleOperator('+')}
            className={`group relative h-13 rounded-xl font-bold text-lg text-emerald-950 bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 border border-emerald-100 shadow-[0_4px_10px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden ${
              pendingOperator === '+' ? 'ring-2 ring-white scale-98 brightness-110' : ''
            }`}
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/90 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>+</span>
          </button>

          {/* Row 5: 0, ., %, = */}
          <button
            onClick={() => handleDigit('0')}
            className="group relative h-13 rounded-xl font-bold text-base text-white bg-gradient-to-b from-sky-600 via-sky-700 to-sky-800 border border-sky-400/50 shadow-[0_4px_8px_rgba(3,105,161,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>0</span>
          </button>

          <button
            onClick={handleDecimal}
            className="group relative h-13 rounded-xl font-bold text-base text-white bg-gradient-to-b from-sky-600 via-sky-700 to-sky-800 border border-sky-400/50 shadow-[0_4px_8px_rgba(3,105,161,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>.</span>
          </button>

          <button
            onClick={handlePercentage}
            className="group relative h-13 rounded-xl font-bold text-base text-sky-100 bg-gradient-to-b from-sky-500 via-sky-600 to-sky-700 border border-sky-300/60 shadow-[0_4px_8px_rgba(2,132,199,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
            title="Porcentagem (%)"
          >
            <div className="absolute top-0 inset-x-1 h-3 bg-gradient-to-b from-white/80 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>%</span>
          </button>

          {/* Equals Button */}
          <button
            onClick={handleEquals}
            className="group relative h-13 rounded-xl font-bold text-xl text-teal-950 bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400 border border-emerald-100 shadow-[0_4px_14px_rgba(16,185,129,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] active:translate-y-0.5 active:shadow-xs transition-all overflow-hidden"
          >
            <div className="absolute top-0 inset-x-2 h-3.5 bg-gradient-to-b from-white/95 to-transparent rounded-t-lg pointer-events-none"></div>
            <span>=</span>
          </button>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="mt-4 text-center text-[11px] text-sky-200/70">
          Você pode usar o teclado numérico físico do seu computador!
        </div>
      </div>
    </div>
  );
};
