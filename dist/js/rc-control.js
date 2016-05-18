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
 * history.js 
 * https://github.com/browserstate/history.js/
 * ========================================================================
 * Copyright © 2014+ Bevry Pty Ltd us@bevry.me (http://bevry.me) 
 * Copyright © 2011-2013 Benjamin Lupton b@lupton.cc (http://balupton.com)
 * The New BSD License (https://github.com/browserstate/history.js/blob/master/LICENSE.md)
 * ======================================================================== */
(function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}},typeof n.init!="undefined"&&n.init()})(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=e.sessionStorage||!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window)

/* ========================================================================
*! jquery.finger - v0.1.4 - 2015-12-02
* https://github.com/ngryman/jquery.finger
* Copyright (c) 2015 Nicolas Gryman; Licensed MIT 
 * ======================================================================== */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){function b(c){c.preventDefault(),a.event.remove(v,"click",b)}function c(a,b){return(q?b.originalEvent.touches[0]:b)["page"+a.toUpperCase()]}function d(c,d,e){var h=a.Event(d,x);a.event.trigger(h,{originalEvent:c},c.target),h.isDefaultPrevented()&&(~d.indexOf("tap")&&!q?a.event.add(v,"click",b):c.preventDefault()),e&&(a.event.remove(v,t+"."+u,f),a.event.remove(v,s+"."+u,g))}function e(e){var l=e.timeStamp||+new Date;j!=l&&(j=l,w.x=x.x=c("x",e),w.y=x.y=c("y",e),w.time=l,w.target=e.target,x.orientation=null,x.end=!1,h=!1,i=!1,k=setTimeout(function(){i=!0,d(e,"press")},y.pressDuration),a.event.add(v,t+"."+u,f),a.event.add(v,s+"."+u,g),y.preventDefault&&(e.preventDefault(),a.event.add(v,"click",b)))}function f(b){if(x.x=c("x",b),x.y=c("y",b),x.dx=x.x-w.x,x.dy=x.y-w.y,x.adx=Math.abs(x.dx),x.ady=Math.abs(x.dy),h=x.adx>y.motionThreshold||x.ady>y.motionThreshold){for(clearTimeout(k),x.orientation||(x.adx>x.ady?(x.orientation="horizontal",x.direction=x.dx>0?1:-1):(x.orientation="vertical",x.direction=x.dy>0?1:-1));b.target&&b.target!==w.target;)b.target=b.target.parentNode;return b.target!==w.target?(b.target=w.target,void g.call(this,a.Event(s+"."+u,b))):void d(b,"drag")}}function g(a){var b,c=a.timeStamp||+new Date,e=c-w.time;if(clearTimeout(k),h||i||a.target!==w.target)a.target=w.target,e<y.flickDuration&&d(a,"flick"),x.end=!0,b="drag";else{var f=l===a.target&&c-m<y.doubleTapInterval;b=f?"doubletap":"tap",l=f?null:w.target,m=c}d(a,b,!0)}var h,i,j,k,l,m,n=navigator.userAgent,o=/chrome/i.exec(n),p=/android/i.exec(n),q="ontouchstart"in window&&!(o&&!p),r=q?"touchstart":"mousedown",s=q?"touchend touchcancel":"mouseup mouseleave",t=q?"touchmove":"mousemove",u="finger",v=a("html")[0],w={},x={},y=a.Finger={pressDuration:300,doubleTapInterval:300,flickDuration:150,motionThreshold:5};return a.event.add(v,r+"."+u,e),a.each("tap doubletap press drag flick".split(" "),function(b,c){a.fn[c]=function(a){return a?this.on(c,a):this.trigger(c)}}),y});



/* ========================================================================
 * Ratchet: push.js v2.0.2
 * http://goratchet.com/components#push
 * ========================================================================
 * inspired by @defunkt's jquery.pjax.js
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

/* global _gaq: true */

!(function () {
  'use strict';

  var noop = function () {};


  // Pushstate caching
  // ==================

  var isScrolling;
  var maxCacheLength = 20;
  var cacheMapping   = sessionStorage;
  var domCache       = {};
  var transitionMap  = {
    slideIn  : 'slide-out',
    slideOut : 'slide-in',
    fade     : 'fade'
  };

  var bars = {
    bartab             : '.bar-tab',
    barnav             : '.bar-nav',
    barfooter          : '.bar-footer',
    barheadersecondary : '.bar-header-secondary'
  };

  var cacheReplace = function (data, updates) {
    PUSH.id = data.id;
    if (updates) {
      data = getCached(data.id);
    }
    cacheMapping[data.id] = JSON.stringify(data);
    window.history.replaceState(data.id, data.title, data.url);
    domCache[data.id] = document.body.cloneNode(true);
  };

  var cachePush = function () {
    var id = PUSH.id;

    var cacheForwardStack = JSON.parse(cacheMapping.cacheForwardStack || '[]');
    var cacheBackStack    = JSON.parse(cacheMapping.cacheBackStack    || '[]');

    cacheBackStack.push(id);

    while (cacheForwardStack.length) {
      delete cacheMapping[cacheForwardStack.shift()];
    }
    while (cacheBackStack.length > maxCacheLength) {
      delete cacheMapping[cacheBackStack.shift()];
    }

    window.history.pushState(null, '', cacheMapping[PUSH.id].url);

    cacheMapping.cacheForwardStack = JSON.stringify(cacheForwardStack);
    cacheMapping.cacheBackStack    = JSON.stringify(cacheBackStack);
  };

  var cachePop = function (id, direction) {
    var forward           = direction === 'forward';
    var cacheForwardStack = JSON.parse(cacheMapping.cacheForwardStack || '[]');
    var cacheBackStack    = JSON.parse(cacheMapping.cacheBackStack    || '[]');
    var pushStack         = forward ? cacheBackStack    : cacheForwardStack;
    var popStack          = forward ? cacheForwardStack : cacheBackStack;

    if (PUSH.id) {
      pushStack.push(PUSH.id);
    }
    popStack.pop();

    cacheMapping.cacheForwardStack = JSON.stringify(cacheForwardStack);
    cacheMapping.cacheBackStack    = JSON.stringify(cacheBackStack);
  };

  var getCached = function (id) {
    return JSON.parse(cacheMapping[id] || null) || {};
  };

  var getTarget = function (e) {
    var target = findTarget(e.target);

    if (!target ||
        e.which > 1 ||
        e.metaKey ||
        e.ctrlKey ||
        isScrolling ||
        location.protocol !== target.protocol ||
        location.host     !== target.host ||
        !target.hash && /#/.test(target.href) ||
        target.hash && target.href.replace(target.hash, '') === location.href.replace(location.hash, '') ||
        target.getAttribute('data-ignore') === 'push') { return; }

    return target;
  };


  // Main event handlers (touchend, popstate)
  // ==========================================

  var touchend = function (e) {
    var target = getTarget(e);

    if (!target) {
      return;
    }

    e.preventDefault();

    PUSH({
      url        : target.href,
      hash       : target.hash,
      timeout    : target.getAttribute('data-timeout'),
      transition : target.getAttribute('data-transition')
    });
  };
  
   // popstate 이벤트(백버튼) 체크 함수 
   var checkPopstate=function(){
        var CurrentIndex=History.getCurrentIndex();
        var CurrentObj=History.getStateByIndex(CurrentIndex);
        CurrentObj=JSON.stringify(CurrentObj);
        var ForwardIndex=parseInt(CurrentIndex)-1;
        var ForwardObj=History.getStateByIndex(ForwardIndex); // 직전 object 
        var ForwardObj=JSON.stringify(ForwardObj);
        var result=$.parseJSON(ForwardObj);
        //History.log('직전 history : state =' +ForwardObj+'/ index='+ForwardIndex);
        var objType=result.data.type; // modal, page, popover, popup,...     
        var objTarget=result.data.target; // modal, page, popover..의 id 정보          
        return [objType,objTarget];
   };

  var popstate = function (e) {
    var key;
    var barElement;
    var activeObj;
    var activeDom;
    var direction;
    var transition;
    var transitionFrom;
    var transitionFromObj;
    var id = e.state;

    if (!id || !cacheMapping[id]) {
      return;
    }
    // 컴포넌트 back 버튼 회피     
    var checkPop=checkPopstate();
    var objType=checkPop[0];
    
    if(objType!=undefined) return;
    else {
       direction = PUSH.id < id ? 'forward' : 'back';

        cachePop(id, direction);

        activeObj = getCached(id);
        activeDom = domCache[id];

        if (activeObj.title) {
          document.title = activeObj.title;
        }

        if (direction === 'back') {
          transitionFrom    = JSON.parse(direction === 'back' ? cacheMapping.cacheForwardStack : cacheMapping.cacheBackStack);
          transitionFromObj = getCached(transitionFrom[transitionFrom.length - 1]);
        } else {
          transitionFromObj = activeObj;
        }

        if (direction === 'back' && !transitionFromObj.id) {
          return (PUSH.id = id);
        }

        transition = direction === 'back' ? transitionMap[transitionFromObj.transition] : transitionFromObj.transition;
        //console.log(activeDom);

        if (!activeDom) {
          return PUSH({
            id         : activeObj.id,
            url        : activeObj.url,
            title      : activeObj.title,
            timeout    : activeObj.timeout,
            transition : transition,
            ignorePush : true
          });
        }

        if (transitionFromObj.transition) {
          activeObj = extendWithDom(activeObj, '.content', activeDom.cloneNode(true));
          for (key in bars) {
            if (bars.hasOwnProperty(key)) {
              barElement = document.querySelector(bars[key]);
              if (activeObj[key]) {
                swapContent(activeObj[key], barElement);
              } else if (barElement) {
                barElement.parentNode.removeChild(barElement);
              }
            }
          }
        }

        swapContent(
          (activeObj.contents || activeDom).cloneNode(true),
          document.querySelector('.content'),
          transition
        );

        PUSH.id = id;

        document.body.offsetHeight; // force reflow to prevent scroll
    }

    
  };


  // Core PUSH functionality
  // =======================

  var PUSH = function (options) {
    var key;
    var xhr = PUSH.xhr;

    options.container = options.container || options.transition ? document.querySelector('.content') : document.body;

    for (key in bars) {
      if (bars.hasOwnProperty(key)) {
        options[key] = options[key] || document.querySelector(bars[key]);
      }
    }

    if (xhr && xhr.readyState < 4) {
      xhr.onreadystatechange = noop;
      xhr.abort();
    }

    xhr = new XMLHttpRequest();
    xhr.open('GET', options.url, true);
    xhr.setRequestHeader('X-PUSH', 'true');

    xhr.onreadystatechange = function () {
      if (options._timeout) {
        clearTimeout(options._timeout);
      }
      if (xhr.readyState === 4) {
        xhr.status === 200 ? success(xhr, options) : failure(options.url);
      }
    };

    if (!PUSH.id) {
      cacheReplace({
        id         : +new Date(),
        url        : window.location.href,
        title      : document.title,
        timeout    : options.timeout,
        transition : null
      });
    }

    if (options.timeout) {
      options._timeout = setTimeout(function () {  xhr.abort('timeout'); }, options.timeout);
    }

    xhr.send();

    if (xhr.readyState && !options.ignorePush) {
      cachePush();
    }
  };


  // Main XHR handlers
  // =================

  var success = function (xhr, options) {
    var key;
    var barElement;
    var data = parseXHR(xhr, options);

    if (!data.contents) {
      return locationReplace(options.url);
    }

    if (data.title) {
      document.title = data.title;
    }

    if (options.transition) {
      for (key in bars) {
        if (bars.hasOwnProperty(key)) {
          barElement = document.querySelector(bars[key]);
          if (data[key]) {
            swapContent(data[key], barElement);
          } else if (barElement) {
            barElement.parentNode.removeChild(barElement);
          }
        }
      }
    }

    swapContent(data.contents, options.container, options.transition, function () {
      cacheReplace({
        id         : options.id || +new Date(),
        url        : data.url,
        title      : data.title,
        timeout    : options.timeout,
        transition : options.transition
      }, options.id);
      triggerStateChange();
    });

    if (!options.ignorePush && window._gaq) {
      _gaq.push(['_trackPageview']); // google analytics
    }
    if (!options.hash) {
      return;
    }
  };

  var failure = function (url) {
    throw new Error('Could not get: ' + url);
  };


  // PUSH helpers
  // ============

  var swapContent = function (swap, container, transition, complete) {
    var enter;
    var containerDirection;
    var swapDirection;

    if (!transition) {
      if (container) {
        container.innerHTML = swap.innerHTML;
      } else if (swap.classList.contains('content')) {
        document.body.appendChild(swap);
      } else {
        document.body.insertBefore(swap, document.querySelector('.content'));
      }
    } else {
      enter  = /in$/.test(transition);

      if (transition === 'fade') {
        container.classList.add('in');
        container.classList.add('fade');
        swap.classList.add('fade');
      }

      if (/slide/.test(transition)) {
        swap.classList.add('sliding-in', enter ? 'right' : 'left');
        swap.classList.add('sliding');
        container.classList.add('sliding');
      }

      container.parentNode.insertBefore(swap, container);
    }

    if (!transition) {
      complete && complete();
    }

    if (transition === 'fade') {
      container.offsetWidth; // force reflow
      container.classList.remove('in');
      var fadeContainerEnd = function () {
        container.removeEventListener('webkitTransitionEnd', fadeContainerEnd);
        swap.classList.add('in');
        swap.addEventListener('webkitTransitionEnd', fadeSwapEnd);
      };
      var fadeSwapEnd = function () {
        swap.removeEventListener('webkitTransitionEnd', fadeSwapEnd);
        container.parentNode.removeChild(container);
        swap.classList.remove('fade');
        swap.classList.remove('in');
        complete && complete();
      };
      container.addEventListener('webkitTransitionEnd', fadeContainerEnd);

    }

    if (/slide/.test(transition)) {
      var slideEnd = function () {
        swap.removeEventListener('webkitTransitionEnd', slideEnd);
        swap.classList.remove('sliding', 'sliding-in');
        swap.classList.remove(swapDirection);
        container.parentNode.removeChild(container);
        complete && complete();
      };

      container.offsetWidth; // force reflow
      swapDirection      = enter ? 'right' : 'left';
      containerDirection = enter ? 'left' : 'right';
      container.classList.add(containerDirection);
      swap.classList.remove(swapDirection);
      swap.addEventListener('webkitTransitionEnd', slideEnd);
    }
  };

  var triggerStateChange = function () {
    var e = new CustomEvent('push', {
      detail: { state: getCached(PUSH.id) },
      bubbles: true,
      cancelable: true
    });

    window.dispatchEvent(e);
  };

  var findTarget = function (target) {
    var i;
    var toggles = document.querySelectorAll('[data-control="push"]');

    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) {
        if (toggles[i] === target) {
          return target;
        }
      }
    }
  };

  var locationReplace = function (url) {
    window.history.replaceState(null, '', '#');
    window.location.replace(url);
  };

  var extendWithDom = function (obj, fragment, dom) {
    var i;
    var result = {};

    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = obj[i];
      }
    }

    Object.keys(bars).forEach(function (key) {
      var el = dom.querySelector(bars[key]);
      if (el) {
        el.parentNode.removeChild(el);
      }
      result[key] = el;
    });

    result.contents = dom.querySelector(fragment);

    return result;
  };

  var parseXHR = function (xhr, options) {
    var head;
    var body;
    var data = {};
    var responseText = xhr.responseText;

    data.url = options.url;

    if (!responseText) {
      return data;
    }

    if (/<html/i.test(responseText)) {
      head           = document.createElement('div');
      body           = document.createElement('div');
      head.innerHTML = responseText.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
      body.innerHTML = responseText.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0];
    } else {
      head           = body = document.createElement('div');
      head.innerHTML = responseText;
    }

    data.title = head.querySelector('title');
    var text = 'innerText' in data.title ? 'innerText' : 'textContent';
    data.title = data.title && data.title[text].trim();

    if (options.transition) {
      data = extendWithDom(data, '.content', body);
    } else {
      data.contents = body;
    }

    return data;
  };


  // Attach PUSH event handlers
  // ==========================

  window.addEventListener('touchstart', function () { isScrolling = false; });
  window.addEventListener('touchmove', function () { isScrolling = true; });
  window.addEventListener('touchend', touchend);
  window.addEventListener('click', function (e) { if (getTarget(e)) {e.preventDefault();} });
  window.addEventListener('popstate', popstate);
  window.PUSH = PUSH;

}());
