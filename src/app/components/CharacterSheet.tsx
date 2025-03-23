'use client';

import { useCharacter } from '../hooks/useCharacter';
import { CharacterIdentity } from './character/CharacterIdentity';
import { CharacterStats } from './character/CharacterStats';
import { CharacterSkills } from './character/CharacterSkills';
import { getMassModifier } from '../utils/massModifiers';
import { Tooltip } from './ui/Tooltip';

export default function CharacterSheet() {
  const {
    character,
    derivedStats,
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

          {character.poids > 0 && (
            <div className="massModifiers">
              <h3>
                Modificateurs de Masse
                <Tooltip content={
                  <table className="mass-table">
                    <thead>
                      <tr>
                        <th>Masse</th>
                        <th>Esquive</th>
                        <th>Évitement/Discrétion</th>
                        <th>Bonus Dégâts CAC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>≤ 50</td><td>+8</td><td>+4</td><td>-8</td></tr>
                      <tr><td>≤ 100</td><td>+6</td><td>+3</td><td>-6</td></tr>
                      <tr><td>≤ 150</td><td>+4</td><td>+2</td><td>-4</td></tr>
                      <tr><td>≤ 200</td><td>+2</td><td>+1</td><td>-2</td></tr>
                      <tr><td>240 ~ 260</td><td>0</td><td>0</td><td>0</td></tr>
                      <tr><td>&lt; 300</td><td>-2</td><td>-1</td><td>+2</td></tr>
                      <tr><td>&lt; 400</td><td>-4</td><td>-2</td><td>+4</td></tr>
                      <tr><td>&lt; 600</td><td>-6</td><td>-3</td><td>+6</td></tr>
                      <tr><td>&lt; 900</td><td>-8</td><td>-4</td><td>+8</td></tr>
                    </tbody>
                  </table>
                }>
                  <span className="info-icon">?</span>
                </Tooltip>
              </h3>
              <div className="modifiersGrid">
                {(() => {
                  const modifiers = getMassModifier(character.poids);
                  return (
                    <>
                      <p><strong>Esquive :</strong> <span className="value">{modifiers.esquive >= 0 ? '+' : ''}{modifiers.esquive}</span></p>
                      <p><strong>Évitement/Discrétion :</strong> <span className="value">{modifiers.evitement >= 0 ? '+' : ''}{modifiers.evitement}</span></p>
                      <p><strong>Bonus Dégâts CAC :</strong> <span className="value">{modifiers.degatCAC >= 0 ? '+' : ''}{modifiers.degatCAC}</span></p>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
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