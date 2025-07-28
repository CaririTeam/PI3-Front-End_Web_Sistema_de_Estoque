// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  // 1. Configuração Global para todo o projeto
  {
    files: ["**/*.js"], // Aplica-se a todos os arquivos .js
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Adiciona todos os globais do navegador (document, window, etc)
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Aplica as regras recomendadas do ESLint
    },
  },

  // 2. Configuração Específica para os testes do Cypress
  {
    files: ["cypress/**/*.cy.js"], // Aplica-se APENAS aos arquivos de teste do Cypress
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...cypress.configs.recommended.globals,
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },

  // 3. Ignora arquivos e pastas que não devem ser verificados
  {
    ignores: [
        "node_modules/",
        ".github/"
    ],
  },
];