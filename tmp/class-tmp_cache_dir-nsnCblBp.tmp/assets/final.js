/* jshint ignore:start */

/* jshint ignore:end */

define('final/adapters/user', ['exports', 'ic-ajax', 'ember'], function (exports, ajax, Ember) {

  'use strict';

  // app/adapters/users.js //

  exports['default'] = Ember['default'].Object.extend({
    find: function find(name, id) {
      return ajax['default']("https://api.parse.com/1/users" + id).then(function (user) {
        user.id = user.objectId;
        delete user.objectId;
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
          data: JSON.stringify(record)
        }).then(function (response) {
          response.id = response.ObjectId;
          delete response.objectId;
          return response;
        });
      } else {
        return ajax['default']({
          url: "https://api.parse.com/1/users",
          type: "POST",
          data: JSON.stringify(record)
        }).then(function (response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      }
    }
  });

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
define('final/controllers/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.login.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      login: function login() {
        var loginData = this.getProperties("email", "password");
        console.log(loginData);
      }
    }
  });

});
define('final/controllers/register', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.register.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      saveUser: function saveUser() {
        var userData = this.getProperties("firstName", "lastName", "email", "username", "password");
        this.store.save("user", userData);
      }
    }
  });

});
define('final/controllers/user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  // (app.contollers.user.js) //

  exports['default'] = Ember['default'].Controller.extend({
    actions: {}
  });

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
define('final/initializers/parse-tokens', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    Ember['default'].$.ajaxSetup({
      headers: {
        "X-Parse-Application-Id": "qBQnGMkwKJIbp3cCVApnMjRBCSezpmu8rSbV7M1I",
        "X-Parse-REST-API-Key": "vyaxQsffU5lNaiG5henoGBTaQ1FcEyzmhFxOeVKK"
      }
    });
  }

  exports['default'] = {
    name: "parse-tokens",
    initialize: initialize
  };
  /* container, application */

});
define('final/initializers/store-service', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  // (app/initializers/store-service.js) //

  function initialize(container, application) {
    application.inject("route", "store", "service:store");
    application.inject("controller", "store", "service:store");
  }

  exports['default'] = {
    name: "store-service",
    initialize: initialize
  };

});
define('final/models/identity-map', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    init: function init() {
      this._map = Ember['default'].Object.create();
    },

    get: function get(type, id) {
      var typeArray = this._getType(type);
      if (id) {
        /* SINGLE RECORD */
        return typeArray.findBy("__jsim_meta_id", id);
      } else {
        /* ALL RECORDS */
        return typeArray;
      }
    },

    set: function set(type, id, record) {
      var typeArray = this._getType(type);
      var cached = typeArray.findBy("__jsim_meta_id", id);
      if (cached) {
        cached.setProperties(record);
      } else {
        var v = record instanceof Ember['default'].Object ? record : Ember['default'].Object.create(record);
        v.__jsim_meta_id = id;
        typeArray.addObject(v);
      }
    },

    remove: function remove(type, record) {
      var typeArray = this._getType(type);
      if (typeof record !== "object") {
        // assume it's an id
        record = typeArray.findBy("__jsim_meta_id", record);
      }
      typeArray.removeObject(record);
    },

    clear: function clear(type) {
      var typeArray = this._getType(type);
      typeArray.splice(0, typeArray.length);
    },

    _getType: function _getType(type) {
      var typeArray = this._map.get(type);
      if (!typeArray) {
        this._map.set(type, Ember['default'].A());
        typeArray = this._map.get(type);
      }
      return typeArray;
    }
  });

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
      this.route("view-one");
    });
  });

  exports['default'] = Router;

});
define('final/routes/login', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/register', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/segue/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/segue/view-one', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/routes/welcome', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('final/services/store', ['exports', 'ember', 'final/models/identity-map'], function (exports, Ember, IdentityMap) {

  'use strict';

  var identityMap = IdentityMap['default'].create();

  exports['default'] = Ember['default'].Object.extend({
    find: function find(name, id) {

      var cached = identityMap.get(name, id);
      if (cached) {
        return Ember['default'].RSVP.resolve(cached);
      }

      var adapter = this.container.lookup("adapter:" + name);
      return adapter.find(name, id).then(function (record) {
        identityMap.set(name, id, record);
        return record;
      });
    },

    findAll: function findAll(name) {
      var adapter = this.container.lookup("adapter:" + name);
      return adapter.findAll(name).then(function (records) {
        identityMap.clear(name);
        records.forEach(function (r) {
          identityMap.set(name, r.id, r);
        });

        return identityMap.get(name);
      });
    },

    destroy: function destroy(name, record) {
      var adapter = this.container.lookup("adapter:" + name);
      return adapter.destroy(name, record).then(function () {
        identityMap.remove(name, record);
      });
    },

    save: function save(name, record) {
      var adapter = this.container.lookup("adapter:" + name);
      return adapter.save(name, record).then(function () {
        identityMap.set(name, record.id, record);
        return record;
      });
    }
  });

});
define('final/templates/application', ['exports'], function (exports) {

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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","footer");
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
        dom.setAttribute(el2,"class","nav-left");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","index-navbar");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","nav-container");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
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
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, element = hooks.element, get = hooks.get;
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
        var element1 = dom.childAt(element0, [3, 1, 1]);
        var element2 = dom.childAt(element0, [5, 1]);
        var element3 = dom.childAt(element2, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element1, [1]),-1,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element1, [3]),-1,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element1, [5]),-1,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element1, [7]),-1,-1);
        var morph4 = dom.createMorphAt(dom.childAt(element3, [3]),0,-1);
        var morph5 = dom.createMorphAt(element3,4,5);
        var morph6 = dom.createMorphAt(element3,5,6);
        inline(env, morph0, context, "link-to", ["Home", "welcome"], {});
        inline(env, morph1, context, "link-to", ["Register", "register"], {});
        inline(env, morph2, context, "link-to", ["Login", "login"], {});
        inline(env, morph3, context, "link-to", ["View-1", "segue.view-one"], {});
        element(env, element2, context, "action", ["login"], {"on": "submit"});
        inline(env, morph4, context, "link-to", ["Create One Here", "register"], {});
        inline(env, morph5, context, "input", [], {"class": "login-email login-field inputters", "value": get(env, context, "email"), "placeholder": "Email Address"});
        inline(env, morph6, context, "input", [], {"type": "password", "class": "login-password login-field inputters", "value": get(env, context, "password"), "placeholder": "Password"});
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
        dom.setAttribute(el2,"class","nav-left");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","index-navbar");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","nav-container");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
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
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","registration");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","register-form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("fieldset");
        dom.setAttribute(el4,"class","reg-fieldset");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h1");
        dom.setAttribute(el5,"class","reg-header");
        var el6 = dom.createTextNode("Register For Free Account!");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5,"type","submit");
        dom.setAttribute(el5,"value","Create Account");
        dom.setAttribute(el5,"class","register-button");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("* Visitors are restricted to non-premium features");
        dom.appendChild(el5, el6);
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
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, element = hooks.element, get = hooks.get;
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
        var element1 = dom.childAt(element0, [3, 1, 1]);
        var element2 = dom.childAt(element0, [5, 1]);
        var element3 = dom.childAt(element2, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element1, [1]),-1,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element1, [3]),-1,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element1, [5]),-1,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element1, [7]),-1,-1);
        var morph4 = dom.createMorphAt(element3,2,3);
        var morph5 = dom.createMorphAt(element3,4,5);
        var morph6 = dom.createMorphAt(element3,6,7);
        var morph7 = dom.createMorphAt(element3,8,9);
        var morph8 = dom.createMorphAt(element3,10,11);
        var morph9 = dom.createMorphAt(dom.childAt(element3, [16]),-1,-1);
        inline(env, morph0, context, "link-to", ["Home", "welcome"], {});
        inline(env, morph1, context, "link-to", ["Register", "register"], {});
        inline(env, morph2, context, "link-to", ["Login", "login"], {});
        inline(env, morph3, context, "link-to", ["View-1", "segue.view-one"], {});
        element(env, element2, context, "action", ["saveUser"], {"on": "submit"});
        inline(env, morph4, context, "input", [], {"class": "reg-field r1 first-name inputters", "value": get(env, context, "firstName"), "placeholder": "First Name"});
        inline(env, morph5, context, "input", [], {"class": "reg-field r2 last-name inputters", "value": get(env, context, "lastName"), "placeholder": "Last Name"});
        inline(env, morph6, context, "input", [], {"class": "reg-field r1 email inputters", "value": get(env, context, "email"), "placeholder": "Email Address"});
        inline(env, morph7, context, "input", [], {"class": "reg-field r2 username inputters", "value": get(env, context, "username"), "placeholder": "Username"});
        inline(env, morph8, context, "input", [], {"type": "password", "class": "reg-field r1 password inputters", "value": get(env, context, "password"), "placeholder": "Password"});
        inline(env, morph9, context, "link-to", ["* Continue As Visitor", "welcome"], {});
        return fragment;
      }
    };
  }()));

});
define('final/templates/segue/index', ['exports'], function (exports) {

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
define('final/templates/segue/view-one', ['exports'], function (exports) {

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
        dom.setAttribute(el1,"class","index-navbar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav-left");
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
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
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
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","tab-items");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","tabs");
        dom.setAttribute(el4,"id","tab-4");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","accordian-control");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","tab-items");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n              ");
        dom.appendChild(el3, el4);
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
        var el1 = dom.createTextNode("\n\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","footer2");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, content = hooks.content;
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
        var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),-1,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [3]),-1,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element0, [5]),-1,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element0, [7]),-1,-1);
        var morph4 = dom.createMorphAt(fragment,7,8,contextualElement);
        inline(env, morph0, context, "link-to", ["Home", "welcome"], {});
        inline(env, morph1, context, "link-to", ["Register", "register"], {});
        inline(env, morph2, context, "link-to", ["Login", "login"], {});
        inline(env, morph3, context, "link-to", ["View-1", "segue.view-one"], {});
        content(env, morph4, context, "outlet");
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
        dom.setAttribute(el1,"class","index-navbar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","nav-left");
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-index");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, content = hooks.content;
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
        var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),-1,-1);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [3]),-1,-1);
        var morph2 = dom.createMorphAt(dom.childAt(element0, [5]),-1,-1);
        var morph3 = dom.createMorphAt(dom.childAt(element0, [7]),-1,-1);
        var morph4 = dom.createMorphAt(fragment,3,4,contextualElement);
        inline(env, morph0, context, "link-to", ["Home", "welcome"], {});
        inline(env, morph1, context, "link-to", ["Register", "register"], {});
        inline(env, morph2, context, "link-to", ["Login", "login"], {});
        inline(env, morph3, context, "link-to", ["View-1", "segue.view-one"], {});
        content(env, morph4, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('final/tests/adapters/user.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/user.js should pass jshint', function() { 
    ok(false, 'adapters/user.js should pass jshint.\nadapters/user.js: line 15, col 21, \'name\' is defined but never used.\n\n1 error'); 
  });

});
define('final/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
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
define('final/tests/initializers/parse-tokens.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/parse-tokens.js should pass jshint', function() { 
    ok(true, 'initializers/parse-tokens.js should pass jshint.'); 
  });

});
define('final/tests/initializers/store-service.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/store-service.js should pass jshint', function() { 
    ok(true, 'initializers/store-service.js should pass jshint.'); 
  });

});
define('final/tests/models/identity-map.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/identity-map.js should pass jshint', function() { 
    ok(true, 'models/identity-map.js should pass jshint.'); 
  });

});
define('final/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
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
define('final/tests/routes/segue/index.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/index.js should pass jshint', function() { 
    ok(true, 'routes/segue/index.js should pass jshint.'); 
  });

});
define('final/tests/routes/segue/view-one.jshint', function () {

  'use strict';

  module('JSHint - routes/segue');
  test('routes/segue/view-one.js should pass jshint', function() { 
    ok(true, 'routes/segue/view-one.js should pass jshint.'); 
  });

});
define('final/tests/routes/welcome.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/welcome.js should pass jshint', function() { 
    ok(true, 'routes/welcome.js should pass jshint.'); 
  });

});
define('final/tests/services/store.jshint', function () {

  'use strict';

  module('JSHint - services');
  test('services/store.js should pass jshint', function() { 
    ok(true, 'services/store.js should pass jshint.'); 
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
define('final/tests/unit/routes/segue/view-one-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:segue/view-one", {});

  ember_qunit.test("it exists", function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('final/tests/unit/routes/segue/view-one-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/segue');
  test('unit/routes/segue/view-one-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/segue/view-one-test.js should pass jshint.'); 
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
define('final/tests/unit/services/store-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("service:store", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function (assert) {
    var service = this.subject();
    assert.ok(service);
  });

  // Specify the other units that are required for this test.
  // needs: ['service:foo']

});
define('final/tests/unit/services/store-test.jshint', function () {

  'use strict';

  module('JSHint - unit/services');
  test('unit/services/store-test.js should pass jshint', function() { 
    ok(true, 'unit/services/store-test.js should pass jshint.'); 
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
  require("final/app")["default"].create({"name":"final","version":"0.0.0.09c1dfc3"});
}

/* jshint ignore:end */
//# sourceMappingURL=final.map