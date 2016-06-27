//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {

  //@fired in module ready on api('ready')
  populateSavedItemCollection : function() {
          var module = this;

          console.log('module.savedItems', module.savedItems );
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

          //The collection of item is ready now. Say it.
          module.savedItemCollectionReady.resolve();

          return this;
  },


  instantiateItem : function( item, is_added_by_user ) {
          if ( ! _.has( item,'id') ) {
            throw new Error('CZRModule::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id +'. Aborted.' );
          }
          var module = this;
          //Prepare the item, make sure its id is set and unique
          item_candidate = module.prepareItemForAPI( item );
          //instanciate the item with the default constructor
          module.czr_Item.add( item.id, new module.itemConstructor( item.id, item_candidate ) );
          //push it to the collection
          module.updateItemsCollection( { item : module.getInitialItemModel( item ) } );
          //listen to each single item change
          module.czr_Item(item.id).callbacks.add( function() { return module.itemReact.apply(module, arguments ); } );
          //the item is now ready and will listen to changes
          module.czr_Item(item.id).ready();
          //@todo not sure this is needed now.
          module.trigger('item_instanciated', { item: item, is_added_by_user : is_added_by_user || false } );
  },



  //@return an API ready item object with the following properties
  //id : '',
  // initial_item_model : {},
  // defaultItemModel : {},
  // control : {},//control instance
  // module : {},//module instance
  // is_added_by_user : false
  prepareItemForAPI : function( item_candidate ) {
          var module = this,
              api_ready_item = {};
          if ( ! _.isObject( item_candidate ) ) {
                throw new Error('prepareitemForAPI : a item must be an object to be instantiated.');
            }

          _.each( module.defaultAPIitemModel, function( _value, _key ) {
                var _candidate_val = item_candidate[_key];
                switch( _key ) {
                      case 'id' :
                          if ( _.isUndefined( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                              api_ready_item[_key] = module._initNewItem( item_candidate || {} ).id;
                          } else {
                              if ( ! module._isItemIdPossible( _candidate_val ) )
                                api_ready_item[_key] = module._initNewItem( item_candidate || {} ).id;
                              else
                                api_ready_item[_key] = _candidate_val;
                          }
                      break;
                      case 'initial_item_model' :
                          api_ready_item[_key] = module.getInitialItemModel( item_candidate );
                          if ( ! _.isObject( api_ready_item[_key] ) ) {
                              throw new Error('prepareitemForAPI : initial_item_model must be an object in :  ' + item_candidate.id);
                          }
                      break;
                      case  'defaultItemModel' :
                          api_ready_item[_key] = _.clone( module.defaultItemModel );
                      break;
                      case  'control' :
                          api_ready_item[_key] = module.control;
                      break;
                      case  'module' :
                          api_ready_item[_key] = module;
                      break;
                      case 'is_added_by_user' :
                          api_ready_item[_key] =  _.isBoolean( _candidate_val ) ? _candidate_val : false;
                      break;
                }//switch
          });
          return api_ready_item;
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
              _current_collection = module.itemCollection();
              _new_collection = _.clone(_current_collection);

          //if a collection is provided in the passed obj then simply refresh the collection
          //=> typically used when reordering the collection item with sortable or when a item is removed
          if ( _.has( obj, 'collection' ) ) {
                //reset the collection
                module.itemCollection.set(obj.collection);
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
          module.itemCollection.set(_new_collection);
  },



  //fire on sortable() update callback
  //@returns a sorted collection as an array of item objects
  _getSortedDOMItemCollection : function( ) {
          var module = this,
              _old_collection = _.clone( module.itemCollection() ),
              _new_collection = [],
              _index = 0;

          //re-build the collection from the DOM
          $( '.' + module.control.css_attr.single_item, module.container ).each( function() {
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