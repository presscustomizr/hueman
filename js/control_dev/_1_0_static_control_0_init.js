//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
(function (api, $, _) {

  $.extend( CZRStaticMethods , {
    initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          ////////////////////////////////////////////////////
          /// CONTROL DEFAULT EVENT MAP
          ////////////////////////////////////////////////////
          control.control_event_map = [
            //set input value
            {
              trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
              selector  : 'input[data-type], select[data-type]',
              name      : 'set_input_value',
              actions   : 'updateModel'
            }
          ];

          ////////////////////////////////////////////////////
          /// SET UP THE MODEL (DB OPTION) AS AN OBSERVABLE VALUE
          ////////////////////////////////////////////////////
          control.czr_Model = new api.Value();

          //the model is a collection of sub models, each one has its view element.
          control.czr_subModel = new api.Values();

          control.defaultModel = {};

    },//initialize


    ready: function() {
          var control  = this;
          api.bind( 'ready', function() {
            if ( _.isEmpty(control.defaultModel) || _.isUndefined(control.defaultModel) ) {
              throw new Error('No default model found in multi input control ' + control.id + '. Aborting');
            }
            //sets the model value on api ready
            //=> triggers the control rendering + DOM LISTENERS
            control.czr_Model.set( _.extend( control.defaultModel, api(control.id).get() ) );

            control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );
            control.renderView();

            //creates the subModels based on the rendered items
            $( '.'+control.css_attr.sub_set_wrapper, control.container).each( function(_index) {
              console.log( 'data-input-type ? ', $(this).attr('data-input-type') );
            });

            //listens and reacts to the model changes
            control.czr_Model.callbacks.add(function(to, from) {
              api(control.id).set(to);
            });
          });
    }

  });//$.extend

})( wp.customize, jQuery, _);
