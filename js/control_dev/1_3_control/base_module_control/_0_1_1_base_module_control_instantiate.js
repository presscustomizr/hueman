
//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

$.extend( CZRBaseModuleControlMths, {

  instantiateModule : function( module, constructor ) {
          if ( ! _.has( module,'id') ) {
            throw new Error('CZRModule::instantiateModule() : a module has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }

          var control = this;

          //is a constructor provided ?
          //if not try to look in the module object if we an find one
          if ( _.isUndefined(constructor) || _.isEmpty(constructor) ) {
              constructor = control.getModuleConstructor( module );
          }

          //on init, the module collection is populated with module already having an id
          //For now, let's check if the id is empty and is not already part of the collection.
          //@todo : improve this.
          if ( ! _.isEmpty( module.id ) && control.czr_Module.has( module.id ) ) {
                throw new Error('The module id already exists in the collection in control : ' + control.id );
          }

          var module_api_ready = control.prepareModuleForAPI( module );

          //instanciate the module with the default constructor
          control.czr_Module.add( module_api_ready.id, new constructor( module_api_ready.id, module_api_ready ) );

          //return the module instance for chaining
          return control.czr_Module(module_api_ready.id);
  },



  //@return a module constructor object
  getModuleConstructor : function( module ) {
          var control = this,
              parentConstructor = {},
              constructor = {};

          if ( ! _.has( module, 'module_type' ) ) {
              throw new Error('CZRModule::getModuleConstructor : no module type found for module ' + module.id );
          }
          if ( ! _.has( api.czrModuleMap, module.module_type ) ) {
              throw new Error('Module type ' + module.module_type + ' is not listed in the module map api.czrModuleMap.' );
          }

          //in the general case of multi_module / sektion control, we need to extend the module constructors
          if ( ! _.isEmpty( module.sektion_id ) ) {
              parentConstructor = api.czrModuleMap[ module.module_type ].construct ;
              constructor = parentConstructor.extend( control.getMultiModuleExtender( parentConstructor ) );
          } else {
            //in the particular case of a module embedded in a control the constructor is ready to be fired.
              constructor = api.czrModuleMap[ module.module_type ].construct;
          }

          if ( _.isUndefined(constructor) || _.isEmpty(constructor) || ! constructor ) {
              throw new Error('CZRModule::getModuleConstructor : no constructor found for module type : ' + module.module_type +'.' );
          }
          return constructor;
  },





  //@return an API ready module object
  //To be instantiated in the API, the module model must have all the required properties defined in the defaultAPIModel properly set
  prepareModuleForAPI : function( module_candidate ) {
        if ( ! _.isObject( module_candidate ) ) {
            throw new Error('prepareModuleForAPI : a module must be an object to be instantiated.');
        }

        var control = this,
            api_ready_module = {};

        _.each( control.getDefaultModuleApiModel() , function( _value, _key ) {
              var _candidate_val = module_candidate[_key];
              switch( _key ) {
                    //PROPERTIES COMMON TO ALL MODULES IN ALL CONTEXTS
                    case 'id' :
                        if ( _.isEmpty( _candidate_val ) ) {
                            api_ready_module[_key] = control.generateModuleId( module_candidate.module_type );
                        } else {
                            api_ready_module[_key] = _candidate_val;
                        }
                    break;
                    case 'module_type' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('prepareModuleForAPI : a module type must a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case 'items' :
                        if ( ! _.isArray( _candidate_val )  ) {
                            throw new Error('prepareModuleForAPI : a module item list must be an array');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case 'crud' :
                        if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                            throw new Error('prepareModuleForAPI : the module param "crud" must be a boolean');
                        }
                        api_ready_module[_key] = _candidate_val || false;
                    break;
                    case 'multi_item' :
                        if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                            throw new Error('prepareModuleForAPI : the module param "multi_item" must be a boolean');
                        }
                        api_ready_module[_key] = _candidate_val || false;
                    break;
                    case  'control' :
                        api_ready_module[_key] = control;//this
                    break;



                    //PROPERTIES FOR MODULE EMBEDDED IN A CONTROL
                    case  'section' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('prepareModuleForAPI : a module section must be a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;



                    //PROPERTIES FOR MODULE EMBEDDED IN A SEKTION
                    case  'column_id' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('prepareModuleForAPI : a module column id must a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case  'sektion' :
                        if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('prepareModuleForAPI : a module sektion must be an object not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case  'sektion_id' :
                        if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                            throw new Error('prepareModuleForAPI : a module sektion id must be a string not empty');
                        }
                        api_ready_module[_key] = _candidate_val;
                    break;
                    case 'is_added_by_user' :
                        if ( ! _.isUndefined( _candidate_val) && ! _.isBoolean( _candidate_val )  ) {
                            throw new Error('prepareModuleForAPI : the module param "is_added_by_user" must be a boolean');
                        }
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
          if ( ! _.has(control, 'czr_moduleCollection') || ! _.isArray( control.czr_moduleCollection() ) ) {
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
          if ( ! _.isEmpty( control.czr_moduleCollection() ) ) {
              _max_mod_key = _.max( control.czr_moduleCollection(), function( _mod ) {
                  return parseInt( _mod.id.replace(/[^\/\d]/g,''), 10 );
              });
              _next_key = parseInt( _max_mod_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
          }
          return _next_key;
  }
});//$.extend//CZRBaseControlMths