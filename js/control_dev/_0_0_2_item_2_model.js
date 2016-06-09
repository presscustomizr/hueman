//extends api.CZRBaseControl
var CZRItemMths = CZRItemMths || {};

  $.extend( CZRItemMths , {
    //The idea is to send only the currently modified item instead of the entire collection
    //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
    _sendItem : function( to, from ) {
          var item = this,
              module = item.item_module,
              _changed_props = [];

          //which property(ies) has(ve) changed ?
          _.each( from, function( _val, _key ) {
                if ( _val != to[_key] )
                  _changed_props.push(_key);
          });

          _.each( _changed_props, function( _prop ) {
                module.control.previewer.send( 'sub_setting', {
                      set_id : module.control.id,
                      item_id : to.id,
                      changed_prop : _prop,
                      value : to[_prop]
                });

                //add a hook here
                module.trigger('item_sent', { item : to , dom_el: item.container, changed_prop : _prop } );
          });
    },

    //fired on click dom event
    //for dynamic multi input modules
    removeItem : function() {
            var item = this,
                module = this.item_module,
                _new_collection = _.clone( module.get() );

            //destroy the Item DOM el
            item._destroyView();

            //new collection
            //say it
            _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: item.item_id }) );
            module.set( _new_collection );
            //hook here
            module.trigger('item_removed', item.get() );
            //remove the item from the collection
            module.czr_Item.remove(item.item_id);
    },

    //@return the item {...} from the collection
    //takes a item unique id as param
    getModel : function(id) {
            return this.get();
    }

  });//$.extend

