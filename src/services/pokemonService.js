import { kantoPokemon } from '../data/kanto.js';

/**
 * Retorna a lista completa com todos os 151 Pokémon de Kanto
 */
export function getAllKantoPokemon() {
  return kantoPokemon;
}

/**
 * Filtra Pokémon pelo nome ou número do Pokédex (ID)
 */
export function searchKantoPokemon(query) {
  if (!query) return kantoPokemon;
  
  const cleanQuery = query.toLowerCase().trim();
  
  return kantoPokemon.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(cleanQuery);
    const matchesId = pokemon.id.toString() === cleanQuery;
    return matchesName || matchesId;
  });
}