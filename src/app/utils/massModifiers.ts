export interface MassModifier {
  esquive: number;
  evitement: number;
  degatCAC: number;
}

export function calculerMasse(poids: number, taille: number): number {
  return poids + taille;
}

export function getMassModifier(poids: number, taille: number): MassModifier {
  const masse = calculerMasse(poids, taille);

  switch (true) {
    case masse > 50 && masse <= 100:
      return { esquive: 8, evitement: 4, degatCAC: -8 };

    case masse > 100 && masse <= 150:
      return { esquive: 6, evitement: 3, degatCAC: -6 };

    case masse > 150 && masse <= 200:
      return { esquive: 4, evitement: 2, degatCAC: -4 };

    case masse > 200 && masse <= 240:
      return { esquive: 2, evitement: 1, degatCAC: -2 };

    case masse > 240 && masse < 260:
      return { esquive: 0, evitement: 0, degatCAC: 0 };

    case masse >= 260 && masse < 300:
      return { esquive: -2, evitement: -1, degatCAC: 2 };

    case masse >= 300 && masse < 400:
      return { esquive: -4, evitement: -2, degatCAC: 4 };

    case masse >= 400 && masse < 600:
      return { esquive: -6, evitement: -3, degatCAC: 6 };

    case masse >= 600 && masse < 800:
      return { esquive: -8, evitement: -4, degatCAC: 8 };

    default:
      return { esquive: 10, evitement: 5, degatCAC: -10 };
  }
} 