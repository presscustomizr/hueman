//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
(function (api, $, _) {

  $.extend( CZRStaticMethods , {
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
         _.bindAll( control, 'czrImgUploadRestoreDefault', 'czrImgUploadRemoveFile', 'czrImgUploadOpenFrame', 'czrImgUploadSelect');

         // Bind events, with delegation to facilitate re-rendering.
         control.container.on( 'click keydown', '.upload-button', control.czrImgUploadOpenFrame );
         control.container.on( 'click keydown', '.thumbnail-image img', control.czrImgUploadOpenFrame );
         control.container.on( 'click keydown', '.remove-button', control.czrImgUploadRemoveFile );
         control.container.on( 'click keydown', '.default-button', control.czrImgUploadRestoreDefault );

         control.setting.bind( function( value, old_val, something ) {
           //TODO, scope to the actual background image input as at the moment it reacts to watever value changes in the setting

           //Is the following needed?
           // Send attachment information to the preview for possible use in `postMessage` transport.
           wp.media.attachment( value ).fetch().done( function() {
             wp.customize.previewer.send( control.setting.id + '-attachment-data', this.attributes );
           } );

           //re-render the template
           control.renderImageUploaderTemplate();
         });
    },

    /**
    * Open the media modal.
    */
    czrImgUploadOpenFrame: function( event ) {
          if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
            return;
          }

          event.preventDefault();

          if ( ! this.frame ) {
            this.czrImgUploadInitFrame();
          }

          this.frame.open();
    },

    /**
    * Create a media modal select frame, and store it so the instance can be reused when needed.
    */
    czrImgUploadInitFrame: function() {
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
         this.frame.on( 'select', this.czrImgUploadSelect );
    },

    /**
    * Reset the setting to the default value.
    */
    czrImgUploadRestoreDefault: function( event ) {
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
    czrImgUploadRemoveFile: function( event ) {
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
    czrImgUploadSelect: function() {
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
         if ( 0 === $( '#tmpl-czr-img-uploader-view-content' ).length )
           return;

         var view_template = wp.template('czr-img-uploader-view-content');

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
