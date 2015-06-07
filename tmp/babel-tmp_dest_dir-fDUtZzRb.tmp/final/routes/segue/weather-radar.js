import Ember from "ember";

export default Ember.Route.extend({
  model: function model() {
    return Ember.RSVP.hash({
      data: this.store.findQuery("weather-data", "autoip"),
      radar: this.store.findQuery("weather-radar", "autoip")
    });
  }
});