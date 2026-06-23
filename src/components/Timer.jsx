import React, { useState, useEffect } from 'react';

const MODES = {
  focus:      { label: '🎯 Focus',       minutes: 25 },
  shortBreak: { label: '☕ Short Break',  minutes: 5  },
  longBreak:  { label: '🌴 Long Break',   minutes: 15 },
};

function Timer() {
  const [mode, setMode]         = useState('focus');
  const [seconds, setSeconds]   = useState(25 * 60);
  const [running, setRunning]   = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          if (mode === 'focus') setSessions(s => s + 1);
          alert(`${MODES[mode].label} session complete! 🎉`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setSeconds(MODES[newMode].minutes * 60);
    setRunning(false);
  };

  const format = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>⏱️ Pomodoro Timer</h2>
      <div style={styles.modeRow}>
        {Object.entries(MODES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={mode === key ? styles.activeBtn : styles.btn}
          >
            {val.label}
          </button>
        ))}
      </div>
      <div style={styles.timerDisplay}>{format(seconds)}</div>
      <div style={styles.controls}>
        <button onClick={() => setRunning(r => !r)} style={styles.mainBtn}>
          {running ? '⏸ Pause' : '▶️ Start'}
        </button>
        <button
          onClick={() => {
            setSeconds(MODES[mode].minutes * 60);
            setRunning(false);
          }}
          style={styles.resetBtn}
        >
          🔄 Reset
        </button>
      </div>
      <p style={styles.sessions}>
        ✅ Focus Sessions Today: <strong>{sessions}</strong>
      </p>
    </div>
  );
}

const styles = {
  card:        { background: '#1e1e2e', borderRadius: 16, padding: 32,
                 textAlign: 'center', color: '#fff', maxWidth: 400,
                 margin: '20px auto', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  title:       { marginTop: 0, color: '#6c63ff' },
  modeRow:     { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 },
  btn:         { padding: '8px 16px', borderRadius: 8, border: 'none',
                 background: '#2a2a3e', color: '#aaa', cursor: 'pointer', fontSize: 13 },
  activeBtn:   { padding: '8px 16px', borderRadius: 8, border: 'none',
                 background: '#6c63ff', color: '#fff', cursor: 'pointer', fontSize: 13 },
  timerDisplay:{ fontSize: 72, fontWeight: 'bold', letterSpacing: 4,
                 margin: '16px 0', color: '#fff' },
  controls:    { display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 },
  mainBtn:     { padding: '12px 32px', borderRadius: 10, border: 'none',
                 background: '#6c63ff', color: '#fff', fontSize: 16, cursor: 'pointer' },
  resetBtn:    { padding: '12px 20px', borderRadius: 10, border: 'none',
                 background: '#2a2a3e', color: '#fff', fontSize: 16, cursor: 'pointer' },
  sessions:    { color: '#aaa', marginTop: 16 },
};

export default Timer;