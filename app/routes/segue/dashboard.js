import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // return this.store.createRecord('photo');
    return this.store.findQuery('photo', {
      createdBy: {
        "__type":"Pointer",
        "className":"_User",
        "objectId": this.get('session.currentUser.id')
      }
    });
  },
});
