/* ========================================================================
 * Ratchet Plus: Infinite-scroll.js v1.0.0
 * http://rc.kimsq.com/controls/infinite-scroll/
/*=======================================================================
 * Fuel UX Infinite Scroll (Need Above loader plugin )
 * https://github.com/ExactTarget/fuelux/blob/master/js/infinite-scroll.js
 *
 * Copyright (c) 2014 ExactTarget
 * Licensed under the BSD New license.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
        disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
        following disclaimer in the documentation and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
        products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *========================================================================*/


;(function ( $, window, document, undefined ) {

	var old = $.fn.infinitescroll;

	// INFINITE SCROLL CONSTRUCTOR AND PROTOTYPE

	var InfiniteScroll = function (element, options) {
		this.$element = $(element);
		this.$appendToEle=options.appendToEle;
		this.$element.addClass('infinitescroll');
		this.options = $.extend({}, $.fn.infinitescroll.defaults, options);

		this.curScrollTop = this.$element.scrollTop();
		this.curPercentage = this.getPercentage();
		this.fetchingData = false;

		this.$element.on('scroll.fu.infinitescroll', $.proxy(this.onScroll, this));
		this.onScroll();
	};
    
    // require tab.js & history.js & utilty.js    
    if (!$.fn.loader=="undefined") throw new Error('infinite-scroll requires loader.js')  


	InfiniteScroll.prototype = {

		constructor: InfiniteScroll,

		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]

			// empty elements to return to original markup
			this.$element.empty();

			return this.$element[0].outerHTML;
		},

		disable: function () {
			this.$element.off('scroll.fu.infinitescroll');
		},

		enable: function () {
			this.$element.on('scroll.fu.infinitescroll', $.proxy(this.onScroll, this));
		},

		end: function (content) {
			var end = $('<div class="infinitescroll-end"></div>');
			if (content) {
				end.append(content);
			} else {
				end.append('---------');
			}

			this.$element.append(end);
			this.disable();
		},

		getPercentage: function () {
			var height = (this.$element.css('box-sizing') === 'border-box') ? this.$element.outerHeight() : this.$element.height();
			var scrollHeight = this.$element.get(0).scrollHeight;
			return (scrollHeight > height) ? ((height / (scrollHeight - this.curScrollTop)) * 100) : 0;
		},

		fetchData: function (force) {
			var load = $('<div class="infinitescroll-load"></div>');
			var self = this;
			var moreBtn;

			var fetch = function () {
				var helpers = {
					percentage: self.curPercentage,
					scrollTop: self.curScrollTop
				};
				//var $loader = $('<div class="loader"></div>');
				var $loader=$('<div class="loader-container"></div>');
				load.append($loader);
				//$loader.loader();
				$loader.loader()
				if (self.options.dataSource) {
					self.options.dataSource(helpers, function (resp) {
						var end;
						load.remove();
						if (resp.content) {
							self.$appendToEle.append(resp.content);
						}

						if (resp.end) {
							end = (resp.end !== true) ? resp.end : undefined;
							self.end(end);
						}

						self.fetchingData = false;
					});
				}
			};

			this.fetchingData = true;
			this.$element.append(load);
			if (this.options.hybrid && force !== true) {
				moreBtn = $('<button type="button" class="btn btn-primary">more</button>');
				if (typeof this.options.hybrid === 'object') {
					moreBtn.append(this.options.hybrid.label);
				} else {
					moreBtn.append('<span class="rc-icon spinner"></span>');
				}

				moreBtn.on('click.fu.infinitescroll', function () {
					moreBtn.remove();
					fetch();
				});
				load.append(moreBtn);
			} else {
				fetch();
			}
		},

		onScroll: function (e) {
			this.curScrollTop = this.$element.scrollTop();
			this.curPercentage = this.getPercentage();
			if (!this.fetchingData && this.curPercentage >= this.options.percentage) {
				this.fetchData();
			}
		}
	};

	// INFINITE SCROLL PLUGIN DEFINITION

	$.fn.infinitescroll = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.infinitescroll');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.infinitescroll', (data = new InfiniteScroll(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.infinitescroll.defaults = {
		dataSource: null,
		hybrid: false,//can be true or an object with structure: { 'label': (markup or jQuery obj) }
		percentage: 95//percentage scrolled to the bottom before more is loaded
	};

	$.fn.infinitescroll.Constructor = InfiniteScroll;

	$.fn.infinitescroll.noConflict = function () {
		$.fn.infinitescroll = old;
		return this;
	};

	// NO DATA-API DUE TO NEED OF DATA-SOURCE

	// -- BEGIN UMD WRAPPER AFTERWORD --
})( jQuery, window, document );
// -- END UMD WRAPPER AFTERWORD --