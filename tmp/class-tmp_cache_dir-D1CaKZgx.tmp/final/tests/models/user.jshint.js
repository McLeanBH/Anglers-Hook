define('final/tests/models/user.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/user.js should pass jshint', function() { 
    ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 15, col 25, \'bookmark\' is not defined.\nmodels/user.js: line 5, col 25, \'user\' is defined but never used.\n\n2 errors'); 
  });

});