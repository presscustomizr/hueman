//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRElementControlMths = CZRElementControlMths || {};

$.extend( CZRElementControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          //extend the control with new template Selectors
          $.extend( control, {
              viewAlertEl : 'customize-control-' + options.params.type + '-alert',
              viewPreAddEl : 'customize-control-' + options.params.type + '-pre-add-view-content',
          } );

          //for now this is a collection with one item
          control.savedElements = [
              {
                id : options.params.section + '_' + options.params.type,
                section : options.params.section,
                block   : '',
                element_type    : options.params.element_type,
                items   : api(control.id).get()
              }
          ];

          //define a default Constructor
          control.elementConstructors = {
            //czr_sidebars   : api.CZRWidgetAreasControl,
            czr_social_element    : api.CZRSocialElement,
          };

          control.czr_Element = new api.Values();

          //czr_collection stores the element collection
          control.czr_Element.czr_collection = new api.Value();
          control.czr_Element.czr_collection.set([]);
  },


  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          api.bind( 'ready', function() {
                control.populateCollection();

                control.czr_Element.czr_collection.callbacks.add( function() { return control.elementCollectionListeners.apply(element, arguments ); } );
          });
  },

  //@fired in control ready on api('ready')
  populateCollection : function() {
          var control = this;
          //inits the collection with the saved elements
          //populates the collection with the saved element
          _.each( control.savedElements, function( element, key ) {
                //normalizes the element
                element = control._normalizeElement( element );
                if ( ! _.isObject(element) || _.isEmpty(element) ) {
                  throw new Error('Populate Element Collection : an element could not be added in : ' + control.id );
                }
                if ( _.isUndefined( control.elementConstructors[ element.element_type] ) ) {
                  throw new Error('Populate Element Collection : no constructor found for type : ' +  element.element_type );
                }

                //adds it to the collection
                control.instantiateElement( element, control.elementConstructors[ element.element_type] );
          });

          return this;
  },


  instantiateElement : function( element, constructor, is_added_by_user ) {
          if ( ! _.has( element,'id') ) {
            throw new Error('CZRElement::instantiateModel() : an element has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          if ( _.isUndefined(constructor) ) {
            throw new Error('CZRElement::instantiateModel() : no constructor found for element type : ' + element.element_type +'. Aborted.' );
          }
          var control = this;

          //Maybe prepare the element, make sure its id is set and unique
          //element =  ( _.has( element, 'id') && control._isElementIdPossible( element.id) ) ? element : control._initNewElement( element || {} );

          //instanciate the element with the default constructor
          control.czr_Element.add( element.id, new constructor( element.id, {
                section : element.section,
                block   : '',
                type    : element.type,
                items   : element.items,
                control : control,
                is_added_by_user : is_added_by_user || false
          } ) );
  },


  //@todo
  _normalizeElement : function( element ) {
    return element;
  },

  elementCollectionListeners : function( to, from ) {
          console.log('an element has changed in control : ' + control.id + '. to => from : ', to, from  );
  }

});//$.extend//CZRBaseControlMths