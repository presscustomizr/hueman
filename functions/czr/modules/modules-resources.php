<?php
/**
 * Enqueue a WP Editor instance we can use for rich text editing.
 */
//add_action( 'customize_controls_init', 'enqueue_editor' );
function enqueue_editor() {
  //add_action( 'customize_controls_print_footer_scripts', 'render_editor' , 0 );
  // @todo These should be included in \_WP_Editors::editor_settings()
  if ( false === has_action( 'customize_controls_print_footer_scripts', array( '_WP_Editors', 'enqueue_scripts' ) ) ) {
    add_action( 'customize_controls_print_footer_scripts', array( '_WP_Editors', 'enqueue_scripts' ) );
  }
}