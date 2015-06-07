// (app.contollers.register.js) //

import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveUser: function(){
      var userData = this.getProperties('firstName', 'lastName', 'email', 'username', 'password');
      var self = this;
      this.get('model').setProperties(userData);
      this.get('model').save().then(function(user){
        self.get('session').authenticate('authenticator:parse-email', user);
      });
    }
  }
});
