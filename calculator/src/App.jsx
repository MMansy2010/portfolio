import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [resetNextInput, setResetNextInput] = useState(false);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('standard'); // 'standard' | 'scientific'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);

  const audioCtxRef = useRef(null);

  // Web Audio Synthesizer Tone on Keypress (Reused AudioContext)
  const playClickSound = (freq = 600) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {
      // Audio autoplay fallback
    }
  };

  const formatResult = (num) => {
    if (isNaN(num) || !isFinite(num)) return 'Error';
    // Fix JS floating point rounding (e.g. 0.1 + 0.2 = 0.30000000000000004)
    const rounded = Number(Math.round(num + 'e10') + 'e-10');
    return rounded.toString();
  };

  const handleInput = (val) => {
    playClickSound(550);

    if (display === 'Error' || resetNextInput) {
      setDisplay(val);
      setResetNextInput(false);
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  const handleDecimal = () => {
    playClickSound(550);

    if (display === 'Error' || resetNextInput) {
      setDisplay('0.');
      setResetNextInput(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercentage = () => {
    playClickSound(650);

    if (display === 'Error') return;

    try {
      const num = parseFloat(display);
      if (isNaN(num)) return;
      const res = num / 100;
      const formatted = formatResult(res);
      setDisplay(formatted);
      setResetNextInput(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleOperator = (op) => {
    playClickSound(700);

    if (display === 'Error') return;

    if (resetNextInput && expression) {
      // If user typed operator back-to-back, replace operator
      setExpression(expression.replace(/[\+\-\×\÷]\s*$/, op + ' '));
    } else {
      setExpression(expression + display + ' ' + op + ' ');
      setResetNextInput(true);
    }
  };

  const handleClear = () => {
    playClickSound(400);
    setDisplay('0');
    setExpression('');
    setResetNextInput(false);
  };

  const handleBackspace = () => {
    playClickSound(450);

    if (resetNextInput || display === 'Error') {
      setDisplay('0');
      setResetNextInput(false);
      return;
    }

    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const calculateResult = () => {
    playClickSound(880);

    if (display === 'Error') return;

    try {
      let fullExpr = expression + display;
      if (!expression && !resetNextInput) {
        // Nothing to evaluate
      }

      // Replace unicode math symbols
      const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');

      // Safely evaluate simple arithmetic expression
      const evalResult = Function(`"use strict"; return (${sanitized})`)();

      if (!isFinite(evalResult) || isNaN(evalResult)) {
        setDisplay('Error');
        setExpression('');
        setResetNextInput(true);
        return;
      }

      const formatted = formatResult(evalResult);
      setDisplay(formatted);
      setExpression('');
      setResetNextInput(true);

      addToHistory(fullExpr, formatted);
    } catch (err) {
      setDisplay('Error');
      setExpression('');
      setResetNextInput(true);
    }
  };

  const handleScientificOp = (type) => {
    playClickSound(750);
    try {
      if (type === 'pi') {
        setDisplay(formatResult(Math.PI));
        setResetNextInput(true);
        return;
      }
      if (type === 'e') {
        setDisplay(formatResult(Math.E));
        setResetNextInput(true);
        return;
      }

      const num = parseFloat(display);
      if (isNaN(num)) return;

      let res = 0;
      if (type === 'sin') {
        const rad = (num * Math.PI) / 180;
        res = Math.abs(Math.sin(rad)) < 1e-12 ? 0 : Math.sin(rad);
      } else if (type === 'cos') {
        const rad = (num * Math.PI) / 180;
        res = Math.abs(Math.cos(rad)) < 1e-12 ? 0 : Math.cos(rad);
      } else if (type === 'tan') {
        const rad = (num * Math.PI) / 180;
        res = Math.abs(Math.cos(rad)) < 1e-12 ? 'Error' : Math.tan(rad);
      } else if (type === 'sqrt') {
        res = num < 0 ? NaN : Math.sqrt(num);
      } else if (type === 'square') {
        res = Math.pow(num, 2);
      } else if (type === 'log') {
        res = num <= 0 ? NaN : Math.log10(num);
      } else if (type === 'ln') {
        res = num <= 0 ? NaN : Math.log(num);
      }

      if (typeof res === 'number' && isNaN(res)) {
        setDisplay('Error');
        setResetNextInput(true);
        return;
      }

      const formatted = formatResult(res);
      setDisplay(formatted);
      setResetNextInput(true);
      addToHistory(`${type}(${display})`, formatted);
    } catch (e) {
      setDisplay('Error');
      setResetNextInput(true);
    }
  };

  const addToHistory = (expr, res) => {
    setHistory((prev) => [{ expr, res, id: Date.now() }, ...prev]);
  };

  // Keyboard Event Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleInput(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculateResult();
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
  }, [display, expression, resetNextInput]);

  return (
    <div className="calculator-wrapper">
      {/* Ambient Cyber Glow */}
      <div className="calc-glow"></div>

      <div className="calc-card glass-panel">
        {/* Header Controls */}
        <div className="calc-header">
          <div className="brand-label">
            <span className="logo-dot"></span>
            QUANTUM CALC v2.5
          </div>
          <div className="controls-group">
            <button
              className={`mode-btn ${mode === 'scientific' ? 'active' : ''}`}
              onClick={() => {
                setMode(mode === 'standard' ? 'scientific' : 'standard');
                playClickSound(600);
              }}
            >
              {mode === 'standard' ? 'SCI 🧪' : 'STD 🔢'}
            </button>
            <button
              className="icon-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button
              className={`icon-btn ${historyOpen ? 'active' : ''}`}
              onClick={() => setHistoryOpen(!historyOpen)}
              title="Calculation History"
            >
              📜
            </button>
          </div>
        </div>

        {/* Screen Display */}
        <div className="calc-screen">
          <div className="expr-display">{expression || ' '}</div>
          <div className="main-display">{display}</div>
        </div>

        {/* Keypad Grid */}
        <div className="calc-keypad">
          {/* Scientific Controls (Shown when Sci mode active) */}
          {mode === 'scientific' && (
            <div className="sci-grid">
              <button className="btn-sci" onClick={() => handleScientificOp('sin')}>sin</button>
              <button className="btn-sci" onClick={() => handleScientificOp('cos')}>cos</button>
              <button className="btn-sci" onClick={() => handleScientificOp('tan')}>tan</button>
              <button className="btn-sci" onClick={() => handleScientificOp('sqrt')}>√x</button>
              <button className="btn-sci" onClick={() => handleScientificOp('square')}>x²</button>
              <button className="btn-sci" onClick={() => handleScientificOp('log')}>log</button>
              <button className="btn-sci" onClick={() => handleScientificOp('ln')}>ln</button>
              <button className="btn-sci" onClick={() => handleScientificOp('pi')}>π</button>
              <button className="btn-sci" onClick={() => handleScientificOp('e')}>e</button>
            </div>
          )}

          {/* Standard Keypad */}
          <div className="main-grid">
            <button className="btn-action" onClick={handleClear}>AC</button>
            <button className="btn-action" onClick={handleBackspace}>⌫</button>
            <button className="btn-action" onClick={handlePercentage}>%</button>
            <button className="btn-op" onClick={() => handleOperator('÷')}>÷</button>

            <button className="btn-num" onClick={() => handleInput('7')}>7</button>
            <button className="btn-num" onClick={() => handleInput('8')}>8</button>
            <button className="btn-num" onClick={() => handleInput('9')}>9</button>
            <button className="btn-op" onClick={() => handleOperator('×')}>×</button>

            <button className="btn-num" onClick={() => handleInput('4')}>4</button>
            <button className="btn-num" onClick={() => handleInput('5')}>5</button>
            <button className="btn-num" onClick={() => handleInput('6')}>6</button>
            <button className="btn-op" onClick={() => handleOperator('-')}>-</button>

            <button className="btn-num" onClick={() => handleInput('1')}>1</button>
            <button className="btn-num" onClick={() => handleInput('2')}>2</button>
            <button className="btn-num" onClick={() => handleInput('3')}>3</button>
            <button className="btn-op" onClick={() => handleOperator('+')}>+</button>

            <button className="btn-num span-2" onClick={() => handleInput('0')}>0</button>
            <button className="btn-num" onClick={handleDecimal}>.</button>
            <button className="btn-equal" onClick={calculateResult}>=</button>
          </div>
        </div>
      </div>

      {/* History Drawer */}
      {historyOpen && (
        <div className="history-drawer glass-panel">
          <div className="drawer-header">
            <h3>History Tape</h3>
            <button className="btn-text-clear" onClick={() => setHistory([])}>Clear</button>
          </div>
          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-msg">No calculations yet</div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="history-item"
                  onClick={() => {
                    setDisplay(item.res);
                    setResetNextInput(true);
                    playClickSound(500);
                  }}
                >
                  <div className="item-expr">{item.expr} =</div>
                  <div className="item-res">{item.res}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
