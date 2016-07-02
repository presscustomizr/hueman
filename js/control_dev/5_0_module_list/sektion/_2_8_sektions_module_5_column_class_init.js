
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
    initialize: function( name, options ) {
          var column = this;
          api.Value.prototype.initialize.call( column, null, options );

          //write the options as properties, name is included
          $.extend( column, options || {} );

          column.isReady = $.Deferred();
          column.embedded = $.Deferred();

          //stores the column collection
          //set the initial value
          column.czr_columnModuleCollection = new api.Value();
          column.czr_columnModuleCollection.set( column.modules );

          //set the column instance value
          column.set( options );

          //the modules are stored only with their id in a column
          column.defautModuleModelInColumn = { id : '' };

          //defer the column rendering when the parent sektion content is rendered
          column.sektion.contentRendered.done(function() {
                //render the column
                column.container = column.render();
                //say it
                column.embedded.resolve();
          });







          //when column is embedded :
          //=> setup the DOM event handler
          column.embedded.done(function() {
                //at this point, the question is : are the modules assigned to this column instantiated ?
                //if not => let's instantiate them. => this should not change the module collection czr_moduleCollection of the module-collection control
                //=> because they should already be registered in it
                column.mayBeInstantiateColumnModules();

                //react to column value changes
                column.callbacks.add( function() { return column.columnReact.apply(column, arguments ); } );

                //react to the column module collection changes
                column.czr_columnModuleCollection.callbacks.add( function() { return column.columnModuleCollectionReact.apply( column, arguments ); } );

                //Setup the column event listeners
                api.CZR_Helpers.setupDOMListeners(
                        column.column_event_map,//actions to execute
                        { dom_el : column.container },//dom scope
                        column//instance where to look for the cb methods
                );

                //dragulize
                var syncCollectionControl = api.control(column.control_id).getSyncCollectionControl();
                syncCollectionControl.syncSektionModule().modsDragInstance.containers.push( $('.czr-module-collection-wrapper', column.container )[0] );

          });
    },



    //overridable method
    //Fired if column is instantiated.
    ready : function() {
          var column = this;
          //=>allows us to use the following event base method : column.isReady.done( function() {} ):
          column.isReady.resolve();

          //push it to the module collection
          column.sektion.module.updateColumnCollection( {column : column.get() });
    },

    //fired on column embedded
    mayBeInstantiateColumnModules : function() {
          var column = this,
              syncedCollectionControl = column.sektion.control.getSyncCollectionControl();

          //when the module collection is synchronized, instantiate the module of this column
          //=>fire ready when the module column is embedded
          $.when( syncedCollectionControl.moduleCollectionReady.promise() ).then(
                function() {
                  _.each( column.czr_columnModuleCollection() , function( _mod ) {
                            //is this module already instantiated ?
                            if ( syncedCollectionControl.czr_Module.has(_mod.id) )
                              return;

                            //first let's try to get it from the collection
                            //var _module_candidate = _.findWhere( syncedCollectionControl.czr_moduleCollection() , { id : _mod.id } );
                            $.when( _.findWhere( syncedCollectionControl.czr_moduleCollection() , { id : _mod.id } ) ).done( function( module_candidate ) {
                                  if ( _.isUndefined( module_candidate) ||_.isEmpty( module_candidate ) ) {
                                    throw new Error( 'Module ' + _mod.id + ' was not found in the module collection.');
                                  }
                                  //we have a candidate. Let's instantiate it + fire ready()
                                  syncedCollectionControl.instantiateModule( module_candidate, {} ).ready();
                            });


                            //push it to the collection of the sektions control
                            //@todo => shall we make sure that the module has actually been instatiated by the module-collection control?
                            // if ( ! syncedCollectionControl.czr_Module.has( _module_candidate.id ) )
                            //   return;

                            //column.updateColumnModuleCollection( { module : _module_candidate });
                  } );
                },//done callback
                function() {},//fail callback
                function() {
                  console.log( 'NOT SYNCHRONIZED YET');
                }
          );//.then()
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
          var column = this;
          this.sektion.module.updateColumnCollection( {column : to });
    }
});//$.extend