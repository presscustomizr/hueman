
//extends api.Value
var CZRColumnMths = CZRColumnMths || {};

//extends api.Value
//a column is instanciated with the typical set of options :
// id : '',
// modules : [],
// sektion : {},//sektion instance
// module_id : '',
// control_id : '',
// is_added_by_user : false
$.extend( CZRColumnMths , {
    updateColumnModuleCollection : function( obj ) {
            var column = this,
                _current_collection = column.czr_columnModuleCollection();
                _new_collection = $.extend( true, [], _current_collection );

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

            //1) The module id must be a not empty string
            //2) The module shall not exist in another column
            var module_ready_for_column_api = column.prepareModuleForColumnAPI( _.clone(obj.module) );


            //the module already exist in the collection
            if ( _.findWhere( _new_collection, { id : module_ready_for_column_api.id } ) ) {
                  _.each( _current_collection , function( _elt, _ind ) {
                          if ( _elt.id != module_ready_for_column_api.id )
                            return;

                          //set the new val to the changed property
                          _new_collection[_ind] = module_ready_for_column_api;
                  });
            }
            //otherwise,the module has to be added
            else {
                  _new_collection.push(module_ready_for_column_api);
            }

            //set the collection
            column.czr_columnModuleCollection.set( _new_collection );
    },


    //cb of : column.czr_columnModuleCollection.callbacks.add()
    //the job of this method is to update the column instance value with a new collection of modules
    columnModuleCollectionReact : function( to, from ) {
            var column = this,
                _current_column_model = column.get(),
                _new_column_model = _.clone( _current_column_model ),
                _new_module_collection = [];

            _.each( to , function( _mod, _key ) {
                _new_module_collection[_key] = { id : _mod.id };
            });

            //say it to the column instance
            _new_column_model.modules = _new_module_collection;
            column.set( _new_column_model );
    },

    //remove a module base on the id
    //Note that the module param can include various properties (depending on where this method is called from) that won't be used in this function
    removeModuleFromColumnCollection : function( module ) {
            var column = this,
                _current_collection = column.czr_columnModuleCollection();
                _new_collection = $.extend( true, [], _current_collection );

            _new_collection = _.filter( _new_collection, function( _mod ){
                return _mod.id != module.id;
            } );
            //set the collection
            column.czr_columnModuleCollection.set( _new_collection );
    },


    //column.defautModuleModelInColumn = { id : '' };
    prepareModuleForColumnAPI : function( module_candidate ) {
            if ( ! _.isObject( module_candidate ) ) {
                throw new Error('prepareModuleForColumnAPI : a module must be an object.');
            }
            var column = this,
                api_ready_module = {};

            _.each( column.defautModuleModelInColumn, function( _value, _key ) {
                    var _candidate_val = module_candidate[ _key ];
                    switch( _key ) {
                          case 'id' :
                            if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                                throw new Error('prepareModuleForColumnAPI : a module id must a string not empty');
                            }
                            if ( ! column.sektion.module.moduleExistsInOneColumnMax( module_candidate.id ) ) {
                                throw new Error('A module can not be embedded in more than one column at a time. Module ' + module_candidate.id + ' exists in several columns : ' +  column.sektion.module.getModuleColumn( module_candidate.id ).join(',') );
                            }
                            api_ready_module[ _key ] = _candidate_val;
                          break;
                    }//switch
            });//each
            return api_ready_module;
    },


    //@param old_col_id is the column in which the module was embedded before being move to the current one
    getColumnModuleCollectionFromDom : function( old_col_id ) {
            var column = this,
                $_moduleWrapper = $('.czr-module-collection-wrapper', column.container ),
                _previous_column_collection = column.sektion.module.czr_Column( old_col_id ).czr_columnModuleCollection(),
                _new_collection = [];

            $('.czr-single-module', $_moduleWrapper).each( function( _index ) {
                  //If the current module el was already there
                  //=> push it in the new collection and loop next
                  if ( ! _.isUndefined( _.findWhere( column.czr_columnModuleCollection(), { id: $(this).attr('data-module-id') } ) ) ) {
                        _new_collection[_index] = _.findWhere( column.czr_columnModuleCollection(), { id: $(this).attr('data-module-id') } );
                        return;
                  }

                  var _module_obj = _.findWhere( _previous_column_collection, { id: $(this).attr('data-module-id') } );

                  //do we have a match in the existing collection ?
                  if ( ! _module_obj ) {
                      throw new Error('The module  : ' + $(this).attr('data-module-id') + ' was not found in the collection of its previous column ' + old_col_id );
                  }
                  _new_collection[_index] = column.prepareModuleForColumnAPI( _module_obj );
            });

            if ( _.isEmpty( _new_collection ) ) {
                throw new Error('There was a problem when re-building the column module collection from the DOM in column : ' + column.id );
            }
            return _new_collection;
    }
});//$.extend