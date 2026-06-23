import React, { useState } from 'react';
import axios from 'axios';

function GitHubStats() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    if (!username.trim()) return;
    try {
      const res = await axios.get('https://api.github.com/users/' + username);
      setData(res.data);
      setError('');
    } catch (err) {
      setError('User not found!');
      setData(null);
    }
  };

  const cardStyle = {
    background: '#1e1e2e',
    borderRadius: '16px',
    padding: '24px',
    color: '#fff',
    maxWidth: '500px',
    margin: '20px auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    background: '#2a2a3e',
    color: '#fff',
    fontSize: '14px',
    width: '70%',
    marginRight: '8px'
  };

  const btnStyle = {
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    background: '#6c63ff',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const statBoxStyle = {
    background: '#13131f',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
    flex: '1'
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: '0', color: '#6c63ff' }}>GitHub Stats</h2>

      <div style={{ marginBottom: '16px' }}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchStats()}
          placeholder="Enter GitHub username..."
          style={inputStyle}
        />
        <button onClick={fetchStats} style={btnStyle}>
          Search
        </button>
      </div>

      {error && (
        <p style={{ color: '#ff6b6b' }}>{error}</p>
      )}

      {data && (
        <div style={{ background: '#2a2a3e', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <img
              src={data.avatar_url}
              alt="avatar"
              style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid #6c63ff' }}
            />
            <div>
              <h3 style={{ margin: '0 0 4px' }}>{data.name || data.login}</h3>
              <p style={{ margin: '0', color: '#6c63ff', fontSize: '13px' }}>@{data.login}</p>
              <p style={{ margin: '0', color: '#aaa', fontSize: '13px' }}>{data.bio || 'No bio'}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={statBoxStyle}>
              <strong style={{ color: '#6c63ff', fontSize: '22px' }}>{data.public_repos}</strong>
              <p style={{ margin: '0', color: '#aaa', fontSize: '11px' }}>Repos</p>
            </div>
            <div style={statBoxStyle}>
              <strong style={{ color: '#6c63ff', fontSize: '22px' }}>{data.followers}</strong>
              <p style={{ margin: '0', color: '#aaa', fontSize: '11px' }}>Followers</p>
            </div>
            <div style={statBoxStyle}>
              <strong style={{ color: '#6c63ff', fontSize: '22px' }}>{data.following}</strong>
              <p style={{ margin: '0', color: '#aaa', fontSize: '11px' }}>Following</p>
            </div>
          </div>

          <button
            style={btnStyle}
            onClick={() => window.open(data.html_url, '_blank')}
          >
            View Full Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default GitHubStats;