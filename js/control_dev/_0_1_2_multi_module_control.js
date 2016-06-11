
//extends api.CZRBaseModuleControl


var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );

          //to remove ?
          control.savedModules = api(id).get();

          //define a default Constructor
          $.extend( control.moduleConstructors , {
                czr_text_module : api.CZRTextModule,
          });

          control.czr_Module = new api.Values();

          //czr_collection stores the module collection
          control.czr_moduleCollection = new api.Value();
          control.czr_moduleCollection.set([]);
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
                if ( ! _.isEmpty( control.czr_moduleCollection.get() ) )
                  return;

                //control.populateModuleCollection();
                //LISTEN TO ELEMENT COLLECTION
                control.czr_moduleCollection.callbacks.add( function() { return control.collectionReact.apply( control, arguments ); } );
          });
  },


  instantiateModule : function( module, constructor, is_added_by_user ) {
          if ( ! _.has( module,'id') ) {
            throw new Error('CZRModule::instantiateModule() : a module has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }

          var control = this;

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

          //instanciate the module with the default constructor
          control.czr_Module.add( module.id, new constructor( module.id, {
                id : module.id,
                sektion : module.sektion,
                column  : module.column,
                type    : module.module_type,
                items   : module.items || [],
                control : control,
                is_added_by_user : is_added_by_user || false
          } ) );

          //push it to the collection
          control.updateModulesCollection( {module : module });
  },


  //@todo
  _normalizeModule : function( module ) {
        return module;
  },



  //@param obj can be { collection : []}, or { module : {} }
  updateModulesCollection : function( obj ) {
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
          control.czr_moduleCollection.set(_new_collection);
  },


  //cb of control.czr_moduleCollection.callbacks
  collectionReact : function( to, from ) {
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
  //@return the collection array
  filterModuleCollectionBeforeAjax : function(modules) {
          return modules;
  }
});//$.extend//CZRBaseControlMths