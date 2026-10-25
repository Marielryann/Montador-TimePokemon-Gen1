# ⚡ Montador de Time Pokémon (1ª Geração - Kanto)

Uma aplicação web interativa desenvolvida em **React** e **Vite** para montagem, análise tática e validação de equipes Pokémon da 1ª Geração. O sistema calcula automaticamente a cobertura defensiva, identifica núcleos elementais (cores) e analisa a distribuição de papéis táticos do time em tempo real.

---

## 🎯 Funcionalidades Principais

- **Base de Dados Completa:** Integração com todos os 151 Pokémon de Kanto, incluindo sprites, tipos e base stats normalizados.
- **Matriz de Cobertura Defensiva (`TypeChartGrid`):** Exibição dinâmica de multiplicadores de dano contra todos os tipos de ataque.
- **Detecção de Núcleos Táticos (Cores):** Validação automática de sinergias elementais, como o núcleo **Fogo / Água / Grama (FWG)** e **Imunidade Tríplice**.
- **Classificação de Papéis Táticos:** Algoritmo dinâmico que categoriza Pokémon entre *Atacantes Físicos/Especiais*, *Tanques* e *Suporte/Utilitários*.
- **Interface Responsiva e Escura:** Layout moderno adaptado com grid simétrico (3x2) para os slots da equipe e navegação simplificada via modal de busca.
- **Tratamento Defensivo de Dados:** Validações em tempo real para evitar falhas de runtime e garantir estabilidade durante a seleção.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** CSS3 (Flexbox & CSS Grid com layout responsivo)
- **Linguagem:** JavaScript (ES6+)
- **Controle de Versão:** Git & GitHub

---

## 📁 Estrutura do Projeto

```text
src/
├── assets/             # Recursos estáticos e ícones
├── components/         # Componentes React da interface
│   ├── AnalysisPanel/  # Painel lateral de análise tática e alertas
│   ├── PokemonCard/    # Card individual de exibição dos Pokémon no time
│   ├── TeamBuilder/    # Grid de slots e modal de busca/seleção
│   └── TypeChartGrid/  # Tabela de matriz de efetividade e tipos
├── data/               # Datasets estáticos (Kanto 151 e Tabela de Tipos)
├── domain/             # Módulos de lógica de negócio e regras táticas
│   ├── coreDetector.js   # Validador de núcleos (FWG, Imunidades)
│   ├── roleClassifier.js # Algoritmo de classificação de papéis
│   ├── teamValidator.js  # Consolidador de alertas e validações
│   └── typeCoverage.js   # Cálculo de fraquezas e resistências
├── hooks/              # Custom hooks para gerenciamento de estado do time
├── services/           # Serviços de busca e filtragem de Pokémon
└── utils/              # Funções utilitárias e formatadores