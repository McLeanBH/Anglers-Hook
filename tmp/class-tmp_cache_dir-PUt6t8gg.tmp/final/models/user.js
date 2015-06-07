define('final/models/user', ['exports', 'ic-ajax', 'ember-magic-man/model'], function (exports, ajax, Model) {

  'use strict';

  exports['default'] = Model['default'].extend({
    addFavorite: function addFavorite(bookmark) {
      return ajax['default']("https://api.parse.com/1/users/" + this.id, {
        type: "PUT",
        data: JSON.stringify({
          favorites: {
            __op: "AddRelation",
            objects: [{
              __type: "Pointer",
              className: "Bookmark",
              objectId: bookmark.id
            }]
          }
        })
      });
    }
  });

  // import Ember from 'ember';
  //
  // export default Ember.Object.extend({
  //   destroy: function(){
  //     this.store.destroy('user', this);
  //   },
  //
  //   save: function(){
  //     this.store.save('user', this);
  //   },
  //
  //   toJSON: function(){
  //     console.log('User#toJSON');
  //     return this;
  //   }
  // });

});