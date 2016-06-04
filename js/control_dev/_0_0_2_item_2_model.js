//extends api.CZRBaseControl
var CZRItemMths = CZRItemMths || {};

  $.extend( CZRItemMths , {
    //The idea is to send only the currently modified item instead of the entire collection
    //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
    _sendItem : function( to, from ) {
          var item = this,
              element = item.item_element,
              _changed_props = [];

          //which property(ies) has(ve) changed ?
          _.each( from, function( _val, _key ) {
                if ( _val != to[_key] )
                  _changed_props.push(_key);
          });

          _.each( _changed_props, function( _prop ) {
                element.control.previewer.send( 'sub_setting', {
                      set_id : element.control.id,
                      item_id : to.id,
                      changed_prop : _prop,
                      value : to[_prop]
                });

                //add a hook here
                element.trigger('item_sent', { item : to , dom_el: item.container, changed_prop : _prop } );
          });
    },

    //fired on click dom event
    //for dynamic multi input elements
    removeItem : function() {
            var item = this,
                element = this.item_element,
                _new_collection = _.clone( element.get() );

            //destroy the Item DOM el
            item._destroyView();

            //new collection
            //say it
            _new_collection = _.without( _new_collection, _.findWhere( _new_collection, {id: item.item_id }) );
            element.set( _new_collection );
            //hook here
            element.trigger('item_removed', item.get() );
            //remove the item from the collection
            element.czr_Item.remove(item.item_id);
    },

    //@return the item {...} from the collection
    //takes a item unique id as param
    getModel : function(id) {
            return this.get();
    }

  });//$.extend

