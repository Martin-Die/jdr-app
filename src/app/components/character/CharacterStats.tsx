import { Character } from '../../types/Character';

interface CharacterStatsProps {
  character: Character;
  onInputChange: (id: string, value: number) => void;
  pointsDisponibles: number;
};

type StatKey = 'force' | 'agilite' | 'perception' | 'constitution' | 'esprit' | 'charisme' | 'pouvoir';

const MIN_STAT = -3;
const MAX_LEVEL = 8;

export const CharacterStats = ({ character, onInputChange, pointsDisponibles }: CharacterStatsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onInputChange(id, value === '' ? 0 : Number(value));
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleIncrement = (id: StatKey) => {
    const currentValue = character[id] || 0;
    onInputChange(id, currentValue + 1);
  };

  const handleDecrement = (id: StatKey) => {
    const currentValue = character[id] || 0;
    if (id === 'pouvoir' && currentValue <= 0) return;
    onInputChange(id, currentValue - 1);
  };

  const handleLevelChange = (increment: boolean) => {
    const currentLevel = character.niveau || 1;
    const newLevel = increment ? currentLevel + 1 : currentLevel - 1;

    if (newLevel >= 1 && newLevel <= MAX_LEVEL) {
      onInputChange('niveau', newLevel);
    };
  };

  const stats = [
    { id: 'force', label: 'Force' },
    { id: 'agilite', label: 'Agilité' },
    { id: 'perception', label: 'Perception' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'esprit', label: 'Esprit' },
    { id: 'charisme', label: 'Charisme' },
    { id: 'pouvoir', label: 'Pouvoir' },
  ] as const;

  return (
    <div className="stats-section">
      <h2>Caractéristiques</h2>

      <div className="level-section">
        <label htmlFor="niveau">Niveau:</label>
        <div className="stat-input-group">
          <button
            className="stat-button"
            onClick={() => handleLevelChange(false)}
            aria-label="Diminuer le niveau"
            disabled={character.niveau <= 1}
          >
            -
          </button>
          <input
            type="number"
            id="niveau"
            value={character.niveau || 1}
            onChange={handleChange}
            onWheel={handleWheel}
            placeholder="Niveau"
            min={1}
            max={MAX_LEVEL}
          />
          <button
            className="stat-button"
            onClick={() => handleLevelChange(true)}
            aria-label="Augmenter le niveau"
            disabled={character.niveau >= MAX_LEVEL}
          >
            +
          </button>
        </div>
      </div>

      <div className="points-disponibles">
        Points disponibles: {pointsDisponibles}
      </div>

      {stats.map(({ id, label }) => (
        <div key={id} className="form-group stat-group">
          <label htmlFor={id}>{label}:</label>
          <div className="stat-input-group">
            <button
              className="stat-button"
              onClick={() => handleDecrement(id)}
              aria-label={`Diminuer ${label}`}
              disabled={id === 'pouvoir' ? character[id] <= 0 : character[id] <= MIN_STAT}
            >
              -
            </button>
            <input
              type="number"
              id={id}
              value={character[id] || 0}
              onChange={handleChange}
              onWheel={handleWheel}
              placeholder={label}
              min={id === 'pouvoir' ? "0" : MIN_STAT.toString()}
            />
            <button
              className="stat-button"
              onClick={() => handleIncrement(id)}
              aria-label={`Augmenter ${label}`}
              disabled={pointsDisponibles <= 0}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 