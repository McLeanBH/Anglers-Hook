/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('http://fonts.googleapis.com/css?family=PT+Mono', { destDir: 'fonts'});
app.import('http://fonts.googleapis.com/css?family=Syncopate:400,700', { destDir: 'fonts'});
app.import('http://fonts.googleapis.com/css?family=Gravitas+One', { destDir: 'fonts'});
app.import('bower_components/weather-icons/font/weathericons-regular-webfont.eot', { destDir: 'fonts'});
app.import('bower_components/weather-icons/font/weathericons-regular-webfont.svg', { destDir: 'fonts'});
app.import('bower_components/weather-icons/font/weathericons-regular-webfont.ttf', { destDir: 'fonts'});
app.import('bower_components/weather-icons/font/weathericons-regular-webfont.woff', { destDir: 'fonts'});
app.import('bower_components/weather-icons/font/WeatherIcons-Regular.otf', { destDir: 'fonts'});
app.import('bower_components/weather-icons/css/weather-icons.css');
app.import('bower_components/jquery.simpleWeather.js');
app.import('vendor/gmaps.js');

module.exports = app.toTree();


// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
