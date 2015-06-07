define('final/initializers/ember-cli-weather-icons', ['exports', 'ember', 'ember-cli-weather-icons/helpers/weather-icon'], function (exports, Ember, weather_icon) {

  'use strict';

  var initialize = function initialize() {
    Ember['default'].Handlebars.helper("weather-icon", weather_icon.weatherIcon);
    Ember['default'].Handlebars.helper("w-i", weather_icon.weatherIcon);
  };

  exports['default'] = {
    name: "ember-cli-weather-icon",
    initialize: initialize
  };
  /* container, app */

  exports.initialize = initialize;

});