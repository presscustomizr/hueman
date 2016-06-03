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
          var element = this;

          //write the options as properties
          $.extend( element, options || {} );

          console.log('ELEMENT ?', element, options );
          //@todo, the container could be specified for a given element
          element.container = $( element.control.selector );
          //store the saved models => can be extended to add default models in children classes
          element.savedItems = options.items;

          //declares a default model
          element.defaultItem = { id : '', title : '' };

          //define a default Constructors
          element.itemConstructor = api.CZRItem;
          element.inputConstructor = api.CZRInput;

          //czr_model stores the each model value => one value by created by model.id
          element.czr_Item = new api.Values();

          //czr_collection stores the item collection
          element.czr_Item.czr_collection = new api.Value();
          element.czr_Item.czr_collection.set([]);

          element.ready();
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
          api.bind( 'ready', function() {
                element.populateCollection()._makeSortable();

                //LISTEN TO ITEMS COLLECTION
                //1) update the control setting value
                //2) fire dom actions
                element.czr_Item.czr_collection.callbacks.add( function() { return element.collectionListeners.apply(element, arguments ); } );
          });

          //this element is ready
          //element.container.trigger('ready');
  }

});//$.extend//CZRBaseControlMths