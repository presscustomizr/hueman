//extends api.Value
//options:
  // item_id : item.id,
  // initial_input_values : item,
  // defaultItemModel : element.defaultItemModel,
  // item_element : element,
  // is_added_by_user : is_added_by_user || false
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.item_element) || _.isEmpty(options.item_element) ) {
          throw new Error('No element assigned to item ' + id + '. Aborting');
        }
        var item = this;
        api.Value.prototype.initialize.call( item, null, options );

        //input.options = options;
        //write the options as properties, name is included
        $.extend( item, options || {} );

        //declares a default model
        item.defaultItemModel = options.defaultItemModel || { id : '', title : '' };

        //set initial values
        item.set( $.extend( item.defaultItemModel, options.initial_input_values ) );

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by item.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        item.czr_View = new api.Value();

        item.setupView( options.initial_input_values );

        //initialize to the provided value
        //the item model is a collection inputs
        //It is populated on init ony => no input can be added dynamically afterwards
        item.bind('input_collection_populated', function( input_collection ) {
            //Setup individual item listener
            item.callbacks.add( function() { return item.itemInternalReact.apply(item, arguments ); } );
        });


        //if an item is manually added : open it
        if ( item.is_added_by_user ) {
          item.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
        }
        //item.setViewVisibility( {}, item.is_added_by_user );

  },//initialize


  setupView : function( item_model ) {
          var item = this,
              element = this.item_element;

          item.view_event_map = [
                  //toggles remove view alert
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + element.control.css_attr.display_alert_btn, '.' + element.control.css_attr.cancel_alert_btn ].join(','),
                    name      : 'toggle_remove_alert',
                    actions   : ['toggleRemoveAlertVisibility']
                  },
                  //removes item and destroys its view
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + element.control.css_attr.remove_view_btn,
                    name      : 'remove_item',
                    actions   : ['removeItem']
                  },
                  //edit view
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + element.control.css_attr.edit_view_btn, '.' + element.control.css_attr.view_title ].join(','),
                    name      : 'edit_view',
                    actions   : ['setViewVisibility']
                  }
          ];

          item.container = item.renderView( item_model );
          if ( _.isUndefined(item.container) || ! item.container.length ) {
            throw new Error( 'In setupView the Item view has not been rendered : ' + item.item_id );
          }

          //set intial state
          item.czr_View.set('closed');

          //always write the title
          item.writeItemViewTitle();

          //add a listener on view state change
          item.czr_View.callbacks.add( function() { return item.setupViewStateListeners.apply(item, arguments ); } );

          api.CZR_Helpers.setupDOMListeners( item.view_event_map , { model:item_model, dom_el:item.container }, item );//listeners for the view wrapper

          //say it to the parent
          element.trigger('view_setup', { model : item_model , dom_el: item.container} );
  },


  setupViewStateListeners : function( to, from ) {
          var item = this,
              item_model = item.get() || item.initial_input_values,//could not be set yet
              element = this.item_element,
              $viewContent = $( '.' + element.control.css_attr.view_content, item.container );

          //render and setup view content if needed
          if ( ! $.trim( $viewContent.html() ) ) {
                item.renderViewContent( item_model );
          }
          //create the collection of inputs if needed
          if ( ! _.has(item, 'czr_Input') ) {
            item.setupInputCollection();
          }
          //expand
          item._toggleViewExpansion( to );
  },

  //React to a single item change
  itemInternalReact : function( to, from ) {
        var item = this;
        //Always update the view title
        item.writeItemViewTitle(to);

        //send item to the preview. On update only, not on creation.
        if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
          item._sendItem(to, from);
        }
  }

});//$.extend