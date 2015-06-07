export default Ember.HTMLBars.template((function() {
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