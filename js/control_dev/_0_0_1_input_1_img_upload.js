var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupImageUploader : function() {
         var input  = this;

         //do we have an html template and a input container?
         if ( ! input.container )
           return this;

         if ( ! input.renderImageUploaderTemplate() )
           return;

         //Bind events
         // Shortcut so that we don't have to use _.bind every time we add a callback.
         _.bindAll( input, 'czrImgUploadRestoreDefault', 'czrImgUploadRemoveFile', 'czrImgUploadOpenFrame', 'czrImgUploadSelect');

         // Bind events, with delegation to facilitate re-rendering.
         input.container.on( 'click keydown', '.upload-button', input.czrImgUploadOpenFrame );
         input.container.on( 'click keydown', '.thumbnail-image img', input.czrImgUploadOpenFrame );
         input.container.on( 'click keydown', '.remove-button', input.czrImgUploadRemoveFile );
         input.container.on( 'click keydown', '.default-button', input.czrImgUploadRestoreDefault );

         input.bind( function( to, from ){
            input.renderImageUploaderTemplate();
         });

         // control.setting.bind( function( value, old_val, something ) {
         //   //TODO, scope to the actual background image input as at the moment it reacts to watever value changes in the setting

         //   //Is the following needed?
         //   // Send attachment information to the preview for possible use in `postMessage` transport.
         //   wp.media.attachment( value ).fetch().done( function() {
         //     wp.customize.previewer.send( control.setting.id + '-attachment-data', this.attributes );
         //   } );

         //   //re-render the template
         //   control.renderImageUploaderTemplate();
         // });
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
      var input = this,
          control = input.control;

       input.frame = wp.media({
         button: {
             text: control.params.button_labels.frame_button
         },
         states: [
             new wp.media.controller.Library({
               title:     control.params.button_labels.frame_title,
               library:   wp.media.query({ type: control.params.mime_type }),
               multiple:  false,
               date:      false
             })
         ]
       });
       // When a file is selected, run a callback.
       input.frame.on( 'select', input.czrImgUploadSelect );
  },

  /**
  * Reset the setting to the default value.
  */
  czrImgUploadRestoreDefault: function( event ) {
        var input = this,
          control = input.control;

        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }
        event.preventDefault();

        control.params.attachment = control.params.defaultAttachment;

        // Set the input; the callback takes care of rendering.
        input.container.find('input').val( control.params.defaultAttachment.url ).trigger('change');

  },

  /**
  * Called when the "Remove" link is clicked. Empties the setting.
  *
  * @param {object} event jQuery Event object
  */
  czrImgUploadRemoveFile: function( event ) {
        var input = this,
          control = input.control;

        if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
          return;
        }
        event.preventDefault();

        control.params.attachment = {};

        input.container.find('input').val( '' ).trigger('change');
  },


  /**
  * Callback handler for when an attachment is selected in the media modal.
  * Gets the selected image information, and sets it within the input.
  */
  czrImgUploadSelect: function() {
        var node,
            input = this,
            control = input.control,
            attachment   = input.frame.state().get( 'selection' ).first().toJSON(),  // Get the attachment from the modal frame.
            mejsSettings = window._wpmejsSettings || {};

        control.params.attachment = attachment;

        input.container.find('input').val( attachment.id ).trigger('change');
  },




  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  renderImageUploaderTemplate: function() {
       var input  = this;

        //do we have view template script?
       if ( 0 === $( '#tmpl-czr-img-uploader-view-content' ).length )
         return;

       var view_template = wp.template('czr-img-uploader-view-content');

       //  //do we have an html template and a control container?
       if ( ! view_template  || ! input.container )
        return;

       var $_view_el    = input.container.find('.' + input.control.css_attr.img_upload_container );

       if ( ! $_view_el.length )
         return;

       $_view_el.html( view_template( input.control.params ) );

       return true;
  }
});//$.extend