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
              throw new Error('No control assigned to module ' + id );
          }
          var module = this;
          api.Value.prototype.initialize.call( this, null, constructorOptions );


          //store the state of ready.
          //=> we don't want the ready method to be fired several times
          module.isReady = $.Deferred();

          //write the options as properties
          $.extend( module, constructorOptions || {} );

          //extend the module with new template Selectors
          $.extend( module, {
                crudModulePart : 'czr-crud-module-part',
                rudItemPart : 'czr-rud-item-part',//read, update, delete
                ruItemPart : 'czr-ru-item-part',//read, update
                itemInputList : '',//is specific for each crud module
          } );

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
                $.when( module.renderModuleParts() ).done(function( $_module_items_wrapper ){
                      if ( false === $_module_items_wrapper.length ) {
                          throw new Error( 'The items wrapper has not been rendered for module : ' + module.id );
                      }
                      module.itemsWrapper = $_module_items_wrapper;
                });
          });


          //ITEMS
          module.itemCollection = new api.Value();
          //initialize the collection with the constructor options
          module.itemCollection.set([]);

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
                //initialize the module api.Value()
                //constructorOptions has the same structure as the one described in prepareModuleforAPI
                module.set( module.initializeModuleModel( constructorOptions ) );


                //if the module is not registered yet (for example when the module is added by user),
                //=> push it to the collection of the module-collection control
                //=> updates the wp api setting
                if (  ! module.control.isModuleRegistered( module.id ) ) {
                    module.control.updateModulesCollection( { module : constructorOptions } );
                }

                //Important note : this event refreshes the customizer setting value
                //It's not listened to before the api is ready
                //=> the collection update on startup is done when the module is embedded and BEFORE the api is ready
                //=> won't trigger and change setting
                $.when( module.populateSavedItemCollection() ).done( function() {
                      //listen to item Collection changes
                      module.itemCollection.callbacks.add( function() { return module.itemCollectionReact.apply(module, arguments ); } );

                      //listen to each single module change
                      module.callbacks.add( function() { return module.moduleReact.apply(module, arguments ); } );

                      //it can be overriden by a module in its initialize method
                      if ( module.isMultiItem() )
                        module._makeItemsSortable();

                      console.log('MODULE ' + module.id + ' IS READY');
                });

          });

  },



  //////////////////////////////////
  ///READY
  //////////////////////////////////
  ready : function() {
          var module = this;
          module.isReady.resolve();
  },


  //fired when module is initialized, on module.isReady.done()
  //designed to be extended or overriden to add specific items or properties
  initializeModuleModel : function( constructorOptions ) {
          var module = this;
          if ( ! module.isMultiItem() && ! module.isCrud() ) {
                //this is a static module. We only have one item
                //init module item if needed.
                if ( _.isEmpty( constructorOptions.items ) ) {
                      var def = _.clone( module.defaultItemModel );
                      constructorOptions.items = [ $.extend( def, { id : module.id } ) ];
                }
          }
          return constructorOptions;
  },



  //cb of : module.itemCollection.callbacks
  itemCollectionReact : function( to, from ) {
          var module = this,
              _current_model = module(),
              _new_model = $.extend( true, {}, _current_model );
          _new_model.items = to;
          module.set( _new_model );
  },


  //cb of module.callbacks
  moduleReact : function( to, from, o ) {
          //cb of : module.callbacks
          var module = this,
              control = module.control,
              is_item_update = ( _.size(from.items) == _.size(to.items) ) && ! _.isEmpty( _.difference(to.items, from.items) ),
              is_column_update = to.column_id != from.column_id,
              is_item_collection_sorted = ( _.size(from.items) == _.size(to.items) ) && ! is_item_update && ! is_column_update;


          //Sorted collection case
          if ( is_item_collection_sorted ) {
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

          //update the collection + pass data
          control.updateModulesCollection( {
                module : $.extend( true, {}, to ),
                data : o//useful to pass contextual info when a change happens
          } );

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