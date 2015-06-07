// (app.contollers.register.js) //

import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    saveUser: function saveUser() {
      var userData = this.getProperties("firstName", "lastName", "email", "username", "password");
      this.store.save("user", userData);
    }
  }
});