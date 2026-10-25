import React, { useState } from 'react';
import { getAllKantoPokemon, searchKantoPokemon } from '../../services/pokemonService.js';
import { PokemonCard } from '../PokemonCard/PokemonCard.jsx';

export function TeamBuilder({ team = [], onAddPokemon, onRemovePokemon, onClearTeam }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const availablePokemon = searchQuery 
    ? searchKantoPokemon(searchQuery) 
    : getAllKantoPokemon();

  const handleSelectPokemon = (pokemon) => {
    onAddPokemon(pokemon);
    setIsModalOpen(false);
    setSearchQuery('');
  };

  // Cria sempre 6 slots para manter a estrutura do grid
  const slots = Array.from({ length: 6 }, (_, index) => team[index] || null);

  return (
    <div className="team-builder">
      <div className="team-builder-header">
        <h2>Sua Equipe ({team.length}/6)</h2>
        {team.length > 0 && (
          <button className="clear-team-btn" onClick={onClearTeam}>
            Limpar Equipe
          </button>
        )}
      </div>

      <div className="team-grid">
        {slots.map((pokemon, index) => (
          <div key={index} className="slot-wrapper">
            {pokemon ? (
              <PokemonCard 
                pokemon={pokemon} 
                onRemove={onRemovePokemon} 
                index={index} 
              />
            ) : (
              <div className="empty-slot" onClick={() => setIsModalOpen(true)}>
                <span className="add-icon">+</span>
                <span className="add-text">Adicionar Pokémon</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Seleção */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Selecionar Pokémon</h3>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <input 
              type="text" 
              className="search-input" 
              placeholder="Pesquisar por nome ou número..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />

            <div className="pokemon-select-list">
              {availablePokemon.map((p) => (
                <div 
                  key={p.id} 
                  className="select-item" 
                  onClick={() => handleSelectPokemon(p)}
                >
                  <img src={p.sprite} alt={p.name} />
                  <span>#{String(p.id).padStart(3, '0')} - {p.name}</span>
                  <div className="pokemon-types">
                    {p.types && p.types.map((t, i) => (
                      <span key={i} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}