import React from 'react';
import typeChart from '../../data/typeChart.js';

// Lista de todos os 15 tipos da 1ª Geração (Kanto)
const KANTO_TYPES = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic',
  'Bug', 'Rock', 'Ghost', 'Dragon'
];

/**
 * Calcula quanto de dano um Pokémon recebe de um determinado tipo atacante
 */
function getDamageMultiplier(attackingType, pokemon) {
  if (!pokemon || !pokemon.types) return 1;

  let multiplier = 1;
  const typeRules = typeChart[attackingType] || {};

  pokemon.types.forEach(defensiveType => {
    if (typeRules[defensiveType] !== undefined) {
      multiplier *= typeRules[defensiveType];
    }
  });

  return multiplier;
}

export function TypeChartGrid({ team }) {
  if (!team || team.length === 0) {
    return (
      <div className="type-chart-container empty-chart">
        <p>Adicione pelo menos um Pokémon à equipe para visualizar a matriz de efetividade.</p>
      </div>
    );
  }

  return (
    <div className="type-chart-container">
      <div className="type-chart-header">
        <h3>📊 Cobertura Defensiva da Equipe</h3>
        <p>Multiplicadores de dano recebidos contra cada tipo elemental</p>
      </div>

      <div className="table-responsive">
        <table className="type-chart-table">
          <thead>
            <tr>
              <th className="sticky-col">Tipo Atacante</th>
              {team.map((pokemon, idx) => (
                <th key={idx} className="pokemon-col-header">
                  <img src={pokemon.sprite} alt={pokemon.name} className="mini-sprite" />
                  <span>{pokemon.name}</span>
                </th>
              ))}
              <th className="summary-col">Resumo do Time</th>
            </tr>
          </thead>
          <tbody>
            {KANTO_TYPES.map(type => {
              let weakCount = 0;
              let resistCount = 0;
              let immuneCount = 0;

              const rowMultipliers = team.map(pokemon => {
                const mult = getDamageMultiplier(type, pokemon);
                if (mult > 1) weakCount++;
                else if (mult === 0) immuneCount++;
                else if (mult < 1) resistCount++;
                return mult;
              });

              return (
                <tr key={type}>
                  {/* Nome do Tipo Atacante */}
                  <td className="sticky-col type-name-cell">
                    <span className={`type-badge type-${type.toLowerCase()}`}>
                      {type}
                    </span>
                  </td>

                  {/* Multiplicador para cada Pokémon */}
                  {rowMultipliers.map((mult, idx) => {
                    let cellClass = 'mult-neutral';
                    if (mult === 4) cellClass = 'mult-super-weak';
                    else if (mult === 2) cellClass = 'mult-weak';
                    else if (mult === 0.5) cellClass = 'mult-resist';
                    else if (mult === 0.25) cellClass = 'mult-super-resist';
                    else if (mult === 0) cellClass = 'mult-immune';

                    return (
                      <td key={idx} className={`mult-cell ${cellClass}`}>
                        {mult === 0 ? '0x' : `${mult}x`}
                      </td>
                    );
                  })}

                  {/* Coluna do Resumo Geral do Time */}
                  <td className="summary-col summary-cell">
                    <div className="summary-badges">
                      {weakCount > 0 && (
                        <span className="summary-badge badge-weak" title="Pokémon Fracos">
                          {weakCount} Fraco{weakCount > 1 ? 's' : ''}
                        </span>
                      )}
                      {resistCount > 0 && (
                        <span className="summary-badge badge-resist" title="Pokémon Resistentes">
                          {resistCount} Res.
                        </span>
                      )}
                      {immuneCount > 0 && (
                        <span className="summary-badge badge-immune" title="Pokémon Imunes">
                          {immuneCount} Imune{immuneCount > 1 ? 's' : ''}
                        </span>
                      )}
                      {weakCount === 0 && resistCount === 0 && immuneCount === 0 && (
                        <span className="summary-badge badge-neutral">Neutro</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}