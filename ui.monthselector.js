/*!
 * Month Selector Widget
 * https://github.com/mimaison/jQueryUI-Month-Selector
 *
 * Depends:
 *	jquery.ui.accordion.js
 */
(function($) {
"use strict";
$.widget("ui.monthselector", {
	version: "1.0.0",

	options: {
		names: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
		start: new Date(),
		end: new Date(),
		selected: new Date(),

		//Callback
		callback: null
	},

	_create: function() {
		var self = this,
				endYear = this.options.end.getFullYear();
		for (var i = endYear; i >= this.options.start.getFullYear(); i--) {
			var maxMonth = (i === endYear) ? this.options.end.getMonth() : this.options.names.length - 1;
			$("<h3>" + i + "</h3>").appendTo(this.element);
			var div = $("<div>").appendTo(this.element);
			for (var j = maxMonth; j >= 0; j--) {
				var html = $("<p id='" + this.element.attr("id") + "_" + i + "_" + j + "'>" + this.options.names[j] + "</p>").appendTo(div);
				html.mousedown(function() {
					self._select(this);
				});
			}
		}
		$(this.element).accordion({
			heightStyle: "content"
		});
		this._setOption("selected", this.options.selected);
	},

	_select: function(element) {
		var parts = $(element).attr("id").split("_");
		this.options.selected = new Date(parts[1], parts[2]);
		$(".active").each(function() {
			$(this).removeClass("active");
		});
		$(element).addClass("active");
		this._setTab(this._getTab(this.options.selected));
		if (this.options.callback !== null) {
			this.options.callback(this.options.selected);
		}
	},

	_getTab: function(date) {
		var index = 0;
		var year = this.options.end.getFullYear();
		while (date.getFullYear() < year) {
			index += 1;
			year -= 1;
		}
		return index;
	},

	_setTab: function(index) {
		$(this.element).accordion({
			active: index
		});
	},

	_setOption: function(key, value) {
		if (key === "selected") {
			var elements = $("#" + this.element.attr("id") + "_" + value.getFullYear() + "_" + value.getMonth());
			if (elements.length === 1) {
				this._select(elements[0]);
			}
		}
	}

});

}(jQuery));
