var CZRInputMethods = CZRInputMethods || {};

//extends api.Value
//an input is instanciated with the typical set of options :
//id : _id,
// type : $(this).attr('data-input-type'),
// value : $(this).find('[data-type]').val(),
// container : $(this),
// mono_model : monoModel (Value instance, has a parent control)
$.extend( CZRInputMethods , {
    initialize: function( name, options ) {
        if ( _.isUndefined(options.mono_model ) || _.isEmpty(options.mono_model) ) {
          throw new Error('No mono_model assigned to input ' + id + '. Aborting');
        }
        api.Value.prototype.initialize.call( this, null, options );
        var input = this;
        //input.options = options;
        //write the options as properties, name is included
        $.extend( input, options || {} );

        //initialize to the provided value
        input.set(options.input_value);

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
        input.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );

        //sets the input value to the one

        //callbacks
        input.callbacks.add(function( to, from) {
              var _current_mono_model = input.mono_model.get(),
                  _new_model        = _.clone( current_mono_model );//initialize it to the current value
              //make sure the _new_model is an object and is not empty
              _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
              //set the new val to the changed property
              _new_model[input.id] = to;
              input.mono_model.set(_new_model);
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
});//$.extend