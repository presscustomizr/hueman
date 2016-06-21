
//extends api.CZRBaseModuleControl


var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );

          //declare a default module model for the DB
          control.defautDatabaseModuleModel = {
                id : '',
                module_type : '',
                column_id : '',
                sektion_id : '',
                items : [],
          };

          //declare a default module model for the API
          //In the API, each module of the collection must hold additional informations
          control.defautAPIModuleModel = {
                id : '',
                module_type : '',
                column_id : '',
                sektion : {},// => the sektion instance
                sektion_id : '',
                control : {},// => the control instance
                items : [],
                is_added_by_user : false
          };

          //define a default Constructor
          $.extend( control.moduleConstructors , {
                  czr_text_module : api.CZRTextModule,
          });

          //store the module ID of the synchronized sektions
          control.syncSektionModule = new api.Value();

          //declares the API collection of module instances
          control.czr_Module = new api.Values();

          //czr_collection stores the module collection
          control.czr_moduleCollection = new api.Value();
          control.czr_moduleCollection.set([]);

          //listen to the module-collection setting changes
          //=> synchronize the columns in the sektion setting
          api(control.id).callbacks.add( function() { return control.syncColumn.apply( control, arguments ); } );

  },






  //////////////////////////////////
  ///READY = CONTROL DOM ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          api.bind( 'ready', function() {

                //POPULATE THE SAVED MODULE COLLECTION WHEN THE SYNCHRONIZED SEKTIONS SETTING HAS PROVIDED ITS INSTANCE
                control.syncSektionModule.bind( function(to, from) {
                      //the from must be virgin
                      if ( ! _.isUndefined( from ) )
                        return;

                      control.registerModulesOnInit( to );

                      console.log('SETUP MODULE COLLECTION LISTENER NOW ? ');
                      //LISTEN TO ELEMENT COLLECTION
                      control.czr_moduleCollection.callbacks.add( function() { return control.collectionReact.apply( control, arguments ); } );
                });


                //LISTEN TO MODULE CANDIDATES ADDED BY USER
                control.bind( 'user-module-candidate', function( _module ) {
                      //instanciate and add it to the collection
                      control.instantiateModule( _module, {} ); //module, constructor
                });
          });
  },




  //fired when the main sektion module has synchronised its if with the module-collection control
  registerModulesOnInit : function( sektion_module_instance ) {
          console.log('IN REGISTER MODULES ON INIT', sektion_module_instance.id  );
          var control = this,
              saved_modules = $.extend( true, {}, api(control.id).get() );//deep clone

          _.each( saved_modules, function( _mod, _key ) {
                  console.log('SAVED MODULE TO INIT :', _mod, _mod.sektion_id );
                  //we need the sektion object
                  //First let's find the sektion module id
                  var _sektion_control = api.control( api.CZR_Helpers.build_setId( 'sektions') );

                  if ( ! sektion_module_instance.czr_Item.has( _mod.sektion_id ) ) {
                    console.log('Warning Module ' + _mod.id + ' has no sektion to be embedded to.');
                    return;
                  }

                  var _sektion = sektion_module_instance.czr_Item( _mod.sektion_id );

                  console.log('_sektion_module_id', sektion_module_instance.id );
                  console.log('_sektion', _sektion, _mod.sektion_id, sektion_module_instance.get() );

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





  instantiateModule : function( module, constructor ) {
          if ( ! _.has( module,'id') ) {
            throw new Error('CZRModule::instantiateModule() : a module has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }

          var control = this,
              current_mod_collection = control.czr_moduleCollection.get();

          //Maybe prepare the module, make sure its id is set and unique
          //module =  ( _.has( module, 'id') && control._isModuleIdPossible( module.id) ) ? module : control._initNewModule( module || {} );

          //is a constructor provided ?
          //if not try to look in the module object if we an find one
          if ( _.isUndefined(constructor) || _.isEmpty(constructor) ) {
              if ( _.has( module, 'module_type' ) ) {
                constructor = control.moduleConstructors[ module.module_type];
              }
          }

          if ( _.isUndefined(constructor) || _.isEmpty(constructor) ) {
            throw new Error('CZRModule::instantiateModule() : no constructor found for module type : ' + module.module_type +'. Aborted.' );
          }

          //the module to instantiate looks like this :
          //{
          //     id : '',//will be populated by the module collection class
          //     module_type : 'czr_text_module',
          //     column_id : column.id,
          //     sektion : column.sektion, => the sektion instance
          //     items : [],
          //     is_added_by_user : true
          // }
          //on init, the module collection is populated with module already having an id
          //For now, let's check if the id is empty and is not already part of the collection.

          //@todo : improve this.
          if ( ! _.isEmpty( module.id ) && control.czr_Module.has( module.id ) ) {
                throw new Error('The module id already exists in the collection in control : ' + control.id );
          }

          console.log('Module Model Raw : ', module );

          var module_api_ready = control.prepareModuleForAPI( module );
          console.log('Module model ready for instantiation : ', control.prepareModuleForAPI( module_api_ready ) );

          //instanciate the module with the default constructor
          control.czr_Module.add( module.id, new constructor( module.id, control.prepareModuleForAPI( module_api_ready ) ) );

          control.czr_Module( module.id ).isReady.done( function() {
                console.log('MODULE '+ module.id + ' : ADD IT TO THE MODULE COLLECTION. Module Model : ', control.czr_Module( module.id ).get() );
                //push it to the collection of the module-collection control
                //=> updates the wp api setting
                control.updateModulesCollection( {module : module_api_ready } );
          });

  },




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
          if ( control.czr_Module.has( id_candidate ) ) {
            console.log('in generate Module id', key, i );
            return control.generateModuleId( module_type, key++, i++ );
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
                  return _mod.id.replace(/[^\/\d]/g,'');
              });
              _next_key = parseInt( _max_mod_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
          }
          return _next_key;
  },


  //@param obj can be { collection : []}, or { module : {} }
  updateModulesCollection : function( obj ) {
          console.log('update Module Collection', obj );
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
          var module = _.clone(obj.module);

          //the module already exist in the collection
          if ( _.findWhere( _new_collection, { id : module.id } ) ) {
                _.each( _current_collection , function( _elt, _ind ) {
                      if ( _elt.id != module.id )
                        return;

                      //set the new val to the changed property
                      _new_collection[_ind] = module;
                });
          }
          //the module has to be added
          else {
                _new_collection.push(module);
          }
          //Inform the control
          control.czr_moduleCollection.set( _new_collection );
  },



  removeModuleFromCollection : function( module ) {
        console.log('IN REMOVE MODULE FROM COLLECTION', module );
        var control = this,
            _current_collection = control.czr_moduleCollection.get(),
            _new_collection = $.extend( true, [], _current_collection);

        _new_collection = _.filter( _new_collection, function( _mod ) {
              return _mod.id != module.id;
        } );

        control.czr_moduleCollection.set( _new_collection );
  },



  //cb of control.czr_moduleCollection.callbacks
  collectionReact : function( to, from ) {
        console.log('MODULE COLLECTION REACT', to, from );
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
            console.log('THE MODULE ' + _to_remove.id + ' HAS BEEN REMOVED.', _to_remove );
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


  //cb of : api(control.id).callbacks.
  syncColumn : function( to, from ) {
        console.log('IN SYNC COLUM', to , from );
        var control = this,
            main_sektion_module_instance = control.syncSektionModule.get();

        //determine if a module has been added
        var added_mod = _.filter( to, function( _mod, _key ){
            return ! _.findWhere( from, { id : _mod.id } );
        } );

        console.log('added_mod', added_mod );

        if ( ! _.isEmpty(added_mod) ) {
              _.each( added_mod, function( _mod ) {
                      console.log('MOD TO ADD',_mod );
                      console.log('MODULE ' + _mod.id + ' MUST BE ADDED TO COLUMN ' + _mod.column_id );
                      main_sektion_module_instance.czr_Column( _mod.column_id ).updateColumnModuleCollection( { module : _mod } );
              });
        }
        control.trigger( 'columns-synchronized', to );
  },


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