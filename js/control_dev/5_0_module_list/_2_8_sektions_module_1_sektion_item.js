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

                  //the column values
                  sekItem.czr_Column = new api.Values();

                  var _sektion_model = sekItem.get();

                  //stores the column collection
                  //set the initial value
                  sekItem.czr_columnCollection = new api.Value();
                  sekItem.czr_columnCollection.set([]);
                  //sekItem.updateColumnCollection( {collection : options.columns } );

                  if ( ! _.has(_sektion_model, 'sektion-layout') ) {
                    throw new Error('In Sektion Item initialize, no layout provided for ' + sekItem.id + '. Aborting');
                  }

                  console.log('in sektion initial', options );

                  //instantiate the columns when the sektion item is embedded
                  sekItem.embedded.done(function() {
                        console.log('sektion is embedded');
                        //react to column collection changes
                        sekItem.czr_columnCollection.callbacks.add( function() { return sekItem.collectionReact.apply(sekItem, arguments ); } );

                        _.each( options.initial_item_model.columns , function( _column ) {
                              sekItem.instanciateColumn( _column );
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
          },


          instanciateColumn : function( column, is_added_by_user  ) {
                  var sekItem = this,
                      column_model = _.clone( column );
                  //does this column have modules ?
                  // var _all_modules = api.control( api.CZR_Helpers.build_setId( 'module-collection') ).czr_moduleCollection.get(),
                  //     _column_modules = _.findWhere( _all_modules, { column_id : column.id });

                  // if ( ! _.isEmpty( _column_modules) ) {
                  //   console.log('HAS COLUMN MODULES?', column.id, _column_modules );
                  //   console.log('column_model', column_model );
                  //   //column_model.modules.push( )
                  // }


                  //instanciate the column with the default constructor
                  sekItem.czr_Column.add( column.id , new api.CZRColumn( column.id, {
                        id : column.id,
                        initial_column_model : column_model,
                        sektion : sekItem,
                        module : sekItem.item_module.id,
                        control : sekItem.item_module.control.id,
                        is_added_by_user : is_added_by_user || false
                  } ) );

                  //push it to the collection
                  //won't be listened to on
                  sekItem.updateColumnCollection( {column : column_model });
          },


          //@param obj can be { collection : []}, or { module : {} }
          updateColumnCollection : function( obj ) {
                  var sekItem = this,
                      _current_collection = sekItem.czr_columnCollection.get();
                      _new_collection = _.clone(_current_collection);

                  //if a collection is provided in the passed obj then simply refresh the collection
                  //=> typically used when reordering the collection module with sortable or when a column is removed
                  if ( _.has( obj, 'collection' ) ) {
                        //reset the collection
                        sekItem.czr_columnCollection.set(obj.collection);
                        return;
                  }

                  if ( ! _.has(obj, 'column') ) {
                    throw new Error('updateColumnCollection, no column provided in sektion ' + sekItem.id + '. Aborting');
                  }
                  var column = _.clone(obj.column);

                  if ( ! _.has(column, 'id') ) {
                    throw new Error('updateColumnCollection, no id provided for a column in sektion' + sekItem.id + '. Aborting');
                  }
                  //the module already exist in the collection
                  if ( _.findWhere( _new_collection, { id : column.id } ) ) {
                        _.each( _current_collection , function( _elt, _ind ) {
                              if ( _elt.id != column.id )
                                return;

                              //set the new val to the changed property
                              _new_collection[_ind] = column;
                        });
                  }
                  //the module has to be added
                  else {
                        _new_collection.push(column);
                  }
                  //Inform the sekItem
                  sekItem.czr_columnCollection.set(_new_collection);
          },


          //cb of control.czr_columnCollection.callbacks
          collectionReact : function( to, from ) {
                console.log('in sektion collection react', to, from );
                var sekItem = this,
                    _to_render = ( _.size(from) < _.size(to) ) ? _.difference(to,from)[0] : {},
                    _to_remove = ( _.size(from) > _.size(to) ) ? _.difference(from, to)[0] : {},
                    _module_updated = ( ( _.size(from) == _.size(to) ) && !_.isEmpty( _.difference(from, to) ) ) ? _.difference(from, to)[0] : {},
                    is_module_update = _.isEmpty( _module_updated ),
                    is_collection_sorted = _.isEmpty(_to_render) && _.isEmpty(_to_remove)  && ! is_module_update;

                //say it to the sektion
                var _current_sek_model = sekItem.get(),
                    _new_sek_model = _.clone( _current_sek_model );

                _new_sek_model.columns = to;
                console.log('_new_sek_model', _new_sek_model );
                sekItem.set( _new_sek_model );

                //refreshes the preview frame  :
                //1) only needed if transport is postMessage, because is triggered by wp otherwise
                //2) only needed when : add, remove, sort item(s)
                //module update case
                // if ( 'postMessage' == api(control.id).transport && ! api.CZR_Helpers.has_part_refresh( control.id ) ) {
                //     if ( is_collection_sorted )
                //         control.previewer.refresh();
                // }
          },
  }//Sektion

});