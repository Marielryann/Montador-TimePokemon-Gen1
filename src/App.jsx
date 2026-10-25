import React from 'react';
import { useTeamBuilder } from './hooks/useTeamBuilder.js';
import { TeamBuilder } from './components/TeamBuilder/TeamBuilder.jsx';
import { AnalysisPanel } from './components/AnalysisPanel/AnalysisPanel.jsx';
import { TypeChartGrid } from './components/TypeChartGrid/TypeChartGrid.jsx';
import './App.css'; // 👈 IMPORTANTE: Garanta que esta linha está aqui!

export default function App() {
  const { 
    team, 
    addPokemon, 
    removePokemon, 
    clearTeam, 
    analysis 
  } = useTeamBuilder();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>⚡ Montador de Time Pokémon</h1>
          <p>1ª Geração (Kanto) — Validador Tático, Cobertura de Tipos e Núcleos</p>
        </div>
      </header>

      <main className="main-content">
        <div className="builder-container">
          <TeamBuilder 
            team={team} 
            onAddPokemon={addPokemon} 
            onRemovePokemon={removePokemon} 
            onClearTeam={clearTeam} 
          />
          
          <TypeChartGrid team={team} />
        </div>

        <div className="sidebar-container">
          <AnalysisPanel 
            analysis={analysis} 
            teamLength={team.length} 
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Desenvolvido para análise competitiva e balanceamento de equipes de Kanto.</p>
      </footer>
    </div>
  );
}