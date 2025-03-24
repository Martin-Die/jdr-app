export interface Competence {
  nom: string;
  description: string;
  specialisations?: string[];
}

export const competencesList: Competence[] = [
  // Compétences de combat
  {
    nom: "Esquive",
    description: "Capacité à éviter les attaques",
    specialisations: ["Esquive roulée", "Esquive latérale", "Esquive arrière"],
  },
  {
    nom: "Parade",
    description: "Maîtrise de la défense",
    specialisations: ["Parade haute", "Parade basse", "Parade latérale"],
  },
  {
    nom: "Acrobatie",
    description: "Agilité et contrôle du corps",
    specialisations: ["Saut", "Roulade", "Équilibre"],
  },
  {
    nom: "Corps-à-Corps",
    description: "Combat rapproché",
    specialisations: ["Boxe", "Grappling", "Arts martiaux"],
  },
  {
    nom: "Tir",
    description: "Maîtrise des armes à distance",
    specialisations: ["Tir précis", "Tir rapide", "Tir mobile"],
  },
  {
    nom: "Pilotage",
    description: "Contrôle des véhicules",
    specialisations: ["Voiture", "Moto", "Avion"],
  },

  // Compétences de furtivité
  {
    nom: "Furtivité",
    description: "Déplacement silencieux",
    specialisations: ["Camouflage", "Déplacement silencieux", "Dissimulation"],
  },
  {
    nom: "Pistage",
    description: "Suivi et identification de traces",
    specialisations: ["Traces", "Odeurs", "Signes"],
  },
  {
    nom: "Survie",
    description: "Adaptation en milieu hostile",
    specialisations: ["Navigation", "Orientation", "Ressources"],
  },
  {
    nom: "Dissimulation",
    description: "Art de se cacher",
    specialisations: ["Camouflage", "Infiltration", "Mimétisme"],
  },
  {
    nom: "Vole",
    description: "Vol et subtilisation",
    specialisations: ["Pickpocket", "Crochetage", "Infiltration"],
  },
  {
    nom: "Piégeage",
    description: "Installation et détection de pièges",
    specialisations: ["Installation", "Détection", "Désamorçage"],
  },

  // Compétences sociales
  {
    nom: "Intimidation",
    description: "Influence par la force",
    specialisations: ["Physique", "Psychologique", "Verbale"],
  },
  {
    nom: "Négociation",
    description: "Art de la persuasion",
    specialisations: ["Diplomatie", "Marchandage", "Persuasion"],
  },
  {
    nom: "Psychologie",
    description: "Compréhension du comportement humain",
    specialisations: ["Analyse", "Manipulation", "Thérapie"],
  },

  // Compétences de connaissances
  {
    nom: "Histoire",
    description: "Connaissance du passé",
    specialisations: ["Histoire locale", "Histoire militaire", "Histoire culturelle"],
  },
  {
    nom: "Ingénierie",
    description: "Conception et construction",
    specialisations: ["Construction", "Réparation", "Innovation"],
  },
  {
    nom: "Arcane",
    description: "Connaissance des forces mystiques",
    specialisations: ["Rituels", "Sorts", "Artéfacts"],
  },
  {
    nom: "Médecine",
    description: "Soins et diagnostic",
    specialisations: ["Premiers soins", "Diagnostic", "Chirurgie"],
  },
  {
    nom: "Biologie",
    description: "Étude du vivant",
    specialisations: ["Anatomie", "Physiologie", "Écologie"],
  },
  {
    nom: "Informatique",
    description: "Maîtrise des systèmes informatiques",
    specialisations: ["Programmation", "Sécurité", "Réseaux"],
  },

  // Compétences techniques
  {
    nom: "Armurerie",
    description: "Maintenance et modification d'armes",
    specialisations: ["Réparation", "Modification", "Identification"],
  },
  {
    nom: "Mécanique",
    description: "Maintenance des machines",
    specialisations: ["Réparation", "Bricolage", "Optimisation"],
  },
  {
    nom: "Cuisine",
    description: "Art culinaire",
    specialisations: ["Cuisine", "Pâtisserie", "Conservation"],
  },
  {
    nom: "Fouille",
    description: "Recherche et analyse",
    specialisations: ["Recherche", "Analyse", "Documentation"],
  }
];