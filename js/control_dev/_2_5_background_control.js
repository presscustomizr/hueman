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
    },//initialize
 
    setupSelect : function( obj ) {
      var control      = this,
          selects      = { 
              'background-repeat'     : $.extend( {'': serverControlParams.translatedStrings.selectBgRepeat}, control.params.bg_repeat_options ),
              'background-attachment' : $.extend( {'': serverControlParams.translatedStrings.selectBgAttachment}, control.params.bg_attachment_options ),
              'background-position'   : $.extend( {'': serverControlParams.translatedStrings.selectBgPosition}, control.params.bg_position_options ),
          };

      //generates the options
      _.each( selects, function( options, subsetting_name ) {
          control.buildSelect( obj.dom_el, subsetting_name, options ); 
      });
      
      //fire select
      api.CZRMultiInputControl.prototype.setupSelect.call(control);
    },

    buildSelect: function ( control_dom_el, subsetting_name, options ) {
      var control      = this,  
          model        = control.czr_Model.get();

      console.log(model);
      _.each( options, function( _label, _value ) {
          var _attributes = {
              value : _value,
              html  : _label
            };
          if ( typeof(model[subsetting_name]) != "undefined" && _value == model[subsetting_name] )
            $.extend( _attributes, { selected : "selected" } );

          $( 'select[data-type="'+subsetting_name+'"]', control_dom_el ).append( $('<option>', _attributes) );
      });
    }
    //ready: function() {}//fired in the parent

  });//$.extend

})( wp.customize, jQuery, _);
