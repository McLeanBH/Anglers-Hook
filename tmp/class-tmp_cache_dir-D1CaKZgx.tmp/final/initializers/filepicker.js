define('final/initializers/filepicker', ['exports', 'ember-inject-script'], function (exports, injectScript) {

    'use strict';

    exports['default'] = {
        name: "filepicker",
        initialize: function initialize(container, application) {
            var key = application.filepickerKey,
                url = "//api.filepicker.io/v1/filepicker.js",
                promise = injectScript['default'](url).then(function () {
                filepicker.setKey(key);
                return filepicker;
            });

            application.register("ember-cli-filepicker:api", promise, { instantiate: false });
            application.inject("component:filepicker", "filepicker", "ember-cli-filepicker:api");
        }
    };

});