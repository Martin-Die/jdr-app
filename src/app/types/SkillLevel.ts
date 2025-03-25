export interface SkillLevelInfo {
  rang: string;
  niveau: number;
  coutAmelioration: number;
  coutAchatDirect: number;
  bonusDes: number;
  specialisations: {
    basic: number;
    sansSpecialisation: number;
    nonMaitrise: number;
  };
}

export const SKILL_LEVELS: SkillLevelInfo[] = [
  {
    rang: "Novice",
    niveau: 1,
    coutAmelioration: 1,
    coutAchatDirect: 1,
    bonusDes: 1,
    specialisations: {
      basic: 0,
      sansSpecialisation: 0,
      nonMaitrise: 0
    }
  },
  {
    rang: "Débutant",
    niveau: 2,
    coutAmelioration: 2,
    coutAchatDirect: 2,
    bonusDes: 2,
    specialisations: {
      basic: 0,
      sansSpecialisation: 0,
      nonMaitrise: 0
    }
  },
  {
    rang: "Initié",
    niveau: 3,
    coutAmelioration: 3,
    coutAchatDirect: 4,
    bonusDes: 3,
    specialisations: {
      basic: 0,
      sansSpecialisation: 0,
      nonMaitrise: 0
    }
  },
  {
    rang: "Expert",
    niveau: 4,
    coutAmelioration: 4,
    coutAchatDirect: 7,
    bonusDes: 5,
    specialisations: {
      basic: 4,
      sansSpecialisation: 3,
      nonMaitrise: 2
    }
  },
  {
    rang: "Maître",
    niveau: 5,
    coutAmelioration: 6,
    coutAchatDirect: 11,
    bonusDes: 8,
    specialisations: {
      basic: 6,
      sansSpecialisation: 4,
      nonMaitrise: 2
    }
  },
  {
    rang: "Légendaire",
    niveau: 6,
    coutAmelioration: 8,
    coutAchatDirect: 17,
    bonusDes: 12,
    specialisations: {
      basic: 9,
      sansSpecialisation: 6,
      nonMaitrise: 3
    }
  },
  {
    rang: "Mythique",
    niveau: 7,
    coutAmelioration: 10,
    coutAchatDirect: 25,
    bonusDes: 17,
    specialisations: {
      basic: 13,
      sansSpecialisation: 9,
      nonMaitrise: 3
    }
  },
  {
    rang: "Divin",
    niveau: 8,
    coutAmelioration: -1, // X indique que ce n'est pas disponible
    coutAchatDirect: 35,
    bonusDes: 25,
    specialisations: {
      basic: 18,
      sansSpecialisation: 12,
      nonMaitrise: 5
    }
  }
];

export function getSkillLevelInfo(niveau: number): SkillLevelInfo | undefined {
  return SKILL_LEVELS.find(level => level.niveau === niveau);
}

export function getNextSkillLevel(currentNiveau: number): SkillLevelInfo | undefined {
  return SKILL_LEVELS.find(level => level.niveau === currentNiveau + 1);
}

export function getPreviousSkillLevel(currentNiveau: number): SkillLevelInfo | undefined {
  return SKILL_LEVELS.find(level => level.niveau === currentNiveau - 1);
}