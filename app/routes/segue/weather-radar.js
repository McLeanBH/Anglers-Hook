import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      data: this.store.findQuery('weather-data', "autoip"),
      radar: this.store.findQuery('weather-radar', 'autoip')
    });
  },

  actions: {
    search: function(){
      return Ember.RSVP.hash({
        data: this.store.findQuery('weather-data', "29401"),
        radar: this.store.findQuery('weather-radar', '29401')
      }).then(function(results){
        console.log('results', results);
        this.get('controller').set('model', results);
      }.bind(this));
    }
  }
});
