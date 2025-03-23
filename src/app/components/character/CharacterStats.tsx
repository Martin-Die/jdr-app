import { Character } from '../../types/Character';

interface CharacterStatsProps {
  character: Character;
  onInputChange: (id: string, value: string | number) => void;
}

type StatKey = 'force' | 'agilite' | 'perception' | 'constitution' | 'esprit' | 'charisme' | 'pouvoir';

export const CharacterStats = ({ character, onInputChange }: CharacterStatsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Si la valeur est vide, on envoie une chaîne vide, sinon on convertit en nombre
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
    onInputChange(id, currentValue - 1);
  };

  const stats = [
    { id: 'force', label: 'Force' },
    { id: 'agilite', label: 'Agilité' },
    { id: 'perception', label: 'Perception' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'esprit', label: 'Esprit' },
    { id: 'charisme', label: 'Charisme' },
    { id: 'pouvoir', label: 'Pouvoir' }
  ] as const;

  return (
    <div className="stats-section">
      <h2>Caractéristiques</h2>

      {stats.map(({ id, label }) => (
        <div key={id} className="form-group stat-group">
          <label htmlFor={id}>{label}:</label>
          <div className="stat-input-group">
            <button
              className="stat-button"
              onClick={() => handleDecrement(id)}
              aria-label={`Diminuer ${label}`}
            >
              -
            </button>
            <input
              type="number"
              id={id}
              value={character[id as StatKey] || 0}
              onChange={handleChange}
              onWheel={handleWheel}
              placeholder={label}
              min="-4"
            />
            <button
              className="stat-button"
              onClick={() => handleIncrement(id)}
              aria-label={`Augmenter ${label}`}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 