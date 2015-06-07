import Ember from "ember";
import { weatherIcon } from "ember-cli-weather-icons/helpers/weather-icon";

var initialize = function initialize() {
  Ember.Handlebars.helper("weather-icon", weatherIcon);
  Ember.Handlebars.helper("w-i", weatherIcon);
};

export { initialize as initialize };
export default {
  name: "ember-cli-weather-icon",
  initialize: initialize
};
/* container, app */