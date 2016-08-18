<?php
/*****************************************************
* AJAX
*****************************************************/
add_action( 'wp_ajax_' . HU_OPT_AJAX_ACTION , 'hu_ajax_get_opt' );

add_action( 'wp_ajax_czr_skope_reset', 'hu_ajax_reset_skope' );
add_action( 'wp_ajax_czr_setting_reset', 'hu_ajax_reset_setting' );
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


function hu_ajax_reset_skope() {
    global $wp_customize;
    if ( ! $wp_customize->is_preview() ) {
        wp_send_json_error( 'not_preview' );
    } else if ( ! current_user_can( 'customize' ) ) {
        status_header( 403 );
        wp_send_json_error( 'customize_not_allowed' );
    } else if ( ! isset( $_SERVER['REQUEST_METHOD'] ) || 'POST' !== $_SERVER['REQUEST_METHOD'] ) {
      status_header( 405 );
      wp_send_json_error( 'bad_method' );
    }
    $action = 'save-customize_' . $wp_customize->get_stylesheet();
    if ( ! check_ajax_referer( $action, 'nonce', false ) ) {
        wp_send_json_error( 'invalid_nonce' );
    }
    // Do we have to switch themes?
    if ( ! $wp_customize->is_theme_active() ) {
        // Temporarily stop previewing the theme to allow switch_themes()
        // to operate properly.
        $wp_customize->stop_previewing_theme();
        switch_theme( $wp_customize->get_stylesheet() );
        update_option( 'theme_switched_via_customizer', true );
        $wp_customize->start_previewing_theme();
    }

    if ( ! isset( $_POST['opt_name'] )  || ! isset( $_POST['dyn_type'] ) )
      return wp_send_json_error();

    switch ( $_POST['dyn_type'] ) {
        case 'trans':
            $attempt = delete_transient( $_POST['opt_name'] );
          break;
        case 'post_meta':
            if ( ! isset( $_POST['obj_id'] ) ) {
              wp_send_json_error( 'Missing $_POST["obj_id"] when attempting to delete a post meta');
            }
            $attempt = delete_post_meta( $_POST['obj_id'] , $_POST['opt_name'] );
          break;
        case 'term_meta':
            if ( ! isset( $_POST['obj_id'] ) ) {
              wp_send_json_error( 'Missing $_POST["obj_id"] when attempting to delete a term meta');
            }
            $attempt = delete_term_meta( $_POST['obj_id'] , $_POST['opt_name'] );
          break;
        case 'user_meta':
            if ( ! isset( $_POST['obj_id'] ) ) {
              wp_send_json_error( 'Missing $_POST["obj_id"] when attempting to delete a user meta');
            }
            $attempt = delete_user_meta( $_POST['obj_id'] , $_POST['opt_name'] );
          break;
        case 'option' :
            $options = get_option( $_POST['opt_name'] );
            $_opts_to_keep = array();
            foreach ( $options as $key => $value ) {
                if ( in_array( $key, HU_Skop_Option::$_protected_options ) )
                  $_opts_to_keep[$key] = $value;
            }
            //wp_send_json_success( 'PROTECTED OPTIONS : ' . json_encode( HU_Skop_Option::$_protected_options ) );
            $attempt = update_option( $_POST['opt_name'], $_opts_to_keep );
          break;
    }
    if ( is_wp_error( $attempt ) ) {
      status_header( 500 );
      wp_send_json_error( $attempt->get_error_message() );
    }
    wp_send_json_success( $_POST['opt_name'] . ' has been deleted');
}




function hu_ajax_reset_setting() {
    global $wp_customize;
    if ( ! $wp_customize->is_preview() ) {
        wp_send_json_error( 'not_preview' );
    } else if ( ! current_user_can( 'customize' ) ) {
        status_header( 403 );
        wp_send_json_error( 'customize_not_allowed' );
    } else if ( ! isset( $_SERVER['REQUEST_METHOD'] ) || 'POST' !== $_SERVER['REQUEST_METHOD'] ) {
      status_header( 405 );
      wp_send_json_error( 'bad_method' );
    }
    $action = 'save-customize_' . $wp_customize->get_stylesheet();
    if ( ! check_ajax_referer( $action, 'nonce', false ) ) {
        wp_send_json_error( 'invalid_nonce' );
    }
    // Do we have to switch themes?
    if ( ! $wp_customize->is_theme_active() ) {
        // Temporarily stop previewing the theme to allow switch_themes()
        // to operate properly.
        $wp_customize->stop_previewing_theme();
        switch_theme( $wp_customize->get_stylesheet() );
        update_option( 'theme_switched_via_customizer', true );
        $wp_customize->start_previewing_theme();
    }

    if ( ! isset( $_POST['opt_name'] )  || ! isset( $_POST['dyn_type'] ) || ! isset( $_POST['set_id'] ) )
      return wp_send_json_error('Error when trying to reset an option, the ajax post request is missing a param.');

    $new_values = array();
    $short_opt_name = hu_extract_setting_name( $_POST['set_id'] );

    switch ( $_POST['dyn_type'] ) {
        case 'trans':
            $current_values = get_transient( $_POST['opt_name'] );
            foreach ( $current_values as $_id => $value) {
                if ( $short_opt_name != $_id )
                    $new_values[$_id] = $value;
            }
            $attempt = set_transient( $_POST['opt_name'], $new_values, 60*24*365*100 );
          break;

        case 'post_meta':
            if ( ! isset( $_POST['obj_id'] ) ) {
              wp_send_json_error( 'Missing $_POST["obj_id"] when attempting to delete a post meta');
            }
            $current_values = get_post_meta( $_POST['obj_id'] , $_POST['opt_name'], true );
            foreach ( $current_values as $_id => $value) {
                if ( $short_opt_name != $_id )
                    $new_values[$_id] = $value;
            }
            $attempt = update_post_meta( $_POST['obj_id'] , $_POST['opt_name'], $new_values );
          break;

        case 'term_meta':
            if ( ! isset( $_POST['obj_id'] ) ) {
              wp_send_json_error( 'Missing $_POST["obj_id"] when attempting to delete a term meta');
            }
            $current_values = get_term_meta( $_POST['obj_id'] , $_POST['opt_name'], true );
            foreach ( $current_values as $_id => $value) {
                if ( $short_opt_name != $_id )
                    $new_values[$_id] = $value;
            }
            $attempt = update_term_meta( $_POST['obj_id'] , $_POST['opt_name'], $new_values );
          break;

        case 'user_meta':
            if ( ! isset( $_POST['obj_id'] ) ) {
              wp_send_json_error( 'Missing $_POST["obj_id"] when attempting to delete a user meta');
            }
            $current_values = get_user_meta( $_POST['obj_id'] , $_POST['opt_name'], true );
            foreach ( $current_values as $_id => $value) {
                if ( $short_opt_name != $_id )
                    $new_values[$_id] = $value;
            }
            $attempt = update_user_meta( $_POST['obj_id'] , $_POST['opt_name'], $new_values );
          break;

        case 'option' :
            $current_values = HU_SKOP_OPT() -> hu_get_raw_theme_option();
            foreach ( $current_values as $_id => $value ) {
                if ( in_array( $_id, HU_Skop_Option::$_protected_options ) )
                  $new_values[$_id] = $value;
                else if ( $short_opt_name != $_id )
                  $new_values[$_id] = $value;
            }
            //wp_send_json_success( 'PROTECTED OPTIONS : ' . json_encode( HU_Skop_Option::$_protected_options ) );
            $attempt = update_option( $_POST['opt_name'], $new_values );
          break;
    }
    if ( is_wp_error( $attempt ) ) {
      status_header( 500 );
      wp_send_json_error( $attempt->get_error_message() );
    }
    wp_send_json_success( '||| ' . $_POST['set_id'] . ' has been deleted from ' . $_POST['dyn_type'] . ' |||' );
}