var CZRInputMths = CZRInputMths || {};
$.extend( CZRInputMths , {
    setupImageUploader : function() {

        var input        = this,
            _model       = input.get();

        //an instance field where we'll store the current attachment
        input.attachment = {};

        //do we have an html template and a input container?
        if ( ! input.container )
          return this;

        //set the image if it exists
        if ( _model ) {
          wp.media.attachment( _model ).fetch().done( function() {
            input.attachment = this.attributes;
            if ( ! input.renderImageUploaderTemplate() )
              return;
            input.czrImgUploaderBinding();
          });
        }else {
          if ( ! input.renderImageUploaderTemplate() )
            return;

          input.czrImgUploaderBinding();
        }

  },
  czrImgUploaderBinding : function() {
    var input = this;
    //Bind events
    // Shortcut so that we don't have to use _.bind every time we add a callback.
    _.bindAll( input, 'czrImgUploadRestoreDefault', 'czrImgUploadRemoveFile', 'czrImgUploadOpenFrame', 'czrImgUploadSelect');

    // Bind events, with delegation to facilitate re-rendering.
    input.container.on( 'click keydown', '.upload-button', input.czrImgUploadOpenFrame );
    input.container.on( 'click keydown', '.thumbnail-image img', input.czrImgUploadOpenFrame );
    input.container.on( 'click keydown', '.remove-button', input.czrImgUploadRemoveFile );
    input.container.on( 'click keydown', '.default-button', input.czrImgUploadRestoreDefault );

    input.bind( input.id + ':changed', function( to, from ){
      //retrieve new image if to is different from the saved one
      //NEED A BETTER WAY!
      //WE NEED an ATOMIC REFRESH!!!
      if ( ( input.attachment && input.attachment.id != to ) && from !== to ) {
        if ( ! to ) {
          input.attachment = {};
          input.renderImageUploaderTemplate();
        }
        wp.media.attachment( to ).fetch().done( function() {
          input.attachment = this.attributes;
          input.renderImageUploaderTemplate();
        });
      }//Standard reaction, the image has been updated by the user
      else if ( input.attachment && input.attachment.id === to ) {
        input.renderImageUploaderTemplate();
      }
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
    var input = this,
        module = input.module;

    var button_labels = this.getUploaderLabels();

     input.frame = wp.media({
       button: {
           text: button_labels.frame_button
       },
       states: [
           new wp.media.controller.Library({
             title:     button_labels.frame_title,
             library:   wp.media.query({ type: 'image' }),
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
      module = input.module;

    if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
      return;
    }
    event.preventDefault();
    /*Todo*/

    //reset the attachment class field to the default img
    input.attachment = {};
    //set the model
    input.set( {} );
  },

  /**
  * Called when the "Remove" link is clicked. Empties the setting.
  *
  * @param {object} event jQuery Event object
  */
  czrImgUploadRemoveFile: function( event ) {
    var input = this,
      module = input.module;

    if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
      return;
    }
    event.preventDefault();
    //reset the attachment class field
    input.attachment = {};
    //set the model
    input.set('');
  },


  /**
  * Callback handler for when an attachment is selected in the media modal.
  * Gets the selected image information, and sets it within the input.
  */
  czrImgUploadSelect: function() {
    var node,
        input = this,
        module = input.module,
        attachment   = input.frame.state().get( 'selection' ).first().toJSON(),  // Get the attachment from the modal frame.
        mejsSettings = window._wpmejsSettings || {};
    //save the attachment in a class field
    input.attachment = attachment;
    //set the model
    input.set(attachment.id);
  },




  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  renderImageUploaderTemplate: function() {
   var input  = this;

    //do we have view template script?
   if ( 0 === $( '#tmpl-czr-input-img-uploader-view-content' ).length )
     return;

   var view_template = wp.template('czr-input-img-uploader-view-content');

   //  //do we have an html template and a module container?
   if ( ! view_template  || ! input.container )
    return;

   var $_view_el    = input.container.find('.' + input.module.control.css_attr.img_upload_container );

   if ( ! $_view_el.length )
     return;

   var _template_params = {
      button_labels : input.getUploaderLabels(),
      settings      : input.id,
      attachment    : input.attachment,
      canUpload     : true
   };

   $_view_el.html( view_template( _template_params) );

   return true;
  },

  getUploaderLabels : function() {
    return serverControlParams.imgUploaderParams.button_labels;
  }
});//$.extend