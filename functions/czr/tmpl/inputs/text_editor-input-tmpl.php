<?php

//print the image uploader template
//used in multi input controls for example
//defined in the parent class
add_action( 'customize_controls_print_footer_scripts', 'hu_print_text_editor_input_template', 1 );
//add_action( 'customize_controls_print_footer_scripts', 'hu_print_text_content_editor_template', 0 );

/**
 * Render a JS template for the content of the image control.
 *
 * highly inspired by WP_Customize_Media_Control::content_template() .
 */
function hu_print_text_editor_input_template() {
?>
  <script type="text/html" id="tmpl-czr-input-text_editor-view-content">
    <button type="button" class="button text_editor-button"></button>
    <div class="text-preview-wrapper">
      <textarea readonly class="text-preview widefat" type="textarea" class="widefat" rows="2"></textarea>
    </div>
  </script>
<?php
}

function hu_print_text_content_editor_template() {
?>
  <div id="czr-customize-content_editor-pane">
    <div id="czr-customize-content_editor-dragbar">
      <span class="screen-reader-text"><?php _e( 'Resize Editor', 'hueman' ); ?></span>
    </div>

    <?php
      // The settings passed in here are derived from those used in edit-form-advanced.php.
      wp_editor( '', 'czr-customize-content_editor', array(
          '_content_editor_dfw' => false,
          'drag_drop_upload' => true,
          'tabfocus_elements' => 'content-html,save-post',
          'editor_height' => 200,
          'default_editor' => 'tinymce',
          'tinymce' => array(
            'resize' => false,
            'wp_autoresize_on' => false,
            'add_unload_trigger' => false,
          ),
      ) );
    ?>
  </div>
<?php
}