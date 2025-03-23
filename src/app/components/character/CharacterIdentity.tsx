import { Character } from '../../types/Character';

interface CharacterIdentityProps {
  character: Character;
  onInputChange: (id: string, value: string | number) => void;
}

export const CharacterIdentity = ({ character, onInputChange }: CharacterIdentityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    onInputChange(id, value);
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="identity-section">
      <h2>Identité</h2>
      
      <div className="form-group">
        <label htmlFor="nomJoueur">Nom du joueur:</label>
        <input
          type="text"
          id="nomJoueur"
          value={character.nomJoueur}
          onChange={handleChange}
          placeholder="Entrez votre nom"
        />
      </div>

      <div className="form-group">
        <label htmlFor="nom">Nom du personnage:</label>
        <input
          type="text"
          id="nom"
          value={character.nom}
          onChange={handleChange}
          placeholder="Entrez le nom du personnage"
        />
      </div>

      <div className="form-group">
        <label htmlFor="niveau">Niveau:</label>
        <input
          type="number"
          id="niveau"
          value={character.niveau || ''}
          onChange={handleChange}
          onWheel={handleWheel}
          placeholder="Niveau du personnage"
          min="1"
          max="20"
        />
      </div>

      <div className="form-group">
        <label htmlFor="taille">Taille (cm):</label>
        <input
          type="number"
          id="taille"
          value={character.taille || ''}
          onChange={handleChange}
          onWheel={handleWheel}
          placeholder="Taille en cm"
        />
      </div>

      <div className="form-group">
        <label htmlFor="poids">Poids (kg):</label>
        <input
          type="number"
          id="poids"
          value={character.poids || ''}
          onChange={handleChange}
          onWheel={handleWheel}
          placeholder="Poids en kg"
        />
      </div>

      <div className="form-group">
        <label htmlFor="race">Race:</label>
        <input
          type="text"
          id="race"
          value={character.race}
          onChange={handleChange}
          placeholder="Race"
        />
      </div>

      <div className="form-group">
        <label htmlFor="sexe">Sexe:</label>
        <select
          id="sexe"
          value={character.sexe}
          onChange={handleChange}
        >
          <option value="Masculin">Masculin</option>
          <option value="Féminin">Féminin</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          value={character.age}
          onChange={handleChange}
          placeholder="Age"
        />
      </div>

      <div className="form-group">
        <label htmlFor="statut">Statut:</label>
        <input
          type="text"
          id="statut"
          value={character.statut}
          onChange={handleChange}
          placeholder="Statut"
        />
      </div>
    </div>
  );
}; 