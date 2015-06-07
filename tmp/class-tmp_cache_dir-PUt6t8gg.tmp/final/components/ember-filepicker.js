define('final/components/ember-filepicker', ['exports', 'ember', 'ember-cli-filepicker/mixins/ember-filepicker'], function (exports, Ember, EmberFilepickerMixin) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend(EmberFilepickerMixin['default']);

});