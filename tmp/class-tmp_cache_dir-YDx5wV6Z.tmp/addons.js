define("ember-cli-filepicker", ["ember-cli-filepicker/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-cli-filepicker/mixins/ember-filepicker', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Mixin.create({
		handleSelection: function(data) {
			if (this.get('onSelection')) {
				this.sendAction('onSelection', data);
			}
			
		},
		handleError: function(data) {
			if (data.code === 101 && this.get('onClose')) {
				this.sendAction('onClose');
			} 
			else if (this.get('onError')) {
				this.sendAction('onError', data);
			}
			
		},
		onSelection: null,
		onError: null,
		onClose: null,
		options : {},

		show: function() {
			window.filepicker.pick(
				this.get('options'),
				this.handleSelection.bind(this),
				this.handleError.bind(this)
			);
		}.on('didInsertElement')
	});

});
define("ember-cli-jquery-ui", ["ember-cli-jquery-ui/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-cli-jquery-ui/components/jqui-accordion/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'accordion',
        uiOptions: ['active', 'animate', 'collapsible', 'disabled', 'event', 'header', 'heightStyle', 'icons'],
        uiEvents: ['activate', 'beforeActivate', 'create']
    });

});
define('ember-cli-jquery-ui/components/jqui-autocomplete/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].TextField.extend(jquiWidget['default'], {
        uiType: 'autocomplete',
        uiOptions: ['autofocus', 'delay', 'disabled', 'minLength', 'position', 'source'  ],
        uiEvents: ['close', 'search']
    });

});
define('ember-cli-jquery-ui/components/jqui-button/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'button',
        uiOptions: ['disabled'],
        uiEvents: [],
        tagName: 'button',
        disabled: false,
        icon: "",

        didInsertElement: function() {
            var _this = this;
            Ember['default'].run.next(function() {
                _this.$().button("option", "icons", {
                    primary: _this.get('icon')
                });
            });
        },

        click: function() {
            this.sendAction();
        }
    });

});
define('ember-cli-jquery-ui/components/jqui-datepicker/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

  'use strict';

  exports['default'] = Ember['default'].TextField.extend(jquiWidget['default'], {
    uiType: 'datepicker',
    uiOptions: ["altField", "altFormat", "appendText", "autoSize",
      "beforeShow", "beforeShowDay", "buttonImage", "buttonImageOnly",
      "buttonText", "calculateWeek", "changeMonth", "changeYear", "closeText",
      "constrainInput", "currentText", "dateFormat", "dayNames", "dayNamesMin",
      "dayNamesShort", "defaultDate", "duration", "firstDay", "gotoCurrent",
      "hideIfNoPrevNext", "isRTL", "maxDate", "minDate", "monthNames",
      "monthNamesShort", "navigationAsDateFormat", "nextText", "numberOfMonths",
      "onChangeMonthYear", "onClose", "onSelect", "prevText",
      "selectOtherMonths", "shortYearCutoff", "showAnim", "showButtonPanel",
      "showCurrentAtPos", "showMonthAfterYear", "showOn", "showOptions",
      "showOtherMonths", "showWeek", "stepMonths", "weekHeader", "yearRange",
      "yearSuffix"],
    uiEvents: ['onChangeMonthYear', 'onClose', 'onSelect']
  });

});
define('ember-cli-jquery-ui/components/jqui-menu/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'menu',
        uiOptions: ['disabled'],
        uiEvents: ['blur', 'create', 'focus', 'select']
    });

});
define('ember-cli-jquery-ui/components/jqui-progress-bar/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'progressbar',
        uiOptions: ['value', 'max'],
        uiEvents: ['change', 'complete']
    });

});
define('ember-cli-jquery-ui/components/jqui-slider/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'slider',
        uiOptions: ['animate', 'disabled', 'max', 'min', 'orientation', 'range', 'step', 'value', 'values'  ],
        uiEvents: ['change', 'create', 'slide', 'start', 'stop'],
        uiActions: {
            slide: function(event, ui) {
                this.set('value', ui.value);
                this.set('values', ui.values);
            }
        }
    });

});
define('ember-cli-jquery-ui/components/jqui-spinner/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].TextField.extend(jquiWidget['default'], {
        uiType: 'spinner',
        uiOptions: ['culture', 'disabled', 'incremental', 'max', 'min', 'numberFormat', 'page', 'step'],
        uiEvents: ['change', 'create', 'spin', 'start', 'stop']
    });

});
define('ember-cli-jquery-ui/components/jqui-tabs/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'tabs',
        uiOptions: ['active', 'collapsible', 'disabled', 'event', 'heightStyle', 'hide', 'show'],
        uiEvents: ['activate', 'beforeActivate', 'beforeLoad', 'create', 'load'],

        uiActions: {
            // Hacky workaround for bug in JQuery UI Tabs _isLocal method
            // Source: http://stackoverflow.com/questions/13837304/jquery-ui-non-ajax-tab-loading-whole-website-into-itself
            create: function(event){
                var $ = Ember['default'].$;
                var tabsData = $(event.target).data('ui-tabs');
                tabsData.anchors.each(function(idx, anchor){
                    var contentId = $(anchor).attr('href');
                    var $panel = $(tabsData.panels[idx]);
                    $panel.html($(contentId).remove().html());
                });
            },
            beforeLoad: function(event){
                event.preventDefault();
            }
        }
    });

});
define('ember-cli-jquery-ui/mixins/jqui-widget', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Mixin.create({

        // When Ember creates the view's DOM element, it will call this
        // method.
        setup: function() {
            var _this = this;
            Ember['default'].run.scheduleOnce('afterRender', function() {

                // Make jQuery UI options available as Ember properties
                var options = _this._gatherOptions();

                // Make sure that jQuery UI events trigger methods on this view.
                _this._gatherEvents(options);

                // Workaround for bug in jQuery UI datepicker
                // $.ui.datepicker is not a function
                var ui;
                var uiType = _this.get('uiType');
                if (uiType === "datepicker") {
                    _this.$().datepicker(options);
                    ui = _this.$(uiType)['widget'];
                } else {

                    // Create a new instance of the jQuery UI widget based on its `uiType`
                    // and the current element.
                    ui = Ember['default'].$.ui[_this.get('uiType')](options, _this.get('element'));
                }

                // Save off the instance of the jQuery UI widget as the `ui` property
                // on this Ember view.
                _this.set('ui', ui);

            });
        }.on('didInsertElement'),

        // When Ember tears down the view's DOM element, it will call
        // this method.
        tearDown: function() {
            var ui = this.get('ui');

            if (ui) {
                // Tear down any observers that were created to make jQuery UI
                // options available as Ember properties.
                var observers = this._observers;
                for (var prop in observers) {
                    if (observers.hasOwnProperty(prop)) {
                        this.removeObserver(prop, observers[prop]);
                    }
                }
                ui._destroy();
            }
        }.on('willDestroyElement'),

        // Each jQuery UI widget has a series of options that can be configured.
        // For instance, to disable a button, you call
        // `button.options('disabled', true)` in jQuery UI. To make this compatible
        // with Ember bindings, any time the Ember property for a
        // given jQuery UI option changes, we update the jQuery UI widget.
        _gatherOptions: function() {
            var uiOptions = this.get('uiOptions'), options = {};

            // The view can specify a list of jQuery UI options that should be treated
            // as Ember properties.
            uiOptions.forEach(function(key) {
                options[key] = this.get(key);

                // Set up an observer on the Ember property. When it changes,
                // call jQuery UI's `option` method to reflect the property onto
                // the jQuery UI widget.
                var observer = function() {
                    var value = this.get(key);
                    this.get('ui').option(key, value);
                };
                this.addObserver(key, observer);

                // Insert the observer in a Hash so we can remove it later.
                this._observers = this._observers || {};
                this._observers[key] = observer;
            }, this);
            return options;
        },

        // Each jQuery UI widget has a number of custom events that they can
        // trigger. For instance, the progressbar widget triggers a `complete`
        // event when the progress bar finishes. Make these events behave like
        // normal Ember events. For instance, a subclass of JQ.ProgressBar
        // could implement the `complete` method to be notified when the jQuery
        // UI widget triggered the event.
        _gatherEvents: function(options) {
            var uiEvents = this.get('uiEvents') || [], self = this;
            uiEvents.forEach(function(eventName) {
                var callback = self.uiActions && self.uiActions[eventName];

                // You can register a handler for a jQuery UI event by passing
                // it in along with the creation options. Update the options hash
                // to include any event callbacks.
                options[eventName] = function(event, ui) {
                    if (callback) {
                        callback.call(self, event, ui);
                    }

                    self.sendAction(eventName, event, ui);
                };
            });
        }
    });

});
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
define("ember-inject-script", ["ember-inject-script/index","exports"], function(__index__, __exports__) {
  "use strict";
  Object.keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-inject-script/index', ['exports', 'ember-inject-script/utils/inject-script'], function (exports, injectScript) {

	'use strict';

	exports['default'] = injectScript['default'];

});
define('ember-inject-script/utils/inject-script', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function injectScript(src) {
    return new Ember['default'].RSVP.Promise(function(resolve) {
      var script    = document.createElement('script');
      script.type   = 'text/javascript';
      script.async  = true;
      script.src    = src;
      script.onload = function() { resolve(); };
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
  exports['default'] = injectScript;

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