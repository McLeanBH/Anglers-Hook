define('final/routes/segue/weather-radar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return Ember['default'].RSVP.hash({
        data: this.store.findQuery("weather-data", "autoip"),
        radar: this.store.findQuery("weather-radar", "autoip")
      });
    },

    actions: {
      search: function search() {
        return Ember['default'].RSVP.hash({
          data: this.store.findQuery("weather-data", "29401"),
          radar: this.store.findQuery("weather-radar", "29401")
        }).then((function (results) {
          console.log("results", results);
          this.get("controller").set("model", results);
        }).bind(this));
      }
    }
  });

});