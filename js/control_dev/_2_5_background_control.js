//wp.customize, jQuery, _
var CZRBackgroundMethods = CZRBackgroundMethods || {};

//@extends CZRStaticMethods
$.extend( CZRBackgroundMethods , {
  initialize: function( id, options ) {
          var control = this;
          api.CZRStaticControl.prototype.initialize.call( control, id, options );

          control.defaultModel = control.params.default_model;

          control.inputConstructor = api.CZRInput.extend( control.CZRBackgroundInputMethods || {} );

          //the map describing how to populate each particular select inputs
          control.select_map = {
              'background-repeat'     : $.extend( {'': serverControlParams.translatedStrings.selectBgRepeat}, control.params.bg_repeat_options ),
              'background-attachment' : $.extend( {'': serverControlParams.translatedStrings.selectBgAttachment}, control.params.bg_attachment_options ),
              'background-position'   : $.extend( {'': serverControlParams.translatedStrings.selectBgPosition}, control.params.bg_position_options ),
          };
  },//initialize


  ready : function() {
          var control = this;
          api.CZRStaticControl.prototype.ready.call( control );

          api.bind('ready', function() {
                var _img_on_init = control.czr_Model('background-image').get();

                control.setBgDependantsVisibilities( ! _.isUndefined(_img_on_init) && ! _.isEmpty(_img_on_init) );

                control.czr_Model('background-image').bind(function(to, from) {
                  control.setBgDependantsVisibilities( ! _.isUndefined(to) && ! _.isEmpty(to) );
                });

              });

  },


  //fired on 'background-image:changed' DOM EVENT
  //@param : bool
  setBgDependantsVisibilities : function( has_img ) {
          var control = this;
          _.each( ['background-repeat', 'background-attachment', 'background-position', 'background-size'], function( dep ) {
            control.czr_Model(dep).container.toggle( has_img );
          });
  },


  //this set of methods extends and overrides the prototype of api.CZRInput
  CZRBackgroundInputMethods : {

          ready : function() {
            var input = this;

            input.addActions(
              'input_event_map',
              {
                  trigger   : 'background-image:changed',
                  actions   : [ 'setBgDependantsVisibilities' ]
              },
              input
            );

            api.CZRInput.prototype.ready.call( input);
          },

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
                control     = input.control;

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
  }
});//$.extend