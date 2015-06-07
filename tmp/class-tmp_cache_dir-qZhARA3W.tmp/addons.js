define("ember-cli-photoswipe", ["ember-cli-photoswipe/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-cli-photoswipe/components/photo-swipe', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  /* global PhotoSwipe */
  /* global PhotoSwipeUI_Default */

  var run = Em['default'].run;

  exports['default'] = Em['default'].Component.extend({

    onInsert: Em['default'].on('didInsertElement', function() {

      this.set('pswpEl', this.$('.pswp')[0]);
      this.set('pswpTheme', PhotoSwipeUI_Default);

      this._buildOptions();

      // when passing an array of items, we don't need a block
      if (this.get('items')) {
        return this._initItemGallery();
      }
      return this._calculateItems();
    }),

    _buildOptions: function(getThumbBoundsFn) {
       var reqOpts = {
        history: false
      };

      if (Em['default'].isPresent(getThumbBoundsFn)) {
        reqOpts.getThumbBoundsFn = getThumbBoundsFn;
      }

      var options = Em['default'].merge(reqOpts, this.get('options') || {});
      this.set('options', options);
    },

    _initItemGallery: function() {
      this.set('gallery', new PhotoSwipe(
        this.get('pswpEl'),
        this.get('pswpTheme'),
        this.get('items'),
        this.get('options')
      ));
      this._reInitOnClose();
    },

    _reInitOnClose: function() {
      var component = this;
      this.get('gallery').listen('close', function() {
        run.next(function() {
          component._initItemGallery();
        });
      });
    },

    click: function(evt) {

      var aElement = this.$(evt.target).parent();
      var index    = aElement.index();

      if (Em['default'].isEmpty(this.get('template')) || !aElement.is('a')) { return; }

      evt.preventDefault();

      // setup options, such as index for index
      this._buildOptions(this._getBounds.bind(this));
      this.set('options.index', index);

      var pSwipe = new PhotoSwipe(
        this.get('pswpEl'),
        this.get('pswpTheme'),
        this.get('calculatedItems'),
        this.get('options')
      );
      pSwipe.init();
    },

    _getBounds: function(i) {
      var img      = this.$('img').get(i),
          position = this.$(img).position(),
          width    = this.$(img).width();
      return {x: position.left, y: position.top, w: width};
    },

    _calculateItems: function() {
      var items           = this.$().find('a');
      var calculatedItems = Em['default'].A(items).map(function(i, item) {
        return {
          src:   Em['default'].$(item).attr('href'),
          w:     Em['default'].$(item).data('width'),
          h:     Em['default'].$(item).data('height'),
          msrc:  Em['default'].$(item).children('img').attr('src'),
          title: Em['default'].$(item).children('img').attr('alt')
        };
      });
      this.set('calculatedItems', calculatedItems);
    }
  });

});
define("ember-cli-weather-icons", ["ember-cli-weather-icons/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-cli-weather-icons/helpers/weather-icon', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.weatherIcon = weatherIcon;

  function weatherIcon(weather) {
    return new Ember['default'].Handlebars.SafeString('<i class="wi wi-' + weather + '"></i>');
  }

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(weatherIcon);

});
define("ember-magic-man", ["ember-magic-man/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-magic-man/identity-map', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    init: function(){
      this._map = Ember['default'].Object.create();
    },

    get: function(type, id) {
      var typeArray = this._getType(type);
      if(id) {
      /* SINGLE RECORD */
        return typeArray.findBy('__jsim_meta_id', id);
      } else {
      /* ALL RECORDS */
        return typeArray;
      }
    },

    set: function(type, id, record) {
      var typeArray = this._getType(type);
      var cached = typeArray.findBy('__jsim_meta_id', id);
      if(cached) {
        cached.setProperties(record);
        return cached;
      } else {
        var v = record instanceof(Ember['default'].Object) ? record : Ember['default'].Object.create(record);
        Object.defineProperty(v, '__jsim_meta_id', {
          value: id,
          configurable: true
        });
        typeArray.addObject(v);
        return v;
      }
    },

    remove: function(type, record) {
      var typeArray = this._getType(type);
      if(typeof(record) !== "object") {
        // assume it's an id
        record = typeArray.findBy('__jsim_meta_id', record);
      }
      typeArray.removeObject(record);
    },

    clear: function(type) {
      var typeArray = this._getType(type);
      typeArray.splice(0, typeArray.length);
    },

    _getType: function(type) {
      var typeArray = this._map.get(type);
      if(!typeArray){
        this._map.set(type, Ember['default'].A());
        typeArray = this._map.get(type);
      }
      return typeArray;
    }
  });

});
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
define('ember-magic-man/store', ['exports', 'ember', 'ember-magic-man/identity-map'], function (exports, Ember, IdentityMap) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    init: function(){
      this.records = IdentityMap['default'].create();
    },

    find: function(type, id){
      var adapter = this.adapterFor(type);
      this._adapterHasMethod(adapter, 'find');

      return adapter.find(type, id).then(function(recordData) {
        var record = this.createRecord(type, recordData);
        return this.records.set(type, id, record);
      }.bind(this));
    },

    findAll: function(type){
      var adapter = this.adapterFor(type);
      this._adapterHasMethod(adapter, 'find');

      return adapter.findAll(type).then(function(recordsData) {
        this.records.clear(type);
        recordsData.forEach(function(recordData) {
          var record = this.createRecord(type, recordData);
          this.records.set(type, record.id, record);
        }.bind(this));

        return this.records.get(type);
      }.bind(this));
    },

    findQuery: function(type, query){
      var adapter = this.adapterFor(type);
      this._adapterHasMethod(adapter, 'find');

      return adapter.findQuery(type, query);
    },

    destroy: function(type, record) {
      var adapter = this.adapterFor(type);
      this._adapterHasMethod(adapter, 'find');

      return adapter.destroy(type, record).then(function() {
        this.records.remove(type, record);
      }.bind(this));
    },

    save: function(type, record) {
      var adapter = this.adapterFor(type);
      this._adapterHasMethod(adapter, 'find');

      return adapter.save(type, record).then(function(recordData) {
        var record = this.createRecord(type, recordData);
        return this.records.set(type, record.id, record);
      }.bind(this));
    },

    push: function(type, data) {
      var factory = this.modelFor(type);
      var record = data instanceof(factory) ? data : factory.create(data);
      return this.records.set(type, record.id, record);
    },

    createRecord: function(type, properties){
      var factory = this.modelFor(type);
      return factory.create(properties);
    },

    adapterFor: function(type) {
      var adapter = this.container.lookup('adapter:' + type);
      if (!adapter) {
        throw new Ember['default'].Error("No adapter was found for '" + type + "'");
      }
      return adapter;
    },

    modelFor: function(type) {
      var factory = this.container.lookupFactory('model:' + type);
      if (!factory) {
        throw new Ember['default'].Error("No model was found for '" + type + "'");
      }
      return factory;
    },

    _adapterHasMethod: function(adapter, method) {
      if (!adapter || !adapter[method] || typeof(adapter[method]) !== 'function') {
        throw new Ember['default'].Error("Adapter " + adapter.toString() + " has no method '" + method + "'");
      }
    }
  });

});//# sourceMappingURL=addons.map