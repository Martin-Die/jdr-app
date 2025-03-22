import { DerivedStats as DerivedStatsType } from '../../types/Character';

interface DerivedStatsProps {
  stats: DerivedStatsType;
  onCalculer: () => void;
}

export const DerivedStats = ({ stats, onCalculer }: DerivedStatsProps) => {
  const statsLabels = {
    pv: 'Points de Vie',
    pp: 'Points de Pouvoir',
    lucidite: 'Lucidité',
    evitement: 'Évitement',
    encaissement: 'Encaissement',
    vitesse: 'Vitesse'
  };

  return (
    <div className="derived-stats-section">
      <h2>Statistiques Dérivées</h2>
      
      <div className="stats-grid">
        {(Object.entries(stats) as [keyof DerivedStatsType, number][]).map(([key, value]) => (
          <div key={key} className="stat-item">
            <label>{statsLabels[key]}:</label>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onCalculer}
        className="calculate-stats"
      >
        Calculer les statistiques
      </button>
    </div>
  );
}; 