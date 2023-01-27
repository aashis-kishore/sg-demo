import {defineConfig} from 'cypress';
import {nxE2EPreset} from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  reporter: '../../node_modules/cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: '../../dist/cypress/apps/photon-e2e',
  },
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    experimentalWebKitSupport: true,
  },
});
