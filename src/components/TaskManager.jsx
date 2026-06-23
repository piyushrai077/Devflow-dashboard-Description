import React, { useReducer, useState } from 'react';

const TAGS = ['🐛 Bug Fix', '✨ Feature', '📚 Learning', '🔧 Setup'];

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { 
        id: Date.now(), 
        text: action.text, 
        tag: action.tag, 
        done: false 
      }];
    case 'TOGGLE':
      return state.map(t => 
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case 'DELETE':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

function TaskManager() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [input, setInput] = useState('');
  const [tag, setTag]     = useState(TAGS[0]);

  const addTask = () => {
    if (!input.trim()) return;
    dispatch({ type: 'ADD', text: input, tag });
    setInput('');
  };

  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>✅ Task Manager</h2>

      {/* Input Row */}
      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task and press Enter..."
          style={styles.input}
        />
        <select
          value={tag}
          onChange={e => setTag(e.target.value)}
          style={styles.select}
        >
          {TAGS.map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={addTask} style={styles.addBtn}>+ Add</button>
      </div>

      {/* Progress Bar */}
      {total > 0 && (
        <div style={styles.progressBg}>
          <div style={{ ...styles.progressFill, width: `${(done/total)*100}%` }} />
        </div>
      )}

      {/* Task List */}
      {tasks.length === 0 && (
        <p style={styles.empty}>No tasks yet! Add one above 👆</p>
      )}

      {tasks.map(task => (
        <div key={task.id} style={styles.taskRow}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => dispatch({ type: 'TOGGLE', id: task.id })}
            style={{ cursor: 'pointer', width: 18, height: 18 }}
          />
          <span style={{
            ...styles.taskText,
            textDecoration: task.done ? 'line-through' : 'none',
            color: task.done ? '#555' : '#fff'
          }}>
            {task.text}
          </span>
          <span style={styles.tag}>{task.tag}</span>
          <button
            onClick={() => dispatch({ type: 'DELETE', id: task.id })}
            style={styles.delBtn}
          >
            🗑️
          </button>
        </div>
      ))}

      {/* Counter */}
      {total > 0 && (
        <p style={styles.counter}>
          {done} of {total} tasks completed
          {done === total && total > 0 && ' 🎉'}
        </p>
      )}
    </div>
  );
}

const styles = {
  card:       { background: '#1e1e2e', borderRadius: 16, padding: 24,
                color: '#fff', maxWidth: 500, margin: '20px auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  title:      { marginTop: 0, color: '#6c63ff' },
  inputRow:   { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  input:      { flex: 1, minWidth: 150, padding: '10px 14px', borderRadius: 8,
                border: 'none', background: '#2a2a3e', color: '#fff', fontSize: 14 },
  select:     { padding: '10px', borderRadius: 8, border: 'none',
                background: '#2a2a3e', color: '#fff', cursor: 'pointer' },
  addBtn:     { padding: '10px 18px', borderRadius: 8, border: 'none',
                background: '#6c63ff', color: '#fff', cursor: 'pointer',
                fontWeight: 'bold' },
  progressBg: { background: '#2a2a3e', borderRadius: 8, height: 8,
                marginBottom: 16, overflow: 'hidden' },
  progressFill:{ background: '#6c63ff', height: '100%',
                 borderRadius: 8, transition: 'width 0.3s ease' },
  taskRow:    { display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 0', borderBottom: '1px solid #2a2a3e' },
  taskText:   { flex: 1, fontSize: 14 },
  tag:        { fontSize: 11, background: '#2a2a3e', padding: '4px 8px',
                borderRadius: 6, color: '#aaa', whiteSpace: 'nowrap' },
  delBtn:     { background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 16 },
  empty:      { color: '#555', textAlign: 'center', padding: '20px 0' },
  counter:    { color: '#aaa', marginTop: 12, fontSize: 13, textAlign: 'center' },
};

export default TaskManager;