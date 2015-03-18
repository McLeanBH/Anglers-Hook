import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  findQuery: function(name, query){
      return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip/?num=5&delay=50&rad.maxlat=47.709&rad.maxlon=-69.263&rad.minlat=31.596&rad.minlon=-97.388&rad.width=640&rad.height=480&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&sat.width=640&sat.height=480&sat.key=sat_ir4_bottom&sat.gtt=107&sat.proj=me&sat.timelabel=0&sat.num=5", {
      dataType: 'jsonp'
    }).then(function(response){
      console.log(response);
      return response;
    });
  }
});

// return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip.gif?num=6&delay=50&interval=30", {
