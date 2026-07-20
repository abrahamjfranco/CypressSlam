import React, { useState } from 'react';

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function getSets(players) {
  if (players.length < 4) return [];
  const [A, B, C, D] = players;
  return [
    { label: 'Set 1', teamA: `${A} & ${B}`, teamB: `${C} & ${D}` },
    { label: 'Set 2', teamA: `${A} & ${C}`, teamB: `${B} & ${D}` },
    { label: 'Set 3', teamA: `${A} & ${D}`, teamB: `${B} & ${C}` },
  ];
}

export default function MyDivision({ divisions, players }) {
  const [expanded, setExpanded] = useState(null);

  const r1 = divisions.filter(d => d.name.startsWith('R1')).sort((a, b) => a.name.localeCompare(b.name));
  const r2 = divisions.filter(d => d.name.startsWith('R2')).sort((a, b) => a.name.localeCompare(b.name));

  function renderDivision(div) {
    const isOpen = expanded === div.id;
    const sets = getSets(div.playerNames);

    return (
      <div key={div.id} className="card" style={{ marginBottom: 8 }}>
        <div
          className="card-header"
          style={{ cursor: 'pointer' }}
          onClick={() => setExpanded(isOpen ? null : div.id)}
        >
          <div>
            <span style={{ fontWeight: 600 }}>{div.name}</span>
            {div.court && (
              <span style={{ marginLeft: 10, fontSize: 11, opacity: 0.75 }}>📍 {div.court}</span>
            )}
          </div>
          <span style={{ fontSize: 16, opacity: 0.7 }}>{isOpen ? '▲' : '▼'}</span>
        </div>

        {isOpen && (
          <div className="card-body">
            <div className="section-label">Players</div>
            {div.playerNames.map(name => (
              <div key={name} className="player-row" style={{ marginBottom: 5 }}>
                <div className="player-initials">{getInitials(name)}</div>
                <div className="player-name">{name}</div>
              </div>
            ))}

            {sets.length > 0 && (
              <>
                <div className="section-label" style={{ marginTop: 12 }}>Set matchups</div>
                {sets.map(s => (
                  <div key={s.label} className="set-card">
                    <div className="set-label">{s.label}</div>
                    <div className="set-team">{s.teamA}</div>
                    <div className="set-vs">vs.</div>
                    <div className="set-team">{s.teamB}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {r1.length > 0 && (
        <>
          <div className="section-label">Round 1</div>
          {r1.map(renderDivision)}
        </>
      )}
      {r2.length > 0 && (
        <>
          <div className="section-label" style={{ marginTop: 8 }}>Round 2</div>
          {r2.map(renderDivision)}
        </>
      )}
      {divisions.length === 0 && (
        <div className="loading">No divisions set up yet. Check back soon!</div>
