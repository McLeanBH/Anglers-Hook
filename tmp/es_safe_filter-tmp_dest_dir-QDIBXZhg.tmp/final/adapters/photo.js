import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/Photo/" + id).then(function(photo){
      photo.id = photo.objectId;
      delete photo.objectId;
      return photo;
    });
  },

  findAll: function(name) {
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/Photo").then(function(response){
      return response.results.map(function(photo) {
        photo.id = photo.objectId;
        delete photo.objectId;
        return photo;
      });
    });
  },

  findQuery: function(name, query) {
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/Photo", {
      data: Ember.$.param({
              where: JSON.stringify(query)
            })
    }).then(function(response){
      return response.results.map(function(photo) {
        photo.id = photo.objectId;
        delete photo.objectId;
        return photo;
      });
    });
  },

  destroy: function(name, record) {
    /* jshint unused: false */
    return ajax({
      url: "https://api.parse.com/1/classes/Photo/" + record.id,
      type: "DELETE"
    });
  },

  save: function(name, record) {
    /* jshint unused: false */
    if(record.id) {
      return ajax({
        url: "https://api.parse.com/1/classes/Photo/" + record.id,
        type: "PUT",
        data: JSON.stringify(record.toJSON())
      }).then(function(response) {
        record.updatedAt = response.updatedAt;
        return record;
      });
    } else {
      return ajax({
        url: "https://api.parse.com/1/classes/Photo",
        type: "POST",
        data: JSON.stringify(record.toJSON())
      }).then(function(response) {
        record.id = response.objectId;
        record.createdAt = response.createdAt;
        return record;
      });
    }
  }
});
