var CZRBackgroundMethods = CZRBackgroundMethods || {};

//@extends CZRMultiInputMethods
(function (api, $, _) {
  $.extend( CZRBackgroundMethods , {
    initialize: function( id, options ) {
      var control = this;
      api.CZRMultiInputControl.prototype.initialize.call( control, id, options );

      ////////////////////////////////////////////////////
      /// EXTEND THE CONTROL EVENT MAP
      /// CAN BE USED FOR :
      /// => SETUP SPECIFIC INPUT FOR THIS CONTROL
      /// => ADDING SPECIFIC EVENT FOR THE CONTROL
      ////////////////////////////////////////////////////
      this.addActions( 'control_event_map',
        [
          {
            trigger   : 'viewContentRendered',
            actions   : [ 'setupSelect', 'setupColorPicker', 'setupImageUploader' ]
          }
        ]
      );
    }//initialize

    //ready: function() {}//fired in the parent

  });//$.extend

})( wp.customize, jQuery, _);
