import Ember from 'ember';

export default Ember.Controller.extend({
  radarUrl: function(){
    var location = "autoip";
    return "http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/" + location + ".gif?num=6&delay=50&interval=30";
  }.property()
});
