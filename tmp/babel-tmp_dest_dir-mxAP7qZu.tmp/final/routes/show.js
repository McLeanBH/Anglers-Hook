import Ember from "ember";

export default Ember.Route.extend({
  model: function model(params) {
    return this.store.find("profile", params.user);
  }
});