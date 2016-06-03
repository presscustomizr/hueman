//extends api.Value
//options:
  // model_id : model.id,
  // model_val : model,
  // defaultItemModel : control.defaultItemModel,
  // item_control : control,
  // is_added_by_user : is_added_by_user || false
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  initialize: function( id, options ) {
        if ( _.isUndefined(options.item_control) || _.isEmpty(options.item_control) ) {
          throw new Error('No control assigned to item ' + id + '. Aborting');
        }
        api.Value.prototype.initialize.call( this, null, options );

        var item = this,
            control = item.item_control;

        //input.options = options;
        //write the options as properties, name is included
        $.extend( item, options || {} );

        //setup listeners
        item.callbacks.add( function() { return item.setupItemListeners.apply(item, arguments ); } );

        //VIEW
        //czr_View stores the current expansion status of a given view => one value by created by model.id
        //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
        item.czr_View = new api.Value();
        item.setupView();

        //initialize to the provided value
        item.set(options.model_val);


        //if a model is manually added : open it
        if ( item.is_added_by_user ) {
          item.setViewVisibility( {}, true );//empty obj because this method can be fired by the dom chain actions, always passing an object. true for added_by_user
        }

  },//initialize


  setupView : function() {
          var item = this,
              control = this.item_control;

          item.view_event_map = [
                  //toggles remove view alert
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + control.css_attr.display_alert_btn, '.' + control.css_attr.cancel_alert_btn ].join(','),
                    name      : 'toggle_remove_alert',
                    actions   : ['toggleRemoveAlertVisibility']
                  },
                  //removes model and destroys its view
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + control.css_attr.remove_view_btn,
                    name      : 'remove_model',
                    actions   : ['removeModel']
                  },
                  //edit view
                  {
                    trigger   : 'click keydown',
                    selector  : [ '.' + control.css_attr.edit_view_btn, '.' + control.css_attr.view_title ].join(','),
                    name      : 'edit_view',
                    actions   : ['setViewVisibility']
                  }
          ];

          item.container = item.renderView( item.model_val );
          if ( _.isUndefined(item.container) || ! item.container.length ) {
            throw new Error( 'In setupView the Item view has not been rendered : ' + item.model_id );
          }

          //set intial state
          item.czr_View.set('closed');

          //add a listener on view state change
          item.czr_View.callbacks.add( function() { return item.setupViewStateListeners.apply(item, arguments ); } );

          api.CZR_Helpers.setupDOMListeners( item.view_event_map , { model:item.model_val, dom_el:item.container }, item );//listeners for the view wrapper

          //hook here
          control.doActions('after_viewSetup', item.container, { model : item.model_val , dom_el: item.container} );
  },


  setupViewStateListeners : function( to, from ) {
      var item = this,
          control = this.item_control,
          $viewContent = $( '.' + control.css_attr.view_content, item.container );

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
            control = item.item_control;

        //INPUTS => Setup as soon as the view content is rendered
        //the model is a collection of inputs, each one has its own view element.
        item.czr_Input = new api.Values();
        //this can be overriden by extended classes to add and overrides methods
        item.inputConstructor = control.inputConstructor;

        if ( _.isEmpty(item.defaultItemModel) || _.isUndefined(item.defaultItemModel) ) {
          throw new Error('No default model found in multi input control ' + item.model_id + '. Aborting');
        }

        //prepare and sets the model value on api ready
        //=> triggers the control rendering + DOM LISTENERS
        var current_model = item.get();

        if ( ! _.isObject(current_model) )
          current_model = item.defaultItemModel;
        else
          current_model = $.extend( item.defaultItemModel, current_model );

        //creates the inputs based on the rendered items
        $( '.'+control.css_attr.sub_set_wrapper, item.container).each( function(_index) {

              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                  _value = _.has( current_model, _id) ? current_model[_id] : '';

              item.czr_Input.add( _id, new item.inputConstructor( _id, {
                  id : _id,
                  type : $(this).attr('data-input-type'),
                  input_value : _value,
                  container : $(this),
                  item : item,
                  control : control
              } ) );
        });//each

        // //listens and reacts to the models changes
        // item.czr_Input.val.callbacks.add(function(to, from) {
        //       //api(control.id).set(to);
        //       //say it to the parent Item
        //       item.set(to);
        // });
  },



  setupItemListeners : function( to, from ) {
        var item = this,
            control = item.item_control;

          control.updateCollection( {model : to });
          //Always update the view title
          item.writeViewTitle(to);

          //send model to the preview. On update only, not on creation.
          if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
            item._sendModel(to, from);
          }
  }


});//$.extend