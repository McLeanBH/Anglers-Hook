define('ember-cli-jquery-ui/components/jqui-datepicker/component', ['exports', 'ember', 'ember-cli-jquery-ui/mixins/jqui-widget'], function (exports, Ember, jquiWidget) {

  'use strict';

  exports['default'] = Ember['default'].TextField.extend(jquiWidget['default'], {
    uiType: 'datepicker',
    uiOptions: ["altField", "altFormat", "appendText", "autoSize",
      "beforeShow", "beforeShowDay", "buttonImage", "buttonImageOnly",
      "buttonText", "calculateWeek", "changeMonth", "changeYear", "closeText",
      "constrainInput", "currentText", "dateFormat", "dayNames", "dayNamesMin",
      "dayNamesShort", "defaultDate", "duration", "firstDay", "gotoCurrent",
      "hideIfNoPrevNext", "isRTL", "maxDate", "minDate", "monthNames",
      "monthNamesShort", "navigationAsDateFormat", "nextText", "numberOfMonths",
      "onChangeMonthYear", "onClose", "onSelect", "prevText",
      "selectOtherMonths", "shortYearCutoff", "showAnim", "showButtonPanel",
      "showCurrentAtPos", "showMonthAfterYear", "showOn", "showOptions",
      "showOtherMonths", "showWeek", "stepMonths", "weekHeader", "yearRange",
      "yearSuffix"],
    uiEvents: ['onChangeMonthYear', 'onClose', 'onSelect']
  });

});