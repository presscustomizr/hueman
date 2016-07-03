
//BASE CONTROL CLASS
//extends api.CZRBaseControl
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var CZRBaseModuleControlMths = CZRBaseModuleControlMths || {};

$.extend( CZRBaseModuleControlMths, {

  initialize: function( id, options ) {
          var control = this;

          control.czr_Module = new api.Values();

          //czr_collection stores the module collection
          control.czr_moduleCollection = new api.Value();
          control.czr_moduleCollection.set([]);

          //let's store the state of the initial module collection
          control.moduleCollectionReady = $.Deferred();
          //and listen to changes when it's ready
          control.moduleCollectionReady.done( function( obj ) {
                console.log('MODULE COLLECTION READY IN CONTROL : ', control.id , obj );
                //LISTEN TO MODULE COLLECTION
                control.czr_moduleCollection.callbacks.add( function() { return control.moduleCollectionReact.apply( control, arguments ); } );

                //control.removeModule( _mod );
          } );

          //FOR MULTI MODULE CONTROL : Stores the module instance of the synchronized sektion
          if ( control.isMultiModuleControl( options.params ) ) {
                control.syncSektionModule = new api.Value();
          }

          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          //FOR TEST PURPOSES
          // api(this.id).bind( function( to, from) {
          //     console.log( 'SETTING ', control.id, ' HAS CHANGED : ', to, from );
          // });

  },




  //////////////////////////////////
  ///READY = CONTROL INSTANTIATED AND DOM ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          if ( control.isMultiModuleControl() ) {
                //POPULATE THE SAVED MODULE COLLECTION WHEN THE SYNCHRONIZED SEKTIONS SETTING HAS PROVIDED ITS INSTANCE
                control.syncSektionModule.bind( function( sektion_module_instance, from) {
                      if ( 'resolved' == control.moduleCollectionReady.state() )
                        return;
                      control.registerModulesOnInit( sektion_module_instance );
                      //the module collection is ready
                      control.moduleCollectionReady.resolve();
                });
          } else {
                //inits the collection with the saved modules
                //populates the collection with the saved module
                _.each( control.getSavedModules() , function( _mod, _key ) {
                      //adds it to the collection
                      //=> it will be fired ready usually when the control section is expanded
                      control.instantiateModule( _mod, {} );
                });
                //the module collection is ready
                control.moduleCollectionReady.resolve();
          }


          //LISTEN TO MODULE CANDIDATES ADDED BY USERS
          control.bind( 'user-module-candidate', function( _module ) {
                //instanciate + fire ready()
                //=> the module will be added in the collection on isReady.done()
                control.instantiateModule( _module, {} ).ready( _module.is_added_by_user ); //module, constructor
          });
  },









  //////////////////////////////////
  /// VARIOUS HELPERS
  //////////////////////////////////
  ///
  //@return the default API model {} needed to instantiate a module
  //Depending on the module context, control or sektion, the default model has to hold different properties
  getDefaultModuleApiModel : function() {
          //Modules share the common model either they are in a sektion or in a control
          var commonAPIModel = {
                id : '',//module.id,
                module_type : '',//module.module_type,
                items   : [],//$.extend( true, {}, module.items ),
                crud : false,
                multi_item : false,
                control : {},//control,
          };

          //if embedded in a control, amend the common model with the section id
          if ( ! this.isMultiModuleControl() ) {
              return $.extend( commonAPIModel, {
                  section : ''//id of the control section
              } );
          } else {
              return $.extend( commonAPIModel, {
                  column_id : '',//a string like col_7
                  sektion : {},// => the sektion instance
                  sektion_id : '',
                  is_added_by_user : false,
                  dirty : false
              } );
          }
  },

  //@return the default DB model {} that will be used when the setting will send the ajax save request
  //Depending on the module context, control or sektion, the default DB model has to hold different properties
  getDefaultModuleDBModel : function() {
          var commonDBModel = {
                items   : [],//$.extend( true, {}, module.items ),
          };

          //if embedded in a sektion, we need more the item(s) collection
          if ( this.isMultiModuleControl() ) {
              return $.extend( commonDBModel, {
                  id : '',
                  module_type : '',
                  column_id : '',
                  sektion_id : '',
                  dirty : false
              } );
          } else {
              return commonDBModel;
          }
  },


  //@return bool
  isMultiModuleControl : function( params ) {
          return 'czr_multi_module' == ( params || this.params ).type;
  },


  //@return the control instance of the synchronized collection of modules
  getSyncCollectionControl : function() {
        var control = this;
        if ( _.isUndefined( control.params.syncCollection ) ) {
            throw new Error( 'Control ' + control.id + ' has no synchronized sektion control defined.');
        }
        return api.control( api.CZR_Helpers.build_setId( control.params.syncCollection ) );
  },

  //@return the collection [] of saved module(s) to instantiate
  getSavedModules : function() {
          var control = this,
              savedModules = [];

          //In the case of multi module control synchronized with a sektion
          // => the saved modules is a collection saved in the setting
          //For a module embedded in a regular control, we need to hard code the single module collection
          // => in this case, the corresponding setting will store the collection of item(s)
          if ( control.isMultiModuleControl() ) {
              savedModules = $.extend( true, [], api(control.id).get() );//deep clone
          } else {
              //for now this is a collection with one module
              savedModules.push(
                    {
                      id : api.CZR_Helpers.getOptionName( control.id ) + '_' + control.params.type,
                      module_type : control.params.module_type,
                      section : control.section(),
                      items   : $.extend( true, [] , api(control.id).get() )//deep clone//must be a collection [] of items
                    }
              );
          }
          return savedModules;
  },


  //this helper allows to check if a module has been registered in the collection
  //no matter if it's not instantiated yet
  isModuleRegistered : function( id_candidate ) {
        var control = this;
        return ! _.isUndefined( _.findWhere( control.czr_moduleCollection(), { id : id_candidate}) );
  },


});//$.extend//CZRBaseControlMths