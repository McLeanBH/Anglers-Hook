define('final/initializers/current-user', ['exports', 'ember', 'simple-auth/session'], function (exports, Ember, Session) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container) {
    Session['default'].reopen({
      setCurrentUser: (function () {
        var id = this.get("objectId");

        if (!Ember['default'].isEmpty(id)) {
          return container.lookup("service:store").find("user", id).then((function (user) {
            this.set("currentUser", user);
          }).bind(this));
        }
      }).observes("objectId")
    });
  }

  exports['default'] = {
    name: "current-user",
    initialize: initialize
  };

});