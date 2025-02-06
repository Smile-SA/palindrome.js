import globals from "globals";
import pluginJs from "@eslint/js";
import pluginCypress from 'eslint-plugin-cypress/flat'

/** @type {import('eslint').Linter.Config} */
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  {
    ignores: [
      '**/node_modules', 
      '**/artifacts/**', 
      '**/components/**', 
      'dist', 
      'storybook-static', 
      'static', 
      'services',
      '.storybook'
    ]
  },
  {
    plugins: {
      cypress: pluginCypress
    },
    languageOptions: {
      globals: {
        // Cypress and testing globals
        'cy': 'readonly',
        'Cypress': 'readonly',
        'describe': 'readonly',
        'context': 'readonly',
        'it': 'readonly',
        'beforeEach': 'readonly',
        'afterEach': 'readonly',
        'before': 'readonly',
        'after': 'readonly',

        // Node.js globals for config files
        'require': 'readonly',
        'module': 'readonly',
        'process': 'readonly'
      }
    },
    rules: {
      'cypress/unsafe-to-chain-command': 'error'
    }
  },
  pluginJs.configs.recommended,
];