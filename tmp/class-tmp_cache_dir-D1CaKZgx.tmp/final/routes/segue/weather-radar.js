define('final/routes/segue/weather-radar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return Ember['default'].RSVP.hash({
        data: this.store.findQuery("weather-data", "autoip"),
        radar: this.store.findQuery("weather-radar", "autoip")
      });
    }
  });

});