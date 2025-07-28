// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  // 1. Configuração Global: Aplicada a todos os arquivos .js
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Ambiente de Navegador
      },
    },
    // Regras que se aplicam a todos os arquivos
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn", // <-- AQUI ESTÁ A MUDANÇA IMPORTANTE!
    },
  },

  // 2. Configuração Específica para arquivos de teste do Cypress
  {
    files: ["cypress/e2e/**/*.cy.js"],
    // Usa o conjunto completo de configurações recomendadas pelo plugin do Cypress
    ...cypress.configs.recommended,
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