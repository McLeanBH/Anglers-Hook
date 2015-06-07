define('final/routes/segue/edit-profile', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
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

});