interface MassModifier {
  esquive: number;
  evitement: number;
  degatCAC: number;
}

export function getMassModifier(poids: number): MassModifier {
  if (poids <= 50) return { esquive: 8, evitement: 4, degatCAC: -8 };
  if (poids <= 100) return { esquive: 6, evitement: 3, degatCAC: -6 };
  if (poids <= 150) return { esquive: 4, evitement: 2, degatCAC: -4 };
  if (poids <= 200) return { esquive: 2, evitement: 1, degatCAC: -2 };
  if (poids >= 240 && poids <= 260) return { esquive: 0, evitement: 0, degatCAC: 0 };
  if (poids < 300) return { esquive: -2, evitement: -1, degatCAC: 2 };
  if (poids < 400) return { esquive: -4, evitement: -2, degatCAC: 4 };
  if (poids < 600) return { esquive: -6, evitement: -3, degatCAC: 6 };
  return { esquive: -8, evitement: -4, degatCAC: 8 };
} 