define('ember-cli-jquery-ui/components/jqui-progress-bar/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'progressbar',
        uiOptions: ['value', 'max'],
        uiEvents: ['change', 'complete']
    });

});