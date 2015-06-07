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

});//# sourceMappingURL=addons.map