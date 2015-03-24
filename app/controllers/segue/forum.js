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
    }
  },

  findAll: function () {
    var photo = this.get('uploadedPhoto');
    return ajax({
      url: "https://api.parse.com/1/Photos" + photo.name,
      type: "POST",
      contentType: photo.type,
      data: photo,
      processData: false
    });
  }
});
