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
        var current = elem.style.backgroundPosition;
        return current? current.match(rposition)[!isX+1] : '0';
      }
    };
    $.fx.step[property] = function( fx ) {
      $.cssHooks[property].set( fx.elem, fx.now + fx.unit);
    }
  });
}

})(jQuery);
