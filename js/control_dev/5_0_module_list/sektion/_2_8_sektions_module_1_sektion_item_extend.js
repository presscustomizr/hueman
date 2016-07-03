//extends api.CZRDynModule
//This module populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of modules ( => content module on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {
  //extends api.CZRItem
  CZRSektionItem : {
          initialize: function(id, options ) {
                var sekItem = this;
                api.CZRItem.prototype.initialize.call( sekItem, null, options );

                //EXTEND THE USER EVENT MAP
                //=> adds the module list panel events
                sekItem.userEventMap.set( _.union(
                      sekItem.userEventMap(),
                      [
                        {
                          trigger   : 'click keydown',
                          selector  : [ '.' + sekItem.module.control.css_attr.edit_view_btn, '.' + sekItem.module.control.css_attr.display_alert_btn,'.' + sekItem.module.control.css_attr.item_title ].join(','),
                          name      : 'close_module_panel',
                          actions   : function() {
                              api.czrModulePanelState.set(false);
                          },
                        },
                        {
                          trigger   : 'mouseenter',
                          selector  : '.czr-item-header',
                          name      : 'hovering_sek',
                          actions   : function( obj ) {
                              sekItem.module.control.previewer.send( 'start_hovering_sek', {
                                    id : sekItem.id
                              });
                          }
                        },
                        {
                          trigger   : 'mouseleave',
                          selector  : '.czr-item-header',
                          name      : 'hovering_sek',
                          actions   : function( obj ) {
                              sekItem.module.control.previewer.send( 'stop_hovering_sek', {
                                    id : sekItem.id
                              });
                          }
                        },
                        {
                          trigger   : 'click keydown',
                          selector  : [ '.' + sekItem.module.control.css_attr.edit_view_btn, '.' + sekItem.module.control.css_attr.item_title ].join(','),
                          name      : 'send_edit_view',
                          actions   : function( obj ) {
                              sekItem.module.control.previewer.send( 'edit_sek', {
                                    id : sekItem.id
                              });
                          },
                        }
                      ]
                ));

                var _sektion_model = sekItem.get(),
                    module = options.module;

                if ( ! _.has(_sektion_model, 'sektion-layout') ) {
                    throw new Error('In Sektion Item initialize, no layout provided for ' + sekItem.id + '.');
                }

                sekItem.isReady.done( function() {

                      //When fetched from DB, the column model looks like :
                      //{
                      //  id : '',//string
                      //  sektion_id : '',//string
                      //  modules : [],//collection of module id strings
                      //}
                      //=> we need to extend it with the sektion instance
                      //=> make sure the columns are instantiated as well
                      if ( ! _.isEmpty( sekItem.get().columns ) ) {
                            _.each( sekItem.get().columns , function( _column ) {
                                  //instantiate the column and push it to the global column collection
                                  var column_candidate = $.extend( true, {}, _column );//create a deep clone
                                  module.instantiateColumn( $.extend( column_candidate, { sektion : sekItem } ) );
                            });
                      } else {
                            //the sektion has no columns yet. This is the case typically when a sektion has just been created
                            // => instantiate new columns based on the sektion layout property.
                            var _col_nb = parseInt( _sektion_model['sektion-layout'] || 1, 10 );
                            for( i = 1; i < _col_nb + 1 ; i++ ) {
                                  var _default_column = $.extend( true, {}, module.defaultDBColumnModel ),
                                      column_candidate = {
                                            id : '',//a unique id will be generated when preparing the column for API.
                                            sektion_id : sekItem.id
                                      };
                                      column_candidate = $.extend( _default_column, column_candidate );

                                  module.instantiateColumn( $.extend( column_candidate, { sektion : sekItem } ) );
                            }//for
                      }
                });//sekItem.isReady


                //instantiate the columns when the sektion item is embedded
                // sekItem.embedded.done(function() {
                //       //dragulize sektion when embedded
                //       sekItem.dragulizeSektion();
                // });


                //defer actions when the sek content is rendered :
                //collection listener
                //dragulization
                // sekItem.contentRendered.done(function() {
                //         //dragulize columns
                //         //sekItem.module.dragInstance.containers.push( $( '.czr-column-wrapper', sekItem.container )[0] );

                //         //each item view must clean the dragula class
                //         sekItem.czr_ItemState.callbacks.add( function(to) {
                //               if ( 'closed' == to )
                //                 return;
                //               sekItem.container.removeClass('czr-show-fake-container');
                //         });
                // });//embedded.done

          },


          //OVERRIDES PARENT MODULE METHOD
          //React to a single item change
          //cb of module.czr_Item(item.id).callbacks
          // itemInternalReact : function( to, from ) {
          //   console.log('in item internal React overriden', to, from );
          //       var sekItem = this,
          //           sektion_candidate = $.extend(true, {}, to);
          //       //we want to make sure that the item model is compliant with default model
          //       sektion_candidate = sekItem.prepareSekItemForDB( sektion_candidate );
          //       //Call the parent method => updates the collection
          //       api.CZRItem.prototype.itemInternalReact.call( sekItem, sektion_candidate, from );
          // },

          //OVERRIDES PARENT MODULE METHOD
          //React to a single item change
          //cb of module.czr_Item(item.id).callbacks
          itemReact : function( to, from ) {
                var sekItem = this,
                    sektion_candidate = $.extend(true, {}, to);
                //we want to make sure that the item model is compliant with default model
                sektion_candidate = sekItem.prepareSekItemForDB( sektion_candidate );
                //Call the parent method => updates the collection
                api.CZRItem.prototype.itemReact.call( sekItem, sektion_candidate );
          },


          //the sektion item model must have only the property set in
          //module.defaultItemModel = {
          //       id : '',
          //       'sektion-layout' : 1,
          //       columns : []
          // };
          prepareSekItemForDB : function( sektion_candidate ) {
                var sekItem = this,
                    db_ready_sektItem = {};

                _.each( sekItem.module.defaultItemModel, function( _value, _key ) {
                    var _candidate_val = sektion_candidate[_key];
                    switch( _key ) {
                          case 'id' :
                              if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                  throw new Error('The sekItem id property must be a not empty string');
                              }
                              db_ready_sektItem[_key] = _candidate_val;
                          break;
                          case 'sektion-layout' :
                              if ( ! _.isNumber( parseInt( _candidate_val, 10 ) ) || ( parseInt( _candidate_val, 10 ) < 1 ) ) {
                                  throw new Error('The sekItem layout property must be an int number > 0');
                              }
                              db_ready_sektItem[_key] = _candidate_val;
                          break;
                          case 'columns' :
                              if ( ! _.isArray( _candidate_val ) ) {
                                  throw new Error('The sekItem columns property must be an array');
                              }
                              var _db_ready_columns = [];
                              _.each( _candidate_val, function( _col ) {
                                    var _db_ready_col = sekItem.module.prepareColumnForDB(_col);
                                    _db_ready_columns.push( _db_ready_col );
                              });

                              db_ready_sektItem[_key] = _db_ready_columns;
                          break;
                    }
                });//each

                return db_ready_sektItem;
          }



          // dragulizeSektion : function() {
          //       var sekItem = this,
          //           module = this.module;
          //           _drag_container = $( '.czr-dragula-fake-container', sekItem.container )[0];

          //        module.modsDragInstance.containers.push( _drag_container );
          // }
  }//Sektion

});