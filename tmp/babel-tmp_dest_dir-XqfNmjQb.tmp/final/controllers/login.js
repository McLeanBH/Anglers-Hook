// (app.contollers.login.js) //

import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    login: function login() {
      var loginData = this.getProperties("email", "password");
      console.log(loginData);
    }
  }
});