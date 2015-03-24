import ajax from 'ic-ajax';
import Model from 'ember-magic-man/model';

export default Model.extend({
  addFavorite: function(photos) {
    return ajax("https://api.parse.com/1/photos/" + this.id, {
      type: "PUT",
      data: JSON.stringify({
        favorites: {
          __op: "AddRelation",
          objects: [
            {
              __type: 'Pointer',
              className: 'Photo',
              objectId: bookmark.id
            }
          ]
        }
      })
    });
  }
});



// export default Model.extend({
//   toJSON: function(){
//     var data = this._super();
//     var userId = this.get('createdBy.id');
//     if(userId) {
//       data.set('createdBy', { __type: 'Pointer', className: '_User', objectId: userId }); }
//     return data;
//   }
// });


// export default Model.extend({
//   addFavorite: function(bookmark) {
//     return ajax("https://api.parse.com/1/users/" + this.id, {
//       type: "PUT",
//       data: JSON.stringify({
//         favorites: {
//           __op: "AddRelation",
//           objects: [
//             {
//               __type: 'Pointer',
//               className: 'Bookmark',
//               objectId: bookmark.id
//             }
//           ]
//         }
//       })
//     });
//   }
// });
