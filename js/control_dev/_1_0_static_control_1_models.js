//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
(function (api, $, _) {

  $.extend( CZRStaticMethods , {

    CZR_subModel : api.Class.extend({
            initialize: function( name, options ) {
                var submodel = this;
                //submodel.options = options;
                //write the options as properties, name is included
                $.extend( submodel, options || {} );

                //Make it alive with various Values
                submodel.value   = new api.Value();
                submodel.value.set(options.value);

                ////////////////////////////////////////////////////
                /// SUB MODEL EVENT MAP
                ////////////////////////////////////////////////////
                submodel.submodel_event_map = [
                  //set input value
                  {
                    trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                    selector  : 'input[data-type], select[data-type]',
                    name      : 'set_input_value',
                    actions   : 'updateSubModel'
                  }
                ];

                submodel.ready();
            },

            ready : function() {
              var submodel = this;
              submodel.control.setupDOMListeners( submodel.submodel_event_map , { dom_el : submodel.container }, submodel );

              //callbacks
              submodel.value.callbacks.add(function( to, from) {
                    var _current_model    = submodel.control.czr_Model.get(),
                        _new_model        = _.clone( _current_model );//initialize it to the current value

                    //make sure the _new_model is an object and is not empty
                    _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
                    //set the new val to the changed property
                    _new_model[submodel.id] = to;

                    submodel.control.czr_Model.set(_new_model);

                    console.log('a submodel value has changed : ', submodel.id, to, from );
              });
            },


            updateSubModel : function( obj ) {
              //get the changed property and val
              //=> all html input have data-type attribute corresponding to the ones stored in the model
              var submodel           = this,
                  $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
                  _new_val          = $( $_changed_input, obj.dom_el ).val();

              submodel.value.set(_new_val);
            }
    })//CZR_subModel

  });//$.extend

})( wp.customize, jQuery, _);
