var CZRDynamicMethods = CZRDynamicMethods || {};
/* Dynamic Controls */
//@augments CZRBaseControl
/* //=> all html input have data-type attribute corresponding to the ones stored in the model
/**
 * @constructor
 * @augments wp.customize.Control
 * @augments wp.customize.Class
 * @todo  : some controls must listen to the sidebar changes => home Left sidebar for example and fall back on a default value.
 * @todo : when adding a model => collection update => check if key exist to either update or push a new model
 * @todo : the views shall be refreshed each time the collection is updated
 * @todo : always have only one view content opened at a time
 * @todo : make sure that the model has changed before refreshing the view !! or don't refresh the view is already rendered ?
 */

(function (api, $, _) {
  $.extend( CZRDynamicMethods, {

    //EARLY SETUP
    initialize: function( id, options ) {
      //console.log('the setting id', id , options );

      var control = this;

      //run the parent initialize
      api.CZRBaseControl.prototype.initialize.call( control, id, options );



      ////////////////////////////////////////////////////
      /// CONTROL EVENT MAP
      ////////////////////////////////////////////////////
      control.control_event_map = [
        //pre add new model : open the dialog box
        {
          trigger   : 'click keydown',
          selector  : [ '.' + options.params.css_attr.open_pre_add_btn, '.' + options.params.css_attr.cancel_pre_add_btn ].join(','),
          name      : 'pre_add_model',
          actions   : ['renderPreModelView','setPreModelViewVisibility'],
        },
        //update_pre_model
        {
          trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
          selector  : [ '.' + options.params.css_attr.pre_add_view_content + ' input[data-type]', '.' + options.params.css_attr.pre_add_view_content + ' select[data-type]'].join(','),
          name      : 'update_pre_model',
          actions   : ['updatePreModel' ]
        },
        //add new model
        {
          trigger   : 'click keydown',
          selector  : '.' + options.params.css_attr.add_new_btn, //'.czr-add-new',
          name      : 'add_model',
          actions   : ['closeAllViews', 'addModel'],
        }
      ];



      ////////////////////////////////////////////////////
      /// SINGLE VIEW EVENT MAP
      ////////////////////////////////////////////////////
      //add the event map properties to the parent class
      control.view_event_map = [
        //toggles remove view alert
        {
          trigger   : 'click keydown',
          selector  : [ '.' + options.params.css_attr.display_alert_btn, '.' + options.params.css_attr.cancel_alert_btn ].join(','),
          name      : 'toggle_remove_alert',
          actions   : ['toggleRemoveAlertVisibility']
        },
        //removes model and destroys its view
        {
          trigger   : 'click keydown',
          selector  : '.' + options.params.css_attr.remove_view_btn,
          name      : 'remove_model',
          actions   : ['removeModel']
        },
        //edit view
        {
          trigger   : 'click keydown',
          selector  : [ '.' + options.params.css_attr.edit_view_btn, '.' + options.params.css_attr.view_title ].join(','),
          name      : 'edit_view',
          actions   : ['setViewVisibility']
        }
      ];



      ////////////////////////////////////////////////////
      /// SINGLE VIEW CONTENT EVENT MAP
      ////////////////////////////////////////////////////
      control.view_content_event_map = [
        //set input value
        {
          trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
          selector  : 'input[data-type], select[data-type]',
          name      : 'set_input_value',
          actions   : 'updateModel'
        }
      ];



      //store the saved models => can be extended to add default models in children classes
      control.savedModels = api(control.id).get();

      //declares a default model
      control.model = { id : '', title : '' };

      //default success message when model added
      control.modelAddedMessage = serverControlParams.translatedStrings.successMessage;

      //extend the control with new template Selectors
      $.extend( control, {
        viewAlertEl : 'customize-control-' + options.params.type + '-alert',
        viewPreAddEl : 'customize-control-' + options.params.type + '-pre-add-view-content',
      } );

      // $( window ).on( 'message', function( e, o) {
      //   console.log('WHAT ARE WE LISTENING TO?', e, o, api.previewer.receive.guid );
      // });

      //Declares some observable values.
      control._setupApiValues();

    },//initialize

    //Declare some observable values.
    _setupApiValues : function() {
      var control = this;
      //PRE MODEL
      //czr_preModel stores the expansion state and the value of the preModel
      control.czr_preModel = new api.Values();
       //create observable pre-model values
      control.czr_preModel.create('model');
      control.czr_preModel.create('view_content');
      control.czr_preModel.create('view_status');
      control.czr_preModel('view_status').set('closed');

      //czr_model stores the each model value => one value by created by model.id
      control.czr_Model = new api.Values();

      //czr_View stores the current expansion status of a given view => one value by created by model.id
      //czr_View can take 3 values : expanded, expanded_noscroll (=> used on view creation), closed
      control.czr_View = new api.Values();

      //czr_collection stores the model collection
      control.czr_Collection = new api.Values();
      control.czr_Collection.create('models');
      control.czr_Collection('models').set([]);
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
        //Setup the control event listeners
        control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );
        //on init : populate the collection and setup the listener of the collection value
        control.setupCollectionListeners().fetchSavedCollection();
        //Now set the setting value (the saved collection has been rendered at this point)
        control.czr_Collection('models').callbacks.add( function( to, from ) {
            //say it to the api
            api(control.id).set( control.filterCollectionBeforeAjax(to) );

            //refreshes the preview frame  :
            //1) only needed if transport is postMessage, because is triggered by wp otherwise
            //2) only needed when : add, remove, sort model(s).
            var is_model_update = ( _.size(from) == _.size(to) ) && ! _.isEmpty( _.difference(from, to) );
            if ( 'postMessage' == api(control.id).transport && ! is_model_update )
              control.previewer.refresh();
        });

        //PRE ADD MODEL SETUP
        control.czr_preModel('model').set(control.getDefaultModel());
        //add state listeners
        control.czr_preModel('view_status').callbacks.add( function( to, from ) {
          control._togglePreModelViewExpansion( to );
        });
      });

      //this control is ready
      control.container.trigger('ready');
    },//ready()

  });//$.extend()

})( wp.customize, jQuery, _ );