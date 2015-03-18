import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findQuery('weather-data');
  },
});


  // beforeModel: function () {
  //   throw new Error("Something bad happened!");
  // },
  //
