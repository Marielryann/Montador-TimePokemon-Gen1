/**
 * Deteta núcleos táticos na equipa (FWG, Tripla Imunidade, etc.)
 */
export function detectCores(team = []) {
  const activeCores = [];
  const alerts = [];

  if (!team || team.length === 0) {
    return { activeCores, alerts };
  }

  // Extrai todos os tipos presentes na equipa de forma única
  const teamTypes = new Set();
  team.forEach(pokemon => {
    if (pokemon && pokemon.types) {
      pokemon.types.forEach(t => teamTypes.add(t));
    }
  });

  // 1. Núcleo Fogo / Água / Grama (FWG Core)
  const hasFire = teamTypes.has('Fire');
  const hasWater = teamTypes.has('Water');
  const hasGrass = teamTypes.has('Grass');

  if (hasFire && hasWater && hasGrass) {
    activeCores.push({
      id: 'fwg',
      name: 'Fogo / Água / Grama (FWG)',
      description: 'Núcleo defensivo e ofensivo clássico completo.',
      status: 'active'
    });
  }

  // 2. Núcleo de Imunidades Triplas (Ground / Electric / Flying)
  const hasFlying = teamTypes.has('Flying');
  const hasGround = teamTypes.has('Ground');
  const hasElectric = teamTypes.has('Electric');

  if (hasFlying && hasGround && hasElectric) {
    activeCores.push({
      id: 'triple_immunity',
      name: 'Imunidade Tríplice',
      description: 'Cobertura com trocas livres contra Ground e Electric.',
      status: 'active'
    });
  }

  return {
    activeCores,
    alerts
  };
}