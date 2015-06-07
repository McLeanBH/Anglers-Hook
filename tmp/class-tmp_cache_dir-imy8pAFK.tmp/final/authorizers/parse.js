define('final/authorizers/parse', ['exports', 'ember', 'simple-auth/authorizers/base', 'final/config/environment'], function (exports, Ember, Base, ENV) {

  'use strict';

  exports['default'] = Base['default'].extend({
    authorize: function authorize(jqXHR) {
      jqXHR.setRequestHeader("X-Parse-Application-Id", ENV['default'].parseKeys.applicationId);
      jqXHR.setRequestHeader("X-Parse-REST-API-Key", ENV['default'].parseKeys.restApi);

      var sessionToken = this.get("session.sessionToken");
      if (!Ember['default'].isEmpty(sessionToken)) {
        jqXHR.setRequestHeader("X-Parse-Session-Token", sessionToken);
      }
    }
  });

});