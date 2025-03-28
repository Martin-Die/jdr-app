import { useState, useCallback, useEffect } from 'react';
import { Character, DerivedStats } from '../types/Character';
import { getMassModifier } from '../utils/massModifiers';
import { getSkillLevelInfo } from '../types/SkillLevel';

interface FileSystemHandle {
  createWritable(): Promise<FileSystemWritableFileStream>;
};

interface FileSystemWritableFileStream {
  write(data: Blob): Promise<void>;
  close(): Promise<void>;
};

interface ShowFilePickerOptions {
  types: Array<{
    description: string;
    accept: Record<string, string[]>;
  }>;
  suggestedName: string;
};

interface WindowWithFileSystem extends Window {
  showSaveFilePicker(options: ShowFilePickerOptions): Promise<FileSystemHandle>;
};

const defaultCharacter: Character = {
  nomJoueur: '',
  nom: '',
  taille: 0,
  poids: 0,
  masse: 0,
  race: '',
  sexe: '',
  age: '',
  statut: '',
  niveau: 1,
  competences: [],
  force: 0,
  agilite: 0,
  perception: 0,
  constitution: 0,
  esprit: 0,
  charisme: 0,
  pouvoir: 0
};

const POINTS_INITIAUX = 4;
const POINTS_PAR_NIVEAU = 4;

export const useCharacter = () => {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [derivedStats, setDerivedStats] = useState<DerivedStats>({
    pv: 0,
    pp: 0,
    lucidite: 0,
    evitement: 0,
    encaissement: 0,
    vitesse: 0
  });

  const calculerStats = useCallback(() => {
    // Convertir les valeurs potentiellement vides en nombres (0 par défaut)
    const niveau = typeof character.niveau === 'number' ? character.niveau : 0;
    const poids = typeof character.poids === 'number' ? character.poids : 0;
    const taille = typeof character.taille === 'number' ? character.taille : 0;
    const masse = poids + taille;
    const constitution = typeof character.constitution === 'number' ? character.constitution : 0;
    const pouvoir = typeof character.pouvoir === 'number' ? character.pouvoir : 0;
    const esprit = typeof character.esprit === 'number' ? character.esprit : 0;
    const agilite = typeof character.agilite === 'number' ? character.agilite : 0;

    // Fonction utilitaire pour arrondir au supérieur si ≥ 0.5
    const arrondir = (nombre: number) => {
      const partieEntiere = Math.floor(nombre);
      const partieDecimale = nombre - partieEntiere;
      return partieDecimale >= 0.5 ? partieEntiere + 1 : partieEntiere;
    };

    // Calculer le bonus d'esquive
    const bonusEsquive = character.competences.reduce((bonus, comp) => {
      if (comp.nom === "Esquive") {
        return bonus + Number(comp.niveau);
      };
      return bonus;
    }, 0);

    // Calculer le bonus de parade
    const bonusParade = character.competences.reduce((bonus, comp) => {
      if (comp.nom === "Parade") {
        return bonus + Number(comp.niveau);
      };
      return bonus;
    }, 0);

    // Obtenir le modificateur de masse
    const massModifier = getMassModifier(character.poids, character.taille);

    setDerivedStats({
      pv: arrondir((masse / 10) + ((constitution + 5) * niveau)),
      pp: arrondir(10 + (pouvoir * niveau)),
      lucidite: arrondir(10 + esprit),
      evitement: arrondir(8 + (agilite + bonusEsquive + massModifier.evitement)),
      encaissement: arrondir(8 + (constitution + bonusParade)),
      vitesse: arrondir(10 + (agilite / 2)),
    });
  }, [character]);

  const calculerPointsDisponibles = useCallback(() => {
    const pointsBase = POINTS_INITIAUX + (character.niveau - 1) * POINTS_PAR_NIVEAU;
    const stats = ['force', 'agilite', 'perception', 'constitution', 'esprit', 'charisme', 'pouvoir'];
    const pointsUtilises = stats.reduce((total, stat) => {
      const valeur = character[stat as keyof Character] as number;
      // Les points positifs soustraient du total
      // Les points négatifs ajoutent au total
      return total + (valeur > 0 ? valeur : 0);
    }, 0);
    const pointsGagnes = stats.reduce((total, stat) => {
      const valeur = character[stat as keyof Character] as number;
      // Les points négatifs ajoutent au total
      return total + (valeur < 0 ? Math.abs(valeur) : 0);
    }, 0);
    return pointsBase - pointsUtilises + pointsGagnes;
  }, [character]);

  const handleStatChange = useCallback((id: string, value: number) => {
    const statKey = id as keyof Character;
    const ancienneValeur = character[statKey] as number;
    const pointsDisponibles = calculerPointsDisponibles();

    // Calculer la différence en points
    let difference = 0;
    if (value > 0) {
      // Si on passe à une valeur positive, on soustrait les points
      difference = value - (ancienneValeur > 0 ? ancienneValeur : 0);
    } else if (value < 0) {
      // Si on passe à une valeur négative, on ajoute les points
      difference = Math.abs(value) - (ancienneValeur < 0 ? Math.abs(ancienneValeur) : 0);
    } else {
      // Si on passe à 0, on récupère les points de l'ancienne valeur
      difference = ancienneValeur > 0 ? -ancienneValeur : Math.abs(ancienneValeur);
    };

    // Vérifier si le changement est valide uniquement pour les valeurs positives
    if (value > ancienneValeur && difference > pointsDisponibles) {
      alert('Points de caractéristiques insuffisants');
      return;
    };

    // Vérifier uniquement la limite minimale du pouvoir
    if (statKey === 'pouvoir' && value < 0) {
      alert('Le pouvoir ne peut pas être négatif');
      return;
    };

    setCharacter(prev => ({
      ...prev,
      [statKey]: value
    }));
  }, [character, calculerPointsDisponibles]);

  // Calculer automatiquement les stats dérivées quand les caractéristiques changent
  useEffect(() => {
    calculerStats();
  }, [character, calculerStats]);

  const handleInputChange = useCallback((id: string, value: string | number) => {
    if (['force', 'agilite', 'perception', 'constitution', 'esprit', 'charisme', 'pouvoir'].includes(id)) {
      handleStatChange(id, Number(value));
    } else {
      setCharacter(prev => ({
        ...prev,
        [id]: value === '' ? '' :
          ['taille', 'poids', 'niveau'].includes(id)
            ? Number(value)
            : value,
        masse: id === 'taille' ? Number(value) + prev.poids :
          id === 'poids' ? prev.taille + Number(value) :
            prev.masse
      }));
    };
  }, [handleStatChange]);

  const ajouterCompetence = useCallback(() => {
    const levelInfo = getSkillLevelInfo(1);
    setCharacter(prev => ({
      ...prev,
      competences: [...prev.competences, { nom: '', niveau: 1, rang: levelInfo?.rang || 'Novice', specialisation: '' }]
    }));
  }, []);

  const supprimerCompetence = useCallback((index: number) => {
    setCharacter(prev => ({
      ...prev,
      competences: prev.competences.filter((_, i) => i !== index)
    }));
  }, []);

  const handleCompetenceChange = useCallback((index: number, field: string, value: string | number) => {
    setCharacter(prev => ({
      ...prev,
      competences: prev.competences.map((comp, i) => {
        if (i === index) {
          return { ...comp, [field]: value };
        };
        return comp;
      })
    }));
  }, []);

  const sauvegarder = useCallback(async () => {
    try {
      const data = {
        character,
        derivedStats
      };
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Vérifier si l'API showSaveFilePicker est supportée
      if ('showSaveFilePicker' in window) {
        const options = {
          types: [{
            description: 'Fichier JSON',
            accept: {
              'application/json': ['.json']
            }
          }],
          suggestedName: `${character.nom || 'personnage'}.json`
        };

        try {
          const fileHandle = await (window as WindowWithFileSystem).showSaveFilePicker(options);
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
        } catch (err: unknown) {
          // Ne pas afficher l'erreur si c'est une annulation par l'utilisateur
          if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Erreur lors de la sauvegarde:', err);
            alert('Erreur lors de la sauvegarde du personnage');
          };
        };
      } else {
        // Fallback pour les navigateurs qui ne supportent pas showSaveFilePicker
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${character.nom || 'personnage'}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du personnage');
    };
  }, [character, derivedStats]);

  const charger = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            const data = JSON.parse(content);
            if (data.character && data.derivedStats) {
              // S'assurer que toutes les valeurs numériques sont initialisées
              const processedCharacter: Character = {
                ...defaultCharacter,
                ...data.character,
                taille: data.character.taille ?? 0,
                poids: data.character.poids ?? 0,
                niveau: data.character.niveau ?? 1,
                force: data.character.force ?? 0,
                agilite: data.character.agilite ?? 0,
                perception: data.character.perception ?? 0,
                constitution: data.character.constitution ?? 0,
                esprit: data.character.esprit ?? 0,
                charisme: data.character.charisme ?? 0,
                pouvoir: data.character.pouvoir ?? 0,
                competences: data.character.competences?.map((comp: { nom: string; niveau: number; specialisation?: string; rang?: string }) => {
                  const levelInfo = getSkillLevelInfo(comp.niveau || 1);
                  return {
                    nom: comp.nom || '',
                    niveau: comp.niveau || 1,
                    rang: comp.rang || levelInfo?.rang || 'Novice',
                    specialisation: comp.specialisation || '',
                  };
                }) || [],
              };

              const processedStats: DerivedStats = {
                pv: data.derivedStats.pv ?? 0,
                pp: data.derivedStats.pp ?? 0,
                lucidite: data.derivedStats.lucidite ?? 0,
                evitement: data.derivedStats.evitement ?? 0,
                encaissement: data.derivedStats.encaissement ?? 0,
                vitesse: data.derivedStats.vitesse ?? 0,
              };

              setCharacter(processedCharacter);
              setDerivedStats(processedStats);
            } else {
              throw new Error('Format de fichier invalide');
            };
          } catch (error) {
            console.error('Erreur lors du chargement:', error);
            alert('Erreur lors du chargement du fichier');
          };
        };
        reader.readAsText(file);
      };
    };
    input.click();
  }, []);

  return {
    character,
    derivedStats,
    calculerStats,
    handleInputChange,
    ajouterCompetence,
    supprimerCompetence,
    handleCompetenceChange,
    sauvegarder,
    charger,
    calculerPointsDisponibles,
  };
}; 