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
              czr_widget_areas_element   : api.CZRWidgetAreaElement,
              czr_social_element    : api.CZRSocialElement,
              czr_sektion_element    : api.CZRSektionElement,
              czr_fp_element    : api.CZRFeaturedPageElement
          };

          control.czr_Element = new api.Values();

          //czr_collection stores the element collection
          control.czr_elementCollection = new api.Value();
          control.czr_elementCollection.set([]);
  },


  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          api.bind( 'ready', function() {
                //do we really need this check ?
                //=> the question is : what can trigger the api.('ready') event ?
                if ( ! _.isEmpty( control.czr_elementCollection.get() ) )
                  return;
                control.populateElementCollection();
                //LISTEN TO ELEMENT COLLECTION
                control.czr_elementCollection.callbacks.add( function() { return control.collectionReact.apply(control, arguments ); } );
          });
  },

  //@fired in control ready on api('ready')
  populateElementCollection : function() {
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
            throw new Error('CZRElement::instantiateElement() : an element has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          if ( _.isUndefined(constructor) ) {
            throw new Error('CZRElement::instantiateElement() : no constructor found for element type : ' + element.element_type +'. Aborted.' );
          }
          var control = this;

          //Maybe prepare the element, make sure its id is set and unique
          //element =  ( _.has( element, 'id') && control._isElementIdPossible( element.id) ) ? element : control._initNewElement( element || {} );

          //instanciate the element with the default constructor
          control.czr_Element.add( element.id, new constructor( element.id, {
                id : element.id,
                section : element.section,
                block   : '',
                type    : element.element_type,
                items   : element.items,
                control : control,
                is_added_by_user : is_added_by_user || false
          } ) );

          //push it to the collection
          control.updateElementsCollection( {element : element });
  },


  //@todo
  _normalizeElement : function( element ) {
        return element;
  },



  //@param obj can be { collection : []}, or { element : {} }
  updateElementsCollection : function( obj ) {
          var control = this,
              _current_collection = control.czr_elementCollection.get();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection element with sortable or when a element is removed
          if ( _.has( obj, 'collection' ) ) {
                //reset the collection
                control.czr_elementCollection.set(obj.collection);
                return;
          }

          if ( ! _.has(obj, 'element') ) {
            throw new Error('updateElementsCollection, no element provided ' + control.id + '. Aborting');
          }
          var element = _.clone(obj.element);

          //the element already exist in the collection
          if ( _.findWhere( _new_collection, { id : element.id } ) ) {
                _.each( _current_collection , function( _elt, _ind ) {
                      if ( _elt.id != element.id )
                        return;

                      //set the new val to the changed property
                      _new_collection[_ind] = element;
                });
          }
          //the element has to be added
          else {
                _new_collection.push(element);
          }

          //Inform the control
          control.czr_elementCollection.set(_new_collection);
  },


  //cb of control.czr_elementCollection.callbacks
  collectionReact : function( to, from ) {
        var control = this,
            _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
            _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
            _element_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
            is_element_update = _.isEmpty( _element_updated ),
            is_collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && ! is_element_update;

        //say it to the setting
        api(this.id).set( control.filterElementCollectionBeforeAjax(to) );

        //refreshes the preview frame  :
        //1) only needed if transport is postMessage, because is triggered by wp otherwise
        //2) only needed when : add, remove, sort item(s)
        //element update case
        if ( 'postMessage' == api(control.id).transport && ! api.CZR_Helpers.has_part_refresh( control.id ) ) {
            if ( is_collection_sorted )
                control.previewer.refresh();
        }
  },


  //an overridable method to act on the collection just before it is ajaxed
  //@return the collection array
  filterElementCollectionBeforeAjax : function(elements) {
          var control = this;
          if ( _.has( control.params, 'in_sektion' ) && control.params.in_sektion )
            return elements;

          //at this point we should be in the case of a single element collection, typically use to populate a regular setting
          if ( _.size(elements) > 1 ) {
            throw new Error('There should not be several elements in the collection of control : ' + control.id );
          }
          if ( ! _.isArray(elements) || _.isEmpty(elements) || ! _.has( elements[0], 'items' ) ) {
            throw new Error('The setting value could not be populated in control : ' + control.id );
          }
          return elements[0].items;

  }
});//$.extend//CZRBaseControlMths