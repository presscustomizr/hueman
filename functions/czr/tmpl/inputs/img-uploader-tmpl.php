<?php

//print the image uploader template
//used in multi input controls for example
//defined in the parent class
add_action( 'customize_controls_print_footer_scripts', 'hu_print_image_uploader_template', 1 );

/**
 * Render a JS template for the content of the image control.
 *
 * highly inspired by WP_Customize_Media_Control::content_template() .
 */
function hu_print_image_uploader_template() {
?>
  <script type="text/html" id="tmpl-czr-input-img-uploader-view-content">
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


//Add image uploader button_labels to translated strings
add_filter( 'controls_translated_strings', 'hu_add_translated_strings');
function hu_add_translated_strings( $strings) {
      return array_merge( $strings, array(
              'select_image'        => __( 'Select Image', 'hueman' ),
              'change_image'        => __( 'Change Image', 'hueman' ),
              'remove_image'        => __( 'Remove', 'hueman' ),
              'default_image'       => __( 'Default', 'hueman'  ),
              'placeholder_image'   => __( 'No image selected', 'hueman' ),
              'frame_title_image'   => __( 'Select Image', 'hueman' ),
              'frame_button_image'  => __( 'Choose Image', 'hueman' )
      ));
}