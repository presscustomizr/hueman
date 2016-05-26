//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
(function (api, $, _) {

  $.extend( CZRStaticMethods , {

    CZR_Input : api.Value.extend({
            initialize: function( name, options ) {
                api.Value.prototype.initialize.call( this, null, options );
                var input = this;
                //input.options = options;
                //write the options as properties, name is included
                $.extend( input, options || {} );

                input.set(options.value);

                //setup the appropriate input based on the type
                input.type_map = {
                  text : '',
                  select : 'setupSelect',
                  upload : 'setupImageUploader',
                  color : 'setupColorPicker',
                };
                if ( _.has( input.type_map, input.type ) ) {
                  var _meth = input.type_map[input.type];
                  if ( _.isFunction(input[_meth]) )
                    input[_meth]();
                }

                //Input Event Map
                input.input_event_map = [
                  //set input value
                  {
                    trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                    selector  : 'input[data-type], select[data-type]',
                    name      : 'set_input_value',
                    actions   : 'updateInput'
                  }
                ];

                input.ready();
            },


            ready : function() {
                var input = this;
                input.control.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );

                //callbacks
                input.callbacks.add(function( to, from) {
                      var _current_model    = input.control.czr_Model.value.get(),
                          _new_model        = _.clone( _current_model );//initialize it to the current value

                      //make sure the _new_model is an object and is not empty
                      _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
                      //set the new val to the changed property
                      _new_model[input.id] = to;

                      input.control.czr_Model.value.set(_new_model);

                      console.log('a input value has changed : ', input.id, to, from );

                });
            },


            updateInput : function( obj ) {
                //get the changed property and val
                //=> all html input have data-type attribute corresponding to the ones stored in the model
                var input           = this,
                    $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
                    _new_val          = $( $_changed_input, obj.dom_el ).val();

                input.set(_new_val);
            }
    })//CZR_Input

  });//$.extend

})( wp.customize, jQuery, _);
