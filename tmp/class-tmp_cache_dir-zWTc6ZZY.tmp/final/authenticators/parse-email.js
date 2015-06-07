define('final/authenticators/parse-email', ['exports', 'ic-ajax', 'simple-auth/authenticators/base', 'ember'], function (exports, ajax, Base, Ember) {

  'use strict';

  exports['default'] = Base['default'].extend({
    sessionToken: null,

    restore: function restore(data) {
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        if (!Ember['default'].isEmpty(data.sessionToken)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(credentials) {
      var token = credentials.sessionToken;
      var endpoint = token ? "users/me" : "login";
      var options = token ? {
        headers: {
          "X-Parse-Session-Token": token
        }
      } : {
        data: {
          username: credentials.identification,
          password: credentials.password
        }
      };

      return ajax['default']("https://api.parse.com/1/" + endpoint, options).then((function (response) {
        response.id = response.objectId;
        delete response.objectId;
        var user = this.store.push("user", response);
        return { sessionToken: response.sessionToken, currentUser: user };
      }).bind(this));
    },

    invalidate: function invalidate() {
      return Ember['default'].RSVP.resolve();
    }
  });

});