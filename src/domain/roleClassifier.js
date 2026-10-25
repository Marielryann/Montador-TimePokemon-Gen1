/**
 * Classifica a função tática principal de um Pokémon com base nos seus status
 */
export function classifyPokemonRole(pokemon) {
  if (!pokemon) return 'Indefinido';

  // Suporta tanto pokemon.stats quanto pokemon.baseStats
  const stats = pokemon.stats || pokemon.baseStats || {};
  const { hp = 0, atk = 0, def = 0, spa = 0, spd = 0, spe = 0 } = stats;

  const total = hp + atk + def + spa + spd + spe;

  // Lógica de classificação por atributos
  if (spe >= 90 && (atk >= 90 || spa >= 90)) {
    return spa > atk ? 'Atacante Especial' : 'Atacante Físico';
  }

  if (hp >= 80 || def >= 90 || spd >= 90) {
    if (def >= spd) return 'Tanque Físico';
    return 'Tanque Especial';
  }

  if (spa > atk) return 'Atacante Especial';
  if (atk >= spa) return 'Atacante Físico';

  return 'Suporte / Utilitário';
}

/**
 * Analisa a distribuição de papéis da equipa completa
 */
export function analyzeTeamRoles(team = []) {
  const summary = {
    'Atacantes Físicos': 0,
    'Atacantes Especiais': 0,
    'Tanques Físicos': 0,
    'Tanques Especiais': 0,
    'Suporte / Utilitários': 0
  };

  team.forEach(pokemon => {
    if (!pokemon) return;
    const role = classifyPokemonRole(pokemon);

    if (role === 'Atacante Físico') summary['Atacantes Físicos']++;
    else if (role === 'Atacante Especial') summary['Atacantes Especiais']++;
    else if (role === 'Tanque Físico') summary['Tanques Físicos']++;
    else if (role === 'Tanque Especial') summary['Tanques Especiais']++;
    else summary['Suporte / Utilitários']++;
  });

  return summary;
}