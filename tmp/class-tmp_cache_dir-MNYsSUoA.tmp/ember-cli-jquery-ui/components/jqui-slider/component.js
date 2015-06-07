define('ember-cli-jquery-ui/components/jqui-slider/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'slider',
        uiOptions: ['animate', 'disabled', 'max', 'min', 'orientation', 'range', 'step', 'value', 'values'  ],
        uiEvents: ['change', 'create', 'slide', 'start', 'stop'],
        uiActions: {
            slide: function(event, ui) {
                this.set('value', ui.value);
                this.set('values', ui.values);
            }
        }
    });

});