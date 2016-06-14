//extends api.CZRDynModule
//This module populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of modules ( => content module on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRDynModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                viewPreAddEl : 'czr-module-sektion-pre-add-view-content',
                viewTemplateEl : 'czr-module-sektion-item-view',
                viewContentTemplateEl : 'czr-module-sektion-view-content',
          } );

          //declares a default model (overrides)
          module.defaultItemModel = {
              id : '',
              'sektion-layout' : 1,
              columns : []
          };

          module.defaultColumnModel = {
            id : '',
            sektion : '',
            modules : [],
          };

          console.log('SEKTION MODULE ID', id );
          console.log('SAVED SEKTION ITEMS', module.savedItems );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          module.itemConstructor = api.CZRItem.extend( module.CZRSektionItem || {} );

          api.section( module.control.section() ).expanded.bind(function(to) {
                if ( ! to || ! _.isEmpty( module.get() ) )
                  return;
                module.ready();
          });

          if ( ! _.has( module ,'dragInstance' ) )
            module.initDragula();

  },//initialize



  //overrides the parent to generate the column collection that is used in the sektion item instanciation params
  getInitialItemModel : function( _sek ) {
          var module = this,
              _new_sektions = _.clone( module.savedItems ),
              _default_sektion = _.clone( module.defaultItemModel ),
              _def = _.clone( _default_sektion ),
              _new_sek = $.extend( _def, _sek ),
              _columns = [];

              if( _.isEmpty( _new_sek.columns ) ) {
                      console.log('IS EMPTY COLUMNS');
                      var _col_nb = parseInt(_new_sek['sektion-layout'] || 1, 10 );
                      for( i = 1; i < _col_nb + 1 ; i++ ) {
                            var _default_column = _.clone( module.defaultColumnModel ),
                                _new_col_model = {
                                      id : module.generateColId( _new_sek.id, i ),
                                      sektion : _new_sek.id
                                };
                                _col_model = $.extend( _default_column, _new_col_model );

                            _columns.push( _col_model);
                      }//for

                      _new_sek.columns = _columns;
              }//if

              return _new_sek;

  },


  //React to a single item change
  //cb of module.czr_Item(item.id).callbacks
  itemReact : function( to, from ) {
        console.log('in sektion react', to, from );
        var module = this;
        //update the collection
        module.updateItemsCollection( {item : to });
  },


  generateColId : function( sekId, index ) {
          return 'col_' + index + '_' + sekId;
  },


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
  },//initDragula

});