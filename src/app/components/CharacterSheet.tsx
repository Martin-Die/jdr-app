'use client';

import { useCharacter } from '../hooks/useCharacter';
import { CharacterIdentity } from './character/CharacterIdentity';
import { CharacterStats } from './character/CharacterStats';
import { CharacterSkills } from './character/CharacterSkills';

export default function CharacterSheet() {
  const {
    character,
    derivedStats,
    calculerStats,
    handleInputChange,
    ajouterCompetence,
    supprimerCompetence,
    handleCompetenceChange,
    sauvegarder,
    charger
  } = useCharacter();

  return (
    <div className="container">
      {/* Colonne de gauche - Modification */}
      <div className="modification">
        <h1>Création du Personnage</h1>

        <CharacterIdentity
          character={character}
          onInputChange={handleInputChange}
        />

        <CharacterStats
          character={character}
          onInputChange={handleInputChange}
        />

        <CharacterSkills
          character={character}
          onCompetenceChange={handleCompetenceChange}
          onAjouterCompetence={ajouterCompetence}
          onSupprimerCompetence={supprimerCompetence}
        />

        <div className="buttons">
          <button onClick={calculerStats}>Calculer les stats</button>
          <button onClick={sauvegarder}>Sauvegarder</button>
          <button onClick={charger}>Charger</button>
        </div>
      </div>

      {/* Colonne de droite - Affichage */}
      <div className="affichage">
        <h1>
          Fiche de {character.nomJoueur || 'personnage'}
          {character.niveau && ` - Niveau ${character.niveau}`}
        </h1>

        <div className="section">
          <h2>Identité</h2>
          <div className="fiche">
            <p><strong>Joueur :</strong> <span className="value">{character.nomJoueur}</span></p>
            <p><strong>Personnage :</strong> <span className="value">{character.nom}</span></p>
            <p><strong>Race :</strong> <span className="value">{character.race}</span></p>
            <p><strong>Âge :</strong> <span className="value">{character.age}</span></p>
            <p><strong>Taille :</strong> <span className="value">{character.taille} cm</span></p>
            <p><strong>Poids :</strong> <span className="value">{character.poids} kg</span></p>
            <p><strong>Statut :</strong> <span className="value">{character.statut}</span></p>
          </div>
        </div>

        <div className="section">
          <h2>Statistiques</h2>
          <div className="statsGrid">
            <p><strong>Force :</strong> <span className="value">{character.force}</span></p>
            <p><strong>Agilité :</strong> <span className="value">{character.agilite}</span></p>
            <p><strong>Perception :</strong> <span className="value">{character.perception}</span></p>
            <p><strong>Constitution :</strong> <span className="value">{character.constitution}</span></p>
            <p><strong>Esprit :</strong> <span className="value">{character.esprit}</span></p>
            <p><strong>Charisme :</strong> <span className="value">{character.charisme}</span></p>
            <p><strong>Pouvoir :</strong> <span className="value">{character.pouvoir}</span></p>
          </div>
        </div>

        <div className="section">
          <h2>Stats Dérivées</h2>
          <div className="statsDerivees">
            <p><strong>PV :</strong> <span className="value">{derivedStats.pv}</span></p>
            <p><strong>PP :</strong> <span className="value">{derivedStats.pp}</span></p>
            <p><strong>Lucidité :</strong> <span className="value">{derivedStats.lucidite}</span></p>
            <p><strong>Évitement :</strong> <span className="value">{derivedStats.evitement}</span></p>
            <p><strong>Encaissement :</strong> <span className="value">{derivedStats.encaissement}</span></p>
            <p><strong>Vitesse :</strong> <span className="value">{derivedStats.vitesse}</span></p>
          </div>
        </div>

        <div className="section">
          <h2>Compétences</h2>
          <div className="competences-list">
            {character.competences.map((comp, index) => (
              <p key={index}>
                <strong>{comp.nom} </strong>
                <span className="value">
                  Niveau {comp.niveau}
                  {comp.specialisation && ` (${comp.specialisation})`}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 