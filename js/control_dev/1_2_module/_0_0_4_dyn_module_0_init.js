//MULTI CONTROL CLASS
//extends api.CZRModule
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRDynModuleMths = CZRDynModuleMths || {};

$.extend( CZRDynModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          api.CZRModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
              itemPreAddEl : ''//is specific for each crud module
          } );

          //EXTENDS THE DEFAULT MONO MODEL CONSTRUCTOR WITH NEW METHODS
          //=> like remove item
          //module.itemConstructor = api.CZRItem.extend( module.CZRItemDynamicMths || {} );

          //PRE MODEL
          //czr_preItem stores the expansion state and the value of the preItem
          module.czr_preItem = new api.Values();
           //create observable pre-item values
          module.czr_preItem.create('item');
          module.czr_preItem.create('item_content');
          module.czr_preItem.create('view_status');
          module.czr_preItem('view_status').set('closed');

          //PRE MODEL INPUTS
          module.czr_preItemInput = new api.Values();


          //default success message when item added
          module.itemAddedMessage = serverControlParams.translatedStrings.successMessage;

          ////////////////////////////////////////////////////
          /// MODULE DOM EVENT MAP
          ////////////////////////////////////////////////////
          module.userEventMap = new api.Value( [
                //pre add new item : open the dialog box
                {
                  trigger   : 'click keydown',
                  selector  : [ '.' + module.control.css_attr.open_pre_add_btn, '.' + module.control.css_attr.cancel_pre_add_btn ].join(','),
                  name      : 'pre_add_item',
                  actions   : ['renderPreItemView','setPreItemViewVisibility'],
                },
                //add new item
                {
                  trigger   : 'click keydown',
                  selector  : '.' + module.control.css_attr.add_new_btn, //'.czr-add-new',
                  name      : 'add_item',
                  actions   : ['closeAllItems', 'addItem'],
                }
          ]);//module.userEventMap
  },


  ready : function() {
          var module = this;
          console.log('MODULE READY IN DYN MODULE CLASS : ', module.id );
          //Setup the module event listeners
          module.setupDOMListeners( module.userEventMap() , { dom_el : module.container } );

          //PRE ADD MODEL SETUP
          module.czr_preItem('item').set( module.getDefaultModel() );
          module.czr_preItem('item').set( module.getDefaultModel() );

          //Add view rendered listeners
          module.czr_preItem('item_content').callbacks.add(function( to, from ) {
                //first rendering + further renderings
                if ( _.isUndefined(from) || _.isEmpty(from) ) {
                    //provide a constructor for the inputs
                    module.preItemInputConstructor = module.inputConstructor;//api.CZRInput;
                    module.setupPreItemInputCollection();
                }
          });

          //add state listeners
          module.czr_preItem('view_status').callbacks.add( function( to, from ) {
                module._togglePreItemViewExpansion( to );
          });

          api.CZRModule.prototype.ready.call( module );
  },//ready()


  setupPreItemInputCollection : function() {
          var module = this;
          //creates the inputs based on the rendered items
          $('.' + module.control.css_attr.pre_add_wrapper, module.container).find( '.' + module.control.css_attr.sub_set_wrapper)
          .each( function(_index) {
                var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index;
                module.czr_preItemInput.add( _id, new module.preItemInputConstructor( _id, {
                    id : _id,
                    type : $(this).attr('data-input-type'),
                    container : $(this),
                    item : module.czr_preItem('item'),
                    module : module,
                    is_preItemInput : true
                } ) );
          });//each
  },


  //the item is manually added.
  //We should have a pre Item
  addItem : function(obj) {
          var module = this,
              item = module.czr_preItem('item').get();

          if ( _.isEmpty(item) || ! _.isObject(item) ) {
            throw new Error('addItem : an item should be an object and not empty. In : ' + module.id +'. Aborted.' );
          }

          //instantiates and fires ready
          module.instantiateItem( item, true ).ready(); //true == Added by user

          module.toggleSuccessMessage('on');
          setTimeout( function() {
                module.czr_preItem('view_status').set( 'closed');
                module.czr_preItem('item').set( module.getDefaultModel() );
                module.toggleSuccessMessage('off').destroyPreItemView();
          } , 2000 );

          module.trigger('item_added', item );
          //module.doActions( 'item_added_by_user' , module.container, { item : item , dom_event : obj.dom_event } );

          //refresh the preview frame (only needed if transport is postMessage )
          //must be a dom event not triggered
          //otherwise we are in the init collection case where the item are fetched and added from the setting in initialize
          if ( 'postMessage' == api(module.control.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.has_part_refresh( module.control.id ) ) {
            module.control.previewer.refresh();
          }
  }

});//$.extend