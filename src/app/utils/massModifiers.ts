export interface MassModifier {
  esquive: number;
  evitement: number;
  degatCAC: number;
};

export function getMassModifier(poids: number, taille: number): MassModifier {
  const masse = poids + taille;

  // Définition des seuils de base (jusqu'à 300)
  const seuilsBase = [
    { min: 50, max: 100, stats: { esquive: 8, evitement: 4, degatCAC: -8 } },
    { min: 100, max: 150, stats: { esquive: 6, evitement: 3, degatCAC: -6 } },
    { min: 150, max: 200, stats: { esquive: 4, evitement: 2, degatCAC: -4 } },
    { min: 200, max: 240, stats: { esquive: 2, evitement: 1, degatCAC: -2 } },
    { min: 240, max: 261, stats: { esquive: 0, evitement: 0, degatCAC: 0 } },
    { min: 261, max: 301, stats: { esquive: -2, evitement: -1, degatCAC: 2 } },
  ];

  // Vérifier d'abord les seuils de base
  for (const seuil of seuilsBase) {
    if (masse >= seuil.min && masse < seuil.max) {
      return seuil.stats;
    };
  };

  // Si la masse est supérieure à 300, calculer le modificateur progressif
  if (masse > 300) {
    // Calcul direct du palier sans boucle
    const palier = Math.ceil((-1 + Math.sqrt(1 + 8 * (masse - 300) / 100)) / 2);

    return {
      esquive: (-2 * palier) - 2,
      evitement: (-1 * palier) - 1,
      degatCAC: (2 * palier) + 2
    };
  };

  // Valeur par défaut pour les masses très faibles
  return { esquive: 10, evitement: 5, degatCAC: -10 };
};