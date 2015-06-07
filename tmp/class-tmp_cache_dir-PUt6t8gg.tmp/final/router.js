define('final/router', ['exports', 'ember', 'final/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("welcome", { path: "/" });
    this.route("login");
    this.route("register");

    this.route("segue", function () {
      this.route("dashboard");
      this.route("species-ref");
      this.route("weather-radar", function () {
        this.route("loading");
      });
      this.route("forum");
      this.route("edit-profile");
    });
    this.route("search");
    this.route("show");
  });

  exports['default'] = Router;

});