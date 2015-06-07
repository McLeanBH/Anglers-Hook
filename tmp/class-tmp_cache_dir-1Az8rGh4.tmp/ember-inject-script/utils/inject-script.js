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