import { checkTypeCoverage } from './typeCoverage.js';
import { detectCores } from './coreDetector.js';
import { analyzeTeamRoles } from './roleClassifier.js';

/**
 * Realiza a validação e análise tática completa da equipa de Pokémon
 */
export function validateFullTeam(team = []) {
  // 1. Análise de Cobertura Defensiva e Fraquezas
  const typeAnalysis = checkTypeCoverage(team) || {
    weaknesses: [],
    resistances: [],
    immunities: [],
    alerts: []
  };

  // 2. Detecção de Núcleos Táticos (FWG, Tríplice, etc.)
  const coreAnalysis = detectCores(team) || {
    activeCores: [],
    alerts: []
  };

  // 3. Distribuição de Papéis / Funções dos Pokémon
  const rolesSummary = analyzeTeamRoles(team);

  // 4. Consolidação de Alertas da Equipa
  const typeAlerts = typeAnalysis.alerts || [];
  const coreAlerts = coreAnalysis.alerts || [];
  
  // Garante que a lista de alertas é um Array válido
  const combinedAlerts = [...typeAlerts, ...coreAlerts];

  return {
    teamLength: team.length,
    rolesSummary,
    activeCores: coreAnalysis.activeCores || [],
    alerts: combinedAlerts,
    typeCoverage: typeAnalysis
  };
}