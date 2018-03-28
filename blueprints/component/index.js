'use strict';

const path = require('path');
const stringUtil = require('ember-cli-string-utils');
const pathUtil = require('ember-cli-path-utils');
const validComponentName = require('ember-cli-valid-component-name');
const getPathOption = require('ember-cli-get-component-path-option');
const normalizeEntityName = require('ember-cli-normalize-entity-name');

module.exports = {
  description: 'Generates a component. Name must contain a hyphen.',

  availableOptions: [
    {
      name: 'path',
      type: String,
      default: 'components',
      aliases: [
        { 'no-path': '' }
      ]
    }
  ],

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
        }
        return 'components';
      },
      __templatepath__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
        }
        return 'templates/components';
      },
      __templatename__: function(options) {
        if (options.pod) {
          return 'template';
        }
        return options.dasherizedModuleName;
      }
    };
  },

  normalizeEntityName: function(entityName) {
    entityName = normalizeEntityName(entityName);

    return validComponentName(entityName);
  },

  locals: function(options) {
    let templatePath   = '';
    let importTemplate = '';
    let contents       = '';
    // if we're in an addon, build import statement
    if (options.project.isEmberCLIAddon() || options.inRepoAddon && !options.inDummy) {
      if (options.pod) {
        templatePath   = './template';
      } else {
        templatePath   = pathUtil.getRelativeParentPath(options.entity.name) +
          'templates/components/' + stringUtil.dasherize(options.entity.name);
      }
      importTemplate   = 'import layout from \'' + templatePath + '\';\n';
      contents         = '\n  layout';
    }

    const uppercamelcase = require('uppercamelcase');

    var className;
    var namespace = 'Controller';
    var parts = options.entity.name.split('/');

    if (parts.length > 1) {
      className =  uppercamelcase(parts.splice(parts.length - 1)[ 0 ]);
      for (var i = 0; i < parts.length; ++i) {
        namespace += '.' + uppercamelcase(parts[ i ]);
      }
    } else {
      className = uppercamelcase(options.entity.name);
    }

    return {
      importTemplate: importTemplate,
      contents: contents,
      path: getPathOption(options),
      module: 'components',
      namespace: namespace,
      inheritance: 'Component',
      className: className,
      author: options.project.pkg.author,
      project: options.project.pkg.name
    };
  }
};
