define('ember-cli-jquery-ui/components/jqui-menu/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'menu',
        uiOptions: ['disabled'],
        uiEvents: ['blur', 'create', 'focus', 'select']
    });

});