var CZRInputMths = CZRInputMths || {};

//extends api.Value
//an input is instanciated with the typical set of options :
//id : _id,
// type : $(this).attr('data-input-type'),
// value : $(this).find('[data-type]').val(),
// container : $(this),
// item : item (Value instance, has a parent element)
// element : element
$.extend( CZRInputMths , {
    initialize: function( name, options ) {
            if ( _.isUndefined(options.item ) || _.isEmpty(options.item) ) {
              throw new Error('No item assigned to input ' + options.id + '. Aborting');
            }
            if ( _.isUndefined(options.element ) ) {
              throw new Error('No element assigned to input ' + options.id + '. Aborting');
            }

            api.Value.prototype.initialize.call( this, null, options );
            var input = this;
            //input.options = options;
            //write the options as properties, name is included
            $.extend( input, options || {} );

            //initialize to the provided value if any
            if ( ! _.isUndefined(options.input_value) )
              input.set(options.input_value);

            //setup the appropriate input based on the type
            input.type_map = {
                  text : '',
                  textarea : '',
                  check : 'setupIcheck',
                  select : 'setupSelect',
                  upload : 'setupImageUploader',
                  color : 'setupColorPicker',
                  password : ''
            };

            if ( _.has( input.type_map, input.type ) ) {
                    var _meth = input.type_map[input.type];
                    if ( _.isFunction(input[_meth]) )
                      input[_meth]();
            }

            var trigger_map = {
                  text : 'keyup',
                  textarea : 'keyup',
                  password : 'keyup',
                  color : 'colorpickerchange',
                  range : 'input propertychange'
            };

            //Input Event Map
            input.input_event_map = [
                    //set input value
                    {
                      trigger   : $.trim( ['change', trigger_map[input.type] || '' ].join(' ') ),//was 'propertychange change click keyup input',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
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
            input.callbacks.add( function() { return input.setupInputListeners.apply(input, arguments ); } );
    },


    setupInputListeners : function( to, from) {
            var input = this,
                _current_item = input.item.get(),
                _new_model        = _.clone( _current_item );//initialize it to the current value
            //make sure the _new_model is an object and is not empty
            _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
            //set the new val to the changed property
            _new_model[input.id] = to;
            input.item.set(_new_model);
    },


    updateInput : function( obj ) {
            //get the changed property and val
            //=> all html input have data-type attribute corresponding to the ones stored in the model
            var input           = this,
                $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
                _new_val          = $( $_changed_input, obj.dom_el ).val();

            input.set(_new_val);

            //say it to the dom
            input.doActions(
                input.id + ':changed',
                input.container,
                {}
            );
    }
});//$.extend