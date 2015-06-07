define('final/adapters/weather-data', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    findQuery: function findQuery(name, query) {
      return ajax['default']("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/geolookup/conditions/forecast/hourly/rawtide/tide/q/zmw:29401.1.99999.json", {
        dataType: "jsonp"
      }).then(function (response) {
        console.log(response);
        console.log(response.forecast);
        console.log(response.hourly_forecast);
        console.log(response.radar.image_url);
        console.log(response.rawtide);
        console.log(response.tide);
        console.log(response.response.features.animatedradar);
        console.log(response.response.features.animatedsatellite);
        return response;
      });
    }
  });

});