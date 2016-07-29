/* ========================================================================
 * Ratchet Plus: Popover.js v1.0.0
 * http://rc.kimsq.com/components/popover/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

"use strict";

!(function ($) {
      'use strict';

      // Popover CLASS DEFINITION
      // ======================

      var Popover = function Popover(element, options) {
            this.options = options;
            this.$body = $(document.body);
            this.$element = $(element);
            this.title = this.options.title ? this.options.title : null;
            this.url = this.options.url ? this.options.url : null;
            this.isShown = null;
      };

      // require tab.js & history.js & utilty.js   
      if (!$.fn.tap || window.History == "undefined" || window.Utility == "undefined") throw new Error('Popover requires tab.js, history.js and utility.js');

      Popover.VERSION = '1.1.0';
      Popover.DEFAULTS = {
            show: true,
            backdrop: true,
            history: true
      };

      Popover.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget);
      };

      Popover.prototype.show = function (_relatedTarget) {
            var $this = this;
            var e = $.Event('show.rc.popover', { relatedTarget: _relatedTarget });
            var title = this.title;
            var popover = this.options.target ? this.options.target : '#' + this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 ;
            var url = this.url;
            if (url != null) url = url.toString();
            var placement = this.options.placement ? this.options.placement : 'bottom';
            var bcontainer = this.options.bcontainer ? this.options.bcontainer : 'body';
            var template = this.options.template;
            var tplContainer = this.options.tplcontainer ? popover + ' ' + this.options.tplcontainer : popover;
            this.$element.trigger(e);
            this.isShown = true;

            // init Utility
            var utility = new Utility(popover, this.options).init();
            if (!template) {
                  utility.setdataVal(popover, $this.options); // data 값 세팅하는 전용함수 사용한다.
            } else {
                        $(tplContainer).load(template, $.proxy(function () {
                              utility.setdataVal(popover, $this.options); // data 값 세팅하는 전용함수 사용한다.
                              this.afterTemplate(this, _relatedTarget);
                        }, this));
                  }

            this.$element.on('tap.dismiss.rc.popover', '[data-dismiss="popover"]', $.proxy(this.hide, this));

            if (this.options.backdrop) this.backdrop(); // add backdrop
            $(popover).show();
            setTimeout(function () {
                  $(popover).addClass('active');
            }, 0);

            if (this.options.history) {
                  // 브라우저 history 객체에 추가
                  var object = { 'type': 'popover', 'target': { 'id': popover, 'bcontainer': bcontainer, 'backdrop': this.options.backdrop } };
                  utility.addHistoryObject(object, title, url);
            }
            this.afterPopover(this, _relatedTarget);
      };

      Popover.prototype.afterTemplate = function (obj, _relatedTarget) {
            var e = $.Event('loaded.rc.popover', { relatedTarget: _relatedTarget });
            obj.$element.trigger('focus').trigger(e);
      };

      Popover.prototype.afterPopover = function (obj, _relatedTarget) {
            var e = $.Event('shown.rc.popover', { relatedTarget: _relatedTarget });
            obj.$element.trigger('focus').trigger(e);
      };

      Popover.prototype.hide = function (e) {
            if (this.options.history) history.back();else this.nonHistoryHide();
            var backdrop = $('body').find('.backdrop');
            $(backdrop).remove();
      };
      Popover.prototype.historyHide = function (e) {
            this.isShown = false;
            if (e) e.preventDefault();
            e = $.Event('hide.rc.popover');
            this.$element.trigger(e);
            this.afterHide();
      };

      Popover.prototype.nonHistoryHide = function () {
            this.isShown = false;
            var popover = this.$element;
            var e = $.Event('hide.rc.popover');
            $(popover).trigger(e);
            $(popover).removeClass('active');
            setTimeout(function () {
                  $(popover).hide();
            }, 300);
            this.afterHide();
      };

      Popover.prototype.afterHide = function () {
            var e = $.Event('hidden.rc.popover');
            this.$element.trigger(e);
      };

      Popover.prototype.backdrop = function (callback) {
            if (this.isShown && this.options.backdrop) {
                  this.$backdrop = $(document.createElement('div')).addClass('backdrop').appendTo(this.$body);
                  this.$backdrop.on('tap.dismiss.rc.popover', $.proxy(function (e) {
                        if (this.ignoreBackdropClick) {
                              this.ignoreBackdropClick = false;
                              return;
                        }
                        if (e.target !== e.currentTarget) return;
                        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
                  }, this));
            }
      };

      var old = $.fn.popover;

      $.fn.popover = Plugin;
      $.fn.popover.Constructor = Popover;

      // Popover NO CONFLICT
      // =================

      $.fn.popover.noConflict = function () {
            $.fn.popover = old;
            return this;
      };

      // Popover PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                  var $this = $(this);
                  var options = $.extend({}, Popover.DEFAULTS, $this.data(), typeof option == 'object' && option);
                  var data = new Popover(this, options);
                  if (typeof option == 'string' && option != 'toggle') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
            });
      }

      // Popover DATA-API
      // ==============

      $(document).on('tap.rc.popover.data-api', '[data-toggle="popover"]', function (e) {
            var $this = $(this);
            var href = $this.attr('href');
            var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
            var option = $target.data('rc.popover') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

            if ($this.is('a')) e.preventDefault();

            $target.one('show.rc.popover', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return; // only register focus restorer if Popover will actually get shown
                  $target.one('hidden.rc.popover', function () {
                        $this.is(':active') && $this.trigger('focus');
                  });
            });

            Plugin.call($target, option, this);
      });
})(jQuery);
//# sourceMappingURL=popover.js.map
