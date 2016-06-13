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

// /* ========================================================================
//  * rc :  Fbutton 
//  * ======================================================================== */

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

      Fbutton.VERSION  = '1.1.0'
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
            backdrop : true,
            history : true
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
            var tplContainer=this.options.tplcontainer?popover+' '+this.options.tplcontainer:popover;
            this.$element.trigger(e);
            this.isShown = true

            // init Utility
            var utility=new Utility(popover,this.options).init();  
            if(!template){
                 utility.setdataVal(popover,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{                 
                 $(tplContainer).load(template,$.proxy(function(){
                      utility.setdataVal(popover,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                      this.afterTemplate(this,_relatedTarget);
                },this));  
            }

            this.$element.on('tap.dismiss.rc.popover', '[data-dismiss="popover"]', $.proxy(this.hide, this))

            if(this.options.backdrop)  this.backdrop(); // add backdrop
            $(popover).show();
            setTimeout(function(){$(popover).addClass('active')}, 0);

            if(this.options.history){
                // 브라우저 history 객체에 추가 
                var object = {'type': 'popover','target': {'id':popover,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
                utility.addHistoryObject(object,title,url);
            }
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
          if(this.options.history) history.back();
          else this.nonHistoryHide();
          var backdrop=$('body').find('.backdrop');
          $(backdrop).remove();   
      }
     Popover.prototype.historyHide = function (e) {
            this.isShown = false
            if (e) e.preventDefault()
            e = $.Event('hide.rc.popover')
            this.$element.trigger(e)
            this.afterHide();
      }

      Popover.prototype.nonHistoryHide = function () {
            this.isShown = false
            var popover=this.$element;
            var e    = $.Event('hide.rc.popover');
            $(popover).trigger(e)
            $(popover).removeClass('active');
            setTimeout(function(){$(popover).hide();},300); 
            this.afterHide();
      }

      Popover.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.popover');
           this.$element.trigger(e);     
      }

      Popover.prototype.backdrop = function (callback) {   
          if (this.isShown && this.options.backdrop) {
               this.$backdrop = $(document.createElement('div'))
                  .addClass('backdrop')
                  .appendTo(this.$body)
               this.$backdrop.on('tap.dismiss.rc.popover', $.proxy(function (e) {
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
       
      $(document).on('tap.rc.popover.data-api', '[data-toggle="popover"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.popover') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.popover', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if Popover will actually get shown
                  $target.one('hidden.rc.popover', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 

          Plugin.call($target, option, this)
      })

}(jQuery));

// /* ========================================================================
//  * rc :  Sheet 
//  * ======================================================================== */

!(function ($) {
  'use strict';

      // Sheet CLASS DEFINITION
      //  element : modal , options : Event Handler data() + more 
      // ======================

      var Sheet = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }

      Sheet.VERSION  = '1.1.0'
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
            setTimeout(function(){
                if($this.options.self){
                   $(modal).addClass('modal--active');
                   $(modal).find('.modal__content').addClass('modal__content--active');  
                } 
                else $(modal).addClass('active')
            }, 0);
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

      Modal.prototype.makeTemdiv=function(trig,modal){
            this.$tmpDiv = $(document.createElement('div'))
                  .addClass('modal__temp')
                  .appendTo(trig)
            this.moveTrig(trig, modal, this.$tmpDiv);
      }

      Modal.prototype.moveTrig=function(trig,modal,tmpDiv){
          var $this=this;
          var trigProps = trig.getBoundingClientRect();
          var m = modal;
          var mProps = m.querySelector('.modal__content').getBoundingClientRect();
          var transX, transY, scaleX, scaleY;
          var xc = window.innerWidth / 2;
          var yc = window.innerHeight / 2;

          // this class increases z-index value so the button goes overtop the other buttons
          trig.classList.add('modal__trigger--active');

          // these values are used for scale the temporary div to the same size as the modal
          scaleX = mProps.width / trigProps.width;
          scaleY = mProps.height / trigProps.height;

          scaleX = scaleX.toFixed(3); // round to 3 decimal places
          scaleY = scaleY.toFixed(3);


          // these values are used to move the button to the center of the window
          transX = Math.round(xc - trigProps.left - trigProps.width / 2);
          transY = Math.round(yc - trigProps.top - trigProps.height / 2);

          // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
          if (m.classList.contains('modal--align-top')) {
            transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
          }
          // translate button to center of screen
          trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
          trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
          // expand temporary div to the same size as the modal
          $(tmpDiv).css('transform','scale(' + scaleX + ',' + scaleY + ')');
          $(tmpDiv).css('webkitTransform','scale(' + scaleX + ',' + scaleY + ')');
          window.setTimeout(function() {
            window.requestAnimationFrame(function() {
               $this.show();
            });
          }, 400);
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
                if(data.options.self){
                   var len = data.options.target.length;
                   var modalIdTrimmed = data.options.target.substring(1, len);
                   var modalDiv=document.getElementById(modalIdTrimmed); 
                   data.makeTemdiv(_relatedTarget,modalDiv);
                }else{
                    if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                    else if (options.show) data.show(_relatedTarget)    
                } 
                
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

  var activeSegment=function(e){

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
}

window.addEventListener('touchend', activeSegment);
window.addEventListener('click', function (e) {
    if (getTarget(e.target)) {
      e.preventDefault();
    }
    activeSegment(e);
  });

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
