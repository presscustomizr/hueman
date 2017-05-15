<?php if ( ! defined( 'OT_VERSION' ) ) exit( 'No direct script access allowed' );

/**
 * Functions used only while viewing the admin UI.
 *
 * Limit loading these function only when needed
 * and not in the front end.
 *
 * @package   OptionTree
 * @author    Derek Herman <derek@valendesigns.com>
 * @copyright Copyright (c) 2013, Derek Herman
 * @since     2.0
 */






/**
 * Validate the options by type before saving.
 *
 * This function will run on only some of the option types
 * as all of them don't need to be validated, just the
 * ones users are going to input data into; because they
 * can't be trusted.
 *
 * @param     mixed     Setting value
 * @param     string    Setting type
 * @param     string    Setting field ID
 * @param     string    WPML field ID
 * @return    mixed
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_validate_setting' ) ) {

  function ot_validate_setting( $input, $type, $field_id, $wmpl_id = '' ) {

    /* exit early if missing data */
    if ( ! $input || ! $type || ! $field_id )
      return $input;

    $input = apply_filters( 'ot_validate_setting', $input, $type, $field_id );

    /* WPML Register and Unregister strings */
    if ( ! empty( $wmpl_id ) ) {

      /* Allow filtering on the WPML option types */
      $single_string_types = apply_filters( 'ot_wpml_option_types', array( 'text', 'textarea', 'textarea-simple' ) );

      if ( in_array( $type, $single_string_types ) ) {

        if ( ! empty( $input ) ) {

          ot_wpml_register_string( $wmpl_id, $input );

        } else {

          ot_wpml_unregister_string( $wmpl_id );

        }

      }

    }

    if ( 'background' == $type ) {

      $input['background-color'] = ot_validate_setting( $input['background-color'], 'colorpicker', $field_id );

      $input['background-image'] = ot_validate_setting( $input['background-image'], 'upload', $field_id );

      // Loop over array and check for values
      foreach( (array) $input as $key => $value ) {
        if ( ! empty( $value ) ) {
          $has_value = true;
        }
      }

      // No value; set to empty
      if ( ! isset( $has_value ) ) {
        $input = '';
      }

    } else if ( 'border' == $type ) {

      // Loop over array and set errors or unset key from array.
      foreach( $input as $key => $value ) {

        // Validate width
        if ( $key == 'width' && ! empty( $value ) && ! is_numeric( $value ) ) {

          $input[$key] = '0';

        }

        // Validate color
        if ( $key == 'color' && ! empty( $value ) ) {

          $input[$key] = ot_validate_setting( $value, 'colorpicker', $field_id );

        }

        // Unset keys with empty values.
        if ( empty( $value ) && strlen( $value ) == 0 ) {
          unset( $input[$key] );
        }

      }

      if ( empty( $input ) ) {
        $input = '';
      }

    } else if ( 'box-shadow' == $type ) {

      // Validate inset
      $input['inset'] = isset( $input['inset'] ) ? 'inset' : '';

      // Validate offset-x
      $input['offset-x'] = ot_validate_setting( $input['offset-x'], 'text', $field_id );

      // Validate offset-y
      $input['offset-y'] = ot_validate_setting( $input['offset-y'], 'text', $field_id );

      // Validate blur-radius
      $input['blur-radius'] = ot_validate_setting( $input['blur-radius'], 'text', $field_id );

      // Validate spread-radius
      $input['spread-radius'] = ot_validate_setting( $input['spread-radius'], 'text', $field_id );

      // Validate color
      $input['color'] = ot_validate_setting( $input['color'], 'colorpicker', $field_id );

      // Unset keys with empty values.
      foreach( $input as $key => $value ) {
        if ( empty( $value ) && strlen( $value ) == 0 ) {
          unset( $input[$key] );
        }
      }

      // Set empty array to empty string.
      if ( empty( $input ) ) {
        $input = '';
      }

    } else if ( 'colorpicker' == $type ) {

      /* return empty & set error */
      if ( 0 === preg_match( '/^#([a-f0-9]{6}|[a-f0-9]{3})$/i', $input ) && 0 === preg_match( '/^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]{1,4})\s*\)/i', $input ) ) {

        $input = '';

      }

    } else if ( 'colorpicker-opacity' == $type ) {

      // Not allowed
      if ( is_array( $input ) ) {
        $input = '';
      }

      // Validate color
      $input = ot_validate_setting( $input, 'colorpicker', $field_id );

    } else if ( in_array( $type, array( 'css', 'javascript', 'text', 'textarea', 'textarea-simple' ) ) ) {

      if ( ! current_user_can( 'unfiltered_html' ) && OT_ALLOW_UNFILTERED_HTML == false ) {

        $input = wp_kses_post( $input );

      }

    } else if ( 'dimension' == $type ) {

      // Loop over array and set error keys or unset key from array.
      foreach( $input as $key => $value ) {
        if ( ! empty( $value ) && ! is_numeric( $value ) && $key !== 'unit' ) {
          $errors[] = $key;
        }
        if ( empty( $value ) && strlen( $value ) == 0 ) {
          unset( $input[$key] );
        }
      }

      /* return 0 & set error */
      if ( isset( $errors ) ) {

        foreach( $errors as $error ) {

          $input[$error] = '0';



        }

      }

      if ( empty( $input ) ) {
        $input = '';
      }

    } else if ( 'google-fonts' == $type ) {

      unset($input['%key%']);

      // Loop over array and check for values
      if ( is_array( $input ) && ! empty( $input ) ) {
        $input = array_values( $input );
      }

      // No value; set to empty
      if ( empty( $input ) ) {
        $input = '';
      }

    } else if ( 'link-color' == $type ) {

      // Loop over array and check for values
      if ( is_array( $input ) && ! empty( $input ) ) {
        foreach( $input as $key => $value ) {
          if ( ! empty( $value ) ) {
            $input[$key] = ot_validate_setting( $input[$key], 'colorpicker', $field_id . '-' . $key );
            $has_value = true;
          }
        }
      }

      // No value; set to empty
      if ( ! isset( $has_value ) ) {
        $input = '';
      }

    } else if ( 'measurement' == $type ) {

      $input[0] = sanitize_text_field( $input[0] );

      // No value; set to empty
      if ( empty( $input[0] ) && strlen( $input[0] ) == 0 && empty( $input[1] ) ) {
        $input = '';
      }

    } else if ( 'spacing' == $type ) {

      // Loop over array and set error keys or unset key from array.
      foreach( $input as $key => $value ) {
        if ( ! empty( $value ) && ! is_numeric( $value ) && $key !== 'unit' ) {
          $errors[] = $key;
        }
        if ( empty( $value ) && strlen( $value ) == 0 ) {
          unset( $input[$key] );
        }
      }

      /* return 0 & set error */
      if ( isset( $errors ) ) {

        foreach( $errors as $error ) {

          $input[$error] = '0';



        }

      }

      if ( empty( $input ) ) {
        $input = '';
      }

    } else if ( 'typography' == $type && isset( $input['font-color'] ) ) {

      $input['font-color'] = ot_validate_setting( $input['font-color'], 'colorpicker', $field_id );

      // Loop over array and check for values
      foreach( $input as $key => $value ) {
        if ( ! empty( $value ) ) {
          $has_value = true;
        }
      }

      // No value; set to empty
      if ( ! isset( $has_value ) ) {
        $input = '';
      }

    } else if ( 'upload' == $type ) {

      if( filter_var( $input, FILTER_VALIDATE_INT ) === FALSE ) {
        $input = esc_url_raw( $input );
      }

    } else if ( 'gallery' == $type ) {

      $input = trim( $input );

    } else if ( 'social-links' == $type ) {

      // Loop over array and check for values, plus sanitize the text field
      foreach( (array) $input as $key => $value ) {
        if ( ! empty( $value ) && is_array( $value ) ) {
          foreach( (array) $value as $item_key => $item_value ) {
            if ( ! empty( $item_value ) ) {
              $has_value = true;
              $input[$key][$item_key] = sanitize_text_field( $item_value );
            }
          }
        }
      }

      // No value; set to empty
      if ( ! isset( $has_value ) ) {
        $input = '';
      }

    }

    $input = apply_filters( 'ot_after_validate_setting', $input, $type, $field_id );

    return $input;

  }

}



/**
 * Setup the default admin styles
 *
 * @return    void
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_admin_styles' ) ) {

  function ot_admin_styles() {
    global $wp_styles, $post;

    /* execute styles before actions */
    do_action( 'ot_admin_styles_before' );

    /* load WP colorpicker */
    wp_enqueue_style( 'wp-color-picker' );

    /* load admin styles */
    wp_enqueue_style( 'ot-admin-css', OT_URL . 'assets/css/ot-admin.css', false, time() );

    /* load the RTL stylesheet */
    $wp_styles->add_data( 'ot-admin-css','rtl', true );

    /* Remove styles added by the Easy Digital Downloads plugin */
    if ( isset( $post->post_type ) && $post->post_type == 'post' )
      wp_dequeue_style( 'jquery-ui-css' );

    /**
     * Filter the screen IDs used to dequeue `jquery-ui-css`.
     *
     * @since 2.5.0
     *
     * @param array $screen_ids An array of screen IDs.
     */
    $screen_ids = apply_filters( 'ot_dequeue_jquery_ui_css_screen_ids', array(
      'toplevel_page_ot-settings',
      'optiontree_page_ot-documentation',
      'appearance_page_ot-theme-options'
    ) );

    /* Remove styles added by the WP Review plugin and any custom pages added through filtering */
    if ( in_array( get_current_screen()->id, $screen_ids ) ) {
      wp_dequeue_style( 'plugin_name-admin-ui-css' );
      wp_dequeue_style( 'jquery-ui-css' );
    }

    /* execute styles after actions */
    do_action( 'ot_admin_styles_after' );

  }

}

/**
 * Setup the default admin scripts
 *
 * @uses      add_thickbox()          Include Thickbox for file uploads
 * @uses      wp_enqueue_script()     Add OptionTree scripts
 * @uses      wp_localize_script()    Used to include arbitrary Javascript data
 *
 * @return    void
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_admin_scripts' ) ) {

  function ot_admin_scripts() {

    /* execute scripts before actions */
    do_action( 'ot_admin_scripts_before' );

    if ( function_exists( 'wp_enqueue_media' ) ) {
      /* WP 3.5 Media Uploader */
      wp_enqueue_media();
    } else {
      /* Legacy Thickbox */
      add_thickbox();
    }

    /* Hueman doesn't need date and time picker jquery plugins
    * we remove them for compatibility reasons.
    * See : https://github.com/presscustomizr/hueman/issues/454
    */

    /* load jQuery-ui slider */
    wp_enqueue_script( 'jquery-ui-slider' );

    /* load jQuery-ui datepicker */
    //wp_enqueue_script( 'jquery-ui-datepicker' );

    /* load WP colorpicker */
    wp_enqueue_script( 'wp-color-picker' );

    /* load Ace Editor for CSS Editing */
    wp_enqueue_script( 'ace-editor', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js', null, '1.1.3' );

    /* load jQuery UI timepicker addon */
    //wp_enqueue_script( 'jquery-ui-timepicker', OT_URL . 'assets/js/vendor/jquery/jquery-ui-timepicker.js', array( 'jquery', 'jquery-ui-slider', 'jquery-ui-datepicker' ), '1.4.3' );

    /* load the post formats */
    if ( OT_META_BOXES == true && OT_POST_FORMATS == true ) {
      wp_enqueue_script( 'ot-postformats', OT_URL . 'assets/js/ot-postformats.js', array( 'jquery' ), '1.0.1' );
    }

    /* load all the required scripts */
    wp_enqueue_script( 'ot-admin-js', OT_URL . 'assets/js/ot-admin.js', array(
      'jquery',
      'jquery-ui-tabs',
      'jquery-ui-sortable',
      'jquery-ui-slider',
      'wp-color-picker',
      'ace-editor',
    //  'jquery-ui-datepicker',
    //  'jquery-ui-timepicker'
    ), OT_VERSION );

    /* create localized JS array */
    $localized_array = array(
      'ajax'                  => admin_url( 'admin-ajax.php' ),
      'upload_text'           => apply_filters( 'ot_upload_text', 'Send to OptionTree' ),
      'remove_media_text'     => 'Remove Media',
      'reset_agree'           => 'Are you sure you want to reset back to the defaults?',
      'remove_no'             => 'You can\'t remove this! But you can edit the values.',
      'remove_agree'          => 'Are you sure you want to remove this?',
      'activate_layout_agree' => 'Are you sure you want to activate this layout?',
      'setting_limit'         => 'Sorry, you can\'t have settings three levels deep.',
      'delete'                => 'Delete Gallery',
      'edit'                  => 'Edit Gallery',
      'create'                => 'Create Gallery',
      'confirm'               => 'Are you sure you want to delete this Gallery?',
      'date_current'          => 'Today',
      'date_time_current'     => 'Now',
      'date_close'            => 'Close',
      'replace'               => 'Featured Image',
      'with'                  => 'Image'
    );

    /* localized script attached to 'option_tree' */
    wp_localize_script( 'ot-admin-js', 'option_tree', $localized_array );

    /* execute scripts after actions */
    do_action( 'ot_admin_scripts_after' );

  }

}

/**
 * Returns the ID of a custom post type by post_title.
 *
 * @uses        get_results()
 *
 * @return      int
 *
 * @access      public
 * @since       2.0
 */
if ( ! function_exists( 'ot_get_media_post_ID' ) ) {

  function ot_get_media_post_ID() {

    // Option ID
    $option_id = 'ot_media_post_ID';

    // Get the media post ID
    $post_ID = get_option( $option_id, false );

    // Add $post_ID to the DB
    if ( $post_ID === false || empty( $post_ID ) ) {
      global $wpdb;

      // Get the media post ID
      $post_ID = $wpdb->get_var( "SELECT ID FROM $wpdb->posts WHERE `post_title` = 'Media' AND `post_type` = 'option-tree' AND `post_status` = 'private'" );

      // Add to the DB
      if ( $post_ID !== null )
        update_option( $option_id, $post_ID );

    }

    return $post_ID;

  }

}

/**
 * Register custom post type & create the media post used to attach images.
 *
 * @uses        get_results()
 *
 * @return      void
 *
 * @access      public
 * @since       2.0
 */
if ( ! function_exists( 'ot_create_media_post' ) ) {

  function ot_create_media_post() {

    $regsiter_post_type = 'register_' . 'post_type';
    $regsiter_post_type( 'option-tree', array(
      'labels'              => array( 'name' => 'Option Tree' ),
      'public'              => false,
      'show_ui'             => false,
      'capability_type'     => 'post',
      'exclude_from_search' => true,
      'hierarchical'        => false,
      'rewrite'             => false,
      'supports'            => array( 'title', 'editor' ),
      'can_export'          => false,
      'show_in_nav_menus'   => false
    ) );

    /* look for custom page */
    $post_id = ot_get_media_post_ID();

    /* no post exists */
    if ( $post_id == 0 ) {

      /* create post object */
      $_p = array();
      $_p['post_title']     = 'Media';
      $_p['post_name']      = 'media';
      $_p['post_status']    = 'private';
      $_p['post_type']      = 'option-tree';
      $_p['comment_status'] = 'closed';
      $_p['ping_status']    = 'closed';

      /* insert the post into the database */
      wp_insert_post( $_p );

    }

  }

}



/**
 * Helper function to update the CSS option type after save.
 *
 * @return    void
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_save_css' ) ) {

  function ot_save_css( $options ) {

    /* grab a copy of the settings */
    $settings = get_option( ot_settings_id() );

    /* has settings */
    if ( isset( $settings['settings'] ) ) {

      /* loop through sections and insert CSS when needed */
      foreach( $settings['settings'] as $k => $setting ) {

        /* is the CSS option type */
        if ( isset( $setting['type'] ) && 'css' == $setting['type'] ) {

          /* insert CSS into dynamic.css */
          if ( isset( $options[$setting['id']] ) && '' !== $options[$setting['id']] ) {

            ot_insert_css_with_markers( $setting['id'], $options[$setting['id']] );

          /* remove old CSS from dynamic.css */
          } else {

            ot_remove_old_css( $setting['id'] );

          }

        }

      }

    }

  }

}

/**
 * Helper function to load filters for XML mime type.
 *
 * @return    void
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_add_xml_to_upload_filetypes' ) ) {

  function ot_add_xml_to_upload_filetypes() {

    add_filter( 'upload_mimes', 'ot_upload_mimes' );
    add_filter( 'wp_mime_type_icon', 'ot_xml_mime_type_icon', 10, 2 );

  }

}

/**
 * Filter 'upload_mimes' and add xml.
 *
 * @param     array     $mimes An array of valid upload mime types
 * @return    array
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_upload_mimes' ) ) {

  function ot_upload_mimes( $mimes ) {

    $mimes['xml'] = 'application/xml';

    return $mimes;

  }

}

/**
 * Filters 'wp_mime_type_icon' and have xml display as a document.
 *
 * @param     string    $icon The mime icon
 * @param     string    $mime The mime type
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_xml_mime_type_icon' ) ) {

  function ot_xml_mime_type_icon( $icon, $mime ) {

    if ( $mime == 'application/xml' || $mime == 'text/xml' )
      return wp_mime_type_icon( 'document' );

    return $icon;

  }

}






/**
 * Save settings array before the screen is displayed.
 *
 * @return    void
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_save_settings' ) ) {

  function ot_save_settings() {

    /* check and verify import settings nonce */
    if ( isset( $_POST['option_tree_settings_nonce'] ) && wp_verify_nonce( $_POST['option_tree_settings_nonce'], 'option_tree_settings_form' ) ) {

      /* settings value */
      $settings = isset( $_POST[ot_settings_id()] ) ? $_POST[ot_settings_id()] : '';

      /* validate sections */
      if ( isset( $settings['sections'] ) ) {

        /* fix numeric keys since drag & drop will change them */
        $settings['sections'] = array_values( $settings['sections'] );

        /* loop through sections */
        foreach( $settings['sections'] as $k => $section ) {

          /* remove from array if missing values */
          if ( ( ! isset( $section['title'] ) && ! isset( $section['id'] ) ) || ( '' == $section['title'] && '' == $section['id'] ) ) {

            unset( $settings['sections'][$k] );

          } else {

            /* validate label */
            if ( '' != $section['title'] ) {

             $settings['sections'][$k]['title'] = wp_kses_post( $section['title'] );

            }

            /* missing title set to unfiltered ID */
            if ( ! isset( $section['title'] ) || '' == $section['title'] ) {

              $settings['sections'][$k]['title'] = wp_kses_post( $section['id'] );

            /* missing ID set to title */
            } else if ( ! isset( $section['id'] ) || '' == $section['id'] ) {

              $section['id'] = wp_kses_post( $section['title'] );

            }

            /* sanitize ID once everything has been checked first */
            $settings['sections'][$k]['id'] = ot_sanitize_option_id( wp_kses_post( $section['id'] ) );

          }

        }

        $settings['sections'] = ot_stripslashes( $settings['sections'] );

      }

      /* validate settings by looping over array as many times as it takes */
      if ( isset( $settings['settings'] ) ) {

        $settings['settings'] = ot_validate_settings_array( $settings['settings'] );

      }

      /* validate contextual_help */
      if ( isset( $settings['contextual_help']['content'] ) ) {

        /* fix numeric keys since drag & drop will change them */
        $settings['contextual_help']['content'] = array_values( $settings['contextual_help']['content'] );

        /* loop through content */
        foreach( $settings['contextual_help']['content'] as $k => $content ) {

          /* remove from array if missing values */
          if ( ( ! isset( $content['title'] ) && ! isset( $content['id'] ) ) || ( '' == $content['title'] && '' == $content['id'] ) ) {

            unset( $settings['contextual_help']['content'][$k] );

          } else {

            /* validate label */
            if ( '' != $content['title'] ) {

             $settings['contextual_help']['content'][$k]['title'] = wp_kses_post( $content['title'] );

            }

            /* missing title set to unfiltered ID */
            if ( ! isset( $content['title'] ) || '' == $content['title'] ) {

              $settings['contextual_help']['content'][$k]['title'] = wp_kses_post( $content['id'] );

            /* missing ID set to title */
            } else if ( ! isset( $content['id'] ) || '' == $content['id'] ) {

              $content['id'] = wp_kses_post( $content['title'] );

            }

            /* sanitize ID once everything has been checked first */
            $settings['contextual_help']['content'][$k]['id'] = ot_sanitize_option_id( wp_kses_post( $content['id'] ) );

          }

          /* validate textarea description */
          if ( isset( $content['content'] ) ) {

            $settings['contextual_help']['content'][$k]['content'] = wp_kses_post( $content['content'] );

          }

        }

      }

      /* validate contextual_help sidebar */
      if ( isset( $settings['contextual_help']['sidebar'] ) ) {

        $settings['contextual_help']['sidebar'] = wp_kses_post( $settings['contextual_help']['sidebar'] );

      }

      $settings['contextual_help'] = ot_stripslashes( $settings['contextual_help'] );

      /* default message */
      $message = 'failed';

      /* is array: save & show success message */
      if ( is_array( $settings ) ) {

        /* WPML unregister ID's that have been removed */
        if ( function_exists( 'icl_unregister_string' ) ) {

          $current = get_option( ot_settings_id() );
          $options = get_option( ot_options_id() );

          if ( isset( $current['settings'] ) ) {

            /* Empty ID array */
            $new_ids = array();

            /* Build the WPML IDs array */
            foreach( $settings['settings'] as $setting ) {

              if ( $setting['id'] ) {

                $new_ids[] = $setting['id'];

              }

            }

            /* Remove missing IDs from WPML */
            foreach( $current['settings'] as $current_setting ) {

              if ( ! in_array( $current_setting['id'], $new_ids ) ) {

                if ( ! empty( $options[$current_setting['id']] ) && in_array( $current_setting['type'], array( 'list-item', 'slider' ) ) ) {

                  foreach( $options[$current_setting['id']] as $key => $value ) {

                    foreach( $value as $ckey => $cvalue ) {

                      ot_wpml_unregister_string( $current_setting['id'] . '_' . $ckey . '_' . $key );

                    }

                  }

                } else if ( ! empty( $options[$current_setting['id']] ) && $current_setting['type'] == 'social-icons' ) {

                  foreach( $options[$current_setting['id']] as $key => $value ) {

                    foreach( $value as $ckey => $cvalue ) {

                      ot_wpml_unregister_string( $current_setting['id'] . '_' . $ckey . '_' . $key );

                    }

                  }

                } else {

                  ot_wpml_unregister_string( $current_setting['id'] );

                }

              }

            }

          }

        }

        update_option( ot_settings_id(), $settings );
        $message = 'success';

      }

      /* redirect */
      wp_redirect( esc_url_raw( add_query_arg( array( 'action' => 'save-settings', 'message' => $message ), $_POST['_wp_http_referer'] ) ) );
      exit;

    }

    return false;

  }

}

/**
 * Validate the settings array before save.
 *
 * This function will loop over the settings array as many
 * times as it takes to validate every sub setting.
 *
 * @param     array     $settings The array of settings.
 * @return    array
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_validate_settings_array' ) ) {

  function ot_validate_settings_array( $settings = array() ) {

    /* validate settings */
    if ( count( $settings ) > 0 ) {

      /* fix numeric keys since drag & drop will change them */
      $settings = array_values( $settings );

      /* loop through settings */
      foreach( $settings as $k => $setting ) {


        /* remove from array if missing values */
        if ( ( ! isset( $setting['label'] ) && ! isset( $setting['id'] ) ) || ( '' == $setting['label'] && '' == $setting['id'] ) ) {

          unset( $settings[$k] );

        } else {

          /* validate label */
          if ( '' != $setting['label'] ) {

            $settings[$k]['label'] = wp_kses_post( $setting['label'] );

          }

          /* missing label set to unfiltered ID */
          if ( ! isset( $setting['label'] ) || '' == $setting['label'] ) {

            $settings[$k]['label'] = $setting['id'];

          /* missing ID set to label */
          } else if ( ! isset( $setting['id'] ) || '' == $setting['id'] ) {

            $setting['id'] = wp_kses_post( $setting['label'] );

          }

          /* sanitize ID once everything has been checked first */
          $settings[$k]['id'] = ot_sanitize_option_id( wp_kses_post( $setting['id'] ) );

        }

        /* validate description */
        if ( '' != $setting['desc']  ) {

          $settings[$k]['desc'] = wp_kses_post( $setting['desc'] );

        }

        /* validate choices */
        if ( isset( $setting['choices'] ) ) {

          /* loop through choices */
          foreach( $setting['choices'] as $ck => $choice ) {

            /* remove from array if missing values */
            if ( ( ! isset( $choice['label'] ) && ! isset( $choice['value'] ) ) || ( '' == $choice['label'] && '' == $choice['value'] ) ) {

              unset( $setting['choices'][$ck] );

            } else {

              /* missing label set to unfiltered ID */
              if ( ! isset( $choice['label'] ) || '' == $choice['label'] ) {

                $setting['choices'][$ck]['label'] = wp_kses_post( $choice['value'] );

              /* missing value set to label */
              } else if ( ! isset( $choice['value'] ) || '' == $choice['value'] ) {

                $setting['choices'][$ck]['value'] = ot_sanitize_option_id( wp_kses_post( $choice['label'] ) );

              }

            }

          }

          /* update keys and push new array values */
          $settings[$k]['choices'] = array_values( $setting['choices'] );

        }

        /* validate sub settings */
        if ( isset( $setting['settings'] ) ) {

          $settings[$k]['settings'] = ot_validate_settings_array( $setting['settings'] );

        }

      }

    }

    /* return array but strip those damn slashes out first!!! */
    return ot_stripslashes( $settings );

  }

}

/**
 * Save layouts array before the screen is displayed.
 *
 * @return    void
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_modify_layouts' ) ) {

  function ot_modify_layouts() {

    /* check and verify modify layouts nonce */
    if ( isset( $_POST['option_tree_modify_layouts_nonce'] ) && wp_verify_nonce( $_POST['option_tree_modify_layouts_nonce'], 'option_tree_modify_layouts_form' ) ) {

      /* previous layouts value */
      $option_tree_layouts = get_option( ot_layouts_id() );

      /* new layouts value */
      $layouts = isset( $_POST[ot_layouts_id()] ) ? $_POST[ot_layouts_id()] : '';

      /* rebuild layout array */
      $rebuild = array();

      /* validate layouts */
      if ( is_array( $layouts ) && ! empty( $layouts ) ) {

        /* setup active layout */
        if ( isset( $layouts['active_layout'] ) && ! empty( $layouts['active_layout'] ) ) {
          $rebuild['active_layout'] = $layouts['active_layout'];
        }

        /* add new and overwrite active layout */
        if ( isset( $layouts['_add_new_layout_'] ) && ! empty( $layouts['_add_new_layout_'] ) ) {
          $rebuild['active_layout'] = ot_sanitize_layout_id( $layouts['_add_new_layout_'] );
          $rebuild[$rebuild['active_layout']] = ot_encode( serialize( get_option( ot_options_id() ) ) );
        }

        $first_layout = '';

        /* loop through layouts */
        foreach( $layouts as $key => $layout ) {

          /* skip over active layout key */
          if ( $key == 'active_layout' )
            continue;

          /* check if the key exists then set value */
          if ( isset( $option_tree_layouts[$key] ) && ! empty( $option_tree_layouts[$key] ) ) {
            $rebuild[$key] = $option_tree_layouts[$key];
            if ( '' == $first_layout ) {
              $first_layout = $key;
            }
          }

        }

        if ( isset( $rebuild['active_layout'] ) && ! isset( $rebuild[$rebuild['active_layout']] ) && ! empty( $first_layout ) ) {
          $rebuild['active_layout'] = $first_layout;
        }

      }

      /* default message */
      $message = 'failed';

      /* is array: save & show success message */
      if ( count( $rebuild ) > 1 ) {

        /* rebuild the theme options */
        $rebuild_option_tree = unserialize( ot_decode( $rebuild[$rebuild['active_layout']] ) );
        if ( is_array( $rebuild_option_tree ) ) {

          /* execute the action hook and pass the theme options to it */
          do_action( 'ot_before_theme_options_save', $rebuild_option_tree );

          update_option( ot_options_id(), $rebuild_option_tree );

        }

        /* rebuild the layouts */
        update_option( ot_layouts_id(), $rebuild );

        /* change message */
        $message = 'success';

      } else if ( count( $rebuild ) <= 1 ) {

        /* delete layouts option */
        delete_option( ot_layouts_id() );

        /* change message */
        $message = 'deleted';

      }

      /* redirect */
      if ( isset( $_REQUEST['page'] ) && $_REQUEST['page'] == apply_filters( 'ot_theme_options_menu_slug', 'ot-theme-options' ) ) {
        $query_args = esc_url_raw( add_query_arg( array( 'settings-updated' => 'layout' ), remove_query_arg( array( 'action', 'message' ), $_POST['_wp_http_referer'] ) ) );
      } else {
        $query_args = esc_url_raw( add_query_arg( array( 'action' => 'save-layouts', 'message' => $message ), $_POST['_wp_http_referer'] ) );
      }
      wp_redirect( $query_args );
      exit;

    }

    return false;

  }

}

/**
 * Helper function to display alert messages.
 *
 * @param     array     Page array
 * @return    mixed
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_alert_message' ) ) {

  function ot_alert_message( $page = array() ) {

    if ( empty( $page ) )
      return false;

    $before = apply_filters( 'ot_before_page_messages', '', $page );

    if ( $before ) {
      return $before;
    }

    $action = isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : '';
    $message = isset( $_REQUEST['message'] ) ? $_REQUEST['message'] : '';
    $updated = isset( $_REQUEST['settings-updated'] ) ? $_REQUEST['settings-updated'] : '';

    return false;

  }

}

/**
 * Setup the default option types.
 *
 * The returned option types are filterable so you can add your own.
 * This is not a task for a beginner as you'll need to add the function
 * that displays the option to the user and validate the saved data.
 *
 * @return    array
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_option_types_array' ) ) {

  function ot_option_types_array() {

    return apply_filters( 'ot_option_types_array', array(
      'text'                      => 'Text',
      'textarea'                  => 'Textarea',
      'upload'                    => 'Upload',
      'radio-image'               => 'Radio Image',
      'sidebar-select'            => 'Sidebar Select',
    ) );

  }
}

/**
 * Map old option types for rebuilding XML and Table data.
 *
 * @param     string      $type The old option type
 * @return    string      The new option type
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_map_old_option_types' ) ) {

  function ot_map_old_option_types( $type = '' ) {

    if ( ! $type )
      return 'text';

    $types = array(
      'background'        => 'background',
      'category'          => 'category-select',
      'categories'        => 'category-checkbox',
      'checkbox'          => 'checkbox',
      'colorpicker'       => 'colorpicker',
      'css'               => 'css',
      'custom_post'       => 'custom-post-type-select',
      'custom_posts'      => 'custom-post-type-checkbox',
      'input'             => 'text',
      'image'             => 'upload',
      'measurement'       => 'measurement',
      'page'              => 'page-select',
      'pages'             => 'page-checkbox',
      'post'              => 'post-select',
      'posts'             => 'post-checkbox',
      'radio'             => 'radio',
      'select'            => 'select',
      'slider'            => 'slider',
      'tag'               => 'tag-select',
      'tags'              => 'tag-checkbox',
      'textarea'          => 'textarea',
      'textblock'         => 'textblock',
      'typography'        => 'typography',
      'upload'            => 'upload'
    );

    if ( isset( $types[$type] ) )
      return $types[$type];

    return false;

  }
}

/**
 * Filters the typography font-family to add Google fonts dynamically.
 *
 * @param     array     $families An array of all recognized font families.
 * @param     string    $field_id ID of the feild being filtered.
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
function ot_google_font_stack( $families, $field_id ) {

  $ot_google_fonts = get_theme_mod( 'ot_google_fonts', array() );
  $ot_set_google_fonts = get_theme_mod( 'ot_set_google_fonts', array() );

  if ( ! empty( $ot_set_google_fonts ) ) {
    foreach( $ot_set_google_fonts as $id => $sets ) {
      foreach( $sets as $value ) {
        $family = isset( $value['family'] ) ? $value['family'] : '';
        if ( $family && isset( $ot_google_fonts[$family] ) ) {
          $spaces = explode(' ', $ot_google_fonts[$family]['family'] );
          $font_stack = count( $spaces ) > 1 ? '"' . $ot_google_fonts[$family]['family'] . '"': $ot_google_fonts[$family]['family'];
          $families[$family] = apply_filters( 'ot_google_font_stack', $font_stack, $family, $field_id );
        }
      }
    }
  }

  return $families;
}
add_filter( 'ot_recognized_font_families', 'ot_google_font_stack', 1, 2 );

/**
 * Recognized font families
 *
 * Returns an array of all recognized font families.
 * Keys are intended to be stored in the database
 * while values are ready for display in html.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_font_families' ) ) {

  function ot_recognized_font_families( $field_id = '' ) {

    $families = array(
      'arial'     => 'Arial',
      'georgia'   => 'Georgia',
      'helvetica' => 'Helvetica',
      'palatino'  => 'Palatino',
      'tahoma'    => 'Tahoma',
      'times'     => '"Times New Roman", sans-serif',
      'trebuchet' => 'Trebuchet',
      'verdana'   => 'Verdana'
    );

    return apply_filters( 'ot_recognized_font_families', $families, $field_id );

  }

}

/**
 * Recognized font sizes
 *
 * Returns an array of all recognized font sizes.
 *
 * @uses      apply_filters()
 *
 * @param     string  $field_id ID that's passed to the filters.
 * @return    array
 *
 * @access    public
 * @since     2.0.12
 */
if ( ! function_exists( 'ot_recognized_font_sizes' ) ) {

  function ot_recognized_font_sizes( $field_id ) {

    $range = ot_range(
      apply_filters( 'ot_font_size_low_range', 0, $field_id ),
      apply_filters( 'ot_font_size_high_range', 150, $field_id ),
      apply_filters( 'ot_font_size_range_interval', 1, $field_id )
    );

    $unit = apply_filters( 'ot_font_size_unit_type', 'px', $field_id );

    foreach( $range as $k => $v ) {
      $range[$k] = $v . $unit;
    }

    return apply_filters( 'ot_recognized_font_sizes', $range, $field_id );
  }

}

/**
 * Recognized font styles
 *
 * Returns an array of all recognized font styles.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_font_styles' ) ) {

  function ot_recognized_font_styles( $field_id = '' ) {

    return apply_filters( 'ot_recognized_font_styles', array(
      'normal'  => 'Normal',
      'italic'  => 'Italic',
      'oblique' => 'Oblique',
      'inherit' => 'Inherit'
    ), $field_id );

  }

}

/**
 * Recognized font variants
 *
 * Returns an array of all recognized font variants.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_font_variants' ) ) {

  function ot_recognized_font_variants( $field_id = '' ) {

    return apply_filters( 'ot_recognized_font_variants', array(
      'normal'      => 'Normal',
      'small-caps'  => 'Small Caps',
      'inherit'     => 'Inherit'
    ), $field_id );

  }

}

/**
 * Recognized font weights
 *
 * Returns an array of all recognized font weights.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_font_weights' ) ) {

  function ot_recognized_font_weights( $field_id = '' ) {

    return apply_filters( 'ot_recognized_font_weights', array(
      'normal'    => 'Normal',
      'bold'      => 'Bold',
      'bolder'    => 'Bolder',
      'lighter'   => 'Lighter',
      '100'       => '100',
      '200'       => '200',
      '300'       => '300',
      '400'       => '400',
      '500'       => '500',
      '600'       => '600',
      '700'       => '700',
      '800'       => '800',
      '900'       => '900',
      'inherit'   => 'Inherit'
    ), $field_id );

  }

}

/**
 * Recognized letter spacing
 *
 * Returns an array of all recognized line heights.
 *
 * @uses      apply_filters()
 *
 * @param     string  $field_id ID that's passed to the filters.
 * @return    array
 *
 * @access    public
 * @since     2.0.12
 */
if ( ! function_exists( 'ot_recognized_letter_spacing' ) ) {

  function ot_recognized_letter_spacing( $field_id ) {

    $range = ot_range(
      apply_filters( 'ot_letter_spacing_low_range', -0.1, $field_id ),
      apply_filters( 'ot_letter_spacing_high_range', 0.1, $field_id ),
      apply_filters( 'ot_letter_spacing_range_interval', 0.01, $field_id )
    );

    $unit = apply_filters( 'ot_letter_spacing_unit_type', 'em', $field_id );

    foreach( $range as $k => $v ) {
      $range[$k] = $v . $unit;
    }

    return apply_filters( 'ot_recognized_letter_spacing', $range, $field_id );
  }

}

/**
 * Recognized line heights
 *
 * Returns an array of all recognized line heights.
 *
 * @uses      apply_filters()
 *
 * @param     string  $field_id ID that's passed to the filters.
 * @return    array
 *
 * @access    public
 * @since     2.0.12
 */
if ( ! function_exists( 'ot_recognized_line_heights' ) ) {

  function ot_recognized_line_heights( $field_id ) {

    $range = ot_range(
      apply_filters( 'ot_line_height_low_range', 0, $field_id ),
      apply_filters( 'ot_line_height_high_range', 150, $field_id ),
      apply_filters( 'ot_line_height_range_interval', 1, $field_id )
    );

    $unit = apply_filters( 'ot_line_height_unit_type', 'px', $field_id );

    foreach( $range as $k => $v ) {
      $range[$k] = $v . $unit;
    }

    return apply_filters( 'ot_recognized_line_heights', $range, $field_id );
  }

}

/**
 * Recognized text decorations
 *
 * Returns an array of all recognized text decorations.
 * Keys are intended to be stored in the database
 * while values are ready for display in html.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.0.10
 */
if ( ! function_exists( 'ot_recognized_text_decorations' ) ) {

  function ot_recognized_text_decorations( $field_id = '' ) {

    return apply_filters( 'ot_recognized_text_decorations', array(
      'blink'         => 'Blink',
      'inherit'       => 'Inherit',
      'line-through'  => 'Line Through',
      'none'          => 'None',
      'overline'      => 'Overline',
      'underline'     => 'Underline'
    ), $field_id );

  }

}

/**
 * Recognized text transformations
 *
 * Returns an array of all recognized text transformations.
 * Keys are intended to be stored in the database
 * while values are ready for display in html.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.0.10
 */
if ( ! function_exists( 'ot_recognized_text_transformations' ) ) {

  function ot_recognized_text_transformations( $field_id = '' ) {

    return apply_filters( 'ot_recognized_text_transformations', array(
      'capitalize'  => 'Capitalize',
      'inherit'     => 'Inherit',
      'lowercase'   => 'Lowercase',
      'none'        => 'None',
      'uppercase'   => 'Uppercase'
    ), $field_id );

  }

}

/**
 * Recognized background repeat
 *
 * Returns an array of all recognized background repeat values.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_background_repeat' ) ) {

  function ot_recognized_background_repeat( $field_id = '' ) {

    return apply_filters( 'ot_recognized_background_repeat', array(
      'no-repeat' => 'No Repeat',
      'repeat'    => 'Repeat All',
      'repeat-x'  => 'Repeat Horizontally',
      'repeat-y'  => 'Repeat Vertically',
      'inherit'   => 'Inherit'
    ), $field_id );

  }

}

/**
 * Recognized background attachment
 *
 * Returns an array of all recognized background attachment values.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_background_attachment' ) ) {

  function ot_recognized_background_attachment( $field_id = '' ) {

    return apply_filters( 'ot_recognized_background_attachment', array(
      "fixed"   => "Fixed",
      "scroll"  => "Scroll",
      "inherit" => "Inherit"
    ), $field_id );

  }

}

/**
 * Recognized background position
 *
 * Returns an array of all recognized background position values.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_recognized_background_position' ) ) {

  function ot_recognized_background_position( $field_id = '' ) {

    return apply_filters( 'ot_recognized_background_position', array(
      "left top"      => "Left Top",
      "left center"   => "Left Center",
      "left bottom"   => "Left Bottom",
      "center top"    => "Center Top",
      "center center" => "Center Center",
      "center bottom" => "Center Bottom",
      "right top"     => "Right Top",
      "right center"  => "Right Center",
      "right bottom"  => "Right Bottom"
    ), $field_id );

  }

}

/**
 * Border Styles
 *
 * Returns an array of all available style types.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_border_style_types' ) ) {

  function ot_recognized_border_style_types( $field_id = '' ) {

    return apply_filters( 'ot_recognized_border_style_types', array(
      'hidden' => 'Hidden',
      'dashed' => 'Dashed',
      'solid'  => 'Solid',
      'double' => 'Double',
      'groove' => 'Groove',
      'ridge'  => 'Ridge',
      'inset'  => 'Inset',
      'outset' => 'Outset',
    ), $field_id );

  }

}

/**
 * Border Units
 *
 * Returns an array of all available unit types.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_border_unit_types' ) ) {

  function ot_recognized_border_unit_types( $field_id = '' ) {

    return apply_filters( 'ot_recognized_border_unit_types', array(
      'px' => 'px',
      '%'  => '%',
      'em' => 'em',
      'pt' => 'pt'
    ), $field_id );

  }

}

/**
 * Dimension Units
 *
 * Returns an array of all available unit types.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_dimension_unit_types' ) ) {

  function ot_recognized_dimension_unit_types( $field_id = '' ) {

    return apply_filters( 'ot_recognized_dimension_unit_types', array(
      'px' => 'px',
      '%'  => '%',
      'em' => 'em',
      'pt' => 'pt'
    ), $field_id );

  }

}

/**
 * Spacing Units
 *
 * Returns an array of all available unit types.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_spacing_unit_types' ) ) {

  function ot_recognized_spacing_unit_types( $field_id = '' ) {

    return apply_filters( 'ot_recognized_spacing_unit_types', array(
      'px' => 'px',
      '%'  => '%',
      'em' => 'em',
      'pt' => 'pt'
    ), $field_id );

  }

}

/**
 * Recognized Google font families
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_google_font_families' ) ) {

  function ot_recognized_google_font_families( $field_id ) {

    $families = array();
    $ot_google_fonts = get_theme_mod( 'ot_google_fonts', array() );

    // Forces an array rebuild when we sitch themes
    if ( empty( $ot_google_fonts ) ) {
      $ot_google_fonts = ot_fetch_google_fonts( true, true );
    }

    foreach( (array) $ot_google_fonts as $key => $item ) {

      if ( isset( $item['family'] ) ) {

        $families[ $key ] = $item['family'];

      }

    }

    return apply_filters( 'ot_recognized_google_font_families', $families, $field_id );

  }

}

/**
 * Recognized Google font variants
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_google_font_variants' ) ) {

  function ot_recognized_google_font_variants( $field_id, $family ) {

    $variants = array();
    $ot_google_fonts = get_theme_mod( 'ot_google_fonts', array() );

    if ( isset( $ot_google_fonts[ $family ]['variants'] ) ) {

      $variants = $ot_google_fonts[ $family ]['variants'];

    }

    return apply_filters( 'ot_recognized_google_font_variants', $variants, $field_id, $family );

  }

}

/**
 * Recognized Google font subsets
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
if ( ! function_exists( 'ot_recognized_google_font_subsets' ) ) {

  function ot_recognized_google_font_subsets( $field_id, $family ) {

    $subsets = array();
    $ot_google_fonts = get_theme_mod( 'ot_google_fonts', array() );

    if ( isset( $ot_google_fonts[ $family ]['subsets'] ) ) {

      $subsets = $ot_google_fonts[ $family ]['subsets'];

    }

    return apply_filters( 'ot_recognized_google_font_subsets', $subsets, $field_id, $family );

  }

}

/**
 * Measurement Units
 *
 * Returns an array of all available unit types.
 * Renamed in version 2.0 to avoid name collisions.
 *
 * @uses      apply_filters()
 *
 * @return    array
 *
 * @access    public
 * @since     1.1.8
 * @updated   2.0
 */
if ( ! function_exists( 'ot_measurement_unit_types' ) ) {

  function ot_measurement_unit_types( $field_id = '' ) {

    return apply_filters( 'ot_measurement_unit_types', array(
      'px' => 'px',
      '%'  => '%',
      'em' => 'em',
      'pt' => 'pt'
    ), $field_id );

  }

}




/**
 * Helper function to loop over the option types.
 *
 * @param    array    $type The current option type.
 *
 * @return   string
 *
 * @access   public
 * @since    2.0
 */
if ( ! function_exists( 'ot_loop_through_option_types' ) ) {

  function ot_loop_through_option_types( $type = '', $child = false ) {

    $content = '';
    $types = ot_option_types_array();

    if ( $child )
      unset($types['list-item']);

    foreach( $types as $key => $value )
      $content.= '<option value="' . $key . '" ' . selected( $type, $key, false ) . '>'  . $value . '</option>';

    return $content;

  }

}

/**
 * Helper function to loop over choices.
 *
 * @param    string     $name The form element name.
 * @param    array      $choices The array of choices.
 *
 * @return   string
 *
 * @access   public
 * @since    2.0
 */
if ( ! function_exists( 'ot_loop_through_choices' ) ) {

  function ot_loop_through_choices( $name, $choices = array() ) {

    $content = '';

    foreach( (array) $choices as $key => $choice )
      $content.= '<li class="ui-state-default list-choice">' . ot_choices_view( $name, $key, $choice ) . '</li>';

    return $content;
  }

}

/**
 * Helper function to loop over sub settings.
 *
 * @param    string     $name The form element name.
 * @param    array      $settings The array of settings.
 *
 * @return   string
 *
 * @access   public
 * @since    2.0
 */
if ( ! function_exists( 'ot_loop_through_sub_settings' ) ) {

  function ot_loop_through_sub_settings( $name, $settings = array() ) {

    $content = '';

    foreach( $settings as $key => $setting )
      $content.= '<li class="ui-state-default list-sub-setting">' . ot_settings_view( $name, $key, $setting ) . '</li>';

    return $content;
  }

}


/**
 * Helper function to display list items.
 *
 * This function is used in AJAX to add a new list items
 * and when they have already been added and saved.
 *
 * @param     string    $name The form field name.
 * @param     int       $key The array key for the current element.
 * @param     array     An array of values for the current list item.
 *
 * @return   void
 *
 * @access   public
 * @since    2.0
 */
if ( ! function_exists( 'ot_list_item_view' ) ) {

  function ot_list_item_view( $name, $key, $list_item = array(), $post_id = 0, $get_option = '', $settings = array(), $type = '' ) {

    /* required title setting */
    $required_setting = array(
      array(
        'id'        => 'title',
        'label'     => 'Title',
        'desc'      => '',
        'std'       => '',
        'type'      => 'text',
        'rows'      => '',
        'class'     => 'option-tree-setting-title',
        'post_type' => '',
        'choices'   => array()
      )
    );

    /* load the old filterable slider settings */
    if ( 'slider' == $type ) {

      $settings = ot_slider_settings( $name );

    }

    /* if no settings array load the filterable list item settings */
    if ( empty( $settings ) ) {

      $settings = ot_list_item_settings( $name );

    }

    /* merge the two settings array */
    $settings = array_merge( $required_setting, $settings );

    echo '
    <div class="option-tree-setting">
      <div class="open">' . ( isset( $list_item['title'] ) ? esc_attr( $list_item['title'] ) : '' ) . '</div>
      <div class="button-section">

      </div>
      <div class="option-tree-setting-body">';

      foreach( $settings as $field ) {

        // Set field value
        $field_value = isset( $list_item[$field['id']] ) ? $list_item[$field['id']] : '';

        /* set default to standard value */
        if ( isset( $field['std'] ) ) {
          $field_value = ot_filter_std_value( $field_value, $field['std'] );
        }

        // filter the title label and description
        if ( $field['id'] == 'title' ) {

          // filter the label
          $field['label'] = apply_filters( 'ot_list_item_title_label', $field['label'], $name );

          // filter the description
          $field['desc'] = apply_filters( 'ot_list_item_title_desc', $field['desc'], $name );

        }

        /* make life easier */
        $_field_name = $get_option ? $get_option . '[' . $name . ']' : $name;

        /* build the arguments array */
        $_args = array(
          'type'              => $field['type'],
          'field_id'          => $name . '_' . $field['id'] . '_' . $key,
          'field_name'        => $_field_name . '[' . $key . '][' . $field['id'] . ']',
          'field_value'       => $field_value,
          'field_desc'        => isset( $field['desc'] ) ? $field['desc'] : '',
          'field_std'         => isset( $field['std'] ) ? $field['std'] : '',
          'field_rows'        => isset( $field['rows'] ) ? $field['rows'] : 10,
          'field_post_type'   => isset( $field['post_type'] ) && ! empty( $field['post_type'] ) ? $field['post_type'] : 'post',
          'field_taxonomy'    => isset( $field['taxonomy'] ) && ! empty( $field['taxonomy'] ) ? $field['taxonomy'] : 'category',
          'field_min_max_step'=> isset( $field['min_max_step'] ) && ! empty( $field['min_max_step'] ) ? $field['min_max_step'] : '0,100,1',
          'field_class'       => isset( $field['class'] ) ? $field['class'] : '',
          'field_condition'   => isset( $field['condition'] ) ? $field['condition'] : '',
          'field_operator'    => isset( $field['operator'] ) ? $field['operator'] : 'and',
          'field_choices'     => isset( $field['choices'] ) && ! empty( $field['choices'] ) ? $field['choices'] : array(),
          'field_settings'    => isset( $field['settings'] ) && ! empty( $field['settings'] ) ? $field['settings'] : array(),
          'post_id'           => $post_id,
          'get_option'        => $get_option
        );

        $conditions = '';

        /* setup the conditions */
        if ( isset( $field['condition'] ) && ! empty( $field['condition'] ) ) {

          /* doing magic on the conditions so they work in a list item */
          $conditionals = explode( ',', $field['condition'] );
          foreach( $conditionals as $condition ) {
            $parts = explode( ':', $condition );
            if ( isset( $parts[0] ) ) {
              $field['condition'] = str_replace( $condition, $name . '_' . $parts[0] . '_' . $key . ':' . $parts[1], $field['condition'] );
            }
          }

          $conditions = ' data-condition="' . $field['condition'] . '"';
          $conditions.= isset( $field['operator'] ) && in_array( $field['operator'], array( 'and', 'AND', 'or', 'OR' ) ) ? ' data-operator="' . $field['operator'] . '"' : '';

        }

        // Build the setting CSS class
        if ( ! empty( $_args['field_class'] ) ) {

          $classes = explode( ' ', $_args['field_class'] );

          foreach( $classes as $_key => $value ) {

            $classes[$_key] = $value . '-wrap';

          }

          $class = 'format-settings ' . implode( ' ', $classes );

        } else {

          $class = 'format-settings';

        }

        /* option label */
        echo '<div id="setting_' . $_args['field_id'] . '" class="' . $class . '"' . $conditions . '>';

          /* don't show title with textblocks */
          if ( $_args['type'] != 'textblock' && ! empty( $field['label'] ) ) {
            echo '<div class="format-setting-label">';
              echo '<h3 class="label">' . esc_attr( $field['label'] ) . '</h3>';
            echo '</div>';
          }

          /* only allow simple textarea inside a list-item due to known DOM issues with wp_editor() */
          if ( apply_filters( 'ot_override_forced_textarea_simple', false, $field['id'] ) == false && $_args['type'] == 'textarea' )
            $_args['type'] = 'textarea-simple';

          /* option body, list-item is not allowed inside another list-item */
          if ( $_args['type'] !== 'list-item' && $_args['type'] !== 'slider' ) {
            echo ot_display_by_type( $_args );
          }

        echo '</div>';

      }

      echo '</div>';

    echo '</div>';

  }

}


/**
 * Helper function to validate option ID's
 *
 * @param     string      $input The string to sanitize.
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_sanitize_option_id' ) ) {

  function ot_sanitize_option_id( $input ) {

    return preg_replace( '/[^a-z0-9]/', '_', trim( strtolower( $input ) ) );

  }

}

/**
 * Helper function to validate layout ID's
 *
 * @param     string      $input The string to sanitize.
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_sanitize_layout_id' ) ) {

  function ot_sanitize_layout_id( $input ) {

    return preg_replace( '/[^a-z0-9]/', '-', trim( strtolower( $input ) ) );

  }

}

/**
 * Convert choices array to string
 *
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_convert_array_to_string' ) ) {

  function ot_convert_array_to_string( $input ) {

    if ( is_array( $input ) ) {

      foreach( $input as $k => $choice ) {
        $choices[$k] = $choice['value'] . '|' . $choice['label'];

        if ( isset( $choice['src'] ) )
          $choices[$k].= '|' . $choice['src'];

      }

      return implode( ',', $choices );
    }

    return false;
  }
}

/**
 * Convert choices string to array
 *
 * @return    array
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_convert_string_to_array' ) ) {

  function ot_convert_string_to_array( $input ) {

    if ( '' !== $input ) {

      /* empty choices array */
      $choices = array();

      /* exlode the string into an array */
      foreach( explode( ',', $input ) as $k => $choice ) {

        /* if ":" is splitting the string go deeper */
        if ( preg_match( '/\|/', $choice ) ) {
          $split = explode( '|', $choice );
          $choices[$k]['value'] = trim( $split[0] );
          $choices[$k]['label'] = trim( $split[1] );

          /* if radio image there are three values */
          if ( isset( $split[2] ) )
            $choices[$k]['src'] = trim( $split[2] );

        } else {
          $choices[$k]['value'] = trim( $choice );
          $choices[$k]['label'] = trim( $choice );
        }

      }

      /* return a formated choices array */
      return $choices;

    }

    return false;

  }
}

/**
 * Helper function - strpos() with arrays.
 *
 * @param     string    $haystack
 * @param     array     $needles
 * @return    bool
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_strpos_array' ) ) {

  function ot_strpos_array( $haystack, $needles = array() ) {

    foreach( $needles as $needle ) {
      $pos = strpos( $haystack, $needle );
      if ( $pos !== false ) {
        return true;
      }
    }

    return false;
  }

}

/**
 * Helper function - strpos() with arrays.
 *
 * @param     string    $haystack
 * @param     array     $needles
 * @return    bool
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_array_keys_exists' ) ) {

  function ot_array_keys_exists( $array, $keys ) {

    foreach($keys as $k) {
      if ( isset($array[$k]) ) {
        return true;
      }
    }

    return false;
  }

}

/**
 * Custom stripslashes from single value or array.
 *
 * @param       mixed   $input
 * @return      mixed
 *
 * @access      public
 * @since       2.0
 */
if ( ! function_exists( 'ot_stripslashes' ) ) {

  function ot_stripslashes( $input ) {

    if ( is_array( $input ) ) {

      foreach( $input as &$val ) {

        if ( is_array( $val ) ) {

          $val = ot_stripslashes( $val );

        } else {

          $val = stripslashes( trim( $val ) );

        }

      }

    } else {

      $input = stripslashes( trim( $input ) );

    }

    return $input;

  }

}

/**
 * Reverse wpautop.
 *
 * @param     string    $string The string to be filtered
 * @return    string
 *
 * @access    public
 * @since     2.0.9
 */
if ( ! function_exists( 'ot_reverse_wpautop' ) ) {

  function ot_reverse_wpautop( $string = '' ) {

    /* return if string is empty */
    if ( trim( $string ) === '' )
      return '';

    /* remove all new lines & <p> tags */
    $string = str_replace( array( "\n", "<p>" ), "", $string );

    /* replace <br /> with \r */
    $string = str_replace( array( "<br />", "<br>", "<br/>" ), "\r", $string );

    /* replace </p> with \r\n */
    $string = str_replace( "</p>", "\r\n", $string );

    /* return clean string */
    return trim( $string );

  }

}

/**
 * Returns an array of elements from start to limit, inclusive.
 *
 * Occasionally zero will be some impossibly large number to
 * the "E" power when creating a range from negative to positive.
 * This function attempts to fix that by setting that number back to "0".
 *
 * @param     string    $start First value of the sequence.
 * @param     string    $limit The sequence is ended upon reaching the limit value.
 * @param     string    $step If a step value is given, it will be used as the increment
 *                      between elements in the sequence. step should be given as a
 *                      positive number. If not specified, step will default to 1.
 * @return    array
 *
 * @access    public
 * @since     2.0.12
 */
function ot_range( $start, $limit, $step = 1 ) {

  if ( $step < 0 )
    $step = 1;

  $range = range( $start, $limit, $step );

  foreach( $range as $k => $v ) {
    if ( strpos( $v, 'E' ) ) {
      $range[$k] = 0;
    }
  }

  return $range;
}

/**
 * Helper function to return encoded strings
 *
 * @return    string
 *
 * @access    public
 * @since     2.0.13
 */
function ot_encode( $value ) {

  $func = 'base64' . '_encode';
  return $func( $value );

}

/**
 * Helper function to return decoded strings
 *
 * @return    string
 *
 * @access    public
 * @since     2.0.13
 */
function ot_decode( $value ) {

  $func = 'base64' . '_decode';
  return $func( $value );

}

/**
 * Helper function to open a file
 *
 * @access    public
 * @since     2.0.13
 */
function ot_file_open( $handle, $mode ) {

  $func = 'f' . 'open';
  return @$func( $handle, $mode );

}

/**
 * Helper function to close a file
 *
 * @access    public
 * @since     2.0.13
 */
function ot_file_close( $handle ) {

  $func = 'f' . 'close';
  return $func( $handle );

}

/**
 * Helper function to write to an open file
 *
 * @access    public
 * @since     2.0.13
 */
function ot_file_write( $handle, $string ) {

  $func = 'f' . 'write';
  return $func( $handle, $string );

}

/**
 * Helper function to filter standard option values.
 *
 * @param     mixed     $value Saved string or array value
 * @param     mixed     $std Standard string or array value
 * @return    mixed     String or array
 *
 * @access    public
 * @since     2.0.15
 */
function ot_filter_std_value( $value = '', $std = '' ) {

  $std = maybe_unserialize( $std );

  if ( is_array( $value ) && is_array( $std ) ) {

    foreach( $value as $k => $v ) {

      if ( '' == $value[$k] && isset( $std[$k] ) ) {

        $value[$k] = $std[$k];

      }

    }

  } else if ( '' == $value && ! empty( $std ) ) {

    $value = $std;

  }

  return $value;

}

/**
 * Helper function to set the Google fonts array.
 *
 * @param     string    $id The option ID.
 * @param     bool      $value The option value
 * @return    void
 *
 * @access    public
 * @since     2.5.0
 */
function ot_set_google_fonts( $id = '', $value = '' ) {

  $ot_set_google_fonts = get_theme_mod( 'ot_set_google_fonts', array() );

  if ( is_array( $value ) && ! empty( $value ) ) {
    $ot_set_google_fonts[$id] = $value;
  } else if ( isset( $ot_set_google_fonts[$id] ) ) {
    unset( $ot_set_google_fonts[$id] );
  }

  set_theme_mod( 'ot_set_google_fonts', $ot_set_google_fonts );

}

/**
 * Helper function to remove unused options from the Google fonts array.
 *
 * @param     array     $options The array of saved options.
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
function ot_update_google_fonts_after_save( $options ) {

  $ot_set_google_fonts = get_theme_mod( 'ot_set_google_fonts', array() );

  foreach( $ot_set_google_fonts as $key => $set ) {
    if ( ! isset( $options[$key] ) ) {
      unset( $ot_set_google_fonts[$key] );
    }
  }
  set_theme_mod( 'ot_set_google_fonts', $ot_set_google_fonts );

}
//add_action( 'ot_after_theme_options_save', 'ot_update_google_fonts_after_save', 1 );

/**
 * Helper function to fetch the Google fonts array.
 *
 * @param     bool      $normalize Whether or not to return a normalized array. Default 'true'.
 * @param     bool      $force_rebuild Whether or not to force the array to be rebuilt. Default 'false'.
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
function ot_fetch_google_fonts( $normalize = true, $force_rebuild = false ) {

  /* Google Fonts cache key */
  $ot_google_fonts_cache_key = apply_filters( 'ot_google_fonts_cache_key', 'ot_google_fonts_cache' );

  /* get the fonts from cache */
  $ot_google_fonts = apply_filters( 'ot_google_fonts_cache', get_transient( $ot_google_fonts_cache_key ) );

  if ( $force_rebuild || ! is_array( $ot_google_fonts ) || empty( $ot_google_fonts ) ) {

    $ot_google_fonts = array();

    /* API url and key */
    $ot_google_fonts_api_url = apply_filters( 'ot_google_fonts_api_url', 'https://www.googleapis.com/webfonts/v1/webfonts' );
    $ot_google_fonts_api_key = apply_filters( 'ot_google_fonts_api_key', 'AIzaSyB8G-4UtQr9fhDYTiNrDP40Y5GYQQKrNWI' );

    /* API arguments */
    $ot_google_fonts_fields = apply_filters( 'ot_google_fonts_fields', array( 'family', 'variants', 'subsets' ) );
    $ot_google_fonts_sort   = apply_filters( 'ot_google_fonts_sort', 'alpha' );

    /* Initiate API request */
    $ot_google_fonts_query_args = array(
      'key'    => $ot_google_fonts_api_key,
      'fields' => 'items(' . implode( ',', $ot_google_fonts_fields ) . ')',
      'sort'   => $ot_google_fonts_sort
    );

    /* Build and make the request */
    $ot_google_fonts_query = esc_url_raw( add_query_arg( $ot_google_fonts_query_args, $ot_google_fonts_api_url ) );
    $ot_google_fonts_response = wp_safe_remote_get( $ot_google_fonts_query, array( 'sslverify' => false, 'timeout' => 15 ) );

    /* continue if we got a valid response */
    if ( 200 == wp_remote_retrieve_response_code( $ot_google_fonts_response ) ) {

      if ( $response_body = wp_remote_retrieve_body( $ot_google_fonts_response ) ) {

        /* JSON decode the response body and cache the result */
        $ot_google_fonts_data = json_decode( trim( $response_body ), true );

        if ( is_array( $ot_google_fonts_data ) && isset( $ot_google_fonts_data['items'] ) ) {

          $ot_google_fonts = $ot_google_fonts_data['items'];

          // Normalize the array key
          $ot_google_fonts_tmp = array();
          foreach( $ot_google_fonts as $key => $value ) {
            $id = remove_accents( $value['family'] );
            $id = strtolower( $id );
            $id = preg_replace( '/[^a-z0-9_\-]/', '', $id );
            $ot_google_fonts_tmp[$id] = $value;
          }

          $ot_google_fonts = $ot_google_fonts_tmp;
          set_theme_mod( 'ot_google_fonts', $ot_google_fonts );
          set_transient( $ot_google_fonts_cache_key, $ot_google_fonts, WEEK_IN_SECONDS );

        }

      }

    }

  }

  return $normalize ? ot_normalize_google_fonts( $ot_google_fonts ) : $ot_google_fonts;

}

/**
 * Helper function to normalize the Google fonts array.
 *
 * @param     array     $google_fonts An array of fonts to nrmalize.
 * @return    array
 *
 * @access    public
 * @since     2.5.0
 */
function ot_normalize_google_fonts( $google_fonts ) {

  $ot_normalized_google_fonts = array();

  if ( is_array( $google_fonts ) && ! empty( $google_fonts ) ) {

    foreach( $google_fonts as $google_font ) {

      if( isset( $google_font['family'] ) ) {

        $id = str_replace( ' ', '+', $google_font['family'] );

        $ot_normalized_google_fonts[ $id ] = array(
          'family' => $google_font['family']
        );

        if( isset( $google_font['variants'] ) ) {

          $ot_normalized_google_fonts[ $id ]['variants'] = $google_font['variants'];

        }

        if( isset( $google_font['subsets'] ) ) {

          $ot_normalized_google_fonts[ $id ]['subsets'] = $google_font['subsets'];

        }

      }

    }

  }

  return $ot_normalized_google_fonts;

}

/**
 * Helper function to register a WPML string
 *
 * @access    public
 * @since     2.1
 */
function ot_wpml_register_string( $id, $value ) {

  if ( function_exists( 'icl_register_string' ) ) {

    icl_register_string( 'Theme Options', $id, $value );

  }

}

/**
 * Helper function to unregister a WPML string
 *
 * @access    public
 * @since     2.1
 */
function ot_wpml_unregister_string( $id ) {

  if ( function_exists( 'icl_unregister_string' ) ) {

    icl_unregister_string( 'Theme Options', $id );

  }

}

/**
 * Maybe migrate Settings
 *
 * @return    void
 *
 * @access    public
 * @since     2.3.3
 */
if ( ! function_exists( 'ot_maybe_migrate_settings' ) ) {

  function ot_maybe_migrate_settings() {

    // Filter the ID to migrate from
    $settings_id = apply_filters( 'ot_migrate_settings_id', '' );

    // Attempt to migrate Settings
    if ( ! empty( $settings_id ) && get_option( ot_settings_id() ) === false && ot_settings_id() !== $settings_id ) {

      // Old settings
      $settings = get_option( $settings_id );

      // Check for array keys
      if ( isset( $settings['sections'] ) && isset( $settings['settings'] ) ) {

        update_option( ot_settings_id(), $settings );

      }

    }

  }

}

/**
 * Maybe migrate Option
 *
 * @return    void
 *
 * @access    public
 * @since     2.3.3
 */
if ( ! function_exists( 'ot_maybe_migrate_options' ) ) {

  function ot_maybe_migrate_options() {

    // Filter the ID to migrate from
    $options_id = apply_filters( 'ot_migrate_options_id', '' );

    // Attempt to migrate Theme Options
    if ( ! empty( $options_id ) && get_option( ot_options_id() ) === false && ot_options_id() !== $options_id ) {

      // Old options
      $options = get_option( $options_id );

      // Migrate to new ID
      update_option( ot_options_id(), $options );

    }

  }

}

/**
 * Maybe migrate Layouts
 *
 * @return    void
 *
 * @access    public
 * @since     2.3.3
 */
if ( ! function_exists( 'ot_maybe_migrate_layouts' ) ) {

  function ot_maybe_migrate_layouts() {

    // Filter the ID to migrate from
    $layouts_id = apply_filters( 'ot_migrate_layouts_id', '' );

    // Attempt to migrate Layouts
    if ( ! empty( $layouts_id ) && get_option( ot_layouts_id() ) === false && ot_layouts_id() !== $layouts_id ) {

      // Old options
      $layouts = get_option( $layouts_id );

      // Migrate to new ID
      update_option( ot_layouts_id(), $layouts );

    }

  }

}






/**
 * Returns the option type by ID.
 *
 * @param     string    $option_id The option ID
 * @return    string    $settings_id The settings array ID
 * @return    string    The option type.
 *
 * @access    public
 * @since     2.4.2
 */
if ( ! function_exists( 'ot_get_option_type_by_id' ) ) {

  function ot_get_option_type_by_id( $option_id, $settings_id = '' ) {

    if ( empty( $settings_id ) ) {

      $settings_id = ot_settings_id();

    }

    $settings = get_option( $settings_id, array() );

    if ( isset( $settings['settings'] ) ) {

      foreach( $settings['settings'] as $value ) {

        if ( $option_id == $value['id'] && isset( $value['type'] ) ) {

          return $value['type'];

        }

      }

    }

    return false;

  }

}

/**
 * Build an array of potential Theme Options that could share terms
 *
 * @return    array
 *
 * @access    private
 * @since     2.5.4
 */
function _ot_settings_potential_shared_terms() {

  $options      = array();
  $settings     = get_option( ot_settings_id(), array() );
  $option_types = array(
    'category-checkbox',
    'category-select',
    'tag-checkbox',
    'tag-select',
    'taxonomy-checkbox',
    'taxonomy-select'
  );

  if ( isset( $settings['settings'] ) ) {

    foreach( $settings['settings'] as $value ) {

      if ( isset( $value['type'] ) ) {

        if ( $value['type'] == 'list-item' && isset( $value['settings'] ) ) {

          $saved = ot_get_option( $value['id'] );

          foreach( $value['settings'] as $item ) {

            if ( isset( $value['id'] ) && isset( $item['type'] ) && in_array( $item['type'], $option_types ) ) {
              $sub_options = array();

              foreach( $saved as $sub_key => $sub_value ) {
                if ( isset( $sub_value[$item['id']] ) ) {
                  $sub_options[$sub_key] = $sub_value[$item['id']];
                }
              }

              if ( ! empty( $sub_options ) ) {
                $options[] = array(
                  'id'       => $item['id'],
                  'taxonomy' => $value['taxonomy'],
                  'parent'   => $value['id'],
                  'value'    => $sub_options
                );
              }
            }

          }

        }

        if ( in_array( $value['type'], $option_types ) ) {
          $saved = ot_get_option( $value['id'] );
          if ( ! empty( $saved ) ) {
            $options[] = array(
              'id'       => $value['id'],
              'taxonomy' => $value['taxonomy'],
              'value'    => $saved
            );
          }
        }

      }

    }

  }

  return $options;

}

/**
 * Build an array of potential Meta Box options that could share terms
 *
 * @return    array
 *
 * @access    private
 * @since     2.5.4
 */
function _ot_meta_box_potential_shared_terms() {
  global $ot_meta_boxes;

  $options      = array();
  $settings     = $ot_meta_boxes;
  $option_types = array(
    'category-checkbox',
    'category-select',
    'tag-checkbox',
    'tag-select',
    'taxonomy-checkbox',
    'taxonomy-select'
  );

  foreach( $settings as $setting ) {

    if ( isset( $setting['fields'] ) ) {

      foreach( $setting['fields'] as $value ) {

        if ( isset( $value['type'] ) ) {

          if ( $value['type'] == 'list-item' && isset( $value['settings'] ) ) {

            $children = array();

            foreach( $value['settings'] as $item ) {

              if ( isset( $value['id'] ) && isset( $item['type'] ) && in_array( $item['type'], $option_types ) ) {

                $children[$value['id']][] = $item['id'];

              }

            }

            if ( ! empty( $children[$value['id']] ) ) {
              $options[] = array(
                'id'       => $value['id'],
                'children' => $children[$value['id']],
                'taxonomy' => $value['taxonomy'],
              );
            }

          }

          if ( in_array( $value['type'], $option_types ) ) {

            $options[] = array(
              'id'       => $value['id'],
              'taxonomy' => $value['taxonomy'],
            );

          }

        }

      }

    }

  }

  return $options;

}

/**
 * Update terms when a term gets split.
 *
 * @param     int     $term_id ID of the formerly shared term.
 * @param     int     $new_term_id ID of the new term created for the $term_taxonomy_id.
 * @param     int     $term_taxonomy_id ID for the term_taxonomy row affected by the split.
 * @param     string  $taxonomy Taxonomy for the split term.
 * @return    void
 *
 * @access    public
 * @since     2.5.4
 */
function ot_split_shared_term( $term_id, $new_term_id, $term_taxonomy_id, $taxonomy ) {

  // Process the Theme Options
  $settings    = _ot_settings_potential_shared_terms();
  $old_options = get_option( ot_options_id(), array() );
  $new_options = $old_options;

  // Process the saved settings
  if ( ! empty( $settings ) && ! empty( $old_options ) ) {

    // Loop over the Theme Options
    foreach( $settings as $option ) {

      if ( ! is_array( $option['taxonomy'] ) ) {
        $option['taxonomy'] = explode( ',', $option['taxonomy'] );
      }

      if ( ! in_array( $taxonomy, $option['taxonomy'] ) ) {
        continue;
      }

      // The option ID was found
      if ( array_key_exists( $option['id'], $old_options ) || ( isset( $option['parent'] ) && array_key_exists( $option['parent'], $old_options ) ) ) {

        // This is a list item, we have to go deeper
        if ( isset( $option['parent'] ) ) {

          // Loop over the array
          foreach( $option['value'] as $key => $value ) {

            // The value is an array of IDs
            if ( is_array( $value ) ) {

              // Loop over the sub array
              foreach( $value as $sub_key => $sub_value ) {

                if ( $sub_value == $term_id ) {

                  unset( $new_options[$option['parent']][$key][$option['id']][$sub_key] );
                  $new_options[$option['parent']][$key][$option['id']][$new_term_id] = $new_term_id;

                }

              }

            } else if ( $value == $term_id ) {

              unset( $new_options[$option['parent']][$key][$option['id']] );
              $new_options[$option['parent']][$key][$option['id']] = $new_term_id;

            }

          }

        } else {

          // The value is an array of IDs
          if ( is_array( $option['value'] ) ) {

            // Loop over the array
            foreach( $option['value'] as $key => $value ) {

              // It's a single value, just replace it
              if ( $value == $term_id ) {

                unset( $new_options[$option['id']][$key] );
                $new_options[$option['id']][$new_term_id] = $new_term_id;

              }

            }

          // It's a single value, just replace it
          } else if ( $option['value'] == $term_id ) {

            $new_options[$option['id']] = $new_term_id;

          }

        }

      }

    }

  }

  // Options need to be updated
  if ( $old_options !== $new_options ) {
    update_option( ot_options_id(), $new_options );
  }

  // Process the Meta Boxes
  $meta_settings = _ot_meta_box_potential_shared_terms();
  $option_types  = array(
    'category-checkbox',
    'category-select',
    'tag-checkbox',
    'tag-select',
    'taxonomy-checkbox',
    'taxonomy-select'
  );

  if ( ! empty( $meta_settings ) ) {
    $old_meta = array();

    foreach( $meta_settings as $option ) {

      if ( ! is_array( $option['taxonomy'] ) ) {
        $option['taxonomy'] = explode( ',', $option['taxonomy'] );
      }

      if ( ! in_array( $taxonomy, $option['taxonomy'] ) ) {
        continue;
      }

      if ( isset( $option['children'] ) ) {
        $post_ids = get_posts( array(
          'fields'     => 'ids',
          'meta_key'   => $option['id'],
        ) );

        if ( $post_ids ) {

          foreach( $post_ids as $post_id ) {

            // Get the meta
            $old_meta = get_post_meta( $post_id, $option['id'], true );
            $new_meta = $old_meta;

            // Has a saved value
            if ( ! empty( $old_meta ) && is_array( $old_meta ) ) {

              // Loop over the array
              foreach( $old_meta as $key => $value ) {

                foreach( $value as $sub_key => $sub_value ) {

                  if ( in_array( $sub_key, $option['children'] ) ) {

                    // The value is an array of IDs
                    if ( is_array( $sub_value ) ) {

                      // Loop over the array
                      foreach( $sub_value as $sub_sub_key => $sub_sub_value ) {

                        // It's a single value, just replace it
                        if ( $sub_sub_value == $term_id ) {

                          unset( $new_meta[$key][$sub_key][$sub_sub_key] );
                          $new_meta[$key][$sub_key][$new_term_id] = $new_term_id;

                        }

                      }

                    // It's a single value, just replace it
                    } else if ( $sub_value == $term_id ) {

                      $new_meta[$key][$sub_key] = $new_term_id;

                    }

                  }

                }

              }

              // Update
              if ( $old_meta !== $new_meta ) {

                update_post_meta( $post_id, $option['id'], $new_meta, $old_meta );

              }

            }

          }

        }

      } else {
        $post_ids = get_posts( array(
          'fields'     => 'ids',
          'meta_query' => array(
            'key'     => $option['id'],
            'value'   => $term_id,
            'compare' => 'IN'
          ),
        ) );

        if ( $post_ids ) {

          foreach( $post_ids as $post_id ) {

            // Get the meta
            $old_meta = get_post_meta( $post_id, $option['id'], true );
            $new_meta = $old_meta;

            // Has a saved value
            if ( ! empty( $old_meta ) ) {

              // The value is an array of IDs
              if ( is_array( $old_meta ) ) {

                // Loop over the array
                foreach( $old_meta as $key => $value ) {

                  // It's a single value, just replace it
                  if ( $value == $term_id ) {

                    unset( $new_meta[$key] );
                    $new_meta[$new_term_id] = $new_term_id;

                  }

                }

              // It's a single value, just replace it
              } else if ( $old_meta == $term_id ) {

                $new_meta = $new_term_id;

              }

              // Update
              if ( $old_meta !== $new_meta ) {

                update_post_meta( $post_id, $option['id'], $new_meta, $old_meta );

              }

            }

          }

        }

      }

    }

  }

}
add_action( 'split_shared_term', 'ot_split_shared_term', 10, 4 );

/* End of file ot-functions-admin.php */
/* Location: ./includes/ot-functions-admin.php */