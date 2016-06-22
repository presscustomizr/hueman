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
                  sekItem.embedded.done(function() {
                        //dragulize sektion when embedded
                        sekItem.dragulizeSektion();
                  });


                  //defer actions when the sek content is rendered :
                  //collection listener
                  //dragulization
                  sekItem.contentRendered.done(function() {
                          //dragulize columns
                          sekItem.module.dragInstance.containers.push( $( '.czr-column-wrapper', sekItem.container )[0] );

                          //each item view must clean the dragula class
                          sekItem.czr_View.callbacks.add( function(to) {
                                if ( 'closed' == to )
                                  return;
                                sekItem.container.removeClass('czr-show-fake-container');
                          });
                  });//embedded.done

          },


          dragulizeSektion : function() {
                  var sekItem = this,
                      module = this.module;
                      _drag_container = $( '.czr-dragula-fake-container', sekItem.container )[0];

                   module.dragInstance.containers.push( _drag_container );
          }
  }//Sektion

});