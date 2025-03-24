export interface MassModifier {
  esquive: number;
  evitement: number;
  degatCAC: number;
}

export function getMassModifier(poids: number, taille: number): MassModifier {
  const masse = poids + taille;

  // Définition des seuils de base (jusqu'à 300)
  const seuilsBase = [
    { min: 50, max: 100, stats: { esquive: 8, evitement: 4, degatCAC: -8 } },
    { min: 100, max: 150, stats: { esquive: 6, evitement: 3, degatCAC: -6 } },
    { min: 150, max: 200, stats: { esquive: 4, evitement: 2, degatCAC: -4 } },
    { min: 200, max: 240, stats: { esquive: 2, evitement: 1, degatCAC: -2 } },
    { min: 240, max: 260, stats: { esquive: 0, evitement: 0, degatCAC: 0 } },
    { min: 260, max: 300, stats: { esquive: -2, evitement: -1, degatCAC: 2 } }
  ];

  // Vérifier d'abord les seuils de base
  for (const seuil of seuilsBase) {
    if (masse > seuil.min && masse <= seuil.max) {
      return seuil.stats;
    }
  }

  // Si la masse est supérieure à 300, calculer le modificateur progressif
  if (masse >= 300) {
    // Calcul direct du palier sans boucle
    // La formule est basée sur la somme des séries arithmétiques
    // Pour chaque palier n, la masse maximale est: 300 + 100 + 200 + 300 + ... + (n-1)*100
    // Ce qui donne: 300 + 100 * (n-1) * n / 2
    // En résolvant pour n, on obtient:
    const palier = Math.ceil((-1 + Math.sqrt(1 + 8 * (masse - 300) / 100)) / 2);
    
    return {
      esquive: -2 * palier,
      evitement: -1 * palier,
      degatCAC: 2 * palier
    };
  }

  // Valeur par défaut pour les masses très faibles
  return { esquive: 10, evitement: 5, degatCAC: -10 };
} 