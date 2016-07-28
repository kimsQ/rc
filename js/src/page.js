/* ========================================================================
 * Ratchet Plus: Page.js v1.0.0
 * http://rc.kimsq.com/components/page/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Page CLASS DEFINITION
      // ======================

      var Page = function (element, options) {
          this.options          = options
          this.$body            = $(document.body)
          this.$element       = $(element)
          this.title               = this.options.title?this.options.title:null
          this.url               = this.options.url?this.options.url:null
     }
      
     // require tab.js & history.js & utilty.js    
     if (!$.fn.tap || window.History=="undefined" || window.Utility=="undefined") throw new Error('Page requires tab.js, history.js and utility.js') 

      Page.VERSION  = '1.0.0'
      Page.DEFAULTS = {
           show: true,
           history : true
      }
        
      // 페이지 호출   
      Page.prototype.show = function (_relatedTarget) {
            var $this = this;
            var e    = $.Event('show.rc.page', { relatedTarget: _relatedTarget })
            var title =this.title;
            var startPage=this.options.start;
            var loadPage=this.options.target?this.options.target:'#'+this.$element.attr('id');
            var url =this.url; 
            if(url!=null) url=url.toString();
            var transition=this.options.transition;
            var template=this.options.template;
            var tplContainer=this.options.tplcontainer?loadPage+' '+this.options.tplcontainer:loadPage;
            this.$element.trigger(e);
            this.isShown = true;
        
            var utility=new Utility(startPage,this.options).init();           
            if(!template){
                 utility.setdataVal(loadPage,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{
                 $(tplContainer).load(template,function(){
                       utility.setdataVal(loadPage,$this.options); // data 값 세팅하는 전용함수 사용한다.
                       this.afterTemplate(this,_relatedTarget);
                });  
            }

            this.$element.on('tap.dismiss.rc.page', '[data-dismiss="page"]', $.proxy(this.hide, this))
            
            if(this.options.history){
                var object = {'type': 'page', 'target':{'start': startPage,'load':loadPage,'transition':transition}};  // 페이지 정보 : object 구분값 , 현재 페이지, 로드 페이지, 방향 
                utility.addHistoryObject(object,title,url);//  
            }     
            this.getPage(startPage,loadPage,transition); // 타겟 페이지 호출
            this.afterPage(this,_relatedTarget); 
      }

      Page.prototype.afterTemplate=function(obj,_relatedTarget){
             var e = $.Event('loaded.rc.page', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);    
      }

      Page.prototype.afterPage=function(obj,_relatedTarget){
            var e = $.Event('shown.rc.page', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e); 
      }
      
      Page.prototype.hide=function(e){
           if(this.options.history) history.back();
           else this.nonHistoryHide();
      }
      
      Page.prototype.historyHide=function(e){
          this.isShown = false
          if (e) e.preventDefault()
          e = $.Event('hide.rc.page')
          this.$element.trigger(e)
          var CurrentIndex=History.getCurrentIndex();
          var ForwardIndex=parseInt(CurrentIndex)-1;
          var ForwardObj=History.getStateByIndex(ForwardIndex); // 직전 object 
          var ForwardObj=JSON.stringify(ForwardObj);
          var result=$.parseJSON(ForwardObj);
          var objTarget=result.data.target; // modal, page, popover..의 id 정보
          var startPage=objTarget.start;
          var loadPage=objTarget.load;
          var transition=objTarget.transition;
          this.closePage(startPage,loadPage,transition);
          this.afterHide(); 
      }

     Page.prototype.nonHistoryHide = function () {
            this.isShown = false
            var sheet=this.$element;
            var e    = $.Event('hide.rc.page');
            $(sheet).trigger(e)
            var startPage=this.options.start;
            var loadPage=this.options.target?this.options.target:'#'+this.$element.attr('id');
            var transition=this.options.transition;
            this.closePage(startPage,loadPage,transition);
            this.afterHide();
      }
   
      Page.prototype.afterHide=function(e){
            var e = $.Event('hidden.rc.page');
           this.$element.trigger(e);   
      }  
     
      // 슬라이딩으로 페이지 호출(열기) 함수     
      Page.prototype.getPage=function(startPage,loadPage,transition){     
            $(loadPage).attr('class','page right'); // 출발 위치 세팅 
            $(loadPage).attr('class','page transition center'); // 출발위치에서 중앙으로 이동 
            $(startPage).attr('class','page transition left'); // start 페이지는 반대로 이동 
      }

      // 슬라이딩으로 페이지 닫기 함수     
      Page.prototype.closePage=function(startPage,loadPage,transition){     
            $(startPage).attr('class','page left'); // 출발 위치 세팅 
            $(startPage).attr('class','page transition center'); // 출발위치에서 중앙으로 이동 
            $(loadPage).attr('class','page transition right'); // start 페이지는 반대로 이동 
      }  
       
      var old = $.fn.page

      $.fn.page             = Plugin
      $.fn.page.Constructor = Page


        // page NO CONFLICT
        // =================

        $.fn.page.noConflict = function () {
          $.fn.page = old
          return this
        }

      // MODAL PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                  var $this   = $(this)
                  var options = $.extend({}, Page.DEFAULTS, $this.data(), typeof option == 'object' && option)
                  var data = new Page(this, options)
                  if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                  else if (options.show) data.show(_relatedTarget); 
            })
       }
      
      // Page DATA-API
      // ==============

      $(document).on('tap.rc.page.data-api', '[data-toggle="page"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.page') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
     
          if ($this.is('a')) e.preventDefault()
           $target.one('show.rc.page', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
                  $target.one('hidden.rc.page', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 
          Plugin.call($target, option, this)
      })

}(jQuery));