import Ember from "ember";

export default Ember.Route.extend({
  model: function model() {
    return this.store.findQuery("weather-data");
  } });

// beforeModel: function () {
//   throw new Error("Something bad happened!");
// },
//