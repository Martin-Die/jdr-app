import { Character } from '../../types/Character';
import { competencesList } from '../../data/competences';
import { Tooltip } from '../ui/Tooltip';

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
  const handleCompetenceSelect = (index: number, competence: string) => {
    onCompetenceChange(index, 'nom', competence);
  };

  return (
    <div className="skills-section">
      <h2>Compétences</h2>

      <div className="competences-list">
        {character.competences.map((comp, index) => (
          <div key={index} className="competence-item">
            <div className="competence-input-group">
              <input
                type="text"
                value={comp.nom}
                onChange={(e) => onCompetenceChange(index, 'nom', e.target.value)}
                placeholder="Nom de la compétence"
                className="competence-name"
              />
              <Tooltip content={
                <div className="competences-tooltip">
                  <h4>Compétences disponibles</h4>
                  <div className="competences-grid">
                    {competencesList.map((c) => (
                      <div
                        key={c.nom}
                        className="competence-option"
                        onClick={() => handleCompetenceSelect(index, c.nom)}
                      >
                        <strong>{c.nom}</strong>
                        <p>{c.description}</p>
                        {c.specialisations && (
                          <div className="specialisations">
                            {c.specialisations.map((spec) => (
                              <span key={spec} className="specialisation-tag">
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              }>
                <span className="info-icon">?</span>
              </Tooltip>
            </div>
            <select
              value={comp.niveau}
              onChange={(e) => onCompetenceChange(index, 'niveau', e.target.value)}
              className="competence-level"
            >
              {[...Array(9)].map((_, i) => (
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