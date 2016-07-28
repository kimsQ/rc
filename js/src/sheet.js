/* ========================================================================
 * Ratchet Plus: Sheet.js v1.0.0
 * http://rc.kimsq.com/components/sheet/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Sheet CLASS DEFINITION
      // ======================

      var Sheet = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }

     // require tab.js & history.js & utilty.js    
     if (!$.fn.tap || window.History=="undefined" || window.Utility=="undefined") throw new Error('Sheet requires tab.js, history.js and utility.js')

      Sheet.VERSION  = '1.0.0'
      Sheet.DEFAULTS = {
            show: true,
            backdrop : true,
            history : true
      }

      Sheet.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
      }
 
      Sheet.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.sheet', { relatedTarget: _relatedTarget })
            var title =this.title;
            var sheet=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 ;
            var url=this.url;
            if(url!=null) url=url.toString();
            var placement=this.options.placement?this.options.placement:'bottom';
            var bcontainer=this.options.bcontainer?this.options.bcontainer:'body';
            var template=this.options.template;
            var tplContainer=this.options.tplcontainer?sheet+' '+this.options.tplcontainer:sheet;
            this.$element.trigger(e);
            this.isShown = true

            // init Utility
            var utility=new Utility(sheet,this.options).init();  
            if(!template){
                 utility.setdataVal(sheet,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(tplContainer).load(template,$.proxy(function(){
                      utility.setdataVal(sheet,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            } 

            this.$element.on('tap.dismiss.rc.sheet', '[data-dismiss="sheet"]', $.proxy(this.hide, this))

            if(this.options.backdrop) this.backdrop();// add backdrop 

            $(sheet).css("display","block");   
            setTimeout(function(){$(sheet).addClass('active')}, 0);
            if(this.options.history){
               // 브라우저 history 객체에 추가 
                var object = {'type': 'sheet','target': {'id':sheet,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
               utility.addHistoryObject(object,title,url);
            }
            this.afterSheet(this,_relatedTarget);   
      }

      Sheet.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.sheet', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);   
      }

      Sheet.prototype.afterSheet=function(obj,_relatedTarget){
           var e = $.Event('shown.rc.sheet', { relatedTarget: _relatedTarget })
           obj.$element.trigger('focus').trigger(e); 
      }

      Sheet.prototype.hide = function (e) {
           if(this.options.history) history.back();
           else this.nonHistoryHide();
           var backdrop=$('body').find('.backdrop');
           $(backdrop).remove();
      }

      Sheet.prototype.historyHide = function () {
            this.isShown = false
            if (e) e.preventDefault()
            var e    = $.Event('hide.rc.sheet');
            this.$element.trigger(e) 
            this.afterHide();
      }

      Sheet.prototype.nonHistoryHide = function () {
            this.isShown = false
            var sheet=this.$element;
            var e    = $.Event('hide.rc.sheet');
            $(sheet).trigger(e)
            $(sheet).removeClass('active');
            setTimeout(function(){$(sheet).hide();},300); 
            this.afterHide();
      }

      Sheet.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.sheet');
           this.$element.trigger(e);     
      }

     Sheet.prototype.backdrop = function (callback) {   
          if (this.isShown && this.options.backdrop) {
               this.$backdrop = $(document.createElement('div'))
                  .addClass('backdrop')
                  .appendTo(this.$body)
               this.$backdrop.on('tap.dismiss.rc.sheet', $.proxy(function (e) {
                    if (this.ignoreBackdropClick) {
                      this.ignoreBackdropClick = false
                      return
                    }
                    if (e.target !== e.currentTarget) return
                    this.options.backdrop == 'static'
                    ? this.$element[0].focus()
                    : this.hide()  
               }, this))   
          }  
     } 
      var old = $.fn.sheet

      $.fn.sheet             = Plugin
      $.fn.sheet.Constructor = Sheet


        // Sheet NO CONFLICT
        // =================

      $.fn.sheet.noConflict = function () {
            $.fn.sheet = old
            return this
      }

      // Sheet PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Sheet.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var data = new Sheet(this, options)
                if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
           })
       }
      
      // Sheet DATA-API
      // ==============
       
      $(document).on('tap.rc.sheet.data-api', '[data-toggle="sheet"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.sheet') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.sheet', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if Sheet will actually get shown
                  $target.one('hidden.rc.sheet', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));