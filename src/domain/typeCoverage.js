import typeChart from '../data/typeChart.js';

/**
 * Analisa as fraquezas, resistências e imunidades da equipa
 */
export function checkTypeCoverage(team = []) {
  if (!team || team.length === 0) {
    return {
      weaknesses: [],
      resistances: [],
      immunities: [],
      alerts: []
    };
  }

  const alerts = [];
  const types = Object.keys(typeChart);

  let hasGroundImmunity = false;
  let hasElectricImmunity = false;

  team.forEach(pokemon => {
    if (!pokemon || !pokemon.types) return;

    if (pokemon.types.includes('Flying')) hasGroundImmunity = true;
    if (pokemon.types.includes('Ground')) hasElectricImmunity = true;
  });

  if (!hasGroundImmunity) {
    alerts.push({
      type: 'warning',
      message: 'A sua equipa não possui imunidade a Ground (ex: Tipo Flying).'
    });
  }

  if (!hasElectricImmunity) {
    alerts.push({
      type: 'warning',
      message: 'A sua equipa não possui imunidade a Electric (ex: Tipo Ground).'
    });
  }

  return {
    alerts
  };
}