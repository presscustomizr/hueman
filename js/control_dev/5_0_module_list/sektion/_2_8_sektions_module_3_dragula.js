//extends api.CZRDynModule
//This module populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of modules ( => content module on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  /////////////////////////////////////////////////////////////////////////
  /// DRAGULA
  ////////////////////////////////////////////////////////////////////////
 initModulesDragula : function() {
        var module = this;

        //instantiate dragula without container => they will be pushed on module instantiation
        module.modsDragInstance = dragula({
            moves: function (el, source, handle, sibling) {
                return _.contains( handle.className.split(' '), 'czr-mod-drag-handler' );
            },
            invalidTarget : function(el, handle) {
                console.log('invalidTarget', el, handle );
                return false;
            },
            accepts: function ( el, target, source, sibling ) {
                // if ( $(target).closest('.czr-single-item').hasClass('open') )
                //   return ! _.contains( target.className.split(' '), 'czr-dragula-fake-container' );
                return true;
            },
            isContainer : function( el ) {
              //console.log('isContainer?', el);
              return false;
            }
        });//dragula


        //react to drag events
       module.modsDragInstance.on('drag', function( el, source ){
                //display the fake container to all closed sek items
                module.czr_Item.each( function( _sektion ){
                      _sektion.czr_ItemState.set( 'expanded' != _sektion.czr_ItemState() ? 'expanded_noscroll' : 'expanded' );
                      //_sektion.container.toggleClass('czr-show-fake-container', 'closed' == _sektion.czr_ItemState() );
                });
        }).on('dragend', function( el, source ){
                // module.czr_Item.each( function( _sektion ){
                //       _sektion.container.removeClass('czr-show-fake-container');
                // });
        }).on('drop', function(el, target, source, sibling ) {
              var _dropped_module_id = $(el).attr('data-module-id'),
                  _target_col = $(target).closest('.czr-column').attr('data-id'),
                  _source_col = $(source).closest('.czr-column').attr('data-id'),
                  is_reorder = _target_col == _source_col;

              if ( is_reorder ) {
                  module.reorderModulesInColumn( _target_col );
              } else {
                  module.control.getSyncCollectionControl().czr_Module( _dropped_module_id ).modColumn.set( _target_col );
              }
        });

        //expand a closed sektion on over
        // module.modsDragInstance.on('over', function( el, container, source ) {
        //   console.log('OVERING', container );
        //       if ( $(container).hasClass('czr-dragula-fake-container') ) {
        //           //get the sekItem id
        //           _target_sekId = $(container).closest('[data-id]').attr('data-id');
        //           module.czr_Item(_target_sekId).czr_ItemState.set('expanded_noscroll');
        //       }
        // });

        //make sure the scroll down is working
        var scroll = autoScroller([
                     module.control.container.closest('.accordion-section-content')[0]
                  ],
                  {
                    direction: "vertical",
                    margin: 20,
                    pixels: 100,
                    scrollWhenOutside: true,
                    autoScroll: function(){
                        //Only scroll when the pointer is down, and there is a child being dragged.
                        return module.modsDragInstance.dragging;
                    }
                  }
        );
  },

  reorderModulesInColumn : function( col_id ) {
        var module = this,
        //get the updated collection from the DOM and update the column module collection
            _new_dom_module_collection = module.czr_Column( col_id  ).getColumnModuleCollectionFromDom( col_id  );

        module.czr_Column( col_id ).updateColumnModuleCollection( { collection : _new_dom_module_collection } );
  },

  //@param module obj
  //@param source col string
  //@param target column string
  moveModuleFromTo : function( moved_module, source_column, target_column ) {
        var module = this,
            _new_dom_module_collection = module.czr_Column( target_column ).getColumnModuleCollectionFromDom( source_column );
        //update the target column collection with the new collection read from the DOM
        module.czr_Column( target_column ).updateColumnModuleCollection( { collection : _new_dom_module_collection } );
        //remove module from old column module collection
        module.czr_Column( source_column ).removeModuleFromColumnCollection( moved_module );
  }
});