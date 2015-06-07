define('final/models/photo', ['exports', 'ember-magic-man/model'], function (exports, Model) {

  'use strict';

  exports['default'] = Model['default'].extend({
    toJSON: function toJSON() {
      var data = this._super();

      var userId = this.get("createdBy.id");
      if (userId) {
        data.set("createdBy", {
          __type: "Pointer",
          className: "_User",
          objectId: userId
        });
      }

      return data;
    }
  });

});