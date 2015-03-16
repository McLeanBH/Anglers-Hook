import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  findQuery: function(name, query){
    return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/geolookup/forecast/conditions/hourly/rawtide/tide/bestfct/q/US/SC/Greenville.gif.json", {
      dataType: 'jsonp'
    }).then(function(response){
      console.log(response);
      return response.features;
    });
  }
});
