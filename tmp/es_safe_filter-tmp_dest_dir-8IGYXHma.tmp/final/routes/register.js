import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.createRecord('user', {
      createdBy: this.get('session.currentUser')
    });
  },
  actions: {
    createRecord: function(){
      this.modelFor('register').save().then(function() {
        this.transitionTo('index');
      }.bind(this));
    }
  }
});
