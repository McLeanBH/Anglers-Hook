// (app.contollers.register.js) //

import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveUser: function(){
      var userData = this.getProperties('firstName', 'lastName', 'email', 'username', 'password');
      this.get('model').setProperties(userData);
      this.get('model').save();
    }
  }
});
