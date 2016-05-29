<?php
/*****************************************************
* AJAX
*****************************************************/
add_action( 'wp_ajax_' . HU_OPT_AJAX_ACTION , 'hu_ajax_get_opt' );


/**
 * Ajax handler for getting an attachment.
 *
 * @since 3.5.0
 */
function hu_ajax_get_opt() {
  if ( ! isset( $_REQUEST['opt_name'] ) || ! isset( $_REQUEST['dyn_type'] ) || ! isset( $_REQUEST['stylesheet'] ) )
    wp_send_json_error();
  if ( ! current_user_can( 'edit_theme_options' ) )
    wp_send_json_error();

  $_trans = get_transient( $_REQUEST['opt_name'] );
  wp_send_json_success( $_trans );
}
