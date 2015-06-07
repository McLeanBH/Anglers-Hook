define('final/adapters/photo', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    find: function find(name, id) {
      /* jshint unused: false */
      return ajax['default']("https://api.parse.com/1/classes/Photo/" + id).then(function (photo) {
        photo.id = photo.objectId;
        delete photo.objectId;
        return photo;
      });
    },

    findAll: function findAll(name) {
      /* jshint unused: false */
      return ajax['default']("https://api.parse.com/1/classes/Photo").then(function (response) {
        return response.results.map(function (photo) {
          photo.id = photo.objectId;
          delete photo.objectId;
          return photo;
        });
      });
    },

    findQuery: function findQuery(name, query) {
      /* jshint unused: false */
      return ajax['default']("https://api.parse.com/1/classes/Photo", {
        data: Ember['default'].$.param({
          where: JSON.stringify(query)
        })
      }).then(function (response) {
        return response.results.map(function (photo) {
          photo.id = photo.objectId;
          delete photo.objectId;
          return photo;
        });
      });
    },

    destroy: function destroy(name, record) {
      /* jshint unused: false */
      return ajax['default']({
        url: "https://api.parse.com/1/classes/Photo/" + record.id,
        type: "DELETE"
      });
    },

    save: function save(name, record) {
      /* jshint unused: false */
      if (record.id) {
        return ajax['default']({
          url: "https://api.parse.com/1/classes/Photo/" + record.id,
          type: "PUT",
          data: JSON.stringify(record.toJSON())
        }).then(function (response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      } else {
        return ajax['default']({
          url: "https://api.parse.com/1/classes/Photo",
          type: "POST",
          data: JSON.stringify(record.toJSON())
        }).then(function (response) {
          record.id = response.objectId;
          record.createdAt = response.createdAt;
          return record;
        });
      }
    }
  });

});