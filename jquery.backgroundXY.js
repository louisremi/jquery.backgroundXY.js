/*
 * backgroundXY: A jQuery cssHooks implementing background-position-X and background-position-Y in browsers lacking it.
 *
 * latest version and complete README available on Github:
 * https://github.com/lrbabe/jquery.backgroundXY.js
 *
 * Copyright 2011 @louis_remi
 * Licensed under the MIT license.
 * 
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 *
 */
(function($) {

var div = document.createElement('div'),
  rposition = /([^ ]*) (.*)/;
  
if (div.style.backgroundPositionX !== '') {
  $(['X', 'Y']).each(function( i, letter ) {
    var property = 'backgroundPosition'+letter,
      isX = letter == 'X';
    $.cssHooks[property] = {
      set: function( elem, value ) {
        var current = elem.style.backgroundPosition;
        elem.style.backgroundPosition = (isX? value + ' ' : '' ) + (current? current.match(rposition)[isX+1] : '0') + (isX? '' : ' ' + value);
      },
      get: function( elem, computed ) {
        var current = computed?
          $.css( elem, 'backgroundPosition' ):
          elem.style.backgroundPosition;
        return current.match(rposition)[!isX+1];
      }
    };
    $.fx.step[property] = function( fx ) {
      $.cssHooks[property].set( fx.elem, fx.now + fx.unit );
    }
  });
}
div = null;

})(jQuery);
