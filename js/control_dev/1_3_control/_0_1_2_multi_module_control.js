
//extends api.CZRBaseModuleControl


var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );

          //to remove ?
          control.savedModules = api(id).get();

          //declare a default module model
          control.defautModuleModel = {
                id : '',
                module_type : '',
                column_id : '',
                items : []
          };

          console.log('MODULE COLLECTION, SAVED MODULES', control.savedModules);

          //define a default Constructor
          $.extend( control.moduleConstructors , {
                  czr_text_module : api.CZRTextModule,
          });

          control.czr_Module = new api.Values();

          //czr_collection stores the module collection
          control.czr_moduleCollection = new api.Value();
          control.czr_moduleCollection.set( api(id).get() || []);
  },


  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          api.bind( 'ready', function() {
                //do we really need this check ?
                //=> the question is : what can trigger the api.('ready') event ?
                // if ( ! _.isEmpty( control.czr_moduleCollection.get() ) )
                //   return;

                //control.populateModuleCollection();
                //LISTEN TO ELEMENT COLLECTION
                control.czr_moduleCollection.callbacks.add( function() { return control.collectionReact.apply( control, arguments ); } );

                //LISTEN TO MODULE CANDIDATES ADDED BY USER
                control.bind( 'user-module-candidate', function( _module ) {
                      //add it to the collection
                      control.instantiateModule( _module, {} ); //module, constructor
                });

                //LISTEN TO MODULE CANDIDATES SAVED IN DB
                //looks like { id : '', sektion : --instance-- }
                control.bind( 'db-module-candidate', function( _mod ) {
                      //get the module model from the module collection
                      var _module = _.findWhere( api(control.id).get() , { id : _mod.id } );
                      console.log('in db-module-candidate', _mod, _module  );
                      if ( _.isUndefined( _module ) )
                        return;

                      //amend the module with the provided sektion instance
                      //add it to the collection
                      _module.sektion = _mod.sektion;
                      control.instantiateModule( _module, {} ); //module, constructor
                });
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
          console.log('module before instantiation : ', module );

          if ( ! _.isEmpty( module.id ) && control.czr_Module.has( module.id ) ) {
                throw new Error('The module id already exists in the collection in control : ' + control.id );
          } else {
                module.id = control.generateModuleId( 'czr_text_module' );
          }

          var _module_candidate_model = $.extend( module, { control : control }),
              //normalize it now
              _default_module_model = _.clone( control.defautModuleModel ),
              _module_model = $.extend( _default_module_model, _module_candidate_model );

          //instanciate the module with the default constructor
          control.czr_Module.add( module.id, new constructor( module.id, _module_model ) );

          console.log('in instanciate module', _module_model );
          //push it to the collection of the module-collection control
          control.updateModulesCollection( {module : module } );

          console.log( '_module_model.sektion.czr_Column( _module_model.column_id ).get()' , _module_model.sektion.czr_Column( _module_model.column_id ).get() );
          //push it to the collection of the sektions control
          _module_model.sektion.czr_Column( _module_model.column_id ).updateColumnModuleCollection(
            {
              module : _module_model
            }
          );
  },


  //@todo
  _normalizeModule : function( module ) {
        return module;
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
          control.czr_moduleCollection.set( control.filterModuleCollectionBeforeAjax( _new_collection ) );
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
  //  id :
  //  module_type :
  //  column_id :
  //  items : []
  //}
  filterModuleCollectionBeforeAjax : function( collection ) {
          var control = this,
              _filtered_collection = _.clone( collection );

          _.each( collection , function( _mod, _key ) {
                var _reduced_module = {};
                _.each( control.defautModuleModel, function( value, key ) {
                    _reduced_module[key] = _mod[key];
                });
                _filtered_collection[_key] = _reduced_module;
          });

          return _filtered_collection;
  }
});//$.extend//CZRBaseControlMths