define('final/controllers/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.login.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      login: function login() {
        var loginData = this.getProperties("email", "password");
        console.log(loginData);
      }
    }
  });

});