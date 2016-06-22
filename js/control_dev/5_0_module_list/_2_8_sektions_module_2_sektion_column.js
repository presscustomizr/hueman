//extends api.CZRDynModule
//This module populates the sektions setting.
//The each sektion is composed of columns (=> columns on front end)
//Each columns of modules ( => content module on front end like slider, text block, etc)

var CZRSektionMths = CZRSektionMths || {};

$.extend( CZRSektionMths, {

  //Each column shall be described by an object like the following one :
  //module.defaultDBColumnModel = {
  //       id : '',
  //       sektion_id : '',
  //       modules : [],
  // };
  prepareColumnForDB : function( column_candidate ) {
        var module = this,
            _db_ready_col = {};

        _.each( module.defaultDBColumnModel, function( _value, _key ){
              var _candidate_val = column_candidate[_key];
              switch( _key ) {
                  case 'id' :
                      if ( ! _.isString( _candidate_val ) || _.isEmpty( _candidate_val ) ) {
                          throw new Error('The column id property must be a not empty string');
                      }
                      _db_ready_col[_key] = _candidate_val;
                  break;
                  case 'sektion_id' :
                      if ( _.isString( _candidate_val ) && ! _.isEmpty( _candidate_val ) ) {
                          _db_ready_col[_key] = _candidate_val;
                      } else if ( _.has(column_candidate, 'sektion') ) {
                          _db_ready_col[_key] = column_candidate.sektion.id;
                      } else {
                          throw new Error('The column sektion-id property must be a not empty string');
                      }
                  break;
                  case 'modules' :
                      if ( ! _.isArray( _candidate_val ) ) {
                          throw new Error('The column modules property must be an array');
                      }
                      _db_ready_col[_key] = _candidate_val;
                  break;
              }

        } );
        return _db_ready_col;
  },











  /////////////////////////////////////////////////////////////////////////
  /// COLUMN
  ////////////////////////////////////////////////////////////////////////
  //At this point, the column model has been fetched from DB, or manually added.
  //It must look like
  //{
  //  id : '',//string
  //  sektion : {},//sektion instance
  //  sektion_id : '',//string
  //  modules : [],//collection of module id strings
  //}
  instantiateColumn : function( _column, is_added_by_user  ) {
        var module = this,
            column_model = _.clone( _column );

        if ( ! _.isEmpty( column_model.id ) && module.czr_Column.has( column_model.id ) ) {
              throw new Error('The column id already exists in the collection in module : ' + module.id );
        }

        column_model = module.prepareColumnForAPI( column_model );

        //instanciate the column with the default constructor
        //=> makes sure that the column is ready for instanciation
        module.czr_Column.add( column_model.id , new api.CZRColumn( column_model.id, column_model ) );

        //the column is now ready and will listen to changes
        module.czr_Column(column_model.id).ready();
  },


  //Let's make sure the column holds all the necessary properties before API instanciation.
  // module.defaultAPIcolumnModel = {
  //       id : '',
  //       modules : [],
  //       sektion : {}, //sektion instance
  //       module_id : '',
  //       control_id : '',
  //       is_added_by_user : false
  // };
  prepareColumnForAPI : function( column_candidate ) {
      var module = this,
          api_ready_column = {};
          //normalize it now
          // _default_module_model = _.clone( control.defautAPIModuleModel ),
          // _module_model = $.extend( _default_module_model, _module_candidate_model );
      if ( ! _.isObject( column_candidate ) ) {
            throw new Error('Sektion Module::prepareColumnForAPI : a column must be an object to be instantiated.');
        }

      _.each( module.defaultAPIcolumnModel, function( _value, _key ) {
            var _candidate_val = column_candidate[_key];
            switch( _key ) {
                  case 'id' :
                      if ( _.isEmpty( _candidate_val ) ) {
                          api_ready_column[_key] = module.generateColId();
                      } else {
                          api_ready_column[_key] = _candidate_val;
                      }
                  break;
                  case 'modules' :
                      if ( ! _.isArray( _candidate_val )  ) {
                          throw new Error('Sektion Module::prepareColumnForAPI : a collection of modules must be an array. Error in column ' + column_candidate.id );
                      }
                      api_ready_column[_key] = _candidate_val;
                  break;
                  case  'sektion' :
                      if ( ! _.isObject( _candidate_val ) || _.isEmpty( _candidate_val )  ) {
                          throw new Error('Sektion Module::prepareColumnForAPI : a sektion instance is missing for column ' + column_candidate.id );
                      }
                      api_ready_column[_key] = _candidate_val;
                  break;
                  case  'module_id' :
                      api_ready_column[_key] = module.id;
                  break;
                  case  'control_id' :
                      api_ready_column[_key] = module.control.id;
                  break;
                  case 'is_added_by_user' :
                      api_ready_column[_key] =  _.isBoolean( _candidate_val ) ? _candidate_val : false;
                  break;
            }//switch
      });
      return api_ready_column;
  },




  //@param obj can be { collection : []}, or { module : {} }
  updateColumnCollection : function( obj ) {
        var module = this,
            _current_collection = module.czr_columnCollection.get();
            _new_collection = $.extend( true, [] , _current_collection );

        //if a collection is provided in the passed obj then simply refresh the collection
        //=> typically used when reordering the collection module with sortable or when a column is removed
        if ( _.has( obj, 'collection' ) ) {
              //reset the collection
              module.czr_columnCollection.set(obj.collection);
              return;
        }

        if ( ! _.has(obj, 'column') ) {
          throw new Error('updateColumnCollection, no column provided in module ' + module.id + '. Aborting');
        }
        var column = _.clone(obj.column);

        if ( ! _.has(column, 'id') ) {
          throw new Error('updateColumnCollection, no id provided for a column in module' + module.id + '. Aborting');
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

        //Inform the global column collection
        module.czr_columnCollection.set(_new_collection);
  },


  removeColumnFromCollection : function( column ) {
        var module = this,
            _current_collection = module.czr_columnCollection.get(),
            _new_collection = $.extend( true, [], _current_collection);

        _new_collection = _.filter( _new_collection, function( _col ) {
              return _col.id != column.id;
        } );

        module.czr_columnCollection.set(_new_collection);
  },




  //cb of control.czr_columnCollection.callbacks
  //The job of this function is to set the column collection in their respective sektItems
  columnCollectionReact : function( to, from ) {
        var module = this,
            is_column_added   = _.size(from) < _.size(to),
            is_column_removed = _.size(from) > _.size(to),
            is_column_update  = _.size(from) == _.size(to),
            //is_column_collection_sorted = _.isEmpty(_to_add) && _.isEmpty(_to_remove)  && ! is_column_update,
            _current_sek_model = {},
            _new_sek_model = {};

        //COLUMN UPDATE CASE
        //parse the columns and find the one that has changed.
        if ( is_column_update ) {
              _.each( to, function( _col, _key ) {
                    if ( _.isEqual( _col, from[_key] ) )
                      return;
                    _current_sek_model = _col.sektion.get();
                    _new_sek_model = $.extend(true, {}, _current_sek_model);

                    //find the column and update it
                    _.each( _current_sek_model.columns, function( _c, _k ){
                          if ( _c.id != _col.id )
                            return;
                          _new_sek_model.columns[_k] = _col;
                    } );

                    _col.sektion.set( _new_sek_model );

              } );//_.each
        }//end if column update


        //NEW COLUMN CASE
        if ( is_column_added ) {
              //find the new column
              var _new_column = _.filter( to, function( _col ){
                  return _.isUndefined( _.findWhere( from, { id : _col.id } ) );
              });

              _new_column = _new_column[0];
              _current_sek_model = _new_column.sektion.get();
              //only add the column if the column does not exist in the sektion columns.
              if ( _.isUndefined( _.findWhere( _current_sek_model.columns, {id : _new_column.id } ) ) ) {
                    _new_sek_model = $.extend(true, {}, _current_sek_model);
                    _new_sek_model.columns.push( _new_column );
                    _new_column.sektion.set( _new_sek_model );
              }

        }//end if new column case

        //COLUMN REMOVED
        if ( is_column_removed ) {
              //find the column to remove
              var _to_remove = _.filter( from, function( _col ){
                  return _.isUndefined( _.findWhere( to, { id : _col.id } ) );
              });
              _to_remove = _to_remove[0];

              _current_sek_model = _to_remove.sektion.get();
              _new_sek_model = $.extend(true, {}, _current_sek_model);//_.clone() is not enough there, we need a deep cloning.

              //remove the column from the sekItem model
              _new_sek_model.columns = _.filter( _new_sek_model.columns, function( _col ) {
                    return _col.id != _to_remove.id;
              } );

              _to_remove.sektion.set( _new_sek_model );

              //remove the column instance from module
              module.czr_Column.remove( _to_remove.id );
        }


        //refreshes the preview frame  :
        //1) only needed if transport is postMessage, because is triggered by wp otherwise
        //2) only needed when : add, remove, sort item(s)
        //module update case
        // if ( 'postMessage' == api(control.id).transport && ! api.CZR_Helpers.has_part_refresh( control.id ) ) {
        //     if ( is_collection_sorted )
        //         control.previewer.refresh();
        // }
  },



  //recursive
  generateColId : function( key, i ) {
        //prevent a potential infinite loop
        i = i || 1;
        if ( i > 100 ) {
              throw new Error('Infinite loop when generating of a column id.');
        }

        var module = this;
        key = key || module._getNextColKeyInCollection();

        var id_candidate = 'col_' + key;

        //do we have a column collection value ?
        if ( ! _.has(module, 'czr_columnCollection') || ! _.isArray( module.czr_columnCollection.get() ) ) {
              throw new Error('The column collection does not exist or is not properly set in module : ' + module.id );
        }
        //make sure the column is not already instantiated
        if ( module.czr_Column.has( id_candidate ) ) {
          return module.generateColId( key++, i++ );
        }

        return id_candidate;
  },


  //helper : return an int
  //=> the next available id of the column collection
  _getNextColKeyInCollection : function() {
        var module = this,
            _max_col_key = {},
            _next_key = 0;

        //get the initial key
        //=> if we already have a collection, extract all keys, select the max and increment it.
        //else, key is 0
        if ( ! _.isEmpty( module.czr_columnCollection.get() ) ) {
            _max_col_key = _.max( module.czr_columnCollection.get(), function( _col ) {
                return parseInt( _col.id.replace(/[^\/\d]/g,''), 10 );
            });
            _next_key = parseInt( _max_col_key.id.replace(/[^\/\d]/g,''), 10 ) + 1;
        }
        return _next_key;
  },


  //@return bool
  moduleExistsInOneColumnMax : function( module_id ) {
        return 2 > this.getModuleColumn( module_id ).length;
  },


  //@return an array of columns
  //=> a module can't be embedded in several columns at a time
  //if the returned array has more than one item, it should trigger an Error.
  getModuleColumn : function( module_id ) {
        var module = this,
            _mod_columns = [];
        _.each( module.czr_columnCollection.get(), function( _col, _key ) {
              if ( _.findWhere( _col.modules, { id : module_id } ) )
                _mod_columns.push( _col.id );
        });
        return _mod_columns;
  }

});