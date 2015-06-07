define('final/routes/segue/dashboard', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      // return this.store.createRecord('photo');
      return this.store.findQuery("photo", {
        createdBy: {
          __type: "Pointer",
          className: "_User",
          objectId: this.get("session.currentUser.id")
        }
      });
    } });

});