<?php
//add various plugins compatibilty (Jetpack, Bbpress, Qtranslate, Woocommerce, The Event Calendar ...)
add_action ('after_setup_theme'  , 'hu_set_plugins_supported', 20 );
add_action ('after_setup_theme'  , 'hu_plugins_compatibility', 30 );

/**
* Set plugins supported ( before the plugin compat function is fired )
* => allows to easily remove support by firing remove_theme_support() (with a priority < hu_plugins_compatibility) on hook 'after_setup_theme'
* hook : after_setup_theme:20
*
*/
function hu_set_plugins_supported() {
  //add support for plugins (added in v3.1+)
  add_theme_support( 'jetpack' );
  add_theme_support( 'buddy-press' );
  add_theme_support( 'uris' );///Ultimate Responsive Image Slider
  add_theme_support( 'the-events-calendar' );///Ultimate Responsive Image Slider
}


/**
* This function handles the following plugins compatibility : Jetpack (for the carousel addon and photon), Bbpress...
* hook : after_setup_theme:30
*/
function hu_plugins_compatibility() {
  /* JETPACK */
  //adds compatibilty with the jetpack image carousel and photon
  if ( current_theme_supports( 'jetpack' ) && hu_is_plugin_active('jetpack/jetpack.php') )
    hu_set_jetpack_compat();

  /* BUDDYPRESS */
  //if buddypress is installed and activated, we can check the existence of the contextual boolean function is_buddypress() to execute some code
  // we have to use buddy-press instead of buddypress as string for theme support as buddypress makes some checks on current_theme_supports('buddypress') which result in not using its templates
  if ( current_theme_supports( 'buddy-press' ) && hu_is_plugin_active('buddypress/bp-loader.php') )
    hu_set_buddypress_compat();

  /* Ultimate Responsive Image Slider  */
  if ( current_theme_supports( 'uris' ) && hu_is_plugin_active('ultimate-responsive-image-slider/ultimate-responsive-image-slider.php') )
    hu_set_uris_compat();

  /* The Events Calendar */
  if ( current_theme_supports( 'the-events-calendar' ) && hu_is_plugin_active('the-events-calendar/the-events-calendar.php') )
    hu_set_the_events_calendar_compat();
}


/**
* Jetpack compat hooks
*
*/
function hu_set_jetpack_compat() {

  //Photon jetpack's module conflicts with our smartload feature:
  //Photon removes the width,height attribute in php, then in js it compute them (when they have the special attribute 'data-recalc-dims')
  //based on the img src. When smartload is enabled the images parsed by its js which are not already smartloaded are dummy
  //and their width=height is 1. The image is correctly loaded but the space
  //assigned to it will be 1x1px. Photon js, is compatible with Auttomatic plugin lazy load and it sets the width/height
  //attribute only when the img is smartloaded. This is pretty useless to me, as it doesn't solve the main issue:
  //document's height change when the img are smartloaded.
  //Anyway to avoid the 1x1 issue we alter the img attribute (data-recalc-dims) which photon adds to the img tag(php) so
  //the width/height will not be erronously recalculated
  if ( class_exists( 'Jetpack' ) && Jetpack::is_module_active( 'photon' ) )
    add_filter( 'hu_img_smartloaded', 'hu_jp_smartload_img');
  function hu_jp_smartload_img( $img ) {
    return str_replace( 'data-recalc-dims', 'data-tcjp-recalc-dims', $img );
  }
}//end jetpack compat



/**
* BuddyPress compat hooks
*
*/
function hu_set_buddypress_compat() {
  //disable smartload in change-avatar buddypress profile page
  //to avoid the img tag (in a template loaded with backbone) being parsed on server side but
  //not correctly processed by the front js.
  //the action hook "xprofile_screen_change_avatar" is a buddypress specific hook
  //fired before wp_head where we hook hu_parse_imgs
  //side-effect: all the images in this pages will not be smartloaded, this isn't a big deal
  //as there should be at maximum 2 images there:
  //1) the avatar, if already set
  //2) a cover image, if already set
  //anyways this page is not a regular "front" page as it pertains more to a "backend" side
  //if we can call it that way.
  add_action( 'xprofile_screen_change_avatar', 'hu_buddypress_maybe_disable_img_smartload' );
  function hu_buddypress_maybe_disable_img_smartload() {
    add_filter( 'hu_opt_smart_load_img', '__return_false' );//hu_opt_smart_load_image filters the option 'smart_load_img'
  }
}



/**
* Ultimate Responsive Image Slider compat hooks (uris)
*
*/
function hu_set_uris_compat() {
  add_filter ( 'hu_img_smart_load_options', 'hu_uris_disable_img_smartload' ) ;
  function hu_uris_disable_img_smartload( $options ){
    if ( ! is_array( $options ) )
      $options = array();

    if ( ! is_array( $options['opts'] ) )
      $options['opts'] = array();

    if ( ! is_array( $options['opts']['excludeImg'] ) )
      $options['opts']['excludeImg'] = array();

    $options['opts']['excludeImg'][] = '.sp-image';

    return $options;
  }
}//end uris compat


/**
* The Events Calendar compat hooks
*/
function hu_set_the_events_calendar_compat() {
  /*
  * Are we in the Events list context?
  */
  if ( ! ( function_exists( 'hu_is_tec_events_list' ) ) ) {
    function hu_is_tec_events_list() {
      return function_exists( 'tribe_is_event_query' ) && tribe_is_event_query() && is_post_type_archive();
    }
  }
  /*
  * Are we in single Event context?
  */
  if ( ! ( function_exists( 'hu_is_tec_single_event' ) ) ) {
    function hu_is_tec_single_event() {
      return function_exists( 'tribe_is_event_query' ) && tribe_is_event_query() && is_single();
    }
  }

  /*
  * Avoid php smartload image php parsing in events list content
  * See: https://github.com/presscustomizr/hueman/issues/285
  */
  add_filter( 'hu_disable_img_smart_load', 'hu_tec_disable_img_smart_load_events_list', 999, 2);
  function hu_tec_disable_img_smart_load_events_list( $_bool, $parent_filter ) {
    if ( 'the_content' == $parent_filter && hu_is_tec_events_list() )
      return true;//disable
    return $_bool;
  }

}


/**
* HELPER
* Check whether the plugin is active by checking the active_plugins list.
* copy of is_plugin_active declared in wp-admin/includes/plugin.php
*
*
* @param string $plugin Base plugin path from plugins directory.
* @return bool True, if in the active plugins list. False, not in the list.
*/
function hu_is_plugin_active( $plugin ) {
  return in_array( $plugin, (array) get_option( 'active_plugins', array() ) ) || hu_is_plugin_active_for_network( $plugin );
}

/**
* HELPER
* Check whether the plugin is active for the entire network.
* copy of is_plugin_active_for_network declared in wp-admin/includes/plugin.php
*
*
* @param string $plugin Base plugin path from plugins directory.
* @return bool True, if active for the network, otherwise false.
*/
function hu_is_plugin_active_for_network( $plugin ) {
  if ( ! is_multisite() )
    return false;

  $plugins = get_site_option( 'active_sitewide_plugins');
  if ( isset($plugins[$plugin]) )
    return true;

  return false;
}








/* WFC Compatibility code */

/*
* Add theme localized selector titles
*/
add_filter( 'tc_default_selector_title_map', 'hu_wfc_selector_title' );
function hu_wfc_selector_title( $_list) {

  $_hu_list = array(
            'top_menu_items'          => __( 'Top-Menu items' , 'hueman' ),
            'marketing'               => __( 'Featured Pages', 'hueman' ),
            'single_post_title'       => __( 'Single Post titles' , 'hueman' ),
            'single_page_title'       => __( 'Single Page titles' , 'hueman' ),
            'post_content'            => __( 'Post content' , 'hueman' ),
            'post_excerpt'            => __( 'Post excerpt' , 'hueman' ),
            'post_lists'              => __( 'Lists in post/pages' , 'hueman' ),
            'single_category_meta'    => __( 'Single Post Categories meta' , 'hueman' ),
            'single_tag'              => __( 'Single Post tags' , 'hueman' ),
            'archive_type_titles'     => __( 'Archive Type Title' , 'hueman' ),
            'postlist_post_metas'     => __( 'Post list post metas' , 'hueman' ),
            'postlist_category_meta'  => __( 'Post list category meta' , 'hueman' ),
            'single_tags'             => __( 'Single post tags' , 'hueman' ),
            'comment_meta'            => __( 'Comments metas' , 'hueman' ),
            'sidebars_social_links'   => __( 'Sidebar Social Links' , 'hueman' ),
            'sidebars_top'            => __( 'Sidebar Top Boxes' , 'hueman' ),
            'footer_social_links'     => __( 'Footer Social Links', 'hueman' )
  );

  return array_merge( $_list, $_hu_list );
}

add_filter( 'tc_font_customizer_zone_map', 'hu_wfc_zone_map' );
function hu_wfc_zone_map( $zone_map ) {
  $_hu_zone_map = array(
    'marketing'     => array('full-layout'  , __( 'Featured pages' , 'hueman' ))
  );
  return array_merge( $zone_map, $_hu_zone_map );
}

/*
* Add self-hosted Font among the WFC WebSafe ones (maybe WFC should have a specific section?!)
*/
add_filter( 'tc_font_customizer_cfonts' , 'add_hu_fonts_to_list' );
function add_hu_fonts_to_list( $original_list ) {
  $_fonts = array(
      array( 'name' => 'Titillium,Arial,sans-serif' ,'subsets'=> array() ),
  );

  return array_merge( $_fonts , $original_list);
}


/*
* Add/Merge theme specific default selector properties
*/
add_filter('tc_selector_properties' , 'hu_selector_properties' );
function hu_selector_properties( $selector_properties ){
  $hu_selector_properties     = array(
              'zone'            => null,
              'selector'        => null,
              'not'             => null,
              'subset'          => null,
              'font-family'     => 'Titillium,Arial,sans-serif',
              'font-weight'     => 'normal',
              'font-style'      => null,
              'color'           => '#666',
              'color-hover'     => 'main',
              'font-size'       => "16px",
              'line-height'     => "1.5em",
              'text-align'      => 'inherit',
              'text-decoration' => 'none',
              'text-transform'  => 'none',
              'letter-spacing'  => 0,
              'static-effect'   => 'none',
              'icon'            => false,
              'important'       => false,
              'title'           => false //used for custom selectors
  );
  return array_merge( $selector_properties, $hu_selector_properties );
}
/*End WFC Compatibility */

/* FPU Compatibility code */
/*
* Custom CSS
*/
add_action( 'fpu_enqueue_plug_resource_after', 'hu_fpu_enqueue_custom_css' );
function hu_fpu_enqueue_custom_css() {
  $_fpu_style = apply_filters( 'hu_fpu_custom_css', hu_fpu_custom_css() );
  wp_add_inline_style( 'fpu-front-style', $_fpu_style );
}

function hu_fpu_custom_css() {
  /* Hueman compatibility CSS */
  return '#wrapper > .fpc-marketing,
    header + .fpc-marketing {
      padding-bottom: 30px;
    }
    #wrapper > .fpc-marketing {
      margin-bottom: 0px;
    }
    #wrapper  header + .fpc-container.fpc-marketing {
      margin-top: -50px;
      margin-bottom: 60px;
    }
    .fpc-marketing + .featurette-divider.__after_header,
    .fpc-marketing + .featurette-divider.__before_header,
    .fpc-marketing + .featurette-divider.__before_footer {
      display: none;
    }';
  /* End Hueman compatibility CSS*/
}

/* Add fpu backward compatibility hook */
add_filter( 'tc_fpc_get_opt_tc_fp_position' , 'hu_set_fp_position_compatibility' );
function hu_set_fp_position_compatibility( $_option_value ) {

  if ( 'loop_start' == $_option_value && hu_is_checked('featured-posts-enabled') && is_home() ) {
    return '__before_featured';
  }
  return $_option_value;
}
/*End FPU Compatibility */