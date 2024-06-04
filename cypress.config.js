const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },


  },
});
