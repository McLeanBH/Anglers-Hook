define('ember-cli-jquery-ui/components/jqui-button/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'button',
        uiOptions: ['disabled'],
        uiEvents: [],
        tagName: 'button',
        disabled: false,
        icon: "",

        didInsertElement: function() {
            var _this = this;
            Ember['default'].run.next(function() {
                _this.$().button("option", "icons", {
                    primary: _this.get('icon')
                });
            });
        },

        click: function() {
            this.sendAction();
        }
    });

});