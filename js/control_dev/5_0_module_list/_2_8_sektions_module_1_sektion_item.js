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
                      module = options.item_module;

                  console.log( _sektion_model );

                  if ( ! _.has(_sektion_model, 'sektion-layout') ) {
                    throw new Error('In Sektion Item initialize, no layout provided for ' + sekItem.id + '. Aborting');
                  }

                  console.log('in sektion initial', options );

                  //instantiate the columns when the sektion item is embedded
                  sekItem.embedded.done(function() {
                        console.log('sektion is embedded');

                        _.each( options.initial_item_model.columns , function( _column ) {
                              //When fetched from DB, the column model looks like :
                              //{
                              //  id : '',//string
                              //  sektion_id : '',//string
                              //  modules : [],//collection of module id strings
                              //}
                              //=> we need to extend it with sektion instance
                              module.instanciateColumn( $.extend( _column, { sektion : sekItem } ) );
                        });

                        //dragulize when embedded
                        sekItem.dragulizeSektion();
                  });


                  //defer actions when the sek content is rendered :
                  //collection listener
                  //dragulization
                  sekItem.contentRendered.done(function() {
                          console.log('sektion content is rendered');
                          //dragulize columns
                          sekItem.item_module.dragInstance.containers.push( $( '.czr-column-wrapper', sekItem.container )[0] );

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
                      module = this.item_module;
                      _drag_container = $( '.czr-dragula-fake-container', sekItem.container )[0];

                   module.dragInstance.containers.push( _drag_container );
          }
  }//Sektion

});