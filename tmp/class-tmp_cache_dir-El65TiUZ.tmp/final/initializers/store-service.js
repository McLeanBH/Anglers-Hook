define('final/initializers/store-service', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  // (app/initializers/store-service.js) //

  function initialize(container, application) {
    application.inject("route", "store", "service:store");
    application.inject("controller", "store", "service:store");
  }

  exports['default'] = {
    name: "store-service",
    initialize: initialize
  };

});