/* jshint ignore:start */

/* jshint ignore:end */

define('final/adapters/user', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    find: function find(name, id) {
      /* jshint unused: false */
      return ajax['default']("https://api.parse.com/1/users/" + id).then(function (user) {
        user.id = user.objectId;
        delete user.objectId;
        delete user.sessionToken;
        return user;
      });
    },

    findAll: function findAll(name) {
      return ajax['default']("https://api.parse.com/1/users").then(function (response) {
        return response.results.map(function (user) {
          user.id = user.objectId;
          delete user.objectId;
          return user;
        });
      });
    },

    findQuery: function findQuery(name, query) {
      return ajax['default']("https://api.parse.com/1/users", {
        data: Ember['default'].$.param({
          where: JSON.stringify(query)
        })
      }).then(function (response) {
        return response.results.map(function (user) {
          user.id = user.objectId;
          delete user.objectId;
          return user;
        });
      });
    },

    destroy: function destroy(name, record) {
      return ajax['default']({
        url: "https://api.parse.com/1/users" + record.id,
        type: "DELETE"
      });
    },

    save: function save(name, record) {
      if (record.id) {
        return ajax['default']({
          url: "https://api.parse.com/1/users" + record.id,
          type: "PUT",
          data: JSON.stringify(record.toJSON())
        }).then(function (response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      } else {
        return ajax['default']({
          url: "https://api.parse.com/1/users",
          type: "POST",
          data: JSON.stringify(record.toJSON())
        }).then(function (response) {
          record.id = response.objectId;
          record.createAt = response.createdAt;
          record.sessionToken = response.sessionToken;
          return record;
        });
      }
    }
  });

});
define('final/adapters/weather-data', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    findQuery: function findQuery(name, query) {
      return ajax['default']("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/geolookup/conditions/forecast/hourly/rawtide/tide/q/autoip.json", {
        dataType: "jsonp"
      }).then(function (response) {
        console.log(response);
        return response;
      });
    }
  });

  // export default Ember.Object.extend({
  //   findQuery: function(name, query){
  //     return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip.gif?num=8&radius=1000&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=97.388&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&interval=30&rad.width=800$rad.height=800&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.width=800&sat.height=800&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=1&sat.num=5&borders=0", {
  //       dataType: 'jsonp'
  //     }).then(function(response){
  //       console.log(response);
  //       return response;
  //     });
  //   }
  // });

});
define('final/adapters/weather-radar', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    // findQuery: function(name, query){
    //     return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip/?num=5&delay=50&rad.maxlat=47.709&rad.maxlon=-69.263&rad.minlat=31.596&rad.minlon=-97.388&rad.width=450&rad.height=450&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&sat.width=450&sat.height=45  0&sat.key=sat_ir4_bottom&sat.gtt=107&sat.proj=me&sat.timelabel=0&sat.num=5", {
    //     dataType: 'jsonp'
    //   }).then(function(response){
    //     console.log(response);
    //     return response;
    //   });
    // }
    findQuery: function findQuery(name, location) {
      var url = "http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/" + location + ".gif?num=8&radius=1000&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=97.388&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&interval=30&rad.width=450$rad.height=450&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.width=450&sat.height=450&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=1&sat.num=5&borders=0";
      return new Ember['default'].RSVP.Promise(function (resolve) {
        var image = new Image();
        image.src = url;
        if (image.complete || image.readyState === "complete") {
          resolve({ radarUrl: url });
        } else {
          Ember['default'].$(image).on("load", function () {
            resolve({ radarUrl: url });
          });
        }
      });
    }
  });

  // return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/autoip.gif?num=6&delay=50&interval=30", {

});
define('final/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'final/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('final/authenticators/parse-email', ['exports', 'ic-ajax', 'simple-auth/authenticators/base', 'ember'], function (exports, ajax, Base, Ember) {

  'use strict';

  exports['default'] = Base['default'].extend({
    sessionToken: null,

    restore: function restore(data) {
      this.set("sessionToken", data.sessionToken);
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        if (!Ember['default'].isEmpty(data.sessionToken)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(credentials) {
      var token = credentials.sessionToken;
      if (token) {
        this.set("sessionToken", token);
      }
      var endpoint = token ? "users/me" : "login";
      var options = token ? {} : {
        data: {
          username: credentials.identification,
          password: credentials.password
        }
      };

      return ajax['default']("https://api.parse.com/1/" + endpoint, options).then((function (response) {
        this.set("sessionToken", response.sessionToken);
        return { sessionToken: response.sessionToken };
      }).bind(this));
    },

    invalidate: function invalidate() {
      this.set("sessionToken", null);
      return Ember['default'].RSVP.resolve();
    }
  });

});
define('final/authorizers/parse', ['exports', 'ember', 'simple-auth/authorizers/base', 'final/config/environment'], function (exports, Ember, Base, ENV) {

  'use strict';

  exports['default'] = Base['default'].extend({
    authorize: function authorize(jqXHR) {
      jqXHR.setRequestHeader("X-Parse-Application-Id", ENV['default'].parseKeys.applicationId);
      jqXHR.setRequestHeader("X-Parse-REST-API-Key", ENV['default'].parseKeys.restApi);

      var sessionToken = this.get("session.sessionToken");
      if (!Ember['default'].isEmpty(sessionToken)) {
        jqXHR.setRequestHeader("X-Parse-Session-Token", sessionToken);
      }
    }
  });

});
define('final/components/google-map', function () {

	'use strict';

	// // ( app/components/google-map.js ) //
	//
	// import Ember from 'ember';
	//
	// export default Ember.Component.extend({
	//     insertMap: function() {
	//       var container = this.$('.map-canvas')[0];
	//         var options = {
	//             center: new window.google.maps.LatLng(
	//                 this.get('latitude'),
	//                 this.get('longitude'),
	//                 this.get('cloudLayer')
	//             ),
	//             zoom: 15
	//         };
	//         new window.google.maps.Map(container, options);
	//     }.on('didInsertElement')
	// });
	//
	//
	// // function initialize() {
	// // var mapOptions = {
	// // zoom: 4,
	// // center: new google.maps.LatLng(49.265984,-123.127491)
	// // };
	// //
	// // var map = new google.maps.Map(document.getElementById('map-canvas'),
	// //   mapOptions);
	// //
	// // var weatherLayer = new google.maps.weather.WeatherLayer({
	// // temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
	// // });
	// // weatherLayer.setMap(map);
	// //
	// // var cloudLayer = new google.maps.weather.CloudLayer();
	// // cloudLayer.setMap(map);
	// // google.maps.event.addDomListener(window, 'load', initialize);
	// // }
	// // });

});
define('final/components/photo-swipe', ['exports', 'ember-cli-photoswipe/components/photo-swipe'], function (exports, PhotoSwipe) {

	'use strict';

	exports['default'] = PhotoSwipe['default'];

});
define('final/controllers/login', ['exports', 'ember', 'simple-auth/mixins/login-controller-mixin'], function (exports, Ember, LoginControllerMixin) {

  'use strict';

  // (app.contollers.login.js) //

  exports['default'] = Ember['default'].Controller.extend(LoginControllerMixin['default'], {
    authenticator: "authenticator:parse-email" });

});
define('final/controllers/register', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.register.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      saveUser: function saveUser() {
        var userData = this.getProperties("firstName", "lastName", "email", "username", "password");
        var self = this;
        this.get("model").setProperties(userData);
        this.get("model").save().then(function (user) {
          self.get("session").authenticate("authenticator:parse-email", user);
        });
      }
    }
  });

});
define('final/controllers/segue/weather-radar', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

	// return "http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/image.gif?num=8&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=-97.388&rad.width=500&rad.height=500&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&sat.width=640&sat.height=480&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=0&sat.num=5&borders=0";

	// radarUrl: function(){
	//   var location = "autoip";
	//   return "http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/q/" + location + ".gif?num=8&radius=1000&delay=25&rad.maxlat=32.7833&rad.maxlon=79.9333&rad.minlat=31.596&rad.minlon=97.388&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&interval=30&rad.width=450$rad.height=450&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.width=450&sat.height=450&sat.key=sat_ir4&sat.gtt=107&sat.proj=me&sat.timelabel=1&sat.num=5&borders=0";
	// }.property()

});
define('final/controllers/user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.user.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {}
  });

});
define('final/helpers/fa-icon', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FA_PREFIX = /^fa\-.+/;

  var warn = Ember['default'].Logger.warn;

  /**
   * Handlebars helper for generating HTML that renders a FontAwesome icon.
   *
   * @param  {String} name    The icon name. Note that the `fa-` prefix is optional.
   *                          For example, you can pass in either `fa-camera` or just `camera`.
   * @param  {Object} options Options passed to helper.
   * @return {Ember.Handlebars.SafeString} The HTML markup.
   */
  var faIcon = function faIcon(name, options) {
    if (Ember['default'].typeOf(name) !== "string") {
      var message = "fa-icon: no icon specified";
      warn(message);
      return Ember['default'].String.htmlSafe(message);
    }

    var params = options.hash,
        classNames = [],
        html = "";

    classNames.push("fa");
    if (!name.match(FA_PREFIX)) {
      name = "fa-" + name;
    }
    classNames.push(name);
    if (params.spin) {
      classNames.push("fa-spin");
    }
    if (params.flip) {
      classNames.push("fa-flip-" + params.flip);
    }
    if (params.rotate) {
      classNames.push("fa-rotate-" + params.rotate);
    }
    if (params.lg) {
      warn("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}");
      classNames.push("fa-lg");
    }
    if (params.x) {
      warn("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"" + params.x + "\"}}");
      classNames.push("fa-" + params.x + "x");
    }
    if (params.size) {
      if (Ember['default'].typeOf(params.size) === "string" && params.size.match(/\d+/)) {
        params.size = Number(params.size);
      }
      if (Ember['default'].typeOf(params.size) === "number") {
        classNames.push("fa-" + params.size + "x");
      } else {
        classNames.push("fa-" + params.size);
      }
    }
    if (params.fixedWidth) {
      classNames.push("fa-fw");
    }
    if (params.listItem) {
      classNames.push("fa-li");
    }
    if (params.pull) {
      classNames.push("pull-" + params.pull);
    }
    if (params.border) {
      classNames.push("fa-border");
    }
    if (params.classNames && !Ember['default'].isArray(params.classNames)) {
      params.classNames = [params.classNames];
    }
    if (!Ember['default'].isEmpty(params.classNames)) {
      Array.prototype.push.apply(classNames, params.classNames);
    }

    html += "<";
    var tagName = params.tagName || "i";
    html += tagName;
    html += " class='" + classNames.join(" ") + "'";
    if (params.title) {
      html += " title='" + params.title + "'";
    }
    if (params.ariaHidden === undefined || params.ariaHidden) {
      html += " aria-hidden=\"true\"";
    }
    html += "></" + tagName + ">";
    return Ember['default'].String.htmlSafe(html);
  };

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(faIcon);

  exports.faIcon = faIcon;

});
define('final/initializers/app-version', ['exports', 'final/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('final/initializers/current-user', ['exports', 'ember', 'simple-auth/session', 'ic-ajax'], function (exports, Ember, Session, ajax) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container) {
    Session['default'].reopen({
      setCurrentUser: (function () {
        var token = this.get("sessionToken");

        if (this.get("isAuthenticated") && !Ember['default'].isEmpty(token)) {
          var store = container.lookup("store:main");
          ajax['default']("https://api.parse.com/1/users/me").then((function (response) {
            response.id = response.objectId;
            delete response.objectId;
            delete response.sessionToken;
            var user = store.push("user", response);
            this.set("currentUser", user);
          }).bind(this));
        }
      }).observes("sessionToken")
    });
  }

  exports['default'] = {
    name: "current-user",
    initialize: initialize
  };

});
define('final/initializers/ember-cli-weather-icons', ['exports', 'ember', 'ember-cli-weather-icons/helpers/weather-icon'], function (exports, Ember, weather_icon) {

  'use strict';

  var initialize = function initialize() {
    Ember['default'].Handlebars.helper("weather-icon", weather_icon.weatherIcon);
    Ember['default'].Handlebars.helper("w-i", weather_icon.weatherIcon);
  };

  exports['default'] = {
    name: "ember-cli-weather-icon",
    initialize: initialize
  };
  /* container, app */

  exports.initialize = initialize;

});
define('final/initializers/ember-magic-man', ['exports', 'ember-magic-man/store'], function (exports, Store) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    application.register("store:main", Store['default']);

    application.inject("route", "store", "store:main");
    application.inject("controller", "store", "store:main");
    application.inject("model", "store", "store:main");
  }

  exports['default'] = {
    name: "ember-magic-man",
    initialize: initialize
  };

});
define('final/initializers/export-application-global', ['exports', 'ember', 'final/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('final/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'final/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: "simple-auth",
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']["simple-auth"] || {});
      setup['default'](container, application);
    }
  };

});
define('final/models/user', ['exports', 'ic-ajax', 'ember-magic-man/model'], function (exports, ajax, Model) {

  'use strict';

  exports['default'] = Model['default'].extend({
    addFavorite: function addFavorite(bookmark) {
      return ajax['default']("https://api.parse.com/1/users/" + this.id, {
        type: "PUT",
        data: JSON.stringify({
          favorites: {
            __op: "AddRelation",
            objects: [{
              __type: "Pointer",
              className: "Bookmark",
              objectId: bookmark.id
            }]
          }
        })
      });
    }
  });

  // import Ember from 'ember';
  //
  // export default Ember.Object.extend({
  //   destroy: function(){
  //     this.store.destroy('user', this);
  //   },
  //
  //   save: function(){
  //     this.store.save('user', this);
  //   },
  //
  //   toJSON: function(){
  //     console.log('User#toJSON');
  //     return this;
  //   }
  // });

});
define('final/router', ['exports', 'ember', 'final/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("welcome", { path: "/" });
    this.route("login");
    this.route("register");

    this.route("segue", function () {
      this.route("dashboard");
      this.route("species-ref");
      this.route("weather-radar", function () {
        this.route("loading");
      });
      this.route("forum");
    });
    this.route("search");
    this.route("show");
  });

  exports['default'] = Router;

});
define('final/routes/application', ['exports', 'simple-auth/mixins/application-route-mixin', 'ember'], function (exports, ApplicationRouteMixin, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(ApplicationRouteMixin['default'], {});

});
define('final/routes/index', ['exports', 'simple-auth/mixins/authenticated-route-mixin', 'ember'], function (exports, AuthenticatedRouteMixin, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AuthenticatedRouteMixin['default'], {
    model: function model() {
      return this.store.findAll("radar");
    }
  });

});
define('final/routes/login', ['exports', 'ember', 'simple-auth/mixins/unauthenticated-route-mixin'], function (exports, Ember, UnauthenticatedRouteMixin) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(UnauthenticatedRouteMixin['default'], {});

});
define('final/routes/register', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord("user", {
        createdBy: this.get("session.currentUser")
      });
    },
    actions: {
      createRecord: function createRecord() {
        this.modelFor("register").save().then((function () {
          this.transitionTo("index");
        }).bind(this));
      }
    }
  });

});
define('final/routes/segue/forum', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/segue/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/segue/loading', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

	//   actions: {
	//     doSomethingBad: function() {
	//       throw new Error("Something bad happened!");
	//     }
	//   },model: function () {
	//     return new Ember.RSVP.Promise(function(resolve,reject) {
	//       setTimeout(function(){resolve({});}, 3000);
	//     });
	//   }
	// });

	// .load(function() {
	//     ("#loader").delay(500).fadeOut();
	//     (".mask").delay(1000).fadeOut("slow");
	//   }));

});
define('final/routes/segue/species-ref', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/segue/view-one', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/segue/weather-radar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return Ember['default'].RSVP.hash({
        data: this.store.findQuery("weather-data", "autoip"),
        radar: this.store.findQuery("weather-radar", "autoip")
      });
    }
  });

  // beforeModel: function () {
  //   throw new Error("Something bad happened!");
  // },
  //

});
define('final/routes/show', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find("profile", params.user);
    }
  });

});
define('final/routes/welcome', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          dom.setAttribute(el1,"href","javascript:void(0)");
          var el2 = dom.createTextNode("Logout");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          element(env, element0, context, "action", ["invalidateSession"], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createTextNode("Login");
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
          var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
          block(env, morph0, context, "link-to", ["login"], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","index-navbar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav-left");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","home-btn");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav-container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","footer");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","footer-list");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","footer-icons");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"title","Home");
        dom.setAttribute(el4,"href","/");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/home-48.png");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","footer-icons");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"title","Marine Species");
        dom.setAttribute(el4,"href","/segue/species-ref");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/fish-48.png");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" <li class=\"footer-icons\"><a title=\"Weather\" href=\"/segue/view-one\"><img src=\"/assets/img/location-48.png\"></a></li> ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","footer-icons");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"title","Weather Radar");
        dom.setAttribute(el4,"href","/segue/weather-radar");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/compass-48.png");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","footer-icons");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"title","Media");
        dom.setAttribute(el4,"href","/segue/forum");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/navigation-48.png");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" <li class=\"footer-icons\"><a title=\"Settings\" href=\"/segue/account-settings\"><img src=\"/assets/img/settings-48.png\"></a></li> ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","footer-icons");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"title","Twitter");
        dom.setAttribute(el4,"target","_blank");
        dom.setAttribute(el4,"href","http://twitter.com/intent/tweet?screen_name=sportfishjunkie");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/twitter-48.png");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","footer-icons");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"title","Facebook");
        dom.setAttribute(el4,"target","_blank");
        dom.setAttribute(el4,"href","https://www.facebook.com/marlinmag");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/facebook-48.png");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" <li class=\"footer-icons\"><a title=\"Search\" href=\"/segue/search\"><img src=\"/assets/img/search-find-48.png\"></a></li> ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2,"class","copy");
        var el3 = dom.createTextNode("The Iron Yard © 2015 Ben McLean");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[2]); }
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [5, 1]);
        var morph0 = dom.createMorphAt(dom.childAt(element1, [3]),-1,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [1]),-1,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [3]),-1,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element2, [5]),-1,-1);
        var morph4 = dom.createMorphAt(dom.childAt(element2, [7]),-1,-1);
        var morph5 = dom.createMorphAt(dom.childAt(element2, [9]),-1,-1);
        var morph6 = dom.createMorphAt(fragment,1,2,contextualElement);
        var morph7 = dom.createMorphAt(fragment,2,3,contextualElement);
        inline(env, morph0, context, "link-to", ["Home", "welcome"], {});
        inline(env, morph1, context, "link-to", ["Register", "register"], {});
        inline(env, morph2, context, "link-to", ["Login", "login"], {});
        inline(env, morph3, context, "link-to", ["Species", "segue.species-ref"], {});
        inline(env, morph4, context, "link-to", ["Radar", "segue.weather-radar"], {});
        inline(env, morph5, context, "link-to", ["Media", "segue.forum"], {});
        block(env, morph6, context, "if", [get(env, context, "session.isAuthenticated")], {}, child0, child1);
        content(env, morph7, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/components/google-map', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" <div class=\"map-canvas\"></div>\n{{yield}} ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('final/templates/components/photo-swipe', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--close");
          dom.setAttribute(el1,"title","Close (Esc)");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--share");
          dom.setAttribute(el1,"title","Share");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--fs");
          dom.setAttribute(el1,"title","Toggle fullscreen");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--zoom");
          dom.setAttribute(el1,"title","Zoom in/out");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" Root element of PhotoSwipe. Must have class pswp. ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pswp");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"aria-hidden","true");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Background of PhotoSwipe.\n    It's a separate element, as animating opacity is faster than rgba(). ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pswp__bg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Slides wrapper with overflow:hidden. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pswp__scroll-wrap");
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pswp__container");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" don't modify these 3 pswp__item elements, data is added later on ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pswp__ui pswp__ui--hidden");
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__top-bar");
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("  Controls are self-explanatory. Order can be changed. ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__counter");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__preloader");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","pswp__preloader__icn");
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","pswp__preloader__cut");
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","pswp__preloader__donut");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__share-modal pswp__share-modal--hidden pswp__single-tap");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__share-tooltip");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pswp__button pswp__button--arrow--left");
        dom.setAttribute(el4,"title","Previous (arrow left)");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pswp__button pswp__button--arrow--right");
        dom.setAttribute(el4,"title","Next (arrow right)");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__caption");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__caption__center");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var element0 = dom.childAt(fragment, [4, 7, 7, 1]);
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        var morph1 = dom.createMorphAt(element0,4,5);
        var morph2 = dom.createMorphAt(element0,5,6);
        var morph3 = dom.createMorphAt(element0,6,7);
        var morph4 = dom.createMorphAt(element0,7,8);
        content(env, morph0, context, "yield");
        block(env, morph1, context, "unless", [get(env, context, "options.hideClose")], {}, child0, null);
        block(env, morph2, context, "unless", [get(env, context, "options.hideShare")], {}, child1, null);
        block(env, morph3, context, "unless", [get(env, context, "options.hideToggleFullScreen")], {}, child2, null);
        block(env, morph4, context, "unless", [get(env, context, "options.hideZoomInOut")], {}, child3, null);
        return fragment;
      }
    };
  }()));

});
define('final/templates/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","top-border-div");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","login");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","login-form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("fieldset");
        dom.setAttribute(el4,"class","login-fieldset");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h1");
        dom.setAttribute(el5,"class","login-header");
        var el6 = dom.createTextNode("Login");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        var el6 = dom.createTextNode("Don't have an account? ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5,"type","submit");
        dom.setAttribute(el5,"value","Login");
        dom.setAttribute(el5,"class","login-button");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, inline = hooks.inline, get = hooks.get, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 3, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element1, [3]),0,-1);
        var morph1 = dom.createMorphAt(element1,4,5);
        var morph2 = dom.createMorphAt(element1,5,6);
        var morph3 = dom.createMorphAt(dom.childAt(element1, [9]),-1,-1);
        var morph4 = dom.createMorphAt(fragment,1,2,contextualElement);
        element(env, element0, context, "action", ["authenticate"], {"on": "submit"});
        inline(env, morph0, context, "link-to", ["Create One Here", "register"], {});
        inline(env, morph1, context, "input", [], {"class": "login-email login-field inputters", "value": get(env, context, "identification"), "type": "text", "placeholder": "Username"});
        inline(env, morph2, context, "input", [], {"type": "password", "class": "login-password login-field inputters", "value": get(env, context, "password"), "placeholder": "Password"});
        inline(env, morph3, context, "link-to", ["Forgot Your Password?", "welcome"], {});
        content(env, morph4, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/register', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","top-border-div");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","registration");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","register-form");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("fieldset");
        dom.setAttribute(el4,"class","reg-fieldset");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h1");
        dom.setAttribute(el5,"class","reg-header");
        var el6 = dom.createTextNode("Register For Free Account!");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5,"type","submit");
        dom.setAttribute(el5,"value","Create Account");
        dom.setAttribute(el5,"class","register-button");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("* Visitors are restricted to non-premium features");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 3, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(element1,2,3);
        var morph1 = dom.createMorphAt(element1,4,5);
        var morph2 = dom.createMorphAt(element1,6,7);
        var morph3 = dom.createMorphAt(element1,8,9);
        var morph4 = dom.createMorphAt(element1,10,11);
        var morph5 = dom.createMorphAt(dom.childAt(element1, [16]),-1,-1);
        var morph6 = dom.createMorphAt(fragment,1,2,contextualElement);
        element(env, element0, context, "action", ["saveUser"], {"on": "submit"});
        inline(env, morph0, context, "input", [], {"class": "reg-field r1 first-name inputters", "value": get(env, context, "firstName"), "placeholder": "First Name"});
        inline(env, morph1, context, "input", [], {"class": "reg-field r2 last-name inputters", "value": get(env, context, "lastName"), "placeholder": "Last Name"});
        inline(env, morph2, context, "input", [], {"class": "reg-field r1 email inputters", "value": get(env, context, "email"), "placeholder": "Email Address"});
        inline(env, morph3, context, "input", [], {"class": "reg-field r2 username inputters", "value": get(env, context, "username"), "placeholder": "Username"});
        inline(env, morph4, context, "input", [], {"type": "password", "class": "reg-field r1 password inputters", "value": get(env, context, "password"), "placeholder": "Password"});
        inline(env, morph5, context, "link-to", ["* Continue As Visitor", "welcome"], {});
        content(env, morph6, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/dashboard', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","navbar-form navbar-left");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("header");
        dom.setAttribute(el1,"class","tabs-header");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("View-1");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","home-base");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","left-content-wrapper");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("hello hello hello ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Lorem ipsum dolor sit amet, cons");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","right-content-wrapper");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","accordian");
        var el4 = dom.createTextNode("\n                ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","tabs");
        dom.setAttribute(el4,"id","tab-1");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","accordian-control");
        var el6 = dom.createTextNode("EXECUTE");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","tab-items");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","tabs");
        dom.setAttribute(el4,"id","tab-2");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","accordian-control");
        var el6 = dom.createTextNode("EXECUTE");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","tab-items");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","tabs");
        dom.setAttribute(el4,"id","tab-3");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","accordian-control");
        var el6 = dom.createTextNode("EXECUTE");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","tab-items");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n              ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n              ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3,"id","title");
        var el4 = dom.createTextNode("My Map Component");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n              ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis deserunt sed, ipsa excepturi totam ex. Incidunt aut totam culpa a, ipsam, dolorum quas non veniam expedita, pariatur cum modi nihil?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","tab-foot");
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","foot-list");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","footer-item");
        dom.setAttribute(el4,"id","sv1");
        var el5 = dom.createTextNode("segue-view");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","footer-item");
        dom.setAttribute(el4,"id","sv2");
        var el5 = dom.createTextNode("segue-view");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","footer-item");
        dom.setAttribute(el4,"id","sv3");
        var el5 = dom.createTextNode("segue-view");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","footer2");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, element = hooks.element, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(fragment, [6]);
        var element2 = dom.childAt(element1, [5, 1]);
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        var morph1 = dom.createMorphAt(element0,0,1);
        var morph2 = dom.createMorphAt(dom.childAt(element1, [3]),4,5);
        var morph3 = dom.createMorphAt(element2,2,3);
        var morph4 = dom.createMorphAt(element2,3,4);
        var morph5 = dom.createMorphAt(element2,4,5);
        content(env, morph0, context, "outlet");
        element(env, element0, context, "action", ["search"], {"on": "submit"});
        inline(env, morph1, context, "input", [], {"type": "text", "class": "form-control col-lg-8", "placeholder": "Search", "value": get(env, context, "searchTerm")});
        inline(env, morph2, context, "input", [], {"type": "datetime-local", "value": "2015-01-01T12:00"});
        inline(env, morph3, context, "fa-icon", ["life-ring"], {});
        inline(env, morph4, context, "fa-icon", ["fa-signal"], {});
        inline(env, morph5, context, "fa-icon", ["fa-moon-o"], {});
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/forum', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1,"class","media-list");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-1.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/backflip.png");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/backflip.png");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-2.1");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/deep-sea-charter-fishing.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/deep-sea-charter-fishing.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-2.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/sky.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/sky.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-3.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/marlin.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/marlin.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-4.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/fighting-dolphin.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/fighting-dolphin.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-5.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/fishon.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/fishon.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-5.3");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/mackeral.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/mackeral.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-6.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/snagged.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/snagged.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-7.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/bigtuna.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/bigtuna.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-8.1");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/7.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/7.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-8.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/blackmarlin.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/blackmarlin.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/runningout.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/runningout.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/blue-running.png");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/blue-running.png");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/burnin.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/burnin.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/blue-trolling.png");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/blue-trolling.png");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/deep-sea-charter-fishing.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/deep-sea-charter-fishing.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/deep-sea-fishing.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/deep-sea-fishing.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/from-above.png");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/from-above.png");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/sport-fish.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/sport-fish.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/jumping-sailfish.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/jumping-sailfish.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/marina.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/marina.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/marlin-breach.png");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/marlin-breach.png");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/pacific-sailfish.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/pacific-sailfish.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/reel-while-running.png");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/reel-while-running.png");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/sick.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/sick.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/teasers.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/teasers.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/killer.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/killer.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/blue.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/blue.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/miami.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/miami.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2,"class","media-icons icon-9.2");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","/assets/img/humdinger.jpg");
          dom.setAttribute(el3,"data-width","250");
          dom.setAttribute(el3,"data-height","250");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4,"src","/assets/img/humdinger.jpg");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n\n\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","forum-wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","top-border-div");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"class","media-room-header");
        dom.setAttribute(el2,"contenteditable","");
        var el3 = dom.createTextNode("Media Room");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","photo-gallery");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" <div class=\"media-boxes box-1\"></div>\n<div class=\"media-boxes box-2\"></div>\n<div class=\"media-boxes box-3\"></div>\n<div class=\"media-boxes box-4\"></div>\n<div class=\"media-boxes box-5\"></div>\n<div class=\"media-boxes box-6\"></div>\n<div class=\"media-boxes box-7\"></div>\n<div class=\"media-boxes box-8\"></div>\n<div class=\"media-boxes box-9\"></div> ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 5]),0,1);
        var morph1 = dom.createMorphAt(fragment,1,2,contextualElement);
        block(env, morph0, context, "photo-swipe", [], {}, child0, null);
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1,"href","javascript:void(0)");
          var el2 = dom.createTextNode("Logout");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "action", ["invalidateSession"], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createTextNode("Login");
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
          block(env, morph0, context, "link-to", ["login"], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0,2]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        var morph1 = dom.createMorphAt(fragment,1,2,contextualElement);
        content(env, morph0, context, "outlet");
        block(env, morph1, context, "if", [get(env, context, "session.isAuthenticated")], {}, child0, child1);
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","mask");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","loader");
        dom.setAttribute(el2,"class","rotating");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,1,2,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/species-ref', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","top-border-div");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","background-image");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","species-wrapper");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"contenteditable","");
        dom.setAttribute(el3,"style","text-shadow: rgb(204, 204, 204) 0px 1px 0px, rgb(201, 201, 201) 0px 2px 0px, rgb(187, 187, 187) 0px 3px 0px, rgb(185, 185, 185) 0px 4px 0px, rgb(170, 170, 170) 0px 5px 0px, rgba(0, 0, 0, 0.0980392) 0px 6px 1px, rgba(0, 0, 0, 0.0980392) 0px 0px 5px, rgba(0, 0, 0, 0.298039) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 3px 5px, rgba(0, 0, 0, 0.247059) 0px 5px 10px, rgba(0, 0, 0, 0.2) 0px 10px 10px, rgba(0, 0, 0, 0.14902) 0px 30px 30px;");
        var el4 = dom.createTextNode("Game Fish Charts");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","logo-list");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" <li class=\"chart chart-1\"><img src=\"/assets/img/species-1.png\"></li> ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" <li class=\"chart chart-2\"><img src=\"/assets/img/chart-3.jpg\"></li>\n        <li class=\"chart chart-3\"><img src=\"/assets/img/species-2.jpg\"></li> ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","chart chart-4");
        var el5 = dom.createElement("img");
        dom.setAttribute(el5,"src","/assets/img/marlinchart.jpg");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","background-image-2");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-2");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/600x790.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/620x800.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-3");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/675x765.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/665x730.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-4");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/615x725.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/660x740.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-5");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/630x770.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/650x760.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-6");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/635x780.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/640x780.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-7");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/680x780.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/660x755.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-8");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/645x750.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/660x580.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-9");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/625x740.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/695x740.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-10");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msl");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/620x565.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msr");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/660x765.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","species-list-11");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","marine-species msx");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/species/615x740.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,6,7,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/weather-radar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","weather-radar-wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","top-border-div");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","weather-wrapper");
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","weather-room-header");
        dom.setAttribute(el3,"contenteditable","");
        dom.setAttribute(el3,"style","text-align: center; font-size: 64px; color: #000; text-shadow: rgb(204, 204, 204) 0px 1px 0px, rgb(201, 201, 201) 0px 2px 0px, rgb(187, 187, 187) 0px 3px 0px, rgb(185, 185, 185) 0px 4px 0px, rgb(170, 170, 170) 0px 5px 0px, rgba(0, 0, 0, 0.0980392) 0px 6px 1px, rgba(0, 0, 0, 0.0980392) 0px 0px 5px, rgba(0, 0, 0, 0.298039) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 3px 5px, rgba(0, 0, 0, 0.247059) 0px 5px 10px, rgba(0, 0, 0, 0.2) 0px 10px 10px, rgba(0, 0, 0, 0.14902) 0px 20px 20px;");
        var el4 = dom.createTextNode("Weather Room");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","weather-box");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","weather-radar-container");
        var el5 = dom.createElement("img");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" WEATHER-BOX DIV ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","weather-box-data");
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5,"class","location");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6,"class","location-stats");
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Location: ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6,"class","location-stats");
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Latitude: ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6,"class","location-stats");
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Longitude: ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5,"class","date-statistics");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6,"class","date-stats");
        var el7 = dom.createElement("p");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6,"class","date-stats");
        var el7 = dom.createElement("p");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4,"class","weather-data-form");
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("fieldset");
        dom.setAttribute(el5,"class","weather-fieldset");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Temperature: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Feels Like: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Weather: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("High: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Low: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Wind Direction: ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Visibility (Miles): ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("Wind Gusts: ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <label class=\"weather-stats\"></label> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("fieldset");
        dom.setAttribute(el5,"class","forecast");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode(" - ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode(" - ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode(" * ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode(" - ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <label class=\"weather-stats\">{{model.data.forecast.simpleforecast.forecastday.[4].date.weekday}} - </label> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <label class=\"weather-stats\">{{model.data.forecast.simpleforecast.forecastday.[4].date.pretty}} * </label> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <label class=\"weather-stats\"></label> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("fieldset");
        dom.setAttribute(el5,"class","search");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","weather-stats");
        var el7 = dom.createTextNode("SEARCH OTHER LOCATIONS:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("input");
        dom.setAttribute(el6,"class","search-field");
        dom.setAttribute(el6,"type","search");
        dom.setAttribute(el6,"placeholder","Enter location...");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" WEATHER-BOX-DATA DIV ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","wu-credit");
        var el4 = dom.createTextNode("POWERED BY");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/img/wu-s.png");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","weather");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 3, 3]);
        var element1 = dom.childAt(element0, [1, 0]);
        var element2 = dom.childAt(element0, [5]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3]);
        var element5 = dom.childAt(element0, [7]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element5, [3]);
        var morph0 = dom.createMorphAt(dom.childAt(element3, [1, 0]),0,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element3, [3, 0]),0,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element3, [5, 0]),0,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element4, [1, 0]),-1,-1);
        var morph4 = dom.createMorphAt(dom.childAt(element4, [3, 0]),-1,-1);
        var morph5 = dom.createMorphAt(dom.childAt(element6, [1]),0,1);
        var morph6 = dom.createMorphAt(dom.childAt(element6, [3]),0,1);
        var morph7 = dom.createMorphAt(dom.childAt(element6, [5]),0,1);
        var morph8 = dom.createMorphAt(dom.childAt(element6, [7]),0,1);
        var morph9 = dom.createMorphAt(dom.childAt(element6, [9]),0,1);
        var morph10 = dom.createMorphAt(dom.childAt(element6, [11]),0,1);
        var morph11 = dom.createMorphAt(dom.childAt(element6, [13]),0,1);
        var morph12 = dom.createMorphAt(dom.childAt(element6, [15]),0,-1);
        var morph13 = dom.createMorphAt(dom.childAt(element7, [1]),-1,0);
        var morph14 = dom.createMorphAt(dom.childAt(element7, [3]),-1,0);
        var morph15 = dom.createMorphAt(dom.childAt(element7, [5]),-1,0);
        var morph16 = dom.createMorphAt(dom.childAt(element7, [7]),-1,0);
        var morph17 = dom.createMorphAt(dom.childAt(element7, [9]),-1,0);
        var morph18 = dom.createMorphAt(dom.childAt(element7, [11]),-1,-1);
        var morph19 = dom.createMorphAt(fragment,1,2,contextualElement);
        element(env, element1, context, "bind-attr", [], {"src": get(env, context, "model.radar.radarUrl")});
        content(env, morph0, context, "model.data.current_observation.display_location.full");
        content(env, morph1, context, "model.data.current_observation.display_location.latitude");
        content(env, morph2, context, "model.data.current_observation.display_location.longitude");
        content(env, morph3, context, "model.data.forecast.simpleforecast.forecastday.0.date.weekday");
        content(env, morph4, context, "model.data.forecast.simpleforecast.forecastday.0.date.pretty");
        content(env, morph5, context, "model.data.current_observation.temperature_string");
        content(env, morph6, context, "model.data.current_observation.feelslike_string");
        content(env, morph7, context, "model.data.current_observation.weather");
        content(env, morph8, context, "model.data.forecast.simpleforecast.forecastday.0.high.fahrenheit");
        content(env, morph9, context, "model.data.forecast.simpleforecast.forecastday.0.low.fahrenheit");
        content(env, morph10, context, "model.data.current_observation.wind_dir");
        content(env, morph11, context, "model.data.current_observation.visibility_mi");
        content(env, morph12, context, "model.data.current_observation.wind_string");
        content(env, morph13, context, "model.data.forecast.simpleforecast.forecastday.1.date.weekday");
        content(env, morph14, context, "model.data.forecast.simpleforecast.forecastday.1.date.pretty");
        content(env, morph15, context, "model.data.forecast.simpleforecast.forecastday.2.date.weekday");
        content(env, morph16, context, "model.data.forecast.simpleforecast.forecastday.2.date.pretty");
        content(env, morph17, context, "model.data.forecast.simpleforecast.forecastday.3.date.weekday");
        content(env, morph18, context, "model.data.forecast.simpleforecast.forecastday.3.date.pretty");
        content(env, morph19, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/show', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        if (this.cachedFragment) { dom.repairClonedNode(fragment,[0]); }
        var morph0 = dom.createMorphAt(fragment,0,1,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/templates/welcome', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","welcome-wrapper");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","main-index-top");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("Angler's Hook");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("The 'One-Stop' ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("for avid anglers and sportfishing enthusiasts");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","welcome-buttons");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","main-index-bottom");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 1, 5]);
        var morph0 = dom.createMorphAt(element0,0,1);
        var morph1 = dom.createMorphAt(element0,1,2);
        var morph2 = dom.createMorphAt(fragment,1,2,contextualElement);
        inline(env, morph0, context, "input", [], {"class": "welcomer wlogin", "value": get(env, context, "login"), "placeholder": "Login"});
        inline(env, morph1, context, "input", [], {"class": "welcomer wregister", "value": get(env, context, "reguster"), "placeholder": "Create An Account"});
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/tests/adapters/user.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/user.js should pass jshint', function() { 
    ok(false, 'adapters/user.js should pass jshint.\nadapters/user.js: line 15, col 23, \'name\' is defined but never used.\n\n1 error'); 
  });

});
define('final/tests/adapters/weather-data.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/weather-data.js should pass jshint', function() { 
    ok(false, 'adapters/weather-data.js should pass jshint.\nadapters/weather-data.js: line 5, col 29, \'query\' is defined but never used.\nadapters/weather-data.js: line 5, col 23, \'name\' is defined but never used.\n\n2 errors'); 
  });

});
define('final/tests/adapters/weather-radar.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/weather-radar.js should pass jshint', function() { 
    ok(false, 'adapters/weather-radar.js should pass jshint.\nadapters/weather-radar.js: line 1, col 8, \'ajax\' is defined but never used.\n\n1 error'); 
  });

});
define('final/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('final/tests/authenticators/parse-email.jshint', function () {

  'use strict';

  module('JSHint - authenticators');
  test('authenticators/parse-email.js should pass jshint', function() { 
    ok(true, 'authenticators/parse-email.js should pass jshint.'); 
  });

});
define('final/tests/authorizers/parse.jshint', function () {

  'use strict';

  module('JSHint - authorizers');
  test('authorizers/parse.js should pass jshint', function() { 
    ok(true, 'authorizers/parse.js should pass jshint.'); 
  });

});
define('final/tests/components/google-map.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/google-map.js should pass jshint', function() { 
    ok(true, 'components/google-map.js should pass jshint.'); 
  });

});
define('final/tests/controllers/login.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/login.js should pass jshint', function() { 
    ok(true, 'controllers/login.js should pass jshint.'); 
  });

});
define('final/tests/controllers/register.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/register.js should pass jshint', function() { 
    ok(true, 'controllers/register.js should pass jshint.'); 
  });

});
define('final/tests/controllers/segue/weather-radar.jshint', function () {

  'use strict';

  module('JSHint - controllers/segue');
  test('controllers/segue/weather-radar.js should pass jshint', function() { 
    ok(true, 'controllers/segue/weather-radar.js should pass jshint.'); 
  });

});
define('final/tests/controllers/user.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/user.js should pass jshint', function() { 
    ok(true, 'controllers/user.js should pass jshint.'); 
  });

});
define('final/tests/helpers/resolver', ['exports', 'ember/resolver', 'final/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('final/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('final/tests/helpers/start-app', ['exports', 'ember', 'final/app', 'final/router', 'final/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('final/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('final/tests/initializers/current-user.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/current-user.js should pass jshint', function() { 
    ok(true, 'initializers/current-user.js should pass jshint.'); 
  });

});
define('final/tests/models/user.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/user.js should pass jshint', function() { 
    ok(true, 'models/user.js should pass jshint.'); 
  });

});
define('final/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('final/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('final/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('final/tests/routes/login.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/login.js should pass jshint', function() { 
    ok(true, 'routes/login.js should pass jshint.'); 
  });

});
define('final/tests/routes/register.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/register.js should pass jshint', function() { 
    ok(true, 'routes/register.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/forum.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/forum.js should pass jshint', function() { 
    ok(true, 'routes/segue/forum.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/index.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/index.js should pass jshint', function() { 
    ok(true, 'routes/segue/index.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/loading.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/loading.js should pass jshint', function() { 
    ok(true, 'routes/segue/loading.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/species-ref.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/species-ref.js should pass jshint', function() { 
    ok(true, 'routes/segue/species-ref.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/view-one.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/view-one.js should pass jshint', function() { 
    ok(true, 'routes/segue/view-one.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/weather-radar.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/weather-radar.js should pass jshint', function() { 
    ok(true, 'routes/segue/weather-radar.js should pass jshint.'); 
  });

});
define('final/tests/routes/show.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/show.js should pass jshint', function() { 
    ok(true, 'routes/show.js should pass jshint.'); 
  });

});
define('final/tests/routes/welcome.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/welcome.js should pass jshint', function() { 
    ok(true, 'routes/welcome.js should pass jshint.'); 
  });

});
define('final/tests/test-helper', ['final/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('final/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('final/tests/unit/adapters/radar-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:radar", "RadarAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('final/tests/unit/adapters/radar-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/radar-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/radar-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/adapters/weather-data-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:weather-data", "WeatherDataAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('final/tests/unit/adapters/weather-data-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/weather-data-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/weather-data-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/components/google-map-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("google-map", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('final/tests/unit/components/google-map-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/google-map-test.js should pass jshint', function() { 
    ok(true, 'unit/components/google-map-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:application", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/controllers/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/application-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/application-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/controllers/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:login", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/controllers/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/login-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/login-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/controllers/register-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:register", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/controllers/register-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/register-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/register-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/controllers/segue/weather-radar-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:segue/weather-radar", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/controllers/segue/weather-radar-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/segue');
  test('unit/controllers/segue/weather-radar-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/segue/weather-radar-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/controllers/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:user", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/controllers/user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/user-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/user-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("user", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('final/tests/unit/models/user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/user-test.js should pass jshint', function() { 
    ok(true, 'unit/models/user-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:application", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:login", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/login-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/login-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/register-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:register", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/register-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/register-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/register-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/segue/forum-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:segue/forum", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/segue/forum-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/segue');
  test('unit/routes/segue/forum-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/segue/forum-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/segue/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:segue/index", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/segue/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/segue');
  test('unit/routes/segue/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/segue/index-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/segue/species-ref-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:segue/species-ref", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/segue/species-ref-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/segue');
  test('unit/routes/segue/species-ref-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/segue/species-ref-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/segue/weather-radar-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:segue/weather-radar", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/segue/weather-radar-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/segue');
  test('unit/routes/segue/weather-radar-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/segue/weather-radar-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/segue/weather-radar/loading-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:segue/weather-radar/loading", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/segue/weather-radar/loading-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/segue/weather-radar');
  test('unit/routes/segue/weather-radar/loading-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/segue/weather-radar/loading-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/show-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:show", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/show-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/show-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/show-test.js should pass jshint.'); 
  });

});
define('final/tests/unit/routes/welcome-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:welcome", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/welcome-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/welcome-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/welcome-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

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
  require("final/app")["default"].create({"name":"final","version":"0.0.0.89435a4c"});
}

/* jshint ignore:end */
//# sourceMappingURL=final.map