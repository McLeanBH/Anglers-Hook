define('final/initializers/current-user', ['exports', 'ember', 'simple-auth/session', 'ic-ajax'], function (exports, Ember, Session, ajax) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container) {
    Session['default'].reopen({
      setCurrentUser: (function () {
        var token = this.get("sessionToken");

        if (this.get("isAuthenticated") && !Ember['default'].isEmpty(token)) {
          var store = container.lookup("store:main");
          ajax['default']("https://api.parse.com/1/users/me").then((function (response) {
            response.id = response.objectId;
            delete response.objectId;
            delete response.sessionToken;
            var user = store.push("user", response);
            this.set("currentUser", user);
          }).bind(this));
        }
      }).observes("sessionToken")
    });
  }

  exports['default'] = {
    name: "current-user",
    initialize: initialize
  };

});