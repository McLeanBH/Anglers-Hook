import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.createRecord('photo', {
      createdBy: this.get('session.currentUser')
    });
  },
  actions: {
    createRecord: function(){
      this.modelFor('photo').save().then(function() {
        this.transitionTo('forum');
      }.bind(this));
    }
  }
});
