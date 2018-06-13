<?php
function hu_register_widget_zones_module( $args ) {
    $defaults = array(
        'setting_id' => '',

        'base_url_path' => '',//PC_AC_BASE_URL/inc/czr-modules/social-links/
        'version' => '',

        'option_value' => array(), //<= will be used for the dynamic registration

        'setting' => array(),
        'control' => array(),
        'section' => array(), //array( 'id' => '', 'label' => '' ),

        'sanitize_callback' => '',
        'validate_callback' => ''
    );
    $args = wp_parse_args( $args, $defaults );

    if ( ! isset( $GLOBALS['czr_base_fmk_namespace'] ) ) {
        error_log( __FUNCTION__ . ' => global czr_base_fmk not set' );
        return;
    }

    $czrnamespace = $GLOBALS['czr_base_fmk_namespace'];
    //czr_fn\czr_register_dynamic_module
    $CZR_Fmk_Base_fn = $czrnamespace . 'CZR_Fmk_Base';
    if ( ! function_exists( $CZR_Fmk_Base_fn) ) {
        error_log( __FUNCTION__ . ' => Namespace problem => ' . $CZR_Fmk_Base_fn );
        return;
    }


    $CZR_Fmk_Base_fn() -> czr_pre_register_dynamic_setting( array(
        'setting_id' => $args['setting_id'],
        'module_type' => 'czr_background',
        'option_value' => ! is_array( $args['option_value'] ) ? array() : $args['option_value'],

        'setting' => $args['setting'],

        'section' => $args['section'],

        'control' => $args['control']
    ));

    // czr_fn\czr_register_dynamic_module()
    $CZR_Fmk_Base_fn() -> czr_pre_register_dynamic_module( array(
        'dynamic_registration' => true,
        'module_type' => 'czr_widget_areas_module',

        // 'sanitize_callback' => 'hu_sanitize_callback__czr_social_module',
        // 'validate_callback' => 'hu_validate_callback__czr_social_module',

        'customizer_assets' => array(
            'control_js' => array(
                // handle + params for wp_enqueue_script()
                // @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
                'czr-widget-areas-module' => array(
                    'src' => sprintf(
                        '%1$s/assets/js/%2$s',
                        $args['base_url_path'],
                        '_2_6_widget_areas_module.js'
                    ),
                    'deps' => array('customize-controls' , 'jquery', 'underscore'),
                    'ver' => ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : $args['version'],
                    'in_footer' => true
                )
            ),
            'localized_control_js' => array(
                'deps' => 'czr-customizer-fmk',
                'global_var_name' => 'widgetModuleLocalized',
                'params' => array(
                    //Widget Area Module
                    'dynWidgetSection' => HU_DYN_WIDGETS_SECTION,
                    'defaultWidgetSidebar' => 'primary',//the one that will be cloned. Specific to each themes
                    'defaultWidgetLocation' => 's1',//Specific to each themes
                    'sidebar_contexts' => hu_get_contexts_list(),
                    'sidebar_locations' => hu_get_widget_el_locations()
                    //'default_zones' => hu_get_widget_el_default_zones()
                )
            )
        ),

        'tmpl' => array()//tmpl
    ));
}//hu_register_body_bg_module()


/* ------------------------------------------------------------------------- *
 *  Various Helpers
/* ------------------------------------------------------------------------- */
function hu_get_widget_el_locations() {
  $_default_locations = hu_get_builtin_widget_zones_location();
  //generates the locations for json
  $locations = array();
  foreach ($_default_locations as $_id => $data ) {
    $_k = key($data);
    $locations[$_k] = $data[$_k];
  }
  return $locations;
}

function hu_get_widget_el_default_zones() {
  //generates the default widget zone for json
  $default_zones = array();
  foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {
    //get the default location
    $_loc = isset($_default_locations[$_zone_id]) ? key($_default_locations[$_zone_id]) : '';

    $default_zones[] = array(
      'id'          => $_data['id'],
      'title'       => $_data['name'],
      'contexts'    => array('_all_'),
      'locations'   => array($_loc),
      'is_builtin'  => true,
      'description' => $_data['description']
    );
  }
  return $default_zones;
}