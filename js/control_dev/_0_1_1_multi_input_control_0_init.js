//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputControlMethods = CZRMultiInputControlMethods || {};

$.extend( CZRMultiInputControlMethods, {

  initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          //store the saved models => can be extended to add default models in children classes
          control.savedModels = api(control.id).get();

          //declares a default model
          control.model = { id : '', title : '' };

          //define a default Constructors
          control.modelConstructor = api.CZRMonoModel;
          control.inputConstructor = api.CZRInput;

          //extend the control with new template Selectors
          $.extend( control, {
              viewAlertEl : 'customize-control-' + options.params.type + '-alert',
              viewPreAddEl : 'customize-control-' + options.params.type + '-pre-add-view-content',
          } );

          //czr_model stores the each model value => one value by created by model.id
          control.czr_Model = new api.Values();

          //czr_collection stores the model collection
          control.czr_Model.czr_collection = new api.Value();
          control.czr_Model.czr_collection.set([]);
  },



  //////////////////////////////////
  ///READY = CONTROL ELEMENT EMBEDDED ON THE PAGE
  ///FIRED BEFORE API READY
  //////////////////////////////////
  ready : function() {
          var control = this;
          //Important note : this event refreshes the customizer setting value
          //It's not listened to before the api is ready
          //=> the collection update on startup is done when the control is embedded and BEFORE the api is ready
          //=> won't trigger and change setting
          api.bind( 'ready', function() {
                //on init : populate the collection and setup the listener of the collection value
                //control.czr_Model.czr_collection.callbacks.add( function() { return control.setupCollectionListeners.apply(control, arguments ); } );
                control.populateCollection();

                //LISTEN TO MONO MODELS COLLECTION
                //1) update the control setting value
                //2) fire dom actions
                control.czr_Model.czr_collection.callbacks.add( function() { return control.apiCb.apply(control, arguments ); } );
          });

          //this control is ready
          control.container.trigger('ready');
  },//ready()



  apiCb : function( to, from) {
          var control = this;
          //say it to the api
          api(control.id).set( control.filterCollectionBeforeAjax(to) );

          //refreshes the preview frame  :
          //1) only needed if transport is postMessage, because is triggered by wp otherwise
          //2) only needed when : add, remove, sort model(s).
          var is_model_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );

          if ( 'postMessage' == api(control.id).transport && ! is_model_update && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
  }



});//$.extend//CZRBaseControlMethods