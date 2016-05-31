//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};

$.extend( CZRMultiInputControlMethods, {


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
          return ! _.isEmpty(_id) && ! _.findWhere( control.czr_Model.czr_collection.get(), { id : _id });
  },

  //the job of this function is to return a new model ready to be added to the collection
  //the new model shall have a unique id
  //!!recursive
  _initNewModel : function( _model , _next_key ) {
          var control = this,
              _new_model = { id : '' },
              _id;

          //get the next available key of the collection
          _next_key = 'undefined' != typeof(_next_key) ? _next_key : _.size( control.czr_Model.czr_collection.get() );

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
  }

});//$.extend