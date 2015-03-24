import ajax from 'ic-ajax';
import Model from 'ember-magic-man/model';

export default Model.extend({
  addFavorite: function(photo) {
    return ajax("https://api.parse.com/1/photos/" + this.id, {
      type: "PUT",
      data: JSON.stringify({
        favorites: {
          __op: "AddRelation",
          objects: [
            {
              __type: 'Pointer',
              className: 'Photo',
              objectId: photo.id
            }
          ]
        }
      })
    });
  }
});
