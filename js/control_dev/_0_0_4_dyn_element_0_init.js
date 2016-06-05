//MULTI CONTROL CLASS
//extends api.CZRElement
//
//Setup the collection of items
//renders the element view
//Listen to items collection changes and update the control setting

var CZRDynElementMths = CZRDynElementMths || {};

$.extend( CZRDynElementMths, {
  initialize: function( id, options ) {
          var element = this;
          api.CZRElement.prototype.initialize.call( element, id, options );

          //extend the element with new template Selectors
          $.extend( element, {
              viewAlertEl : 'czr-element-item-alert',
              viewPreAddEl : '',
          } );

          //EXTENDS THE DEFAULT MONO MODEL CONSTRUCTOR WITH NEW METHODS
          //=> like remove item
          //element.itemConstructor = api.CZRItem.extend( element.CZRItemDynamicMths || {} );

          //PRE MODEL
          //czr_preItem stores the expansion state and the value of the preItem
          element.czr_preItem = new api.Values();
           //create observable pre-item values
          element.czr_preItem.create('item');
          element.czr_preItem.create('view_content');
          element.czr_preItem.create('view_status');
          element.czr_preItem('view_status').set('closed');

          //PRE MODEL INPUTS
          element.czr_preItemInput = new api.Values();


          //default success message when item added
          element.itemAddedMessage = serverControlParams.translatedStrings.successMessage;

          ////////////////////////////////////////////////////
          /// CONTROL EVENT MAP
          ////////////////////////////////////////////////////
          element.element_event_map = [
                //pre add new item : open the dialog box
                {
                  trigger   : 'click keydown',
                  selector  : [ '.' + element.control.css_attr.open_pre_add_btn, '.' + element.control.css_attr.cancel_pre_add_btn ].join(','),
                  name      : 'pre_add_item',
                  actions   : ['renderPreItemView','setPreItemViewVisibility'],
                },
                //add new item
                {
                  trigger   : 'click keydown',
                  selector  : '.' + element.control.css_attr.add_new_btn, //'.czr-add-new',
                  name      : 'add_item',
                  actions   : ['closeAllViews', 'addItem'],
                }
          ];//element.element_event_map
  },


  ready : function() {
          var element = this;
          //Setup the element event listeners
          element.setupDOMListeners( element.element_event_map , { dom_el : element.container } );

          //PRE ADD MODEL SETUP
          element.czr_preItem('item').set( element.getDefaultModel() );

          //Add view rendered listeners
          element.czr_preItem('view_content').callbacks.add(function( to, from ) {
                if ( _.isUndefined(from) ) {
                  //provide a constructor for the inputs
                  element.preItemInputConstructor = element.inputConstructor;//api.CZRInput;
                  element.setupPreItemInputCollection();
                }
          });

          //add state listeners
          element.czr_preItem('view_status').callbacks.add( function( to, from ) {
                element._togglePreItemViewExpansion( to );
          });


          api.CZRElement.prototype.ready.call( element );
  },//ready()


  setupPreItemInputCollection : function() {
          var element = this;
          //creates the inputs based on the rendered items
          $('.' + element.control.css_attr.pre_add_wrapper, element.container).find( '.' + element.control.css_attr.sub_set_wrapper)
          .each( function(_index) {
                var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index;
                element.czr_preItemInput.add( _id, new element.preItemInputConstructor( _id, {
                    id : _id,
                    type : $(this).attr('data-input-type'),
                    container : $(this),
                    item : element.czr_preItem('item'),
                    element : element,
                    is_preItemInput : true
                } ) );
          });//each
  },


  //the item is manually added.
  //We should have a pre Item
  addItem : function(obj) {
          var element = this,
              item = element.czr_preItem('item').get();

          if ( _.isEmpty(item) || ! _.isObject(item) ) {
            throw new Error('addItem : an item should be an object and not empty. In : ' + element.id +'. Aborted.' );
          }

          element.instantiateItem(item, true); //true == Added by user

          element.closeResetPreItem();

          element.trigger('item_added', item );
          //element.doActions( 'item_added_by_user' , element.container, { item : item , dom_event : obj.dom_event } );

          //refresh the preview frame (only needed if transport is postMessage )
          //must be a dom event not triggered
          //otherwise we are in the init collection case where the item are fetched and added from the setting in initialize
          if ( 'postMessage' == api(element.control.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.CZR_Helpers.has_part_refresh( element.control.id ) ) {
            element.control.previewer.refresh();
          }
  }

});//$.extend