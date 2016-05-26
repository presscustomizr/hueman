var CZRBackgroundMethods = CZRBackgroundMethods || {};

//@extends CZRStaticMethods
(function (api, $, _) {
  $.extend( CZRBackgroundMethods , {
    initialize: function( id, options ) {
      var control = this;
      api.CZRStaticControl.prototype.initialize.call( control, id, options );

      ////////////////////////////////////////////////////
      /// EXTEND THE CONTROL EVENT MAP
      /// CAN BE USED FOR :
      /// => SETUP SPECIFIC INPUT FOR THIS CONTROL
      /// => ADDING SPECIFIC EVENT FOR THE CONTROL
      ////////////////////////////////////////////////////
      // this.addActions( 'control_event_map',
      //   [
      //     {
      //       trigger   : 'viewContentRendered',
      //       actions   : [ 'setupSelect', 'setupColorPicker', 'setupImageUploader' ]
      //     }
      //   ]
      // );

      control.defaultModel = control.params.default_model;

      //the map describing how to populate each particular select inputs
      control.select_map = {
          'background-repeat'     : $.extend( {'': serverControlParams.translatedStrings.selectBgRepeat}, control.params.bg_repeat_options ),
          'background-attachment' : $.extend( {'': serverControlParams.translatedStrings.selectBgAttachment}, control.params.bg_attachment_options ),
          'background-position'   : $.extend( {'': serverControlParams.translatedStrings.selectBgPosition}, control.params.bg_position_options ),
      };

    },//initialize
  });//$.extend

})( wp.customize, jQuery, _);


//@extends and overrides CZRStaticMethods.CZR_Input.prototype
(function (api, $, _) {
  $.extend( CZRStaticMethods.CZR_Input.prototype , {

    setupSelect : function( obj ) {
      var input      = this,
          control     = input.control;

      //generates the options
      if ( _.has(control.select_map, input.id ) )
        input._buildSelect( control.select_map[input.id] );

      $('select', input.container ).not('.no-selecter-js')
        .each( function() {
          $(this).selecter({
          //triggers a change event on the view, passing the newly selected value + index as parameters.
          // callback : function(value, index) {
          //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
          // }
          });
      });
    },


    _buildSelect: function ( select_options ) {
      var input       = this,
          control     = input.control,
          model       = control.czr_Model(input.id).get();

      console.log('select_options', input.id, select_options );

      _.each( select_options, function( _label, _value ) {
          var _attributes = {
              value : _value,
              html  : _label
            };
          if ( _value == input.get() )
            $.extend( _attributes, { selected : "selected" } );

          $( 'select[data-type="'+ input.id +'"]', input.container ).append( $('<option>', _attributes) );
      });
    }
    //ready: function() {}//fired in the parent

  });//$.extend

})( wp.customize, jQuery, _);
