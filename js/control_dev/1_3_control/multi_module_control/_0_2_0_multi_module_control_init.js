
//extends api.CZRBaseModuleControl
var CZRMultiModuleControlMths = CZRMultiModuleControlMths || {};

$.extend( CZRMultiModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;

          //listen to the module-collection setting changes
          //=> synchronize the columns in the sektion setting
          api(id).callbacks.add( function() { return control.syncColumn.apply( control, arguments ); } );

          api.CZRBaseModuleControl.prototype.initialize.call( control, id, options );

  },



  //cb of : api(control.id).callbacks.
  syncColumn : function( to, from ) {
        var control = this;

        //MODULE ADDED
        //determine if a module has been added
        var added_mod = _.filter( to, function( _mod, _key ){
            return ! _.findWhere( from, { id : _mod.id } );
        } );
        if ( ! _.isEmpty( added_mod ) ) {
              _.each( added_mod, function( _mod ) {
                      control.syncSektionModule().czr_Column( _mod.column_id ).updateColumnModuleCollection( { module : _mod } );
              });
        }

        //MODULE REMOVED
        var removed_mod = _.filter( from, function( _mod, _key ){
            return ! _.findWhere( to, { id : _mod.id } );
        } );
        if ( ! _.isEmpty( removed_mod ) ) {
              _.each( removed_mod, function( _mod ) {
                      control.syncSektionModule().czr_Column( _mod.column_id ).removeModuleFromColumnCollection( _mod );
              });
        }

        //MODULE HAS BEEN MOVED TO ANOTHER COLUMN
        if ( _.size(from) == _.size(to) ) {
            _.each( from, function( _mod, _key ) {
                    _new_mod = _.findWhere( to, { id : _mod.id} );
                    if ( _.isEqual( _mod, _new_mod ) )
                      return;
                    //update the new column module collection with the new module
                    control.syncSektionModule().czr_Column( _new_mod.column_id ).updateColumnModuleCollection( { module : _new_mod } );

                    //remove module from old column module collection
                    control.syncSektionModule().czr_Column( _mod.column_id ).removeModuleFromColumnCollection( _mod );
              } );
        }

        control.trigger( 'columns-synchronized', to );
  },


  ////////////////////////////////////////////
  /// REMOVE MODULE
  ///////////////////////////////////////////
  //@param module = obj => the module model
  removeModule : function( module ) {
        var control = this;
        //remove module from DOM if it's been embedded
        if ( control.czr_Module.has( module.id ) && 'resolved' == control.czr_Module( module.id ).embedded.state() )
            control.czr_Module( module.id ).container.remove();

        //remove module from API
        control.removeModuleFromCollection( module );
  },


  removeModuleFromCollection : function( module ) {
        var control = this,
            _current_collection = control.czr_moduleCollection(),
            _new_collection = $.extend( true, [], _current_collection);

        _new_collection = _.filter( _new_collection, function( _mod ) {
              return _mod.id != module.id;
        } );

        control.czr_moduleCollection.set( _new_collection );
  }

});//$.extend//CZRBaseControlMths