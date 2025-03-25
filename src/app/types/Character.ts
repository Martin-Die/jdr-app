export interface Character {
  nomJoueur: string;
  nom: string;
  taille: number;
  poids: number;
  masse: number;
  race: string;
  sexe: string;
  age: string;
  statut: string;
  niveau: number;
  competences: Array<{
    nom: string;
    niveau: number;
    rang?: string;
    specialisation?: string;
  }>;
  force: number;
  agilite: number;
  perception: number;
  constitution: number;
  esprit: number;
  charisme: number;
  pouvoir: number;
};

export interface DerivedStats {
  pv: number;
  pp: number;
  lucidite: number;
  evitement: number;
  encaissement: number;
  vitesse: number;
};