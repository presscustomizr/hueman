//MULTI CONTROL CLASS
//extends api.Value
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting
//ELEMENT OPTIONS :
  // section : module.section,
  // block   : '',
  // type    : module.type,
  // items   : module.items,
  // control : control,
  // is_added_by_user : is_added_by_user || false
var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {

  initialize: function( id, options ) {
          if ( _.isUndefined(options.control) || _.isEmpty(options.control) ) {
            throw new Error('No control assigned to module ' + id + '. Aborting');
          }
          api.Value.prototype.initialize.call( this, null, options );

          var module = this;

          //write the options as properties
          $.extend( module, options || {} );
          //extend the module with new template Selectors
          $.extend( module, {
              viewPreAddEl : '',
              viewTemplateEl : '',
              viewContentTemplateEl : '',
          } );

          //initialize the module collection
          //this will be populated on ready()
          module.set([]);//the module is a collection items => this is the collection

          //Setup individual module listener
          //module.callbacks.add( function() { return item.setupModuleListeners.apply(module, arguments ); } );

          //@todo improve this check
          if ( ! _.has( module.control.params, 'in_sektion' ) || ! module.control.params.in_sektion )
            module.container = $( module.control.selector );

          //store the saved models => can be extended to add default models in children classes
          module.savedItems = options.items;

          //declares a default item model
          module.defaultModuleModel = { id : '', title : '' };

          //define a default Constructors
          module.itemConstructor = api.CZRItem;
          module.inputConstructor = api.CZRInput;

          //czr_model stores the each model value => one value by created by model.id
          module.czr_Item = new api.Values();

          //module.ready(); => fired by children
  },



  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var module = this;
          //Important note : this event refreshes the customizer setting value
          //It's not listened to before the api is ready
          //=> the collection update on startup is done when the module is embedded and BEFORE the api is ready
          //=> won't trigger and change setting
          module.populateItemCollection()._makeItemsSortable();

          //listen to each single module change
          module.callbacks.add( function() { return module.moduleReact.apply(module, arguments ); } );

          //this module is ready
          //module.container.trigger('ready');
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

          _new_module = $.extend(_new_module, { items : to } );

          control.updateModulesCollection( {module : _new_module });

          // //Always update the view title
          // module.writeViewTitle(to);

          // //@todo : do we need that ?
          // //send module to the preview. On update only, not on creation.
          // if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
          //   module._sendModule(to, from);
          // }
  }

});//$.extend//CZRBaseControlMths