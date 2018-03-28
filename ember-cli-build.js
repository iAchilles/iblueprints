'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test __root__ of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the __root__ using it
    behave. You most likely want to be modifying `./index.js` or __root__'s build file
  */

  return app.toTree();
};
