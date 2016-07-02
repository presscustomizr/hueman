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
                itemPreAddEl : 'czr-module-sektion-pre-add-view-content',
                rudItemPart : 'czr-module-sektion-rud-item-part',
                itemInputList : 'czr-module-sektion-view-content',
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
                module.control.getSyncCollectionControl().syncSektionModule.set( module );
          });


          //DRAGULA
          // if ( ! _.has( module ,'dragInstance' ) )
          //   module.initDragula();
          if ( ! _.has( module ,'modsDragInstance' ) )
            module.initModulesDragula();


          //MODULE PANEL
          api.czrModulePanelState = api.czrModulePanelState || new api.Value( false );
          api.czrModulePanelEmbedded = api.czrModulePanelEmbedded || $.Deferred();
          //EXTEND THE USER EVENT MAP
          //=> adds the module list panel events
          module.userEventMap.set( _.union(
                module.userEventMap(),
                [
                  {
                    trigger   : 'click keydown',
                    selector  : '.add-new-module',
                    name      : 'add_new_module',
                    actions   : 'toggleModuleListPanel'
                  },
                  {
                    trigger   : 'click keydown',
                    selector  : '.' + module.control.css_attr.open_pre_add_btn,
                    name      : 'close_module_panel',
                    actions   : function() {
                        api.czrModulePanelState.set(false);
                    },
                  },
                ]
          ));
          api.czrModulePanelEmbedded.done( function() {
                api.czrModulePanelState.callbacks.add( function() { return module.reactToModulePanelState.apply(module, arguments ); } );
          });


  },//initialize



  /////////////////////////////////////////////////////////////////////////
  /// SEKTION
  ////////////////////////////////////////////////////////////////////////
  //the sekItem object looks like :
  //id : ''
  //columns : []
  //sektion-layout : int
  removeSektion : function( sekItem ) {
        var module = this;

        _.each( sekItem.columns, function( _col ) {

              _.each( _col.modules, function( _mod ){
                    module.control.getSyncCollectionControl().removeModule( _mod );
              });//_.each

              //remove column from DOM if it's been embedded
              if ( module.czr_Column.has(_col.id) && 'resolved' == module.czr_Column( _col.id ).embedded.state() )
                  module.czr_Column( _col.id ).container.remove();

              //remove column from API
              module.removeColumnFromCollection( _col );


        });//_.each

  },

  closeAllOtherSektions : function( $_clicked_el ) {
          console.log('in close sektions', $_clicked_el );
          var module = this;
              _clicked_sektion_id = $_clicked_el.closest('.czr-single-item').attr('data-id');

          module.czr_Item.each( function( _sektion ){
                if ( _clicked_sektion_id != _sektion.id ) {
                    _sektion.czr_ItemState.set( 'closed');
                } else {
                    _sektion.czr_ItemState.set( 'expanded' != _sektion.czr_ItemState() ? 'expanded_noscroll' : 'expanded' );
                }
          });
  }

});