
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {
  //OVERRIDES BASE MODULE CONTROL
  //id : '',
  // module_type : '',
  // column_id : '',
  // sektion : {},// => the sektion instance
  // control : {},// => the control instance
  // items : [],
  // is_added_by_user : false
  // to be instantiated in the API, the module model must have all the required properties defined in the defaultAPIModel properly set
  prepareModuleForAPI : function( module_candidate ) {
        if ( ! _.isObject( module_candidate ) ) {
            throw new Error('MultiModule Control::prepareModuleForAPI : a module must be an object to be instantiated. Aborting.');
        }
        var control = this,
            api_ready_module = {};

        _.each( control.defautAPIModuleModel, function( _value, _key ) {
              var _candidate_val = module_candidate[_key];
              switch( _key ) {
                    case 'id' :
                        if ( _.isEmpty( _candidate_val ) ) {
                            api_ready_module[_key] = control.generateModuleId( module_candidate.module_type );
                        } else {
                            api_ready_module[_key] = _candidate_val;
                        }
                    break;
                    case 'module_type' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('MultiModule Control::prepareModuleForAPI : a module type must a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case  'column_id' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('MultiModule Control::prepareModuleForAPI : a module column id must a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case  'sektion' :
                        if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('MultiModule Control::prepareModuleForAPI : a module sektion must be an object not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case  'sektion_id' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('MultiModule Control::prepareModuleForAPI : a module sektion id must be a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case  'control' :
                        api_ready_module[_key] = control;//this
                    break;
                    case 'items' :
                        if ( ! _.isArray( _candidate_val )  ) {
                            throw new Error('MultiModule Control::prepareModuleForAPI : a module item list must be an array');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case 'is_added_by_user' :
                        // if ( ! _.isBoolean( _candidate_val )  ) {
                        //     throw new Error('MultiModule Control::prepareModuleForAPI : the module param "is_added_by_user" must be a boolean');
                        // }
                        api_ready_module[_key] = _candidate_val || false;
                    break;
              }//switch
        });
        return api_ready_module;
  },


  //recursive
  generateModuleId : function( module_type, key, i ) {

          //prevent a potential infinite loop
          i = i || 1;
          if ( i > 100 ) {
                throw new Error('Infinite loop when generating of a module id.');
          }
          var control = this;
          key = key || control._getNextModuleKeyInCollection();
          var id_candidate = module_type + '_' + key;

          //do we have a module collection value ?
          if ( ! _.has(control, 'czr_moduleCollection') || ! _.isArray( control.czr_moduleCollection.get() ) ) {
                throw new Error('The module collection does not exist or is not properly set in control : ' + control.id );
          }

          //make sure the module is not already instantiated
          if ( control.isModuleRegistered( id_candidate ) ) {
            key++; i++;
            return control.generateModuleId( module_type, key, i );
          }

          return id_candidate;
  },


  //helper : return an int
  //=> the next available id of the module collection
  _getNextModuleKeyInCollection : function() {
          var control = this,
            _max_mod_key = {},
            _next_key = 0;

          //get the initial key
          //=> if we already have a collection, extract all keys, select the max and increment it.
          //else, key is 0
          if ( ! _.isEmpty( control.czr_moduleCollection.get() ) ) {
              _max_mod_key = _.max( control.czr_moduleCollection.get(), function( _mod ) {
                  return parseInt( _mod.id.replace(/[^\/\d]/g,''), 10 );
              });
              _next_key = parseInt( _max_mod_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
          }
          return _next_key;
  },


  //this helper allows to check if a module has been registered in the collection
  //no matter if it's not instantiated yet
  isModuleRegistered : function( id_candidate ) {
        var control = this;
        return ! _.isUndefined( _.findWhere( control.czr_moduleCollection.get(), { id : id_candidate}) );
  },














  ////////////////////////////////////////////
  /// REMOVE MODULE
  ///////////////////////////////////////////
  //@param module = obj => the module model
  removeModule : function( module ) {
        var control = this;
        //remove module from DOM if it's been embedded
        if ( control.czr_Module.has( module.id ) && 'resolved' == control.czr_Module( module.id ).embedded.state() )
            control.czr_Module( module.id ).container.remove();

        //remove module from API
        control.removeModuleFromCollection( module );
  },


  removeModuleFromCollection : function( module ) {
        var control = this,
            _current_collection = control.czr_moduleCollection.get(),
            _new_collection = $.extend( true, [], _current_collection);

        _new_collection = _.filter( _new_collection, function( _mod ) {
              return _mod.id != module.id;
        } );

        control.czr_moduleCollection.set( _new_collection );
  },













  //OVERRIDES BASE MODULE CONTROL
  //cb of control.czr_moduleCollection.callbacks
  collectionReact : function( to, from ) {
        var control = this,
            is_module_removed = _.size(from) > _.size(to),
            is_module_update = _.size(from) == _.size(to);

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



  //OVERRIDES BASE MODULE CONTROL
  //an overridable method to act on the collection just before it is ajaxed
  //We want to filter the module collection so that each module saved in db looks like :
  //{
  //  id : ''
  //  module_type : ''
  //  column_id : ''
  //  sektion_id : ''
  //  items : []
  //}
  filterModuleCollectionBeforeAjax : function( collection ) {
          var control = this,
              _filtered_collection = $.extend( true, [], collection );

          _.each( collection , function( _mod, _key ) {
                var db_ready_mod = $.extend( true, {}, _mod );
                _filtered_collection[_key] = control.prepareModuleForDB( db_ready_mod );
          });

          return _filtered_collection;
  },

  //fired before adding a module to the collection of DB candidates
  //the module must have the control.defautDatabaseModuleModel structure :
  //{
  // id : '',
  // module_type : '',
  // column_id : '',
  // sektion_id : '',
  // items : [],
  //};
  prepareModuleForDB : function ( module_db_candidate ) {
        if ( ! _.isObject( module_db_candidate ) ) {
            throw new Error('MultiModule Control::prepareModuleForDB : a module must be an object. Aborting.');
        }
        var control = this,
            db_ready_module = {};

        _.each( control.defautDatabaseModuleModel, function( _value, _key ) {
              if ( ! _.has( module_db_candidate, _key ) ) {
                  throw new Error('MultiModule Control::prepareModuleForDB : a module is missing the property : ' + _key + ' . Aborting.');
              }

              var _candidate_val = module_db_candidate[ _key ];
              switch( _key ) {
                    case 'id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::prepareModuleForDB : a module id must a string not empty');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;
                    case 'module_type' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::prepareModuleForDB : a module type must a string not empty');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;
                    case  'column_id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::prepareModuleForDB : a module column id must a string not empty');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;
                    case  'sektion_id' :
                      if ( ! _.isObject( module_db_candidate.sektion ) || ! _.has( module_db_candidate.sektion, 'id' ) ) {
                          throw new Error('MultiModule Control::prepareModuleForDB : a module sektion must be an object with an id.');
                      }
                      //in the API, the sektion property hold by the module is an instance
                      //let's use only the id for the DB
                      db_ready_module[ _key ] = module_db_candidate.sektion.id;
                    break;
                    case 'items' :
                      if ( ! _.isArray( _candidate_val )  ) {
                          throw new Error('MultiModule Control::prepareModuleForDB : a module item list must be an array');
                      }
                      db_ready_module[ _key ] = _candidate_val;
                    break;

              }//switch
        });
        return db_ready_module;
  }
});//$.extend//CZRBaseControlMths