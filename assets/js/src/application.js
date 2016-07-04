// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for Bootstrap's docs (http://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */

/* global Clipboard, anchors */

!function ($) {
  'use strict';

  $(function () {

    // Scrollspy

    // Tooltip and popover demos
    $('.tooltip-demo').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    })

    $('[data-toggle="popover"]').popover()

    $('[data-toggle="tooltip"]').tooltip()

    // Demos within modals
    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // Indeterminate checkbox example
    $('.bd-example-indeterminate [type="checkbox"]').prop('indeterminate', true)

    // Disable empty links in docs examples
    $('.bd-example [href="#"]').click(function (e) {
      e.preventDefault()
    })

    // Insert copy to clipboard button before .highlight
    $('.highlight').each(function () {
      var btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard">Copy</span></div>'
      $(this).before(btnHtml)
      $('.btn-clipboard').tooltip()
    })

    // Device preview affix
    $('.docs-affix').affix({
      offset: {
        top: 300,
        bottom: 0
      }
    })

    // History Back
    $('body').on('click', '[data-history="back"]', function() {
        history.back();
    });

    var clipboard = new Clipboard('.btn-clipboard', {
      target: function (trigger) {
        return trigger.parentNode.nextElementSibling
      }
    })

    clipboard.on('success', function (e) {
      $(e.trigger)
        .attr('title', 'Copied!')
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')

      e.clearSelection()
    })

    clipboard.on('error', function (e) {
      var fallbackMsg = /Mac/i.test(navigator.userAgent) ? 'Press \u2318 to copy' : 'Press Ctrl-C to copy'

      $(e.trigger)
        .attr('title', fallbackMsg)
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle')
    })

    // demo default preview
    $(".device-content li:first-child > a").addClass('active')

  })

}(jQuery)

;(function () {
  'use strict';
  anchors.options.placement = 'left';
  anchors.add('.bd-content > h2, .bd-content > h3, .bd-content > h4, .bd-content > h5')
})();
