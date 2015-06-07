define('final/controllers/login', ['exports', 'ember', 'simple-auth/mixins/login-controller-mixin'], function (exports, Ember, LoginControllerMixin) {

  'use strict';

  // (app.contollers.login.js) //

  exports['default'] = Ember['default'].Controller.extend(LoginControllerMixin['default'], {
    authenticator: "authenticator:parse-email",
    actions: {
      login: function login() {
        var loginData = this.getProperties("email", "password");
        console.log(loginData);
      }
    }
  });

});