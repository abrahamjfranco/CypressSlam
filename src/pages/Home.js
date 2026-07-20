import React from 'react';

export default function Home({ players, divisions, setTab }) {
  const confirmed = players.filter(p => p.rank > 0).length;
  const playoffCount = players.filter(p => p.madePlayoffs).length;
  const stage = playoffCount > 0 ? 'Playoffs' : 'Preliminary Rounds';

  return (
    <div>
      <div className="alert alert-info">
        <span style={{ fontSize: 18 }}>🎾</span>
        <div>
          <div style={{ fontWeight: 500, marginBottom: 2 }}>Tournament is underway</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>Check your division and submit scores below</div>
        </div>
      </div>

      <div className="section-label">Tournament status</div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Stage</div>
          <div className="stat-value">{stage}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Players</div>
          <div className="stat-value">{confirmed} confirmed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Divisions</div>
          <div className="stat-value">{divisions.length} total</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Playoff spots</div>
          <div className="stat-value">{playoffCount > 0 ? `${playoffCount} set` : '16 available'}</div>
        </div>
      </div>

      <div className="section-label">Quick access</div>

      <button className="quick-link" onClick={() => setTab('division')}>
        <div className="quick-link-left">
          <div className="quick-link-icon">🏟️</div>
          <span className="quick-link-text">View all divisions</span>
        </div>
        <span style={{ color: '#9EA3AC', fontSize: 18 }}>›</span>
      </button>

      <button className="quick-link" onClick={() => setTab('scores')}>
        <div className="quick-link-left">
          <div className="quick-link-icon">📝</div>
          <span className="quick-link-text">Submit match scores</span>
        </div>
        <span style={{ color: '#9EA3AC', fontSize: 18 }}>›</span>
      </button>

      <button className="quick-link" onClick={() => setTab('standings')}>
        <div className="quick-link-left">
          <div className="quick-link-icon">📊</div>
          <span className="quick-link-text">Live standings</span>
        </div>
        <span style={{ color: '#9EA3AC', fontSize: 18 }}>›</span>
      </button>

      <button className="quick-link" onClick={() => setTab('bracket')}>
        <div className="quick-link-left">
          <div className="quick-link-icon">🏆</div>
          <span className="quick-link-text">Playoff bracket</span>
        </div>
        <span style={{ color: '#9EA3AC', fontSize: 18 }}>›</span>
      </button>

      <div style={{ marginTop: 20, padding: '12px 14px', background: '#fff', borderRadius: 10, border: '0.5px solid #E0E2E5' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Tournament format</div>
        <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>
          2 preliminary rounds → top 16 advance to playoffs → single elimination with fixed partners → champion crowned 🏆
        </div>
      </div>
    </div>
  );
}
