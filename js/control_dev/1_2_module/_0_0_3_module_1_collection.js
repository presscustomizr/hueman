//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the module view
//Listen to items collection changes and update the control setting

var CZRModuleMths = CZRModuleMths || {};

$.extend( CZRModuleMths, {

  //@fired in module ready on api('ready')
  //the module().items has been set in initialize
  populateSavedItemCollection : function() {
          var module = this;
          if ( ! _.isArray( module().items ) ) {
              throw new Error( 'The saved items collection must be an array in module :' + module.id );
          }

          //populates the collection with the saved items
          _.each( module().items, function( item_candidate , key ) {
                //adds it to the collection and fire item.ready()
                module.instantiateItem( item_candidate ).ready();
          });

          //check if everything went well
          _.each( module().items, function( _item ) {
                if ( _.isUndefined( _.findWhere( module.itemCollection(), _item.id ) ) ) {
                  throw new Error( 'The saved items have not been properly populated in module : ' + module.id );
                }
          });

          module.trigger('items-collection-populated');
          //do we need to chain this method ?
          //return this;
  },


  instantiateItem : function( item, is_added_by_user ) {
          if ( ! _.has( item,'id') ) {
            throw new Error('CZRModule::instantiateItem() : an item has no id and could not be added in the collection of : ' + this.id );
          }
          var module = this;
          //Prepare the item, make sure its id is set and unique
          item_candidate = module.prepareItemForAPI( item );
          if ( module.czr_Item.has( item_candidate.id ) ) {
              throw new Error('CZRModule::instantiateItem() : the following item id ' + item_candidate.id + ' already exists in module.czr_Item() for module ' + this.id  );
          }
          //instanciate the item with the default constructor
          module.czr_Item.add( item_candidate.id, new module.itemConstructor( item_candidate.id, item_candidate ) );

          if ( ! module.czr_Item.has( item_candidate.id ) ) {
              throw new Error('CZRModule::instantiateItem() : instantiation failed for item id ' + item_candidate.id + ' for module ' + this.id  );
          }
          //the item is now ready and will listen to changes
          //return the instance
          return module.czr_Item( item_candidate.id );
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
                          if ( _.isEmpty( _candidate_val ) ) {
                              api_ready_item[_key] = module.generateItemId( module.module_type );
                          } else {
                              api_ready_item[_key] = _candidate_val;
                          }
                      break;
                      case 'initial_item_model' :
                          //make sure that the provided item has all the default properties set
                          _.each( module.getDefaultModel() , function( _value, _property ) {
                                if ( ! _.has( item_candidate, _property) )
                                   item_candidate[_property] = _value;
                          });
                          api_ready_item[_key] = item_candidate;

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

          //Now amend the initial_item_model with the generated id
          api_ready_item.initial_item_model.id = api_ready_item.id;

          return api_ready_item;
  },


  //recursive
  generateItemId : function( module_type, key, i ) {
          //prevent a potential infinite loop
          i = i || 1;
          if ( i > 100 ) {
                throw new Error('Infinite loop when generating of a module id.');
          }
          var module = this;
          key = key || module._getNextItemKeyInCollection();
          var id_candidate = module_type + '_' + key;

          //do we have a module collection value ?
          if ( ! _.has(module, 'itemCollection') || ! _.isArray( module.itemCollection() ) ) {
                throw new Error('The item collection does not exist or is not properly set in module : ' + module.id );
          }

          //make sure the module is not already instantiated
          if ( module.isItemRegistered( id_candidate ) ) {
            key++; i++;
            return control.generateItemId( module_type, key, i );
          }
          return id_candidate;
  },


  //helper : return an int
  //=> the next available id of the item collection
  _getNextItemKeyInCollection : function() {
          var module = this,
            _max_mod_key = {},
            _next_key = 0;

          //get the initial key
          //=> if we already have a collection, extract all keys, select the max and increment it.
          //else, key is 0
          if ( ! _.isEmpty( module.itemCollection() ) ) {
              _max_mod_key = _.max( module.itemCollection(), function( _mod ) {
                  return parseInt( _mod.id.replace(/[^\/\d]/g,''), 10 );
              });
              _next_key = parseInt( _max_mod_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
          }
          return _next_key;
  },



  //this helper allows to check if an item has been registered in the collection
  //no matter if it's not instantiated yet
  isItemRegistered : function( id_candidate ) {
        var module = this;
        return ! _.isUndefined( _.findWhere( module.itemCollection(), { id : id_candidate}) );
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
              _new_collection = [];

          //re-build the collection from the DOM
          $( '.' + module.control.css_attr.single_item, module.container ).each( function( _index ) {
                var _item = _.findWhere( _old_collection, {id: $(this).attr('data-id') });
                //do we have a match in the existing collection ?
                if ( ! _item )
                  return;

                _new_collection[_index] = _item;
          });

          if ( _old_collection.length != _new_collection.length ) {
              throw new Error('There was a problem when re-building the item collection from the DOM in module : ' + module.id );
          }
          return _new_collection;
  }
});//$.extend//CZRBaseControlMths