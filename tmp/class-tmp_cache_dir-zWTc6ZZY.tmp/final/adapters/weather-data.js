define('final/adapters/weather-data', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    findQuery: function findQuery(name, query) {
      return ajax['default']("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/geolookup/conditions/forecast/hourly/rawtide/tide/q/" + query + ".json?num=8&radius=1000&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=97.388&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&interval=30&rad.width=800$rad.height=800&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.width=800&sat.height=800&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=1&sat.num=5&borders=0", {
        dataType: "jsonp"
      }).then(function (response) {
        console.log(response);
        return response;
      });
    }
  });

  // export default Ember.Object.extend({
  //   findQuery: function(name, query){
  //     return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip.gif?num=8&radius=1000&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=97.388&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&interval=30&rad.width=800$rad.height=800&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.width=800&sat.height=800&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=1&sat.num=5&borders=0", {
  //       dataType: 'jsonp'
  //     }).then(function(response){
  //       console.log(response);
  //       return response;
  //     });
  //   }
  // });
  // return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/geolookup/conditions/forecast/hourly/rawtide/tide/q/29401.json", {

});