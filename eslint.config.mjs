// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  // 1. Configuração Global para arquivos JavaScript do projeto (código da aplicação)
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Define que o ambiente é de navegador (window, document, etc)
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // 2. Configuração específica para o arquivo de configuração do Cypress
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        ...globals.node, // Define que este arquivo roda em ambiente Node.js (require, module, etc)
      },
    }
  },

  // 3. Configuração específica para os arquivos de teste do Cypress
  {
    files: ["cypress/e2e/**/*.cy.js"],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...cypress.configs.recommended.globals, // Adiciona os globais do Cypress (cy, describe, it, etc)
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },

  // 4. Ignora arquivos e pastas que o ESLint não deve verificar
  {
    ignores: ["node_modules/", ".github/"],
  },
];