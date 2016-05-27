var CZRInputMethods = CZRInputMethods || {};
$.extend( CZRInputMethods , {
    setupColorPicker : function() {
        var input  = this;

        input.container.find('input').wpColorPicker( {
          change : function( e, o ) {
            //if the input val is not updated here, it's not detected right away.
            //weird
            //is there a "change complete" kind of event for iris ?
            $(this).val($(this).wpColorPicker('color'));
            $(this).trigger('colorpickerchange');
          }
        });
    }
});//$.extend