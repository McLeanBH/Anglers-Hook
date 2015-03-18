import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      data: this.store.findQuery('weather-data', "autoip"),
      radar: this.store.findQuery('weather-radar', 'autoip')
    });
  }
});


  // beforeModel: function () {
  //   throw new Error("Something bad happened!");
  // },
  //
