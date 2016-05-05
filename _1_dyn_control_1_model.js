var HUDynamicMethods = HUDynamicMethods || {};


(function (api, $, _) {
  $.extend( HUDynamicMethods, {

    updatePreModel : function(obj) {
      //get the changed property and val
      //=> all html input have data-type attribute corresponding to the ones stored in the model
      var control           = this,
          $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
          _changed_prop     = $_changed_input.attr('data-type'),
          _new_val          = $( $_changed_input, obj.dom_el ).val(),
          _new_model        = _.clone(control.hu_preModel('model').get());//initialize it to the current value

      //make sure the title has not been emptied. If so, replace it with the default title.
      if ( 'title' == _changed_prop && _.isEmpty(_new_val) ) {
        _defaultModel = control.getDefaultModel();
        _new_val = _defaultModel.title;
      }

      _new_model[_changed_prop] = _new_val;

      //set the new val to preModel Value()
      control.hu_preModel('model').set(_new_model);

      control.doActions(
        'pre_model:' + _changed_prop + ':changed',
        control.container,
        { model : _new_model, dom_el : $('.' + control.css_attr.pre_add_view_content, control.container ) }
      );
    },







    //@param : obj = { model : {} }
    //on init when first populating the collection the saved key is provided
    addModel : function( obj, key ) {
      var control = this,
          model = {},
          is_added_by_user = _.has(obj, 'dom_event') && ! _.has(obj.dom_event, 'isTrigger');

      //Are we in a pre model case ?
      if ( ! _.has( obj, 'model') && _.has(control, 'hu_preModel') ) {
        model = control.hu_preModel('model').get();
      } else {
        //else do we have a model?
        model = _.has( obj, 'model') ? obj.model : model;
      }
      if ( _.isEmpty(model) )
        return;

      //Maybe prepare the model, make sure its id is set and unique
      model =  ( _.has( model, 'id') && control._isModelIdPossible( model.id) ) ? model : this._initNewModel( model || {} );
      key   = 'undefined' == typeof(key) ? key : false;

      //create an observable value for this model id
      //set the callbacks
      //create the Value of this model
      control.hu_Model.create(model.id);
      //add a listener on change
      control.hu_Model(model.id).callbacks.add( function( to, from ) {
          //push the new model to the collection
          control.updateCollection( { model : to }, key );
          //Always update the view title
          control.writeViewTitle( {model:to});
          //send model to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            control._sendModel(from, to );
          }
      });

      //set the value
      control.hu_Model(model.id).set(model);


      //if a model is manually added : open it and trigger a specific event
      if ( is_added_by_user ) {
        control.setViewVisibility( {model:model}, is_added_by_user );
        control.closeResetPreModel();
        control.doActions( 'model_added_by_user' , obj.dom_el, { model : model , dom_event : obj.dom_event } );
      }

      //refresh the preview frame (only needed if transport is postMessage )
      //must be a dom event not triggered
      //otherwise we are in the init collection case where the model are fetched and added from the setting in initialize
      if ( 'postMessage' == api(this.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) )
       control.previewer.refresh();
    },










    //fired after a input change is detected
    updateModel : function( obj ) {
      //get the changed property and val
      //=> all html input have data-type attribute corresponding to the ones stored in the model
      var control           = this,
          $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
          _changed_prop     = $_changed_input.attr('data-type'),
          _new_val          = $( $_changed_input, obj.dom_el ).val(),
          _current_model    = control.hu_Model(obj.model.id).get(),
          _new_model        = _.clone( _current_model );//initialize it to the current value

      //make sure the title has not been emptied. If so, replace it with the default title.
      if ( 'title' == _changed_prop && _.isEmpty(_new_val) ) {
        _defaultModel = control.getDefaultModel();
        _new_val = _defaultModel.title;
      }

      //set the new val to the changed property
      _new_model[_changed_prop] = _new_val;

      control.hu_Model(obj.model.id).set(_new_model);

      //say it to the current view
      control.doActions(
        _changed_prop + ':changed',
        obj.dom_el,
        { model : _new_model }
      );
    },





    //fired on click dom event
    removeModel : function( obj ) {
      var control = this,
          _new_collection = _.clone( control.hu_Collection('models').get() );

      _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: obj.model.id }) );

      //say it
      control.hu_Collection('models').set( _new_collection );
    },





    //Returns the default model defined in initialize
    //Each chid class can override the default model and the following method
    getDefaultModel : function( id ) {
      var control = this;
      return $.extend( _.clone(control.model), { id : id || '' } );
    },






    //////////////////////////////////
    ///MODEL HELPERS
    //////////////////////////////////
    //make sure the model and it's properties are ready to be added to the collection
    //a model should :
    //1) be an object
    //2) have a unique id
    //3) have all the default properties set (default model is defined in each child class initialize() method)
    _normalizeModel : function( model, key ) {
      if ( ! _.isObject(model) )
        return;

      //id unicity
      model = this._initNewModel(model, key);

      return model;
    },

    //helper
    //@return bool
    _isModelIdPossible : function( _id ) {
      var control = this;
      return ! _.isEmpty(_id) && ! _.findWhere( control.hu_Collection('models').get(), { id : _id });
    },

    //the job of this function is to return a new model ready to be added to the collection
    //the new model shall have a unique id
    //recursive
    _initNewModel : function( _model , _next_key ) {
      var control = this,
          _new_model = { id : '' },
          _id;

      //get the next available key of the collection
      _next_key = 'undefined' != typeof(_next_key) ? _next_key : _.size( control.hu_Collection('models').get() );

      if ( _.isNumber(_next_key) ) {
        _id = control.params.type + '_' + _next_key;
      }
      else {
        _id = _next_key;
        //reset next key to 0 in case a recursive loop is needed later
        _next_key = 0;
      }

      if ( _model && ! _.isEmpty( _model) )
        _new_model = $.extend( _model, { id : _id } );
      else
        _new_model = this.getDefaultModel( _id );

      //check the id existence, and its unicity
      if ( _.has(_new_model, 'id') && control._isModelIdPossible(_id) ) {
        //make sure that the provided model has all the default properties set
        _.map( control.getDefaultModel() , function( value, property ){
          if ( ! _.has(_new_model, property) )
            _new_model[property] = value;
        });

        return _new_model;
      }

      //if id already exists, then test a new one
      return control._initNewModel( _new_model, _next_key + 1);
    },

    //The idea is to send only the currently modified model instead of the entire collection
    //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
    _sendModel : function( from, to ) {
      var control = this,
        _changed_props = [],
        $view = control.getViewEl(to.id);

      //which property(ies) has(ve) changed ?
      _.map( from, function( _val, _key ) {
        if ( _val != to[_key] )
          _changed_props.push(_key);
      });

      _.map( _changed_props, function( _prop) {
        control.previewer.send( 'sub_setting', {
          set_id : control.id,
          model_id : to.id,
          changed_prop : _prop,
          value : to[_prop]
        });

        //add a hook here
        control.doActions('after_sendModel', $view, { model : to , dom_el: $view, changed_prop : _prop } );

      });
    },
  });//$.extend()

})( wp.customize, jQuery, _);