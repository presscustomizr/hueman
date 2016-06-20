//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

$.extend( CZRBaseModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          //for now this is a collection with one item
          control.savedModules = [
                {
                  id : options.params.section + '_' + options.params.type,
                  section : options.params.section,
                  block   : '',
                  module_type : options.params.module_type,
                  items   : api(control.id).get()
                }
          ];

          //define a default Constructor
          control.moduleConstructors = {
                czr_widget_areas_module   : api.CZRWidgetAreaModule,
                czr_social_module    : api.CZRSocialModule,
                czr_sektion_module    : api.CZRSektionModule,
                czr_fp_module    : api.CZRFeaturedPageModule,
                czr_slide_module    : api.CZRSlideModule,
                czr_text_editor_module  : api.CZRTextEditorModule
          };

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
                //do we really need this check ?
                //=> the question is : what can trigger the api.('ready') event ?
                if ( ! _.isEmpty( control.czr_moduleCollection.get() ) )
                  return;

                control.populateModuleCollection();
                //LISTEN TO MODULE COLLECTION
                control.czr_moduleCollection.callbacks.add( function() { return control.collectionReact.apply( control, arguments ); } );
          });
  },

  //@fired in control ready on api('ready')
  populateModuleCollection : function() {
          var control = this;
          //inits the collection with the saved modules
          //populates the collection with the saved module
          _.each( control.savedModules, function( module, key ) {
                //normalizes the module
                module = control._normalizeModule( module );
                if ( ! _.isObject(module) || _.isEmpty(module) ) {
                  throw new Error('Populate Module Collection : a module could not be added in : ' + control.id );
                }
                if ( _.isUndefined( control.moduleConstructors[ module.module_type] ) ) {
                  throw new Error('Populate Module Collection : no constructor found for type : ' +  module.module_type );
                }

                //adds it to the collection
                control.instantiateModule( module, control.moduleConstructors[ module.module_type] );
          });

          return this;
  },


  instantiateModule : function( module, constructor, is_added_by_user ) {
          if ( ! _.has( module,'id') ) {
            throw new Error('CZRModule::instantiateModule() : an module has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }

          var control = this;

          //Maybe prepare the module, make sure its id is set and unique
          //module =  ( _.has( module, 'id') && control._isModuleIdPossible( module.id) ) ? module : control._initNewModule( module || {} );

          //is a constructor provided ?
          //if not try to look in the module object if we an find one
          if ( _.isUndefined(constructor) ) {
              if ( _.has( module, 'module_type' ) ) {
                constructor = control.moduleConstructors[ module.module_type];
              }
          }

          if ( _.isUndefined(constructor) ) {
            throw new Error('CZRModule::instantiateModule() : no constructor found for module type : ' + module.module_type +'. Aborted.' );
          }
          //instanciate the module with the default constructor
          control.czr_Module.add( module.id, new constructor( module.id, {
                id : module.id,
                section : module.section,
                module_type    : module.module_type,
                items   : _.clone( module.items ),
                control : control,
                is_added_by_user : is_added_by_user || false,
                is_sortable : true
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
          var control = this;
          if ( _.has( control.params, 'in_sektion' ) && control.params.in_sektion )
            return modules;

          //at this point we should be in the case of a single module collection, typically use to populate a regular setting
          if ( _.size(modules) > 1 ) {
            throw new Error('There should not be several modules in the collection of control : ' + control.id );
          }
          if ( ! _.isArray(modules) || _.isEmpty(modules) || ! _.has( modules[0], 'items' ) ) {
            throw new Error('The setting value could not be populated in control : ' + control.id );
          }
          return modules[0].items;

  }
});//$.extend//CZRBaseControlMths