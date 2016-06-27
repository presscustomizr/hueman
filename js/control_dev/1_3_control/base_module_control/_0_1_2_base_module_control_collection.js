
//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

$.extend( CZRBaseModuleControlMths, {


  //Multi Module method
  //fired when the main sektion module has synchronised its if with the module-collection control
  registerModulesOnInit : function( sektion_module_instance ) {
          var control = this;

          _.each( control.getSavedModules() , function( _mod, _key ) {
                  if ( ! sektion_module_instance.czr_Item.has( _mod.sektion_id ) ) {
                    console.log('Warning Module ' + _mod.id + ' has no sektion to be embedded to.');
                    return;
                  }

                  var _sektion = sektion_module_instance.czr_Item( _mod.sektion_id );

                  if ( _.isUndefined( _sektion ) ) {
                    throw new Error('sektion instance missing. Impossible to instantiate module : ' + _mod.id );
                  }

                  //add the sektion instance before update the api collection
                  $.extend( _mod, {sektion : _sektion} );

                  //push it to the collection of the module-collection control
                  //=> the instantiation will take place later, on column instantiation
                  control.updateModulesCollection( {module : _mod } );
          });
  },



  //@param obj can be { collection : []}, or { module : {} }
  updateModulesCollection : function( obj ) {
          var control = this,
              _current_collection = control.czr_moduleCollection.get(),
              _new_collection = $.extend( true, [], _current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection module with sortable or when a module is removed
          if ( _.has( obj, 'collection' ) ) {
                //reset the collection
                control.czr_moduleCollection.set(obj.collection);
                return;
          }

          if ( ! _.has(obj, 'module') ) {
            throw new Error('updateModulesCollection, no module provided ' + control.id + '. Aborting');
          }

          //normalizes the module for the API
          console.log( 'IN UPDATE MODULE COLLECTION', obj.module );
          var module_api_ready = control.prepareModuleForAPI( _.clone(obj.module) );

          //the module already exist in the collection
          if ( _.findWhere( _new_collection, { id : module_api_ready.id } ) ) {
                _.each( _current_collection , function( _elt, _ind ) {
                      if ( _elt.id != module_api_ready.id )
                        return;

                      //set the new val to the changed property
                      _new_collection[_ind] =module_api_ready;
                });
          }
          //the module has to be added
          else {
                _new_collection.push(module_api_ready);
          }
          //Inform the control
          control.czr_moduleCollection.set( _new_collection );
  },



  //cb of control.czr_moduleCollection.callbacks
  collectionReact : function( to, from ) {
        var control = this,
            is_module_removed = _.size(from) > _.size(to),
            is_module_update = _.size(from) == _.size(to);
            is_collection_sorted = false;

        //MODULE REMOVED
        //Remove the module instance if needed
        if ( is_module_removed ) {
            //find the module to remove
            var _to_remove = _.filter( from, function( _mod ){
                return _.isUndefined( _.findWhere( to, { id : _mod.id } ) );
            });
            _to_remove = _to_remove[0];
            control.czr_Module.remove( _to_remove.id );
        }
        console.log( 'in collection react', to, from );
        //say it to the setting
        api(this.id).set( control.filterModuleCollectionBeforeAjax(to) );


        //refreshes the preview frame  :
        //1) only needed if transport is postMessage, because is triggered by wp otherwise
        //2) only needed when : add, remove, sort item(s)
        //module update case
        if ( 'postMessage' == api(control.id).transport && ! api.CZR_Helpers.has_part_refresh( control.id ) ) {
            if ( is_collection_sorted )
                control.previewer.refresh();
        }
  },




  //an overridable method to act on the collection just before it is ajaxed
  //@return the collection array
  filterModuleCollectionBeforeAjax : function( collection ) {
          var control = this,
              _filtered_collection = $.extend( true, [], collection );

          _.each( collection , function( _mod, _key ) {
                var db_ready_mod = $.extend( true, {}, _mod );
                _filtered_collection[_key] = control.prepareModuleForDB( db_ready_mod );
          });

          //we don't want to save the same things if we the modules are embedded in a control or in a sektion
          //=> in a sektion : we save the collection of modules
          //=> in a control : we save the collection of item(s)
          if ( control.isMultiModuleControl() ) {
                return _filtered_collection;
          } else {
                //at this point we should be in the case of a single module collection, typically use to populate a regular setting
                if ( _.size(collection) > 1 ) {
                  throw new Error('There should not be several modules in the collection of control : ' + control.id );
                }
                if ( ! _.isArray(collection) || _.isEmpty(collection) || ! _.has( collection[0], 'items' ) ) {
                  throw new Error('The setting value could not be populated in control : ' + control.id );
                }
                return collection[0].items;
          }
  },




  //fired before adding a module to the collection of DB candidates
  //the module must have the control.getDefaultModuleDBModel structure :
  prepareModuleForDB : function ( module_db_candidate ) {
        if ( ! _.isObject( module_db_candidate ) ) {
            throw new Error('MultiModule Control::prepareModuleForDB : a module must be an object. Aborting.');
        }
        var control = this,
            db_ready_module = {};

        _.each( control.getDefaultModuleDBModel() , function( _value, _key ) {
              if ( ! _.has( module_db_candidate, _key ) ) {
                  throw new Error('MultiModule Control::prepareModuleForDB : a module is missing the property : ' + _key + ' . Aborting.');
              }

              var _candidate_val = module_db_candidate[ _key ];
              switch( _key ) {
                    //PROPERTIES COMMON TO ALL MODULES IN ALL CONTEXTS
                    case 'items' :
                      if ( ! _.isArray( _candidate_val )  ) {
                          throw new Error('prepareModuleForDB : a module item list must be an array');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;



                    //PROPERTIES FOR MODULE EMBEDDED IN A SEKTION
                    case 'id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('prepareModuleForDB : a module id must a string not empty');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;
                    case 'module_type' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('prepareModuleForDB : a module type must a string not empty');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;
                    case  'column_id' :
                      var _column_id = _candidate_val();
                      if ( ! _.isString( _column_id ) || _.isEmpty( _column_id ) ) {
                          throw new Error('prepareModuleForDB : a module column id must a string not empty');
                      }
                      db_ready_module[ _key ] = _column_id;
                    break;
                    case  'sektion_id' :
                      if ( ! _.isObject( module_db_candidate.sektion ) || ! _.has( module_db_candidate.sektion, 'id' ) ) {
                          throw new Error('prepareModuleForDB : a module sektion must be an object with an id.');
                      }
                      //in the API, the sektion property hold by the module is an instance
                      //let's use only the id for the DB
                      db_ready_module[ _key ] = module_db_candidate.sektion.id;
                    break;


              }//switch
        });
        return db_ready_module;
  }

});//$.extend//CZRBaseControlMths