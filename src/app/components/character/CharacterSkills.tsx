import { Character } from '../../types/Character';
import { competencesList } from '../../data/competences';
import { Tooltip } from '../ui/Tooltip';

interface CharacterSkillsProps {
  character: Character;
  onCompetenceChange: (index: number, field: string, value: string | number) => void;
  onAjouterCompetence: () => void;
  onSupprimerCompetence: (index: number) => void;
};

export const CharacterSkills = ({
  character,
  onCompetenceChange,
  onAjouterCompetence,
  onSupprimerCompetence
}: CharacterSkillsProps) => {
  const handleCompetenceSelect = (index: number, competence: string) => {
    onCompetenceChange(index, 'nom', competence);
  };

  const handleNiveauChange = (index: number, increment: boolean) => {
    const currentValue = character.competences[index].niveau || 0;
    const newValue = increment ? currentValue + 1 : currentValue - 1;
    onCompetenceChange(index, 'niveau', newValue);
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
            <div className="stat-input-group">
              <button
                className="stat-button"
                onClick={() => handleNiveauChange(index, false)}
                aria-label="Diminuer le niveau"
                disabled={comp.niveau <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={comp.niveau}
                onChange={(e) => onCompetenceChange(index, 'niveau', e.target.value === '' ? 1 : Number(e.target.value))}
                className="competence-level"
                min={1}
              />
              <button
                className="stat-button"
                onClick={() => handleNiveauChange(index, true)}
                aria-label="Augmenter le niveau"
                disabled={comp.niveau >= 5}
              >
                +
              </button>
            </div>
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