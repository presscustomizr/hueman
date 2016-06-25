//MULTI CONTROL CLASS
//extends api.Value
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting
//MODULE OPTIONS :
  // section : module.section,
  // module_type    : module.module_type,
  // items   : module.items,
  // control : control,
  // is_added_by_user : is_added_by_user || false
var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {

  initialize: function( id, constructorOptions ) {
          if ( _.isUndefined(constructorOptions.control) || _.isEmpty(constructorOptions.control) ) {
            throw new Error('No control assigned to module ' + id + '. Aborting');
          }
          api.Value.prototype.initialize.call( this, null, constructorOptions );

          var module = this;

          //store the state of ready.
          //=> we don't want the ready method to be fired several times
          module.isReady = $.Deferred();
          module.savedItemCollectionReady = $.Deferred();

          //write the options as properties
          $.extend( module, constructorOptions || {} );

          //extend the module with new template Selectors
          $.extend( module, {
                crudModulePart : 'czr-crud-module-part',
                viewTemplateEl : 'czr-crud-item-part',
                viewContentTemplateEl : '',//is specific for each crud module
          } );

          //initialize the module collection
          //this will be populated on ready()
          module.set([]);//the module is a collection items => this is the collection

          //embed : define a container, store the embed state, fire the render method
          module.embedded = $.Deferred();
          //if a module is embedded in a control, its container == the control container.
          //if the module is part of a sektion, its container will be set and resolve() later ( @see multi_module part )
          if ( ! module.isInSektion() ) {
              module.container = $( module.control.selector );
              module.embedded.resolve();
          }

          //render the item(s) wrapper
          module.embedded.done( function() {
              console.log('MODULE IS EMBEDDED, RENDER PARS : item wrapper and crud stuffs');
              module.renderModuleParts();
          });

          //ITEMS
          //store the saved models => can be extended to add default models in children classes
          module.savedItems = constructorOptions.items;

          //declares a default Item API model
          module.defaultAPIitemModel = {
                id : '',
                initial_item_model : {},
                defaultItemModel : {},
                control : {},//control instance
                module : {},//module instance
                is_added_by_user : false
          };

          //declares a default item model
          module.defaultItemModel = { id : '', title : '' };

          //define a default Constructors
          module.itemConstructor = api.CZRItem;
          //czr_model stores the each model value => one value by created by model.id
          module.czr_Item = new api.Values();


          //INPUTS
          module.inputConstructor = api.CZRInput;

          //module.ready(); => fired by children

          module.isReady.done( function() {
                console.log('MODULE ' + module.id + ' IS READY');

                //push it to the collection of the module-collection control
                //=> updates the wp api setting
                module.control.updateModulesCollection( {module : constructorOptions } );

                //Important note : this event refreshes the customizer setting value
                //It's not listened to before the api is ready
                //=> the collection update on startup is done when the module is embedded and BEFORE the api is ready
                //=> won't trigger and change setting
                module.populateSavedItemCollection();

                //it can be overriden by a module in its initialize method
                if ( module.isMultiItem() )
                  module._makeItemsSortable();

                //listen to each single module change
                module.callbacks.add( function() { return module.moduleReact.apply(module, arguments ); } );
          });

  },



  //////////////////////////////////
  ///READY
  //////////////////////////////////
  ready : function() {
          var module = this;
          module.isReady.resolve();
  },



  //cb of control.czr_Module(module.id).callbacks
  moduleReact : function( to, from ) {
          //cb of : module.callbacks
          var module = this,
              control = module.control,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _item_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_item_updated);

           //Sorted collection case
          if ( _collection_sorted ) {
                if ( _.has(module, 'czr_preItem') ) {
                  module.czr_preItem('view_status').set('closed');
                }
                module.closeAllViews();
                module.closeAllAlerts();
          }

          // //refreshes the preview frame  :
          // //1) only needed if transport is postMessage, because is triggered by wp otherwise
          // //2) only needed when : add, remove, sort item(s).
          // var is_item_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          // if ( 'postMessage' == api(module.control.id).transport && ! is_item_update && ! api.CZR_Helpers.has_part_refresh( module.control.id ) ) {
          //   module.control.previewer.refresh();
          // }

          //update the collection
          //first update the module with the updated items.
          //Then say it to the module collection
          var _current_collection = control.czr_moduleCollection.get(),
              _current_module = _.findWhere( _current_collection, { id : module.id } ),
              _new_module = _.clone( _current_module );

          _new_module = $.extend( _new_module, { items : to } );

          console.log('IN BASE MODULE INIT REACT', _new_module );

          control.updateModulesCollection( {module : _new_module });

          // //Always update the view title
          // module.writeViewTitle(to);

          // //@todo : do we need that ?
          // //send module to the preview. On update only, not on creation.
          // if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
          //   module._sendModule(to, from);
          // }
  },

  //@todo : create a smart helper to get either the wp api section or the czr api sektion, depending on the module context
  getModuleSection : function() {
          return this.section;
  },

  //@return bool
  isInSektion : function() {
          var module = this;
          return _.has( module, 'sektion_id' );
  },

  //is this module multi item ?
  //@return bool
  isMultiItem : function() {
          var module = this;
          if ( ! _.has( api.czrModuleMap, module.module_type ) )
            return;

          return api.czrModuleMap[module.module_type].crud || api.czrModuleMap[module.module_type].multi_item || false;
  },

  //is this module crud ?
  //@return bool
  isCrud : function() {
          var module = this;
          if ( ! _.has( api.czrModuleMap, module.module_type ) )
            return;

          return api.czrModuleMap[module.module_type].crud || false;
  }

});//$.extend//CZRBaseControlMths