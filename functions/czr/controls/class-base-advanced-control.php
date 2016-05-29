<?php
/***************************************************
* AUGMENTS WP CUSTOMIZE CONTROLS
***************************************************/
//A basis object to construct advanced controls
//inherits everything from WP_Customize_Control
if ( ! class_exists( 'HU_Advanced_Control' ) ) :
  class HU_Advanced_Control extends WP_Customize_Control {

    public function __construct( $manager, $id, $args = array() ) {
      parent::__construct($manager, $id, $args );
    }


    /**
     * Render a JS template for the content of the image control.
     *
     * highly inspired by WP_Customize_Media_Control::content_template() .
     */
    public function hu_print_view_image_uploader_template() {
    ?>
      <script type="text/html" id="tmpl-czr-img-uploader-view-content">
        <# if ( data.attachment && data.attachment.id ) { #>
          <div class="attachment-media-view attachment-media-view-{{ data.attachment.type }} {{ data.attachment.orientation }}">
            <div class="thumbnail thumbnail-{{ data.attachment.type }}">
              <# if ( 'image' === data.attachment.type && data.attachment.sizes && data.attachment.sizes.medium ) { #>
                <img class="attachment-thumb" src="{{ data.attachment.sizes.medium.url }}" draggable="false" alt="" />
              <# } else if ( 'image' === data.attachment.type && data.attachment.sizes && data.attachment.sizes.full ) { #>
                <img class="attachment-thumb" src="{{ data.attachment.sizes.full.url }}" draggable="false" alt="" />
              <# } #>
            </div>
            <div class="actions">
              <# if ( data.canUpload ) { #>
              <button type="button" class="button remove-button">{{ data.button_labels.remove }}</button>
              <button type="button" class="button upload-button control-focus" id="{{ data.settings['default'] }}-button">{{ data.button_labels.change }}</button>
              <div style="clear:both"></div>
              <# } #>
            </div>
          </div>
        <# } else { #>
          <div class="attachment-media-view">
            <div class="placeholder">
              {{ data.button_labels.placeholder }}
            </div>
            <div class="actions">
              <# if ( data.defaultAttachment ) { #>
                <button type="button" class="button default-button">{{ data.button_labels['default'] }}</button>
              <# } #>
              <# if ( data.canUpload ) { #>
              <button type="button" class="button upload-button" id="{{ data.settings['default'] }}-button">{{ data.button_labels.select }}</button>
              <# } #>
              <div style="clear:both"></div>
            </div>
          </div>
        <# } #>
      </script>
    <?php
    }
  }//class
endif;