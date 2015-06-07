define('final/adapters/weather-data', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    findQuery: function findQuery(name, query) {
      return ajax['default']("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/geolookup/conditions/forecast/hourly/rawtide/tide/q/zmw:29401.1.99999.json", {
        dataType: "jsonp"
      }).then(function (response) {
        console.log(response);
        return response;
      });
    }
  });

});