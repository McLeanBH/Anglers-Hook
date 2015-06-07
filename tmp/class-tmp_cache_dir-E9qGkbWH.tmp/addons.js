define("ember-cli-weather-icons", ["ember-cli-weather-icons/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-cli-weather-icons/helpers/weather-icon', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.weatherIcon = weatherIcon;

  function weatherIcon(weather) {
    return new Ember['default'].Handlebars.SafeString('<i class="wi wi-' + weather + '"></i>');
  }

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(weatherIcon);

});//# sourceMappingURL=addons.map