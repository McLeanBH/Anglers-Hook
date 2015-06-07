define('final/templates/segue/edit-profile', ['exports'], function (exports) {

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
        dom.setAttribute(el1,"class","profile-editor");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2,"id","profile-editor-form");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("fieldset");
        dom.setAttribute(el3,"class","edit-fieldset");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"type","submit");
        dom.setAttribute(el4,"value","Update");
        dom.setAttribute(el4,"class","submit-updates");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
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
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3]);
        var morph0 = dom.createMorphAt(element1,0,1);
        var morph1 = dom.createMorphAt(element1,1,2);
        var morph2 = dom.createMorphAt(element1,2,3);
        var morph3 = dom.createMorphAt(element1,3,4);
        var morph4 = dom.createMorphAt(element1,4,5);
        var morph5 = dom.createMorphAt(element1,5,6);
        var morph6 = dom.createMorphAt(fragment,1,2,contextualElement);
        element(env, element0, context, "action", ["saveProfile"], {"on": "submit"});
        inline(env, morph0, context, "input", [], {"placeholder": "First Name", "value": get(env, context, "session.currentUser.firstName")});
        inline(env, morph1, context, "input", [], {"placeholder": "Last Name", "value": get(env, context, "session.currentUser.lastName")});
        inline(env, morph2, context, "input", [], {"placeholder": "Address", "value": get(env, context, "session.currentUser.address")});
        inline(env, morph3, context, "input", [], {"class": "profile-fields", "value": get(env, context, "city"), "placeholder": "City"});
        inline(env, morph4, context, "input", [], {"class": "profile-fields", "value": get(env, context, "state"), "placeholder": "State"});
        inline(env, morph5, context, "input", [], {"class": "profile-fields", "value": get(env, context, "boatName"), "placeholder": "Boat Name"});
        content(env, morph6, context, "outlet");
        return fragment;
      }
    };
  }()));

});