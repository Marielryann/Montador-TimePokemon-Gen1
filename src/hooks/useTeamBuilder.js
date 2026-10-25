import { useState, useMemo } from 'react';
import { validateFullTeam } from '../domain/teamValidator.js';

export function useTeamBuilder(initialTeam = []) {
  // Estado que armazena até 6 Pokémon na equipa
  const [team, setTeam] = useState(initialTeam);

  /**
   * Adiciona um Pokémon à equipa se houver vaga (máx: 6)
   */
  const addPokemon = (pokemon) => {
    if (!pokemon) return;
    if (team.length >= 6) {
      alert("A sua equipa já possui 6 Pokémon! Remova um para adicionar outro.");
      return;
    }
    setTeam(prevTeam => [...prevTeam, pokemon]);
  };

  /**
   * Remove um Pokémon da equipa pelo índice do slot
   */
  const removePokemon = (index) => {
    setTeam(prevTeam => prevTeam.filter((_, i) => i !== index));
  };

  /**
   * Substitui um Pokémon num slot específico
   */
  const replacePokemon = (index, newPokemon) => {
    if (!newPokemon) return;
    setTeam(prevTeam => {
      const updated = [...prevTeam];
      updated[index] = newPokemon;
      return updated;
    });
  };

  /**
   * Limpa a equipa inteira
   */
  const clearTeam = () => {
    setTeam([]);
  };

  /**
   * Recalcula a análise completa da equipa em tempo real (Memoizado)
   */
  const analysis = useMemo(() => {
    return validateFullTeam(team);
  }, [team]);

  return {
    team,
    addPokemon,
    removePokemon,
    replacePokemon,
    clearTeam,
    analysis, // 👈 Aqui estava a tentar retornar 'analysisReport' em vez de 'analysis'
    isFull: team.length === 6
  };
}