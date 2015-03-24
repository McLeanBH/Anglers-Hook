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
  }
});
