
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
  },






  //////////////////////////////////
  ///READY = CONTROL DOM ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          api.bind( 'ready', function() {

                //POPULATE THE SAVED MODULE COLLECTION WHEN THE SYNCHRONIZED SEKTIONS SETTING HAS PROVIDED ITS MODULE ID
                control.syncSektionModule.bind( function(to, from) {
                      //the from must be virgin
                      if ( ! _.isUndefined( from ) )
                        return;

                      control.registerModulesOnInit( to );

                      console.log('SETUP MODULE COLLECTION LISTENER NOW');
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





  registerModulesOnInit : function( sektion_module_id ) {
          var control = this;
          _.each( api(control.id).get(), function( _mod, _key ) {
                  console.log('POPULATE THE SAVED MODULE COLLECTION ON INIT : _mod', _mod, _mod.sektion_id );
                  //we need the sektion object
                  //First let's find the sektion module id
                  var _sektion_control = api.control( api.CZR_Helpers.build_setId( 'sektions') ),
                      _sektion = _sektion_control.czr_Module( sektion_module_id ).czr_Item( _mod.sektion_id );

                  console.log('_sektion_module_id', sektion_module_id );
                  console.log('_sektion', _sektion, _mod.sektion_id, _sektion_control.czr_Module( sektion_module_id ).get() );

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





  generateModuleId : function( module_type ) {
          return module_type + '_' + ( this.czr_moduleCollection.get().length + 1 );
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
          } else if ( _.isEmpty( module.id ) ) {
                module.id = control.generateModuleId( 'czr_text_module' );
          }

          var _module_candidate_model = $.extend( module, { control : control }),
              //normalize it now
              _default_module_model = _.clone( control.defautAPIModuleModel ),
              _module_model = $.extend( _default_module_model, _module_candidate_model );

          console.log('module model before instantiation : ', _module_model );

          //is the module ready for API instanciation ?
          if ( ! control.isModuleAPIready( _module_model ) )
            return;

          //instanciate the module with the default constructor
          control.czr_Module.add( module.id, new constructor( module.id, _module_model ) );

          //push it to the collection of the module-collection control
          control.updateModulesCollection( {module : module } );
  },




  //id : '',
  // module_type : '',
  // column_id : '',
  // sektion : {},// => the sektion instance
  // control : {},// => the control instance
  // items : [],
  // is_added_by_user : false
  // to be instantiated in the API, the module model must have all the required properties defined in the defaultAPIModel properly set
  isModuleAPIready : function( module_candidate ) {
        if ( ! _.isObject( module_candidate ) ) {
            throw new Error('MultiModule Control::IsModuleAPIready : a module must be an object to be instantiated. Aborting.');
        }
        var control = this;
        _.each( control.defautAPIModuleModel, function( _value, _key ) {
              if ( ! _.has( module_candidate, _key ) ) {
                  throw new Error('MultiModule Control::IsModuleAPIready : a module is missing the property : ' + _key + ' . Aborting.');
              }
              var _candidate_val = module_candidate[_key];
              switch( _key ) {
                    case 'id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : a module id must a string not empty');
                      }
                    break;
                    case 'module_type' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : a module type must a string not empty');
                      }
                    break;
                    case  'column_id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : a module column id must a string not empty');
                      }
                    break;
                    case  'sektion' :
                      if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : a module sektion must be an object not empty');
                      }
                    break;
                    case  'control' :
                      if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : a module control must be an object not empty');
                      }
                    break;
                    case 'items' :
                      if ( ! _.isArray( _candidate_val )  ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : a module item list must be an array');
                      }
                    break;
                    case 'is_added_by_user' :
                      if ( ! _.isBoolean( _candidate_val )  ) {
                          throw new Error('MultiModule Control::IsModuleAPIready : the module param "is_added_by_user" must be a boolean');
                      }
                    break;
              }//switch
        });
        return true;
  },



  //@param obj can be { collection : []}, or { module : {} }
  updateModulesCollection : function( obj ) {
          console.log('update Module Collection', obj );
          var control = this,
              _current_collection = control.czr_moduleCollection.get();
              _new_collection = _.clone(_current_collection);

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


  //cb of control.czr_moduleCollection.callbacks
  collectionReact : function( to, from ) {
        console.log('MODULE COLLECTION REACT', to, from );
        var control = this,
            _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
            _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
            _module_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
            is_module_update = _.isEmpty( _module_updated ),
            is_collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && ! is_module_update;

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
              _filtered_collection = _.clone( collection );

          _.each( collection , function( _mod, _key ) {
                _filtered_collection[_key] = control.prepareModuleForDB( _mod );
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