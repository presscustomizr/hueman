//extends api.Value
//options:
  // item_id : item.id,
  // item_val : item,
  // defaultItemModel : element.defaultItemModel,
  // item_element : element,
  // is_added_by_user : is_added_by_user || false
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.item_element) || _.isEmpty(options.item_element) ) {
          throw new Error('No element assigned to item ' + id + '. Aborting');
        }
        api.Value.prototype.initialize.call( this, null, options );

        var item = this;

        //input.options = options;
        //write the options as properties, name is included
        $.extend( item, options || {} );

        //setup listeners
        item.callbacks.add( function() { return item.setupItemListeners.apply(item, arguments ); } );

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by item.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        item.czr_View = new api.Value();
        item.setupView();

        //initialize to the provided value
        item.set(options.item_val);


        //if a item is manually added : open it
        if ( item.is_added_by_user ) {
          item.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
        }

  },//initialize


  setupView : function() {
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

          item.container = item.renderView( item.item_val );
          if ( _.isUndefined(item.container) || ! item.container.length ) {
            throw new Error( 'In setupView the Item view has not been rendered : ' + item.item_id );
          }

          //set intial state
          item.czr_View.set('closed');

          //add a listener on view state change
          item.czr_View.callbacks.add( function() { return item.setupViewStateListeners.apply(item, arguments ); } );

          api.CZR_Helpers.setupDOMListeners( item.view_event_map , { model:item.item_val, dom_el:item.container }, item );//listeners for the view wrapper

          //say it to the parent
          element.trigger('view_setup', { model : item.item_val , dom_el: item.container} );
  },


  setupViewStateListeners : function( to, from ) {
      var item = this,
          element = this.item_element,
          $viewContent = $( '.' + element.control.css_attr.view_content, item.container );

      //render and setup view content if needed
      if ( ! $.trim( $viewContent.html() ) ) {
            item.renderViewContent();
      }
      //create the collection of inputs if needed
      if ( ! _.has(item, 'czr_Input') ) {
        item.setupInputCollection();
      }
      //expand
      item._toggleViewExpansion( to );
  },


  //creates the inputs based on the rendered items
  setupInputCollection : function() {
        var item = this,
            element = item.item_element;

        //INPUTS => Setup as soon as the view content is rendered
        //the item is a collection of inputs, each one has its own view element.
        item.czr_Input = new api.Values();
        //this can be overriden by extended classes to add and overrides methods
        item.inputConstructor = element.inputConstructor;

        if ( _.isEmpty(item.defaultItemModel) || _.isUndefined(item.defaultItemModel) ) {
          throw new Error('No default model found in item ' + item.item_id + '. Aborting');
        }

        //prepare and sets the item value on api ready
        //=> triggers the element rendering + DOM LISTENERS
        var current_item = item.get();

        if ( ! _.isObject(current_item) )
          current_item = item.defaultItemModel;
        else
          current_item = $.extend( item.defaultItemModel, current_item );

        //creates the inputs based on the rendered items
        $( '.'+element.control.css_attr.sub_set_wrapper, item.container).each( function(_index) {

              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                  _value = _.has( current_item, _id) ? current_item[_id] : '';

              item.czr_Input.add( _id, new item.inputConstructor( _id, {
                  id : _id,
                  type : $(this).attr('data-input-type'),
                  input_value : _value,
                  container : $(this),
                  item : item,
                  element : element
              } ) );
        });//each

        // //listens and reacts to the items changes
        // item.czr_Input.val.callbacks.add(function(to, from) {
        //       //api(control.id).set(to);
        //       //say it to the parent Item
        //       item.set(to);
        // });
  },



  setupItemListeners : function( to, from ) {
        var item = this,
            element = item.item_element;

          element.updateCollection( {item : to });
          //Always update the view title
          item.writeViewTitle(to);

          //send item to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            item._sendItem(to, from);
          }
  }


});//$.extend