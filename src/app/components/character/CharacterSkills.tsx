import { Character } from '../../types/Character';

interface CharacterSkillsProps {
  character: Character;
  onCompetenceChange: (index: number, field: string, value: string) => void;
  onAjouterCompetence: () => void;
  onSupprimerCompetence: (index: number) => void;
}

export const CharacterSkills = ({
  character,
  onCompetenceChange,
  onAjouterCompetence,
  onSupprimerCompetence
}: CharacterSkillsProps) => {
  return (
    <div className="skills-section">
      <h2>Compétences</h2>

      <div className="competences-list">
        {character.competences.map((comp, index) => (
          <div key={index} className="competence-item">
            <input
              type="text"
              value={comp.nom}
              onChange={(e) => onCompetenceChange(index, 'nom', e.target.value)}
              placeholder="Nom de la compétence"
              className="competence-name"
            />
            <select
              value={comp.niveau}
              onChange={(e) => onCompetenceChange(index, 'niveau', e.target.value)}
              className="competence-level"
            >
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            {comp.specialisation !== undefined && (
              <input
                type="text"
                value={comp.specialisation}
                onChange={(e) => onCompetenceChange(index, 'specialisation', e.target.value)}
                placeholder="Spécialisation"
                className="competence-specialization"
              />
            )}
            <button
              onClick={() => onSupprimerCompetence(index)}
              className="delete-skill"
              aria-label="Supprimer la compétence"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onAjouterCompetence}
        className="add-skill"
      >
        + Ajouter une compétence
      </button>
    </div>
  );
}; 