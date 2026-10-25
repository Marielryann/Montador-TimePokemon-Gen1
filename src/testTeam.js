import { getPokemonByIdOrName } from './services/pokemonService.js';
import { validateFullTeam } from './domain/teamValidator.js';

// 1. Selecionamos 6 Pokémon de Kanto para formar a nossa equipe de teste
const myTeam = [
    getPokemonByIdOrName('Charizard'),
    getPokemonByIdOrName('Venusaur'),
    getPokemonByIdOrName('Blastoise'),
    getPokemonByIdOrName('Snorlax'),
    getPokemonByIdOrName('Gengar'),
    getPokemonByIdOrName('Pikachu')
].filter(Boolean); //Garante que não há itens undefined

console.log("=== TESTE DO MONTADOR DE TIME POKÉMON ===");
console.log(`Equipe Selecionada (${myTeam.length}/6):`, myTeam.map(p => p.name).join(', '));
console.log("\n------------------------------------------------");

// 2. Executamos a validação completa da equipe
const report = validateFullTeam(myTeam);

// 3. Exibimos a distribuição de papéis (Roles)
console.log("\n=== DISTRIBUIÇÃO DE FUNÇÕES ===");
console.log(`• Atacantes Físicos (Physical Sweepers): ${report.roleSummary.physicalSweepers}`);
console.log(`• Atacantes Especiais (Special Sweepers): ${report.roleSummary.specialSweepers}`);
console.log(`• Tanques Físicos (Physical Walls): ${report.roleSummary.physicalWalls}`);
console.log(`• Tanques Especiais (Special Walls): ${report.roleSummary.specialWalls}`);
console.log(`• Suporte / Utilitários: ${report.roleSummary.supports}`);

// 4. Exibimos os Núcleos Táticos Ativos
console.log("\n NÚCLEOS TÁTICOS: ");
console.log(`• Núcleo FWG (Fogo/Água/Grama): ${report.cores.fwg.active ? " Ativo" : " Inativo"}`);
console.log(`• Núcleo de Imunidades: ${report.cores.groundFlyElec.active ? " Ativo" : " Inativo"}`);

// 5. Exibimos os Alertas e Recomendações
console.log("\n=== ALERTAS DA EQUIPE: ===");
if (report.alerts.length === 0) {
    console.log("Escelente! A equipe está equilibrada e sem vulnerabilidades críticas.");
} else {
    report.alerts.forEach(alert => {
        const icon = alert.severity === 'danger' ? '🔴' : alert.severity === 'warning' ? '🟡' : 'ℹ️';
        console.log(`${icon} [${alert.severity.toUpperCase()}]: ${alert.message}`);
    });
}

console.log("\n================================================");