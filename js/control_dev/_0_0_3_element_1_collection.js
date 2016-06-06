//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the element view
//Listen to items collection changes and update the control setting

var CZRElementMths = CZRElementMths || {};

$.extend( CZRElementMths, {

  //@fired in element ready on api('ready')
  populateItemCollection : function() {
          var element = this;

          //populates the collection with the saved items
          _.each( element.items, function( item, key ) {
                //normalizes the item
                item = element._normalizeItem(item, _.has( item, 'id' ) ? item.id : key );
                if ( false === item ) {
                  throw new Error('fetchSavedCollection : an item could not be added in : ' + element.id );
                }
                //adds it to the collection
                element.instantiateItem(item);
          });

          return this;
  },


  instantiateItem : function( item, is_added_by_user ) {
          if ( ! _.has( item,'id') ) {
            throw new Error('CZRElement::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          var element = this;
          //Maybe prepare the item, make sure its id is set and unique
          item =  ( _.has( item, 'id') && element._isItemIdPossible( item.id) ) ? item : element._initNewItem( item || {} );

          //instanciate the item with the default constructor
          element.czr_Item.add( item.id, new element.itemConstructor( item.id, {
                item_id : item.id,
                initial_input_values : item,
                defaultItemModel : _.clone( element.defaultItemModel ),
                item_control : element.control,
                item_element : element,
                is_added_by_user : is_added_by_user || false
          } ) );

          //push it to the collection
          element.updateItemsCollection( { item : item } );

          //listen to each single item change
          element.czr_Item(item.id).callbacks.add( function() { return element.itemReact.apply(element, arguments ); } );
  },



  //React to a single item change
  //cb of element.czr_Item(item.id).callbacks
  itemReact : function( to, from ) {
        var element = this;
          //update the collection
          element.updateItemsCollection( {item : to });
  },



  //@param obj can be { collection : []}, or { item : {} }
  updateItemsCollection : function( obj ) {
          var element = this,
              _current_collection = element.get();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection item with sortable or when a item is removed
          if ( _.has( obj, 'collection' ) ) {
            //reset the collection
            element.set(obj.collection);
            return;
          }

          if ( ! _.has(obj, 'item') ) {
            throw new Error('updateItemsCollection, no item provided ' + element.control.id + '. Aborting');
          }
          var item = _.clone(obj.item);

          //the item already exist in the collection
          if ( _.findWhere( _new_collection, { id : item.id } ) ) {
            _.map( _current_collection , function( _item, _ind ) {
              if ( _item.id != item.id )
                return;

              //set the new val to the changed property
              _new_collection[_ind] = item;
            });
          }
          //the item has to be added
          else {
            _new_collection.push(item);
          }

          //updates the collection value
          element.set(_new_collection);
  },



  //fire on sortable() update callback
  //@returns a sorted collection as an array of item objects
  _getSortedDOMCollection : function( obj ) {
          var element = this,
              _old_collection = _.clone( element.get() ),
              _new_collection = [],
              _index = 0;

          //re-build the collection from the DOM
          $( '.' + element.control.css_attr.inner_view, element.container ).each( function() {
            var _item = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
            //do we have a match in the existing collection ?
            if ( ! _item )
              return;

            _new_collection[_index] = _item;

            _index ++;
          });

          //make sure the new collection is not empty...
          if ( 0 === _new_collection.length )
            return _old_collection;

          //make sure we have the exact same items as before in the sorted collection
          if ( ! _.isEmpty( _.difference( _old_collection, _new_collection ) ) )
            return _old_collection;

          return _new_collection;
  }
});//$.extend//CZRBaseControlMths