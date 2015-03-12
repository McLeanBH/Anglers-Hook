// (app.contollers.login.js) //

import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';


export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:parse-email',
    actions: {
    login: function() {
      var loginData = this.getProperties('email', 'password');
      console.log(loginData);
    }
  }
});
