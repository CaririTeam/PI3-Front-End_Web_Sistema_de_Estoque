// eslint.config.mjs

import globals from "globals";
import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  // 1. Configuração Global (para todos os arquivos)
  {
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn", // Trata variáveis não usadas como AVISO, não ERRO
    },
  },

  // 2. Configuração do Cypress
  // Esta linha aplica TODAS as configurações recomendadas do Cypress,
  // incluindo plugins, regras e os globais (cy, describe, etc.)
  cypress.configs.recommended,

  // 3. Configuração para arquivos do projeto (ambiente de navegador)
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 4. Configuração para o arquivo de config do Cypress (ambiente Node.js)
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 5. Ignora as pastas que não devem ser analisadas
  {
    ignores: ["node_modules/", ".github/"],
  },
];