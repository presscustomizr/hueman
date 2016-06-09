//extends api.CZRDynModule
//This module populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of modules ( => content module on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {

  CZRSektionItem : {
          initialize: function(id, options ) {
                  var sekItem = this;

                  api.CZRItem.prototype.initialize.call( sekItem, null, options );

                  //the column values
                  sekItem.czr_Columns = new api.Values();

                  var _sektion_model = sekItem.get();

                  //stores the column collection
                  //set the initial value
                  sekItem.czr_columnCollection = new api.Value();
                  sekItem.czr_columnCollection.set([]);
                  //sekItem.updateColumnCollection( {collection : options.columns } );

                  //react to column collection changes
                  //sekItem.czr_columnCollection.callbacks.add( function() { return sekItem.collectionReact.apply(sekItem, arguments ); } );

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
                          sekItem.item_module.dragInstance.containers.push( $( '.czr-column-wrapper', sekItem.container )[0] );

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
                      module = this.item_module;
                      _drag_container = $( '.czr-dragula-fake-container', sekItem.container )[0];

                   module.dragInstance.containers.push( _drag_container );
          },


          instanciateColumn : function( index ) {
                  console.log('in instantiate column', index );
                  var sekItem = this,
                      col_id = 'col_' + index,
                      column_model = {
                        id : col_id,
                        sektion : sekItem
                      };
                  //instanciate the column with the default constructor
                  sekItem.czr_Columns.add( col_id, new api.CZRColumn( col_id, column_model ) );

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
                    throw new Error('updateColumnCollection, no column provided ' + sekItem.id + '. Aborting');
                  }
                  var column = _.clone(obj.column);

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