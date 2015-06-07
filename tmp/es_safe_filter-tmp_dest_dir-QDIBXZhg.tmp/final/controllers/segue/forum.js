import Ember from 'ember';

export default Ember.Controller.extend({
  shouldShowFilepicker: false,

  actions: {
    openFilepicker: function(){
      this.set('shouldShowFilepicker', true);
    },
    closeFilepicker: function(){
      this.set('shouldShowFilepicker', false);
    },
    fileSelected: function(blob) {
      console.log(blob);

      var photo = this.store.createRecord('photo', {
        createdBy: this.get('session.currentUser'),
        url: blob.url,
        filename: blob.filename,
        isWriteable: blob.isWriteable,
        mimetype: blob.mimetype,
        size: blob.size
      });

      return photo.save();
    }
  }
});
