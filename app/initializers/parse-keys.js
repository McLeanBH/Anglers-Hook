// (app/initializers/parse-keys.js) //

import Ember from "ember";

export function initialize(/* container, application */) {
  Ember.$.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "qBQnGMkwKJIbp3cCVApnMjRBCSezpmu8rSbV7M1I",
      "X-Parse-REST-API-Key": "vyaxQsffU5lNaiG5henoGBTaQ1FcEyzmhFxOeVKK"
    }
  });}

export default {
  name: 'parse-keys',
  initialize: initialize
};
