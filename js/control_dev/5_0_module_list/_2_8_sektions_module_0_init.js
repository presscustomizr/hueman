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

          //SEKTIONS
          //declares a default model (overrides parent module)
          module.defaultItemModel = {
                id : '',
                'sektion-layout' : 1,
                columns : []
          };

          //hook before a sektion is being remove from dom and api.
          //=> remove modules and columns from DOM
          //=> removes moduea and columns instances from API
          module.bind( 'pre_item_dom_remove', function( item ) {
                module.removeSektion( item );
          });


          //COLUMNS
          module.defaultDBColumnModel = {
                id : '',
                sektion_id : '',
                modules : [],
          };

          module.defaultAPIcolumnModel = {
                id : '',
                modules : [],
                sektion : {},//sektion instance
                module_id : '',
                control_id : '',
                is_added_by_user : false
          };

          //the column values
          module.czr_Column = new api.Values();
          //stores the column collection
          //set the initial value
          module.czr_columnCollection = new api.Value();
          module.czr_columnCollection.set([]);

          //react to column collection changes
          module.czr_columnCollection.callbacks.add( function() { return module.columnCollectionReact.apply(module, arguments ); } );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR SEKTION ITEMS
          module.itemConstructor = api.CZRItem.extend( module.CZRSektionItem || {} );

          //FIRE
          api.section( module.control.section() ).expanded.bind(function(to) {
                if ( 'resolved' == module.isReady.state() )
                  return;
                //unleash hell
                module.ready();

                //provide the synchronized module-collection control with its synchronized sektions module instance
                api.control( api.CZR_Helpers.build_setId( 'module-collection') ).syncSektionModule.set( module );
          });

          //DRAGULA
          if ( ! _.has( module ,'dragInstance' ) )
            module.initDragula();

  },//initialize



  /////////////////////////////////////////////////////////////////////////
  /// SEKTION
  ////////////////////////////////////////////////////////////////////////


  //React to a single item change
  //cb of module.czr_Item(item.id).callbacks
  itemReact : function( to, from ) {
        console.log('IN ITEM REACT (OVERRIDES PARENT)', to, from );
        var module = this,
            sektion_candidate = $.extend(true, {}, to);
        console.log('sektion_candidate BEFORE', sektion_candidate );
        //we want to make sure that the item model is compliant with default model
        sektion_candidate = module.prepareSekItemForDB( sektion_candidate );
        console.log('sektion_candidate AFTER', sektion_candidate );
        //update the collection
        module.updateItemsCollection( {item : sektion_candidate });
  },



  //the sektion item model must have only the property set in
  //module.defaultItemModel = {
  //       id : '',
  //       'sektion-layout' : 1,
  //       columns : []
  // };
  prepareSekItemForDB : function( sektion_candidate ) {
        var module = this,
            db_ready_sektItem = {};

        _.each( module.defaultItemModel, function( _value, _key ) {
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
                            var _db_ready_col = module.prepareColumnForDB(_col);
                            _db_ready_columns.push( _db_ready_col );
                      });
                      console.log(' _db_ready_columns',  _db_ready_columns);
                      db_ready_sektItem[_key] = _db_ready_columns;
                  break;
            }
        });//each

        return db_ready_sektItem;
  },


  //the sekItem object looks like :
  //id : ''
  //columns : []
  //sektion-layout : int
  removeSektion : function( sekItem ) {
        console.log('removed sekItem', sekItem);
        var module = this,
            collection_control = api.control( api.CZR_Helpers.build_setId( 'module-collection') );

        _.each( sekItem.columns, function( _col ) {

              _.each( _col.modules, function( _mod ){
                    //remove module from DOM if it's been embedded
                    if ( collection_control.czr_Module.has( _mod.id ) && 'resolved' == collection_control.czr_Module( _mod.id ).embedded.state() )
                        collection_control.czr_Module( _mod.id ).container.remove();

                    //remove module from API
                    collection_control.removeModuleFromCollection( _mod );
              });//_.each

              //remove column from DOM if it's been embedded
              if ( module.czr_Column.has(_col.id) && 'resolved' == module.czr_Column( _col.id ).embedded.state() )
                  module.czr_Column( _col.id ).container.remove();

              //remove column from API
              module.removeColumnFromCollection( _col );


        });//_.each

  }

});