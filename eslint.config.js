// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = tseslint.config(
  // Ignora cartelle che non vuoi analizzare
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      ".angular/**",
    ],
  },

  // Config per i file TypeScript
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },

  // Config per i file HTML (template Angular)
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      //...angular.configs.templateAccessibility,
    ],
    rules: {
      // Se vuoi disattivare o rendere meno severa la regola dell'alt text:
      // "@angular-eslint/template/alt-text": "warn",
      // oppure:
      // "@angular-eslint/template/alt-text": "off",
    },
  }
);
