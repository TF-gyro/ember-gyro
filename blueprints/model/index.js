'use strict';

const { camelize } = require('ember-cli-string-utils');

module.exports = {
  description: 'Generate models compatible with Tribe Framework',
  locals(options) {
    return {
      camelizedModuleName: camelize(options.entity.name) + 'Model',
    };
  },
};
