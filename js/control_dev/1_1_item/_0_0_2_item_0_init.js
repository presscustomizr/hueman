//extends api.Value
//options:
  // id : item.id,
  // initial_item_model : item,
  // defaultItemModel : module.defaultItemModel,
  // module : module,
  // is_added_by_user : is_added_by_user || false
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.module) || _.isEmpty(options.module) ) {
          throw new Error('No module assigned to item ' + id + '. Aborting');
        }

        var item = this;
        api.Value.prototype.initialize.call( item, null, options );

        //DEFERRED STATES
        //store the state of ready.
        //=> we don't want the ready method to be fired several times
        item.isReady = $.Deferred();
        //will store the embedded and content rendered state
        item.embedded = $.Deferred();
        item.contentRendered = $.Deferred();

        //input.options = options;
        //write the options as properties, name is included
        $.extend( item, options || {} );

        //declares a default model
        item.defaultItemModel = _.clone( options.defaultItemModel ) || { id : '', title : '' };

        //set initial values
        var _initial_model = $.extend( item.defaultItemModel, options.initial_item_model );
        //this won't be listened to at this stage
        item.set( _initial_model );

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by item.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        item.czr_View = new api.Value();

        item.setupView( _initial_model );

        //initialize to the provided value
        //the item model is a collection inputs
        //It is populated on init ony => no input can be added dynamically afterwards
        item.bind('input_collection_populated', function( input_collection ) {
          console.log('JOIE ?');
            //Setup individual item listener
            item.callbacks.add( function() { return item.itemInternalReact.apply(item, arguments ); } );
        });


        //if an item is manually added : open it
        // if ( item.is_added_by_user ) {
        //   item.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
        // }
        //item.setViewVisibility( {}, item.is_added_by_user );

  },//initialize

  //overridable method
  //Fired after item instantiation.
  //The item.callbacks are declared.
  ready : function() {
        this.isReady.resolve();
  },

  setupView : function( item_model ) {
          var item = this,
              module = this.module;

          item.view_event_map = [
                  //toggles remove view alert
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + module.control.css_attr.display_alert_btn, '.' + module.control.css_attr.cancel_alert_btn ].join(','),
                    name      : 'toggle_remove_alert',
                    actions   : ['toggleRemoveAlertVisibility']
                  },
                  //removes item and destroys its view
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + module.control.css_attr.remove_view_btn,
                    name      : 'remove_item',
                    actions   : ['removeItem']
                  },
                  //edit view
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + module.control.css_attr.edit_view_btn, '.' + module.control.css_attr.view_title ].join(','),
                    name      : 'edit_view',
                    actions   : ['setViewVisibility']
                  }
          ];

          //set initial state
          item.czr_View.set('closed');

          item.container = item.renderView( item_model );
          if ( _.isUndefined(item.container) || ! item.container.length ) {
              throw new Error( 'In setupView the Item view has not been rendered : ' + item.id );
          } else {
              //say it
              item.embedded.resolve();
          }

          //defer actions on item view embedded
          item.embedded.done( function() {
                //always write the title
                item.writeItemViewTitle();

                //add a listener on view state change
                item.czr_View.callbacks.add( function() { return item.setupViewStateListeners.apply(item, arguments ); } );

                api.CZR_Helpers.setupDOMListeners(
                      item.view_event_map,//actions to execute
                      { model:item_model, dom_el:item.container },//model + dom scope
                      item //instance where to look for the cb methods
                );//listeners for the view wrapper
          });
  },

  //cb of item.czr_View.callbacks.add()
  setupViewStateListeners : function( to, from ) {
          var item = this,
              item_model = item.get() || item.initial_item_model,//could not be set yet
              module = this.module;

          console.log('item.contentRendered.state()', item.contentRendered.state());
          //render and setup view content if needed
          if ( 'pending' == item.contentRendered.state() ) {
              var $item_content = item.renderViewContent( item_model );
              if ( ! _.isUndefined($item_content) && false !== $item_content ) {
                //say it
                item.contentRendered.resolve();
              }
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
    console.log('IN ITEM INTERNAL REACT', to ,from );
          var item = this;
          //Always update the view title
          item.writeItemViewTitle(to);

          //send item to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            item._sendItem(to, from);
          }
  }

});//$.extend