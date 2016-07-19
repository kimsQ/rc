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

/*=======================================================================================
* Fire Tap Event 
*! jquery.finger - v0.1.4 - 2015-12-02
* https://github.com/ngryman/jquery.finger
* Copyright (c) 2015 Nicolas Gryman; Licensed MIT 
*=======================================================================================*/

!(function (factory) {
	if (typeof define === 'function' && define.amd)
		define(['jquery'], factory);
	else if (typeof exports === 'object')
		factory(require('jquery'));
	else
		factory(jQuery);
}(function ($) {

	var ua = navigator.userAgent,
		isChrome = /chrome/i.exec(ua),
		isAndroid = /android/i.exec(ua),
		hasTouch = 'ontouchstart' in window && !(isChrome && !isAndroid),
		startEvent = hasTouch ? 'touchstart' : 'mousedown',
		stopEvent = hasTouch ? 'touchend touchcancel' : 'mouseup mouseleave',
		moveEvent = hasTouch ? 'touchmove' : 'mousemove',

		namespace = 'finger',
		rootEl = $('html')[0],

		start = {},
		move = {},
		motion,
		cancel,
		safeguard,
		timeout,
		prevEl,
		prevTime,

		Finger = $.Finger = {
			pressDuration: 300,
			doubleTapInterval: 300,
			flickDuration: 150,
			motionThreshold: 5
		};

	function preventDefault(event) {
		event.preventDefault();
		$.event.remove(rootEl, 'click', preventDefault);
	}

	function page(coord, event) {
		return (hasTouch ? event.originalEvent.touches[0] : event)['page' + coord.toUpperCase()];
	}

	function trigger(event, evtName, remove) {
		var fingerEvent = $.Event(evtName, move);
		$.event.trigger(fingerEvent, { originalEvent: event }, event.target);

		if (fingerEvent.isDefaultPrevented()) {
			if (~evtName.indexOf('tap') && !hasTouch)
				$.event.add(rootEl, 'click', preventDefault);
			else
				event.preventDefault();
		}

		if (remove) {
			$.event.remove(rootEl, moveEvent + '.' + namespace, moveHandler);
			$.event.remove(rootEl, stopEvent + '.' + namespace, stopHandler);
		}
	}

	function startHandler(event) {
		var timeStamp = event.timeStamp || +new Date();

		if (safeguard == timeStamp) return;
		safeguard = timeStamp;

		//get event.target attribute by kiere@kimsq.com
		var isInSwiper=$(event.target).parent().data('swiper') || $(event.target).data('swiper');
		var pressDuration;
		if(isInSwiper)  pressDuration=150;
		else pressDuration=1000;

		// initializes data
		start.x = move.x = page('x', event);
		start.y = move.y = page('y', event);
		start.time = timeStamp;
		start.target = event.target;
		move.orientation = null;
		move.end = false;
		motion = false;
		cancel = false;
		timeout = setTimeout(function() {
			cancel = true;
			trigger(event, 'press');
		}, pressDuration);

		$.event.add(rootEl, moveEvent + '.' + namespace, moveHandler);
		$.event.add(rootEl, stopEvent + '.' + namespace, stopHandler);

		// global prevent default
		if (Finger.preventDefault) {
			event.preventDefault();
			$.event.add(rootEl, 'click', preventDefault);
		}
	}

	function moveHandler(event) {
		// motion data
		move.x = page('x', event);
		move.y = page('y', event);
		move.dx = move.x - start.x;
		move.dy = move.y - start.y;
		move.adx = Math.abs(move.dx);
		move.ady = Math.abs(move.dy);

		// security
		motion = move.adx > Finger.motionThreshold || move.ady > Finger.motionThreshold;
		if (!motion) return;

		// moves cancel press events
		clearTimeout(timeout);

		// orientation
		if (!move.orientation) {
			if (move.adx > move.ady) {
				move.orientation = 'horizontal';
				move.direction = move.dx > 0 ? +1 : -1;
			}
			else {
				move.orientation = 'vertical';
				move.direction = move.dy > 0 ? +1 : -1;
			}
		}

		// for delegated events, the target may change over time
		// this ensures we notify the right target and simulates the mouseleave behavior
		while (event.target && event.target !== start.target)
			event.target = event.target.parentNode;
		if (event.target !== start.target) {
			event.target = start.target;
			stopHandler.call(this, $.Event(stopEvent + '.' + namespace, event));
			return;
		}

		// fire drag event
		trigger(event, 'drag');
	}

	function stopHandler(event) {
		var timeStamp = event.timeStamp || +new Date(),
			dt = timeStamp - start.time,
			evtName;

		// always clears press timeout
		clearTimeout(timeout);

		// tap-like events
		// triggered only if targets match
		if (!motion && !cancel && event.target === start.target) {
			var doubleTap = prevEl === event.target && timeStamp - prevTime < Finger.doubleTapInterval;
			evtName = doubleTap ? 'doubletap' : 'tap';
			prevEl = doubleTap ? null : start.target;
			prevTime = timeStamp;
		}
		// motion events
		else {
			// ensure last target is set the initial one
			event.target = start.target;
			if (dt < Finger.flickDuration) trigger(event, 'flick');
			move.end = true;
			evtName = 'drag';
		}

		trigger(event, evtName, true);
	}

	// initial binding
	$.event.add(rootEl, startEvent + '.' + namespace, startHandler);

	// expose events as methods
	$.each('tap doubletap press drag flick'.split(' '), function(i, name) {
		$.fn[name] = function(fn) {
			return fn ? this.on(name, fn) : this.trigger(name);
		};
	});

	return Finger;

}));


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
  window.addEventListener('click', touchend);
  window.addEventListener('popstate', popstate);
  window.PUSH = PUSH;

}());

/* ========================================================================
* Loading plugin for jQuery
* version: v1.0.6
 * ========================================================================
* @author Laurent Blanes <laurent.blanes@gmail.com>
* Copyright 2013, Laurent Blanes ( https://github.com/hekigan/is-loading )
* The MIT License (MIT)
* Copyright (c) 2013 Laurent Blanes
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
/* ========================================================================*/

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "loader",
        defaults = {
            'position': "right",        // right | inside | overlay
            'text': "Loading ...",                 // Text to display next to the loader
            'prefix' : "rc", // custom prefix for css 
            'iconClass': "rc-icon spinner",    // loader CSS class
            'tpl': '<span class="%prefix%-loading-wrapper %wrapper%"><span class="%iconClass%"><div class="loader">Loading...</div></span>%text%</span>',    // loader base Tag
            'disableSource': true,      // true | false
            'disableOthers': []
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        
        // Merge user options with default ones
        this.options = $.extend( {}, defaults, options );

        this._defaults     = defaults;
        this._name         = pluginName;
        this._loader       = null;                // Contain the loading tag element

        this.init();
    }

    // Contructor function for the plugin (only once on page load)
    function contruct() {

        if ( !$[pluginName] ) {
            $.loader = function( opts ) {
                $( "body" ).loader( opts );
            };
        }
    }
    
    Plugin.prototype = {
        
        init: function() {
            
            if( $( this.element ).is( "body") ) {
                this.options.position = "overlay";
            }
            this.show();
        },

        show: function() {

            var self = this,
            prefix=self.options.prefix, // prefix 
            tpl = self.options.tpl.replace( '%wrapper%', ' isloading-show ' );
            //tpl = tpl.replace( '%class%', self.options['class'] );
            tpl = tpl.replace( '%iconClass%', self.options['iconClass'] );
            tpl = tpl.replace( '%prefix%', self.options['prefix']); // prefix
            tpl = tpl.replace( '%text%', ( self.options.text !== "" ) ? self.options.text + ' ' : '' );
            self._loader = $( tpl );
            
            // Disable the element
            if( $( self.element ).is( "input, textarea" ) && true === self.options.disableSource ) {

                $( self.element ).attr( "disabled", "disabled" );

            }
            else if( true === self.options.disableSource ) {

                $( self.element ).addClass( "disabled" );

            }

            // Set position
            switch( self.options.position ) {
                
                case "inside":
                    $( self.element ).html( self._loader );
                    break;

                case "overlay":
                    var $wrapperTpl = null;

                    if( $( self.element ).is( "body") ) {
                        //$wrapperTpl = $('<div class="rc-loading-overlay" style="z-index:11">');
                        $wrapperTpl = $('<div class="'+prefix-'-loading-overlay" style="z-index:11">');

                        $( "body" ).prepend( $wrapperTpl );

                        $( window ).on('resize', function() {
                            $wrapperTpl.height( $(window).height() + 'px' );
                            self._loader.css({top: ($(window).height()/2 - self._loader.outerHeight()/2) + 'px' });
                        });
                    } else {
                        var cssPosition = $( self.element ).css('position'),
                            pos = {},
                            height = $( self.element ).outerHeight() + 'px',
                            width = '100%'; // $( self.element ).outerWidth() + 'px;

                        if( 'relative' === cssPosition || 'absolute' === cssPosition ) {
                            pos = { 'top': 0,  'left': 0 };
                        } else {
                            pos = $( self.element ).position();
                        }
                        $wrapperTpl = $('<div class="'+prefix+'-loading-overlay">');
                        $( self.element ).prepend( $wrapperTpl );

                        $( window ).on('resize', function() {
                            $wrapperTpl.height( $( self.element ).outerHeight() + 'px' );
                            self._loader.css({top: ($wrapperTpl.outerHeight()/2 - self._loader.outerHeight()/2) + 'px' });
                        });
                    }

                    $wrapperTpl.html( self._loader );
                    self._loader.css({top: ($wrapperTpl.outerHeight()/2 - self._loader.outerHeight()/2) + 'px' });
                    break;

                default:
                    $( self.element ).after( self._loader );
                    break;
            }

            self.disableOthers();
        },

        hide: function() {

        	  var prefix=this.options.prefix; // prefix 

            if( "overlay" === this.options.position ) {

                $( this.element ).find( "."+prefix+"-loading-overlay" ).first().remove();

            } else {

                $( this._loader ).remove();
                $( this.element ).text( $( this.element ).attr( "data-isloading-label" ) );

            }

            $( this.element ).removeAttr("disabled").removeClass("disabled");

            this.enableOthers();
        },

        disableOthers: function() {
            $.each(this.options.disableOthers, function( i, e ) {
                var elt = $( e );
                if( elt.is( "button, input, textarea" ) ) {
                    elt.attr( "disabled", "disabled" );
                }
                else {
                    elt.addClass( "disabled" );
                }
            });
        },

        enableOthers: function() {
            $.each(this.options.disableOthers, function( i, e ) {
                var elt = $( e );
                if( elt.is( "button, input, textarea" ) ) {
                    elt.removeAttr( "disabled" );
                }
                else {
                    elt.removeClass( "disabled" );
                }
            });
        }
    };
    
    // Constructor
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( options && "hide" !== options || !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            } else {
                var elt = $.data( this, "plugin_" + pluginName );

                if( "hide" === options )    { elt.hide(); }
                else                        { elt.show(); }
            }
        });
    };
    
    contruct();

})( jQuery, window, document );

/*
* Project: Bootstrap Notify = v3.1.5
* Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
* Author: Mouse0270 aka Robert McIntosh
* License: MIT License
* Website: https://github.com/mouse0270/bootstrap-growl
*/

/* global define:false, require: false, jQuery:false */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	// Create the defaults once
	var defaults = {
		element: 'body',
		position: null,
		type: "info",
		allow_dismiss: true,
		allow_duplicates: true,
		newest_on_top: false,
		showProgressbar: false,
		placement: {
			from: "bottom",
			align: "center"
		},
		offset: 20,
		spacing: 10,
		z_index: 1031,
		delay: 1000,
		timer: 1000,
		url_target: '_blank',
		mouse_over: null,
		animate: {
			enter: 'animated fadeInUp',
			exit: 'animated fadeOutDown'
		},
		onShow: null,
		onShown: null,
		onClose: null,
		onClosed: null,
          onClick: null,
		icon_type: 'class',
		template: '<span data-notify="container" class="alert alert-{0}">{2}</span>'
	};

	String.format = function () {
		var str = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
		}
		return str;
	};

	function isDuplicateNotification(notification) {
		var isDupe = false;

		$('[data-notify="container"]').each(function (i, el) {
			var $el = $(el);
			var title = $el.find('[data-notify="title"]').html().trim();
			var message = $el.find('[data-notify="message"]').html().trim();

			// The input string might be different than the actual parsed HTML string!
			// (<br> vs <br /> for example)
			// So we have to force-parse this as HTML here!
			var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
			var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
			var isSameType = $el.hasClass('alert-' + notification.settings.type);

			if (isSameTitle && isSameMsg && isSameType) {
				//we found the dupe. Set the var and stop checking.
				isDupe = true;
			}
			return !isDupe;
		});

		return isDupe;
	}

	function Notify(element, content, options) {
		// Setup Content of Notify
		var contentObj = {
			content: {
				message: typeof content === 'object' ? content.message : content,
				title: content.title ? content.title : '',
				icon: content.icon ? content.icon : '',
				url: content.url ? content.url : '#',
				target: content.target ? content.target : '-'
			}
		};

		options = $.extend(true, {}, contentObj, options);
		this.settings = $.extend(true, {}, defaults, options);
		this._defaults = defaults;
		if (this.settings.content.target === "-") {
			this.settings.content.target = this.settings.url_target;
		}
		this.animations = {
			start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
			end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
		};

		if (typeof this.settings.offset === 'number') {
			this.settings.offset = {
				x: this.settings.offset,
				y: this.settings.offset
			};
		}

		//if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
		if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
			this.init();
		}
	}

	$.extend(Notify.prototype, {
		init: function () {
			var self = this;

			this.buildNotify();
			if (this.settings.content.icon) {
				this.setIcon();
			}
			if (this.settings.content.url != "#") {
				this.styleURL();
			}
			this.styleDismiss();
			this.placement();
			this.bind();

			this.notify = {
				$ele: this.$ele,
				update: function (command, update) {
					var commands = {};
					if (typeof command === "string") {
						commands[command] = update;
					} else {
						commands = command;
					}
					for (var cmd in commands) {
						switch (cmd) {
							case "type":
								this.$ele.removeClass('alert-' + self.settings.type);
								this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
								self.settings.type = commands[cmd];
								this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
								break;
							case "icon":
								var $icon = this.$ele.find('[data-notify="icon"]');
								if (self.settings.icon_type.toLowerCase() === 'class') {
									$icon.removeClass(self.settings.content.icon).addClass(commands[cmd]);
								} else {
									if (!$icon.is('img')) {
										$icon.find('img');
									}
									$icon.attr('src', commands[cmd]);
								}
								self.settings.content.icon = commands[command];
								break;
							case "progress":
								var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
								this.$ele.data('notify-delay', newDelay);
								this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
								break;
							case "url":
								this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
								break;
							case "target":
								this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
								break;
							default:
								this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
						}
					}
					var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
					self.reposition(posX);
				},
				close: function () {
					self.close();
				}
			};

		},
		buildNotify: function () {
			var content = this.settings.content;
			this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
			this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
			if (!this.settings.allow_dismiss) {
				this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
			}
			if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
				this.$ele.find('[data-notify="progressbar"]').remove();
			}
		},
		setIcon: function () {
			if (this.settings.icon_type.toLowerCase() === 'class') {
				this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon);
			} else {
				if (this.$ele.find('[data-notify="icon"]').is('img')) {
					this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
				} else {
					this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
				}
			}
		},
		styleDismiss: function () {
			this.$ele.find('[data-notify="dismiss"]').css({
				position: 'absolute',
				right: '10px',
				top: '5px',
				zIndex: this.settings.z_index + 2
			});
		},
		styleURL: function () {
			this.$ele.find('[data-notify="url"]').css({
				backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
				height: '100%',
				left: 0,
				position: 'absolute',
				top: 0,
				width: '100%',
				zIndex: this.settings.z_index + 1
			});
		},
		placement: function () {
			var self = this,
				offsetAmt = this.settings.offset.y,
				css = {
					display: 'inline-block',
					margin: '0px auto',
					position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
					transition: 'all .5s ease-in-out',
					zIndex: this.settings.z_index
				},
				hasAnimation = false,
				settings = this.settings;

			$('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
				offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
			});
			if (this.settings.newest_on_top === true) {
				offsetAmt = this.settings.offset.y;
			}
			css[this.settings.placement.from] = offsetAmt + 'px';

			switch (this.settings.placement.align) {
				case "left":
				case "right":
					css[this.settings.placement.align] = this.settings.offset.x + 'px';
					break;
				case "center":
					css.left = 0;
					css.right = 0;
					break;
			}
			this.$ele.css(css).addClass(this.settings.animate.enter);
			$.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index, prefix) {
				self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
			});

			$(this.settings.element).append(this.$ele);

			if (this.settings.newest_on_top === true) {
				offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
				this.reposition(offsetAmt);
			}

			if ($.isFunction(self.settings.onShow)) {
				self.settings.onShow.call(this.$ele);
			}

			this.$ele.one(this.animations.start, function () {
				hasAnimation = true;
			}).one(this.animations.end, function () {
				self.$ele.removeClass(self.settings.animate.enter);
				if ($.isFunction(self.settings.onShown)) {
					self.settings.onShown.call(this);
				}
			});

			setTimeout(function () {
				if (!hasAnimation) {
					if ($.isFunction(self.settings.onShown)) {
						self.settings.onShown.call(this);
					}
				}
			}, 600);
		},
		bind: function () {
			var self = this;

			this.$ele.find('[data-notify="dismiss"]').on('tap', function () {
				self.close();
			});

			if ($.isFunction(self.settings.onClick)) {
			    this.$ele.on('tap', function (event) {
			        if (event.target != self.$ele.find('[data-notify="dismiss"]')[0]) {
			            self.settings.onClick.call(this, event);
			        }
			    });
			}

			this.$ele.mouseover(function () {
				$(this).data('data-hover', "true");
			}).mouseout(function () {
				$(this).data('data-hover', "false");
			});
			this.$ele.data('data-hover', "false");

			if (this.settings.delay > 0) {
				self.$ele.data('notify-delay', self.settings.delay);
				var timer = setInterval(function () {
					var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
					if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
						var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
						self.$ele.data('notify-delay', delay);
						self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
					}
					if (delay <= -(self.settings.timer)) {
						clearInterval(timer);
						self.close();
					}
				}, self.settings.timer);
			}
		},
		close: function () {
			var self = this,
				posX = parseInt(this.$ele.css(this.settings.placement.from)),
				hasAnimation = false;

			this.$ele.attr('data-closing', 'true').addClass(this.settings.animate.exit);
			self.reposition(posX);

			if ($.isFunction(self.settings.onClose)) {
				self.settings.onClose.call(this.$ele);
			}

			this.$ele.one(this.animations.start, function () {
				hasAnimation = true;
			}).one(this.animations.end, function () {
				$(this).remove();
				if ($.isFunction(self.settings.onClosed)) {
					self.settings.onClosed.call(this);
				}
			});

			setTimeout(function () {
				if (!hasAnimation) {
					self.$ele.remove();
					if (self.settings.onClosed) {
						self.settings.onClosed(self.$ele);
					}
				}
			}, 600);
		},
		reposition: function (posX) {
			var self = this,
				notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
				$elements = this.$ele.nextAll(notifies);
			if (this.settings.newest_on_top === true) {
				$elements = this.$ele.prevAll(notifies);
			}
			$elements.each(function () {
				$(this).css(self.settings.placement.from, posX);
				posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
			});
		}
	});

	$.notify = function (content, options) {
		var plugin = new Notify(this, content, options);
		return plugin.notify;
	};
	$.notifyDefaults = function (options) {
		defaults = $.extend(true, {}, defaults, options);
		return defaults;
	};

	$.notifyClose = function (selector) {

		if (typeof selector === "undefined" || selector === "all") {
			$('[data-notify]').find('[data-notify="dismiss"]').trigger('tap');
		}else if(selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger'){
			$('.alert-' + selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('tap');
		} else if(selector){
			$(selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('tap');
		}
		else {
			$('[data-notify-position="' + selector + '"]').find('[data-notify="dismiss"]').trigger('tap');
		}
	};

	$.notifyCloseExcept = function (selector) {

		if(selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger'){
			$('[data-notify]').not('.alert-' + selector).find('[data-notify="dismiss"]').trigger('tap');
		} else{
			$('[data-notify]').not(selector).find('[data-notify="dismiss"]').trigger('tap');
		}
	};


}));

/*=======================================================================
 * Fuel UX Infinite Scroll (Need Above loader plugin )
 * https://github.com/ExactTarget/fuelux/blob/master/js/infinite-scroll.js
 *
 * Copyright (c) 2014 ExactTarget
 * Licensed under the BSD New license.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
        disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
        following disclaimer in the documentation and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
        products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *========================================================================*/


;(function ( $, window, document, undefined ) {

	var old = $.fn.infinitescroll;

	// INFINITE SCROLL CONSTRUCTOR AND PROTOTYPE

	var InfiniteScroll = function (element, options) {
		this.$element = $(element);
		this.$element.addClass('infinitescroll');
		this.options = $.extend({}, $.fn.infinitescroll.defaults, options);

		this.curScrollTop = this.$element.scrollTop();
		this.curPercentage = this.getPercentage();
		this.fetchingData = false;

		this.$element.on('scroll.fu.infinitescroll', $.proxy(this.onScroll, this));
		this.onScroll();
	};

	InfiniteScroll.prototype = {

		constructor: InfiniteScroll,

		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]

			// empty elements to return to original markup
			this.$element.empty();

			return this.$element[0].outerHTML;
		},

		disable: function () {
			this.$element.off('scroll.fu.infinitescroll');
		},

		enable: function () {
			this.$element.on('scroll.fu.infinitescroll', $.proxy(this.onScroll, this));
		},

		end: function (content) {
			var end = $('<div class="infinitescroll-end"></div>');
			if (content) {
				end.append(content);
			} else {
				end.append('---------');
			}

			this.$element.append(end);
			this.disable();
		},

		getPercentage: function () {
			var height = (this.$element.css('box-sizing') === 'border-box') ? this.$element.outerHeight() : this.$element.height();
			var scrollHeight = this.$element.get(0).scrollHeight;
			return (scrollHeight > height) ? ((height / (scrollHeight - this.curScrollTop)) * 100) : 0;
		},

		fetchData: function (force) {
			var load = $('<div class="infinitescroll-load"></div>');
			var self = this;
			var moreBtn;

			var fetch = function () {
				var helpers = {
					percentage: self.curPercentage,
					scrollTop: self.curScrollTop
				};
				//var $loader = $('<div class="loader"></div>');
				var $loader=$('<div class="loader-container"></div>');
				load.append($loader);
				//$loader.loader();
				$loader.loader()
				if (self.options.dataSource) {
					self.options.dataSource(helpers, function (resp) {
						var end;
						load.remove();
						if (resp.content) {
							self.$element.append(resp.content);
						}

						if (resp.end) {
							end = (resp.end !== true) ? resp.end : undefined;
							self.end(end);
						}

						self.fetchingData = false;
					});
				}
			};

			this.fetchingData = true;
			this.$element.append(load);
			if (this.options.hybrid && force !== true) {
				moreBtn = $('<button type="button" class="btn btn-primary">more</button>');
				if (typeof this.options.hybrid === 'object') {
					moreBtn.append(this.options.hybrid.label);
				} else {
					moreBtn.append('<span class="rc-icon spinner"></span>');
				}

				moreBtn.on('click.fu.infinitescroll', function () {
					moreBtn.remove();
					fetch();
				});
				load.append(moreBtn);
			} else {
				fetch();
			}
		},

		onScroll: function (e) {
			this.curScrollTop = this.$element.scrollTop();
			this.curPercentage = this.getPercentage();
			if (!this.fetchingData && this.curPercentage >= this.options.percentage) {
				this.fetchData();
			}
		}
	};

	// INFINITE SCROLL PLUGIN DEFINITION

	$.fn.infinitescroll = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.infinitescroll');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.infinitescroll', (data = new InfiniteScroll(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.infinitescroll.defaults = {
		dataSource: null,
		hybrid: false,//can be true or an object with structure: { 'label': (markup or jQuery obj) }
		percentage: 95//percentage scrolled to the bottom before more is loaded
	};

	$.fn.infinitescroll.Constructor = InfiniteScroll;

	$.fn.infinitescroll.noConflict = function () {
		$.fn.infinitescroll = old;
		return this;
	};

	// NO DATA-API DUE TO NEED OF DATA-SOURCE

	// -- BEGIN UMD WRAPPER AFTERWORD --
})( jQuery, window, document );
// -- END UMD WRAPPER AFTERWORD --

/* ========================================================================
 * RC - Scroll.js
 * Inspired by http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2016 Redblock, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
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

 /**
 * Swiper 3.2.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 7, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(a){var r;return e(this).each(function(){var e=new t(this,a);r||(r=e)}),r}}var a,t=function(e,r){function s(){return"horizontal"===b.params.direction}function i(e){return Math.floor(e)}function n(){b.autoplayTimeoutId=setTimeout(function(){b.params.loop?(b.fixLoop(),b._slideNext()):b.isEnd?r.autoplayStopOnLast?b.stopAutoplay():b._slideTo(0):b._slideNext()},b.params.autoplay)}function o(e,t){var r=a(e.target);if(!r.is(t))if("string"==typeof t)r=r.parents(t);else if(t.nodeType){var s;return r.parents().each(function(e,a){a===t&&(s=t)}),s?t:void 0}if(0!==r.length)return r[0]}function l(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,r=new t(function(e){e.forEach(function(e){b.onResize(!0),b.emit("onObserverUpdate",b,e)})});r.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),b.observers.push(r)}function p(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!b.params.allowSwipeToNext&&(s()&&39===a||!s()&&40===a))return!1;if(!b.params.allowSwipeToPrev&&(s()&&37===a||!s()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(b.container.parents(".swiper-slide").length>0&&0===b.container.parents(".swiper-slide-active").length)return;var r={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=b.container.offset();b.rtl&&(o.left=o.left-b.container[0].scrollLeft);for(var l=[[o.left,o.top],[o.left+b.width,o.top],[o.left,o.top+b.height],[o.left+b.width,o.top+b.height]],p=0;p<l.length;p++){var d=l[p];d[0]>=r.left&&d[0]<=r.left+i&&d[1]>=r.top&&d[1]<=r.top+n&&(t=!0)}if(!t)return}s()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!b.rtl||37===a&&b.rtl)&&b.slideNext(),(37===a&&!b.rtl||39===a&&b.rtl)&&b.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&b.slideNext(),38===a&&b.slidePrev())}}function d(e){e.originalEvent&&(e=e.originalEvent);var a=b.mousewheel.event,t=0,r=b.rtl?-1:1;if(e.detail)t=-e.detail;else if("mousewheel"===a)if(b.params.mousewheelForceToAxis)if(s()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;t=e.wheelDeltaX*r}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;t=e.wheelDeltaY}else t=Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)?-e.wheelDeltaX*r:-e.wheelDeltaY;else if("DOMMouseScroll"===a)t=-e.detail;else if("wheel"===a)if(b.params.mousewheelForceToAxis)if(s()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;t=-e.deltaX*r}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;t=-e.deltaY}else t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX*r:-e.deltaY;if(0!==t){if(b.params.mousewheelInvert&&(t=-t),b.params.freeMode){var i=b.getWrapperTranslate()+t*b.params.mousewheelSensitivity,n=b.isBeginning,o=b.isEnd;if(i>=b.minTranslate()&&(i=b.minTranslate()),i<=b.maxTranslate()&&(i=b.maxTranslate()),b.setWrapperTransition(0),b.setWrapperTranslate(i),b.updateProgress(),b.updateActiveIndex(),(!n&&b.isBeginning||!o&&b.isEnd)&&b.updateClasses(),b.params.freeModeSticky&&(clearTimeout(b.mousewheel.timeout),b.mousewheel.timeout=setTimeout(function(){b.slideReset()},300)),0===i||i===b.maxTranslate())return}else{if((new window.Date).getTime()-b.mousewheel.lastScrollTime>60)if(0>t)if(b.isEnd&&!b.params.loop||b.animating){if(b.params.mousewheelReleaseOnEdges)return!0}else b.slideNext();else if(b.isBeginning&&!b.params.loop||b.animating){if(b.params.mousewheelReleaseOnEdges)return!0}else b.slidePrev();b.mousewheel.lastScrollTime=(new window.Date).getTime()}return b.params.autoplay&&b.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function u(e,t){e=a(e);var r,i,n,o=b.rtl?-1:1;r=e.attr("data-swiper-parallax")||"0",i=e.attr("data-swiper-parallax-x"),n=e.attr("data-swiper-parallax-y"),i||n?(i=i||"0",n=n||"0"):s()?(i=r,n="0"):(n=r,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*t*o+"%":i*t*o+"px",n=n.indexOf("%")>=0?parseInt(n,10)*t+"%":n*t+"px",e.transform("translate3d("+i+", "+n+",0px)")}function c(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(e,r);var m={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,hashnav:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},f=r&&r.virtualTranslate;r=r||{};var h={};for(var g in r)if("object"!=typeof r[g]||(r[g].nodeType||r[g]===window||r[g]===document||"undefined"!=typeof Dom7&&r[g]instanceof Dom7||"undefined"!=typeof jQuery&&r[g]instanceof jQuery))h[g]=r[g];else{h[g]={};for(var v in r[g])h[g][v]=r[g][v]}for(var w in m)if("undefined"==typeof r[w])r[w]=m[w];else if("object"==typeof r[w])for(var y in m[w])"undefined"==typeof r[w][y]&&(r[w][y]=m[w][y]);var b=this;if(b.params=r,b.originalParams=h,b.classNames=[],"undefined"!=typeof a&&"undefined"!=typeof Dom7&&(a=Dom7),("undefined"!=typeof a||(a="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7))&&(b.$=a,b.currentBreakpoint=void 0,b.getActiveBreakpoint=function(){if(!b.params.breakpoints)return!1;var e,a=!1,t=[];for(e in b.params.breakpoints)b.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var r=0;r<t.length;r++)e=t[r],e>=window.innerWidth&&!a&&(a=e);return a||"max"},b.setBreakpoint=function(){var e=b.getActiveBreakpoint();if(e&&b.currentBreakpoint!==e){var a=e in b.params.breakpoints?b.params.breakpoints[e]:b.originalParams;for(var t in a)b.params[t]=a[t];b.currentBreakpoint=e}},b.params.breakpoints&&b.setBreakpoint(),b.container=a(e),0!==b.container.length)){if(b.container.length>1)return void b.container.each(function(){new t(this,r)});b.container[0].swiper=b,b.container.data("swiper",b),b.classNames.push("swiper-container-"+b.params.direction),b.params.freeMode&&b.classNames.push("swiper-container-free-mode"),b.support.flexbox||(b.classNames.push("swiper-container-no-flexbox"),b.params.slidesPerColumn=1),b.params.autoHeight&&b.classNames.push("swiper-container-autoheight"),(b.params.parallax||b.params.watchSlidesVisibility)&&(b.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(b.params.effect)>=0&&(b.support.transforms3d?(b.params.watchSlidesProgress=!0,b.classNames.push("swiper-container-3d")):b.params.effect="slide"),"slide"!==b.params.effect&&b.classNames.push("swiper-container-"+b.params.effect),"cube"===b.params.effect&&(b.params.resistanceRatio=0,b.params.slidesPerView=1,b.params.slidesPerColumn=1,b.params.slidesPerGroup=1,b.params.centeredSlides=!1,b.params.spaceBetween=0,b.params.virtualTranslate=!0,b.params.setWrapperSize=!1),"fade"===b.params.effect&&(b.params.slidesPerView=1,b.params.slidesPerColumn=1,b.params.slidesPerGroup=1,b.params.watchSlidesProgress=!0,b.params.spaceBetween=0,"undefined"==typeof f&&(b.params.virtualTranslate=!0)),b.params.grabCursor&&b.support.touch&&(b.params.grabCursor=!1),b.wrapper=b.container.children("."+b.params.wrapperClass),b.params.pagination&&(b.paginationContainer=a(b.params.pagination),b.params.paginationClickable&&b.paginationContainer.addClass("swiper-pagination-clickable")),b.rtl=s()&&("rtl"===b.container[0].dir.toLowerCase()||"rtl"===b.container.css("direction")),b.rtl&&b.classNames.push("swiper-container-rtl"),b.rtl&&(b.wrongRTL="-webkit-box"===b.wrapper.css("display")),b.params.slidesPerColumn>1&&b.classNames.push("swiper-container-multirow"),b.device.android&&b.classNames.push("swiper-container-android"),b.container.addClass(b.classNames.join(" ")),b.translate=0,b.progress=0,b.velocity=0,b.lockSwipeToNext=function(){b.params.allowSwipeToNext=!1},b.lockSwipeToPrev=function(){b.params.allowSwipeToPrev=!1},b.lockSwipes=function(){b.params.allowSwipeToNext=b.params.allowSwipeToPrev=!1},b.unlockSwipeToNext=function(){b.params.allowSwipeToNext=!0},b.unlockSwipeToPrev=function(){b.params.allowSwipeToPrev=!0},b.unlockSwipes=function(){b.params.allowSwipeToNext=b.params.allowSwipeToPrev=!0},b.params.grabCursor&&(b.container[0].style.cursor="move",b.container[0].style.cursor="-webkit-grab",b.container[0].style.cursor="-moz-grab",b.container[0].style.cursor="grab"),b.imagesToLoad=[],b.imagesLoaded=0,b.loadImage=function(e,a,t,r,s){function i(){s&&s()}var n;e.complete&&r?i():a?(n=new window.Image,n.onload=i,n.onerror=i,t&&(n.srcset=t),a&&(n.src=a)):i()},b.preloadImages=function(){function e(){"undefined"!=typeof b&&null!==b&&(void 0!==b.imagesLoaded&&b.imagesLoaded++,b.imagesLoaded===b.imagesToLoad.length&&(b.params.updateOnImagesReady&&b.update(),b.emit("onImagesReady",b)))}b.imagesToLoad=b.container.find("img");for(var a=0;a<b.imagesToLoad.length;a++)b.loadImage(b.imagesToLoad[a],b.imagesToLoad[a].currentSrc||b.imagesToLoad[a].getAttribute("src"),b.imagesToLoad[a].srcset||b.imagesToLoad[a].getAttribute("srcset"),!0,e)},b.autoplayTimeoutId=void 0,b.autoplaying=!1,b.autoplayPaused=!1,b.startAutoplay=function(){return"undefined"!=typeof b.autoplayTimeoutId?!1:b.params.autoplay?b.autoplaying?!1:(b.autoplaying=!0,b.emit("onAutoplayStart",b),void n()):!1},b.stopAutoplay=function(e){b.autoplayTimeoutId&&(b.autoplayTimeoutId&&clearTimeout(b.autoplayTimeoutId),b.autoplaying=!1,b.autoplayTimeoutId=void 0,b.emit("onAutoplayStop",b))},b.pauseAutoplay=function(e){b.autoplayPaused||(b.autoplayTimeoutId&&clearTimeout(b.autoplayTimeoutId),b.autoplayPaused=!0,0===e?(b.autoplayPaused=!1,n()):b.wrapper.transitionEnd(function(){b&&(b.autoplayPaused=!1,b.autoplaying?n():b.stopAutoplay())}))},b.minTranslate=function(){return-b.snapGrid[0]},b.maxTranslate=function(){return-b.snapGrid[b.snapGrid.length-1]},b.updateAutoHeight=function(){var e=b.slides.eq(b.activeIndex)[0].offsetHeight;e&&b.wrapper.css("height",b.slides.eq(b.activeIndex)[0].offsetHeight+"px")},b.updateContainerSize=function(){var e,a;e="undefined"!=typeof b.params.width?b.params.width:b.container[0].clientWidth,a="undefined"!=typeof b.params.height?b.params.height:b.container[0].clientHeight,0===e&&s()||0===a&&!s()||(e=e-parseInt(b.container.css("padding-left"),10)-parseInt(b.container.css("padding-right"),10),a=a-parseInt(b.container.css("padding-top"),10)-parseInt(b.container.css("padding-bottom"),10),b.width=e,b.height=a,b.size=s()?b.width:b.height)},b.updateSlidesSize=function(){b.slides=b.wrapper.children("."+b.params.slideClass),b.snapGrid=[],b.slidesGrid=[],b.slidesSizesGrid=[];var e,a=b.params.spaceBetween,t=-b.params.slidesOffsetBefore,r=0,n=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*b.size),b.virtualSize=-a,b.rtl?b.slides.css({marginLeft:"",marginTop:""}):b.slides.css({marginRight:"",marginBottom:""});var o;b.params.slidesPerColumn>1&&(o=Math.floor(b.slides.length/b.params.slidesPerColumn)===b.slides.length/b.params.slidesPerColumn?b.slides.length:Math.ceil(b.slides.length/b.params.slidesPerColumn)*b.params.slidesPerColumn,"auto"!==b.params.slidesPerView&&"row"===b.params.slidesPerColumnFill&&(o=Math.max(o,b.params.slidesPerView*b.params.slidesPerColumn)));var l,p=b.params.slidesPerColumn,d=o/p,u=d-(b.params.slidesPerColumn*d-b.slides.length);for(e=0;e<b.slides.length;e++){l=0;var c=b.slides.eq(e);if(b.params.slidesPerColumn>1){var m,f,h;"column"===b.params.slidesPerColumnFill?(f=Math.floor(e/p),h=e-f*p,(f>u||f===u&&h===p-1)&&++h>=p&&(h=0,f++),m=f+h*o/p,c.css({"-webkit-box-ordinal-group":m,"-moz-box-ordinal-group":m,"-ms-flex-order":m,"-webkit-order":m,order:m})):(h=Math.floor(e/d),f=e-h*d),c.css({"margin-top":0!==h&&b.params.spaceBetween&&b.params.spaceBetween+"px"}).attr("data-swiper-column",f).attr("data-swiper-row",h)}"none"!==c.css("display")&&("auto"===b.params.slidesPerView?(l=s()?c.outerWidth(!0):c.outerHeight(!0),b.params.roundLengths&&(l=i(l))):(l=(b.size-(b.params.slidesPerView-1)*a)/b.params.slidesPerView,b.params.roundLengths&&(l=i(l)),s()?b.slides[e].style.width=l+"px":b.slides[e].style.height=l+"px"),b.slides[e].swiperSlideSize=l,b.slidesSizesGrid.push(l),b.params.centeredSlides?(t=t+l/2+r/2+a,0===e&&(t=t-b.size/2-a),Math.abs(t)<.001&&(t=0),n%b.params.slidesPerGroup===0&&b.snapGrid.push(t),b.slidesGrid.push(t)):(n%b.params.slidesPerGroup===0&&b.snapGrid.push(t),b.slidesGrid.push(t),t=t+l+a),b.virtualSize+=l+a,r=l,n++)}b.virtualSize=Math.max(b.virtualSize,b.size)+b.params.slidesOffsetAfter;var g;if(b.rtl&&b.wrongRTL&&("slide"===b.params.effect||"coverflow"===b.params.effect)&&b.wrapper.css({width:b.virtualSize+b.params.spaceBetween+"px"}),(!b.support.flexbox||b.params.setWrapperSize)&&(s()?b.wrapper.css({width:b.virtualSize+b.params.spaceBetween+"px"}):b.wrapper.css({height:b.virtualSize+b.params.spaceBetween+"px"})),b.params.slidesPerColumn>1&&(b.virtualSize=(l+b.params.spaceBetween)*o,b.virtualSize=Math.ceil(b.virtualSize/b.params.slidesPerColumn)-b.params.spaceBetween,b.wrapper.css({width:b.virtualSize+b.params.spaceBetween+"px"}),b.params.centeredSlides)){for(g=[],e=0;e<b.snapGrid.length;e++)b.snapGrid[e]<b.virtualSize+b.snapGrid[0]&&g.push(b.snapGrid[e]);b.snapGrid=g}if(!b.params.centeredSlides){for(g=[],e=0;e<b.snapGrid.length;e++)b.snapGrid[e]<=b.virtualSize-b.size&&g.push(b.snapGrid[e]);b.snapGrid=g,Math.floor(b.virtualSize-b.size)>Math.floor(b.snapGrid[b.snapGrid.length-1])&&b.snapGrid.push(b.virtualSize-b.size)}0===b.snapGrid.length&&(b.snapGrid=[0]),0!==b.params.spaceBetween&&(s()?b.rtl?b.slides.css({marginLeft:a+"px"}):b.slides.css({marginRight:a+"px"}):b.slides.css({marginBottom:a+"px"})),b.params.watchSlidesProgress&&b.updateSlidesOffset()},b.updateSlidesOffset=function(){for(var e=0;e<b.slides.length;e++)b.slides[e].swiperSlideOffset=s()?b.slides[e].offsetLeft:b.slides[e].offsetTop},b.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=b.translate||0),0!==b.slides.length){"undefined"==typeof b.slides[0].swiperSlideOffset&&b.updateSlidesOffset();var a=-e;b.rtl&&(a=e),b.slides.removeClass(b.params.slideVisibleClass);for(var t=0;t<b.slides.length;t++){var r=b.slides[t],s=(a-r.swiperSlideOffset)/(r.swiperSlideSize+b.params.spaceBetween);if(b.params.watchSlidesVisibility){var i=-(a-r.swiperSlideOffset),n=i+b.slidesSizesGrid[t],o=i>=0&&i<b.size||n>0&&n<=b.size||0>=i&&n>=b.size;o&&b.slides.eq(t).addClass(b.params.slideVisibleClass)}r.progress=b.rtl?-s:s}}},b.updateProgress=function(e){"undefined"==typeof e&&(e=b.translate||0);var a=b.maxTranslate()-b.minTranslate(),t=b.isBeginning,r=b.isEnd;0===a?(b.progress=0,b.isBeginning=b.isEnd=!0):(b.progress=(e-b.minTranslate())/a,b.isBeginning=b.progress<=0,b.isEnd=b.progress>=1),b.isBeginning&&!t&&b.emit("onReachBeginning",b),b.isEnd&&!r&&b.emit("onReachEnd",b),b.params.watchSlidesProgress&&b.updateSlidesProgress(e),b.emit("onProgress",b,b.progress)},b.updateActiveIndex=function(){var e,a,t,r=b.rtl?b.translate:-b.translate;for(a=0;a<b.slidesGrid.length;a++)"undefined"!=typeof b.slidesGrid[a+1]?r>=b.slidesGrid[a]&&r<b.slidesGrid[a+1]-(b.slidesGrid[a+1]-b.slidesGrid[a])/2?e=a:r>=b.slidesGrid[a]&&r<b.slidesGrid[a+1]&&(e=a+1):r>=b.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/b.params.slidesPerGroup),t>=b.snapGrid.length&&(t=b.snapGrid.length-1),e!==b.activeIndex&&(b.snapIndex=t,b.previousIndex=b.activeIndex,b.activeIndex=e,b.updateClasses())},b.updateClasses=function(){b.slides.removeClass(b.params.slideActiveClass+" "+b.params.slideNextClass+" "+b.params.slidePrevClass);var e=b.slides.eq(b.activeIndex);if(e.addClass(b.params.slideActiveClass),e.next("."+b.params.slideClass).addClass(b.params.slideNextClass),e.prev("."+b.params.slideClass).addClass(b.params.slidePrevClass),b.bullets&&b.bullets.length>0){b.bullets.removeClass(b.params.bulletActiveClass);var t;b.params.loop?(t=Math.ceil(b.activeIndex-b.loopedSlides)/b.params.slidesPerGroup,t>b.slides.length-1-2*b.loopedSlides&&(t-=b.slides.length-2*b.loopedSlides),t>b.bullets.length-1&&(t-=b.bullets.length)):t="undefined"!=typeof b.snapIndex?b.snapIndex:b.activeIndex||0,b.paginationContainer.length>1?b.bullets.each(function(){a(this).index()===t&&a(this).addClass(b.params.bulletActiveClass)}):b.bullets.eq(t).addClass(b.params.bulletActiveClass)}b.params.loop||(b.params.prevButton&&(b.isBeginning?(a(b.params.prevButton).addClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.disable(a(b.params.prevButton))):(a(b.params.prevButton).removeClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.enable(a(b.params.prevButton)))),b.params.nextButton&&(b.isEnd?(a(b.params.nextButton).addClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.disable(a(b.params.nextButton))):(a(b.params.nextButton).removeClass(b.params.buttonDisabledClass),b.params.a11y&&b.a11y&&b.a11y.enable(a(b.params.nextButton)))))},b.updatePagination=function(){if(b.params.pagination&&b.paginationContainer&&b.paginationContainer.length>0){for(var e="",a=b.params.loop?Math.ceil((b.slides.length-2*b.loopedSlides)/b.params.slidesPerGroup):b.snapGrid.length,t=0;a>t;t++)e+=b.params.paginationBulletRender?b.params.paginationBulletRender(t,b.params.bulletClass):"<"+b.params.paginationElement+' class="'+b.params.bulletClass+'"></'+b.params.paginationElement+">";b.paginationContainer.html(e),b.bullets=b.paginationContainer.find("."+b.params.bulletClass),b.params.paginationClickable&&b.params.a11y&&b.a11y&&b.a11y.initPagination()}},b.update=function(e){function a(){r=Math.min(Math.max(b.translate,b.maxTranslate()),b.minTranslate()),b.setWrapperTranslate(r),b.updateActiveIndex(),b.updateClasses()}if(b.updateContainerSize(),b.updateSlidesSize(),b.updateProgress(),b.updatePagination(),b.updateClasses(),b.params.scrollbar&&b.scrollbar&&b.scrollbar.set(),e){var t,r;b.controller&&b.controller.spline&&(b.controller.spline=void 0),b.params.freeMode?(a(),b.params.autoHeight&&b.updateAutoHeight()):(t=("auto"===b.params.slidesPerView||b.params.slidesPerView>1)&&b.isEnd&&!b.params.centeredSlides?b.slideTo(b.slides.length-1,0,!1,!0):b.slideTo(b.activeIndex,0,!1,!0),t||a())}else b.params.autoHeight&&b.updateAutoHeight()},b.onResize=function(e){b.params.breakpoints&&b.setBreakpoint();var a=b.params.allowSwipeToPrev,t=b.params.allowSwipeToNext;if(b.params.allowSwipeToPrev=b.params.allowSwipeToNext=!0,b.updateContainerSize(),b.updateSlidesSize(),("auto"===b.params.slidesPerView||b.params.freeMode||e)&&b.updatePagination(),b.params.scrollbar&&b.scrollbar&&b.scrollbar.set(),b.controller&&b.controller.spline&&(b.controller.spline=void 0),b.params.freeMode){var r=Math.min(Math.max(b.translate,b.maxTranslate()),b.minTranslate());b.setWrapperTranslate(r),b.updateActiveIndex(),b.updateClasses(),b.params.autoHeight&&b.updateAutoHeight()}else b.updateClasses(),("auto"===b.params.slidesPerView||b.params.slidesPerView>1)&&b.isEnd&&!b.params.centeredSlides?b.slideTo(b.slides.length-1,0,!1,!0):b.slideTo(b.activeIndex,0,!1,!0);b.params.allowSwipeToPrev=a,b.params.allowSwipeToNext=t};var x=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?x=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(x=["MSPointerDown","MSPointerMove","MSPointerUp"]),b.touchEvents={start:b.support.touch||!b.params.simulateTouch?"touchstart":x[0],move:b.support.touch||!b.params.simulateTouch?"touchmove":x[1],end:b.support.touch||!b.params.simulateTouch?"touchend":x[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===b.params.touchEventsTarget?b.container:b.wrapper).addClass("swiper-wp8-"+b.params.direction),b.initEvents=function(e){var t=e?"off":"on",s=e?"removeEventListener":"addEventListener",i="container"===b.params.touchEventsTarget?b.container[0]:b.wrapper[0],n=b.support.touch?i:document,o=b.params.nested?!0:!1;b.browser.ie?(i[s](b.touchEvents.start,b.onTouchStart,!1),n[s](b.touchEvents.move,b.onTouchMove,o),n[s](b.touchEvents.end,b.onTouchEnd,!1)):(b.support.touch&&(i[s](b.touchEvents.start,b.onTouchStart,!1),i[s](b.touchEvents.move,b.onTouchMove,o),i[s](b.touchEvents.end,b.onTouchEnd,!1)),!r.simulateTouch||b.device.ios||b.device.android||(i[s]("mousedown",b.onTouchStart,!1),document[s]("mousemove",b.onTouchMove,o),document[s]("mouseup",b.onTouchEnd,!1))),window[s]("resize",b.onResize),b.params.nextButton&&(a(b.params.nextButton)[t]("click",b.onClickNext),b.params.a11y&&b.a11y&&a(b.params.nextButton)[t]("keydown",b.a11y.onEnterKey)),b.params.prevButton&&(a(b.params.prevButton)[t]("click",b.onClickPrev),b.params.a11y&&b.a11y&&a(b.params.prevButton)[t]("keydown",b.a11y.onEnterKey)),b.params.pagination&&b.params.paginationClickable&&(a(b.paginationContainer)[t]("click","."+b.params.bulletClass,b.onClickIndex),b.params.a11y&&b.a11y&&a(b.paginationContainer)[t]("keydown","."+b.params.bulletClass,b.a11y.onEnterKey)),(b.params.preventClicks||b.params.preventClicksPropagation)&&i[s]("click",b.preventClicks,!0)},b.attachEvents=function(e){b.initEvents()},b.detachEvents=function(){b.initEvents(!0)},b.allowClick=!0,b.preventClicks=function(e){b.allowClick||(b.params.preventClicks&&e.preventDefault(),b.params.preventClicksPropagation&&b.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},b.onClickNext=function(e){e.preventDefault(),(!b.isEnd||b.params.loop)&&b.slideNext()},b.onClickPrev=function(e){e.preventDefault(),(!b.isBeginning||b.params.loop)&&b.slidePrev()},b.onClickIndex=function(e){e.preventDefault();var t=a(this).index()*b.params.slidesPerGroup;b.params.loop&&(t+=b.loopedSlides),b.slideTo(t)},b.updateClickedSlide=function(e){var t=o(e,"."+b.params.slideClass),r=!1;if(t)for(var s=0;s<b.slides.length;s++)b.slides[s]===t&&(r=!0);if(!t||!r)return b.clickedSlide=void 0,void(b.clickedIndex=void 0);if(b.clickedSlide=t,b.clickedIndex=a(t).index(),b.params.slideToClickedSlide&&void 0!==b.clickedIndex&&b.clickedIndex!==b.activeIndex){var i,n=b.clickedIndex;if(b.params.loop){if(b.animating)return;i=a(b.clickedSlide).attr("data-swiper-slide-index"),b.params.centeredSlides?n<b.loopedSlides-b.params.slidesPerView/2||n>b.slides.length-b.loopedSlides+b.params.slidesPerView/2?(b.fixLoop(),n=b.wrapper.children("."+b.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){b.slideTo(n)},0)):b.slideTo(n):n>b.slides.length-b.params.slidesPerView?(b.fixLoop(),n=b.wrapper.children("."+b.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){b.slideTo(n)},0)):b.slideTo(n)}else b.slideTo(n)}};var T,S,C,M,P,k,I,z,E,D,L="input, select, textarea, button",B=Date.now(),G=[];b.animating=!1,b.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var A,O;if(b.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),A="touchstart"===e.type,A||!("which"in e)||3!==e.which){if(b.params.noSwiping&&o(e,"."+b.params.noSwipingClass))return void(b.allowClick=!0);if(!b.params.swipeHandler||o(e,b.params.swipeHandler)){var t=b.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,r=b.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY;if(!(b.device.ios&&b.params.iOSEdgeSwipeDetection&&t<=b.params.iOSEdgeSwipeThreshold)){if(T=!0,S=!1,C=!0,P=void 0,O=void 0,b.touches.startX=t,b.touches.startY=r,M=Date.now(),b.allowClick=!0,b.updateContainerSize(),b.swipeDirection=void 0,b.params.threshold>0&&(z=!1),"touchstart"!==e.type){var s=!0;a(e.target).is(L)&&(s=!1),document.activeElement&&a(document.activeElement).is(L)&&document.activeElement.blur(),s&&e.preventDefault()}b.emit("onTouchStart",b,e)}}}},b.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(A&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(b.params.onlyExternal)return b.allowClick=!1,void(T&&(b.touches.startX=b.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,b.touches.startY=b.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,M=Date.now()));if(A&&document.activeElement&&e.target===document.activeElement&&a(e.target).is(L))return S=!0,void(b.allowClick=!1);if(C&&b.emit("onTouchMove",b,e),!(e.targetTouches&&e.targetTouches.length>1)){if(b.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,b.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof P){var t=180*Math.atan2(Math.abs(b.touches.currentY-b.touches.startY),Math.abs(b.touches.currentX-b.touches.startX))/Math.PI;P=s()?t>b.params.touchAngle:90-t>b.params.touchAngle}if(P&&b.emit("onTouchMoveOpposite",b,e),"undefined"==typeof O&&b.browser.ieTouch&&(b.touches.currentX!==b.touches.startX||b.touches.currentY!==b.touches.startY)&&(O=!0),T){if(P)return void(T=!1);if(O||!b.browser.ieTouch){b.allowClick=!1,b.emit("onSliderMove",b,e),e.preventDefault(),b.params.touchMoveStopPropagation&&!b.params.nested&&e.stopPropagation(),S||(r.loop&&b.fixLoop(),I=b.getWrapperTranslate(),b.setWrapperTransition(0),b.animating&&b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),b.params.autoplay&&b.autoplaying&&(b.params.autoplayDisableOnInteraction?b.stopAutoplay():b.pauseAutoplay()),D=!1,b.params.grabCursor&&(b.container[0].style.cursor="move",b.container[0].style.cursor="-webkit-grabbing",b.container[0].style.cursor="-moz-grabbin",b.container[0].style.cursor="grabbing")),S=!0;var i=b.touches.diff=s()?b.touches.currentX-b.touches.startX:b.touches.currentY-b.touches.startY;i*=b.params.touchRatio,b.rtl&&(i=-i),b.swipeDirection=i>0?"prev":"next",k=i+I;var n=!0;if(i>0&&k>b.minTranslate()?(n=!1,b.params.resistance&&(k=b.minTranslate()-1+Math.pow(-b.minTranslate()+I+i,b.params.resistanceRatio))):0>i&&k<b.maxTranslate()&&(n=!1,b.params.resistance&&(k=b.maxTranslate()+1-Math.pow(b.maxTranslate()-I-i,b.params.resistanceRatio))),n&&(e.preventedByNestedSwiper=!0),!b.params.allowSwipeToNext&&"next"===b.swipeDirection&&I>k&&(k=I),!b.params.allowSwipeToPrev&&"prev"===b.swipeDirection&&k>I&&(k=I),b.params.followFinger){if(b.params.threshold>0){if(!(Math.abs(i)>b.params.threshold||z))return void(k=I);if(!z)return z=!0,b.touches.startX=b.touches.currentX,b.touches.startY=b.touches.currentY,k=I,void(b.touches.diff=s()?b.touches.currentX-b.touches.startX:b.touches.currentY-b.touches.startY)}(b.params.freeMode||b.params.watchSlidesProgress)&&b.updateActiveIndex(),b.params.freeMode&&(0===G.length&&G.push({position:b.touches[s()?"startX":"startY"],time:M}),G.push({position:b.touches[s()?"currentX":"currentY"],time:(new window.Date).getTime()})),b.updateProgress(k),b.setWrapperTranslate(k)}}}}}},b.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),C&&b.emit("onTouchEnd",b,e),C=!1,T){b.params.grabCursor&&S&&T&&(b.container[0].style.cursor="move",b.container[0].style.cursor="-webkit-grab",b.container[0].style.cursor="-moz-grab",b.container[0].style.cursor="grab");var t=Date.now(),r=t-M;if(b.allowClick&&(b.updateClickedSlide(e),b.emit("onTap",b,e),300>r&&t-B>300&&(E&&clearTimeout(E),E=setTimeout(function(){b&&(b.params.paginationHide&&b.paginationContainer.length>0&&!a(e.target).hasClass(b.params.bulletClass)&&b.paginationContainer.toggleClass(b.params.paginationHiddenClass),b.emit("onClick",b,e))},300)),300>r&&300>t-B&&(E&&clearTimeout(E),b.emit("onDoubleTap",b,e))),B=Date.now(),setTimeout(function(){b&&(b.allowClick=!0)},0),!T||!S||!b.swipeDirection||0===b.touches.diff||k===I)return void(T=S=!1);T=S=!1;var s;if(s=b.params.followFinger?b.rtl?b.translate:-b.translate:-k,b.params.freeMode){if(s<-b.minTranslate())return void b.slideTo(b.activeIndex);if(s>-b.maxTranslate())return void(b.slides.length<b.snapGrid.length?b.slideTo(b.snapGrid.length-1):b.slideTo(b.slides.length-1));if(b.params.freeModeMomentum){if(G.length>1){var i=G.pop(),n=G.pop(),o=i.position-n.position,l=i.time-n.time;b.velocity=o/l,b.velocity=b.velocity/2,Math.abs(b.velocity)<b.params.freeModeMinimumVelocity&&(b.velocity=0),(l>150||(new window.Date).getTime()-i.time>300)&&(b.velocity=0)}else b.velocity=0;G.length=0;var p=1e3*b.params.freeModeMomentumRatio,d=b.velocity*p,u=b.translate+d;b.rtl&&(u=-u);var c,m=!1,f=20*Math.abs(b.velocity)*b.params.freeModeMomentumBounceRatio;if(u<b.maxTranslate())b.params.freeModeMomentumBounce?(u+b.maxTranslate()<-f&&(u=b.maxTranslate()-f),c=b.maxTranslate(),m=!0,D=!0):u=b.maxTranslate();else if(u>b.minTranslate())b.params.freeModeMomentumBounce?(u-b.minTranslate()>f&&(u=b.minTranslate()+f),c=b.minTranslate(),m=!0,D=!0):u=b.minTranslate();else if(b.params.freeModeSticky){var h,g=0;for(g=0;g<b.snapGrid.length;g+=1)if(b.snapGrid[g]>-u){h=g;break}u=Math.abs(b.snapGrid[h]-u)<Math.abs(b.snapGrid[h-1]-u)||"next"===b.swipeDirection?b.snapGrid[h]:b.snapGrid[h-1],b.rtl||(u=-u)}if(0!==b.velocity)p=b.rtl?Math.abs((-u-b.translate)/b.velocity):Math.abs((u-b.translate)/b.velocity);else if(b.params.freeModeSticky)return void b.slideReset();b.params.freeModeMomentumBounce&&m?(b.updateProgress(c),b.setWrapperTransition(p),b.setWrapperTranslate(u),b.onTransitionStart(),b.animating=!0,b.wrapper.transitionEnd(function(){b&&D&&(b.emit("onMomentumBounce",b),b.setWrapperTransition(b.params.speed),b.setWrapperTranslate(c),b.wrapper.transitionEnd(function(){b&&b.onTransitionEnd()}))})):b.velocity?(b.updateProgress(u),b.setWrapperTransition(p),b.setWrapperTranslate(u),b.onTransitionStart(),b.animating||(b.animating=!0,b.wrapper.transitionEnd(function(){b&&b.onTransitionEnd()}))):b.updateProgress(u),b.updateActiveIndex()}return void((!b.params.freeModeMomentum||r>=b.params.longSwipesMs)&&(b.updateProgress(),b.updateActiveIndex()));
}var v,w=0,y=b.slidesSizesGrid[0];for(v=0;v<b.slidesGrid.length;v+=b.params.slidesPerGroup)"undefined"!=typeof b.slidesGrid[v+b.params.slidesPerGroup]?s>=b.slidesGrid[v]&&s<b.slidesGrid[v+b.params.slidesPerGroup]&&(w=v,y=b.slidesGrid[v+b.params.slidesPerGroup]-b.slidesGrid[v]):s>=b.slidesGrid[v]&&(w=v,y=b.slidesGrid[b.slidesGrid.length-1]-b.slidesGrid[b.slidesGrid.length-2]);var x=(s-b.slidesGrid[w])/y;if(r>b.params.longSwipesMs){if(!b.params.longSwipes)return void b.slideTo(b.activeIndex);"next"===b.swipeDirection&&(x>=b.params.longSwipesRatio?b.slideTo(w+b.params.slidesPerGroup):b.slideTo(w)),"prev"===b.swipeDirection&&(x>1-b.params.longSwipesRatio?b.slideTo(w+b.params.slidesPerGroup):b.slideTo(w))}else{if(!b.params.shortSwipes)return void b.slideTo(b.activeIndex);"next"===b.swipeDirection&&b.slideTo(w+b.params.slidesPerGroup),"prev"===b.swipeDirection&&b.slideTo(w)}}},b._slideTo=function(e,a){return b.slideTo(e,a,!0,!0)},b.slideTo=function(e,a,t,r){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),b.snapIndex=Math.floor(e/b.params.slidesPerGroup),b.snapIndex>=b.snapGrid.length&&(b.snapIndex=b.snapGrid.length-1);var s=-b.snapGrid[b.snapIndex];b.params.autoplay&&b.autoplaying&&(r||!b.params.autoplayDisableOnInteraction?b.pauseAutoplay(a):b.stopAutoplay()),b.updateProgress(s);for(var i=0;i<b.slidesGrid.length;i++)-Math.floor(100*s)>=Math.floor(100*b.slidesGrid[i])&&(e=i);return!b.params.allowSwipeToNext&&s<b.translate&&s<b.minTranslate()?!1:!b.params.allowSwipeToPrev&&s>b.translate&&s>b.maxTranslate()&&(b.activeIndex||0)!==e?!1:("undefined"==typeof a&&(a=b.params.speed),b.previousIndex=b.activeIndex||0,b.activeIndex=e,b.rtl&&-s===b.translate||!b.rtl&&s===b.translate?(b.params.autoHeight&&b.updateAutoHeight(),b.updateClasses(),"slide"!==b.params.effect&&b.setWrapperTranslate(s),!1):(b.updateClasses(),b.onTransitionStart(t),0===a?(b.setWrapperTranslate(s),b.setWrapperTransition(0),b.onTransitionEnd(t)):(b.setWrapperTranslate(s),b.setWrapperTransition(a),b.animating||(b.animating=!0,b.wrapper.transitionEnd(function(){b&&b.onTransitionEnd(t)}))),!0))},b.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),b.params.autoHeight&&b.updateAutoHeight(),b.lazy&&b.lazy.onTransitionStart(),e&&(b.emit("onTransitionStart",b),b.activeIndex!==b.previousIndex&&(b.emit("onSlideChangeStart",b),b.activeIndex>b.previousIndex?b.emit("onSlideNextStart",b):b.emit("onSlidePrevStart",b)))},b.onTransitionEnd=function(e){b.animating=!1,b.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),b.lazy&&b.lazy.onTransitionEnd(),e&&(b.emit("onTransitionEnd",b),b.activeIndex!==b.previousIndex&&(b.emit("onSlideChangeEnd",b),b.activeIndex>b.previousIndex?b.emit("onSlideNextEnd",b):b.emit("onSlidePrevEnd",b))),b.params.hashnav&&b.hashnav&&b.hashnav.setHash()},b.slideNext=function(e,a,t){if(b.params.loop){if(b.animating)return!1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex+b.params.slidesPerGroup,a,e,t)}return b.slideTo(b.activeIndex+b.params.slidesPerGroup,a,e,t)},b._slideNext=function(e){return b.slideNext(!0,e,!0)},b.slidePrev=function(e,a,t){if(b.params.loop){if(b.animating)return!1;b.fixLoop();b.container[0].clientLeft;return b.slideTo(b.activeIndex-1,a,e,t)}return b.slideTo(b.activeIndex-1,a,e,t)},b._slidePrev=function(e){return b.slidePrev(!0,e,!0)},b.slideReset=function(e,a,t){return b.slideTo(b.activeIndex,a,e)},b.setWrapperTransition=function(e,a){b.wrapper.transition(e),"slide"!==b.params.effect&&b.effects[b.params.effect]&&b.effects[b.params.effect].setTransition(e),b.params.parallax&&b.parallax&&b.parallax.setTransition(e),b.params.scrollbar&&b.scrollbar&&b.scrollbar.setTransition(e),b.params.control&&b.controller&&b.controller.setTransition(e,a),b.emit("onSetTransition",b,e)},b.setWrapperTranslate=function(e,a,t){var r=0,n=0,o=0;s()?r=b.rtl?-e:e:n=e,b.params.roundLengths&&(r=i(r),n=i(n)),b.params.virtualTranslate||(b.support.transforms3d?b.wrapper.transform("translate3d("+r+"px, "+n+"px, "+o+"px)"):b.wrapper.transform("translate("+r+"px, "+n+"px)")),b.translate=s()?r:n;var l,p=b.maxTranslate()-b.minTranslate();l=0===p?0:(e-b.minTranslate())/p,l!==b.progress&&b.updateProgress(e),a&&b.updateActiveIndex(),"slide"!==b.params.effect&&b.effects[b.params.effect]&&b.effects[b.params.effect].setTranslate(b.translate),b.params.parallax&&b.parallax&&b.parallax.setTranslate(b.translate),b.params.scrollbar&&b.scrollbar&&b.scrollbar.setTranslate(b.translate),b.params.control&&b.controller&&b.controller.setTranslate(b.translate,t),b.emit("onSetTranslate",b,b.translate)},b.getTranslate=function(e,a){var t,r,s,i;return"undefined"==typeof a&&(a="x"),b.params.virtualTranslate?b.rtl?-b.translate:b.translate:(s=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(r=s.transform||s.webkitTransform,r.split(",").length>6&&(r=r.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),i=new window.WebKitCSSMatrix("none"===r?"":r)):(i=s.MozTransform||s.OTransform||s.MsTransform||s.msTransform||s.transform||s.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(r=window.WebKitCSSMatrix?i.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(r=window.WebKitCSSMatrix?i.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),b.rtl&&r&&(r=-r),r||0)},b.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=s()?"x":"y"),b.getTranslate(b.wrapper[0],e)},b.observers=[],b.initObservers=function(){if(b.params.observeParents)for(var e=b.container.parents(),a=0;a<e.length;a++)l(e[a]);l(b.container[0],{childList:!1}),l(b.wrapper[0],{attributes:!1})},b.disconnectObservers=function(){for(var e=0;e<b.observers.length;e++)b.observers[e].disconnect();b.observers=[]},b.createLoop=function(){b.wrapper.children("."+b.params.slideClass+"."+b.params.slideDuplicateClass).remove();var e=b.wrapper.children("."+b.params.slideClass);"auto"!==b.params.slidesPerView||b.params.loopedSlides||(b.params.loopedSlides=e.length),b.loopedSlides=parseInt(b.params.loopedSlides||b.params.slidesPerView,10),b.loopedSlides=b.loopedSlides+b.params.loopAdditionalSlides,b.loopedSlides>e.length&&(b.loopedSlides=e.length);var t,r=[],s=[];for(e.each(function(t,i){var n=a(this);t<b.loopedSlides&&s.push(i),t<e.length&&t>=e.length-b.loopedSlides&&r.push(i),n.attr("data-swiper-slide-index",t)}),t=0;t<s.length;t++)b.wrapper.append(a(s[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));for(t=r.length-1;t>=0;t--)b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))},b.destroyLoop=function(){b.wrapper.children("."+b.params.slideClass+"."+b.params.slideDuplicateClass).remove(),b.slides.removeAttr("data-swiper-slide-index")},b.fixLoop=function(){var e;b.activeIndex<b.loopedSlides?(e=b.slides.length-3*b.loopedSlides+b.activeIndex,e+=b.loopedSlides,b.slideTo(e,0,!1,!0)):("auto"===b.params.slidesPerView&&b.activeIndex>=2*b.loopedSlides||b.activeIndex>b.slides.length-2*b.params.slidesPerView)&&(e=-b.slides.length+b.activeIndex+b.loopedSlides,e+=b.loopedSlides,b.slideTo(e,0,!1,!0))},b.appendSlide=function(e){if(b.params.loop&&b.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&b.wrapper.append(e[a]);else b.wrapper.append(e);b.params.loop&&b.createLoop(),b.params.observer&&b.support.observer||b.update(!0)},b.prependSlide=function(e){b.params.loop&&b.destroyLoop();var a=b.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&b.wrapper.prepend(e[t]);a=b.activeIndex+e.length}else b.wrapper.prepend(e);b.params.loop&&b.createLoop(),b.params.observer&&b.support.observer||b.update(!0),b.slideTo(a,0,!1)},b.removeSlide=function(e){b.params.loop&&(b.destroyLoop(),b.slides=b.wrapper.children("."+b.params.slideClass));var a,t=b.activeIndex;if("object"==typeof e&&e.length){for(var r=0;r<e.length;r++)a=e[r],b.slides[a]&&b.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,b.slides[a]&&b.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);b.params.loop&&b.createLoop(),b.params.observer&&b.support.observer||b.update(!0),b.params.loop?b.slideTo(t+b.loopedSlides,0,!1):b.slideTo(t,0,!1)},b.removeAllSlides=function(){for(var e=[],a=0;a<b.slides.length;a++)e.push(a);b.removeSlide(e)},b.effects={fade:{setTranslate:function(){for(var e=0;e<b.slides.length;e++){var a=b.slides.eq(e),t=a[0].swiperSlideOffset,r=-t;b.params.virtualTranslate||(r-=b.translate);var i=0;s()||(i=r,r=0);var n=b.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:n}).transform("translate3d("+r+"px, "+i+"px, 0px)")}},setTransition:function(e){if(b.slides.transition(e),b.params.virtualTranslate&&0!==e){var a=!1;b.slides.transitionEnd(function(){if(!a&&b){a=!0,b.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)b.wrapper.trigger(e[t])}})}}},cube:{setTranslate:function(){var e,t=0;b.params.cube.shadow&&(s()?(e=b.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),b.wrapper.append(e)),e.css({height:b.width+"px"})):(e=b.container.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),b.container.append(e))));for(var r=0;r<b.slides.length;r++){var i=b.slides.eq(r),n=90*r,o=Math.floor(n/360);b.rtl&&(n=-n,o=Math.floor(-n/360));var l=Math.max(Math.min(i[0].progress,1),-1),p=0,d=0,u=0;r%4===0?(p=4*-o*b.size,u=0):(r-1)%4===0?(p=0,u=4*-o*b.size):(r-2)%4===0?(p=b.size+4*o*b.size,u=b.size):(r-3)%4===0&&(p=-b.size,u=3*b.size+4*b.size*o),b.rtl&&(p=-p),s()||(d=p,p=0);var c="rotateX("+(s()?0:-n)+"deg) rotateY("+(s()?n:0)+"deg) translate3d("+p+"px, "+d+"px, "+u+"px)";if(1>=l&&l>-1&&(t=90*r+90*l,b.rtl&&(t=90*-r-90*l)),i.transform(c),b.params.cube.slideShadows){var m=s()?i.find(".swiper-slide-shadow-left"):i.find(".swiper-slide-shadow-top"),f=s()?i.find(".swiper-slide-shadow-right"):i.find(".swiper-slide-shadow-bottom");0===m.length&&(m=a('<div class="swiper-slide-shadow-'+(s()?"left":"top")+'"></div>'),i.append(m)),0===f.length&&(f=a('<div class="swiper-slide-shadow-'+(s()?"right":"bottom")+'"></div>'),i.append(f));i[0].progress;m.length&&(m[0].style.opacity=-i[0].progress),f.length&&(f[0].style.opacity=i[0].progress)}}if(b.wrapper.css({"-webkit-transform-origin":"50% 50% -"+b.size/2+"px","-moz-transform-origin":"50% 50% -"+b.size/2+"px","-ms-transform-origin":"50% 50% -"+b.size/2+"px","transform-origin":"50% 50% -"+b.size/2+"px"}),b.params.cube.shadow)if(s())e.transform("translate3d(0px, "+(b.width/2+b.params.cube.shadowOffset)+"px, "+-b.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+b.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),g=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),v=b.params.cube.shadowScale,w=b.params.cube.shadowScale/g,y=b.params.cube.shadowOffset;e.transform("scale3d("+v+", 1, "+w+") translate3d(0px, "+(b.height/2+y)+"px, "+-b.height/2/w+"px) rotateX(-90deg)")}var x=b.isSafari||b.isUiWebView?-b.size/2:0;b.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(s()?0:t)+"deg) rotateY("+(s()?-t:0)+"deg)")},setTransition:function(e){b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),b.params.cube.shadow&&!s()&&b.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=b.translate,t=s()?-e+b.width/2:-e+b.height/2,r=s()?b.params.coverflow.rotate:-b.params.coverflow.rotate,i=b.params.coverflow.depth,n=0,o=b.slides.length;o>n;n++){var l=b.slides.eq(n),p=b.slidesSizesGrid[n],d=l[0].swiperSlideOffset,u=(t-d-p/2)/p*b.params.coverflow.modifier,c=s()?r*u:0,m=s()?0:r*u,f=-i*Math.abs(u),h=s()?0:b.params.coverflow.stretch*u,g=s()?b.params.coverflow.stretch*u:0;Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(f)<.001&&(f=0),Math.abs(c)<.001&&(c=0),Math.abs(m)<.001&&(m=0);var v="translate3d("+g+"px,"+h+"px,"+f+"px)  rotateX("+m+"deg) rotateY("+c+"deg)";if(l.transform(v),l[0].style.zIndex=-Math.abs(Math.round(u))+1,b.params.coverflow.slideShadows){var w=s()?l.find(".swiper-slide-shadow-left"):l.find(".swiper-slide-shadow-top"),y=s()?l.find(".swiper-slide-shadow-right"):l.find(".swiper-slide-shadow-bottom");0===w.length&&(w=a('<div class="swiper-slide-shadow-'+(s()?"left":"top")+'"></div>'),l.append(w)),0===y.length&&(y=a('<div class="swiper-slide-shadow-'+(s()?"right":"bottom")+'"></div>'),l.append(y)),w.length&&(w[0].style.opacity=u>0?u:0),y.length&&(y[0].style.opacity=-u>0?-u:0)}}if(b.browser.ie){var x=b.wrapper[0].style;x.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},b.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,t){if("undefined"!=typeof e&&("undefined"==typeof t&&(t=!0),0!==b.slides.length)){var r=b.slides.eq(e),s=r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!r.hasClass("swiper-lazy")||r.hasClass("swiper-lazy-loaded")||r.hasClass("swiper-lazy-loading")||(s=s.add(r[0])),0!==s.length&&s.each(function(){var e=a(this);e.addClass("swiper-lazy-loading");var s=e.attr("data-background"),i=e.attr("data-src"),n=e.attr("data-srcset");b.loadImage(e[0],i||s,n,!1,function(){if(s?(e.css("background-image","url("+s+")"),e.removeAttr("data-background")):(n&&(e.attr("srcset",n),e.removeAttr("data-srcset")),i&&(e.attr("src",i),e.removeAttr("data-src"))),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),r.find(".swiper-lazy-preloader, .preloader").remove(),b.params.loop&&t){var a=r.attr("data-swiper-slide-index");if(r.hasClass(b.params.slideDuplicateClass)){var o=b.wrapper.children('[data-swiper-slide-index="'+a+'"]:not(.'+b.params.slideDuplicateClass+")");b.lazy.loadImageInSlide(o.index(),!1)}else{var l=b.wrapper.children("."+b.params.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]');b.lazy.loadImageInSlide(l.index(),!1)}}b.emit("onLazyImageReady",b,r[0],e[0])}),b.emit("onLazyImageLoad",b,r[0],e[0])})}},load:function(){var e;if(b.params.watchSlidesVisibility)b.wrapper.children("."+b.params.slideVisibleClass).each(function(){b.lazy.loadImageInSlide(a(this).index())});else if(b.params.slidesPerView>1)for(e=b.activeIndex;e<b.activeIndex+b.params.slidesPerView;e++)b.slides[e]&&b.lazy.loadImageInSlide(e);else b.lazy.loadImageInSlide(b.activeIndex);if(b.params.lazyLoadingInPrevNext)if(b.params.slidesPerView>1){for(e=b.activeIndex+b.params.slidesPerView;e<b.activeIndex+b.params.slidesPerView+b.params.slidesPerView;e++)b.slides[e]&&b.lazy.loadImageInSlide(e);for(e=b.activeIndex-b.params.slidesPerView;e<b.activeIndex;e++)b.slides[e]&&b.lazy.loadImageInSlide(e)}else{var t=b.wrapper.children("."+b.params.slideNextClass);t.length>0&&b.lazy.loadImageInSlide(t.index());var r=b.wrapper.children("."+b.params.slidePrevClass);r.length>0&&b.lazy.loadImageInSlide(r.index())}},onTransitionStart:function(){b.params.lazyLoading&&(b.params.lazyLoadingOnTransitionStart||!b.params.lazyLoadingOnTransitionStart&&!b.lazy.initialImageLoaded)&&b.lazy.load()},onTransitionEnd:function(){b.params.lazyLoading&&!b.params.lazyLoadingOnTransitionStart&&b.lazy.load()}},b.scrollbar={isTouched:!1,setDragPosition:function(e){var a=b.scrollbar,t=s()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,r=t-a.track.offset()[s()?"left":"top"]-a.dragSize/2,i=-b.minTranslate()*a.moveDivider,n=-b.maxTranslate()*a.moveDivider;i>r?r=i:r>n&&(r=n),r=-r/a.moveDivider,b.updateProgress(r),b.setWrapperTranslate(r,!0)},dragStart:function(e){var a=b.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),b.params.scrollbarHide&&a.track.css("opacity",1),b.wrapper.transition(100),a.drag.transition(100),b.emit("onScrollbarDragStart",b)},dragMove:function(e){var a=b.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),b.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),b.emit("onScrollbarDragMove",b))},dragEnd:function(e){var a=b.scrollbar;a.isTouched&&(a.isTouched=!1,b.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),b.emit("onScrollbarDragEnd",b),b.params.scrollbarSnapOnRelease&&b.slideReset())},enableDraggable:function(){var e=b.scrollbar,t=b.support.touch?e.track:document;a(e.track).on(b.touchEvents.start,e.dragStart),a(t).on(b.touchEvents.move,e.dragMove),a(t).on(b.touchEvents.end,e.dragEnd)},disableDraggable:function(){var e=b.scrollbar,t=b.support.touch?e.track:document;a(e.track).off(b.touchEvents.start,e.dragStart),a(t).off(b.touchEvents.move,e.dragMove),a(t).off(b.touchEvents.end,e.dragEnd)},set:function(){if(b.params.scrollbar){var e=b.scrollbar;e.track=a(b.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=a('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=s()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=b.size/b.virtualSize,e.moveDivider=e.divider*(e.trackSize/b.size),e.dragSize=e.trackSize*e.divider,s()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.divider>=1?e.track[0].style.display="none":e.track[0].style.display="",b.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(b.params.scrollbar){var e,a=b.scrollbar,t=(b.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*b.progress,b.rtl&&s()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),s()?(b.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(b.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),b.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){b.params.scrollbar&&b.scrollbar.drag.transition(e)}},b.controller={LinearSpline:function(e,a){this.x=e,this.y=a,this.lastIndex=e.length-1;var t,r;this.x.length;this.interpolate=function(e){return e?(r=s(this.x,e),t=r-1,(e-this.x[t])*(this.y[r]-this.y[t])/(this.x[r]-this.x[t])+this.y[t]):0};var s=function(){var e,a,t;return function(r,s){for(a=-1,e=r.length;e-a>1;)r[t=e+a>>1]<=s?a=t:e=t;return e}}()},getInterpolateFunction:function(e){b.controller.spline||(b.controller.spline=b.params.loop?new b.controller.LinearSpline(b.slidesGrid,e.slidesGrid):new b.controller.LinearSpline(b.snapGrid,e.snapGrid))},setTranslate:function(e,a){function r(a){e=a.rtl&&"horizontal"===a.params.direction?-b.translate:b.translate,"slide"===b.params.controlBy&&(b.controller.getInterpolateFunction(a),i=-b.controller.spline.interpolate(-e)),i&&"container"!==b.params.controlBy||(s=(a.maxTranslate()-a.minTranslate())/(b.maxTranslate()-b.minTranslate()),i=(e-b.minTranslate())*s+a.minTranslate()),b.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,b),a.updateActiveIndex()}var s,i,n=b.params.control;if(b.isArray(n))for(var o=0;o<n.length;o++)n[o]!==a&&n[o]instanceof t&&r(n[o]);else n instanceof t&&a!==n&&r(n)},setTransition:function(e,a){function r(a){a.setWrapperTransition(e,b),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&(a.params.loop&&"slide"===b.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var s,i=b.params.control;if(b.isArray(i))for(s=0;s<i.length;s++)i[s]!==a&&i[s]instanceof t&&r(i[s]);else i instanceof t&&a!==i&&r(i)}},b.hashnav={init:function(){if(b.params.hashnav){b.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,r=b.slides.length;r>t;t++){var s=b.slides.eq(t),i=s.attr("data-hash");if(i===e&&!s.hasClass(b.params.slideDuplicateClass)){var n=s.index();b.slideTo(n,a,b.params.runCallbacksOnInit,!0)}}}},setHash:function(){b.hashnav.initialized&&b.params.hashnav&&(document.location.hash=b.slides.eq(b.activeIndex).attr("data-hash")||"")}},b.disableKeyboardControl=function(){b.params.keyboardControl=!1,a(document).off("keydown",p)},b.enableKeyboardControl=function(){b.params.keyboardControl=!0,a(document).on("keydown",p)},b.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},b.params.mousewheelControl){try{new window.WheelEvent("wheel"),b.mousewheel.event="wheel"}catch(N){}b.mousewheel.event||void 0===document.onmousewheel||(b.mousewheel.event="mousewheel"),b.mousewheel.event||(b.mousewheel.event="DOMMouseScroll")}b.disableMousewheelControl=function(){return b.mousewheel.event?(b.container.off(b.mousewheel.event,d),!0):!1},b.enableMousewheelControl=function(){return b.mousewheel.event?(b.container.on(b.mousewheel.event,d),!0):!1},b.parallax={setTranslate:function(){b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){u(this,b.progress)}),b.slides.each(function(){var e=a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);u(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=b.params.speed),b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=a(this),r=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(r=0),t.transition(r)})}},b._plugins=[];for(var R in b.plugins){var V=b.plugins[R](b,b.params[R]);V&&b._plugins.push(V)}return b.callPlugins=function(e){for(var a=0;a<b._plugins.length;a++)e in b._plugins[a]&&b._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},b.emitterEventListeners={},b.emit=function(e){b.params[e]&&b.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(b.emitterEventListeners[e])for(a=0;a<b.emitterEventListeners[e].length;a++)b.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);b.callPlugins&&b.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},b.on=function(e,a){return e=c(e),b.emitterEventListeners[e]||(b.emitterEventListeners[e]=[]),b.emitterEventListeners[e].push(a),b},b.off=function(e,a){var t;if(e=c(e),"undefined"==typeof a)return b.emitterEventListeners[e]=[],b;if(b.emitterEventListeners[e]&&0!==b.emitterEventListeners[e].length){for(t=0;t<b.emitterEventListeners[e].length;t++)b.emitterEventListeners[e][t]===a&&b.emitterEventListeners[e].splice(t,1);return b}},b.once=function(e,a){e=c(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),b.off(e,t)};return b.on(e,t),b},b.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(a(e.target).is(b.params.nextButton)?(b.onClickNext(e),b.isEnd?b.a11y.notify(b.params.lastSlideMessage):b.a11y.notify(b.params.nextSlideMessage)):a(e.target).is(b.params.prevButton)&&(b.onClickPrev(e),b.isBeginning?b.a11y.notify(b.params.firstSlideMessage):b.a11y.notify(b.params.prevSlideMessage)),a(e.target).is("."+b.params.bulletClass)&&a(e.target)[0].click())},liveRegion:a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=b.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(b.params.nextButton){var e=a(b.params.nextButton);b.a11y.makeFocusable(e),b.a11y.addRole(e,"button"),b.a11y.addLabel(e,b.params.nextSlideMessage)}if(b.params.prevButton){var t=a(b.params.prevButton);b.a11y.makeFocusable(t),b.a11y.addRole(t,"button"),b.a11y.addLabel(t,b.params.prevSlideMessage)}a(b.container).append(b.a11y.liveRegion)},initPagination:function(){b.params.pagination&&b.params.paginationClickable&&b.bullets&&b.bullets.length&&b.bullets.each(function(){var e=a(this);b.a11y.makeFocusable(e),b.a11y.addRole(e,"button"),b.a11y.addLabel(e,b.params.paginationBulletMessage.replace(/{{index}}/,e.index()+1))})},destroy:function(){b.a11y.liveRegion&&b.a11y.liveRegion.length>0&&b.a11y.liveRegion.remove()}},b.init=function(){b.params.loop&&b.createLoop(),b.updateContainerSize(),b.updateSlidesSize(),b.updatePagination(),b.params.scrollbar&&b.scrollbar&&(b.scrollbar.set(),b.params.scrollbarDraggable&&b.scrollbar.enableDraggable()),"slide"!==b.params.effect&&b.effects[b.params.effect]&&(b.params.loop||b.updateProgress(),b.effects[b.params.effect].setTranslate()),b.params.loop?b.slideTo(b.params.initialSlide+b.loopedSlides,0,b.params.runCallbacksOnInit):(b.slideTo(b.params.initialSlide,0,b.params.runCallbacksOnInit),0===b.params.initialSlide&&(b.parallax&&b.params.parallax&&b.parallax.setTranslate(),b.lazy&&b.params.lazyLoading&&(b.lazy.load(),b.lazy.initialImageLoaded=!0))),b.attachEvents(),b.params.observer&&b.support.observer&&b.initObservers(),b.params.preloadImages&&!b.params.lazyLoading&&b.preloadImages(),b.params.autoplay&&b.startAutoplay(),b.params.keyboardControl&&b.enableKeyboardControl&&b.enableKeyboardControl(),b.params.mousewheelControl&&b.enableMousewheelControl&&b.enableMousewheelControl(),b.params.hashnav&&b.hashnav&&b.hashnav.init(),b.params.a11y&&b.a11y&&b.a11y.init(),b.emit("onInit",b)},b.cleanupStyles=function(){b.container.removeClass(b.classNames.join(" ")).removeAttr("style"),b.wrapper.removeAttr("style"),b.slides&&b.slides.length&&b.slides.removeClass([b.params.slideVisibleClass,b.params.slideActiveClass,b.params.slideNextClass,b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),b.paginationContainer&&b.paginationContainer.length&&b.paginationContainer.removeClass(b.params.paginationHiddenClass),b.bullets&&b.bullets.length&&b.bullets.removeClass(b.params.bulletActiveClass),b.params.prevButton&&a(b.params.prevButton).removeClass(b.params.buttonDisabledClass),b.params.nextButton&&a(b.params.nextButton).removeClass(b.params.buttonDisabledClass),b.params.scrollbar&&b.scrollbar&&(b.scrollbar.track&&b.scrollbar.track.length&&b.scrollbar.track.removeAttr("style"),b.scrollbar.drag&&b.scrollbar.drag.length&&b.scrollbar.drag.removeAttr("style"))},b.destroy=function(e,a){b.detachEvents(),b.stopAutoplay(),b.params.scrollbar&&b.scrollbar&&b.params.scrollbarDraggable&&b.scrollbar.disableDraggable(),b.params.loop&&b.destroyLoop(),a&&b.cleanupStyles(),b.disconnectObservers(),b.params.keyboardControl&&b.disableKeyboardControl&&b.disableKeyboardControl(),b.params.mousewheelControl&&b.disableMousewheelControl&&b.disableMousewheelControl(),b.params.a11y&&b.a11y&&b.a11y.destroy(),b.emit("onDestroy"),e!==!1&&(b=null)},b.init(),b}};t.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),r=e.match(/(iPod)(.*OS\s([\d_]+))?/),s=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:t||s||r,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var r=["jQuery","Zepto","Dom7"],s=0;s<r.length;s++)window[r[s]]&&e(window[r[s]]);var i;i="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,i&&("transitionEnd"in i.fn||(i.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<r.length;t++)s.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(t=0;t<r.length;t++)s.on(r[t],a);return this}),"transform"in i.fn||(i.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in i.fn||(i.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this})),window.Swiper=t}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
//# sourceMappingURL=maps/swiper.jquery.min.js.map

/*
 * =====================================================
 * Initialize Swiper
 * =====================================================
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * =====================================================
 */
 var RC_initSwiper=function(){
    $('[data-extension="swiper"]').each(function(index, element){
         var $this = $(element);
         var pagination=$this.data('pagination');
         var button=$this.data('button');
         var speed=$this.data('speed'); 
         var spaceBetween=$this.data('spacebetween');
         var slidesPerView=$this.data('slidesperview');         
         var paginationClickable=$this.data('paginationclickable');
         var effect=$this.data('effect');
         var scrollbar=$this.data('scrollbar');
         var centeredSlides=$this.data('centeredslides');
         var loop=$this.data('loop');
         var autoplay=$this.data('autoplay');
         var direction=$this.data('direction');
         var e=$.Event('container.rc.swiper');
         $this.trigger(e); 

         if(button){
          	var prevBtn=$(document.createElement('div'))
         	    .addClass('swiper-button-prev')
         	    .appendTo($this);
         	var nextBtn=$(document.createElement('div'))
         	    .addClass('swiper-button-next')
         	    .appendTo($this);    
         }
         if(pagination){
         	var pagination=$(document.createElement('div'))
         	    .addClass('swiper-pagination')
         	    .appendTo($this);
         }
         if(scrollbar){
         	var scrollbar=$(document.createElement('div'))
         	    .addClass('swiper-scrollbar')
         	    .appendTo($this);	
         }     
                 
         $this.addClass("instance-" + index);         
	     var swiper = new Swiper(".instance-" + index, {
	     	 pagination: pagination?pagination:'',
	     	 paginationClickable: paginationClickable==null?true:(paginationClickable?true:false),
	     	 speed: speed?speed:300,
	     	 spaceBetween: spaceBetween?spaceBetween:0,
	     	 slidesPerView: slidesPerView?slidesPerView:1,
	     	 effect: effect?effect:'slide',
	     	 nextButton: button?nextBtn:'',
	     	 prevButton: button?prevBtn:'',
	     	 scrollbar: scrollbar?'.swiper-scrollbar':'',
	     	 centeredSlides: centeredSlides?true:false,
	     	 loop: loop?true:false,
	     	 autoplay: autoplay?autoplay:'',
	     	 direction: direction?direction:'horizontal',
         });
         swiper.on('Tap',function(e){
         	var $this = $(e.clickedSlide);
         	var component=$this.data('component');
         	if(component){
                var target=$this.data('target');
                var options=$.extend({}, $this.data());
                if(component=='modal') $(target).modal(options);
                else if(component=='popover') $(target).popover(options);
                else if(component=='popup') $(target).popup(options);
                else if(component=='fbutton') $(target).fbutton(options);
                else if(component=='sheet') $(target).sheet(options);
      	    }  
        });
    });
 }
window.addEventListener('push',RC_initSwiper);

/* =============================================================================================
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 * ==============================================================================================
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.2
 *===============================================================================================*/

 (function(c,b){var a=a||function(k){var f={element:null,dragger:null,disable:"none",addBodyClasses:true,hyperextensible:true,resistance:0.5,flickThreshold:50,transitionSpeed:0.3,easing:"ease",maxPosition:266,minPosition:-266,tapToClose:true,touchToDrag:true,slideIntent:40,minDragDistance:5},e={simpleStates:{opening:null,towards:null,hyperExtending:null,halfway:null,flick:null,translation:{absolute:0,relative:0,sinceDirectionChange:0,percentage:0}}},h={},d={hasTouch:(b.ontouchstart===null),eventType:function(m){var l={down:(d.hasTouch?"touchstart":"mousedown"),move:(d.hasTouch?"touchmove":"mousemove"),up:(d.hasTouch?"touchend":"mouseup"),out:(d.hasTouch?"touchcancel":"mouseout")};return l[m]},page:function(l,m){return(d.hasTouch&&m.touches.length&&m.touches[0])?m.touches[0]["page"+l]:m["page"+l]},klass:{has:function(m,l){return(m.className).indexOf(l)!==-1},add:function(m,l){if(!d.klass.has(m,l)&&f.addBodyClasses){m.className+=" "+l}},remove:function(m,l){if(f.addBodyClasses){m.className=(m.className).replace(l,"").replace(/^\s+|\s+$/g,"")}}},dispatchEvent:function(l){if(typeof h[l]==="function"){return h[l].call()}},vendor:function(){var m=b.createElement("div"),n="webkit Moz O ms".split(" "),l;for(l in n){if(typeof m.style[n[l]+"Transition"]!=="undefined"){return n[l]}}},transitionCallback:function(){return(e.vendor==="Moz"||e.vendor==="ms")?"transitionend":e.vendor+"TransitionEnd"},canTransform:function(){return typeof f.element.style[e.vendor+"Transform"]!=="undefined"},deepExtend:function(l,n){var m;for(m in n){if(n[m]&&n[m].constructor&&n[m].constructor===Object){l[m]=l[m]||{};d.deepExtend(l[m],n[m])}else{l[m]=n[m]}}return l},angleOfDrag:function(l,o){var n,m;m=Math.atan2(-(e.startDragY-o),(e.startDragX-l));if(m<0){m+=2*Math.PI}n=Math.floor(m*(180/Math.PI)-180);if(n<0&&n>-180){n=360-Math.abs(n)}return Math.abs(n)},events:{addEvent:function g(m,l,n){if(m.addEventListener){return m.addEventListener(l,n,false)}else{if(m.attachEvent){return m.attachEvent("on"+l,n)}}},removeEvent:function g(m,l,n){if(m.addEventListener){return m.removeEventListener(l,n,false)}else{if(m.attachEvent){return m.detachEvent("on"+l,n)}}},prevent:function(l){if(l.preventDefault){l.preventDefault()}else{l.returnValue=false}}},parentUntil:function(n,l){var m=typeof l==="string";while(n.parentNode){if(m&&n.getAttribute&&n.getAttribute(l)){return n}else{if(!m&&n===l){return n}}n=n.parentNode}return null}},i={translate:{get:{matrix:function(n){if(!d.canTransform()){return parseInt(f.element.style.left,10)}else{var m=c.getComputedStyle(f.element)[e.vendor+"Transform"].match(/\((.*)\)/),l=8;if(m){m=m[1].split(",");if(m.length===16){n+=l}return parseInt(m[n],10)}return 0}}},easeCallback:function(){f.element.style[e.vendor+"Transition"]="";e.translation=i.translate.get.matrix(4);e.easing=false;clearInterval(e.animatingInterval);if(e.easingTo===0){d.klass.remove(b.body,"snapjs-right");d.klass.remove(b.body,"snapjs-left")}d.dispatchEvent("animated");d.events.removeEvent(f.element,d.transitionCallback(),i.translate.easeCallback)},easeTo:function(l){if(!d.canTransform()){e.translation=l;i.translate.x(l)}else{e.easing=true;e.easingTo=l;f.element.style[e.vendor+"Transition"]="all "+f.transitionSpeed+"s "+f.easing;e.animatingInterval=setInterval(function(){d.dispatchEvent("animating")},1);d.events.addEvent(f.element,d.transitionCallback(),i.translate.easeCallback);i.translate.x(l)}if(l===0){f.element.style[e.vendor+"Transform"]=""}},x:function(m){if((f.disable==="left"&&m>0)||(f.disable==="right"&&m<0)){return}if(!f.hyperextensible){if(m===f.maxPosition||m>f.maxPosition){m=f.maxPosition}else{if(m===f.minPosition||m<f.minPosition){m=f.minPosition}}}m=parseInt(m,10);if(isNaN(m)){m=0}if(d.canTransform()){var l="translate3d("+m+"px, 0,0)";f.element.style[e.vendor+"Transform"]=l}else{f.element.style.width=(c.innerWidth||b.documentElement.clientWidth)+"px";f.element.style.left=m+"px";f.element.style.right=""}}},drag:{listen:function(){e.translation=0;e.easing=false;d.events.addEvent(f.element,d.eventType("down"),i.drag.startDrag);d.events.addEvent(f.element,d.eventType("move"),i.drag.dragging);d.events.addEvent(f.element,d.eventType("up"),i.drag.endDrag)},stopListening:function(){d.events.removeEvent(f.element,d.eventType("down"),i.drag.startDrag);d.events.removeEvent(f.element,d.eventType("move"),i.drag.dragging);d.events.removeEvent(f.element,d.eventType("up"),i.drag.endDrag)},startDrag:function(n){var m=n.target?n.target:n.srcElement,l=d.parentUntil(m,"data-snap-ignore");if(l){d.dispatchEvent("ignore");return}if(f.dragger){var o=d.parentUntil(m,f.dragger);if(!o&&(e.translation!==f.minPosition&&e.translation!==f.maxPosition)){return}}d.dispatchEvent("start");f.element.style[e.vendor+"Transition"]="";e.isDragging=true;e.hasIntent=null;e.intentChecked=false;e.startDragX=d.page("X",n);e.startDragY=d.page("Y",n);e.dragWatchers={current:0,last:0,hold:0,state:""};e.simpleStates={opening:null,towards:null,hyperExtending:null,halfway:null,flick:null,translation:{absolute:0,relative:0,sinceDirectionChange:0,percentage:0}}},dragging:function(s){if(e.isDragging&&f.touchToDrag){var v=d.page("X",s),u=d.page("Y",s),t=e.translation,o=i.translate.get.matrix(4),n=v-e.startDragX,p=o>0,q=n,w;if((e.intentChecked&&!e.hasIntent)){return}if(f.addBodyClasses){if((o)>0){d.klass.add(b.body,"snapjs-left");d.klass.remove(b.body,"snapjs-right")}else{if((o)<0){d.klass.add(b.body,"snapjs-right");d.klass.remove(b.body,"snapjs-left")}}}if(e.hasIntent===false||e.hasIntent===null){var m=d.angleOfDrag(v,u),l=(m>=0&&m<=f.slideIntent)||(m<=360&&m>(360-f.slideIntent)),r=(m>=180&&m<=(180+f.slideIntent))||(m<=180&&m>=(180-f.slideIntent));if(!r&&!l){e.hasIntent=false}else{e.hasIntent=true}e.intentChecked=true}if((f.minDragDistance>=Math.abs(v-e.startDragX))||(e.hasIntent===false)){return}d.events.prevent(s);d.dispatchEvent("drag");e.dragWatchers.current=v;if(e.dragWatchers.last>v){if(e.dragWatchers.state!=="left"){e.dragWatchers.state="left";e.dragWatchers.hold=v}e.dragWatchers.last=v}else{if(e.dragWatchers.last<v){if(e.dragWatchers.state!=="right"){e.dragWatchers.state="right";e.dragWatchers.hold=v}e.dragWatchers.last=v}}if(p){if(f.maxPosition<o){w=(o-f.maxPosition)*f.resistance;q=n-w}e.simpleStates={opening:"left",towards:e.dragWatchers.state,hyperExtending:f.maxPosition<o,halfway:o>(f.maxPosition/2),flick:Math.abs(e.dragWatchers.current-e.dragWatchers.hold)>f.flickThreshold,translation:{absolute:o,relative:n,sinceDirectionChange:(e.dragWatchers.current-e.dragWatchers.hold),percentage:(o/f.maxPosition)*100}}}else{if(f.minPosition>o){w=(o-f.minPosition)*f.resistance;q=n-w}e.simpleStates={opening:"right",towards:e.dragWatchers.state,hyperExtending:f.minPosition>o,halfway:o<(f.minPosition/2),flick:Math.abs(e.dragWatchers.current-e.dragWatchers.hold)>f.flickThreshold,translation:{absolute:o,relative:n,sinceDirectionChange:(e.dragWatchers.current-e.dragWatchers.hold),percentage:(o/f.minPosition)*100}}}i.translate.x(q+t)}},endDrag:function(m){if(e.isDragging){d.dispatchEvent("end");var l=i.translate.get.matrix(4);if(e.dragWatchers.current===0&&l!==0&&f.tapToClose){d.dispatchEvent("close");d.events.prevent(m);i.translate.easeTo(0);e.isDragging=false;e.startDragX=0;return}if(e.simpleStates.opening==="left"){if((e.simpleStates.halfway||e.simpleStates.hyperExtending||e.simpleStates.flick)){if(e.simpleStates.flick&&e.simpleStates.towards==="left"){i.translate.easeTo(0)}else{if((e.simpleStates.flick&&e.simpleStates.towards==="right")||(e.simpleStates.halfway||e.simpleStates.hyperExtending)){i.translate.easeTo(f.maxPosition)}}}else{i.translate.easeTo(0)}}else{if(e.simpleStates.opening==="right"){if((e.simpleStates.halfway||e.simpleStates.hyperExtending||e.simpleStates.flick)){if(e.simpleStates.flick&&e.simpleStates.towards==="right"){i.translate.easeTo(0)}else{if((e.simpleStates.flick&&e.simpleStates.towards==="left")||(e.simpleStates.halfway||e.simpleStates.hyperExtending)){i.translate.easeTo(f.minPosition)}}}else{i.translate.easeTo(0)}}}e.isDragging=false;e.startDragX=d.page("X",m)}}}},j=function(l){if(l.element){d.deepExtend(f,l);e.vendor=d.vendor();i.drag.listen()}};this.open=function(l){d.dispatchEvent("open");d.klass.remove(b.body,"snapjs-expand-left");d.klass.remove(b.body,"snapjs-expand-right");if(l==="left"){e.simpleStates.opening="left";e.simpleStates.towards="right";d.klass.add(b.body,"snapjs-left");d.klass.remove(b.body,"snapjs-right");i.translate.easeTo(f.maxPosition)}else{if(l==="right"){e.simpleStates.opening="right";e.simpleStates.towards="left";d.klass.remove(b.body,"snapjs-left");d.klass.add(b.body,"snapjs-right");i.translate.easeTo(f.minPosition)}}};this.close=function(){d.dispatchEvent("close");i.translate.easeTo(0)};this.expand=function(l){var m=c.innerWidth||b.documentElement.clientWidth;if(l==="left"){d.dispatchEvent("expandLeft");d.klass.add(b.body,"snapjs-expand-left");d.klass.remove(b.body,"snapjs-expand-right")}else{d.dispatchEvent("expandRight");d.klass.add(b.body,"snapjs-expand-right");d.klass.remove(b.body,"snapjs-expand-left");m*=-1}i.translate.easeTo(m)};this.on=function(l,m){h[l]=m;return this};this.off=function(l){if(h[l]){h[l]=false}};this.enable=function(){d.dispatchEvent("enable");i.drag.listen()};this.disable=function(){d.dispatchEvent("disable");i.drag.stopListening()};this.settings=function(l){d.deepExtend(f,l)};this.state=function(){var l,m=i.translate.get.matrix(4);if(m===f.maxPosition){l="left"}else{if(m===f.minPosition){l="right"}else{l="closed"}}return{state:l,info:e.simpleStates}};j(k)};if((typeof module!=="undefined")&&module.exports){module.exports=a}if(typeof ender==="undefined"){this.Snap=a}if((typeof define==="function")&&define.amd){define("snap",[],function(){return a})}}).call(this,window,document);

// Function : Initialize Snap.js
var RC_initDrawer=function(){
    if(window.snapper==undefined){
        // Initialize Snap.js
        window.snapper = new Snap({
            element: $('[data-extension="drawer"]')[0]
        });
    } else {
        // Snap.js already exists, we just need to re-bind events
        window.snapper.enable();   
    }
    var snap_update={
        tapToClose: false,
        touchToDrag: false
    }
    window.snapper.settings(snap_update);
} 
window.addEventListener('push',RC_initDrawer);

/* ========================================================================
 * RC - Drawer.js
 * ========================================================================
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Drawer CLASS DEFINITION
      // ======================

      var Drawer = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
            this.showType           = this.options.showtype?this.options.showtype:'default'
            this.direction          = this.options.direction?this.options.direction:'left'
            this.snap_update = {
			    transitionSpeed: this.options.speed?this.options.speed:0.3,
                easing: this.options.animation?this.options.animation:'ease', 
	        }
	        snapper.settings(this.snap_update);
      }

      Drawer.VERSION  = '1.1.0'
      Drawer.DEFAULTS = {
            show: true,
            afterDrawer : true,
            history : true,
            backdrop : true,
            bcontainer : '.snap-content'
      }

      Drawer.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
      }
 
      Drawer.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.drawer', { relatedTarget: _relatedTarget })
            var title =this.title;
            var drawer=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 
            var url =this.url;
            if(url!=null) url=url.toString();
            var animation=this.options.animation?this.options.animation:'';
            var template=this.options.template;
            var bcontainer=this.options.bcontainer;
            var tplContainer=this.options.tplcontainer?drawer+' '+this.options.tplcontainer:drawer;
            this.$element.trigger(e);
            this.isShown = true
      
           // init Utility
            var utility=new Utility(drawer,this.options).init();  
            if(!template){
                 utility.setdataVal(drawer,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{ 
               $(tplContainer).load(template,$.proxy(function(){
                    utility.setdataVal(drawer,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                    this.afterTemplate(this,_relatedTarget);
               },this));   
            }
      
            this.$element.on('tap.dismiss.rc.drawer', '[data-dismiss="drawer"]', $.proxy(this.hide, this)) 
            
            if(this.options.backdrop) this.backdrop();// add backdrop 
            
            // drawer open
            if(this.showType=='default') snapper.open(this.direction)
            else if(this.showType=='expand') snapper.expand(this.direction)     
            else if(this.showType=='toggle') {
                if(snapper.state().state==this.direction) this.hide() 
                else snapper.open(this.direction)	
            }
      
            if(this.options.history){
                // 브라우저 history 객체에 추가 
                var object = {'type': 'drawer','target': {'id':drawer,'bcontainer':bcontainer,'backdrop':this.options.backdrop}}
                utility.addHistoryObject(object,title,url);  
            }
          
           this.afterDrawer(this,_relatedTarget);              
      }

      Drawer.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.drawer', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);  
      }

      Drawer.prototype.afterDrawer=function(obj,_relatedTarget){
            var e = $.Event('shown.rc.drawer', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);
      }

      Drawer.prototype.hide = function (e) {
           if(this.options.history) history.back();
           else this.nonHistoryHide();
           var backdrop=$(this.options.bcontainer).find('.backdrop');
          $(backdrop).remove();  
      }
     
      Drawer.prototype.historyHide = function (e) {
            this.isShown = false
            var direction=this.options.direction=='left'?'right':'left';
            snapper.close(direction)
            if (e) e.preventDefault()
            var e    = $.Event('hide.rc.drawer');
            this.$element.trigger(e) 
            this.afterHide();
      }

      Drawer.prototype.nonHistoryHide = function () {
            this.isShown = false
            var direction=this.options.direction=='left'?'right':'left';
            snapper.close(direction)
            var drawer=this.$element;
            var e    = $.Event('hide.rc.drawer');
            $(drawer).trigger(e)
            this.afterHide();
      }

      Drawer.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.drawer');
           this.$element.trigger(e);     
      }

      Drawer.prototype.backdrop = function (callback) {   
          if (this.isShown && this.options.backdrop) {
               this.$backdrop = $(document.createElement('div'))
                  .addClass('backdrop')
                  .appendTo(this.options.bcontainer)
               this.$backdrop.on('tap.dismiss.rc.drawer', $.proxy(function (e) {
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

      var old = $.fn.drawer

      $.fn.drawer             = Plugin
      $.fn.drawer.Constructor = Drawer


        // DRAWER NO CONFLICT
        // =================

      $.fn.drawer.noConflict = function () {
            $.fn.drawer = old
            return this
      }

      // DRAWER PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
      	    return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Drawer.DEFAULTS, $this.data(), typeof option == 'object' && option)
                            
                var data = new Drawer(this, options)
                if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                else if (options.show) data.show(_relatedTarget)
            })
       }
      
      // DRAWER DATA-API
      // ==============
       
     $(document).on('tap.rc.drawer.data-api', '[data-toggle="drawer"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.drawer') ? 'toggle' : $.extend({}, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

          $target.one('show.rc.drawer', function (showEvent) {
                if (showEvent.isDefaultPrevented()) return // only register focus restorer if Popup will actually get shown
                $target.one('hidden.rc.drawer', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
          }) 
          Plugin.call($target, option, this)
      })

}(jQuery));


/*! PhotoSwipe - v4.1.1 - 2015-12-24
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipe=b()}(this,function(){"use strict";var a=function(a,b,c,d){var e={features:null,bind:function(a,b,c,d){var e=(d?"remove":"add")+"EventListener";b=b.split(" ");for(var f=0;f<b.length;f++)b[f]&&a[e](b[f],c,!1)},isArray:function(a){return a instanceof Array},createEl:function(a,b){var c=document.createElement(b||"div");return a&&(c.className=a),c},getScrollY:function(){var a=window.pageYOffset;return void 0!==a?a:document.documentElement.scrollTop},unbind:function(a,b,c){e.bind(a,b,c,!0)},removeClass:function(a,b){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(a,b){e.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},hasClass:function(a,b){return a.className&&new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},getChildByClass:function(a,b){for(var c=a.firstChild;c;){if(e.hasClass(c,b))return c;c=c.nextSibling}},arraySearch:function(a,b,c){for(var d=a.length;d--;)if(a[d][c]===b)return d;return-1},extend:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){if(c&&a.hasOwnProperty(d))continue;a[d]=b[d]}},easing:{sine:{out:function(a){return Math.sin(a*(Math.PI/2))},inOut:function(a){return-(Math.cos(Math.PI*a)-1)/2}},cubic:{out:function(a){return--a*a*a+1}}},detectFeatures:function(){if(e.features)return e.features;var a=e.createEl(),b=a.style,c="",d={};if(d.oldIE=document.all&&!document.addEventListener,d.touch="ontouchstart"in window,window.requestAnimationFrame&&(d.raf=window.requestAnimationFrame,d.caf=window.cancelAnimationFrame),d.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!d.pointerEvent){var f=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var g=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);g&&g.length>0&&(g=parseInt(g[1],10),g>=1&&8>g&&(d.isOldIOSPhone=!0))}var h=f.match(/Android\s([0-9\.]*)/),i=h?h[1]:0;i=parseFloat(i),i>=1&&(4.4>i&&(d.isOldAndroid=!0),d.androidVersion=i),d.isMobileOpera=/opera mini|opera mobi/i.test(f)}for(var j,k,l=["transform","perspective","animationName"],m=["","webkit","Moz","ms","O"],n=0;4>n;n++){c=m[n];for(var o=0;3>o;o++)j=l[o],k=c+(c?j.charAt(0).toUpperCase()+j.slice(1):j),!d[j]&&k in b&&(d[j]=k);c&&!d.raf&&(c=c.toLowerCase(),d.raf=window[c+"RequestAnimationFrame"],d.raf&&(d.caf=window[c+"CancelAnimationFrame"]||window[c+"CancelRequestAnimationFrame"]))}if(!d.raf){var p=0;d.raf=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-p)),d=window.setTimeout(function(){a(b+c)},c);return p=b+c,d},d.caf=function(a){clearTimeout(a)}}return d.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,e.features=d,d}};e.detectFeatures(),e.features.oldIE&&(e.bind=function(a,b,c,d){b=b.split(" ");for(var e,f=(d?"detach":"attach")+"Event",g=function(){c.handleEvent.call(c)},h=0;h<b.length;h++)if(e=b[h])if("object"==typeof c&&c.handleEvent){if(d){if(!c["oldIE"+e])return!1}else c["oldIE"+e]=g;a[f]("on"+e,c["oldIE"+e])}else a[f]("on"+e,c)});var f=this,g=25,h=3,i={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(a){return"A"===a.tagName},getDoubleTapZoom:function(a,b){return a?1:b.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};e.extend(i,d);var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la=function(){return{x:0,y:0}},ma=la(),na=la(),oa=la(),pa={},qa=0,ra={},sa=la(),ta=0,ua=!0,va=[],wa={},xa=!1,ya=function(a,b){e.extend(f,b.publicMethods),va.push(a)},za=function(a){var b=_b();return a>b-1?a-b:0>a?b+a:a},Aa={},Ba=function(a,b){return Aa[a]||(Aa[a]=[]),Aa[a].push(b)},Ca=function(a){var b=Aa[a];if(b){var c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<b.length;d++)b[d].apply(f,c)}},Da=function(){return(new Date).getTime()},Ea=function(a){ia=a,f.bg.style.opacity=a*i.bgOpacity},Fa=function(a,b,c,d,e){(!xa||e&&e!==f.currItem)&&(d/=e?e.fitRatio:f.currItem.fitRatio),a[E]=u+b+"px, "+c+"px"+v+" scale("+d+")"},Ga=function(a){da&&(a&&(s>f.currItem.fitRatio?xa||(lc(f.currItem,!1,!0),xa=!0):xa&&(lc(f.currItem),xa=!1)),Fa(da,oa.x,oa.y,s))},Ha=function(a){a.container&&Fa(a.container.style,a.initialPosition.x,a.initialPosition.y,a.initialZoomLevel,a)},Ia=function(a,b){b[E]=u+a+"px, 0px"+v},Ja=function(a,b){if(!i.loop&&b){var c=m+(sa.x*qa-a)/sa.x,d=Math.round(a-sb.x);(0>c&&d>0||c>=_b()-1&&0>d)&&(a=sb.x+d*i.mainScrollEndFriction)}sb.x=a,Ia(a,n)},Ka=function(a,b){var c=tb[a]-ra[a];return na[a]+ma[a]+c-c*(b/t)},La=function(a,b){a.x=b.x,a.y=b.y,b.id&&(a.id=b.id)},Ma=function(a){a.x=Math.round(a.x),a.y=Math.round(a.y)},Na=null,Oa=function(){Na&&(e.unbind(document,"mousemove",Oa),e.addClass(a,"pswp--has_mouse"),i.mouseUsed=!0,Ca("mouseUsed")),Na=setTimeout(function(){Na=null},100)},Pa=function(){e.bind(document,"keydown",f),N.transform&&e.bind(f.scrollWrap,"click",f),i.mouseUsed||e.bind(document,"mousemove",Oa),e.bind(window,"resize scroll",f),Ca("bindEvents")},Qa=function(){e.unbind(window,"resize",f),e.unbind(window,"scroll",r.scroll),e.unbind(document,"keydown",f),e.unbind(document,"mousemove",Oa),N.transform&&e.unbind(f.scrollWrap,"click",f),U&&e.unbind(window,p,f),Ca("unbindEvents")},Ra=function(a,b){var c=hc(f.currItem,pa,a);return b&&(ca=c),c},Sa=function(a){return a||(a=f.currItem),a.initialZoomLevel},Ta=function(a){return a||(a=f.currItem),a.w>0?i.maxSpreadZoom:1},Ua=function(a,b,c,d){return d===f.currItem.initialZoomLevel?(c[a]=f.currItem.initialPosition[a],!0):(c[a]=Ka(a,d),c[a]>b.min[a]?(c[a]=b.min[a],!0):c[a]<b.max[a]?(c[a]=b.max[a],!0):!1)},Va=function(){if(E){var b=N.perspective&&!G;return u="translate"+(b?"3d(":"("),void(v=N.perspective?", 0px)":")")}E="left",e.addClass(a,"pswp--ie"),Ia=function(a,b){b.left=a+"px"},Ha=function(a){var b=a.fitRatio>1?1:a.fitRatio,c=a.container.style,d=b*a.w,e=b*a.h;c.width=d+"px",c.height=e+"px",c.left=a.initialPosition.x+"px",c.top=a.initialPosition.y+"px"},Ga=function(){if(da){var a=da,b=f.currItem,c=b.fitRatio>1?1:b.fitRatio,d=c*b.w,e=c*b.h;a.width=d+"px",a.height=e+"px",a.left=oa.x+"px",a.top=oa.y+"px"}}},Wa=function(a){var b="";i.escKey&&27===a.keyCode?b="close":i.arrowKeys&&(37===a.keyCode?b="prev":39===a.keyCode&&(b="next")),b&&(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||(a.preventDefault?a.preventDefault():a.returnValue=!1,f[b]()))},Xa=function(a){a&&(X||W||ea||S)&&(a.preventDefault(),a.stopPropagation())},Ya=function(){f.setScrollOffset(0,e.getScrollY())},Za={},$a=0,_a=function(a){Za[a]&&(Za[a].raf&&I(Za[a].raf),$a--,delete Za[a])},ab=function(a){Za[a]&&_a(a),Za[a]||($a++,Za[a]={})},bb=function(){for(var a in Za)Za.hasOwnProperty(a)&&_a(a)},cb=function(a,b,c,d,e,f,g){var h,i=Da();ab(a);var j=function(){if(Za[a]){if(h=Da()-i,h>=d)return _a(a),f(c),void(g&&g());f((c-b)*e(h/d)+b),Za[a].raf=H(j)}};j()},db={shout:Ca,listen:Ba,viewportSize:pa,options:i,isMainScrollAnimating:function(){return ea},getZoomLevel:function(){return s},getCurrentIndex:function(){return m},isDragging:function(){return U},isZooming:function(){return _},setScrollOffset:function(a,b){ra.x=a,M=ra.y=b,Ca("updateScrollOffset",ra)},applyZoomPan:function(a,b,c,d){oa.x=b,oa.y=c,s=a,Ga(d)},init:function(){if(!j&&!k){var c;f.framework=e,f.template=a,f.bg=e.getChildByClass(a,"pswp__bg"),J=a.className,j=!0,N=e.detectFeatures(),H=N.raf,I=N.caf,E=N.transform,L=N.oldIE,f.scrollWrap=e.getChildByClass(a,"pswp__scroll-wrap"),f.container=e.getChildByClass(f.scrollWrap,"pswp__container"),n=f.container.style,f.itemHolders=y=[{el:f.container.children[0],wrap:0,index:-1},{el:f.container.children[1],wrap:0,index:-1},{el:f.container.children[2],wrap:0,index:-1}],y[0].el.style.display=y[2].el.style.display="none",Va(),r={resize:f.updateSize,scroll:Ya,keydown:Wa,click:Xa};var d=N.isOldIOSPhone||N.isOldAndroid||N.isMobileOpera;for(N.animationName&&N.transform&&!d||(i.showAnimationDuration=i.hideAnimationDuration=0),c=0;c<va.length;c++)f["init"+va[c]]();if(b){var g=f.ui=new b(f,e);g.init()}Ca("firstUpdate"),m=m||i.index||0,(isNaN(m)||0>m||m>=_b())&&(m=0),f.currItem=$b(m),(N.isOldIOSPhone||N.isOldAndroid)&&(ua=!1),a.setAttribute("aria-hidden","false"),i.modal&&(ua?a.style.position="fixed":(a.style.position="absolute",a.style.top=e.getScrollY()+"px")),void 0===M&&(Ca("initialLayout"),M=K=e.getScrollY());var l="pswp--open ";for(i.mainClass&&(l+=i.mainClass+" "),i.showHideOpacity&&(l+="pswp--animate_opacity "),l+=G?"pswp--touch":"pswp--notouch",l+=N.animationName?" pswp--css_animation":"",l+=N.svg?" pswp--svg":"",e.addClass(a,l),f.updateSize(),o=-1,ta=null,c=0;h>c;c++)Ia((c+o)*sa.x,y[c].el.style);L||e.bind(f.scrollWrap,q,f),Ba("initialZoomInEnd",function(){f.setContent(y[0],m-1),f.setContent(y[2],m+1),y[0].el.style.display=y[2].el.style.display="block",i.focus&&a.focus(),Pa()}),f.setContent(y[1],m),f.updateCurrItem(),Ca("afterInit"),ua||(w=setInterval(function(){$a||U||_||s!==f.currItem.initialZoomLevel||f.updateSize()},1e3)),e.addClass(a,"pswp--visible")}},close:function(){j&&(j=!1,k=!0,Ca("close"),Qa(),bc(f.currItem,null,!0,f.destroy))},destroy:function(){Ca("destroy"),Wb&&clearTimeout(Wb),a.setAttribute("aria-hidden","true"),a.className=J,w&&clearInterval(w),e.unbind(f.scrollWrap,q,f),e.unbind(window,"scroll",f),yb(),bb(),Aa=null},panTo:function(a,b,c){c||(a>ca.min.x?a=ca.min.x:a<ca.max.x&&(a=ca.max.x),b>ca.min.y?b=ca.min.y:b<ca.max.y&&(b=ca.max.y)),oa.x=a,oa.y=b,Ga()},handleEvent:function(a){a=a||window.event,r[a.type]&&r[a.type](a)},goTo:function(a){a=za(a);var b=a-m;ta=b,m=a,f.currItem=$b(m),qa-=b,Ja(sa.x*qa),bb(),ea=!1,f.updateCurrItem()},next:function(){f.goTo(m+1)},prev:function(){f.goTo(m-1)},updateCurrZoomItem:function(a){if(a&&Ca("beforeChange",0),y[1].el.children.length){var b=y[1].el.children[0];da=e.hasClass(b,"pswp__zoom-wrap")?b.style:null}else da=null;ca=f.currItem.bounds,t=s=f.currItem.initialZoomLevel,oa.x=ca.center.x,oa.y=ca.center.y,a&&Ca("afterChange")},invalidateCurrItems:function(){x=!0;for(var a=0;h>a;a++)y[a].item&&(y[a].item.needsUpdate=!0)},updateCurrItem:function(a){if(0!==ta){var b,c=Math.abs(ta);if(!(a&&2>c)){f.currItem=$b(m),xa=!1,Ca("beforeChange",ta),c>=h&&(o+=ta+(ta>0?-h:h),c=h);for(var d=0;c>d;d++)ta>0?(b=y.shift(),y[h-1]=b,o++,Ia((o+2)*sa.x,b.el.style),f.setContent(b,m-c+d+1+1)):(b=y.pop(),y.unshift(b),o--,Ia(o*sa.x,b.el.style),f.setContent(b,m+c-d-1-1));if(da&&1===Math.abs(ta)){var e=$b(z);e.initialZoomLevel!==s&&(hc(e,pa),lc(e),Ha(e))}ta=0,f.updateCurrZoomItem(),z=m,Ca("afterChange")}}},updateSize:function(b){if(!ua&&i.modal){var c=e.getScrollY();if(M!==c&&(a.style.top=c+"px",M=c),!b&&wa.x===window.innerWidth&&wa.y===window.innerHeight)return;wa.x=window.innerWidth,wa.y=window.innerHeight,a.style.height=wa.y+"px"}if(pa.x=f.scrollWrap.clientWidth,pa.y=f.scrollWrap.clientHeight,Ya(),sa.x=pa.x+Math.round(pa.x*i.spacing),sa.y=pa.y,Ja(sa.x*qa),Ca("beforeResize"),void 0!==o){for(var d,g,j,k=0;h>k;k++)d=y[k],Ia((k+o)*sa.x,d.el.style),j=m+k-1,i.loop&&_b()>2&&(j=za(j)),g=$b(j),g&&(x||g.needsUpdate||!g.bounds)?(f.cleanSlide(g),f.setContent(d,j),1===k&&(f.currItem=g,f.updateCurrZoomItem(!0)),g.needsUpdate=!1):-1===d.index&&j>=0&&f.setContent(d,j),g&&g.container&&(hc(g,pa),lc(g),Ha(g));x=!1}t=s=f.currItem.initialZoomLevel,ca=f.currItem.bounds,ca&&(oa.x=ca.center.x,oa.y=ca.center.y,Ga(!0)),Ca("resize")},zoomTo:function(a,b,c,d,f){b&&(t=s,tb.x=Math.abs(b.x)-oa.x,tb.y=Math.abs(b.y)-oa.y,La(na,oa));var g=Ra(a,!1),h={};Ua("x",g,h,a),Ua("y",g,h,a);var i=s,j={x:oa.x,y:oa.y};Ma(h);var k=function(b){1===b?(s=a,oa.x=h.x,oa.y=h.y):(s=(a-i)*b+i,oa.x=(h.x-j.x)*b+j.x,oa.y=(h.y-j.y)*b+j.y),f&&f(b),Ga(1===b)};c?cb("customZoomTo",0,1,c,d||e.easing.sine.inOut,k):k(1)}},eb=30,fb=10,gb={},hb={},ib={},jb={},kb={},lb=[],mb={},nb=[],ob={},pb=0,qb=la(),rb=0,sb=la(),tb=la(),ub=la(),vb=function(a,b){return a.x===b.x&&a.y===b.y},wb=function(a,b){return Math.abs(a.x-b.x)<g&&Math.abs(a.y-b.y)<g},xb=function(a,b){return ob.x=Math.abs(a.x-b.x),ob.y=Math.abs(a.y-b.y),Math.sqrt(ob.x*ob.x+ob.y*ob.y)},yb=function(){Y&&(I(Y),Y=null)},zb=function(){U&&(Y=H(zb),Pb())},Ab=function(){return!("fit"===i.scaleMode&&s===f.currItem.initialZoomLevel)},Bb=function(a,b){return a&&a!==document?a.getAttribute("class")&&a.getAttribute("class").indexOf("pswp__scroll-wrap")>-1?!1:b(a)?a:Bb(a.parentNode,b):!1},Cb={},Db=function(a,b){return Cb.prevent=!Bb(a.target,i.isClickableElement),Ca("preventDragEvent",a,b,Cb),Cb.prevent},Eb=function(a,b){return b.x=a.pageX,b.y=a.pageY,b.id=a.identifier,b},Fb=function(a,b,c){c.x=.5*(a.x+b.x),c.y=.5*(a.y+b.y)},Gb=function(a,b,c){if(a-P>50){var d=nb.length>2?nb.shift():{};d.x=b,d.y=c,nb.push(d),P=a}},Hb=function(){var a=oa.y-f.currItem.initialPosition.y;return 1-Math.abs(a/(pa.y/2))},Ib={},Jb={},Kb=[],Lb=function(a){for(;Kb.length>0;)Kb.pop();return F?(ka=0,lb.forEach(function(a){0===ka?Kb[0]=a:1===ka&&(Kb[1]=a),ka++})):a.type.indexOf("touch")>-1?a.touches&&a.touches.length>0&&(Kb[0]=Eb(a.touches[0],Ib),a.touches.length>1&&(Kb[1]=Eb(a.touches[1],Jb))):(Ib.x=a.pageX,Ib.y=a.pageY,Ib.id="",Kb[0]=Ib),Kb},Mb=function(a,b){var c,d,e,g,h=0,j=oa[a]+b[a],k=b[a]>0,l=sb.x+b.x,m=sb.x-mb.x;return c=j>ca.min[a]||j<ca.max[a]?i.panEndFriction:1,j=oa[a]+b[a]*c,!i.allowPanToNext&&s!==f.currItem.initialZoomLevel||(da?"h"!==fa||"x"!==a||W||(k?(j>ca.min[a]&&(c=i.panEndFriction,h=ca.min[a]-j,d=ca.min[a]-na[a]),(0>=d||0>m)&&_b()>1?(g=l,0>m&&l>mb.x&&(g=mb.x)):ca.min.x!==ca.max.x&&(e=j)):(j<ca.max[a]&&(c=i.panEndFriction,h=j-ca.max[a],d=na[a]-ca.max[a]),(0>=d||m>0)&&_b()>1?(g=l,m>0&&l<mb.x&&(g=mb.x)):ca.min.x!==ca.max.x&&(e=j))):g=l,"x"!==a)?void(ea||Z||s>f.currItem.fitRatio&&(oa[a]+=b[a]*c)):(void 0!==g&&(Ja(g,!0),Z=g===mb.x?!1:!0),ca.min.x!==ca.max.x&&(void 0!==e?oa.x=e:Z||(oa.x+=b.x*c)),void 0!==g)},Nb=function(a){if(!("mousedown"===a.type&&a.button>0)){if(Zb)return void a.preventDefault();if(!T||"mousedown"!==a.type){if(Db(a,!0)&&a.preventDefault(),Ca("pointerDown"),F){var b=e.arraySearch(lb,a.pointerId,"id");0>b&&(b=lb.length),lb[b]={x:a.pageX,y:a.pageY,id:a.pointerId}}var c=Lb(a),d=c.length;$=null,bb(),U&&1!==d||(U=ga=!0,e.bind(window,p,f),R=ja=ha=S=Z=X=V=W=!1,fa=null,Ca("firstTouchStart",c),La(na,oa),ma.x=ma.y=0,La(jb,c[0]),La(kb,jb),mb.x=sa.x*qa,nb=[{x:jb.x,y:jb.y}],P=O=Da(),Ra(s,!0),yb(),zb()),!_&&d>1&&!ea&&!Z&&(t=s,W=!1,_=V=!0,ma.y=ma.x=0,La(na,oa),La(gb,c[0]),La(hb,c[1]),Fb(gb,hb,ub),tb.x=Math.abs(ub.x)-oa.x,tb.y=Math.abs(ub.y)-oa.y,aa=ba=xb(gb,hb))}}},Ob=function(a){if(a.preventDefault(),F){var b=e.arraySearch(lb,a.pointerId,"id");if(b>-1){var c=lb[b];c.x=a.pageX,c.y=a.pageY}}if(U){var d=Lb(a);if(fa||X||_)$=d;else if(sb.x!==sa.x*qa)fa="h";else{var f=Math.abs(d[0].x-jb.x)-Math.abs(d[0].y-jb.y);Math.abs(f)>=fb&&(fa=f>0?"h":"v",$=d)}}},Pb=function(){if($){var a=$.length;if(0!==a)if(La(gb,$[0]),ib.x=gb.x-jb.x,ib.y=gb.y-jb.y,_&&a>1){if(jb.x=gb.x,jb.y=gb.y,!ib.x&&!ib.y&&vb($[1],hb))return;La(hb,$[1]),W||(W=!0,Ca("zoomGestureStarted"));var b=xb(gb,hb),c=Ub(b);c>f.currItem.initialZoomLevel+f.currItem.initialZoomLevel/15&&(ja=!0);var d=1,e=Sa(),g=Ta();if(e>c)if(i.pinchToClose&&!ja&&t<=f.currItem.initialZoomLevel){var h=e-c,j=1-h/(e/1.2);Ea(j),Ca("onPinchClose",j),ha=!0}else d=(e-c)/e,d>1&&(d=1),c=e-d*(e/3);else c>g&&(d=(c-g)/(6*e),d>1&&(d=1),c=g+d*e);0>d&&(d=0),aa=b,Fb(gb,hb,qb),ma.x+=qb.x-ub.x,ma.y+=qb.y-ub.y,La(ub,qb),oa.x=Ka("x",c),oa.y=Ka("y",c),R=c>s,s=c,Ga()}else{if(!fa)return;if(ga&&(ga=!1,Math.abs(ib.x)>=fb&&(ib.x-=$[0].x-kb.x),Math.abs(ib.y)>=fb&&(ib.y-=$[0].y-kb.y)),jb.x=gb.x,jb.y=gb.y,0===ib.x&&0===ib.y)return;if("v"===fa&&i.closeOnVerticalDrag&&!Ab()){ma.y+=ib.y,oa.y+=ib.y;var k=Hb();return S=!0,Ca("onVerticalDrag",k),Ea(k),void Ga()}Gb(Da(),gb.x,gb.y),X=!0,ca=f.currItem.bounds;var l=Mb("x",ib);l||(Mb("y",ib),Ma(oa),Ga())}}},Qb=function(a){if(N.isOldAndroid){if(T&&"mouseup"===a.type)return;a.type.indexOf("touch")>-1&&(clearTimeout(T),T=setTimeout(function(){T=0},600))}Ca("pointerUp"),Db(a,!1)&&a.preventDefault();var b;if(F){var c=e.arraySearch(lb,a.pointerId,"id");if(c>-1)if(b=lb.splice(c,1)[0],navigator.pointerEnabled)b.type=a.pointerType||"mouse";else{var d={4:"mouse",2:"touch",3:"pen"};b.type=d[a.pointerType],b.type||(b.type=a.pointerType||"mouse")}}var g,h=Lb(a),j=h.length;if("mouseup"===a.type&&(j=0),2===j)return $=null,!0;1===j&&La(kb,h[0]),0!==j||fa||ea||(b||("mouseup"===a.type?b={x:a.pageX,y:a.pageY,type:"mouse"}:a.changedTouches&&a.changedTouches[0]&&(b={x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY,type:"touch"})),Ca("touchRelease",a,b));var k=-1;if(0===j&&(U=!1,e.unbind(window,p,f),yb(),_?k=0:-1!==rb&&(k=Da()-rb)),rb=1===j?Da():-1,g=-1!==k&&150>k?"zoom":"swipe",_&&2>j&&(_=!1,1===j&&(g="zoomPointerUp"),Ca("zoomGestureEnded")),$=null,X||W||ea||S)if(bb(),Q||(Q=Rb()),Q.calculateSwipeSpeed("x"),S){var l=Hb();if(l<i.verticalDragRange)f.close();else{var m=oa.y,n=ia;cb("verticalDrag",0,1,300,e.easing.cubic.out,function(a){oa.y=(f.currItem.initialPosition.y-m)*a+m,Ea((1-n)*a+n),Ga()}),Ca("onVerticalDrag",1)}}else{if((Z||ea)&&0===j){var o=Tb(g,Q);if(o)return;g="zoomPointerUp"}if(!ea)return"swipe"!==g?void Vb():void(!Z&&s>f.currItem.fitRatio&&Sb(Q))}},Rb=function(){var a,b,c={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(d){nb.length>1?(a=Da()-P+50,b=nb[nb.length-2][d]):(a=Da()-O,b=kb[d]),c.lastFlickOffset[d]=jb[d]-b,c.lastFlickDist[d]=Math.abs(c.lastFlickOffset[d]),c.lastFlickDist[d]>20?c.lastFlickSpeed[d]=c.lastFlickOffset[d]/a:c.lastFlickSpeed[d]=0,Math.abs(c.lastFlickSpeed[d])<.1&&(c.lastFlickSpeed[d]=0),c.slowDownRatio[d]=.95,c.slowDownRatioReverse[d]=1-c.slowDownRatio[d],c.speedDecelerationRatio[d]=1},calculateOverBoundsAnimOffset:function(a,b){c.backAnimStarted[a]||(oa[a]>ca.min[a]?c.backAnimDestination[a]=ca.min[a]:oa[a]<ca.max[a]&&(c.backAnimDestination[a]=ca.max[a]),void 0!==c.backAnimDestination[a]&&(c.slowDownRatio[a]=.7,c.slowDownRatioReverse[a]=1-c.slowDownRatio[a],c.speedDecelerationRatioAbs[a]<.05&&(c.lastFlickSpeed[a]=0,c.backAnimStarted[a]=!0,cb("bounceZoomPan"+a,oa[a],c.backAnimDestination[a],b||300,e.easing.sine.out,function(b){oa[a]=b,Ga()}))))},calculateAnimOffset:function(a){c.backAnimStarted[a]||(c.speedDecelerationRatio[a]=c.speedDecelerationRatio[a]*(c.slowDownRatio[a]+c.slowDownRatioReverse[a]-c.slowDownRatioReverse[a]*c.timeDiff/10),c.speedDecelerationRatioAbs[a]=Math.abs(c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]),c.distanceOffset[a]=c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]*c.timeDiff,oa[a]+=c.distanceOffset[a])},panAnimLoop:function(){return Za.zoomPan&&(Za.zoomPan.raf=H(c.panAnimLoop),c.now=Da(),c.timeDiff=c.now-c.lastNow,c.lastNow=c.now,c.calculateAnimOffset("x"),c.calculateAnimOffset("y"),Ga(),c.calculateOverBoundsAnimOffset("x"),c.calculateOverBoundsAnimOffset("y"),c.speedDecelerationRatioAbs.x<.05&&c.speedDecelerationRatioAbs.y<.05)?(oa.x=Math.round(oa.x),oa.y=Math.round(oa.y),Ga(),void _a("zoomPan")):void 0}};return c},Sb=function(a){return a.calculateSwipeSpeed("y"),ca=f.currItem.bounds,a.backAnimDestination={},a.backAnimStarted={},Math.abs(a.lastFlickSpeed.x)<=.05&&Math.abs(a.lastFlickSpeed.y)<=.05?(a.speedDecelerationRatioAbs.x=a.speedDecelerationRatioAbs.y=0,a.calculateOverBoundsAnimOffset("x"),a.calculateOverBoundsAnimOffset("y"),!0):(ab("zoomPan"),a.lastNow=Da(),void a.panAnimLoop())},Tb=function(a,b){var c;ea||(pb=m);var d;if("swipe"===a){var g=jb.x-kb.x,h=b.lastFlickDist.x<10;g>eb&&(h||b.lastFlickOffset.x>20)?d=-1:-eb>g&&(h||b.lastFlickOffset.x<-20)&&(d=1)}var j;d&&(m+=d,0>m?(m=i.loop?_b()-1:0,j=!0):m>=_b()&&(m=i.loop?0:_b()-1,j=!0),(!j||i.loop)&&(ta+=d,qa-=d,c=!0));var k,l=sa.x*qa,n=Math.abs(l-sb.x);return c||l>sb.x==b.lastFlickSpeed.x>0?(k=Math.abs(b.lastFlickSpeed.x)>0?n/Math.abs(b.lastFlickSpeed.x):333,k=Math.min(k,400),k=Math.max(k,250)):k=333,pb===m&&(c=!1),ea=!0,Ca("mainScrollAnimStart"),cb("mainScroll",sb.x,l,k,e.easing.cubic.out,Ja,function(){bb(),ea=!1,pb=-1,(c||pb!==m)&&f.updateCurrItem(),Ca("mainScrollAnimComplete")}),c&&f.updateCurrItem(!0),c},Ub=function(a){return 1/ba*a*t},Vb=function(){var a=s,b=Sa(),c=Ta();b>s?a=b:s>c&&(a=c);var d,g=1,h=ia;return ha&&!R&&!ja&&b>s?(f.close(),!0):(ha&&(d=function(a){Ea((g-h)*a+h)}),f.zoomTo(a,0,200,e.easing.cubic.out,d),!0)};ya("Gestures",{publicMethods:{initGestures:function(){var a=function(a,b,c,d,e){A=a+b,B=a+c,C=a+d,D=e?a+e:""};F=N.pointerEvent,F&&N.touch&&(N.touch=!1),F?navigator.pointerEnabled?a("pointer","down","move","up","cancel"):a("MSPointer","Down","Move","Up","Cancel"):N.touch?(a("touch","start","move","end","cancel"),G=!0):a("mouse","down","move","up"),p=B+" "+C+" "+D,q=A,F&&!G&&(G=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),f.likelyTouchDevice=G,r[A]=Nb,r[B]=Ob,r[C]=Qb,D&&(r[D]=r[C]),N.touch&&(q+=" mousedown",p+=" mousemove mouseup",r.mousedown=r[A],r.mousemove=r[B],r.mouseup=r[C]),G||(i.allowPanToNext=!1)}}});var Wb,Xb,Yb,Zb,$b,_b,ac,bc=function(b,c,d,g){Wb&&clearTimeout(Wb),Zb=!0,Yb=!0;var h;b.initialLayout?(h=b.initialLayout,b.initialLayout=null):h=i.getThumbBoundsFn&&i.getThumbBoundsFn(m);var j=d?i.hideAnimationDuration:i.showAnimationDuration,k=function(){_a("initialZoom"),d?(f.template.removeAttribute("style"),f.bg.removeAttribute("style")):(Ea(1),c&&(c.style.display="block"),e.addClass(a,"pswp--animated-in"),Ca("initialZoom"+(d?"OutEnd":"InEnd"))),g&&g(),Zb=!1};if(!j||!h||void 0===h.x)return Ca("initialZoom"+(d?"Out":"In")),s=b.initialZoomLevel,La(oa,b.initialPosition),Ga(),a.style.opacity=d?0:1,Ea(1),void(j?setTimeout(function(){k()},j):k());var n=function(){var c=l,g=!f.currItem.src||f.currItem.loadError||i.showHideOpacity;b.miniImg&&(b.miniImg.style.webkitBackfaceVisibility="hidden"),d||(s=h.w/b.w,oa.x=h.x,oa.y=h.y-K,f[g?"template":"bg"].style.opacity=.001,Ga()),ab("initialZoom"),d&&!c&&e.removeClass(a,"pswp--animated-in"),g&&(d?e[(c?"remove":"add")+"Class"](a,"pswp--animate_opacity"):setTimeout(function(){e.addClass(a,"pswp--animate_opacity")},30)),Wb=setTimeout(function(){if(Ca("initialZoom"+(d?"Out":"In")),d){var f=h.w/b.w,i={x:oa.x,y:oa.y},l=s,m=ia,n=function(b){1===b?(s=f,oa.x=h.x,oa.y=h.y-M):(s=(f-l)*b+l,oa.x=(h.x-i.x)*b+i.x,oa.y=(h.y-M-i.y)*b+i.y),Ga(),g?a.style.opacity=1-b:Ea(m-b*m)};c?cb("initialZoom",0,1,j,e.easing.cubic.out,n,k):(n(1),Wb=setTimeout(k,j+20))}else s=b.initialZoomLevel,La(oa,b.initialPosition),Ga(),Ea(1),g?a.style.opacity=1:Ea(1),Wb=setTimeout(k,j+20)},d?25:90)};n()},cc={},dc=[],ec={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Xb.length}},fc=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},gc=function(a,b,c){var d=a.bounds;d.center.x=Math.round((cc.x-b)/2),d.center.y=Math.round((cc.y-c)/2)+a.vGap.top,d.max.x=b>cc.x?Math.round(cc.x-b):d.center.x,d.max.y=c>cc.y?Math.round(cc.y-c)+a.vGap.top:d.center.y,d.min.x=b>cc.x?0:d.center.x,d.min.y=c>cc.y?a.vGap.top:d.center.y},hc=function(a,b,c){if(a.src&&!a.loadError){var d=!c;if(d&&(a.vGap||(a.vGap={top:0,bottom:0}),Ca("parseVerticalMargin",a)),cc.x=b.x,cc.y=b.y-a.vGap.top-a.vGap.bottom,d){var e=cc.x/a.w,f=cc.y/a.h;a.fitRatio=f>e?e:f;var g=i.scaleMode;"orig"===g?c=1:"fit"===g&&(c=a.fitRatio),c>1&&(c=1),a.initialZoomLevel=c,a.bounds||(a.bounds=fc())}if(!c)return;return gc(a,a.w*c,a.h*c),d&&c===a.initialZoomLevel&&(a.initialPosition=a.bounds.center),a.bounds}return a.w=a.h=0,a.initialZoomLevel=a.fitRatio=1,a.bounds=fc(),a.initialPosition=a.bounds.center,a.bounds},ic=function(a,b,c,d,e,g){b.loadError||d&&(b.imageAppended=!0,lc(b,d,b===f.currItem&&xa),c.appendChild(d),g&&setTimeout(function(){b&&b.loaded&&b.placeholder&&(b.placeholder.style.display="none",b.placeholder=null)},500))},jc=function(a){a.loading=!0,a.loaded=!1;var b=a.img=e.createEl("pswp__img","img"),c=function(){a.loading=!1,a.loaded=!0,a.loadComplete?a.loadComplete(a):a.img=null,b.onload=b.onerror=null,b=null};return b.onload=c,b.onerror=function(){a.loadError=!0,c()},b.src=a.src,b},kc=function(a,b){return a.src&&a.loadError&&a.container?(b&&(a.container.innerHTML=""),a.container.innerHTML=i.errorMsg.replace("%url%",a.src),!0):void 0},lc=function(a,b,c){if(a.src){b||(b=a.container.lastChild);var d=c?a.w:Math.round(a.w*a.fitRatio),e=c?a.h:Math.round(a.h*a.fitRatio);a.placeholder&&!a.loaded&&(a.placeholder.style.width=d+"px",a.placeholder.style.height=e+"px"),b.style.width=d+"px",b.style.height=e+"px"}},mc=function(){if(dc.length){for(var a,b=0;b<dc.length;b++)a=dc[b],a.holder.index===a.index&&ic(a.index,a.item,a.baseDiv,a.img,!1,a.clearPlaceholder);dc=[]}};ya("Controller",{publicMethods:{lazyLoadItem:function(a){a=za(a);var b=$b(a);b&&(!b.loaded&&!b.loading||x)&&(Ca("gettingData",a,b),b.src&&jc(b))},initController:function(){e.extend(i,ec,!0),f.items=Xb=c,$b=f.getItemAt,_b=i.getNumItemsFn,ac=i.loop,_b()<3&&(i.loop=!1),Ba("beforeChange",function(a){var b,c=i.preload,d=null===a?!0:a>=0,e=Math.min(c[0],_b()),g=Math.min(c[1],_b());for(b=1;(d?g:e)>=b;b++)f.lazyLoadItem(m+b);for(b=1;(d?e:g)>=b;b++)f.lazyLoadItem(m-b)}),Ba("initialLayout",function(){f.currItem.initialLayout=i.getThumbBoundsFn&&i.getThumbBoundsFn(m)}),Ba("mainScrollAnimComplete",mc),Ba("initialZoomInEnd",mc),Ba("destroy",function(){for(var a,b=0;b<Xb.length;b++)a=Xb[b],a.container&&(a.container=null),a.placeholder&&(a.placeholder=null),a.img&&(a.img=null),a.preloader&&(a.preloader=null),a.loadError&&(a.loaded=a.loadError=!1);dc=null})},getItemAt:function(a){return a>=0&&void 0!==Xb[a]?Xb[a]:!1},allowProgressiveImg:function(){return i.forceProgressiveLoading||!G||i.mouseUsed||screen.width>1200},setContent:function(a,b){i.loop&&(b=za(b));var c=f.getItemAt(a.index);c&&(c.container=null);var d,g=f.getItemAt(b);if(!g)return void(a.el.innerHTML="");Ca("gettingData",b,g),a.index=b,a.item=g;var h=g.container=e.createEl("pswp__zoom-wrap");if(!g.src&&g.html&&(g.html.tagName?h.appendChild(g.html):h.innerHTML=g.html),kc(g),hc(g,pa),!g.src||g.loadError||g.loaded)g.src&&!g.loadError&&(d=e.createEl("pswp__img","img"),d.style.opacity=1,d.src=g.src,lc(g,d),ic(b,g,h,d,!0));else{if(g.loadComplete=function(c){if(j){if(a&&a.index===b){if(kc(c,!0))return c.loadComplete=c.img=null,hc(c,pa),Ha(c),void(a.index===m&&f.updateCurrZoomItem());c.imageAppended?!Zb&&c.placeholder&&(c.placeholder.style.display="none",c.placeholder=null):N.transform&&(ea||Zb)?dc.push({item:c,baseDiv:h,img:c.img,index:b,holder:a,clearPlaceholder:!0}):ic(b,c,h,c.img,ea||Zb,!0)}c.loadComplete=null,c.img=null,Ca("imageLoadComplete",b,c)}},e.features.transform){var k="pswp__img pswp__img--placeholder";k+=g.msrc?"":" pswp__img--placeholder--blank";var l=e.createEl(k,g.msrc?"img":"");g.msrc&&(l.src=g.msrc),lc(g,l),h.appendChild(l),g.placeholder=l}g.loading||jc(g),f.allowProgressiveImg()&&(!Yb&&N.transform?dc.push({item:g,baseDiv:h,img:g.img,index:b,holder:a}):ic(b,g,h,g.img,!0,!0))}Yb||b!==m?Ha(g):(da=h.style,bc(g,d||g.img)),a.el.innerHTML="",a.el.appendChild(h)},cleanSlide:function(a){a.img&&(a.img.onload=a.img.onerror=null),a.loaded=a.loading=a.img=a.imageAppended=!1}}});var nc,oc={},pc=function(a,b,c){var d=document.createEvent("CustomEvent"),e={origEvent:a,target:a.target,releasePoint:b,pointerType:c||"touch"};d.initCustomEvent("pswpTap",!0,!0,e),a.target.dispatchEvent(d)};ya("Tap",{publicMethods:{initTap:function(){Ba("firstTouchStart",f.onTapStart),Ba("touchRelease",f.onTapRelease),Ba("destroy",function(){oc={},nc=null})},onTapStart:function(a){a.length>1&&(clearTimeout(nc),nc=null)},onTapRelease:function(a,b){if(b&&!X&&!V&&!$a){var c=b;if(nc&&(clearTimeout(nc),nc=null,wb(c,oc)))return void Ca("doubleTap",c);if("mouse"===b.type)return void pc(a,b,"mouse");var d=a.target.tagName.toUpperCase();if("BUTTON"===d||e.hasClass(a.target,"pswp__single-tap"))return void pc(a,b);La(oc,c),nc=setTimeout(function(){pc(a,b),nc=null},300)}}}});var qc;ya("DesktopZoom",{publicMethods:{initDesktopZoom:function(){L||(G?Ba("mouseUsed",function(){f.setupDesktopZoom()}):f.setupDesktopZoom(!0))},setupDesktopZoom:function(b){qc={};var c="wheel mousewheel DOMMouseScroll";Ba("bindEvents",function(){e.bind(a,c,f.handleMouseWheel)}),Ba("unbindEvents",function(){qc&&e.unbind(a,c,f.handleMouseWheel)}),f.mouseZoomedIn=!1;var d,g=function(){f.mouseZoomedIn&&(e.removeClass(a,"pswp--zoomed-in"),f.mouseZoomedIn=!1),1>s?e.addClass(a,"pswp--zoom-allowed"):e.removeClass(a,"pswp--zoom-allowed"),h()},h=function(){d&&(e.removeClass(a,"pswp--dragging"),d=!1)};Ba("resize",g),Ba("afterChange",g),Ba("pointerDown",function(){f.mouseZoomedIn&&(d=!0,e.addClass(a,"pswp--dragging"))}),Ba("pointerUp",h),b||g()},handleMouseWheel:function(a){if(s<=f.currItem.fitRatio)return i.modal&&(!i.closeOnScroll||$a||U?a.preventDefault():E&&Math.abs(a.deltaY)>2&&(l=!0,f.close())),!0;if(a.stopPropagation(),qc.x=0,"deltaX"in a)1===a.deltaMode?(qc.x=18*a.deltaX,qc.y=18*a.deltaY):(qc.x=a.deltaX,qc.y=a.deltaY);else if("wheelDelta"in a)a.wheelDeltaX&&(qc.x=-.16*a.wheelDeltaX),a.wheelDeltaY?qc.y=-.16*a.wheelDeltaY:qc.y=-.16*a.wheelDelta;else{if(!("detail"in a))return;qc.y=a.detail}Ra(s,!0);var b=oa.x-qc.x,c=oa.y-qc.y;(i.modal||b<=ca.min.x&&b>=ca.max.x&&c<=ca.min.y&&c>=ca.max.y)&&a.preventDefault(),f.panTo(b,c)},toggleDesktopZoom:function(b){b=b||{x:pa.x/2+ra.x,y:pa.y/2+ra.y};var c=i.getDoubleTapZoom(!0,f.currItem),d=s===c;f.mouseZoomedIn=!d,f.zoomTo(d?f.currItem.initialZoomLevel:c,b,333),e[(d?"remove":"add")+"Class"](a,"pswp--zoomed-in")}}});var rc,sc,tc,uc,vc,wc,xc,yc,zc,Ac,Bc,Cc,Dc={history:!0,galleryUID:1},Ec=function(){return Bc.hash.substring(1)},Fc=function(){rc&&clearTimeout(rc),tc&&clearTimeout(tc)},Gc=function(){var a=Ec(),b={};if(a.length<5)return b;var c,d=a.split("&");for(c=0;c<d.length;c++)if(d[c]){var e=d[c].split("=");e.length<2||(b[e[0]]=e[1])}if(i.galleryPIDs){var f=b.pid;for(b.pid=0,c=0;c<Xb.length;c++)if(Xb[c].pid===f){b.pid=c;break}}else b.pid=parseInt(b.pid,10)-1;return b.pid<0&&(b.pid=0),b},Hc=function(){if(tc&&clearTimeout(tc),$a||U)return void(tc=setTimeout(Hc,500));uc?clearTimeout(sc):uc=!0;var a=m+1,b=$b(m);b.hasOwnProperty("pid")&&(a=b.pid);var c=xc+"&gid="+i.galleryUID+"&pid="+a;yc||-1===Bc.hash.indexOf(c)&&(Ac=!0);var d=Bc.href.split("#")[0]+"#"+c;Cc?"#"+c!==window.location.hash&&history[yc?"replaceState":"pushState"]("",document.title,d):yc?Bc.replace(d):Bc.hash=c,yc=!0,sc=setTimeout(function(){uc=!1},60)};ya("History",{publicMethods:{initHistory:function(){if(e.extend(i,Dc,!0),i.history){Bc=window.location,Ac=!1,zc=!1,yc=!1,xc=Ec(),Cc="pushState"in history,xc.indexOf("gid=")>-1&&(xc=xc.split("&gid=")[0],xc=xc.split("?gid=")[0]),Ba("afterChange",f.updateURL),Ba("unbindEvents",function(){e.unbind(window,"hashchange",f.onHashChange)});var a=function(){wc=!0,zc||(Ac?history.back():xc?Bc.hash=xc:Cc?history.pushState("",document.title,Bc.pathname+Bc.search):Bc.hash=""),Fc()};Ba("unbindEvents",function(){l&&a()}),Ba("destroy",function(){wc||a()}),Ba("firstUpdate",function(){m=Gc().pid});var b=xc.indexOf("pid=");b>-1&&(xc=xc.substring(0,b),"&"===xc.slice(-1)&&(xc=xc.slice(0,-1))),setTimeout(function(){j&&e.bind(window,"hashchange",f.onHashChange)},40)}},onHashChange:function(){return Ec()===xc?(zc=!0,void f.close()):void(uc||(vc=!0,f.goTo(Gc().pid),vc=!1))},updateURL:function(){Fc(),vc||(yc?rc=setTimeout(Hc,800):Hc())}}}),e.extend(f,db)};return a});


/*! PhotoSwipe Default UI - 4.1.1 - 2015-12-24
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipeUI_Default=b()}(this,function(){"use strict";var a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=this,w=!1,x=!0,y=!0,z={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(a,b){return a.title?(b.children[0].innerHTML=a.title,!0):(b.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return a.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return a.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},A=function(a){if(r)return!0;a=a||window.event,q.timeToIdle&&q.mouseUsed&&!k&&K();for(var c,d,e=a.target||a.srcElement,f=e.getAttribute("class")||"",g=0;g<S.length;g++)c=S[g],c.onTap&&f.indexOf("pswp__"+c.name)>-1&&(c.onTap(),d=!0);if(d){a.stopPropagation&&a.stopPropagation(),r=!0;var h=b.features.isOldAndroid?600:30;s=setTimeout(function(){r=!1},h)}},B=function(){return!a.likelyTouchDevice||q.mouseUsed||screen.width>q.fitControlsWidth},C=function(a,c,d){b[(d?"add":"remove")+"Class"](a,"pswp__"+c)},D=function(){var a=1===q.getNumItemsFn();a!==p&&(C(d,"ui--one-slide",a),p=a)},E=function(){C(i,"share-modal--hidden",y)},F=function(){return y=!y,y?(b.removeClass(i,"pswp__share-modal--fade-in"),setTimeout(function(){y&&E()},300)):(E(),setTimeout(function(){y||b.addClass(i,"pswp__share-modal--fade-in")},30)),y||H(),!1},G=function(b){b=b||window.event;var c=b.target||b.srcElement;return a.shout("shareLinkClick",b,c),c.href?c.hasAttribute("download")?!0:(window.open(c.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),y||F(),!1):!1},H=function(){for(var a,b,c,d,e,f="",g=0;g<q.shareButtons.length;g++)a=q.shareButtons[g],c=q.getImageURLForShare(a),d=q.getPageURLForShare(a),e=q.getTextForShare(a),b=a.url.replace("{{url}}",encodeURIComponent(d)).replace("{{image_url}}",encodeURIComponent(c)).replace("{{raw_image_url}}",c).replace("{{text}}",encodeURIComponent(e)),f+='<a href="'+b+'" target="_blank" class="pswp__share--'+a.id+'"'+(a.download?"download":"")+">"+a.label+"</a>",q.parseShareButtonOut&&(f=q.parseShareButtonOut(a,f));i.children[0].innerHTML=f,i.children[0].onclick=G},I=function(a){for(var c=0;c<q.closeElClasses.length;c++)if(b.hasClass(a,"pswp__"+q.closeElClasses[c]))return!0},J=0,K=function(){clearTimeout(u),J=0,k&&v.setIdle(!1)},L=function(a){a=a?a:window.event;var b=a.relatedTarget||a.toElement;b&&"HTML"!==b.nodeName||(clearTimeout(u),u=setTimeout(function(){v.setIdle(!0)},q.timeToIdleOutside))},M=function(){q.fullscreenEl&&!b.features.isOldAndroid&&(c||(c=v.getFullscreenAPI()),c?(b.bind(document,c.eventK,v.updateFullscreen),v.updateFullscreen(),b.addClass(a.template,"pswp--supports-fs")):b.removeClass(a.template,"pswp--supports-fs"))},N=function(){q.preloaderEl&&(O(!0),l("beforeChange",function(){clearTimeout(o),o=setTimeout(function(){a.currItem&&a.currItem.loading?(!a.allowProgressiveImg()||a.currItem.img&&!a.currItem.img.naturalWidth)&&O(!1):O(!0)},q.loadingIndicatorDelay)}),l("imageLoadComplete",function(b,c){a.currItem===c&&O(!0)}))},O=function(a){n!==a&&(C(m,"preloader--active",!a),n=a)},P=function(a){var c=a.vGap;if(B()){var g=q.barsSize;if(q.captionEl&&"auto"===g.bottom)if(f||(f=b.createEl("pswp__caption pswp__caption--fake"),f.appendChild(b.createEl("pswp__caption__center")),d.insertBefore(f,e),b.addClass(d,"pswp__ui--fit")),q.addCaptionHTMLFn(a,f,!0)){var h=f.clientHeight;c.bottom=parseInt(h,10)||44}else c.bottom=g.top;else c.bottom="auto"===g.bottom?0:g.bottom;c.top=g.top}else c.top=c.bottom=0},Q=function(){q.timeToIdle&&l("mouseUsed",function(){b.bind(document,"mousemove",K),b.bind(document,"mouseout",L),t=setInterval(function(){J++,2===J&&v.setIdle(!0)},q.timeToIdle/2)})},R=function(){l("onVerticalDrag",function(a){x&&.95>a?v.hideControls():!x&&a>=.95&&v.showControls()});var a;l("onPinchClose",function(b){x&&.9>b?(v.hideControls(),a=!0):a&&!x&&b>.9&&v.showControls()}),l("zoomGestureEnded",function(){a=!1,a&&!x&&v.showControls()})},S=[{name:"caption",option:"captionEl",onInit:function(a){e=a}},{name:"share-modal",option:"shareEl",onInit:function(a){i=a},onTap:function(){F()}},{name:"button--share",option:"shareEl",onInit:function(a){h=a},onTap:function(){F()}},{name:"button--zoom",option:"zoomEl",onTap:a.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(a){g=a}},{name:"button--close",option:"closeEl",onTap:a.close},{name:"button--arrow--left",option:"arrowEl",onTap:a.prev},{name:"button--arrow--right",option:"arrowEl",onTap:a.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){c.isFullscreen()?c.exit():c.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(a){m=a}}],T=function(){var a,c,e,f=function(d){if(d)for(var f=d.length,g=0;f>g;g++){a=d[g],c=a.className;for(var h=0;h<S.length;h++)e=S[h],c.indexOf("pswp__"+e.name)>-1&&(q[e.option]?(b.removeClass(a,"pswp__element--disabled"),e.onInit&&e.onInit(a)):b.addClass(a,"pswp__element--disabled"))}};f(d.children);var g=b.getChildByClass(d,"pswp__top-bar");g&&f(g.children)};v.init=function(){b.extend(a.options,z,!0),q=a.options,d=b.getChildByClass(a.scrollWrap,"pswp__ui"),l=a.listen,R(),l("beforeChange",v.update),l("doubleTap",function(b){var c=a.currItem.initialZoomLevel;a.getZoomLevel()!==c?a.zoomTo(c,b,333):a.zoomTo(q.getDoubleTapZoom(!1,a.currItem),b,333)}),l("preventDragEvent",function(a,b,c){var d=a.target||a.srcElement;d&&d.getAttribute("class")&&a.type.indexOf("mouse")>-1&&(d.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(d.tagName))&&(c.prevent=!1)}),l("bindEvents",function(){b.bind(d,"pswpTap click",A),b.bind(a.scrollWrap,"pswpTap",v.onGlobalTap),a.likelyTouchDevice||b.bind(a.scrollWrap,"mouseover",v.onMouseOver)}),l("unbindEvents",function(){y||F(),t&&clearInterval(t),b.unbind(document,"mouseout",L),b.unbind(document,"mousemove",K),b.unbind(d,"pswpTap click",A),b.unbind(a.scrollWrap,"pswpTap",v.onGlobalTap),b.unbind(a.scrollWrap,"mouseover",v.onMouseOver),c&&(b.unbind(document,c.eventK,v.updateFullscreen),c.isFullscreen()&&(q.hideAnimationDuration=0,c.exit()),c=null)}),l("destroy",function(){q.captionEl&&(f&&d.removeChild(f),b.removeClass(e,"pswp__caption--empty")),i&&(i.children[0].onclick=null),b.removeClass(d,"pswp__ui--over-close"),b.addClass(d,"pswp__ui--hidden"),v.setIdle(!1)}),q.showAnimationDuration||b.removeClass(d,"pswp__ui--hidden"),l("initialZoomIn",function(){q.showAnimationDuration&&b.removeClass(d,"pswp__ui--hidden")}),l("initialZoomOut",function(){b.addClass(d,"pswp__ui--hidden")}),l("parseVerticalMargin",P),T(),q.shareEl&&h&&i&&(y=!0),D(),Q(),M(),N()},v.setIdle=function(a){k=a,C(d,"ui--idle",a)},v.update=function(){x&&a.currItem?(v.updateIndexIndicator(),q.captionEl&&(q.addCaptionHTMLFn(a.currItem,e),C(e,"caption--empty",!a.currItem.title)),w=!0):w=!1,y||F(),D()},v.updateFullscreen=function(d){d&&setTimeout(function(){a.setScrollOffset(0,b.getScrollY())},50),b[(c.isFullscreen()?"add":"remove")+"Class"](a.template,"pswp--fs")},v.updateIndexIndicator=function(){q.counterEl&&(g.innerHTML=a.getCurrentIndex()+1+q.indexIndicatorSep+q.getNumItemsFn())},v.onGlobalTap=function(c){c=c||window.event;var d=c.target||c.srcElement;if(!r)if(c.detail&&"mouse"===c.detail.pointerType){if(I(d))return void a.close();b.hasClass(d,"pswp__img")&&(1===a.getZoomLevel()&&a.getZoomLevel()<=a.currItem.fitRatio?q.clickToCloseNonZoomable&&a.close():a.toggleDesktopZoom(c.detail.releasePoint))}else if(q.tapToToggleControls&&(x?v.hideControls():v.showControls()),q.tapToClose&&(b.hasClass(d,"pswp__img")||I(d)))return void a.close()},v.onMouseOver=function(a){a=a||window.event;var b=a.target||a.srcElement;C(d,"ui--over-close",I(b))},v.hideControls=function(){b.addClass(d,"pswp__ui--hidden"),x=!1},v.showControls=function(){x=!0,w||v.update(),b.removeClass(d,"pswp__ui--hidden")},v.supportsFullscreen=function(){var a=document;return!!(a.exitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen||a.msExitFullscreen)},v.getFullscreenAPI=function(){var b,c=document.documentElement,d="fullscreenchange";return c.requestFullscreen?b={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:d}:c.mozRequestFullScreen?b={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+d}:c.webkitRequestFullscreen?b={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+d}:c.msRequestFullscreen&&(b={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),b&&(b.enter=function(){return j=q.closeOnScroll,q.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?a.template[this.enterK]():void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},b.exit=function(){return q.closeOnScroll=j,document[this.exitK]()},b.isFullscreen=function(){return document[this.elementK]}),b}};return a});

// Function : Initialize PhotoSwipe from DOM  
var RC_initPhotoSwipe=function(init_options){
  
 	var create_PSWP_Layout=function(){
	   var pswp=''+
	   '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'+
		    '<div class="pswp__bg"></div>'+
		    '<div class="pswp__scroll-wrap">'+
		        '<div class="pswp__container">'+
		            '<div class="pswp__item"></div>'+
		            '<div class="pswp__item"></div>'+
		            '<div class="pswp__item"></div>'+
		        '</div>'+
		        '<div class="pswp__ui pswp__ui--hidden">'+
		            '<div class="pswp__top-bar">'+
		                '<div class="pswp__counter"></div>'+
		                '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
		                '<button class="pswp__button pswp__button--share" title="Share"></button>'+
		                '<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>'+
		                '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'+
		                '<div class="pswp__preloader">'+
		                    '<div class="pswp__preloader__icn">'+
		                      '<div class="pswp__preloader__cut">'+
		                        '<div class="pswp__preloader__donut"></div>'+
		                      '</div>'+
		                    '</div>'+
		                '</div>'+
		            '</div>'+
		            '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'+
		                '<div class="pswp__share-tooltip"></div>'+ 
		            '</div>'+
		            '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">'+
		            '</button>'+
		            '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">'+
		            '</button>'+
		            '<div class="pswp__caption">'+
		                '<div class="pswp__caption__center"></div>'+
		            '</div>'+
		        '</div>'+
		    '</div>'+
		'</div>';
		$(pswp).appendTo('body');
	}
	var initPhotoSwipeFromDOM = function(gallerySelector) {
	    // parse slide data (url, title, size ...) from DOM elements 
	    // (children of gallerySelector)
	    var parseThumbnailElements = function(el) {
	        var thumbElements = el.childNodes,
	            numNodes = thumbElements.length,
	            items = [],
	            figureEl,
	            linkEl,
	            size,
	            item;

	        for(var i = 0; i < numNodes; i++) {

	            figureEl = thumbElements[i]; // <figure> element

	            // include only element nodes 
	            if(figureEl.nodeType !== 1) {
	                continue;
	            }

	            linkEl = figureEl.children[0]; // <a> element

	            size = linkEl.getAttribute('data-size').split('x');

	            // create slide object
	            item = {
	                src: linkEl.getAttribute('href'),
	                w: parseInt(size[0], 10),
	                h: parseInt(size[1], 10)
	            };



	            if(figureEl.children.length > 1) {
	                // <figcaption> content
	                item.title = figureEl.children[1].innerHTML; 
	            }

	            if(linkEl.children.length > 0) {
	                // <img> thumbnail element, retrieving thumbnail url
	                item.msrc = linkEl.children[0].getAttribute('src');
	            } 

	            item.el = figureEl; // save link to element for getThumbBoundsFn
	            items.push(item);
	        }

	        return items;
	    };

	    // find nearest parent element
	    var closest = function closest(el, fn) {
	        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
	    };

	    // triggers when user clicks on thumbnail
	    var onThumbnailsClick = function(e) {
	        e = e || window.event;
	        e.preventDefault ? e.preventDefault() : e.returnValue = false;

	        var eTarget = e.target || e.srcElement;

	        // find root element of slide
	        var clickedListItem = closest(eTarget, function(el) {
	            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
	        });

	        if(!clickedListItem) {
	            return;
	        }

	        // find index of clicked item by looping through all child nodes
	        // alternatively, you may define index via data- attribute
	        var clickedGallery = clickedListItem.parentNode,
	            childNodes = clickedListItem.parentNode.childNodes,
	            numChildNodes = childNodes.length,
	            nodeIndex = 0,
	            index;

	        for (var i = 0; i < numChildNodes; i++) {
	            if(childNodes[i].nodeType !== 1) { 
	                continue; 
	            }

	            if(childNodes[i] === clickedListItem) {
	                index = nodeIndex;
	                break;
	            }
	            nodeIndex++;
	        }
	        if(index >= 0) {
	            // open PhotoSwipe if valid index found
	            openPhotoSwipe( index, clickedGallery );
	        }
	        return false;
	    };

	    // parse picture index and gallery index from URL (#&pid=1&gid=2)
	    var photoswipeParseHash = function() {
	        var hash = window.location.hash.substring(1),
	        params = {};

	        if(hash.length < 5) {
	            return params;
	        }

	        var vars = hash.split('&');
	        for (var i = 0; i < vars.length; i++) {
	            if(!vars[i]) {
	                continue;
	            }
	            var pair = vars[i].split('=');  
	            if(pair.length < 2) {
	                continue;
	            }           
	            params[pair[0]] = pair[1];
	        }

	        if(params.gid) {
	            params.gid = parseInt(params.gid, 10);
	        }

	        return params;
	    };

	    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
	        var pswpElement = document.querySelectorAll('.pswp')[0],
	            gallery,
	            options,
	            items;

	        items = parseThumbnailElements(galleryElement);
            var $this=$(galleryElement);

            var default_options=getDefaultOptions(galleryElement,'DOM');
             
	        // define options (if needed)
	        var add_options = {
	            // define gallery index (for URL)
	            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

	            getThumbBoundsFn: function(index) {
	                // See Options -> getThumbBoundsFn section of documentation for more info
	                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
	                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
	                    rect = thumbnail.getBoundingClientRect(); 

	                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
	            }

	        };
	        // merge options
	        options=$.extend(true,default_options,add_options); 
	       
            // add external options (like data-)
        
	        // PhotoSwipe opened from URL
	        if(fromURL) {
	            if(options.galleryPIDs) {
	                // parse real index when custom PIDs are used 
	                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
	                for(var j = 0; j < items.length; j++) {
	                    if(items[j].pid == index) {
	                        options.index = j;
	                        break;
	                    }
	                }
	            } else {
	                // in URL indexes start from 1
	                options.index = parseInt(index, 10) - 1;
	            }
	        } else {
	            options.index = parseInt(index, 10);
	        }

	        // exit if index not found
	        if( isNaN(options.index) ) {
	            return;
	        }

	        if(disableAnimation) {
	            options.showAnimationDuration = 0;
	        }

	        // Pass data to PhotoSwipe and initialize it
	        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	        initPSWP(gallery,galleryElement,'DOM');
        };

	    // loop through all gallery elements and bind events
	    var galleryElements = document.querySelectorAll( gallerySelector );

	    for(var i = 0, l = galleryElements.length; i < l; i++) {
	        galleryElements[i].setAttribute('data-pswp-uid', i+1);
	        galleryElements[i].onclick = onThumbnailsClick;
	    }

	    // Parse URL and open gallery if it contains #&pid=3&gid=1
	    var hashData = photoswipeParseHash();
	    if(hashData.pid && hashData.gid) {
	        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
	    }
	}	

	var getDefaultOptions=function(event_handler,type){
        var $this=$(event_handler);
        var options;

        // differ from type (DOM or SCRIPT) 
        options={
        	index : $this.data('index')?$this.data('index'):0,
            showAnimationDuration : $this.data('showanimationduration')?$this.data('showanimationduration'):(type=='DOM'?333:1),
            hideAnimationDuration : $this.data('hideanimationduration')?$this.data('hideanimationduration'):(type=='DOM'?333:0),
            focus : $this.data('focus')?$this.data('focus'):(type=='DOM'?true:false),
            bgOpacity : $this.data('bgopacity')?$this.data('bgopacity'):1,
            spacing : $this.data('spacing')?$this.data('spacing'):0.12, // 슬라이더 간격  
            loop : $this.data('loop')?$this.data('loop'):true,
            pinchToClose : $this.data('pinchtoclose')?$this.data('pinchtoclose'):true, 
            history : $this.data('history')?$this.data('history'):(type=='DOM'?true:false)
        }
        return options;
	}

	var scriptOpenPhotoSwipe = function(event_handler) {
	    var pswpElement = document.querySelectorAll('.pswp')[0];
	    // build items array
	    var items = init_options.items?init_options.items:[];
	    
	    // define options (if needed)
	    var options = getDefaultOptions(event_handler,'SCRIPT');
        
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        initPSWP(gallery,'','SCRIPT');
		
  	};
  	var initPSWP=function(gallery,galleryElement,init_type){
        gallery.init(); 
        var galleryUID= $(galleryElement).attr('data-pswp-uid');
    
        trrigerEvent(gallery,galleryUID,init_type,'galleryOpened');
    
        gallery.listen('afterChange', function() { 
	        trrigerEvent(gallery,galleryUID,init_type,'slideChanged');
        });
        gallery.listen('close', function() { 
	        trrigerEvent(gallery,galleryUID,init_type,'galleryClosed');
        });
        gallery.listen('imageLoadComplete', function(index, item) { 
		    // index - index of a slide that was loaded
		    // item - slide object
		    trrigerEvent(gallery,galleryUID,init_type,'imageLoaded');  
		});	         		
  	}
  	// trriged event to target
  	var trrigerEvent=function(gallery,galleryUID,init_type,event_type){
  		var currentItem=gallery.currItem;
	    var itemIndex=gallery.getCurrentIndex();
        var currentFigure=getCurrenFigure(galleryUID,itemIndex);
	    var e=$.Event(event_type +'.rc.photoswipe');
        if(event_type=='galleryOpened'){
            if(init_type=='SCRIPT') $(currentItem).trigger(e);
            else if(init_type=='DOM') $(currentFigure).trigger(e);	
            //console.log(currentFigure);
        }else if(event_type=='slideChanged'){
            if(init_type=='SCRIPT') $(currentItem).trigger(e);
            else if(init_type=='DOM') $(currentFigure).trigger(e);	
            //console.log(currentFigure);
        }else if(event_type=='galleryClosed'){
            var closedGalleryEement=getClosedGalleryElement(galleryUID);
            $(closedGalleryEement).trigger(e);
        }else if(event_type=='imageLoaded'){
        	var pswpContainer=gallery.container;
        	$(pswpContainer).trigger(e);
        }         
  	}
  	// get closed galleryElement and remove class 'figure-active' of figure
  	var getClosedGalleryElement=function(galleryUID){
		var closedGalleryElement;
  		$('[data-extension="photoswipe"]').each(function(){
  			 if($(this).attr('data-pswp-uid')==galleryUID){
  			 	 closedGalleryElement=$(this);
  			     var figures=$(this).find('figure');
  			     $(figures).each(function(index,figure){
                     $(figure).removeClass('figure-active'); 
  			     });	
  			 }  			 
  		})
        return closedGalleryElement;
  	}
  	// get current figure
  	var getCurrenFigure=function(galleryUID,itemIndex){
  		var currentFigure;
  		$('[data-extension="photoswipe"]').each(function(){
  			 if($(this).attr('data-pswp-uid')==galleryUID){
  			     var figures=$(this).find('figure');
  			     $(figures).each(function(index,figure){
                     if(index==itemIndex){
                     	 $(figure).addClass('figure-active');
                     	 currentFigure=figure;
                     }
                     else $(figure).removeClass('figure-active'); 
  			     });	
  			 }  			 
  		})
  		return currentFigure;
  	}

    // create PSWP 
    if(init_options){
       if(init_options.pswp || init_options.pswp==undefined) create_PSWP_Layout();	
    }else{
       create_PSWP_Layout();	
    }
        
    // Open Photoswipe Gallery by DOM : [data-extension="photoswipe"] & Excute function of initPhotoSwipeFromDOM  
	$('[data-extension="photoswipe"]').each(function(index,element){
         var $this=$(element);
         var gallerySelector='[data-extension="photoswipe"]';
         initPhotoSwipeFromDOM(gallerySelector);  
	})
    // Open Photoswipe by Script 
    $(document).on('tap','[data-toggle="photoswipe"]',function(){
         scriptOpenPhotoSwipe($(this));  
    });
	
}
window.addEventListener('push',RC_initPhotoSwipe);
 

