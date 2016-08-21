/* ========================================================================
 * Retchet Plust - Scroll.js
 * http://rc.kimsq.com/controls/affix/  (when data-type="affix")
 * http://rc.kimsq.com/controls/updown/  (when data-type="updown")
 * ========================================================================
 * Inspired by http://getbootstrap.com/javascript/#affix
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

+function ($) {
  'use strict';

      // SCROLL CLASS DEFINITION
      // ======================

      var Scroll = function (element, options) {
            this.options = $.extend({}, Scroll.DEFAULTS, options)

            this.$target = $(this.options.target)
                 .on('scroll.rc.scroll.data-api', $.proxy(this.checkPosition, this))
                 .on('tap.rc.scroll.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

            this.$element     = $(element)
            this.type=this.options.type// affix , detect, ....
            this.scrolled      = null
            this.unpin        = null
            this.pinnedOffset = null
            this.lastScrollTop=0
            this.defaultHeight =this.options.defaultheight?this.options.defaultheight:280
            this.delta=this.options.delta?this.options.delta:5;

            this.checkPosition()
      }

      Scroll.VERSION  = '1.0.0'

      Scroll.Affix_RESET    = 'affix affix-top affix-bottom'

      Scroll.DEFAULTS = {
            offset: 0,
            target: '.content'
      }

      Scroll.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
            var scrollTop    = this.$target.scrollTop()
            var position     = this.$element.offset()
            var targetHeight = this.$target.height()

            if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

            if (this.affixed == 'bottom') {
                 if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
                 return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
            }

            var initializing   = this.affixed == null
            var colliderTop    = initializing ? scrollTop : position.top
            var colliderHeight = initializing ? targetHeight : height

            if (offsetTop != null && scrollTop <= offsetTop) return 'top'
            if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

            return false
      }

      Scroll.prototype.getPinnedOffset = function () {
            if (this.pinnedOffset) return this.pinnedOffset
            this.$element.removeClass(Scroll.Affix_RESET).addClass('affix')
            var scrollTop = this.$target.scrollTop()
            var position  = this.$element.offset()
            return (this.pinnedOffset = position.top - scrollTop)
      }

      Scroll.prototype.checkPositionWithEventLoop = function () {
            setTimeout($.proxy(this.checkPosition, this), 1)
      }

      Scroll.prototype.checkPosition = function () {
            if (!this.$element.is(':visible')) return

            var height       = this.$element.height()
            var offset       = this.options.offset
            var offsetTop    = offset.top
            var offsetBottom = offset.bottom
            var scrollHeight = Math.max($(document).height(), $(document.body).height())

            if (typeof offset != 'object')         offsetBottom = offsetTop = offset
            if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
            if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

            // when affix
            if(this.type=='affix'){
                  if (this.affixed != affix) {
                        if (this.unpin != null) this.$element.css('top', '')

                        var affixType = 'affix' + (affix ? '-' + affix : '')
                        var e         = $.Event(affixType + '.rc.scroll')

                        this.$element.trigger(e)

                        if (e.isDefaultPrevented()) return

                        this.affixed = affix
                        this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

                        this.$element
                          .removeClass(Scroll.Affix_RESET)
                          .addClass(affixType)
                          .trigger(affixType.replace('affix', 'affixed') + '.rc.scroll')
                  }

                  if (affix == 'bottom') {
                        this.$element.offset({
                          top: scrollHeight - height - offsetBottom
                        })
                  }
            }else if(this.type=='updown'){
                 var lastScrollTop=this.lastScrollTop,
                      nowScrollTop=$(this.$target).scrollTop(),
                      scrollEvent,
                      state=Math.abs(lastScrollTop - nowScrollTop) >= this.delta;
                       if(state==true){
                            if(nowScrollTop < this.defaultHeight) scrollEvent=$.Event('default.rc.scroll');
                            else{
                      	           if(nowScrollTop>lastScrollTop) scrollEvent=$.Event('down.rc.scroll');
                      	           else scrollEvent=$.Event('up.rc.scroll');
                      	      }
                      	      this.$element.trigger(scrollEvent); // trigger event
                            this.lastScrollTop=nowScrollTop;  // update lastScrollTop
                      }
            }

      }

      // SCROLL PLUGIN DEFINITION
      // =======================

      function Plugin(option) {
            return this.each(function () {
                  var $this   = $(this)
                  var data    = $this.data('rc.scroll')
                  var options = typeof option == 'object' && option

                  if (!data) $this.data('rc.scroll', (data = new Scroll(this, options)))
                  if (typeof option == 'string') data[option]()
            })
      }

      var old = $.fn.scroll

      $.fn.scroll             = Plugin
      $.fn.scroll.Constructor = Scroll


      // SCROLL NO CONFLICT
      // =================

      $.fn.scroll.noConflict = function () {
            $.fn.scroll = old
            return this
      }


      // SCROLL DATA-API
      // ==============

      $(window).on('load', function () {
            $('[data-control="scroll"]').each(function () {
                  var $spy = $(this)
                  var data = $spy.data()

                  data.offset = data.offset || {}

                  if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
                  if (data.offsetTop    != null) data.offset.top    = data.offsetTop
                  Plugin.call($spy, data)
            })
      })

}(jQuery);
