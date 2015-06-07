define('final/initializers/parse-tokens', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    Ember['default'].$.ajaxSetup({
      headers: {
        "X-Parse-Application-Id": "qBQnGMkwKJIbp3cCVApnMjRBCSezpmu8rSbV7M1I",
        "X-Parse-REST-API-Key": "vyaxQsffU5lNaiG5henoGBTaQ1FcEyzmhFxOeVKK"
      }
    });
  }

  exports['default'] = {
    name: "parse-tokens",
    initialize: initialize
  };
  /* container, application */

});