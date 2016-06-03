//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the element view
//Listen to items collection changes and update the control setting

var CZRElementMths = CZRElementMths || {};

$.extend( CZRElementMths, {

  //@fired in element ready on api('ready')
  populateCollection : function() {
          var element = this;
          console.log('POPULATE ITEM COLLECTION?', element.savedItems );
          //populates the collection with the saved items
          _.each( element.savedItems, function( item, key ) {
                //normalizes the item
                item = element._normalizeItem(item, _.has( item, 'id' ) ? item.id : key );
                if ( false === item ) {
                  throw new Error('fetchSavedCollection : an item could not be added in : ' + element.id );
                }
                //adds it to the collection
                element.instantiateItem( item);
          });

          return this;
  },


  instantiateItem : function( item,is_added_by_user ) {
          if ( ! _.has( item,'id') ) {
            throw new Error('CZRElement::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          var element = this;

          //Maybe prepare the item, make sure its id is set and unique
          item =  ( _.has( item, 'id') && element._isItemIdPossible( item.id) ) ? item : element._initNewItem( item || {} );

          //instanciate the item with the default constructor
          element.czr_Item.add( item.id, new element.itemConstructor( item.id, {
                item_id : item.id,
                item_val : item,
                defaultItemModel : element.defaultItemModel,
                item_control : element.control,
                item_element : element,
                is_added_by_user : is_added_by_user || false
          } ) );
  },

  //registered callback by czr_collection.callbacks.add()
  collectionListeners : function( to, from) {
          var element = this,
              _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
              _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
              _item_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
              _collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && _.isEmpty(_item_updated);

          //say it to the api
          api(element.control.id).set( element.filterCollectionBeforeAjax(to) );

           //SORTED COLLECTION
          if ( _collection_sorted ) {
                if ( _.has(element, 'czr_preItem') ) {
                  element.czr_preItem('view_status').set('closed');
                }
                element.closeAllViews();
                element.closeAllAlerts();
          }

          //refreshes the preview frame  :
          //1) only needed if transport is postMessage, because is triggered by wp otherwise
          //2) only needed when : add, remove, sort item(s).
          var is_item_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          if ( 'postMessage' == api(element.control.id).transport && ! is_item_update && ! api.CZR_Helpers.has_part_refresh( element.control.id ) ) {
            element.control.previewer.refresh();
          }
  },


  //an overridable method to act on the collection just before it is ajaxed
  //@return the collection array
  filterCollectionBeforeAjax : function(candidate_for_db) {
          return candidate_for_db;
  },


  //@param item an object
  //@parama key is an integer OPTIONAL
  updateCollection : function( obj ) {
          var element = this,
              _current_collection = element.czr_Item.czr_collection.get();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection item with sortable or when a item is removed
          if ( _.has( obj, 'collection' ) ) {
            //reset the collection
            element.czr_Item.czr_collection.set(obj.collection);
            return;
          }

          if ( ! _.has(obj, 'item') ) {
            throw new Error('updateCollection, no item provided ' + element.control.id + '. Aborting');
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
          element.czr_Item.czr_collection.set(_new_collection);
  },


  //fire on sortable() update callback
  //@returns a sorted collection as an array of item objects
  _getSortedDOMCollection : function( obj ) {
          var element = this,
              _old_collection = _.clone( element.czr_Item.czr_collection.get() ),
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