/*!
 * Item Selector Widget
 * https://github.com/mimaison/jQueryUI-Item-Selector
 *
 * Depends on:
 *	jquery.ui.accordion.js
 */
(function($) {
'use strict';
$.widget('mm.itemselector', {
	version: '1.0.3',

	options: {
		items: [],
		selected: [],
		callback: $.noop
	},

	_create: function() {
		var self = this;
		var items = this.options.items;
		for (var i = 0; i < items.length; i++) {
			$('<h3>' + items[i][0] + '</h3>').appendTo(this.element);
			var div = $('<div>').appendTo(this.element);
			for (var j = 0; j < items[i][1].length; j++) {
				var html = $('<p id="' + this.element.attr('id') + '_' + i + '_' + j + '">' + items[i][1][j] + '</p>').appendTo(div);
				html.mousedown(function() {
					self._select(this);
				});
			}
		}
		$(this.element).accordion({
			heightStyle: 'content'
		});
		this._setOption('selected', this.options.selected);
	},

	_select: function(element) {
		$('#' + this.element.attr('id')).find('.active').each(function() {
			$(this).removeClass('active');
		});
		var parts = $(element).attr('id').split('_');
		this.options.selected = [ parts[1] , parts[2] ];
		this._setTab(parseInt(this.options.selected[0], 10));
		$(element).addClass('active');	
		this.options.callback(this.element, this.options.selected);
	},

	_setOption: function(key, value) {
		if (key === 'selected') {
			var rgx = /^\d+$/;
			var i = (rgx.test(value[0])) ? value[0] : this._findKeyIndex(value[0]);
			var j = (rgx.test(value[1])) ? value[1] : this._findItemIndex(i, value[1]);
			var elements = $('#' + this.element.attr('id') + '_' + i + '_' + j);
			if (elements.length === 1) {
				this._select(elements[0]);
			}
		}
	},

	_findKeyIndex: function(key) {
		var items = this.options.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i][0] === key) return i;
		}
		return -1;
	},

	_findItemIndex: function(key, item) {
		var items = this.options.items[key][1];
		for (var i = 0; i < items.length; i++) {
			if (items[i] === item) return i;
		}
		return -1;
	},

	_setTab: function(index) {
		$(this.element).accordion({
			active: index
		});
	},

	_destroy: function() {
		$(this.element).empty();
		$(this.element).accordion('destroy');
	}

});

}(jQuery));
