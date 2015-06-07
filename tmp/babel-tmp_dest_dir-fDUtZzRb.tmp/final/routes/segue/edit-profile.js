import Ember from "ember";

export default Ember.Route.extend({
  model: function model() {
    return this.store.createRecord("user", {
      createdBy: this.get("session.currentUser")
    });
  },
  actions: {
    createRecord: function createRecord() {
      this.modelFor("register").save().then((function () {
        this.transitionTo("dashboard");
      }).bind(this));
    }
  }
});