/*!
 * =====================================================
 * Ratchet Plus v0.5 (https://github.com/kimsq/rc)
 * =====================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * =====================================================
 */


/* ========================================================================
 * rc :  Utility 
 * ======================================================================== */

!(function($){
      'use strict';
      var Utility = function(elem, options){
            this.elem = elem;
            this.$elem = $(elem);
            this.options = options;
            this.metadata=this.$elem.data('utility-option'); // 엘리먼트 기준  
       };

      Utility.VERSION  = '1.1.0'
      Utility.DEFAULTS = {}
     
      Utility.prototype.init=function(){
            this.config=$.extend({}, this.defaults, this.options);
            return this;
      }

      Utility.prototype.setdataVal=function(component,dataAttr){
            $.each(dataAttr,function(key,val){
                 var keyArr=key.split(':'); 
                 var keyArrCnt=keyArr.length;
                 if(keyArrCnt==2){
                       // data-keyType-keyName
                       var keyType=keyArr[0]; 
                       var keyName=keyArr[1]; 
                       var target=$(component).find('[data-role="'+keyName+'"]');
                       if(keyType=='bg') $(target).css('background-image','url('+val+')');
                       else if(keyType=='img') $(target).attr('src',val);
                       else if(keyType=='inputText') $(target).val(val);
                       else if(keyType=='html') $(target).html(val);
                       else if(keyType=='text' || keyType=='') $(target).text(val);
                 }else{
                       var target=$(component).find('[data-role="'+key+'"]');
                       $(target).text(val);                         
                 }
            });
      }

      Utility.prototype.addHistoryObject=function(object,title,url){
            var _url=url!=null?url:'##';
            History.pushState(object, title, _url); 
            // var CurrentIndex=History.getCurrentIndex();
            // var CurrentObj=History.getStateByIndex(CurrentIndex);  
            // var CurrentObj=JSON.stringify(CurrentObj);
            // var result=$.parseJSON(CurrentObj);
            // console.log(result);
      }

      Utility.prototype.resetHistoryObject=function(objType,objTarget){
            if(objType=='page'){
                  var startPage=objTarget.start;
                  var loadPage=objTarget.load;
                  var transition=objTarget.transition;
                  var object=loadPage; // title, content 초기화를 object 로 일괄적용하기 위해서  
                  closeSlidePage(startPage,loadPage,transition);// startPage 와 loadPage 위치를 바꿔준다.
            }else if(objType=='modal'){
                  var object=objTarget; 
                  $(object).removeClass('active');
                  $(object).css("display","none");
            }else if(objType=='popup'){
                  var object=objTarget.popup;
                  var bcontainer=objTarget.bcontainer;
                  var backdrop=objTarget.backdrop;
                  $(object).removeClass('active');
                  $(object).css("display","none"); 
                  if(backdrop) $(bcontainer).find('.backdrop').remove(); 
            }else if(objType=='popover'){
                  var object=objTarget.popover;
                  var bcontainer=objTarget.bcontainer;
                  var backdrop=objTarget.backdrop;
                  var placement=objTarget.placement;
                  $(object).removeClass('rb-'+placement+' visible');   
                  $(object).css("display","none"); 
                  if(backdrop) $(bcontainer).find('.backdrop').remove();
            }else if(objType=='sheet'){
                  var object=objTarget.sheet;
                  var container=objTarget.container;
                  var backdrop=objTarget.backdrop;
                  var placement=objTarget.placement;
                  $(object).removeClass('rb-'+placement+' visible');   
                  $(object).css("display","none"); 
                  if(backdrop) $(container).find('.backdrop').remove();
            }
            
             // object 입력내용 초기화 (object 공통내용) 
             $(object).find('[data-role="title"]').html('');
             $(object).find('[data-role="content"]').html('');
             $(object).find('[data-role="coverImg"]').css('background-image','url()'); // 커버이미지 초기화(배경타입) 
             $(object).find('[data-role="cover-img"]').attr('src',''); // 커버이미지 초기화 (이미지 타입 )
             $(object).find('[data-role="focus"]').blur();// 포커싱한 것 초기화  
      }

      Utility.prototype.popComponentState=function(e){
            var CurrentIndex=History.getCurrentIndex();
            var ForwardIndex=parseInt(CurrentIndex)-1;
            var ForwardObj=History.getStateByIndex(ForwardIndex); // 직전 object 
            var ForwardObj=JSON.stringify(ForwardObj);
            var result=$.parseJSON(ForwardObj);
            //History.log('직전 history : state =' +ForwardObj+'/ index='+ForwardIndex);
            var objType=result.data.type; // modal, page, popover, popup,...     
            var objTarget=result.data.target; // modal, page, popover..의 id 정보
            var utility=new Utility(objTarget,null).init();
            utility.resetHistoryObject(objType,objTarget);  
      }

        // 슬라이딩으로 페이지 닫기 함수     
      var closeSlidePage=function(startPage,loadPage,transition){     
            $(startPage).attr('class','page left'); // 출발 위치 세팅 
            $(startPage).attr('class','page transition center'); // 출발위치에서 중앙으로 이동 
            $(loadPage).attr('class','page transition right'); // start 페이지는 반대로 이동 
      }  


       // history.back
      $(document).on('tap click','[data-history="back"]',function(e){
             e.preventDefault();
             history.back();
       });

       // history.back
      $(document).on('tap click','.backdrop',function(e){
             history.back();
       });

      var utility=new Utility(null,null).init();
      window.addEventListener('popstate', utility.popComponentState);      
      
      window.Utility = Utility;

})(jQuery);

// /* ========================================================================
//  * rc :  Popover 
//  * ======================================================================== */

!(function ($) {
  'use strict';

      // Popover CLASS DEFINITION
      //  element : modal , options : Event Handler data() + more 
      // ======================

      var Popover = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }

      Popover.VERSION  = '1.1.0'
      Popover.DEFAULTS = {
            show: true,
            backdrop : true
      }

      Popover.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
      }
 
      Popover.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.popover', { relatedTarget: _relatedTarget })
            var title =this.title;
            var popover=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 ;
            var url=this.url;
            if(url!=null) url=url.toString();
            var placement=this.options.placement?this.options.placement:'bottom';
            var bcontainer=this.options.bcontainer?this.options.bcontainer:'body';
            var template=this.options.template;
            this.$element.trigger(e);
            this.isShown = true

            // init Utility
            var utility=new Utility(popover,this.options).init();  
            if(!template){
                 utility.setdataVal(popover,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(popover).load(template,$.proxy(function(){
                      utility.setdataVal(popover,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            } 
            if(this.options.backdrop)  $(bcontainer).append('<div class="backdrop"></div>');
            $(popover).addClass('rb-'+placement+' visible'); // 노출과 함께 방향 설정  
            $(popover).css("display","block"); 
            
            // 브라우저 history 객체에 추가 
            var object = {'type': 'popover','target': {'popover':popover,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
            utility.addHistoryObject(object,title,url);
         
            this.afterPopover(this,_relatedTarget);   
      }

      Popover.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.popover', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);   
      }

      Popover.prototype.afterPopover=function(obj,_relatedTarget){
           var e = $.Event('shown.rc.popover', { relatedTarget: _relatedTarget })
           obj.$element.trigger('focus').trigger(e); 
      }

      Popover.prototype.hide = function (e) {
            if (e) e.preventDefault()
            e = $.Event('hide.rc.popover')
            this.$element.trigger(e)
            if (!this.isShown || e.isDefaultPrevented()) return
            this.isShown = false
            var utility=new Utility().init(); 
            utility.popComponentState();    
      }

      var old = $.fn.popover

      $.fn.popover             = Plugin
      $.fn.popover.Constructor = Popover


        // Popover NO CONFLICT
        // =================

      $.fn.popover.noConflict = function () {
            $.fn.popover = old
            return this
      }

      // Popover PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Popover.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var data = new Popover(this, options)
                if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
           })
       }
      
      // Popover DATA-API
      // ==============
       
      $(document).on('click.rc.popover.data-api', '[data-toggle="popover"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.popover') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.popover', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if Popover will actually get shown
                  $target.one('hidden.rc.popover', function () {
                   $this.is(':visible') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));

/* ========================================================================
 * rc :  Modal 
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Modal CLASS DEFINITION
      //  element : modal , options : Event Handler data() + more 
      // ======================

      var Modal = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }

      Modal.VERSION  = '1.1.0'
      Modal.DEFAULTS = {
            show: true,
            afterModal : true
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
            var animation=this.options.animation?this.options.animation:'slide-up';
            var template=this.options.template;
            this.$element.trigger(e);
            this.isShown = true

            // init Utility
            var utility=new Utility(modal,this.options).init();  
            if(!template){
                 utility.setdataVal(modal,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(modal).load(template,$.proxy(function(){
                      utility.setdataVal(modal,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            } 
             
            this.$element.addClass(animation); // 에니메이션 적용
            this.$element.addClass('active'); // 모달 활성화
            this.$element.css("display","block");
            
            // 브라우저 history 객체에 추가 
            var object = {'type': 'modal','target': modal}
            utility.addHistoryObject(object,title,url);
            
          
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
            if (e) e.preventDefault()
            var e    = $.Event('hide.rc.modal');
            this.$element.trigger(e)
            this.isShown = false
            history.back();
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
       
      $(document).on('click.rc.modal.data-api', '[data-toggle="modal"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.modal', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
                  $target.one('hidden.rc.modal', function () {
                   $this.is(':visible') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));


/* ========================================================================
 * rc : Page
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

      Page.VERSION  = '1.1.0'
      Page.DEFAULTS = {
           show: true
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
            this.$element.trigger(e);

            var utility=new Utility(startPage,this.options).init();           
            var object = {'type': 'page', 'target':{'start': startPage,'load':loadPage,'transition':transition}};  // 페이지 정보 : object 구분값 , 현재 페이지, 로드 페이지, 방향 
            utility.addHistoryObject(object,title,url);//
     
        
           // 페이지  template 로드하고 data- 값 세팅한다.
            if(!template){
                 utility.setdataVal(loadPage,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{
                 $(loadPage).load(template,function(){
                       utility.setdataVal(loadPage,$this.options); // data 값 세팅하는 전용함수 사용한다.
                       this.afterTemplate(this,_relatedTarget);
                });  
            } 
                 
            this.loadPage(startPage,loadPage,transition); // 타겟 페이지 호출
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

      // 슬라이딩으로 페이지 호출(열기) 함수     
      Page.prototype.loadPage=function(startPage,loadPage,transition){     
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

      $(document).on('click tap', '[data-toggle="page"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
     
          if ($this.is('a')) e.preventDefault()
           $target.one('show.rc.page', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
                  $target.one('hidden.rc.page', function () {
                   $this.is(':visible') && $this.trigger('focus')
                })
            }) 
          Plugin.call($target, option, this)
      })

}(jQuery));

// /* ========================================================================
//  * rc :  Popup 
//  * ======================================================================== */

!(function ($) {
  'use strict';

      // Popup CLASS DEFINITION
      //  element : modal , options : Event Handler data() + more 
      // ======================

      var Popup = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }

      Popup.VERSION  = '1.1.0'
      Popup.DEFAULTS = {
            show: true,
            backdrop : true
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
            this.$element.trigger(e);
            this.isShown = true

            // init Utility
            var utility=new Utility(popup,this.options).init();  
            if(!template){
                 utility.setdataVal(popup,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(popup).load(template,$.proxy(function(){
                      utility.setdataVal(popup,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            } 
      
            if(this.options.backdrop)  $(bcontainer).append('<div class="backdrop"></div>');
             
            this.$element.addClass('active');
            this.$element.css("display","block");
            
            // 브라우저 history 객체에 추가 
            var object = {'type': 'popup','target': {'popup':popup,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
            utility.addHistoryObject(object,title,url);
         
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
            if (e) e.preventDefault()
            e = $.Event('hide.rc.popup')
            this.$element.trigger(e)
            if (!this.isShown || e.isDefaultPrevented()) return
            this.isShown = false
            var utility=new Utility().init(); 
            utility.popComponentState();    
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
       
      $(document).on('click.rc.popup.data-api', '[data-toggle="popup"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.popup') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.popup', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if Popup will actually get shown
                  $target.one('hidden.rc.popup', function () {
                   $this.is(':visible') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));

/* ========================================================================
 * Ratchet: segmented-controllers.js v2.0.2
 * http://goratchet.com/components#segmentedControls
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var getTarget = function (target) {
    var i;
    var segmentedControls = document.querySelectorAll('.segmented-control .control-item');

    for (; target && target !== document; target = target.parentNode) {
      for (i = segmentedControls.length; i--;) {
        if (segmentedControls[i] === target) {
          return target;
        }
      }
    }
  };

  window.addEventListener('touchend', function (e) {
    var activeTab;
    var activeBodies;
    var targetBody;
    var targetTab     = getTarget(e.target);
    var className     = 'active';
    var classSelector = '.' + className;

    if (!targetTab) {
      return;
    }

    activeTab = targetTab.parentNode.querySelector(classSelector);

    if (activeTab) {
      activeTab.classList.remove(className);
    }

    targetTab.classList.add(className);

    if (!targetTab.hash) {
      return;
    }

    targetBody = document.querySelector(targetTab.hash);

    if (!targetBody) {
      return;
    }

    activeBodies = targetBody.parentNode.querySelectorAll(classSelector);

    for (var i = 0; i < activeBodies.length; i++) {
      activeBodies[i].classList.remove(className);
    }

    targetBody.classList.add(className);
  });

  window.addEventListener('click', function (e) { if (getTarget(e.target)) {e.preventDefault();} });
}());


/* ========================================================================
 * Ratchet: toggles.js v2.0.2
 * http://goratchet.com/components#toggles
 * ========================================================================
   Adapted from Brad Birdsall's swipe
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var start     = {};
  var touchMove = false;
  var distanceX = false;
  var toggle    = false;

  var findToggle = function (target) {
    var i;
    var toggles = document.querySelectorAll('.toggle');

    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) {
        if (toggles[i] === target) {
          return target;
        }
      }
    }
  };

  window.addEventListener('touchstart', function (e) {
    e = e.originalEvent || e;

    toggle = findToggle(e.target);

    if (!toggle) {
      return;
    }

    var handle      = toggle.querySelector('.toggle-handle');
    var toggleWidth = toggle.clientWidth;
    var handleWidth = handle.clientWidth;
    var offset      = toggle.classList.contains('active') ? (toggleWidth - handleWidth) : 0;

    start     = { pageX : e.touches[0].pageX - offset, pageY : e.touches[0].pageY };
    touchMove = false;
  });

  window.addEventListener('touchmove', function (e) {
    e = e.originalEvent || e;

    if (e.touches.length > 1) {
      return; // Exit if a pinch
    }

    if (!toggle) {
      return;
    }

    var handle      = toggle.querySelector('.toggle-handle');
    var current     = e.touches[0];
    var toggleWidth = toggle.clientWidth;
    var handleWidth = handle.clientWidth;
    var offset      = toggleWidth - handleWidth;

    touchMove = true;
    distanceX = current.pageX - start.pageX;

    if (Math.abs(distanceX) < Math.abs(current.pageY - start.pageY)) {
      return;
    }

    e.preventDefault();

    if (distanceX < 0) {
      return (handle.style.webkitTransform = 'translate3d(0,0,0)');
    }
    if (distanceX > offset) {
      return (handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)');
    }

    handle.style.webkitTransform = 'translate3d(' + distanceX + 'px,0,0)';

    toggle.classList[(distanceX > (toggleWidth / 2 - handleWidth / 2)) ? 'add' : 'remove']('active');
  });

  window.addEventListener('touchend', function (e) {
    if (!toggle) {
      return;
    }

    var handle      = toggle.querySelector('.toggle-handle');
    var toggleWidth = toggle.clientWidth;
    var handleWidth = handle.clientWidth;
    var offset      = (toggleWidth - handleWidth);
    var slideOn     = (!touchMove && !toggle.classList.contains('active')) || (touchMove && (distanceX > (toggleWidth / 2 - handleWidth / 2)));

    if (slideOn) {
      handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
    } else {
      handle.style.webkitTransform = 'translate3d(0,0,0)';
    }

    toggle.classList[slideOn ? 'add' : 'remove']('active');

    e = new CustomEvent('toggle', {
      detail: { isActive: slideOn },
      bubbles: true,
      cancelable: true
    });

    toggle.dispatchEvent(e);

    touchMove = false;
    toggle    = false;
  });

}());