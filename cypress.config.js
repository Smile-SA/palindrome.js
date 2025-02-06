const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  screenshotsFolder: './cypress/fixtures/snapshots/actual',
  trashAssetsBeforeRuns: true,
  updateScreenshots: false,
  waitForAnimations: true,
  env: {
    storybook: 'http://localhost:6006/',
    dev: 'http://localhost:1234/?webWorkersRendering=false',
    'cypress-plugin-snapshots': {
      autoCleanUp: true,
    },
    codeCoverage: {
      exclude: ['**/dist/**',
        '**/*.stories.js',
        '**/vscode/**',
        '**/cypress/**',
        '**/data-examples/**',
        '**/dev/assets/tailwind/**',
        '**/src/data_structures_examples/**',
        '**/static/**'
      ],
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      //require('./cypress/plugins/index.js')(on, config)
      return config
    },
  },
})
