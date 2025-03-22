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
    onInputChange(id, value === '' ? '' : Number(value));
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
        <div key={id} className="form-group">
          <label htmlFor={id}>{label}:</label>
          <input
            type="number"
            id={id}
            value={character[id as StatKey] || ''}
            onChange={handleChange}
            placeholder={label}
            min="0"
            max="20"
          />
        </div>
      ))}
    </div>
  );
}; 