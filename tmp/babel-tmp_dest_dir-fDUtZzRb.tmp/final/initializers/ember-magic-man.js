

export { initialize as initialize };

import Store from "ember-magic-man/store";
function initialize(container, application) {
  application.register("store:main", Store);

  application.inject("route", "store", "store:main");
  application.inject("controller", "store", "store:main");
  application.inject("model", "store", "store:main");
}

export default {
  name: "ember-magic-man",
  initialize: initialize
};