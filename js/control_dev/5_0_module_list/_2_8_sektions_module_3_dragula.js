//extends api.CZRDynModule
//This module populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of modules ( => content module on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  /////////////////////////////////////////////////////////////////////////
  /// DRAGULA
  ////////////////////////////////////////////////////////////////////////
  initDragula : function() {
          var module = this;

          //instantiate dragula without container => they will be pushed on sektion items instantiation
          module.dragInstance = dragula({
              moves: function (el, source, handle, sibling) {
                  console.log("handle.className === 'czr-column'", handle.className === 'czr-column');
                   console.log('in moves cb', el, source, handle, sibling );
                  return handle.className === 'czr-column';
                  //return handle.className === 'czr-column';
                  // var is_column = $(handle).parents('.czr-column').length > 0 || $(handle).hasClass('czr-column') || $(handle).hasClass('czr-column-wrapper');
                  // console.log(is_column, $(handle).parents('.czr-column').length );
                  // if (  ! is_column ) {
                  //   console.log('NOT DRAGGABLE');
                  //   return;
                  // }

                  // return true; // modules are always draggable by default
              },
              // invalidTarget : function(el, handle) {
              //     console.log('invalidTarget', el, handle );
              //     return false;
              // },
              isContainer : function( el ) {
                //console.log('isContainer?', el);
                return false;
              }
            }
          );

          //expand a closed sektion on over
          module.dragInstance.on('over', function( el, container, source ) {
                if ( $(container).hasClass('czr-dragula-fake-container') ) {
                    //get the sekItem id
                    _target_sekId = $(container).closest('[data-id]').attr('data-id');
                    console.log( 'taget sek', _target_sekId );
                    module.czr_Item(_target_sekId).czr_View.set('expanded');
                }
          });


          //react to drag start
          module.dragInstance.on('drag', function( el, source ){
                //display the fake container to all closed sek items
                module.czr_Item.each( function( _sektion ){
                    _sektion.container.toggleClass('czr-show-fake-container', 'closed' == _sektion.czr_View.get() );
                });
          }).on('dragend', function( el, source ){
                //display the fake container to all closed sek items
                module.czr_Item.each( function( _sektion ){
                    _sektion.container.removeClass('czr-show-fake-container');
                });
          }).on('drop', function(el, target, source, sibling ) {
                console.log('element ' + el + ' has been droped in :', target );
          });

          var scroll = autoScroller([
                     module.control.container.closest('.accordion-section-content')[0]
                  ],
                  {
                    direction: "vertical",
                    margin: 20,
                    pixels: 10,
                    scrollWhenOutside: true,
                    autoScroll: function(){
                        //Only scroll when the pointer is down, and there is a child being dragged.
                        return this.down && module.dragInstance.dragging;
                    }
                  }
        );
  }//initDragula

});