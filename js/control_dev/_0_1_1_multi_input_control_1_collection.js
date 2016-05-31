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
                control.addModel( { model : model }, key);
          });
          return this;
  },




  //@param : obj = { model : {} }
  //on init when first populating the collection the saved key is provided
  addModel : function( obj, key ) {
          var control = this,
              model = {},
              is_added_by_user = _.has(obj, 'dom_event') && ! _.has(obj.dom_event, 'isTrigger');

          //Are we in a pre model case ?
          if ( ! _.has( obj, 'model') && _.has(control, 'czr_preModel') ) {
            model = control.czr_preModel('model').get();
          } else {
            //else do we have a model?
            model = _.has( obj, 'model') ? obj.model : model;
          }
          if ( _.isEmpty(model) )
            return;

          //Maybe prepare the model, make sure its id is set and unique
          model =  ( _.has( model, 'id') && control._isModelIdPossible( model.id) ) ? model : this._initNewModel( model || {} );
          key   = 'undefined' == typeof(key) ? key : false;


          //instanciate the model with the default constructor
          control.czr_Model.add( model.id, new control.modelConstructor( model.id, {
                model_id : model.id,
                model_val : model,
                model_control : control,
                is_added_by_user : is_added_by_user
          } ) );


          //refresh the preview frame (only needed if transport is postMessage )
          //must be a dom event not triggered
          //otherwise we are in the init collection case where the model are fetched and added from the setting in initialize
          if ( 'postMessage' == api(this.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
  },




  //fired on click dom event
  removeModel : function( obj ) {
          var control = this,
              _new_collection = _.clone( control.czr_Model.czr_collection.get() );

          _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: obj.model.id }) );

          //say it
          control.czr_Model.czr_collection.set( _new_collection );
  },




  //@fired in control ready on api('ready')
  //setup the collection listener
  //Has to be fired after the initial fetch of the server saved collection
  //=> otherwise an unwanted collection update will be triggered when adding the saved models
  setupCollectionListeners : function(to, from) {
          var control = this,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _model_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_model_updated);

          //RENDERS AND SETUP VIEW
          if ( ! _.isEmpty(_to_render) && ! control.getViewEl(_to_render.id).length ) {
                //Render model's view
                var $view = control.renderView( {model:_to_render} );
                //setup
                control.setupViewApiListeners( {model:_to_render, dom_el : $view} );//listener of the czr_View value for expansion state
                control.setupDOMListeners( control.view_event_map , {model:_to_render, dom_el:$view} );//listeners for the view wrapper
                control._makeSortable();

                //hook here
                control.doActions('after_viewSetup', $view, { model : _to_render , dom_el: $view} );
          }//if

          //REMOVES
          if ( ! _.isEmpty(_to_remove) ) {
                //destroy the DOM el
                control._destroyView(_to_remove.id);
                //remove the values
                control.czr_Model.remove(_to_remove.id);
                control.czr_View.remove(_to_remove.id);

                //hook here
                control.doActions('after_modelRemoved', control.container, { model : _to_remove } );
          }//if

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
  }

});//$.extend//CZRBaseControlMethods