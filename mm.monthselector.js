/*!
 * Month Selector Widget
 * https://github.com/mimaison/jQueryUI-Month-Selector
 *
 * Depends:
 *	mm.itemselector
 */
(function($) {
'use strict';
$.widget('mm.monthselector', {
	version: '1.0',

	options: {
		names: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		start: new Date(),
		end: new Date(),
		selected: new Date(),
		callback: null
	},

	_create: function() {
		var self = this,
			endYear = this.options.end.getFullYear(),
			startYear = this.options.start.getFullYear(),
			dates = [];
		for (var i = endYear; i >= startYear; i--) {
			var maxMonth = (i === endYear) ? this.options.end.getMonth() : this.options.names.length - 1;
			var minMonth = (i === startYear) ? this.options.start.getMonth() : 0;
			
			var months = [];
			for (var j = maxMonth; j >= minMonth; j--) {
				months.push(this.options.names[j]);
			}
			dates.push([ i.toString(), months ]);
		}

		var sel = this.options.selected;
		var len = (endYear === sel.getFullYear()) ? this.options.end.getMonth() : 11;
		var selMonth = (sel.getMonth() > 6) ? len - sel.getMonth() : Math.abs(sel.getMonth() - len);
		var selYear = endYear - sel.getFullYear();
		
		$(this.element).itemselector({
			items: dates,
			selected: [ selYear , selMonth ],
			callback: self._callback
		});
	},

	_callback: function(element, item) {
		var callback = element.monthselector('option', 'callback');
		var names = element.monthselector('option', 'names');
		if (callback !== null) {
			var end = element.monthselector('option', 'end');
			var months = ((end.getFullYear() - parseInt(item[0])) === end.getFullYear()) ? end.getMonth() : 11;
			var month = (item[1] > 6) ? months - item[1] : Math.abs(item[1] - months);
			callback(new Date(end.getFullYear() - item[0], month), names);
        }
	},

	_setOption: function(key, value) {
		if (key === 'selected') {
			var elements = $('#' + this.element.attr('id') + '_' + value.getFullYear() + '_' + value.getMonth());
			if (elements.length === 1) {
				$(this.element).itemsel({selected: [ value.getFullYear(), value.getMonth() ] });
			}
		}
	}

});

}(jQuery));
