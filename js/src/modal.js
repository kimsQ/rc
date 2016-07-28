/* ========================================================================
 * Ratchet Plus: Modal.js v1.0.0
 * http://rc.kimsq.com/components/modal/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Modal CLASS DEFINITION
      // ======================

      var Modal = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }
     
      // require tab.js & history.js & utilty.js    
     if (!$.fn.tap || window.History=="undefined" || window.Utility=="undefined") throw new Error('Modal requires tab.js, history.js and utility.js')  

      Modal.VERSION  = '1.0.0'
      Modal.DEFAULTS = {
            show: true,
            afterModal : true,
            history : true
      }

      Modal.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
      }
 
      Modal.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.modal', { relatedTarget: _relatedTarget })
            var title =this.title;
            var modal=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 
            var url =this.url;
            if(url!=null) url=url.toString();
            var animation=this.options.animation?this.options.animation:'';
            var template=this.options.template;
            var tplContainer=this.options.tplcontainer?modal+' '+this.options.tplcontainer:modal;
            this.$element.trigger(e);
            this.isShown = true
      
           // init Utility
            var utility=new Utility(modal,this.options).init();  
            if(!template){
                 utility.setdataVal(modal,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{ 
               $(tplContainer).load(template,$.proxy(function(){
                    utility.setdataVal(modal,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                    this.afterTemplate(this,_relatedTarget);
               },this));   
            }

            this.$element.on('tap.dismiss.rc.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this)) 
             
            this.$element.addClass(animation); // 에니메이션 적용
            $(modal).show();
            setTimeout(function(){$(modal).addClass('active')}, 0);
            if(this.options.history){
                // 브라우저 history 객체에 추가 
                var object = {'type': 'modal','target': modal}
                utility.addHistoryObject(object,title,url);  
            }
          
           this.afterModal(this,_relatedTarget);              
      }

      Modal.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.modal', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);  
      }

      Modal.prototype.afterModal=function(obj,_relatedTarget){
            var e = $.Event('shown.rc.modal', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);
      }

      Modal.prototype.hide = function (e) {
           if(this.options.history) history.back();
           else this.nonHistoryHide();
      }
     
     Modal.prototype.historyHide = function (e) {
            this.isShown = false
            if (e) e.preventDefault()
            var e    = $.Event('hide.rc.modal');
            this.$element.trigger(e) 
            this.afterHide();
      }

      Modal.prototype.nonHistoryHide = function () {
            this.isShown = false
            var modal=this.$element;
            var e    = $.Event('hide.rc.modal');
            $(modal).trigger(e)
            $(modal).removeClass('active');
            setTimeout(function(){$(modal).hide();},300); 
            this.afterHide();
      }

      Modal.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.modal');
           this.$element.trigger(e);     
      }

      var old = $.fn.modal

      $.fn.modal             = Plugin
      $.fn.modal.Constructor = Modal


        // MODAL NO CONFLICT
        // =================

      $.fn.modal.noConflict = function () {
            $.fn.modal = old
            return this
      }

      // MODAL PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var data = new Modal(this, options)
                if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
           })
       }
      
      // MODAL DATA-API
      // ==============
       
      $(document).on('tap.rc.modal.data-api', '[data-toggle="modal"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.modal', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
                  $target.one('hidden.rc.modal', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));