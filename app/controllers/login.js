// (app.contollers.login.js) //

import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      var loginData = this.getProperties('email', 'password');
      console.log(loginData);
    }
  }
});

// import Ember from 'ember';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
//
// export default Ember.Controller.extend(LoginControllerMixin, {
//   authenticator: 'authenticator:parse-email'
// });
