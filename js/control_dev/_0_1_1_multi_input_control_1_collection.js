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
          console.log('MODEL BEFORE INSTANTIATION', model, _.has( model,'id'), is_added_by_user );
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


  //@fired in control ready on api('ready')
  //setup the collection listener
  //Has to be fired after the initial fetch of the server saved collection
  //=> otherwise an unwanted collection update will be triggered when adding the saved models
  setupCollectionListeners : function(to, from) {
    console.log(to, from, 'caca');
          var control = this,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _model_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_model_updated);

          //RENDERS AND SETUP VIEW
          // if ( ! _.isEmpty(_to_render) && ! control.getViewEl(_to_render.id).length ) {
          //       //Render model's view
          //       var $view = control.renderView( {model:_to_render} );
          //       //setup
          //       control.setupViewApiListeners( {model:_to_render, dom_el : $view} );//listener of the czr_View value for expansion state
          //       control.setupDOMListeners( control.view_event_map , {model:_to_render, dom_el:$view} );//listeners for the view wrapper
          //       control._makeSortable();

          //       //hook here
          //       control.doActions('after_viewSetup', $view, { model : _to_render , dom_el: $view} );
          // }//if

          //REMOVES
          // if ( ! _.isEmpty(_to_remove) ) {
          //       //destroy the DOM el
          //       control._destroyView(_to_remove.id);
          //       //remove the values
          //       control.czr_Model.remove(_to_remove.id);
          //       control.czr_View.remove(_to_remove.id);

          //       //hook here
          //       control.doActions('after_modelRemoved', control.container, { model : _to_remove } );
          // }//if

          //SORTED COLLECTION
          if ( _collection_sorted ) {
                if ( _.has(control, 'czr_preModel') ) {
                  control.czr_preModel('view_status').set('closed');
                }
                control.closeAllViews();
                control.closeAllAlerts();
          }//if

          return this;
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

});//$.extend//CZRBaseControlMethods