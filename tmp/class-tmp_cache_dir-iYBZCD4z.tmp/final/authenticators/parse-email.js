define('final/authenticators/parse-email', ['exports', 'ic-ajax', 'simple-auth/authenticators/base', 'ember'], function (exports, ajax, Base, Ember) {

  'use strict';

  exports['default'] = Base['default'].extend({
    sessionToken: null,

    restore: function restore(data) {
      this.set("sessionToken", data.sessionToken);
      return ajax['default']("https://api.parse.com/1/users/me");
    },

    authenticate: function authenticate(credentials) {
      var token = credentials.sessionToken;
      if (token) {
        this.set("sessionToken", token);
      }
      var endpoint = token ? "users/me" : "login";
      var options = token ? {} : {
        data: {
          username: credentials.identification,
          password: credentials.password
        }
      };

      return ajax['default']("https://api.parse.com/1/" + endpoint, options).then((function (response) {
        this.set("sessionToken", response.sessionToken);
        return response;
      }).bind(this));
    },

    invalidate: function invalidate() {
      this.set("sessionToken", null);
      return Ember['default'].RSVP.resolve();
    },

    _setupHeaders: Ember['default'].immediateObserver("sessionToken", function () {
      var token = this.get("sessionToken");
      Ember['default'].$.ajaxSetup({
        headers: {
          "X-Parse-Session-Token": token
        }
      });
    })
  });

});