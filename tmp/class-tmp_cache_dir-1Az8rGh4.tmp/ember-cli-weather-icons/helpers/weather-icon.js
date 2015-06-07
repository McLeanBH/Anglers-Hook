define('ember-cli-weather-icons/helpers/weather-icon', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.weatherIcon = weatherIcon;

  function weatherIcon(weather) {
    return new Ember['default'].Handlebars.SafeString('<i class="wi wi-' + weather + '"></i>');
  }

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(weatherIcon);

});