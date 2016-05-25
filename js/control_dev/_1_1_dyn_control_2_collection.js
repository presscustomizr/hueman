var CZRDynamicMethods = CZRDynamicMethods || {};


(function (api, $, _) {
  $.extend( CZRDynamicMethods, {
    //////////////////////////////////
    ///COLLECTION//
    //////////////////////////////////

    //@fired in control ready on api('ready')
    fetchSavedCollection : function() {
      var control = this;

      //inits the collection with the saved models
      //populates the collection with the saved model
      _.map( control.savedModels, function( model, key ) {
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

    //@fired in control ready on api('ready')
    //setup the collection listener
    //Has to be fired after the initial fetch of the server saved collection
    //=> otherwise an unwanted collection update will be triggered when adding the saved models
    setupCollectionListeners : function() {
      var control = this;
      //add a listener on change
      control.czr_Collection('models').callbacks.add( function( to, from ) {
        var _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
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
          control.czr_preModel('view_status').set('closed');
          control.closeAllViews();
          control.closeAllAlerts();
        }//if
      });
      return this;
    },


    //an overridable method to act on the collection just before it is ajaxed
    //@return the collection array
    filterCollectionBeforeAjax : function(candidate_for_db) {
      return candidate_for_db;
    },


    //@param model an object
    //@parama key is an integer OPTIONAL
    updateCollection : function( obj, key ) {
      var control = this,
          _current_collection = control.czr_Collection('models').get();
          _new_collection = _.clone(_current_collection);

      //if a collection is provided in the passed obj then simply refresh the collection
      //=> typically used when reordering the collection item with sortable or when a model is removed
      if ( _.has( obj, 'collection' ) ) {
        //reset the collection
        control.czr_Collection('models').set(obj.collection);
        return;
      }

      //else, add or update the provided model
      var _key = ( 'undefined' == typeof(key) ) ? false : key,
          model = _.clone(obj.model);


      //if a key is provided (typically on initialization) :
      //2 cases :
      //  1) the key exists : then we just override the existing value in the collection
      //  2) the key does not exists : we push a new model
      //
      //if not then 2 cases
      //  1) the provided model already exists in the collection and if yes update it by looping in the collection to find the right model, then update the collection
      //  2) this is a new model to push in the collection
      //
      if ( false !== _key ) {
        if ( _.isObject( _new_collection[key] ) )
          _new_collection[key] = model;
        else {
          _new_collection.push(model);
        }
      }
      else {
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
      }//else

      //updates the collection value
      control.czr_Collection('models').set(_new_collection);
    },


    //fire on sortable() update callback
    //@returns a sorted collection as an array of model objects
    _getSortedDOMCollection : function( obj ) {
      var control = this,
          _old_collection = _.clone( control.czr_Collection('models').get() ),
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
    },


    //@return the model {...} from the collection
    //takes a model unique id as param
    getModel : function(id) {
      var control = this;
      _model = _.findWhere( control.czr_Collection('models').get(), {id:id} );
      if ( false !== _model )
        return _model;
      return model;
    }
  });//$.extend()

})( wp.customize, jQuery, _);