import React from 'react';

export function PokemonCard({ pokemon, onRemove, index }) {
  if (!pokemon) return null;

  // Garante valores padrão seguros para evitar erros de desestruturação
  const stats = pokemon.stats || pokemon.baseStats || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  const types = Array.isArray(pokemon.types) ? pokemon.types : [];
  const name = pokemon.name || 'Desconhecido';
  const id = pokemon.id ? String(pokemon.id).padStart(3, '0') : '???';
  const sprite = pokemon.sprite || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  return (
    <div className="pokemon-card">
      <button 
        className="remove-btn" 
        onClick={() => onRemove(index)} 
        title="Remover Pokémon"
      >
        ✕
      </button>

      <span className="pokemon-id">#{id}</span>

      <img 
        src={sprite} 
        alt={name} 
        className="pokemon-sprite"
        onError={(e) => { 
          e.target.onerror = null;
          e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'; 
        }}
      />

      <h4 className="pokemon-name">{name}</h4>

      <div className="pokemon-types">
        {types.map((type, idx) => (
          <span key={idx} className={`type-badge type-${String(type).toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>

      <div className="stats-preview">
        <div><strong>HP:</strong> {stats.hp}</div>
        <div><strong>ATK:</strong> {stats.atk}</div>
        <div><strong>DEF:</strong> {stats.def}</div>
        <div><strong>SPA:</strong> {stats.spa}</div>
        <div><strong>SPD:</strong> {stats.spd}</div>
        <div><strong>SPE:</strong> {stats.spe}</div>
      </div>
    </div>
  );
}