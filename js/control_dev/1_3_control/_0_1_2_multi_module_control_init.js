
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );

          //declare a default module model for the DB
          control.defautDatabaseModuleModel = {
                id : '',
                module_type : '',
                column_id : '',
                sektion_id : '',
                items : [],
          };

          //overrides base module control
          //declare a default module model for the API
          //In the API, each module of the collection must hold additional informations
          control.defautAPIModuleModel = {
                id : '',
                module_type : '',
                column_id : '',
                sektion : {},// => the sektion instance
                sektion_id : '',
                control : {},// => the control instance
                items : [],
                is_added_by_user : false
          };

          //store the module ID of the synchronized sektions
          control.syncSektionModule = new api.Value();
          control.modColSynchronized = $.Deferred();

          //listen to the module-collection setting changes
          //=> synchronize the columns in the sektion setting
          api(control.id).callbacks.add( function() { return control.syncColumn.apply( control, arguments ); } );

  },



  //////////////////////////////////
  ///READY = CONTROL DOM ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          api.bind( 'ready', function() {

                //POPULATE THE SAVED MODULE COLLECTION WHEN THE SYNCHRONIZED SEKTIONS SETTING HAS PROVIDED ITS INSTANCE
                control.syncSektionModule.bind( function(to, from) {
                      if ( 'resolved' == control.modColSynchronized.state() )
                        return;


                      control.registerModulesOnInit( to );

                      //LISTEN TO ELEMENT COLLECTION
                      control.czr_moduleCollection.callbacks.add( function() { return control.collectionReact.apply( control, arguments ); } );

                      control.modColSynchronized.resolve();
                });


                //LISTEN TO MODULE CANDIDATES ADDED BY USER
                control.bind( 'user-module-candidate', function( _module ) {
                      //instanciate and add it to the collection
                      control.instantiateModule( _module, {} ); //module, constructor
                });
          });
  },


  //fired when the main sektion module has synchronised its if with the module-collection control
  registerModulesOnInit : function( sektion_module_instance ) {
          var control = this,
              saved_modules = $.extend( true, {}, api(control.id).get() );//deep clone

          _.each( saved_modules, function( _mod, _key ) {

                  //we need the sektion object
                  //First let's find the sektion module id
                  var _sektion_control = api.control( api.CZR_Helpers.build_setId( 'sektions') );

                  if ( ! sektion_module_instance.czr_Item.has( _mod.sektion_id ) ) {
                    console.log('Warning Module ' + _mod.id + ' has no sektion to be embedded to.');
                    return;
                  }

                  var _sektion = sektion_module_instance.czr_Item( _mod.sektion_id );

                  if ( _.isUndefined( _sektion ) ) {
                    throw new Error('sektion instance missing. Impossible to instantiate module : ' + _mod.id );
                  }

                  //add the sektion instance before update the api collection
                  $.extend( _mod, {sektion : _sektion} );

                  //push it to the collection of the module-collection control
                  //=> the instantiation will take place later, on column instantiation
                  control.updateModulesCollection( {module : _mod } );
          });
  },


  //cb of : api(control.id).callbacks.
  syncColumn : function( to, from ) {
        var control = this,
            main_sektion_module_instance = control.syncSektionModule.get();

        //MODULE ADDED
        //determine if a module has been added
        var added_mod = _.filter( to, function( _mod, _key ){
            return ! _.findWhere( from, { id : _mod.id } );
        } );

        if ( ! _.isEmpty(added_mod) ) {
              _.each( added_mod, function( _mod ) {
                      main_sektion_module_instance.czr_Column( _mod.column_id ).updateColumnModuleCollection( { module : _mod } );
              });
        }

        //MODULE REMOVED
        var removed_mod = _.filter( from, function( _mod, _key ){
            return ! _.findWhere( to, { id : _mod.id } );
        } );

        if ( ! _.isEmpty(removed_mod) ) {
              _.each( removed_mod, function( _mod ) {
                      main_sektion_module_instance.czr_Column( _mod.column_id ).removeModuleFromColumnCollection( _mod );
              });
        }

        control.trigger( 'columns-synchronized', to );
  }
});//$.extend//CZRBaseControlMths