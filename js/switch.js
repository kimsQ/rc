/* ========================================================================
 * Ratchet Plus: Switch.js v1.0.0
 * http://http://rc.kimsq.com/components/switch/
 * ========================================================================
 * inspired by @twbs's bootstrap & ratchet
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * ======================================================================== */

!(function () {
  'use strict';

  if (!window.RATCHET) throw new Error('Switch requires ratchet-common.js')
 
  var start     = {};
  var touchMove = false;
  var distanceX = false;
  var toggle    = false;
  var transformProperty = window.RATCHET.getBrowserCapabilities.transform;

  var findToggle = function (target) {
    var i;
    var toggles = document.querySelectorAll('[data-toggle="switch"]');

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

    var handle      = toggle.querySelector('.switch-handle');
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

    var handle      = toggle.querySelector('.switch-handle');
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
      return (handle.style[transformProperty] = 'translate3d(0,0,0)');
    }
    if (distanceX > offset) {
      return (handle.style[transformProperty] = 'translate3d(' + offset + 'px,0,0)');
    }

    handle.style[transformProperty] = 'translate3d(' + distanceX + 'px,0,0)';

    toggle.classList[(distanceX > (toggleWidth / 2 - handleWidth / 2)) ? 'add' : 'remove']('active');
  });

  window.addEventListener('touchend', function (e) {
    if (!toggle) {
      return;
    }

    var handle      = toggle.querySelector('.switch-handle');
    var toggleWidth = toggle.clientWidth;
    var handleWidth = handle.clientWidth;
    var offset      = (toggleWidth - handleWidth);
    var slideOn     = (!touchMove && !toggle.classList.contains('active')) || (touchMove && (distanceX > (toggleWidth / 2 - handleWidth / 2)));

    if (slideOn) {
      handle.style[transformProperty] = 'translate3d(' + offset + 'px,0,0)';
    } else {
      handle.style[transformProperty] = 'translate3d(0,0,0)';
    }

    toggle.classList[slideOn ? 'add' : 'remove']('active');

    e = $.Event('rc.switched', { relatedTarget: handle})
    $(toggle).trigger(e);
   
    touchMove = false;
    toggle    = false;
  });

}(jQuery));