import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.findQuery('weather-radar');
    // return this.store.findQuery('weather-radar', params.current_observation.wind_string);
  },
});
