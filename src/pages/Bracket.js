import React, { useState } from 'react';

function getTeams(players) {
  const teamMap = {};
  players.forEach(p => {
    if (!p.team) return;
    if (!teamMap[p.team]) teamMap[p.team] = { team: p.team, players: [], court: p.court, qfGame: p.qfGame };
    teamMap[p.team].players.push(p.name);
  });
  Object.values(teamMap).forEach(t => t.players.sort((a, b) => a.split(' ')[0].localeCompare(b.split(' ')[0])));
  return Object.values(teamMap).sort((a, b) => parseInt(a.team) - parseInt(b.team));
}

function getQFMatchups(teams) {
  const byTeam = {};
  teams.forEach(t => { byTeam[t.team] = t; });
  return [
    { label: 'Quarterfinal 1', t1: byTeam['1'], t2: byTeam['8'] },
    { label: 'Quarterfinal 2', t1: byTeam['4'], t2: byTeam['5'] },
    { label: 'Quarterfinal 3', t1: byTeam['3'], t2: byTeam['6'] },
    { label: 'Quarterfinal 4', t1: byTeam['2'], t2: byTeam['7'] },
  ].filter(m => m.t1 && m.t2);
}

function getSFMatchups(players) {
  const sfPlayers = players.filter(p => p.madeSemifinals);
  const byQF = {};
  sfPlayers.forEach(p => {
    if (!p.qfGame) return;
    if (!byQF[p.qfGame]) byQF[p.qfGame] = [];
    byQF[p.qfGame].push(p.name);
  });
  const sf1t1 = (byQF['1'] || []).sort((a,b) => a.split(' ')[0].localeCompare(b.split(' ')[0]));
  const sf1t2 = (byQF['2'] || []).sort((a,b) => a.split(' ')[0].localeCompare(b.split(' ')[0]));
  const sf2t1 = (byQF['3'] || []).sort((a,b) => a.split(' ')[0].localeCompare(b.split(' ')[0]));
  const sf2t2 = (byQF['4'] || []).sort((a,b) => a.split(' ')[0].localeCompare(b.split(' ')[0]));
  return [
    { label: 'Semifinal 1', t1: sf1t1, t2: sf1t2, note: 'Winner QF1 vs Winner QF2' },
    { label: 'Semifinal 2', t1: sf2t1, t2: sf2t2, note: 'Winner QF3 vs Winner QF4' },
  ];
}

export default function Bracket({ players }) {
  const [round, setRound] = useState('qf');
  const teams = getTeams(players);
  const qfMatchups = getQFMatchups(teams);
  const sfMatchups = getSFMatchups(players);
  const hasSF = players.some(p => p.madeSemifinals);

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {['qf', 'sf'].map(r => (
          <button
            key={r}
            onClick={() => setRound(r)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: '0.5px solid',
              borderColor: round === r ? '#366092' : '#E0E2E5',
              background: round === r ? '#366092' : '#fff',
              color: round === r ? '#fff' : '#6B7280',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {r === 'qf' ? 'Quarterfinals' : 'Semifinals'}
          </button>
        ))}
      </div>

      {round === 'qf' && (
        <>
          {qfMatchups.length === 0 && (
            <div className="loading">Playoff bracket will appear once teams are set</div>
          )}
          {qfMatchups.map(({ label, t1, t2 }) => (
            <div key={label} className="qf-card">
              <div className="qf-header">
                <span className="qf-title">{label}</span>
                {t1.court && <span className="qf-court">📍 {t1.court}</span>}
              </div>
              <div className="qf-body">
                <div className="qf-team">{t1.players.join(' & ')}</div>
                <div className="qf-vs">vs.</div>
                <div className="qf-team" style={{ borderTop: 'none', paddingTop: 2 }}>{t2.players.join(' & ')}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {round === 'sf' && (
        <>
          {!hasSF && (
            <div className="loading">Semifinal matchups will appear after QF results are entered</div>
          )}
          {hasSF && sfMatchups.map(({ label, t1, t2, note }) => (
            <div key={label} className="qf-card">
              <div className="qf-header">
                <span className="qf-title">{label}</span>
                <span className="qf-court">{note}</span>
              </div>
              <div className="qf-body">
                <div className="qf-team">{t1.length ? t1.join(' & ') : 'TBD'}</div>
                <div className="qf-vs">vs.</div>
                <div className="qf-team">{t2.length ? t2.join(' & ') : 'TBD'}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
