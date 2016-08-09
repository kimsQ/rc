/* ========================================================================
 * Ratchet Plus: Utility.js v1.0.0
 * http://rc.kimsq.com/controls/utility/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
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
                 var target=$(component).find('[data-role="'+key+'"]');
                 var strVal=String(val);
                 var valArr=strVal.split('::');
                 if(valArr.length ==2){
                     var valType=valArr[0];
                     var valName=valArr[1];
                     if(valType=='bg') $(target).css('background-image','url('+val+')');
                     else if(valType=='img') $(target).attr('src',val);
                     else if(valType=='inputText') $(target).val(val);
                     else if(valType=='html') $(target).html(val);
                 }else{
                     $(target).text(val);
                 }
            });
      }

      Utility.prototype.addHistoryObject=function(object,title,url){
            var _url=url!=null?url:'##';
            History.pushState(object, title, _url);
      }

      Utility.prototype.resetHistoryObject=function(objType,objTarget){
            var ctime=300;
            if(objType=='page'){
                  var object=objTarget.load;
                  $(object).page('historyHide');
            }else if(objType=='modal'){
                  var object=objTarget;
                  $(object).removeClass('active');
                  setTimeout(function(){$(object).hide();},ctime);
                  $(object).modal('historyHide');
            }else if(objType=='popover' || objType=='popup' || objType=='sheet' || objType=='fbutton' || objType=='drawer'  ){
                  var object=objTarget.id;
                  var bcontainer=objTarget.bcontainer;
                  var backdrop=objTarget.backdrop;
                  var placement=objTarget.placement;
                  $(object).removeClass('active');
                  if(objType!='fbutton' && objType!='drawer') setTimeout(function(){$(object).hide();},ctime);
                  if(backdrop) $(bcontainer).find('.backdrop').remove();
                  if(objType=='popover') $(object).popover('historyHide');
                  else if(objType=='sheet') $(object).sheet('historyHide');
                  else if(objType=='popup') $(object).popup('historyHide');
                  else if(objType=='fbutton') $(object).fbutton('historyHide');
                  else if(objType=='drawer') $(object).drawer('historyHide');
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

      // push bind Affix
      var checkScroll=function(){
          $('[data-control="scroll"]').each(function () {
		      var $spy = $(this)
		      var data = $spy.data()
                 data.offset = data.offset || {}

		      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
		      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

                 $spy.scroll($(this).data());

	    })
      }

      window.addEventListener('push', checkScroll);

       // history.back
      $(document).on('tap','[data-history="back"]',function(e){
             e.preventDefault();
             history.back();
       });

      // Scroll Top
	$(document).on('tap', '[data-scroll="top"]', function(e) {
	       var target=e.currentTarget;
	       var speed=$(target).data('speed')?$(target).data('speed'):'fast';
	      $('.content').animate({scrollTop: 0},speed);
	      return false;
	});

	// Document Reload
	$(document).on('tap', '[data-location="reload"]', function() {
	      window.location.reload();
	});

      var utility=new Utility(null,null).init();
      window.addEventListener('popstate', utility.popComponentState);

      window.Utility = Utility;

})(jQuery);
