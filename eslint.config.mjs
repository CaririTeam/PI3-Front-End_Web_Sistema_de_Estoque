// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  // 1. Configuração Global para todos os arquivos .js
  {
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn", // Trata variáveis não usadas como aviso, não erro
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Ambiente de Navegador
      },
    },
  },

  // 2. Configuração Específica para arquivos de teste do Cypress
  {
    files: ["cypress/e2e/**/*.cy.js"],
    plugins: {
      cypress, // Define o plugin como um objeto (FORMATO CORRETO)
    },
    languageOptions: {
      globals: {
        ...cypress.configs.recommended.globals, // Importa os globais do Cypress (cy, describe, etc)
      },
    },
    rules: {
      ...cypress.configs.recommended.rules, // Importa as regras recomendadas do Cypress
    },
  },

  // 3. Configuração Específica para o arquivo de config do Node.js
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        ...globals.node, // Ambiente Node.js para este arquivo
      },
    }
  },

  // 4. Ignora pastas que não devem ser analisadas
  {
    ignores: ["node_modules/", ".github/"],
  },
];