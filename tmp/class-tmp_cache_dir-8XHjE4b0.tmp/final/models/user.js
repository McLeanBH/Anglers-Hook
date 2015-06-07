define('final/models/user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    destroy: function destroy() {
      this.store.destroy("user", this);
    },

    save: function save() {
      this.store.save("user", this);
    },

    toJSON: function toJSON() {
      console.log("User#toJSON");
      return this;
    }
  });

});