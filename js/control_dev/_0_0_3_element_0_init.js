//MULTI CONTROL CLASS
//extends api.Value
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting
//ELEMENT OPTIONS :
  // section : element.section,
  // block   : '',
  // type    : element.type,
  // items   : element.items,
  // control : control,
  // is_added_by_user : is_added_by_user || false
var CZRElementMths = CZRElementMths || {};

$.extend( CZRElementMths, {

  initialize: function( id, options ) {
          if ( _.isUndefined(options.control) || _.isEmpty(options.control) ) {
            throw new Error('No control assigned to element ' + id + '. Aborting');
          }
          api.Value.prototype.initialize.call( this, null, options );

          var element = this;

          //write the options as properties
          $.extend( element, options || {} );
          //extend the element with new template Selectors
          $.extend( element, {
              viewPreAddEl : '',
              viewTemplateEl : '',
              viewContentTemplateEl : '',
          } );

          //initialize the element collection
          element.set([]);//the element is a collection items => this is the collection

          //Setup individual element listener
          //element.callbacks.add( function() { return item.setupElementListeners.apply(element, arguments ); } );

          if ( ! _.has( element.control.params, 'in_sektion' ) || ! element.control.params.in_sektion )
            element.container = $( element.control.selector );
          else {
            throw new Error('The element container is not defined for element : ' + id + '. Aborting');
          }

          //store the saved models => can be extended to add default models in children classes
          element.savedItems = options.items;

          //declares a default model
          element.defaultElementModel = { id : '', title : '' };

          //define a default Constructors
          element.itemConstructor = api.CZRItem;
          element.inputConstructor = api.CZRInput;

          //czr_model stores the each model value => one value by created by model.id
          element.czr_Item = new api.Values();

          //element.ready();
  },



  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var element = this;
          //Important note : this event refreshes the customizer setting value
          //It's not listened to before the api is ready
          //=> the collection update on startup is done when the element is embedded and BEFORE the api is ready
          //=> won't trigger and change setting
          element.populateItemCollection()._makeSortable();

          //listen to each single element change
          element.callbacks.add( function() { return element.elementReact.apply(element, arguments ); } );

          //this element is ready
          //element.container.trigger('ready');
  },



  //cb of control.czr_Element(element.id).callbacks
  elementReact : function( to, from ) {
          //cb of : element.callbacks
          var element = this,
              control = element.control,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _item_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_item_updated);

           //Sorted collection case
          if ( _collection_sorted ) {
                if ( _.has(element, 'czr_preItem') ) {
                  element.czr_preItem('view_status').set('closed');
                }
                element.closeAllViews();
                element.closeAllAlerts();
          }

          // //refreshes the preview frame  :
          // //1) only needed if transport is postMessage, because is triggered by wp otherwise
          // //2) only needed when : add, remove, sort item(s).
          // var is_item_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          // if ( 'postMessage' == api(element.control.id).transport && ! is_item_update && ! api.CZR_Helpers.has_part_refresh( element.control.id ) ) {
          //   element.control.previewer.refresh();
          // }

          //update the collection
          //first update the element with the updated items.
          //Then say it to the element collection
          var _current_collection = control.czr_elementCollection.get(),
              _current_element = _.findWhere( _current_collection, { id : element.id } ),
              _new_element = _.clone( _current_element );

          _new_element = $.extend(_new_element, { items : to } );

          control.updateElementsCollection( {element : _new_element });

          // //Always update the view title
          // element.writeViewTitle(to);

          // //@todo : do we need that ?
          // //send element to the preview. On update only, not on creation.
          // if ( ! _.isEmpty(from) || ! _.isUndefined(from) ) {
          //   element._sendElement(to, from);
          // }
  }

});//$.extend//CZRBaseControlMths