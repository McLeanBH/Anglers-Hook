define('final/components/google-map', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    // ( app/components/google-map.js ) //

    exports['default'] = Ember['default'].Component.extend({
        insertMap: (function () {
            var container = this.$(".map-canvas")[0];
            var options = {
                center: new window.google.maps.LatLng(this.get("latitude"), this.get("longitude")),
                zoom: 15
            };
            new window.google.maps.Map(container, options);
        }).on("didInsertElement")
    });

});