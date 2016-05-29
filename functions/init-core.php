<?php
/****************************************************************************
****************************** HELPERS **************************************
*****************************************************************************/
/**
* Is the customizer left panel being displayed ?
* @return  boolean
* @since  3.3+
*/
function hu_is_customize_left_panel() {
  global $pagenow;
  return is_admin() && isset( $pagenow ) && 'customize.php' == $pagenow;
}


/**
* Is the customizer preview panel being displayed ?
* @return  boolean
* @since  3.3+
*/
function hu_is_customize_preview_frame() {
  return ! is_admin() && isset($_REQUEST['wp_customize']);
}


/**
* Always include wp_customize or customized in the custom ajax action triggered from the customizer
* => it will be detected here on server side
* typical example : the donate button
*
* @return boolean
* @since  3.3+
*/
function hu_doing_customizer_ajax() {
  $_is_ajaxing_from_customizer = isset( $_POST['customized'] ) || isset( $_POST['wp_customize'] );
  return $_is_ajaxing_from_customizer && ( defined( 'DOING_AJAX' ) && DOING_AJAX );
}



/**
* Are we in a customization context ? => ||
* 1) Left panel ?
* 2) Preview panel ?
* 3) Ajax action from customizer ?
* @return  bool
* @since  3.3+
*/
function hu_is_customizing() {
  //checks if is customizing : two contexts, admin and front (preview frame)
  return in_array( 1, array(
    hu_is_customize_left_panel(),
    hu_is_customize_preview_frame(),
    hu_doing_customizer_ajax()
  ) );
}

/* HELPER FOR CHECKBOX OPTIONS */
//the old options used 'on' and 'off'
//the new options use 1 and 0
function hu_is_checked( $opt_name = '') {
  $val = hu_get_option($opt_name);
  return hu_booleanize_checkbox_val( $val );
}

function hu_booleanize_checkbox_val( $val ) {
  if ( ! $val )
    return;
  switch ( (string) $val ) {
    case 'off':
    case '' :
      return false;
    case 'on':
    case '1' :
      return true;
    default: return false;
  }
}

//used in the customizer
//replace wp checked() function
function hu_checked( $val ) {
  echo hu_is_checked( $val ) ? 'checked="checked"' : '';
}

/**
* Checks if we use a child theme. Uses a deprecated WP functions (get _theme_data) for versions <3.4
* @return boolean
*
*/
function hu_is_child() {
  // get themedata version wp 3.4+
  if ( function_exists( 'wp_get_theme' ) ) {
    //get WP_Theme object
    $_theme       = wp_get_theme();
    //define a boolean if using a child theme
    return $_theme -> parent() ? true : false;
  }
  else {
    $_theme       = call_user_func('get_' .'theme_data', get_stylesheet_directory().'/style.css' );
    return ! empty($_theme['Template']) ? true : false;
  }
}


/**
* Returns a boolean
* check if user started to use the theme before ( strictly < ) the requested version
*
*/
function hu_user_started_before_version( $_ver ) {
  if ( ! get_transient( 'started_using_hueman' ) )
    return false;

  $_trans = 'started_using_hueman';

  if ( ! $_ver )
    return false;

  $_start_version_infos = explode('|', esc_attr( get_transient( $_trans ) ) );

  if ( ! is_array( $_start_version_infos ) )
    return false;

  switch ( $_start_version_infos[0] ) {
    //in this case we know exactly what was the starting version (most common case)
    case 'with':
      return version_compare( $_start_version_infos[1] , $_ver, '<' );
    break;
    //here the user started to use the theme before, we don't know when.
    //but this was actually before this check was created
    case 'before':
      return true;
    break;

    default :
      return false;
    break;
  }
}




/* ------------------------------------------------------------------------- *
 *  Various Helpers
/* ------------------------------------------------------------------------- */
/**
* helper
* Check if we are displaying posts lists or front page
* @return  bool
*/
function hu_is_home() {
  //get info whether the front page is a list of last posts or a page
  return ( is_home() && ( 'posts' == get_option( 'show_on_front' ) || 'nothing' == get_option( 'show_on_front' ) ) ) || is_front_page();
}

/**
* helper
* States if the current context is the blog page from a WP standpoint
* @return  bool
*/
function hu_is_blogpage() {
  return is_home() && ! is_front_page();
}

/**
* helper
* @return  bool
*/
function hu_has_social_links() {
  $_socials = hu_get_option('social-links');
  return ! empty( $_socials ) && false != $_socials;
}

/**
* helper ensuring backward compatibility with the previous option system
* @return img src string
*/
function hu_get_img_src( $img ) {
  if ( ! $img )
    return;

  $_image_src     = '';
  $_width         = false;
  $_height        = false;
  $_attachment_id = '';

  //Get the img src
  if ( is_numeric($img) ) {
    $_attachment_id     = $img;
    $_attachment_data   = apply_filters( "hu_attachment_img" , wp_get_attachment_image_src( $_attachment_id, 'full' ), $_attachment_id );
    $_img_src           = $_attachment_data[0];
    $_width             = ( isset($_attachment_data[1]) && $_attachment_data[1] > 1 ) ? $_attachment_data[1] : $_width;
    $_height            = ( isset($_attachment_data[2]) && $_attachment_data[2] > 1 ) ? $_attachment_data[2] : $_height;
  } else { //old treatment
    //rebuild the img path : check if the full path is already saved in DB. If not, then rebuild it.
    $upload_dir         = wp_upload_dir();
    $_saved_path        = esc_url ( $img );
    $_img_src           = ( false !== strpos( $_saved_path , '/wp-content/' ) ) ? $_saved_path : $upload_dir['baseurl'] . $_saved_path;
  }

  //return img source + make ssl compliant
  return is_ssl() ? str_replace('http://', 'https://', $_img_src) : $_img_src;
}

/**
* wrapper of hu_get_img_src specific for theme options
* @return logo src string
*/
function hu_get_img_src_from_option( $option_name ) {
  $_img_option    = esc_attr( hu_get_option($option_name) );
  if ( ! $_img_option )
    return;

  $_logo_src      = hu_get_img_src( $_img_option );
  //hook
  return apply_filters( "hu_logo_src" , $_logo_src ) ;
}






/* ------------------------------------------------------------------------- *
 *  OptionTree framework integration: Use in theme mode
/* ------------------------------------------------------------------------- */
//control if we use option tree
//@todo remove : for TEST PURPOSES ONLY

//add_filter( 'use_option_tree' , isset( $_GET['use_option_tree'] ) ? '__return_true' : '__return_false' );

add_filter( 'ot_show_pages', '__return_false' );
add_filter( 'ot_show_new_layout', '__return_false' );
add_filter( 'ot_theme_mode', '__return_true' );


/* ------------------------------------------------------------------------- *
 *  OptionTree options moved to the customizer
/* ------------------------------------------------------------------------- */
//disable all ot options : page, etc...
add_filter( 'ot_use_theme_options',  '__return_false' );
//override the function controlling the theme Option page link for the admin bar.
function ot_register_theme_options_admin_bar_menu() {}

add_filter('ot_theme_options_page_title', 'hu_change_option_tree_title');
add_filter('ot_theme_options_menu_title', 'hu_change_option_tree_title');

function hu_change_option_tree_title() {
  return __('Theme Options [OLD]', 'hueman');
}




/* ------------------------------------------------------------------------- *
 *  Define some useful constants
/* ------------------------------------------------------------------------- */
//get WP_Theme object of Hueman
$hu_theme                     = wp_get_theme();


//Get infos from parent theme if using a child theme
$hu_theme = $hu_theme -> parent() ? $hu_theme -> parent() : $hu_theme;

$hu_base_data['prefix']       = $hu_base_data['title'] = $hu_theme -> name;
$hu_base_data['version']      = $hu_theme -> version;
$hu_base_data['authoruri']    = $hu_theme -> {'Author URI'};


//HUEMAN_VER is the Version
if( ! defined( 'HUEMAN_VER' ) )      define( 'HUEMAN_VER' , $hu_base_data['version'] );
//HU_BASE is the root server path of the parent theme
if( ! defined( 'HU_BASE' ) )            define( 'HU_BASE' , get_template_directory().'/' );
//HU_BASE_CHILD is the root server path of the child theme
if( ! defined( 'HU_BASE_CHILD' ) )      define( 'HU_BASE_CHILD' , get_stylesheet_directory().'/' );
//HU_BASE_URL http url of the loaded parent theme
if( ! defined( 'HU_BASE_URL' ) )        define( 'HU_BASE_URL' , get_template_directory_uri() . '/' );
//HU_BASE_URL_CHILD http url of the loaded child theme
if( ! defined( 'HU_BASE_URL_CHILD' ) )  define( 'HU_BASE_URL_CHILD' , get_stylesheet_directory_uri() . '/' );
//THEMENAME contains the Name of the currently loaded theme
if( ! defined( 'THEMENAME' ) )       define( 'THEMENAME' , $hu_base_data['title'] );
//HU_OPTION_GROUP contains the Name of the hueman theme options in wp_options
//=> was previously option tree default name
if( ! defined( 'HU_THEME_OPTIONS' ) ) define( 'HU_THEME_OPTIONS' , apply_filters( 'hu_theme_options', 'hu_theme_options' ) );

if( ! defined( 'HU_OPT_AJAX_ACTION' ) ) define( 'HU_OPT_AJAX_ACTION' , 'hu_get_option' );

if( ! defined( 'HU_CTX_ON' ) ) define( 'HU_CTX_ON' , false );

//HU_WEBSITE is the home website of Hueman
if( ! defined( 'HU_WEBSITE' ) )         define( 'HU_WEBSITE' , $hu_base_data['authoruri'] );



/* ------------------------------------------------------------------------- *
 *  Loads and instanciates Utils
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/class-utils-settings-map.php' );
new HU_utils_settings_map;
load_template( get_template_directory() . '/functions/class-utils.php' );
new HU_utils;


/* ------------------------------------------------------------------------- *
 *  Loads Ctx helpers
/* ------------------------------------------------------------------------- */
if ( HU_CTX_ON ) {
  load_template( get_template_directory() . '/functions/skop/init-skop.php' );
}

//note:  $default is never used => to remove
function hu_get_option( $option_id, $default = '' ) {
  return HU_utils::$inst -> hu_opt( $option_id );
}






/* ------------------------------------------------------------------------- *
 *  SIDEBAR OPTION RETRO COMPATIBILITY
/* ------------------------------------------------------------------------- */
//backup the sidebar_widgets as they are before the migration
//if something wrong happens, we'll be able to restore them with wp_set_sidebars_widgets()
//and to remove the potential _orphaned generated
add_action( 'after_switch_theme',  'hu_backup_sidebars', 0 );

function hu_backup_sidebars() {
  $sidebars_widgets = get_theme_mod( 'sidebars_widgets' );
  $data = isset($sidebars_widgets['data']) ? $sidebars_widgets['data'] : array();
  if ( ! get_transient( '_hu_sidebar_backup' ) )
    set_transient( '_hu_sidebar_backup', $data, 24 * 3600 * 365 * 20 );
}


//get the previous locations and contexts and turn them into new options
add_filter('hu_implement_options_compat', 'hu_generate_new_sidebar_options');


//hook : hu_implement_options_compat
function hu_generate_new_sidebar_options($__options) {
  //generates the default widget zone options
  $_default_locations = hu_get_builtin_widget_zones_location();
  $builtin_zones = array();

  foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {

    $_locs = hu_get_old_locations($_zone_id, $__options);
    if ( empty($_locs) && isset($_default_locations[$_zone_id]) ) {
      $_locs[] = key($_default_locations[$_zone_id]);
    }

    $_contexts = hu_get_old_contexts($_zone_id, $__options);
    if ( empty($_contexts) && isset($_default_locations[$_zone_id]) ) {
      $_contexts[] = ('_all_');
    }

    $builtin_zones[] = array(
      'id'          => $_data['id'],
      'title'       => $_data['name'],
      'contexts'    => $_contexts,
      'locations'   => $_locs,
      'is_builtin'  => true,
      'description' => $_data['description']
    );
  }


  //generates the custom widget zone options
  $_old_custom_zone_opt = isset( $__options['sidebar-areas'] ) ? $__options['sidebar-areas'] : array();
  $custom_zones = array();

  if ( ! empty($_old_custom_zone_opt) ) {
    //array( 'title' => string, 'id' => string )
    foreach ( $_old_custom_zone_opt as $_zone ) {
      if ( !isset($_zone['id']) )
        continue;

      $_zone_id   = $_zone['id'];
      //get the default location
      $_locs      = hu_get_old_locations($_zone_id, $__options);

      $_contexts  = hu_get_old_contexts($_zone_id, $__options);

      $custom_zones[] = array(
        'id'          => $_zone['id'],
        'title'       => $_zone['title'],
        'contexts'    => $_contexts,
        'locations'   => $_locs,
      );
    }//foreach
  }//if

  //make sure the previous "rules" for sidebars and respected
  $_new_sb_areas_opts = hu_clean_old_sidebar_options( array_merge( $builtin_zones, $custom_zones ), $__options );

  $__options['sidebar-areas'] = $_new_sb_areas_opts;
  return $__options;
}


function hu_get_old_locations( $_zone_id, $__options) {
  $locations = array();
  $_old_sd_options = array(
    's1-home',
    's2-home',
    's1-single',
    's2-single',
    's1-archive',
    's2-archive',
    's1-archive-category',
    's2-archive-category',
    's1-search',
    's2-search',
    's1-404',
    's2-404',
    's1-page',
    's2-page'
  );

  //the following zones are assigned to fixed locations
  //primary, secondary, footer-*, header-ads, footer-ads could be assigned to s1 and s2 previously but they were always assigned in any cases to their respective default location
  //user will be able to change this with the new options
  //edge case : a user who had assigned the footer-1 to the s1 location on home will loose this setting
  //=> the fix is to create a new zone, and select the home context + assign it to the s1 (right sidebar) location
  $_fixed_locations = array(
    's1'          => 'primary',
    's2'          => 'secondary',
    'header-ads'  => 'header-ads',
    'footer-ads'  => 'footer-ads',
    'footer-1'    => 'footer-1',
    'footer-2'    => 'footer-2',
    'footer-3'    => 'footer-3',
    'footer-4'    => 'footer-4'
  );

  if ( in_array($_zone_id, $_fixed_locations) ) {
    $locations[] = array_search($_zone_id, $_fixed_locations);
    return $locations;
  }


  foreach ($_old_sd_options as $opt_name) {
    //does the option exists ?
    if( ! array_key_exists($opt_name, $__options) )
      continue;

    //if exists, grab its value
    $value = $__options[$opt_name];

    if ( $value != $_zone_id )
      continue;

    //we have a match, extract the location if not already there
    $loc = substr($opt_name, 0, 2);
    if ( ! in_array($loc, $locations) )
      $locations[] = $loc;
  }

  return $locations;
}


function hu_get_old_contexts( $_zone_id, $__options) {
  $contexts = array();
  $_old_sd_options = array(
    's1-home',
    's2-home',
    's1-single',
    's2-single',
    's1-archive',
    's2-archive',
    's1-archive-category',
    's2-archive-category',
    's1-search',
    's2-search',
    's1-404',
    's2-404',
    's1-page',
    's2-page'
  );

  $_default_contexts = array();
  //populates the map with the contexts
  foreach ( hu_get_contexts_list() as $c => $title ) {
    if ( '_all_' == $c )
      continue;

    $_default_contexts[] = $c;
  }

  //the following zones are assigned to fixed contexts
  //user will be able to change this with the new options
  //edge case : a user who had assigned the footer-1 to the s1 location on home will loose this setting
  //=> the fix is to create a new zone, and select the home context + assign it to the s1 (right sidebar) location
  $_fixed_contexts = array(
    'primary',
    'secondary',
    'header-ads',
    'footer-ads',
    'footer-1',
    'footer-2',
    'footer-3',
    'footer-4'
  );

  if ( in_array($_zone_id, $_fixed_contexts) ) {
    $contexts = $_default_contexts;
    return $contexts;
  }

  foreach ($_old_sd_options as $opt_name) {
    //does the option exists ?
    if( ! array_key_exists($opt_name, $__options) )
      continue;
    //if exists, grab its value
    $value = $__options[$opt_name];

    if ( $value != $_zone_id )
      continue;

    //we have a match, extract the context if not already there
    $con = substr($opt_name, 3);
    if ( ! in_array($con, $contexts) )
      $contexts[] = $con;
  }

  return $contexts;
}



//SIDEBAR RULES FOR THE MIGRATIONS
//
//Locations s1 and s2, for a given context :
//  1) can only have one widget zone assigned
//  2) fallback on primary (for s1) and secondary (for s2) if no widget zone is assigned.
//
//Zones footer-*, header-ads, footer-ads, primary, secondary :
//  1) could be assigned to s1 and s2 in specific contexts
//  2) are now always assigned to their default locations in all contexts
function hu_clean_old_sidebar_options( $_new_sb_opts, $__options ) {
  //for s1 and s2, create an array of context => array( 's1' => [ widget_zones ], 's2' => [widget_zones] );
  //and for each one, determine who is the winner
  $_old_sd_options = array(
    's1-home',
    's2-home',
    's1-single',
    's2-single',
    's1-archive',
    's2-archive',
    's1-archive-category',
    's2-archive-category',
    's1-search',
    's2-search',
    's1-404',
    's2-404',
    's1-page',
    's2-page'
  );

  $_default_zone_for_sidebars = array(
    's1' => 'primary',
    's2' => 'secondary'
  );

  $_forbidden_zones_for_sidebars = array(
    'header-ads',
    'footer-ads',
    'footer-1',
    'footer-2',
    'footer-3',
    'footer-4'
  );

  //make sure that s1 and s2 have only one widget zone for a given context
  foreach ($_old_sd_options as $opt_name) {

    //is the option defined ?
    if( ! array_key_exists($opt_name, $__options) )
      continue;

    //get previous settings
    $_loc     = substr($opt_name, 0, 2);//is always s1 or s2
    $_con     = substr($opt_name, 3 );
    $_user_zone_id = $__options[$opt_name];

    //if no zone was assigned to this location-context, then continue
    if ( empty($_user_zone_id ) || ! $_user_zone_id )
      continue;

    //is the zone different than the default one?
    //if not, continue
    if ( $_user_zone_id == $_default_zone_for_sidebars[$_loc] )
      continue;

    //if the zone belongs to the forbidden zones, then continue because this is not supported for the migration
    //for example, the migration won't support a footer-1 assigned to s1
    if ( in_array($_user_zone_id, $_forbidden_zones_for_sidebars) )
      continue;

    //loop on the new options and fix
    //if a zone different than the default (primary or secondary) was assigned to s1 or s2 on a given context, then remove this context from its context list
    $_zone_to_modify = $_default_zone_for_sidebars[$_loc];

    foreach ($_new_sb_opts as $key => $data) {

      //don't take any risk...
      if ( !is_array($data) || !array_key_exists('id', $data) || !array_key_exists('locations', $data) || !array_key_exists('contexts', $data) )
        continue;

      if ( $_zone_to_modify != $data['id'] )
        continue;

      //remove the context from the list
      $_key_to_remove = array_search($_con, $data['contexts']);
      unset($_new_sb_opts[$key]['contexts'][$_key_to_remove]);
    }//foreach

  }//foreach

  return $_new_sb_opts;
}







function hu_maybe_update_options() {
  $_options = get_option( HU_THEME_OPTIONS );

  $copy_option_tree = isset( $_GET['copy_option_tree'] );

  //have the option already been copied ?
  if ( isset($_options['has_been_copied']) && true === $_options['has_been_copied'] && ! $copy_option_tree )
    return;

  $_old_options = get_option( 'option_tree' );

  $_old_options = ( false == $_old_options || empty($_old_options) ) ? array() : $_old_options;

  //if not then grab the options from option tree and copy them into the new option raw
  //Ensure compatibility for some options like sidebar-areas + s1*, s2*options
  $_opt_to_copy = apply_filters('hu_implement_options_compat', $_old_options );

  update_option(
    HU_THEME_OPTIONS,
    array_merge( $_opt_to_copy, array('has_been_copied' => true) )
  );

}


//copy old options from option tree framework into new option raw 'hu_theme_options'
//only if user is logged in
if ( is_user_logged_in() )
  hu_maybe_update_options();


/* ------------------------------------------------------------------------- *
* Load OptionTree framework
* Has to be loaded before after_setup_theme (important for plugin compatibility like ACF)
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/option-tree/ot-loader.php' );


/* ------------------------------------------------------------------------- *
 *  Load theme files
/* ------------------------------------------------------------------------- */

if ( ! function_exists( 'hu_load' ) ) {

  function hu_load() {
    // Load theme languages
    load_theme_textdomain( 'hueman', get_stylesheet_directory().'/languages' );

    // Load theme options and meta boxes
    // load_template( get_template_directory() . '/functions/theme-options.php' );
    load_template( get_template_directory() . '/functions/init-meta-boxes.php' );

    // Load custom widgets
    load_template( get_template_directory() . '/functions/widgets/alx-tabs.php' );
    load_template( get_template_directory() . '/functions/widgets/alx-video.php' );
    load_template( get_template_directory() . '/functions/widgets/alx-posts.php' );

    // Load dynamic styles
    load_template( get_template_directory() . '/functions/dynamic-styles.php' );
  }

}
add_action( 'after_setup_theme', 'hu_load' );


/* ------------------------------------------------------------------------- *
 *  Base functionality
/* ------------------------------------------------------------------------- */

// Content width
if ( !isset( $content_width ) ) { $content_width = 720; }


/*  Theme setup
/* ------------------------------------ */
if ( ! function_exists( 'hu_setup' ) ) {

  function hu_setup() {
    // Enable title tag
    add_theme_support( 'title-tag' );

    // Enable automatic feed links
    add_theme_support( 'automatic-feed-links' );

    // Enable featured image
    add_theme_support( 'post-thumbnails' );

    // Enable post format support
    add_theme_support( 'post-formats', array( 'audio', 'aside', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );

    // Declare WooCommerce support
    add_theme_support( 'woocommerce' );

    // Thumbnail sizes
    add_image_size( 'thumb-small', 160, 160, true );
    add_image_size( 'thumb-standard', 320, 320, true );
    add_image_size( 'thumb-medium', 520, 245, true );
    add_image_size( 'thumb-large', 720, 340, true );

    // Custom menu areas
    register_nav_menus( array(
      'topbar' => 'Topbar',
      'header' => 'Header',
      'footer' => 'Footer',
    ) );
  }

}
add_action( 'after_setup_theme', 'hu_setup' );


/*  Register sidebars
/* ------------------------------------ */
//@return the array of built-in widget zones
function hu_get_default_widget_zones() {
  return array(
    'primary' => array(
      'name' => __( 'Primary', 'hueman' ),
      'id' => 'primary',
      'description' => __( "Full width widget zone. Located in the left sidebar in a 3 columns layout. Can be on the right of a 2 columns sidebar when content is on the left.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>',
    ),
    'secondary' => array(
      'name' => __( 'Secondary', 'hueman' ),
      'id' => 'secondary',
      'description' => __( "Full width widget zone. Located in the right sidebar in a 3 columns layout.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'footer-1' => array(
      'name' => __( 'Footer 1', 'hueman'),
      'id' => 'footer-1',
      'description' => __( "Widgetized footer 1", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'footer-2' => array(
      'name' => __('Footer 2', 'hueman' ),
      'id' => 'footer-2',
      'description' => __("Widgetized footer 2", 'hueman' ),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'footer-3' => array(
      'name' => __('Footer 3', 'hueman' ),
      'id' => 'footer-3',
      'description' => __("Widgetized footer 3", 'hueman' ),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'footer-4' => array(
      'name' => __('Footer 4', 'hueman' ),
      'id' => 'footer-4',
      'description' => __("Widgetized footer 4", 'hueman' ),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>','after_title' => '</h3>'
    ),
    'header-ads' => array(
      'name' => __( 'Header (next to logo / title)', 'hueman' ),
      'id' => 'header-ads',
      'description' => __( "The Header Widget Zone is located next to your logo or site title.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'footer-ads' => array(
      'name' => __('Footer Full Width', 'hueman'),
      'id' => 'footer-ads',
      'description' => __( "The Footer Widget Zone is located before the other footer widgets and takes 100% of the width. Very appropriate to display a Google Map or an advertisement banner.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    )
  );
}


//@return the array describing the previous correspondance between location => widget zone name
function hu_get_widget_zone_rosetta_stone() {
  return array(
    's1'          => 'primary',
    's2'          => 'secondary',
    'header-ads'  => 'header-ads',
    'footer-ads'  => 'footer-ads',
    'footer-1'    => 'footer-1',
    'footer-2'    => 'footer-2',
    'footer-3'    => 'footer-3',
    'footer-4'    => 'footer-4'
  );
}

//helper
//@return array()
//used both on front end and in the customizer
function hu_get_contexts_list() {
  return array(
    '_all_'             => __('All contexts', 'hueman'),
    'home'              => __('Home', 'hueman'),
    'blog-page'         => __('Blog Page', 'hueman'),
    'page'              => __('Pages', 'hueman'),
    'single'            => __('Single Posts', 'hueman'),
    'archive'           => __('Archives', 'hueman'),
    'archive-category'  => __('Categories', 'hueman'),
    'search'            => __('Search Results', 'hueman'),
    '404'               => __('404 Error Pages', 'hueman')
  );
}


//the original mapping (s1 and s2) has to be kept since it is used in many places
//widget_zone_name => location, title
function hu_get_builtin_widget_zones_location() {
  return array(
    'primary'     => array( 's1' => __('Primary Sidebar (on the left in a 3 columns layout)', 'hueman') ),
    'secondary'   => array( 's2' => __('Secondary Sidebar (on the right in a 3 columns layout)', 'hueman') ),
    'footer-1'    => array( 'footer-1' => __('Footer 1', 'hueman') ),
    'footer-2'    => array( 'footer-2' => __('Footer 2', 'hueman') ),
    'footer-3'    => array( 'footer-3' => __('Footer 3', 'hueman') ),
    'footer-4'    => array( 'footer-4' => __('Footer 4', 'hueman') ),
    'header-ads'  => array( 'header-ads' => __('Header (next to logo / title)', 'hueman') ),
    'footer-ads'  => array( 'footer-ads' => __('Footer Full Width', 'hueman') )
  );
}


if ( ! function_exists( 'hu_maybe_register_builtin_widget_zones' ) ) :

  function hu_maybe_register_builtin_widget_zones() {
    $_map = hu_get_default_widget_zones();
    //when customizing, widgets_init is too early.
    //Therefore, we need to access the customized data from the post global.
    $customized       = array();
    if ( hu_is_customizing() && isset($_POST['customized']) ) {
      $_json = json_decode( wp_unslash( $_POST['customized'] ), true );
      if ( ! empty( $_json ) )
        $customized = $_json;
    }

    //Default conditions.
    //Will apply on front-end and admin
    $_has_header_ads    = hu_is_checked('header-ads');
    $_has_footer_ads    = hu_is_checked('footer-ads');
    $_footer_widgets    = intval ( hu_get_option('footer-widgets') );


    //When customizing, use the customized option
    if ( isset($customized[ HU_THEME_OPTIONS . '[header-ads]']) ) {
      $_has_header_ads = hu_booleanize_checkbox_val( $customized[HU_THEME_OPTIONS . '[header-ads]'] );
    }

    if ( isset($customized[HU_THEME_OPTIONS . '[footer-ads]']) ) {
      $_has_footer_ads = hu_booleanize_checkbox_val( $customized[HU_THEME_OPTIONS . '[footer-ads]'] );
    }

    if ( isset($customized[HU_THEME_OPTIONS . '[footer-widgets]']) ) {
      $_footer_widgets = intval ( $customized[HU_THEME_OPTIONS . '[footer-widgets]'] );
    }

    //right and left sidebar default widget zones
    //They are always registered because on front end, they can depend on post_metas which are not accessible at this point ( 'widget_init' is too early )
    register_sidebar( $_map['primary'] );
    register_sidebar( $_map['secondary'] );

    if ( $_has_header_ads )
      register_sidebar( $_map['header-ads'] );
    if ( $_has_footer_ads )
      register_sidebar( $_map['footer-ads'] );
    if ( $_footer_widgets >= 1 )
      register_sidebar( $_map['footer-1'] );
    if ( $_footer_widgets >= 2 )
      register_sidebar( $_map['footer-2'] );
    if ( $_footer_widgets >= 3 )
      register_sidebar( $_map['footer-3'] );
    if ( $_footer_widgets >= 4 )
      register_sidebar( $_map['footer-4'] );
  }
endif;
add_action( 'widgets_init', 'hu_maybe_register_builtin_widget_zones' );



//helper
//must be fired after 'wp' to have access to the $wp_query
//"real" because left and right sidebars are always registered
//@return array of locations
function hu_get_available_widget_loc() {
  $_available       = array();
  $_footer_widgets  = intval ( hu_get_option('footer-widgets') );
  $layout           = hu_layout_class();

  if ( hu_is_checked('header-ads') )
    $_available[] = 'header-ads';
  if ( hu_is_checked('footer-ads') )
    $_available[] = 'footer-ads';
  if ( $_footer_widgets >= 1 )
    $_available[] = 'footer-1';
  if ( $_footer_widgets >= 2 )
    $_available[] = 'footer-2';
  if ( $_footer_widgets >= 3 )
    $_available[] = 'footer-3';
  if ( $_footer_widgets >= 4 )
    $_available[] = 'footer-4';

  //for left and right sidebar, it depends on the $layout class computed with options and post_metas
  if ( $layout != 'col-1c' )
    $_available[] = 's1';
  if ( in_array( $layout, array('col-3cm', 'col-3cm', 'col-3cr' ) ) )
    $_available[] = 's2';

  return $_available;
}







/*  Register custom sidebars
/* ------------------------------------ */
if ( ! function_exists( 'hu_maybe_register_custom_widget_zones' ) ) :
  function hu_maybe_register_custom_widget_zones() {
    $customized = array();

    if ( hu_is_customizing() && isset($_POST['customized']) ) {
      $customized = json_decode( wp_unslash( $_POST['customized'] ), true );

      if ( isset($customized['hu_theme_options[sidebar-areas]']) )
        $sidebars = $customized['hu_theme_options[sidebar-areas]'];
      else
        $sidebars = hu_get_option('sidebar-areas', array());
    }
    else {
      $sidebars = hu_get_option('sidebar-areas', array());
    }

    //at this point we need smthg really clean
    if ( ! is_array($sidebars) || empty( $sidebars ) )
       return;

    $default_args = array(
      'name' => '',
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>','before_title' => '<h3>','after_title' => '</h3>'
    );

    $default_zones = hu_get_default_widget_zones();

    foreach( $sidebars as $sb ) {
      if ( ! isset($sb['id']) || empty($sb['id']) )
        return;

      //is it a built-in one?
      //=> in this case it's been registered another way
      $_id = $sb['id'];
      if ( isset( $default_zones[$_id]) )
        continue;

      $args = wp_parse_args(
        array(
          'name' => isset($sb['title']) ? ''. esc_attr( $sb['title'] ).'' : '',
          'id' => ''. esc_attr( strtolower($sb['id']) ).''
        ),
        $default_args
      );

      register_sidebar( $args );
    }//for each
  }
endif;



//add_action( hu_is_customize_preview_frame() ? 'customize_preview_init' : 'widgets_init' , 'hu_maybe_register_custom_widget_zones' );
add_action( 'widgets_init' , 'hu_maybe_register_custom_widget_zones' );
//add_action( 'customize_preview_init' , 'hu_maybe_register_custom_widget_zones' );

/*  Add support for svg and svgz format in media upload
/* ------------------------------------ */
/**
* Returns the $mimes array with svg and svgz entries added
*
* @package Hueman
* @since Hueman 3.0.0
*/
function hu_custom_mtypes( $mimes ) {
  if (! apply_filters( 'hu_add_svg_mime_type' , true ) )
    return $mimes;

  $mimes['svg']   = 'image/svg+xml';
  $mimes['svgz']  = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes' , 'hu_custom_mtypes' );







/* ------------------------------------------------------------------------- *
 *  Admin panel functions
/* ------------------------------------------------------------------------- */

/*  Post formats script
/* ------------------------------------ */
if ( ! function_exists( 'hu_post_formats_script' ) ) {

  function hu_post_formats_script( $hook ) {
    // Only load on posts, pages
    if ( !in_array($hook, array('post.php','post-new.php')) )
      return;
    wp_enqueue_script('post-formats', get_template_directory_uri() . '/assets/admin/js/post-formats.js', array( 'jquery' ));
  }

}
add_action( 'admin_enqueue_scripts', 'hu_post_formats_script');



/*  Add wmode transparent to media embeds
/* ------------------------------------ */
if ( ! function_exists( 'hu_embed_wmode_transparent' ) ) {

  function hu_embed_wmode_transparent( $html, $url, $attr ) {
    if ( strpos( $html, "<embed src=" ) !== false )
       { return str_replace('</param><embed', '</param><param name="wmode" value="opaque"></param><embed wmode="opaque" ', $html); }
    elseif ( strpos ( $html, 'feature=oembed' ) !== false )
       { return str_replace( 'feature=oembed', 'feature=oembed&wmode=opaque', $html ); }
    else
       { return $html; }
  }

}
add_filter( 'embed_oembed_html', 'hu_embed_wmode_transparent', 10, 3 );


/*  Add responsive container to embeds
/* ------------------------------------ */
if ( ! function_exists( 'hu_embed_html' ) ) {

  function hu_embed_html( $html, $url ) {

    $pattern    = '/^https?:\/\/(www\.)?twitter\.com/';
    $is_twitter = preg_match( $pattern, $url );

    if ( 1 === $is_twitter ) {
      return $html;
    }

    return '<div class="video-container">' . $html . '</div>';
  }

}
add_filter( 'embed_oembed_html', 'hu_embed_html', 10, 3 );


/*  Add responsive container to jetpack embeds
/* ------------------------------------ */
if ( ! function_exists( 'hu_embed_html_jp' ) ) {

  function hu_embed_html_jp( $html ) {
    return '<div class="video-container">' . $html . '</div>';
  }

}
add_filter( 'video_embed_html', 'hu_embed_html_jp' );


/*  Upscale cropped thumbnails
/* ------------------------------------ */
if ( ! function_exists( 'hu_thumbnail_upscale' ) ) {

  function hu_thumbnail_upscale( $default, $orig_w, $orig_h, $new_w, $new_h, $crop ){
    if ( !$crop ) return null; // let the wordpress default function handle this

    $aspect_ratio = $orig_w / $orig_h;
    $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

    $crop_w = round($new_w / $size_ratio);
    $crop_h = round($new_h / $size_ratio);

    $s_x = floor( ($orig_w - $crop_w) / 2 );
    $s_y = floor( ($orig_h - $crop_h) / 2 );

    return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
  }

}
add_filter( 'image_resize_dimensions', 'hu_thumbnail_upscale', 10, 6 );


/*  Add shortcode support to text widget
/* ------------------------------------ */
add_filter( 'widget_text', 'do_shortcode' );



/* ------------------------------------------------------------------------- *
 *  Loads and instanciates customizer related classes
/* ------------------------------------------------------------------------- */
if ( hu_is_customizing() ) {
  load_template( get_template_directory() . '/functions/czr/class-czr-init.php' );
  new HU_customize;
}




/* ------------------------------------------------------------------------- *
 *  Loads and instanciates admin pages related classes
/* ------------------------------------------------------------------------- */
if ( is_admin() && ! hu_is_customizing() ) {
  //Update notice
  load_template( get_template_directory() . '/functions/admin/class-admin-update-notification.php' );
  new HU_admin_update_notification;
  if ( hu_is_checked('about-page') ) {
    load_template( get_template_directory() . '/functions/admin/class-admin-page.php' );
    new HU_admin_page;
  }
}

add_action( 'admin_init' , 'hu_admin_style' );
add_action( 'wp_before_admin_bar_render', 'hu_add_help_button' );

function hu_admin_style() {
  wp_enqueue_style(
    'hu-admincss',
    sprintf('%1$sassets/admin/css/hu_admin.css' , HU_BASE_URL ),
    array(),
    HUEMAN_VER
  );
}


function hu_add_help_button() {
   if ( ! current_user_can( 'edit_theme_options' ) || ! hu_is_checked('help-button') || ! hu_is_checked('about-page') )
    return;
  global $wp_admin_bar;
  $wp_admin_bar->add_menu( array(
     'parent' => 'top-secondary', // Off on the right side
     'id' => 'tc-hueman-help' ,
     'title' =>  __( 'Help' , 'hueman' ),
     'href' => admin_url( 'themes.php?page=welcome.php&help=true' ),
     'meta'   => array(
        'title'  => __( 'Need help with the Hueman theme ? Click here!', 'hueman' ),
      ),
   ));
}




/* ------------------------------------------------------------------------- *
 *  Loads Front End files
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-front.php' );


/* Backward compatibility. Typically useful for users of child themes using old function names. */
if ( ! function_exists('alx_layout_class') ) {
  function alx_layout_class() {
    return hu_layout_class();
  }
}

if ( ! function_exists('alx_social_links') ) {
  function alx_social_links() {
    return hu_print_social_links();
  }
}

if ( ! function_exists('alx_site_title') ) {
  function alx_site_title() {
    return hu_site_title();
  }
}

if ( ! function_exists('alx_blog_title') ) {
  function alx_blog_title() {
    return hu_blog_title();
  }
}

if ( ! function_exists('alx_page_title') ) {
  function alx_page_title() {
    return hu_page_title();
  }
}

if ( ! function_exists('alx_post_images') ) {
  function alx_post_images() {
    return hu_post_images();
  }
}

if ( ! function_exists('alx_related_posts') ) {
  function alx_related_posts() {
    return hu_related_posts();
  }
}

if ( ! function_exists('alx_sidebar_secondary') ) {
  function alx_sidebar_secondary() {
    return 'secondary';
  }
}

if ( ! function_exists('alx_sidebar_primary') ) {
  function alx_sidebar_primary() {
    return 'primary';
  }
}
