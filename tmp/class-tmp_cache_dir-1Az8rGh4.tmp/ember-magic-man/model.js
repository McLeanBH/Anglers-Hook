define('ember-magic-man/model', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    reload: function(){
      var type = this._typeKey();
      return this.store.find(type, this.id);
    },

    destroy: function(){
      var type = this._typeKey();
      return this.store.destroy(type, this);
    },

    save: function(){
      var type = this._typeKey();
      return this.store.save(type, this);
    },

    _typeKey: function() {
      var typeKey = this.get('typeKey');
      var moduleName = ((this.constructor._toString || "").match(/model:([^:]*):*/) || []).pop();
      var key = typeKey || moduleName;
      if(Ember['default'].isEmpty(key)){
        throw new Ember['default'].Error("No typeKey was found for '" + this + "'");
      }
      return key;
    },

    toJSON: function() {
      return Ember['default'].Object.create(this);
    }
  });

});