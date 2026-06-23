import React from 'react';
import Background3D from './components/Background3D';
import Timer from './components/Timer';
import TaskManager from './components/TaskManager';
import GitHubStats from './components/GitHubStats';
import './App.css';

function App() {
  return (
    <div style={{ minHeight:'100vh', position:'relative' }}>

      <Background3D />

      <div style={{ position:'relative', zIndex:2, padding:'20px' }}>

        <div style={{ textAlign:'center', padding:'30px 0 20px' }}>
          <h1 style={{
            fontSize:'2.8rem', fontWeight:900, letterSpacing:'2px',
            background:'linear-gradient(90deg,#a78bfa,#60a5fa,#34d399,#a78bfa)',
            backgroundSize:'300%',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            animation:'shimmer 3s linear infinite'
          }}>
            DevFlow Dashboard
          </h1>
          <p style={{ color:'#8b8ba8', fontSize:'1rem', marginTop:'6px', letterSpacing:'1px' }}>
            Your personal developer productivity hub
          </p>
        </div>

        <div style={{
          display:'flex', flexWrap:'wrap',
          justifyContent:'center', gap:'20px',
          maxWidth:'1100px', margin:'0 auto'
        }}>
          <Timer />
          <TaskManager />
          <GitHubStats />
        </div>

      </div>
    </div>
  );
}

export default App;