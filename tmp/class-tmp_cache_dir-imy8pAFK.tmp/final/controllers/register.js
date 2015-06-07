define('final/controllers/register', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.register.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      saveUser: function saveUser() {
        var userData = this.getProperties("firstName", "lastName", "email", "username", "password");
        var self = this;
        this.get("model").setProperties(userData);
        this.get("model").save().then(function (user) {
          self.get("session").authenticate("authenticator:parse-email", user);
        });
      }
    }
  });

});