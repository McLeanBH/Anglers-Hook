define('final/services/store', ['exports', 'ember', 'final/models/identity-map'], function (exports, Ember, IdentityMap) {

  'use strict';

  var identityMap = IdentityMap['default'].create();

  exports['default'] = Ember['default'].Object.extend({
    find: function find(name, id) {

      var cached = identityMap.get(name, id);
      if (cached) {
        return Ember['default'].RSVP.resolve(cached);
      }

      var adapter = this.container.lookup("adapter:" + name);
      return adapter.find(name, id).then(function (record) {
        identityMap.set(name, id, record);
        return record;
      });
    },

    findAll: function findAll(name) {
      var adapter = this.container.lookup("adapter:" + name);
      return adapter.findAll(name).then(function (records) {
        identityMap.clear(name);
        records.forEach(function (r) {
          identityMap.set(name, r.id, r);
        });

        return identityMap.get(name);
      });
    },

    destroy: function destroy(name, record) {
      var adapter = this.container.lookup("adapter:" + name);
      return adapter.destroy(name, record).then(function () {
        identityMap.remove(name, record);
      });
    },

    save: function save(name, record) {
      var adapter = this.container.lookup("adapter:" + name);
      return adapter.save(name, record).then(function () {
        identityMap.set(name, record.id, record);
        return record;
      });
    }
  });

});