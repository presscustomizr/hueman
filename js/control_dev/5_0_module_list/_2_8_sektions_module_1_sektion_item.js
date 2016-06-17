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

                  //
                  sekItem.isReady.done( function() {
                        //To set the sekItem value now won't be listened too
                        //=> the item callback is declared on 'input_collection_populated'
                        _sektion_model = sekItem.maybeSetColumnsOnInit( _sektion_model );
                        sekItem.set( _sektion_model );

                        if ( _.isEmpty( sekItem.get().columns ) ) {
                            throw new Error('In Sektion Item, the sektion ' + sekItem.id + ' has no column(s) set (and should have sat least one at this stage ! ).');
                        }

                        _.each( sekItem.get().columns , function( _column ) {
                              //When fetched from DB, the column model looks like :
                              //{
                              //  id : '',//string
                              //  sektion_id : '',//string
                              //  modules : [],//collection of module id strings
                              //}
                              //=> we need to extend it with sektion instance
                              //instantiate the column and push it to the global column collection
                              var column_candidate = _.clone( _column );
                              module.instantiateColumn( $.extend( column_candidate, { sektion : sekItem } ) );
                        });


                  });


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


          //overrides the parent
          //=> to generate the column collection that is used in the sektion item instanciation params
          //If a new sektion is added by a user, the columns must be generated baseed on the choosen layout
          //When a sektion item is fetched from the DB, the column should already by there.
          maybeSetColumnsOnInit : function( _sektion_model ) {
                  var sekItem = this,
                      module = sekItem.module,
                      _def = _.clone( sekItem.defaultItemModel ),
                      _new_sek = $.extend( _def, _sektion_model ),
                      _new_columns = [];

                      //is this sektionItem already existing in the setting value ?
                      //=> if so, it should have columns.
                      // if ( ! _.isUndefined( _.findWhere( api(module.control.id).get() , { id : _new_sek.id } ) ) ) {
                      //       throw new Error( 'Sektion ' + _new_sek.id + ' already exists in the setting item collection and should have columns' );
                      // }
                      //if the sektion has no column yet, let's add them, based on the current layout
                      if ( _.isEmpty( _new_sek.columns ) ) {
                              var _col_nb = parseInt(_new_sek['sektion-layout'] || 1, 10 ),
                                  column_initial_key = module.czr_columnCollection.get().length + 1;
                              for( i = 1; i < _col_nb + 1 ; i++ ) {
                                    var _default_column = _.clone( module.defaultDBColumnModel ),
                                        _new_col_model = {
                                              id : module.generateColId( column_initial_key ),
                                              sektion_id : _new_sek.id
                                        };
                                        _col_model = $.extend( _default_column, _new_col_model );

                                    _new_columns.push( _default_column );
                                    column_initial_key++;
                              }//for

                              _new_sek.columns = _new_columns;
                      }//if

                      return _new_sek;

          },


          //update the sektion columns model property if
          updateSektionColumnCollection : function( obj ) {
                console.log('IN UPDATE SEKTION ' + this.id + ' COLUMN COLLECTION', obj );
                var sekItem = this,
                    _current_sektion_model = sekItem.get(),
                    _new_sektion_model = _.clone(_current_sektion_model);

                console.log('_current_sektion_model', _current_sektion_model );
                //if a collection is provided in the passed obj then simply refresh the collection
                //=> typically used when reordering the collection module with sortable or when a column is removed
                if ( _.has( obj, 'collection' ) ) {
                      //reset the collection
                      _new_sektion_model.columns = obj.collection;
                      return;
                }

                if ( ! _.has(obj, 'column') ) {
                  throw new Error('updateSektionColumnCollection, no column provided in sekItem ' + sekItem.id + '.');
                }
                var column = _.clone(obj.column);

                if ( ! _.has(column, 'id') ) {
                  throw new Error('updateSektionColumnCollection, no id provided for a column in sekItem ' + sekItem.id + '.');
                }

                //the column already exist in the sektion
                if ( _.findWhere( _new_sektion_model.columns, { id : column.id } ) ) {
                    console.log('COLUMN EXISTS? ' , _new_sektion_model.columns );
                      _.each( _new_sektion_model.columns , function( _col, _ind ) {
                            if ( _col.id != column.id )
                              return;

                            //set the new col
                            _new_sektion_model.columns[_ind] = column;
                      });
                }
                //the module has to be added
                else {
                      console.log('COLUMN TO ADD ');
                      _new_sektion_model.columns.push(column);
                }
                console.log('NEW SEKTION MODEL', _new_sektion_model, _.isEqual(_current_sektion_model, _new_sektion_model)  );
                console.log('sekItem.isReady.state()', sekItem.isReady.state() );
                //sekItem.set({ id});
                //update the item
                //sekItem.set( _new_sektion_model );
                sekItem.module.itemReact( _new_sektion_model );
          },



          dragulizeSektion : function() {
                  var sekItem = this,
                      module = this.module;
                      _drag_container = $( '.czr-dragula-fake-container', sekItem.container )[0];

                   module.dragInstance.containers.push( _drag_container );
          }
  }//Sektion

});