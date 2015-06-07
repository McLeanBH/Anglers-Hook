define('final/adapters/radar', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    find: function find(name, id) {
      /* jshint unused: false */
      return ajax['default']("http://api.wunderground.com/api/d98a9b35b6b3cbd9/animatedradar/animatedsatellite/geolookup/forecast/conditions/hourly/rawtide/tide/bestfct/q/autoip.gif.json" + id).then(function (radar) {
        return radar;
      });
    }
  });

});