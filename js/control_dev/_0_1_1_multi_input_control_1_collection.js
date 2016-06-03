//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};

$.extend( CZRMultiInputControlMethods, {

  //@fired in control ready on api('ready')
  populateCollection : function() {
          var control = this;
          //inits the collection with the saved models
          //populates the collection with the saved model
          _.each( control.savedModels, function( model, key ) {
                //normalizes the model
                model = control._normalizeModel(model, _.has( model, 'id' ) ? model.id : key );
                if ( false === model ) {
                  throw new Error('fetchSavedCollection : a model could not be added in : ' + control.id );
                }
                //adds it to the collection
                control.instantiateModel( model);
          });

          return this;
  },


  instantiateModel : function( model,is_added_by_user ) {
          if ( ! _.has( model,'id') ) {
            throw new Error('CZRMultiInputControl::instantiateModel() : a model has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          var control = this;

          //Maybe prepare the model, make sure its id is set and unique
          model =  ( _.has( model, 'id') && control._isModelIdPossible( model.id) ) ? model : control._initNewModel( model || {} );

          //instanciate the model with the default constructor
          control.czr_Model.add( model.id, new control.modelConstructor( model.id, {
                model_id : model.id,
                model_val : model,
                defaultMonoModel : control.defaultMonoModel,
                model_control : control,
                is_added_by_user : is_added_by_user || false
          } ) );
  },

  //registered callback by czr_collection.callbacks.add()
  collectionListeners : function( to, from) {
          var control = this,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _model_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_model_updated);

          //say it to the api
          api(control.id).set( control.filterCollectionBeforeAjax(to) );

           //SORTED COLLECTION
          if ( _collection_sorted ) {
                if ( _.has(control, 'czr_preModel') ) {
                  control.czr_preModel('view_status').set('closed');
                }
                control.closeAllViews();
                control.closeAllAlerts();
          }

          //refreshes the preview frame  :
          //1) only needed if transport is postMessage, because is triggered by wp otherwise
          //2) only needed when : add, remove, sort model(s).
          var is_model_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          if ( 'postMessage' == api(control.id).transport && ! is_model_update && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
  },


  //an overridable method to act on the collection just before it is ajaxed
  //@return the collection array
  filterCollectionBeforeAjax : function(candidate_for_db) {
          return candidate_for_db;
  },


  //@param model an object
  //@parama key is an integer OPTIONAL
  updateCollection : function( obj ) {
          var control = this,
              _current_collection = control.czr_Model.czr_collection.get();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection item with sortable or when a model is removed
          if ( _.has( obj, 'collection' ) ) {
            //reset the collection
            control.czr_Model.czr_collection.set(obj.collection);
            return;
          }

          if ( ! _.has(obj, 'model') ) {
            throw new Error('updateCollection, no model provided ' + control.id + '. Aborting');
          }
          var model = _.clone(obj.model);

          //the model already exist in the collection
          if ( _.findWhere( _new_collection, { id : model.id } ) ) {
            _.map( _current_collection , function( _model, _ind ) {
              if ( _model.id != model.id )
                return;

              //set the new val to the changed property
              _new_collection[_ind] = model;
            });
          }
          //the model has to be added
          else {
            _new_collection.push(model);
          }

          //updates the collection value
          control.czr_Model.czr_collection.set(_new_collection);
  },


  //fire on sortable() update callback
  //@returns a sorted collection as an array of model objects
  _getSortedDOMCollection : function( obj ) {
          var control = this,
              _old_collection = _.clone( control.czr_Model.czr_collection.get() ),
              _new_collection = [],
              _index = 0;

          //re-build the collection from the DOM
          $( '.' + control.css_attr.inner_view, control.container ).each( function() {
            var _model = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
            //do we have a match in the existing collection ?
            if ( ! _model )
              return;

            _new_collection[_index] = _model;

            _index ++;
          });

          //make sure the new collection is not empty...
          if ( 0 === _new_collection.length )
            return _old_collection;

          //make sure we have the exact same models as before in the sorted collection
          if ( ! _.isEmpty( _.difference( _old_collection, _new_collection ) ) )
            return _old_collection;

          return _new_collection;
  }
});//$.extend//CZRBaseControlMethods