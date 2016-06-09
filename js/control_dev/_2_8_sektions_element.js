//extends api.CZRDynElement
//This element populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of elements ( => content element on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  initialize: function( id, options ) {
          var element = this;
          //run the parent initialize
          api.CZRDynElement.prototype.initialize.call( element, id, options );

          //extend the element with new template Selectors
          $.extend( element, {
                viewPreAddEl : 'czr-element-sektion-pre-add-view-content',
                viewTemplateEl : 'czr-element-sektion-item-view',
                viewContentTemplateEl : 'czr-element-sektion-view-content',
          } );

          //declares a default model
          this.defaultItemModel = {
            id : '',
            'sektion-layout' : 1,
          };

          console.log(' sektion savedItems', element.savedItems );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          element.itemConstructor = api.CZRItem.extend( element.CZRSektionItem || {} );

          api.section( element.control.section() ).expanded.bind(function(to) {
                if ( ! to || ! _.isEmpty( element.get() ) )
                  return;
                element.ready();
          });

          if ( ! _.has( element ,'dragInstance' ) )
            element.initDragula();


  },//initialize


  initDragula : function() {
          var element = this;

          //instantiate dragula without container => they will be pushed on sektion items instantiation
          element.dragInstance = dragula({
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

                  // return true; // elements are always draggable by default
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
          element.dragInstance.on('over', function( el, container, source ) {
                console.log('el', el);
                console.log('is over', container);
                console.log('coming from ', source);
                if ( $(container).hasClass('czr-dragula-fake-container') ) {
                    //get the sekItem id
                    _target_sekId = $(container).closest('[data-id]').attr('data-id');
                    console.log( 'taget sek', _target_sekId );
                    element.czr_Item(_target_sekId).czr_View.set('expanded');
                }
          });


          //react to drag start
          element.dragInstance.on('drag', function( el, source ){
                //display the fake container to all closed sek items
                element.czr_Item.each( function( _sektion ){
                    _sektion.container.toggleClass('czr-show-fake-container', 'closed' == _sektion.czr_View.get() );
                });
          }).on('dragend', function( el, source ){
                //display the fake container to all closed sek items
                element.czr_Item.each( function( _sektion ){
                    _sektion.container.removeClass('czr-show-fake-container');
                });
          });
  },





















  CZRSektionItem : {
          initialize: function(id, options ) {
                  var sekItem = this;

                  api.CZRItem.prototype.initialize.call( sekItem, null, options );

                  sekItem.czr_Columns = new api.Values();
                  var _sektion_model = sekItem.get();

                  console.log("in sektion item initialize", id, options, sekItem.get() );

                  if ( ! _.has(_sektion_model, 'sektion-layout') ) {
                    throw new Error('In Sektion Item initialize, no layout provided for ' + id + '. Aborting');
                  }

                  sekItem.dragulizeSektion();

                  //defer the column instantiation when the sek content is rendered
                  sekItem.bind('item_content_rendered', function() {
                        //instantiate the columns based on the layout on init
                        var columns = parseInt( _sektion_model['sektion-layout'] || 1, 10 );
                        for( var i = 1; i < columns + 1 ; i++ ) {
                            sekItem.instanciateColumn( i );
                        }
                        //dragulize columns
                        sekItem.item_element.dragInstance.containers.push( $( '.czr-column-wrapper', sekItem.container )[0] );

                        //each item view must clean the dragula class
                        sekItem.czr_View.callbacks.add( function(to) {
                              console.log('in view cb');
                              if ( 'closed' == to )
                                return;
                              sekItem.container.removeClass('czr-show-fake-container');
                        });

                  });//'item_content_rendered'

          },

          dragulizeSektion : function() {
                  var sekItem = this,
                      element = this.item_element;
                      _drag_container = $( '.czr-dragula-fake-container', sekItem.container )[0];

                   element.dragInstance.containers.push( _drag_container );
          },


          instanciateColumn : function( index ) {
                  console.log('in instantiate column', index );
                  var sekItem = this,
                      col_id = 'col_' + index;
                  //instanciate the column with the default constructor
                  sekItem.czr_Columns.add( col_id, new api.CZRColumn( col_id, {
                        id : col_id,
                        sektion : sekItem
                  } ) );
          },

          dragulizeColumns : function() {
                  var sekItem = this;
                  //DRAGULA
                  //Declare a dragInstance object to the control if not set yet. It will store the dragula containers

          }
  }//Sektion

});