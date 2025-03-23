export interface Competence {
  nom: string;
  description: string;
  specialisations?: string[];
}

export const competencesList: Competence[] = [
  {
    nom: "Esquive",
    description: "Capacité à éviter les attaques",
    specialisations: ["Esquive roulée", "Esquive latérale", "Esquive arrière", "Contre-attaque"]
  },
  {
    nom: "Parade",
    description: "Maîtrise de la défense",
    specialisations: ["Parade haute", "Parade basse", "Parade latérale", "Riposte"]
  },
  {
    nom: "Combat",
    description: "Maîtrise des techniques de combat",
    specialisations: ["Arme à une main", "Arme à deux mains", "Arme à distance", "Combat à mains nues"]
  },
  {
    nom: "Survie",
    description: "Capacité à survivre dans la nature",
    specialisations: ["Navigation", "Pistage", "Chasse", "Pêche"]
  },
  {
    nom: "Discrétion",
    description: "Art de passer inaperçu",
    specialisations: ["Infiltration", "Camouflage", "Pickpocket", "Crochetage"]
  },
  {
    nom: "Athlétisme",
    description: "Capacités physiques générales",
    specialisations: ["Course", "Escalade", "Saut", "Natation"]
  },
  {
    nom: "Connaissance",
    description: "Savoir théorique",
    specialisations: ["Histoire", "Nature", "Religion", "Arcane", "Médicine"]
  },
  {
    nom: "Artisanat",
    description: "Création d'objets",
    specialisations: ["Forge", "Alchimie", "Enchantement", "Menuiserie"]
  },
  {
    nom: "Diplomatie",
    description: "Art de la négociation",
    specialisations: ["Persuasion", "Intimidation", "Bluff", "Étiquette"]
  },
  {
    nom: "Perception",
    description: "Vigilance et observation",
    specialisations: ["Vue", "Ouïe", "Odorat", "Toucher"]
  },
  {
    nom: "Acrobatie",
    description: "Agilité et équilibre",
    specialisations: ["Équilibre", "Souplesse", "Contorsion", "Parkour"]
  },
  {
    nom: "Médecine",
    description: "Soins et guérison",
    specialisations: ["Premiers soins", "Chirurgie", "Herboristerie", "Toxicologie"]
  }
]; 