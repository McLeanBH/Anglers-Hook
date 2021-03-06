/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'final',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      filepickerKey: 'A4kxhmkh4TVYjc7Kv3IGQz'

    },


  contentSecurityPolicy: {
    'default-src': "'self'",
    'script-src': "'self' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com http://api.wunderground.com http://api.filepicker.io",
    'font-src': "'self' http://*.gstatic.com https://*.gstatic.com",
    'connect-src': " https://api.mixpanel.com https://api.parse.com",
    'img-src': "'self' https://*.googleapis.com https://*.gstatic.com http://api.wunderground.com https://*.filepicker.io https://*.filepicker.com",
    'style-src': "'self' 'unsafe-inline' https://*.googleapis.com http://*.googleapis.com",
    'media-src': "'self'",
    'report-uri': "'self'",
    'frame-src': "https://*.filepicker.io"
   },

   'simple-auth': {
     authorizer: 'authorizer:parse',
     crossOriginWhitelist: ['https://api.parse.com'],
     routeAfterAuthentication: "segue.dashboard",
     routeIfAlreadyAuthenticated: "segue.dashboard"
   },

   parseKeys: {
     applicationId: "qBQnGMkwKJIbp3cCVApnMjRBCSezpmu8rSbV7M1I",
     restApi: "vyaxQsffU5lNaiG5henoGBTaQ1FcEyzmhFxOeVKK"
   }
  };

  if (environment === 'development') {
    ENV.contentSecurityPolicy['script-src'] = ENV.contentSecurityPolicy['script-src'] + " 'unsafe-eval'";
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/Anglers-Hook/';
  }

  return ENV;
};
