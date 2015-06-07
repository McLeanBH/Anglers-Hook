define('final/tests/unit/initializers/current-user-test', ['ember', 'final/initializers/current-user', 'qunit'], function (Ember, current_user, qunit) {

  'use strict';

  var container, application;

  qunit.module("CurrentUserInitializer", {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        container = application.__container__;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  "it works", function (assert) {
    current_user.initialize(container, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  };

});