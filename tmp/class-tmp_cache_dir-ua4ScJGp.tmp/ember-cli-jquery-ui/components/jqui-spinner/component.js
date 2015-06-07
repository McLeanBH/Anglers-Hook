define('ember-cli-jquery-ui/components/jqui-spinner/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].TextField.extend(jquiWidget['default'], {
        uiType: 'spinner',
        uiOptions: ['culture', 'disabled', 'incremental', 'max', 'min', 'numberFormat', 'page', 'step'],
        uiEvents: ['change', 'create', 'spin', 'start', 'stop']
    });

});