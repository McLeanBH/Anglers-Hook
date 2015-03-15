import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
      // name: weather-radar //
      return ajax("http://api.wunderground.com/api/" + id + ".json").then(function(result){
        return result.data;
      });
    },

  findAll: function(){
      return ajax("http://api.wunderground.com/api/").then(function(response){
        return response.results.map(function(){
          return ;
        });
      });
    },

  findQuery: function(name, query) {
    return ajax("http://api.wunderground.com/api/", {
      data: Ember.$.param({
          where: JSON.stringify(query)
        })
    }).then(function(response){
      return response.results.map(function(){
        return;
      });
    });
  }
});

// "http://api.wunderground.com/api/d98a9b35b6b3cbd9/animatedradar/...
// ... animatedsatellite/geolookup/forecast/conditions/hourly/rawtide/tide/bestfct/q/autoip.gif.json"
