var CZRInputMethods = CZRInputMethods || {};
$.extend( CZRInputMethods , {
    setupSelect : function() {
        var input = this;
        $('select', input.container ).not('.no-selecter-js')
          .each( function() {
            $(this).selecter({
            //triggers a change event on the view, passing the newly selected value + index as parameters.
            // callback : function(value, index) {
            //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
            // }
            });
        });
    }
});//$.extend