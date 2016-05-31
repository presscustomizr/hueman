//MULTI CONTROL CLASS
//extends api.CZRMultiInputControl
//
//Setup the collection of mono models
//renders the control view
//Listen to mono models collection changes and update the control setting

var CZRMultiInputDynMethods = CZRMultiInputDynMethods || {};

$.extend( CZRMultiInputDynMethods, {
  initialize: function( id, options ) {
          var control = this;
          api.CZRMultiInputControl.prototype.initialize.call( control, id, options );


          //EXTENDS THE DEFAULT MONO MODEL CONSTRUCTOR WITH NEW METHODS
          //=> like remove model
          //control.modelConstructor = api.CZRMonoModel.extend( control.CZRMonoModelDynamicMethods || {} );


          //PRE MODEL
          //czr_preModel stores the expansion state and the value of the preModel
          control.czr_preModel = new api.Values();
           //create observable pre-model values
          control.czr_preModel.create('model');
          control.czr_preModel.create('view_content');
          control.czr_preModel.create('view_status');
          control.czr_preModel('view_status').set('closed');

          //default success message when model added
          control.modelAddedMessage = serverControlParams.translatedStrings.successMessage;
  },


  ready : function() {
          var control = this;
          ////////////////////////////////////////////////////
          /// CONTROL EVENT MAP
          ////////////////////////////////////////////////////
          control.control_event_map = [
                //pre add new model : open the dialog box
                {
                  trigger   : 'click keydown',
                  selector  : [ '.' + control.css_attr.open_pre_add_btn, '.' + control.css_attr.cancel_pre_add_btn ].join(','),
                  name      : 'pre_add_model',
                  actions   : ['renderPreModelView','setPreModelViewVisibility'],
                },
                //update_pre_model
                {
                  trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
                  selector  : [ '.' + control.css_attr.pre_add_view_content + ' input[data-type]', '.' + control.css_attr.pre_add_view_content + ' select[data-type]'].join(','),
                  name      : 'update_pre_model',
                  actions   : ['updatePreModel' ]
                },
                //add new model
                {
                  trigger   : 'click keydown',
                  selector  : '.' + control.css_attr.add_new_btn, //'.czr-add-new',
                  name      : 'add_model',
                  actions   : ['closeAllViews', 'addModel'],
                }
          ];//control.control_event_map



          api.bind( 'ready', function() {
                //Setup the control event listeners
                control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );

                //PRE ADD MODEL SETUP
                control.czr_preModel('model').set(control.getDefaultModel());
                //add state listeners
                control.czr_preModel('view_status').callbacks.add( function( to, from ) {
                  control._togglePreModelViewExpansion( to );
                });
          });

          api.CZRMultiInputControl.prototype.ready.call( control );
  },//ready()



  //the model is manually added.
  //We should have a pre model
  addModel : function() {
          var control = this,
              model = control.czr_preModel('model').get();

          if ( _.isEmpty(model) || ! _.isObject(model) ) {
            throw new Error('addModel : a model should be an object and not empty. In : ' + control.id +'. Aborted.' );
          }

          control.instantiateModel(model, key, true); //true == Added by user

          control.closeResetPreModel();
          control.doActions( 'model_added_by_user' , control.container, { model : model , dom_event : obj.dom_event } );

          //refresh the preview frame (only needed if transport is postMessage )
          //must be a dom event not triggered
          //otherwise we are in the init collection case where the model are fetched and added from the setting in initialize
          if ( 'postMessage' == api(this.id).transport && _.has( obj, 'dom_event') && ! _.has( obj.dom_event, 'isTrigger' ) && ! api.czr_has_part_refresh( control.id ) ) {
            control.previewer.refresh();
          }
  }

});//$.extend