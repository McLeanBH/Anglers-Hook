define('ember-cli-filepicker/mixins/ember-filepicker', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Mixin.create({
		handleSelection: function(data) {
			if (this.get('onSelection')) {
				this.sendAction('onSelection', data);
			}
			
		},
		handleError: function(data) {
			if (data.code === 101 && this.get('onClose')) {
				this.sendAction('onClose');
			} 
			else if (this.get('onError')) {
				this.sendAction('onError', data);
			}
			
		},
		onSelection: null,
		onError: null,
		onClose: null,
		options : {},

		show: function() {
			window.filepicker.pick(
				this.get('options'),
				this.handleSelection.bind(this),
				this.handleError.bind(this)
			);
		}.on('didInsertElement')
	});

});