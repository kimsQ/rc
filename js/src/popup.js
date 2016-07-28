/* ========================================================================
 * Ratchet Plus: Popup.js v1.0.0
 * http://rc.kimsq.com/components/popup/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Popup CLASS DEFINITION
      // ======================

      var Popup = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }
      
     // require tab.js & history.js & utilty.js    
     if (!$.fn.tap || window.History=="undefined" || window.Utility=="undefined") throw new Error('Popup requires tab.js, history.js and utility.js')

      Popup.VERSION  = '1.0.0'
      Popup.DEFAULTS = {
            show: true,
            backdrop : true,
            history : true
      }

      Popup.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
      }
 
      // 모달 호출   
      Popup.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.popup', { relatedTarget: _relatedTarget })
            var title =this.title;
            var popup=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 ;
            var url =this.url; 
            if(url!=null) url=url.toString();
            var bcontainer=this.options.bcontainer?this.options.bcontainer:'body';
            var template=this.options.template;
            var tplContainer=this.options.tplcontainer?popup+' '+this.options.tplcontainer:popup;
            this.$element.trigger(e);
            this.isShown = true

            // init Utility
            var utility=new Utility(popup,this.options).init();  
            if(!template){
                 utility.setdataVal(popup,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(tplContainer).load(template,$.proxy(function(){
                      utility.setdataVal(popup,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            }

            this.$element.on('tap.dismiss.rc.popup', '[data-dismiss="popup"]', $.proxy(this.hide, this))  
      
            if(this.options.backdrop) this.backdrop();// add backdrop
             
            $(popup).css("display","block");
            setTimeout(function(){$(popup).addClass('active')}, 0);

            if(this.options.history){
                // 브라우저 history 객체에 추가 
                var object = {'type': 'popup','target': {'id':popup,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
                utility.addHistoryObject(object,title,url);
            }
            this.afterPopup(this,_relatedTarget);   
      }

      Popup.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.popup', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);   
      }

      Popup.prototype.afterPopup=function(obj,_relatedTarget){
           var e = $.Event('shown.rc.popup', { relatedTarget: _relatedTarget })
           obj.$element.trigger('focus').trigger(e); 
      }

      Popup.prototype.hide = function (e) {
           if(this.options.history) history.back();
           else this.nonHistoryHide();
           var backdrop=$('body').find('.backdrop');
           $(backdrop).remove();
      }

     Popup.prototype.historyHide = function (e) {
            this.isShown = false
            if (e) e.preventDefault()
            var e    = $.Event('hide.rc.popup');
            this.$element.trigger(e)  
            this.afterHide();
      }

      Popup.prototype.nonHistoryHide = function () {
            this.isShown = false
            var popup=this.$element;
            var e    = $.Event('hide.rc.popup');
            $(popup).trigger(e)
            $(popup).removeClass('active');
            setTimeout(function(){$(popup).hide();},300); 
            this.afterHide();
      }

      Popup.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.popup');
           this.$element.trigger(e);     
      }

      Popup.prototype.backdrop = function (callback) {   
          if (this.isShown && this.options.backdrop) {
               this.$backdrop = $(document.createElement('div'))
                  .addClass('backdrop')
                  .appendTo(this.$body)
               this.$backdrop.on('tap.dismiss.rc.popup', $.proxy(function (e) {
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

      var old = $.fn.popup

      $.fn.popup             = Plugin
      $.fn.popup.Constructor = Popup


        // Popup NO CONFLICT
        // =================

      $.fn.popup.noConflict = function () {
            $.fn.popup = old
            return this
      }

      // Popup PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Popup.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var data = new Popup(this, options)
                if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
           })
       }
      
      // Popup DATA-API
      // ==============
       
      $(document).on('tap.rc.popup.data-api', '[data-toggle="popup"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.popup') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.popup', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if Popup will actually get shown
                  $target.one('hidden.rc.popup', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));
