import React, { useState } from 'react';

function getSets(players) {
  if (players.length < 4) return [];
  const [A, B, C, D] = players;
  return [
    { label: 'Set 1', teamA: `${A} & ${B}`, teamB: `${C} & ${D}` },
    { label: 'Set 2', teamA: `${A} & ${C}`, teamB: `${B} & ${D}` },
    { label: 'Set 3', teamA: `${A} & ${D}`, teamB: `${B} & ${C}` },
  ];
}

export default function Scores({ divisions }) {
  const [selected, setSelected] = useState('');
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const div = divisions.find(d => d.id === selected);
  const sets = div ? getSets(div.playerNames) : [];

  function handleScore(setLabel, team, val) {
    setScores(s => ({ ...s, [`${setLabel}-${team}`]: val }));
  }

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div>
      <div className="section-label">Select your division</div>
      <select
        value={selected}
        onChange={e => { setSelected(e.target.value); setScores({}); }}
        style={{ width: '100%', marginBottom: 14, padding: '10px 12px', borderRadius: 10, border: '0.5px solid #E0E2E5', fontSize: 14, background: '#fff', color: '#1a1a2e' }}
      >
        <option value="">Choose a division…</option>
        {divisions.map(d => (
          <option key={d.id} value={d.id}>{d.name}{d.court ? ` — ${d.court}` : ''}</option>
        ))}
      </select>

      {submitted && (
        <div className="alert alert-success" style={{ marginBottom: 12 }}>
          <span>✅</span>
          <div style={{ fontWeight: 500 }}>Scores submitted — thank you!</div>
        </div>
      )}

      {sets.map(s => (
        <div key={s.label} className="score-card">
          <div className="set-label">{s.label}</div>
          <div className="score-row">
            <span className="score-team-name">{s.teamA}</span>
            <input
              type="number"
              min="0"
              max="7"
              className="score-input"
              value={scores[`${s.label}-A`] || ''}
              onChange={e => handleScore(s.label, 'A', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="score-row">
            <span className="score-team-name">{s.teamB}</span>
            <input
              type="number"
              min="0"
              max="7"
              className="score-input"
              value={scores[`${s.label}-B`] || ''}
              onChange={e => handleScore(s.label, 'B', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      ))}

      {div && sets.length > 0 && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit scores
        </button>
      )}

      {!selected && (
        <div className="loading" style={{ marginTop: 20 }}>
          Select your division above to enter scores
        </div>
      )}
    </div>
  );
}
