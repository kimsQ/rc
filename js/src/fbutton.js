/* ========================================================================
 * Ratchet Plus: Fbutton.js v1.0.0
 * http://rc.kimsq.com/components/fbutton/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Fbutton CLASS DEFINITION
      // ======================

      var Fbutton = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }
     
     // require tab.js & history.js & utilty.js    
     if (!$.fn.tap || window.History=="undefined" || window.Utility=="undefined") throw new Error('Fbutton requires tab.js, history.js and utility.js')

      Fbutton.VERSION  = '1.0.0'
      Fbutton.DEFAULTS = {
            toggle : true,
            backdrop : true,
            history : true
      }

      Fbutton.prototype.toggle = function (_relatedTarget) {
            var isfbutton=sessionStorage.getItem('isfbutton');
            var isShown=isfbutton?isfbutton:'false';
            return isShown=='true' ? this.hide() : this.show(_relatedTarget)
      }
 
      Fbutton.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.fbutton', { relatedTarget: _relatedTarget })
            var title =this.title;
            var fbutton=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 ;
            var url=this.url;
            if(url!=null) url=url.toString();
            var placement=this.options.placement?this.options.placement:'bottom';
            var bcontainer=this.options.bcontainer?this.options.bcontainer:'body';
            var template=this.options.template;
            var tplContainer=this.options.tplcontainer?fbutton+' '+this.options.tplcontainer:fbutton;
            this.$element.trigger(e);
            if (this.isShown || e.isDefaultPrevented()) return
            this.isShown=true
            this.isShown='true';
            sessionStorage.setItem('isfbutton',this.isShown);
            // init Utility
            var utility=new Utility(fbutton,this.options).init();  
            if(!template){
                 utility.setdataVal(fbutton,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(tplContainer).load(template,$.proxy(function(){
                      utility.setdataVal(fbutton,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            }

            this.$element.on('tap.dismiss.rc.fbutton', '[data-dismiss="fbutton"]', $.proxy(this.hide, this))

            if(this.options.backdrop)  this.backdrop(); // add backdrop
            $(fbutton).addClass('active');

            if(this.options.history){
                // 브라우저 history 객체에 추가 
                var object = {'type': 'fbutton','target': {'id':fbutton,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
                utility.addHistoryObject(object,title,url);
            }
            this.afterFbutton(this,_relatedTarget);   
            
      }

      Fbutton.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.fbutton', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);   
      }

      Fbutton.prototype.afterFbutton=function(obj,_relatedTarget){
           var e = $.Event('shown.rc.fbutton', { relatedTarget: _relatedTarget })
           obj.$element.trigger('focus').trigger(e); 
      }

      Fbutton.prototype.hide = function (e) {
          if(this.options.history) history.back();
          else this.nonHistoryHide();
          var backdrop=$('body').find('.backdrop');
          $(backdrop).remove();   
      }
     Fbutton.prototype.historyHide = function (e) {
            this.isShown = 'false'
            sessionStorage.setItem('isfbutton',this.isShown);
            if (e) e.preventDefault()
            e = $.Event('hide.rc.fbutton')
            this.$element.trigger(e)
            this.afterHide();
      }

      Fbutton.prototype.nonHistoryHide = function () {
            this.isShown = 'false'
            sessionStorage.setItem('isfbutton',this.isShown);
            var fbutton=this.$element;
            var e    = $.Event('hide.rc.fbutton');
            $(fbutton).trigger(e)
            $(fbutton).removeClass('active');
            this.afterHide();
      }

      Fbutton.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.fbutton');
           this.$element.trigger(e);     
      }

      Fbutton.prototype.backdrop = function (callback) {   
          if (this.isShown && this.options.backdrop) {
               this.$backdrop = $(document.createElement('div'))
                  .addClass('backdrop')
                  .appendTo(this.$body)
                   this.$backdrop.on('tap.dismiss.rc.fbutton', $.proxy(function (e) {
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

      var old = $.fn.fbutton

      $.fn.fbutton             = Plugin
      $.fn.fbutton.Constructor = Fbutton


        // Fbutton NO CONFLICT
        // =================

      $.fn.fbutton.noConflict = function () {
            $.fn.fbutton = old
            return this
      }

      // Fbutton PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Fbutton.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var data = new Fbutton(this, options)
                 if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                else if (options.toggle) data.toggle(_relatedTarget)
           })
       }
      
      // Fbutton DATA-API
      // ==============
       
      $(document).on('tap.rc.fbutton.data-api', '[data-toggle="fbutton"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.fbutton') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.fbutton', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if Fbutton will actually get shown
                  $target.one('hidden.rc.fbutton', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));