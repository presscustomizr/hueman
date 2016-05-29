//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
$.extend( CZRStaticMethods , {
  initialize: function( id, options ) {
        var control = this;
        api.CZRBaseControl.prototype.initialize.call( control, id, options );
        //the model is a collection of inputs, each one has its own view element.
        control.czr_Model = new api.Values();
        control.czr_Model.val = new api.Value();

        control.defaultModel = {};

        //this can be overriden by extended classes to add and overrides methods
        control.inputConstructor = api.CZRInput;
  },//initialize


  ready: function() {
        var control  = this;
        api.bind( 'ready', function() {
              if ( _.isEmpty(control.defaultModel) || _.isUndefined(control.defaultModel) ) {
                throw new Error('No default model found in multi input control ' + control.id + '. Aborting');
              }

              //prepare and sets the model value on api ready
              //handles the retrocompat with previous setting (only color, not array)
              //=> triggers the control rendering + DOM LISTENERS
              var current_setval = _.isString( api(control.id).get() ) ? { 'background-color': api(control.id).get() } : api(control.id).get();
              if ( ! _.isObject(current_setval) )
                current_setval = {};
              else
                current_setval = _.extend( control.defaultModel, current_setval );

              control.czr_Model.val.set( current_setval );

              //control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );
              control.renderView();

              //creates the inputs based on the rendered items
              $( '.'+control.css_attr.sub_set_wrapper, control.container).each( function(_index) {
                var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                    _value = _.has( current_setval, _id) ? current_setval[_id] : '';

                control.czr_Model.add( _id, new control.inputConstructor( _id, {
                  id : _id,
                  type : $(this).attr('data-input-type'),
                  input_value : _value,
                  container : $(this),
                  control : control
                } ) );

              });

              //listens and reacts to the models changes
              control.czr_Model.val.callbacks.add(function(to, from) {
                api(control.id).set(to);
              });
        });
  }

});//$.extend