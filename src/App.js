import React, { useState, useEffect } from 'react';
import { getPlayers, getDivisions } from './airtable';
import './styles.css';

import Home from './pages/Home';
import MyDivision from './pages/MyDivision';
import Standings from './pages/Standings';
import Bracket from './pages/Bracket';
import Scores from './pages/Scores';

const NAV = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'division', label: 'Division', icon: CourtIcon },
  { id: 'scores', label: 'Scores', icon: EditIcon },
  { id: 'standings', label: 'Standings', icon: ChartIcon },
  { id: 'bracket', label: 'Bracket', icon: TrophyIcon },
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [players, setPlayers] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPlayers(), getDivisions()])
      .then(([p, d]) => { setPlayers(p); setDivisions(d); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const playoffPlayers = players.filter(p => p.madePlayoffs);
  const tabs = ['home', 'division', 'standings', 'bracket'];

  return (
    <div>
      <header className="app-header">
        <div className="header-top">
          <div>
            <div className="header-title">Cypress Slam 2025</div>
            <div className="header-name">Tournament Hub</div>
          </div>
          <div className="avatar">🎾</div>
        </div>
        <div className="header-tabs">
          {tabs.map(t => (
            <button
              key={t}
              className={`header-tab ${tab === t ? 'active' : 'inactive'}`}
              onClick={() => setTab(t)}
            >
              {t === 'home' ? 'Home' : t === 'division' ? 'Divisions' : t === 'standings' ? 'Standings' : 'Bracket'}
            </button>
          ))}
        </div>
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">Loading tournament data…</div>
        ) : (
          <>
            {tab === 'home' && <Home players={players} divisions={divisions} setTab={setTab} />}
            {tab === 'division' && <MyDivision divisions={divisions} players={players} />}
            {tab === 'standings' && <Standings players={players} />}
            {tab === 'bracket' && <Bracket players={playoffPlayers} />}
            {tab === 'scores' && <Scores divisions={divisions} />}
          </>
        )}
      </main>

      <nav className="bottom-nav">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-btn ${tab === id ? 'active' : 'inactive'}`}
            onClick={() => setTab(id)}
          >
            <Icon />
            <span className="nav-label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function CourtIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></svg>;
}
function EditIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function ChartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function TrophyIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4h10v8a5 5 0 01-10 0V4z"/><path d="M7 8H4a1 1 0 00-1 1v1a4 4 0 004 4"/><path d="M17 8h3a1 1 0 011 1v1a4 4 0 01-4 4"/></svg>;
}
