define('ember-cli-jquery-ui/components/jqui-tabs/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend(jquiWidget['default'], {
        uiType: 'tabs',
        uiOptions: ['active', 'collapsible', 'disabled', 'event', 'heightStyle', 'hide', 'show'],
        uiEvents: ['activate', 'beforeActivate', 'beforeLoad', 'create', 'load'],

        uiActions: {
            // Hacky workaround for bug in JQuery UI Tabs _isLocal method
            // Source: http://stackoverflow.com/questions/13837304/jquery-ui-non-ajax-tab-loading-whole-website-into-itself
            create: function(event){
                var $ = Ember['default'].$;
                var tabsData = $(event.target).data('ui-tabs');
                tabsData.anchors.each(function(idx, anchor){
                    var contentId = $(anchor).attr('href');
                    var $panel = $(tabsData.panels[idx]);
                    $panel.html($(contentId).remove().html());
                });
            },
            beforeLoad: function(event){
                event.preventDefault();
            }
        }
    });

});