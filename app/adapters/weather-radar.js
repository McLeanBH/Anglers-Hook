import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
      // name: weather-radar //
      return ajax("http://api.wunderground.com/api/" + id + ".json").then(function(result){
        return result.data;
      });
    }
});

// "http://api.wunderground.com/api/d98a9b35b6b3cbd9/animatedradar/animatedsatellite/geolookup/forecast/conditions/hourly/rawtide/tide/bestfct/q/autoip.gif.json"
