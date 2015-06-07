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