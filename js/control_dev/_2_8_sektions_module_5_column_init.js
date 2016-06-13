
//extends api.Value
var CZRColumnMths = CZRColumnMths || {};

//extends api.Value
//a column is instanciated with the typical set of options :
// id : column.id,
// initial_column_model : column_model,
// sektion : sekItem,
// module : sekItem.item_module.id,
// control : sekItem.item_module.control.id,
// is_added_by_user : is_added_by_user || false
$.extend( CZRColumnMths , {
    initialize: function( name, options ) {
          var column = this;
          api.Value.prototype.initialize.call( column, null, options );

          //write the options as properties, name is included
          $.extend( column, options || {} );

          column.embedded = $.Deferred();

           //stores the column collection
          //set the initial value
          column.czr_columnModuleCollection = new api.Value();
          column.czr_columnModuleCollection.set([]);

          //set the instance value
          column.set( column.initial_column_model );

          console.log( 'column.initial_column_model', column.initial_column_model);
          console.log( 'column options', options );

          //defer the column rendering when the parent sektion content is rendered
          column.sektion.contentRendered.done(function() {
                //render the column
                column.container = column.render();
                //say it
                column.embedded.resolve();

          });

          ////////////////////////////////////////////////////
          /// COLUM DOM EVENT MAP
          ////////////////////////////////////////////////////
          column.column_event_map = [
                //add new element : open the dialog box
                {
                  trigger   : 'click keydown',
                  selector  : '.add-new-module',
                  name      : 'add_new_module',
                  actions   : ['userAddedModule'],
                },
          ];//module.module_event_map

          //when column is embedded :
          //1) populate the column module collection
          //2) setup the DOM event handler
          column.embedded.done(function() {
                console.log('in column embedded', column.get() );
                _.each( column.get().modules, function( _mod ) {
                          api.control( api.CZR_Helpers.build_setId( 'module-collection') ).trigger(
                                  'db-module-candidate',
                                  {
                                      id : _mod.id,
                                      sektion : column.sektion
                                  }
                          );
                } );
                //react to column collection changes
                column.callbacks.add( function() { return column.columnReact.apply(column, arguments ); } );
                //react to the column module collection changes
                column.czr_columnModuleCollection.callbacks.add( function() { return column.columnModuleCollectionReact.apply(column, arguments ); } );

                //Setup the column event listeners
                api.CZR_Helpers.setupDOMListeners(
                    column.column_event_map,//actions to execute
                    { dom_el : column.container },//dom scope
                    column//instance where to look for the cb methods
                );
          });
    },

    populatesModulesCollection : function() {

    },


    //fired on parent section contentRendered.done()
    render : function() {
          var column   = this;
          $view     = $( wp.template('czr-sektion-column')( {id: column.id}) );
          $view.appendTo( $('.czr-column-wrapper', column.sektion.container ) );
          return $view;
    },

    //cb of column.callbacks.add()
    //the job is this callback is to inform the parent sektion collection that something happened
    //typically, a module has been added
    columnReact : function( to ,from ) {
          this.sektion.updateColumnCollection( {column : to });
    },


    //fired on DOM user action
    //=> in the future, the module to instantiate will be stored in a pre module Value(), just like the pre Item idea
    //
    //Fired on column instanciation => to populate the saved module collection of this column
    userAddedModule : function( obj, module_id   ) {
          var column = this;
          api.control( api.CZR_Helpers.build_setId( 'module-collection') ).trigger(
              'user-module-candidate',
              {
                  id : '',//will be populated by the module collection class
                  module_type : 'czr_text_module',
                  column_id : column.id,
                  sektion : column.sektion,
                  items : [],
                  is_added_by_user : true
              }
          );

    },


    updateColumnModuleCollection : function( obj ) {
            var column = this,
                _current_collection = column.czr_columnModuleCollection.get();
                _new_collection = _.clone( _current_collection );

            //if a collection is provided in the passed obj then simply refresh the collection
            //=> typically used when reordering the collection module with sortable or when a column is removed
            if ( _.has( obj, 'collection' ) ) {
                  //reset the collection
                  column.czr_columnModuleCollection.set(obj.collection);
                  return;
            }

            if ( ! _.has(obj, 'module') ) {
              throw new Error('updateColumnModuleCollection, no module provided in column ' + column.id + '. Aborting');
            }

            var module = _.clone(obj.module);

            if ( ! _.has(column, 'id') ) {
              throw new Error('updateColumnModuleCollection, no id provided for a module in column' + column.id + '. Aborting');
            }
            //the module already exist in the collection
            if ( _.findWhere( _new_collection, { id : module.id } ) ) {
                  _.each( _current_collection , function( _elt, _ind ) {
                        if ( _elt.id != module.id )
                          return;

                        //set the new val to the changed property
                        _new_collection[_ind] = module;
                  });
            }
            //the module has to be added
            else {
                  _new_collection.push(module);
            }
            //Inform the column
            column.czr_columnModuleCollection.set(_new_collection);
    },

    columnModuleCollectionReact : function( to, from ) {
            var column = this,
                _current_column_model = column.get(),
                _new_column_model = _.clone( _current_column_model ),
                _new_module_collection = [];

            _.each( to , function( _mod, _key ) {
                _new_module_collection[_key] = { id : _mod.id };
            });

            //say it to the column
            _new_column_model.modules = _new_module_collection;
            column.set( _new_column_model );
    },


});//$.extend