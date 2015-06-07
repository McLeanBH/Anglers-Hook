define('final/routes/segue/weather-radar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findQuery("weather-data");
    } });

});