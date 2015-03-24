import Ember from 'ember';

export default Ember.Object.extend({
  findQuery: function(name, location) {
    var url = "http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/" + location + ".gif?num=8&radius=1000&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=97.388&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&interval=30&rad.width=450$rad.height=450&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.width=450&sat.height=450&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=1&sat.num=5&borders=0";
    return new Ember.RSVP.Promise(function(resolve){
      var image = new Image();
      image.src = url;
      if(image.complete || image.readyState === 'complete') {
        resolve({radarUrl: url});
      } else {
        Ember.$(image).on("load", function(){
          resolve({radarUrl: url});
        });
      }
    });
  }
});

// return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip.gif?num=6&delay=50&interval=30", {
//
// findQuery: function(name, query){
//     return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip/?num=5&delay=50&rad.maxlat=47.709&rad.maxlon=-69.263&rad.minlat=31.596&rad.minlon=-97.388&rad.width=450&rad.height=450&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&sat.width=450&sat.height=45  0&sat.key=sat_ir4_bottom&sat.gtt=107&sat.proj=me&sat.timelabel=0&sat.num=5", {
//     dataType: 'jsonp'
//   }).then(function(response){
//     console.log(response);
//     return response;
//   });
// }
