import { useState, useCallback, useEffect } from 'react';
import { Character, DerivedStats } from '../types/Character';

const defaultCharacter: Character = {
  nomJoueur: '',
  nom: '',
  taille: 0,
  poids: 0,
  race: '',
  sexe: 'Masculin',
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

    setDerivedStats({
      pv: arrondir((masse / 10) + ((constitution + 5) * niveau)),
      pp: arrondir(10 + (pouvoir * niveau)),
      lucidite: arrondir(10 + esprit),
      evitement: arrondir(8 + (agilite)),
      encaissement: arrondir(8 + (constitution)),
      vitesse: arrondir(10 + (agilite / 2))
    });
  }, [character]);

  // Calculer automatiquement les stats dérivées quand les caractéristiques changent
  useEffect(() => {
    calculerStats();
  }, [character, calculerStats]);

  const handleInputChange = useCallback((id: string, value: string | number) => {
    setCharacter(prev => ({
      ...prev,
      [id]: value === '' ? '' :
        ['taille', 'poids', 'niveau', 'force', 'agilite', 'perception', 'constitution', 'esprit', 'charisme', 'pouvoir'].includes(id)
          ? Number(value)
          : value
    }));
  }, []);

  const ajouterCompetence = useCallback(() => {
    setCharacter(prev => ({
      ...prev,
      competences: [...prev.competences, { nom: '', niveau: '0', specialisation: '' }]
    }));
  }, []);

  const supprimerCompetence = useCallback((index: number) => {
    setCharacter(prev => ({
      ...prev,
      competences: prev.competences.filter((_, i) => i !== index)
    }));
  }, []);

  const handleCompetenceChange = useCallback((index: number, field: string, value: string) => {
    setCharacter(prev => ({
      ...prev,
      competences: prev.competences.map((comp, i) => {
        if (i === index) {
          return { ...comp, [field]: value };
        }
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
          const fileHandle = await (window as any).showSaveFilePicker(options);
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
          alert('Personnage sauvegardé avec succès !');
        } catch (err: any) {
          // Ne pas afficher l'erreur si c'est une annulation par l'utilisateur
          if (err.name !== 'AbortError') {
            console.error('Erreur lors de la sauvegarde:', err);
            alert('Erreur lors de la sauvegarde du personnage');
          }
        }
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
        alert('Personnage sauvegardé avec succès !');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du personnage');
    }
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
                competences: data.character.competences?.map((comp: { nom: string; niveau: string; specialisation?: string }) => ({
                  nom: comp.nom || '',
                  niveau: comp.niveau || '0',
                  specialisation: comp.specialisation || ''
                })) || []
              };

              const processedStats: DerivedStats = {
                pv: data.derivedStats.pv ?? 0,
                pp: data.derivedStats.pp ?? 0,
                lucidite: data.derivedStats.lucidite ?? 0,
                evitement: data.derivedStats.evitement ?? 0,
                encaissement: data.derivedStats.encaissement ?? 0,
                vitesse: data.derivedStats.vitesse ?? 0
              };

              setCharacter(processedCharacter);
              setDerivedStats(processedStats);
              alert('Personnage chargé avec succès !');
            } else {
              throw new Error('Format de fichier invalide');
            }
          } catch (error) {
            console.error('Erreur lors du chargement:', error);
            alert('Erreur lors du chargement du fichier');
          }
        };
        reader.readAsText(file);
      }
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
    charger
  };
}; 