import React from 'react';

export function AnalysisPanel({ analysis, teamLength = 0 }) {
  const {
    rolesSummary = {},
    activeCores = [],
    alerts = []
  } = analysis || {};

  // Auxiliar para verificar se um núcleo específico está ativo na lista
  const isCoreActive = (coreId) => {
    if (!Array.isArray(activeCores)) return false;
    return activeCores.some(core => core.id === coreId || core === coreId);
  };

  const hasFWG = isCoreActive('fwg');
  const hasTripleImmunity = isCoreActive('triple_immunity');

  return (
    <div className="analysis-panel">
      <div className="panel-header">
        <h2>Análise Tática da Equipe</h2>
        <span className="team-count">{teamLength}/6 Pokémon</span>
      </div>

      {/* Alertas e Recomendações */}
      <div className="panel-section">
        <h3>Alertas & Recomendações</h3>
        {alerts.length === 0 ? (
          <div className="alert-card alert-success">
            <span>✅ Equipe sem alertas críticos de imunidade.</span>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`alert-card alert-${alert.type === 'danger' ? 'danger' : 'warning'}`}
            >
              <span>🟡 {alert.message}</span>
            </div>
          ))
        )}
      </div>

      {/* Núcleos Táticos */}
      <div className="panel-section">
        <h3>Núcleos Táticos (Cores)</h3>
        
        <div className={`core-card ${hasFWG ? 'active' : ''}`}>
          <div className="core-header">
            <strong>Fogo / Água / Grama (FWG)</strong>
            <span>{hasFWG ? '🟢 Ativo' : '❌ Inativo'}</span>
          </div>
          <p className="core-desc">
            {hasFWG 
              ? 'Sinergia elemental completa alcançada.' 
              : 'Falta: Fogo, Água ou Grama para completar a sinergia.'}
          </p>
        </div>

        <div className={`core-card ${hasTripleImmunity ? 'active' : ''}`}>
          <div className="core-header">
            <strong>Imunidade Tríplice</strong>
            <span>{hasTripleImmunity ? '🟢 Ativo' : '❌ Inativo'}</span>
          </div>
          <p className="core-desc">
            {hasTripleImmunity 
              ? 'Possui coberturas para trocas contra Ground e Electric.' 
              : 'Falta: Flying, Ground ou Electric.'}
          </p>
        </div>
      </div>

      {/* Balanço de Funções */}
      <div className="panel-section">
        <h3>Balanço de Funções</h3>
        <div className="roles-summary">
          <div className="role-item">
            <span>Atacantes Físicos</span>
            <strong>{rolesSummary['Atacantes Físicos'] || 0}</strong>
          </div>
          <div className="role-item">
            <span>Atacantes Especiais</span>
            <strong>{rolesSummary['Atacantes Especiais'] || 0}</strong>
          </div>
          <div className="role-item">
            <span>Tanques Físicos</span>
            <strong>{rolesSummary['Tanques Físicos'] || 0}</strong>
          </div>
          <div className="role-item">
            <span>Tanques Especiais</span>
            <strong>{rolesSummary['Tanques Especiais'] || 0}</strong>
          </div>
          <div className="role-item">
            <span>Suporte / Utilitários</span>
            <strong>{rolesSummary['Suporte / Utilitários'] || 0}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}