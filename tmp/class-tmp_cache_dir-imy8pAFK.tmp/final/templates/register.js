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