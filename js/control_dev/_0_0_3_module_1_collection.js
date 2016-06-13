//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {

  //@fired in module ready on api('ready')
  populateItemCollection : function() {
          var module = this;

          //populates the collection with the saved items
          _.each( module.savedItems, function( item, key ) {
                //normalizes the item
                item = module._normalizeItem(item, _.has( item, 'id' ) ? item.id : key );
                if ( false === item ) {
                  throw new Error('populateItemCollection : an item could not be added in : ' + module.id );
                }

                //adds it to the collection
                module.instantiateItem(item);
          });

          return this;
  },


  instantiateItem : function( item, is_added_by_user ) {
          if ( ! _.has( item,'id') ) {
            throw new Error('CZRModule::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          var module = this;

          //Maybe prepare the item, make sure its id is set and unique
          item =  ( _.has( item, 'id') && module._isItemIdPossible( item.id) ) ? item : module._initNewItem( item || {} );

          //instanciate the item with the default constructor
          module.czr_Item.add( item.id, new module.itemConstructor( item.id, {
                id : item.id,
                initial_item_model : module.getInitialItemModel( item ),
                defaultItemModel : _.clone( module.defaultItemModel ),
                item_control : module.control,
                item_module : module,
                is_added_by_user : is_added_by_user || false
          } ) );

          //push it to the collection
          module.updateItemsCollection( { item : module.getInitialItemModel( item ) } );

          //listen to each single item change
          module.czr_Item(item.id).callbacks.add( function() { return module.itemReact.apply(module, arguments ); } );

          module.trigger('item_instanciated', item );
  },


  //overridable
  getInitialItemModel : function( item ) {
          return item;
  },



  //React to a single item change
  //cb of module.czr_Item(item.id).callbacks
  itemReact : function( to, from ) {
        var module = this;
        //update the collection
        module.updateItemsCollection( {item : to });
  },



  //@param obj can be { collection : []}, or { item : {} }
  updateItemsCollection : function( obj ) {
          var module = this,
              _current_collection = module.get();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection item with sortable or when a item is removed
          if ( _.has( obj, 'collection' ) ) {
                //reset the collection
                module.set(obj.collection);
                return;
          }

          if ( ! _.has(obj, 'item') ) {
              throw new Error('updateItemsCollection, no item provided ' + module.control.id + '. Aborting');
          }
          var item = _.clone(obj.item);

          //the item already exist in the collection
          if ( _.findWhere( _new_collection, { id : item.id } ) ) {
                _.each( _current_collection , function( _item, _ind ) {
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
          module.set(_new_collection);
  },



  //fire on sortable() update callback
  //@returns a sorted collection as an array of item objects
  _getSortedDOMCollection : function( ) {
          var module = this,
              _old_collection = _.clone( module.get() ),
              _new_collection = [],
              _index = 0;

          //re-build the collection from the DOM
          $( '.' + module.control.css_attr.inner_view, module.container ).each( function() {
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