const BASE_ID = 'appniAQEclhJxIyeO';
const API_KEY = 'pat4pPXzSiHXGsIdQ.b85d1355740455b2dafce4f7135063a8d760335216cbcdae1a780b22a178e763';
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

async function fetchTable(table, params = '') {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}${params}`, { headers });
  if (!res.ok) throw new Error(`Airtable error: ${res.status}`);
  const data = await res.json();
  return data.records;
}

export async function getPlayers() {
  const records = await fetchTable('Players', '?sort[0][field]=Rank&sort[0][direction]=asc');
  return records.map(r => ({
    id: r.id,
    name: r.fields['Name'] || '',
    rank: r.fields['Rank'] || 0,
    grade: r.fields['Grade'] || '',
    team: r.fields['Team'] || '',
    totalScore: r.fields['Total Score'] || 0,
    totalGamesGivenUp: r.fields['Total Games Given Up'] || 0,
    madePlayoffs: r.fields['Made Playoffs'] || false,
    madeSemifinals: r.fields['Made Semifinals'] || false,
    court: r.fields['Address (from Address (from Playoff Court))']?.[0] || '',
    qfGame: r.fields['Quarterfinals Game'] || '',
    sfGame: r.fields['Semifinals Game'] || '',
  }));
}

export async function getDivisions() {
  const records = await fetchTable('Divisions', '?sort[0][field]=Division&sort[0][direction]=asc');
  return records.map(r => ({
    id: r.id,
    name: r.fields['Division'] || '',
    court: r.fields['Court'] || '',
    playerNames: r.fields['Name (from Players)'] || [],
  }));
}

export async function getPlayoffCourts() {
  const records = await fetchTable('Playoff Courts');
  return records.map(r => ({
    id: r.id,
    name: r.fields['Name'] || '',
    address: r.fields['Address'] || '',
  }));
}

export async function submitScore(divisionName, set, teamAScore, teamBScore, teamA, teamB) {
  console.log('Score submitted:', { divisionName, set, teamAScore, teamBScore, teamA, teamB });
  return true;
}
