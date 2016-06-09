var CZRInputMths = CZRInputMths || {};

//extends api.Value
//an input is instanciated with the typical set of options :
//id : _id,
// type : $(this).attr('data-input-type'),
// value : $(this).find('[data-type]').val(),
// container : $(this),
// item : item (Value instance, has a parent module)
// module : module,
// is_preItemInput : true
$.extend( CZRInputMths , {
    initialize: function( name, options ) {
            if ( _.isUndefined(options.item ) || _.isEmpty(options.item) ) {
              throw new Error('No item assigned to input ' + options.id + '. Aborting');
            }
            if ( _.isUndefined(options.module ) ) {
              throw new Error('No module assigned to input ' + options.id + '. Aborting');
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
                  content_picker : 'setupContentPicker',
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

            //synchronizer setup
            input.setupSynchronizer();

            input.ready();
    },


    setupSynchronizer: function() {
            var input       = this,
                $_input_el  = input.container.find('[data-type]'),
                is_input    = input.container.find('[data-type]').is('input'),
                input_type  = is_input ? input.container.find('[data-type]').attr('type') : false,
                is_select   = input.container.find('[data-type]').is('select'),
                is_textarea = input.container.find('[data-type]').is('textarea');


            input.syncElement = new api.Element( input.container.find('[data-type]') );
            input.syncElement.set( input() );
            input.syncElement.sync( input );
            input.callbacks.add( function(to) {
                  //set the synchronized module vat
                  input.syncElement.set( to );

                  //refresh specific input types
                  if ( is_input && 'checkbox' == input_type ) {
                    $_input_el.iCheck('update');
                  }

                  if ( is_input && 'color' == input.type ) {
                    $_input_el.wpColorPicker('color', to );
                  }
                  if ( is_select ) {
                    $_input_el.trigger('change');
                  }
            });

    },


    ready : function() {
            var input = this;
            input.setupDOMListeners( input.input_event_map , { dom_el : input.container }, input );
            //Setup individual input listener
            input.callbacks.add( function() { return input.inputReact.apply(input, arguments ); } );
    },

    //react to a single input change
    //update the collection of input
    inputReact : function( to, from) {
            var input = this,
                _current_item = input.item.get(),
                _new_model        = _.clone( _current_item );//initialize it to the current value
            //make sure the _new_model is an object and is not empty
            _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;
            //set the new val to the changed property
            _new_model[input.id] = to;

            //inform the item
            input.item.set(_new_model);
            //inform that an api changed
            input.trigger( input.id + ':changed', to );
    },


    updateInput : function( obj ) {
            //get the changed property and val
            //=> all html input have data-type attribute corresponding to the ones stored in the model
            var input           = this,
                $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
                _new_val          = $( $_changed_input, obj.dom_el ).val();
console.log(_new_val);
            //Do nothing if the value hasn't really changed
            //For synced elements this might be called after the inputReact
            //so going re-setting the same val => fixes issue with iCheck
            //not updated passing from true => false => true
            if ( _new_val == input.get() )
              return;

            input.set(_new_val);
            /* Handled in the inputReact, in the future we might want
             * to inform that the change was "dome" driven
             */
            //inform api Event
            //input.trigger( input.id + ':changed', _new_val );
    }
});//$.extend
