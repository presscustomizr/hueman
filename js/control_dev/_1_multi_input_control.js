//extends api.CZRBaseControl
var CZRMultiInputMethods = CZRMultiInputMethods || {};
(function (api, $, _) {

  $.extend( CZRMultiInputMethods , {
    initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          ////////////////////////////////////////////////////
          /// CONTROL DEFAULT EVENT MAP
          ////////////////////////////////////////////////////
          control.control_event_map = [
            //set input value
            {
              trigger   : 'propertychange change click keyup input colorpickerchange',//colorpickerchange is a custom colorpicker event @see method setupColorPicker => otherwise we don't
              selector  : 'input[data-type], select[data-type]',
              name      : 'set_input_value',
              actions   : 'updateModel'
            }
          ];

          ////////////////////////////////////////////////////
          /// SET UP THE MODEL (DB OPTION) AS AN OBSERVABLE VALUE
          ////////////////////////////////////////////////////
          control.czr_Model = new api.Value();

          //listens and reacts to the model changes
          control.czr_Model.callbacks.add(function(to, from) {
            //on init the from is empty
            //=> render the control
            if ( _.isUndefined(from) ) {
              //Setup the control event listeners
              control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );
              control.renderView();
            } else {//the update
              //update the setting value
              console.log('NEW MODEL VAL', to );
              api(control.id).set(to);
            }
          });

    },//initialize


    ready: function() {
          var control  = this;
          api.bind( 'ready', function() {
            //sets the model value on api ready
            //=> triggers the control rendering + DOM LISTENERS
            control.czr_Model.set( api(control.id).get() );
          });
    },






    //////////////////////////////////////////////////
    /// MODEL
    //////////////////////////////////////////////////
    //fired after a input change is detected
    updateModel : function( obj ) {

      //get the changed property and val
      //=> all html input have data-type attribute corresponding to the ones stored in the model
      var control           = this,
          $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
          _changed_prop     = $_changed_input.attr('data-type'),
          _new_val          = $( $_changed_input, obj.dom_el ).val(),
          _current_model    = control.czr_Model.get(),
          _new_model        = _.clone( _current_model );//initialize it to the current value

      //make sure the _new_model is an object
      _new_model =  ! _.isObject(_new_model) ? {} : _new_model;

      //set the new val to the changed property
      _new_model[_changed_prop] = _new_val;

      control.czr_Model.set(_new_model);

      //say it to the current view
      control.doActions(
        _changed_prop + ':changed',
        obj.dom_el,
        { model : _new_model }
      );
    },







    //////////////////////////////////////////////////
    /// VIEWS
    //////////////////////////////////////////////////
    //the view wrapper is rendered by WP
    //the content ( the various inputs ) is rendered by the following methods
    //an event is triggered on the control.container when content is rendered
    renderView : function() {
          //=> an array of objects
          var control = this;

          //do we have view template script?
          if ( 0 === $( '#tmpl-' + control.viewContentTemplateEl ).length )
            return this;

          var view_template = wp.template( control.viewContentTemplateEl );

          //do we have an html template and a control container?
          if ( ! view_template  || ! control.container )
            return this;

          //if the view has already been rendered, the view element exists, we simply need to remove its html content and append the new one
          //if not, then we need to render the view element and append the view html content to it
          var $_view_el = $('.' + control.css_attr.multi_input_wrapper, control.container);

          if ( _.isEmpty($_view_el.html() ) ) {
            $_view_el.append( control._getViewContent() );
          } else {
            //var $_view_el = $('li[data-id="' + model.id + '"]');
            //empty the html and append the updated content
            $_view_el.html( control._getViewContent() );
          }

          control.doActions( 'viewContentRendered' , control.container, {} );

          return this;
    },

    //renders saved model view
    //the saved model is an object (the db option is an array of "sub_settings" )
    _getViewContent : function() {
          //=> an array of objects
          var control = this;

          //do we have view content template script?
          if ( 0 === $( '#tmpl-' + control.viewContentTemplateEl ).length )
            return this;

          var  view_content_template = wp.template( control.viewContentTemplateEl );

          //do we have an html template and a control container?
          if ( ! view_content_template || ! control.container )
            return this;

          //the view content
          return $( view_content_template( control.czr_Model.get() ));

    },








    //////////////////////////////////////////////////
    /// DEFAULT METHODS FOR SETTING UP THE SUB-INPUTS
    //////////////////////////////////////////////////
    setupSelect : function() {
          var control = this;
          $('select', control.container ).not('.no-selecter-js')
            .each( function() {
              $(this).selecter({
              //triggers a change event on the view, passing the newly selected value + index as parameters.
              // callback : function(value, index) {
              //   self.triggerSettingChange( window.event || {} , value, index); // first param is a null event.
              // }
              });
          });
    },

    setupColorPicker : function() {
          var control  = this;

          $('.' + control.css_attr.multi_input_wrapper, control.container).find('[data-input-type="color"]').find('input').wpColorPicker( {
            change : function( e, o ) {
              //if the input val is not updated here, it's not detected right away.
              //weird
              //is there a "change complete" kind of event for iris ?
              $(this).val($(this).wpColorPicker('color'));
              $(this).trigger('colorpickerchange');
            }
          });
    },


    setupImageUploader : function() {
         var control  = this;

         //do we have an html template and a control container?
         if ( ! control.container )
          return this;


         if ( ! this.renderImageUploaderTemplate() )
           return;

         //Bind events
         // Shortcut so that we don't have to use _.bind every time we add a callback.
         _.bindAll( control, 'restoreDefault', 'removeFile', 'openFrame', 'select');

         // Bind events, with delegation to facilitate re-rendering.
         control.container.on( 'click keydown', '.upload-button', control.openFrame );
         control.container.on( 'click keydown', '.thumbnail-image img', control.openFrame );
         control.container.on( 'click keydown', '.remove-button', control.removeFile );
         control.container.on( 'click keydown', '.default-button', control.restoreDefault );

         control.setting.bind( function( value, old_val, something ) {
           //TODO, scope to the actual background image input as at the moment it reacts to watever value changes in the setting
           // Send attachment information to the preview for possible use in `postMessage` transport.
           wp.media.attachment( value ).fetch().done( function() {
             wp.customize.previewer.send( control.setting.id + '-attachment-data', this.attributes );
           } );
           control.renderImageUploaderTemplate();
         });
    },
	
    /**
    * Open the media modal.
    */
    openFrame: function( event ) {
          if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
            return;
          }

          event.preventDefault();

          if ( ! this.frame ) {
            this.initFrame();
          }

          this.frame.open();
    },

    /**
    * Create a media modal select frame, and store it so the instance can be reused when needed.
    */
    initFrame: function() {
         this.frame = wp.media({
           button: {
               text: this.params.button_labels.frame_button
           },
           states: [
               new wp.media.controller.Library({
                 title:     this.params.button_labels.frame_title,
                 library:   wp.media.query({ type: this.params.mime_type }),
                 multiple:  false,
                 date:      false
               })
           ]
         });

         // When a file is selected, run a callback.
         this.frame.on( 'select', this.select );
    },

    /**
    * Reset the setting to the default value.
    */
    restoreDefault: function( event ) {
          if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
            return;
          }
          event.preventDefault();

          this.params.attachment = this.params.defaultAttachment;
	
          // Set the Customizer setting; the callback takes care of rendering.
          var _sub_setting = $('.' + control.css_attr.multi_input_wrapper, control.container)
                             .find('[data-input-type="upload"] .czr-input input' );
          _sub_setting.val( this.params.defaultAttachment.url ).trigger('change');

    },

    /**
    * Called when the "Remove" link is clicked. Empties the setting.
    *
    * @param {object} event jQuery Event object
    */
    removeFile: function( event ) {
          var control = this;

          if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
            return;
          }
          event.preventDefault();
          
          this.params.attachment = {};

          // Set the Customizer setting; the callback takes care of rendering.
          var _sub_setting = $('.' + control.css_attr.multi_input_wrapper, control.container)
                             .find('[data-input-type="upload"] .czr-input input' );
          _sub_setting.val( '' ).trigger('change');
    },
        

    /**
    * Callback handler for when an attachment is selected in the media modal.
    * Gets the selected image information, and sets it within the control.
    */
    select: function() {
          // Get the attachment from the modal frame.
          var node,
              attachment   = this.frame.state().get( 'selection' ).first().toJSON(),
              mejsSettings = window._wpmejsSettings || {},
              control      = this;

          this.params.attachment = attachment;

          // Set the Customizer setting; the callback takes care of rendering.
          var _sub_setting = $('.' + control.css_attr.multi_input_wrapper, control.container)
                             .find('[data-input-type="upload"] .czr-input input' );
          _sub_setting.val( attachment.id ).trigger('change');
    },

    //////////////////////////////////////////////////
    /// HELPERS
    //////////////////////////////////////////////////
    renderImageUploaderTemplate: function() {
         var control  = this;
         
          //do we have view template script?
         if ( 0 === $( '#tmpl-customize-img-uploader-view-content' ).length )
           return;

         var view_template = wp.template('customize-img-uploader-view-content');

         //  //do we have an html template and a control container?
         if ( ! view_template  || ! control.container )
          return;

         var $_view_el    = $('.' + control.css_attr.multi_input_wrapper, control.container).
             find('[data-input-type="upload"] .czr-imgup-container' );
         
         if ( ! $_view_el.length )
           return;

         $_view_el.html( view_template( control.params ) );

         return true;
    },
    	
  });//$.extend

})( wp.customize, jQuery, _);
