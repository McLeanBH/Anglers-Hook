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
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
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
          inline(env, morph0, context, "ember-filepicker", [], {"options": get(env, context, "options"), "onSelection": "fileSelected", "onClose": "closeFilepicker", "onError": "onError"});
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
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1,"class","media-icons icon-2.1");
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"data-width","250");
            dom.setAttribute(el2,"data-height","250");
            var el3 = dom.createElement("img");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, element = hooks.element;
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
            var element0 = dom.childAt(fragment, [1, 0]);
            var element1 = dom.childAt(element0, [0]);
            element(env, element0, context, "bind-attr", [], {"href": get(env, context, "photo.url")});
            element(env, element1, context, "bind-attr", [], {"src": get(env, context, "photo.url")});
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
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1,"class","media-list");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment(" <li class=\"media-icons icon-1.2\"><a href=\"/assets/img/backflip.png\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/backflip.png\"></a></li>\n          <li class=\"media-icons icon-2.1\"><a href=\"/assets/img/deep-sea-charter-fishing.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/deep-sea-charter-fishing.jpg\"></a></li>\n          <li class=\"media-icons icon-2.2\"><a href=\"/assets/img/sky.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/sky.jpg\"></a></li>\n          <li class=\"media-icons icon-3.2\"><a href=\"/assets/img/marlin.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/marlin.jpg\"></a></li>\n          <li class=\"media-icons icon-4.2\"><a href=\"/assets/img/fighting-dolphin.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/fighting-dolphin.jpg\"></a></li>\n          <li class=\"media-icons icon-5.2\"><a href=\"/assets/img/fishon.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/fishon.jpg\"></a></li>\n          <li class=\"media-icons icon-5.3\"><a href=\"/assets/img/mackeral.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/mackeral.jpg\"></a></li>\n          <li class=\"media-icons icon-6.2\"><a href=\"/assets/img/snagged.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/snagged.jpg\"></a></li>\n          <li class=\"media-icons icon-7.2\"><a href=\"/assets/img/bigtuna.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/bigtuna.jpg\"></a></li>\n          <li class=\"media-icons icon-8.1\"><a href=\"/assets/img/7.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/7.jpg\"></a></li>\n          <li class=\"media-icons icon-8.2\"><a href=\"/assets/img/blackmarlin.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/blackmarlin.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/runningout.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/runningout.jpg\"></a></li>\n\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/blue-running.png\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/blue-running.png\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/burnin.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/burnin.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/blue-trolling.png\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/blue-trolling.png\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/deep-sea-charter-fishing.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/deep-sea-charter-fishing.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/deep-sea-fishing.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/deep-sea-fishing.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/from-above.png\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/from-above.png\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/sport-fish.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/sport-fish.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/jumping-sailfish.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/jumping-sailfish.jpg\"></a></li>\n\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/marina.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/marina.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/marlin-breach.png\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/marlin-breach.png\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/pacific-sailfish.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/pacific-sailfish.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/reel-while-running.png\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/reel-while-running.png\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/sick.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/sick.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/teasers.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/teasers.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/killer.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/killer.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/blue.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/blue.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/miami.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/miami.jpg\"></a></li>\n          <li class=\"media-icons icon-9.2\"><a href=\"/assets/img/humdinger.jpg\" data-width=\"250\" data-height=\"250\"><img src=\"/assets/img/humdinger.jpg\"></a></li> ");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
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
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,1);
          block(env, morph0, context, "each", [get(env, context, "model")], {"keyword": "photo"}, child0, null);
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
        var el2 = dom.createTextNode("\n\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","photo-uploader");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("Upload Photo");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
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
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, element = hooks.element, content = hooks.content;
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
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [5]);
        var element4 = dom.childAt(element3, [2]);
        var morph0 = dom.createMorphAt(element3,0,1);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [7]),0,1);
        var morph2 = dom.createMorphAt(fragment,1,2,contextualElement);
        block(env, morph0, context, "if", [get(env, context, "shouldShowFilepicker")], {}, child0, null);
        element(env, element4, context, "action", ["openFilepicker"], {});
        block(env, morph1, context, "photo-swipe", [], {}, child1, null);
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});