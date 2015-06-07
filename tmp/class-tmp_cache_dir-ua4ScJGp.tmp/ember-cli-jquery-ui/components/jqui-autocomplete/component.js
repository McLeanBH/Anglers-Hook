define('ember-cli-jquery-ui/components/jqui-autocomplete/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].TextField.extend(jquiWidget['default'], {
        uiType: 'autocomplete',
        uiOptions: ['autofocus', 'delay', 'disabled', 'minLength', 'position', 'source'  ],
        uiEvents: ['close', 'search']
    });

});