
var CZRCroppedImageMethods = CZRCroppedImageMethods || {};

(function (api, $, _) {
  /* IMAGE UPLOADER CONTROL IN THE CUSTOMIZER */
  //CroppedImageControl is not available before wp 4.3
  if ( 'function' != typeof wp.media.controller.Cropper  || 'function' != typeof api.CroppedImageControl  )
    return;


    /* CZRCustomizeImage Cropper */
    /**
    * Custom version of:
    * wp.media.controller.CustomizeImageCropper (wp-includes/js/media-views.js)
    *
    * In order to use image destination sizes different than the suggested ones
    *
    * A state for cropping an image.
    *
    * @class
    * @augments wp.media.controller.Cropper
    * @augments wp.media.controller.State
    * @augments Backbone.Model
    */
    wp.media.controller.CZRCustomizeImageCropper = wp.media.controller.Cropper.extend({
      doCrop: function( attachment ) {
        var cropDetails = attachment.get( 'cropDetails' ),
            control = this.get( 'control' );

        cropDetails.dst_width  = control.params.dst_width;
        cropDetails.dst_height = control.params.dst_height;

        return wp.ajax.post( 'crop-image', {
            wp_customize: 'on',
            nonce: attachment.get( 'nonces' ).edit,
            id: attachment.get( 'id' ),
            context: control.id,
            cropDetails: cropDetails
        } );
      }
    });



    /* CZRCroppedImageControl */
    $.extend( CZRCroppedImageMethods , {
      /**
      * Create a media modal select frame, and store it so the instance can be reused when needed.
      * CZR: We don't want to crop svg (cropping fails), gif (animated gifs become static )
      * @Override
      * We need to override this in order to use our ImageCropper custom extension of wp.media.controller.Cropper
      *
      * See api.CroppedImageControl:initFrame() ( wp-admin/js/customize-controls.js )
      */
      initFrame: function() {

        var l10n = _wpMediaViewsL10n;

        this.frame = wp.media({
            button: {
                text: l10n.select,
                close: false
            },
            states: [
                new wp.media.controller.Library({
                    title: this.params.button_labels.frame_title,
                    library: wp.media.query({ type: 'image' }),
                    multiple: false,
                    date: false,
                    priority: 20,
                    suggestedWidth: this.params.width,
                    suggestedHeight: this.params.height
                }),
                new wp.media.controller.CZRCustomizeImageCropper({
                    imgSelectOptions: this.calculateImageSelectOptions,
                    control: this
                })
            ]
        });

        this.frame.on( 'select', this.onSelect, this );
        this.frame.on( 'cropped', this.onCropped, this );
        this.frame.on( 'skippedcrop', this.onSkippedCrop, this );
      },

      /**
      * After an image is selected in the media modal, switch to the cropper
      * state if the image isn't the right size.
      *
      * CZR: We don't want to crop svg (cropping fails), gif (animated gifs become static )
      * @Override
      * See api.CroppedImageControl:onSelect() ( wp-admin/js/customize-controls.js )
      */
      onSelect: function() {
        var attachment = this.frame.state().get( 'selection' ).first().toJSON();
        if ( ! ( attachment.mime && attachment.mime.indexOf("image") > -1 ) ){
          //Todo: better error handling, show some message?
          this.frame.trigger( 'content:error' );
          return;
        }
        if ( ( _.contains( ['image/svg+xml', 'image/gif'], attachment.mime ) ) || //do not crop gifs or svgs
                this.params.width === attachment.width && this.params.height === attachment.height && ! this.params.flex_width && ! this.params.flex_height ) {
            this.setImageFromAttachment( attachment );
            this.frame.close();
        } else {
            this.frame.setState( 'cropper' );
        }
      },
    });//Method definition

})( wp.customize, jQuery, _);
