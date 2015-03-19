import ajax from 'ic-ajax';
import Model from 'ember-magic-man/model';

export default Model.extend({
  addFavorite: function(bookmark) {
    return ajax("https://api.parse.com/1/users/" + this.id, {
      type: "PUT",
      data: JSON.stringify({
        favorites: {
          __op: "AddRelation",
          objects: [
            {
              __type: 'Pointer',
              className: 'Bookmark',
              objectId: bookmark.id
            }
          ]
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
