/* jshint ignore:start */

define('final/config/environment', ['ember'], function(Ember) {
  var prefix = 'final';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("final/tests/test-helper");
} else {
  require("final/app")["default"].create({"name":"final","version":"0.0.0.b63cf4de"});
}

/* jshint ignore:end */
