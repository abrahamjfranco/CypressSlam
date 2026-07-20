import React from 'react';

export default function Standings({ players }) {
  const sorted = [...players]
    .filter(p => p.totalScore > 0 || p.madePlayoffs)
    .sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (a.totalGamesGivenUp !== b.totalGamesGivenUp) return a.totalGamesGivenUp - b.totalGamesGivenUp;
      return a.rank - b.rank;
    });

  return (
    <div>
      <div className="alert alert-info" style={{ marginBottom: 12 }}>
        <span>📊</span>
        <div style={{ fontSize: 12 }}>Ranked by games won — top 16 advance to playoffs</div>
      </div>

      {sorted.map((p, i) => {
        const pos = i + 1;
        const inPlayoffs = pos <= 16;
        const showCutline = i === 15 && sorted.length > 16;

        return (
          <React.Fragment key={p.id}>
            <div className={`rank-row ${p.madePlayoffs ? 'me' : ''}`}>
              <div className={`rank-pos ${!inPlayoffs ? 'out' : ''}`}>{pos}</div>
              <div className="rank-name">
                {p.name}
                {p.madePlayoffs && (
                  <span className="badge badge-blue" style={{ marginLeft: 6 }}>Playoffs ✓</span>
                )}
              </div>
              <div className="rank-score">
                <div className="rank-score-main">{p.totalScore} won</div>
                <div className="rank-score-sub">{p.totalGamesGivenUp} lost</div>
              </div>
            </div>
            {showCutline && (
              <div className="cutline">— Playoff cutline —</div>
            )}
          </React.Fragment>
        );
      })}

      {sorted.length === 0 && (
        <div className="loading">Scores will appear here once matches are played</div>
      )}
    </div>
  );
}
