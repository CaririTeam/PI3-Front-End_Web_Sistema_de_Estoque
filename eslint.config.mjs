// eslint.config.mjs

import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// --- Ferramenta de compatibilidade para usar configs antigas ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// --- Início da Configuração ---
export default [
  // 1. Usa o adaptador para carregar as configs recomendadas (formato antigo)
  ...compat.extends("eslint:recommended", "plugin:cypress/recommended"),

  // 2. Aplica configurações globais e regras para o projeto
  {
    files: ["**/*.js"], // Aplica a todos os arquivos .js
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Define o ambiente como Navegador
      },
    },
    rules: {
      "no-unused-vars": "warn", // Trata variáveis não usadas como AVISO, não ERRO
    },
  },
  
  // 3. Define o ambiente Node.js APENAS para o cypress.config.js
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 4. Ignora pastas que não devem ser analisadas
  {
    ignores: ["node_modules/", ".github/"],
  },
];