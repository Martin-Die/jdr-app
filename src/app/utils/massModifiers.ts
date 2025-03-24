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

  // Définition des seuils de base (jusqu'à 300)
  const seuilsBase = [
    { min: 50, max: 100, mod: { esquive: 8, evitement: 4, degatCAC: -8 } },
    { min: 100, max: 150, mod: { esquive: 6, evitement: 3, degatCAC: -6 } },
    { min: 150, max: 200, mod: { esquive: 4, evitement: 2, degatCAC: -4 } },
    { min: 200, max: 240, mod: { esquive: 2, evitement: 1, degatCAC: -2 } },
    { min: 240, max: 260, mod: { esquive: 0, evitement: 0, degatCAC: 0 } },
    { min: 260, max: 300, mod: { esquive: -2, evitement: -1, degatCAC: 2 } }
  ];

  // Vérifier d'abord les seuils de base
  for (const seuil of seuilsBase) {
    if (masse > seuil.min && masse <= seuil.max) {
      return seuil.mod;
    }
  }

  // Si la masse est supérieure à 300, calculer le modificateur progressif
  if (masse >= 300) {
    const palier = Math.floor((masse - 300) / 100);
    if (palier <= 7) { // Limite à 8 paliers (jusqu'à 1000)
      return {
        esquive: -2 * (palier + 2),
        evitement: -1 * (palier + 2),
        degatCAC: 2 * (palier + 2)
      };
    }
  }

  // Valeur par défaut pour les masses très faibles
  return { esquive: 10, evitement: 5, degatCAC: -10 };
} 