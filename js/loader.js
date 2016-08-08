/* ========================================================================
 * Ratchet Plus: Loader.js v1.0.0
 * http://rc.kimsq.com/controls/loader/
/*=======================================================================

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
            'text': "",                 // Text to display next to the loader
            'iconTheme': "default",    // loader CSS class
            'tpl': '<span class="loader-wrapper %wrapper%"><span class="%iconTheme%"><span class="loader">Loading...</span></span>%text%</span>',    // loader base Tag
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
            tpl = self.options.tpl.replace( '%wrapper%', 'loader-show ' + 'loader-' + self.options.position );
            tpl = tpl.replace( '%iconTheme%', self.options['iconTheme'] );
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
                        $wrapperTpl = $('<div class="loader-overlay" style="z-index:11">');

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
                        $wrapperTpl = $('<div class="loader-overlay">');
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


            if( "overlay" === this.options.position ) {

                $( this.element ).find( ".loader-overlay" ).first().remove();

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
