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


//@return boolean
function hu_is_partial_refreshed_on() {
  return apply_filters( 'hu_partial_refresh_on', true );
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


/**
* Is there a menu assigned to a given location ?
* @return bool
*/
function hu_has_nav_menu( $_location ) {
  if ( has_nav_menu( $_location ) || ! in_array( $_location, array( 'header', 'footer') ) )
    return has_nav_menu( $_location );
  $bool = false;
  switch ($_location) {
    case 'header':
      $bool = hu_is_checked( "default-menu-{$_location}" );
    break;

    case 'footer':
      $bool = hu_isprevdem();
    break;
  }
  return $bool;
}



//@return an array of unfiltered options
//=> all options or a single option val
function hu_get_raw_option( $opt_name = null, $opt_group = null ) {
    $alloptions = wp_cache_get( 'alloptions', 'options' );
    $alloptions = maybe_unserialize($alloptions);
    if ( ! is_null( $opt_group ) && isset($alloptions[$opt_group]) ) {
      $alloptions = maybe_unserialize($alloptions[$opt_group]);
    }
    if ( is_null( $opt_name ) )
      return $alloptions;
    return isset( $alloptions[$opt_name] ) ? maybe_unserialize($alloptions[$opt_name]) : false;
}


//@return bool
function hu_isprevdem() {
  $_active_theme = hu_get_raw_option( 'template' );
  return apply_filters( 'hu_isprevdem', ( $_active_theme != strtolower(THEMENAME) && ! is_child_theme() ) );
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
  return is_home() || ( is_home() && ( 'posts' == get_option( 'show_on_front' ) || '__nothing__' == get_option( 'show_on_front' ) ) ) || is_front_page();
}

/**
* Check if we show posts or page content on home page
* @return  bool
*/
function hu_is_home_empty() {
  //check if the users has choosen the "no posts or page" option for home page
  return ( is_home() || is_front_page() ) && '__nothing__' == get_option( 'show_on_front' );
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
* //must be archive or search result. Returns false if home is empty in options.
* @return  bool
*/
function hu_is_post_list() {
  global $wp_query;

  return apply_filters( 'hu_is_post_list',
    ( ! is_singular()
    && ! is_404()
    && ( is_search() && 0 != $wp_query -> post_count )
    && ! hu_is_home_empty() )
    || hu_is_blogpage() || is_home()
  );
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
    $_src = false;

  $_src      = hu_get_img_src( $_img_option );
  //hook
  return apply_filters( "hu_img_src_from_option" , $_src, $option_name ) ;
}


/**
* wrapper of the_post_thumbnail
* => the goal is to "scope" the filter the thumbnail html only to the Hueman theme.
* => avoid potential conflict with plugins
* @echo html
*/
function hu_the_post_thumbnail( $size = 'post-thumbnail', $attr = '' ) {
  $post = get_post();
  if ( ! $post ) {
    return '';
  }
  $html = get_the_post_thumbnail( null, $size, $attr );
  echo apply_filters( 'hu_post_thumbnail_html', $html, $size, $attr );
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
//THEMENAME contains the Name of the currently loaded theme. Will always be the parent theme name is a child theme is activated.
if( ! defined( 'THEMENAME' ) )       define( 'THEMENAME' , $hu_base_data['title'] );
//TEXT DOMAIN FOR TRANSLATIONS
if( ! defined( 'THEME_TEXT_DOM' ) )       define( 'THEME_TEXT_DOM' , 'hueman' );
//HU_OPTION_GROUP contains the Name of the hueman theme options in wp_options
//=> was previously option tree default name
if( ! defined( 'HU_THEME_OPTIONS' ) ) define( 'HU_THEME_OPTIONS' , apply_filters( 'hu_theme_options', 'hu_theme_options' ) );

if( ! defined( 'HU_OPT_AJAX_ACTION' ) ) define( 'HU_OPT_AJAX_ACTION' , 'hu_get_option' );

if( ! defined( 'HU_SKOP_ON' ) ) define( 'HU_SKOP_ON' , false );
if( ! defined( 'HU_SEK_ON' ) ) define( 'HU_SEK_ON' , false );

//HU_IS_PRO
if( ! defined( 'HU_IS_PRO' ) ) define( 'HU_IS_PRO' , file_exists( HU_BASE . 'functions/init-pro.php' ) && "hueman-pro" == sanitize_file_name( strtolower($hu_theme -> name) ) );

//HU_WEBSITE is the home website of Hueman
if( ! defined( 'HU_WEBSITE' ) )         define( 'HU_WEBSITE' , $hu_base_data['authoruri'] );



/* ------------------------------------------------------------------------- *
 *  Loads and instanciates Utils
/* ------------------------------------------------------------------------- */
load_template( HU_BASE . 'functions/class-utils-settings-map.php' );
new HU_utils_settings_map;
load_template( HU_BASE . 'functions/class-utils.php' );
new HU_utils;

// Load pro template file only if needed
if ( HU_IS_PRO ) {
  load_template( HU_BASE . 'functions/init-pro.php' );
  new HU_init_pro;
}

/* ------------------------------------------------------------------------- *
 *  Loads BETAS
/* ------------------------------------------------------------------------- */
if ( HU_SKOP_ON ) {
  load_template( get_template_directory() . '/functions/skop-sek/skop/init-skop.php' );
}
if ( HU_SEK_ON ) {
  load_template( get_template_directory() . '/functions/skop-sek/sektions/init-sektions.php' );
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
add_filter('hu_implement_options_compat', 'hu_filter_add_new_sidebar_options');


//hook : hu_implement_options_compat
function hu_filter_add_new_sidebar_options( $__options ) {
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



//helper used to re-build the sidebar-areas option from defaults if the option is empty or has been deleted for some reasons
function hu_generate_new_sidebar_options() {
    //generates the default widget zone options
    $_default_locations = hu_get_builtin_widget_zones_location();
    $builtin_zones = array();

    foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {

        $_locs = array();
        if ( isset($_default_locations[$_zone_id]) ) {
          $_locs[] = key($_default_locations[$_zone_id]);
        }

        $_contexts = array();
        if ( isset($_default_locations[$_zone_id]) ) {
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

    return $builtin_zones;
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

//fired early
//@param $_options = get_option( HU_THEME_OPTIONS )
//handles the transfer from option tree to customizer
//=> as of v3.0.10, options have been moved from option tree to customizer to be compliant with the wp.org theme guidelines
function hu_maybe_transfer_option_tree_to_customizer( $_options ) {
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

//fired early
//@return void()
//@param $_options = get_option( HU_THEME_OPTIONS )
//handles the transition to the WP custom_logo support introduced in wp 4.5.
//Several cases :
//1) user had defined a custom logo with the previous Hueman option
//=> the option has to be copied to WP custom_logo theme mod
//=> display-header-logo set to true
//2) user had not defined a custom logo in Hueman
//=> display-header-logo set to false
function hu_maybe_copy_logo_to_theme_mod( $_options ) {
  //keep using the old logo if WP version < 4.5
  if ( ! function_exists( 'the_custom_logo' ) )
    return;

  $_old_custom_logo_exists = isset($_options['custom-logo']) && false != $_options['custom-logo'] && ! empty($_options['custom-logo']);
  if ( $_old_custom_logo_exists ) {
    set_theme_mod( 'custom_logo', $_options['custom-logo'] );
    $_options['display-header-logo'] = 1;
    unset($_options['custom-logo']);
    update_option( HU_THEME_OPTIONS, $_options );
  }
}


//copy old options from option tree framework into new option raw 'hu_theme_options'
//copy logo from previous to custom_logo introduced in wp 4.5
//only if user is logged in
if ( is_user_logged_in() && current_user_can( 'edit_theme_options' ) ) {
  $_options = get_option( HU_THEME_OPTIONS );
  hu_maybe_transfer_option_tree_to_customizer( $_options );
  hu_maybe_copy_logo_to_theme_mod( $_options );
}



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

    //Load compatibility plugins functions
    load_template( get_template_directory() . '/functions/plugins-compatibility.php' );
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
    // Enable header image
    // the header image is stored as a theme mod option
    // get_theme_mod( 'header_image', get_theme_support( 'custom-header', 'default-image' ) );
    // Backward compat : if a header-image was previously set by the user, then it becomes the default image, otherwise we fall back on the asset's default.
    $_old_header_image_val = hu_get_option('header-image');
    $did_user_set_an_image = false != $_old_header_image_val && ! empty($_old_header_image_val);
    $headers = apply_filters( 'hu_default_header_img' , array(
            'default-header' => array(
              'url'           => '%s/assets/front/img/header/default-header-280.jpg',
              'thumbnail_url' => '%s/assets/front/img/header/default-header-280.jpg',
              'description'   => 'Coffee'
            ),
            'yosemite' => array(
              'url'           => '%s/assets/front/img/header/yosemite-280.jpg',
              'thumbnail_url' => '%s/assets/front/img/header/yosemite-280.jpg',
              'description'   => 'Yosemite'
            ),
            'bridge' => array(
              'url'           => '%s/assets/front/img/header/bridge-280.jpg',
              'thumbnail_url' => '%s/assets/front/img/header/bridge-280.jpg',
              'description'   => 'Golden Gate Bridge'
            ),
            'nyc' => array(
              'url'           => '%s/assets/front/img/header/nyc-280.jpg',
              'thumbnail_url' => '%s/assets/front/img/header/nyc-280.jpg',
              'description'   => 'New York City'
            ),
            'california' => array(
              'url'           => '%s/assets/front/img/header/california-280.jpg',
              'thumbnail_url' => '%s/assets/front/img/header/california-280.jpg',
              'description'   => 'California'
            )
        )
    );
    register_default_headers( $headers );

    add_theme_support( 'custom-header', array(
        'default-image' => $did_user_set_an_image ? hu_get_img_src_from_option('header-image') : sprintf( '%1$s/assets/front/img/header/default-header-280.jpg' , get_template_directory_uri() ),
        'width'     => 1380,
        'height'    => 280,
        'flex-width' => true,
        'flex-height' => true,
        'header-text'  => false
    ) );

    // Enable Custom Logo
    add_theme_support( 'custom-logo', array(
        'width'     => 250,
        'height'    => 100,
        'flex-width' => true,
        'flex-height' => true,
    ) );

    // Enable title tag
    add_theme_support( 'title-tag' );
    // Enable automatic feed links
    // => Adds RSS feed links to <head> for posts and comments.
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
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>',
    ),
    'secondary' => array(
      'name' => __( 'Secondary', 'hueman' ),
      'id' => 'secondary',
      'description' => __( "Full width widget zone. Located in the right sidebar in a 3 columns layout.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>'
    ),
    'footer-1' => array(
      'name' => __( 'Footer 1', 'hueman'),
      'id' => 'footer-1',
      'description' => __( "Widgetized footer 1", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>'
    ),
    'footer-2' => array(
      'name' => __('Footer 2', 'hueman' ),
      'id' => 'footer-2',
      'description' => __("Widgetized footer 2", 'hueman' ),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>'
    ),
    'footer-3' => array(
      'name' => __('Footer 3', 'hueman' ),
      'id' => 'footer-3',
      'description' => __("Widgetized footer 3", 'hueman' ),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>'
    ),
    'footer-4' => array(
      'name' => __('Footer 4', 'hueman' ),
      'id' => 'footer-4',
      'description' => __("Widgetized footer 4", 'hueman' ),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">','after_title' => '</h3>'
    ),
    'header-ads' => array(
      'name' => __( 'Header (next to logo / title)', 'hueman' ),
      'id' => 'header-ads',
      'description' => __( "The Header Widget Zone is located next to your logo or site title.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>'
    ),
    'footer-ads' => array(
      'name' => __('Footer Full Width', 'hueman'),
      'id' => 'footer-ads',
      'description' => __( "The Footer Widget Zone is located before the other footer widgets and takes 100% of the width. Very appropriate to display a Google Map or an advertisement banner.", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3 class="widget-title">',
      'after_title' => '</h3>'
    )
  );
}

//@return an array of default widgets ids
function hu_get_widget_zone_ids() {
  $widgets = hu_get_default_widget_zones();
  return array_keys( $widgets );
}


//@return an array of widget option names
function hu_get_registered_widgets_option_names() {
  global $wp_registered_widgets;
  $opt_names = array();
  foreach ($wp_registered_widgets as $id => $data ) {
    if ( ! isset($data['callback']) || ! isset($data['callback'][0]) || ! isset($data['callback'][0] -> option_name ) )
      continue;
    if ( ! in_array( $data['callback'][0] -> option_name, $opt_names ) )
      array_push( $opt_names, $data['callback'][0] -> option_name );
  }
  return $opt_names;
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
      'after_widget' => '</div>','before_title' => '<h3 class="widget-title">','after_title' => '</h3>'
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
    require_once( ABSPATH . WPINC . '/class-oembed.php' );
    $wp_oembed = _wp_oembed_get_object();
    $provider = $wp_oembed -> get_provider( $url, $args = '' );
    if ( ! $provider || false === $data = $wp_oembed->fetch( $provider, $url, $args ) ) {
      return $html;
    }
    $type = $data -> type;
    switch( $type ) {
        case 'video' :
          $html = sprintf('<div class="video-container">%1$s</div>', $html );
        break;
    }
    return $html;
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
 *  Loads Required Plugin Class and Setup
/* ------------------------------------------------------------------------- */
if ( is_admin() && ! hu_is_customizing() ) {
  /**
  * Include the TGM_Plugin_Activation class.
  */
  load_template( get_template_directory() . '/functions/admin/class-tgm-plugin-activation.php' );
  add_action( 'tgmpa_register', 'hu_register_required_plugins' );
}


/**
 * Register the required plugins for this theme.
 *
 * In this example, we register two plugins - one included with the TGMPA library
 * and one from the .org repo.
 *
 * The variable passed to tgmpa_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into tgmpa_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */
function hu_register_required_plugins() {

  /**
   * Array of plugin arrays. Required keys are name and slug.
   * If the source is NOT from the .org repo, then source is also required.
   */
  $plugins = array(

    // This is an example of how to include a plugin pre-packaged with a theme
    // array(
    //   'name'            => 'TGM Example Plugin', // The plugin name
    //   'slug'            => 'tgm-example-plugin', // The plugin slug (typically the folder name)
    //   'source'          => get_stylesheet_directory() . '/lib/plugins/tgm-example-plugin.zip', // The plugin source
    //   'required'        => true, // If false, the plugin is only 'recommended' instead of required
    //   'version'         => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
    //   'force_activation'    => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
    //   'force_deactivation'  => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
    //   'external_url'      => '', // If set, overrides default API URL and points to an external URL
    // ),

    // This is an example of how to include a plugin from the WordPress Plugin Repository
    array(
      'name'    => 'Hueman Addons',
      'slug'    => 'hueman-addons',
      'required'  => false,
    ),

  );


  /**
   * Array of configuration settings. Amend each line as needed.
   * If you want the default strings to be available under your own theme domain,
   * leave the strings uncommented.
   * Some of the strings are added into a sprintf, so see the comments at the
   * end of each line for what each argument will be.
   */
  $config = array(
      'id'           => 'hueman',                 // Unique ID for hashing notices for multiple instances of TGMPA.
      'default_path' => '',                      // Default absolute path to bundled plugins.
      'menu'         => 'tgmpa-install-plugins', // Menu slug.
      'has_notices'  => true,                    // Show admin notices or not.
      'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
      'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
      'is_automatic' => false,                   // Automatically activate plugins after installation or not.
      'message'      => '',                      // Message to output right before the plugins table.
      'message'       => '',              // Message to output right before the plugins table
      'strings'         => array(
          'page_title'                            => __( 'Install Required Plugins', 'hueman' ),
          'menu_title'                            => __( 'Install Plugins', 'hueman' ),
          'installing'                            => __( 'Installing Plugin: %s', 'hueman' ), // %1$s = plugin name
          'oops'                                  => __( 'Something went wrong with the plugin API.', 'hueman' ),
          'notice_can_install_required'           => _n_noop( 'The Hueman theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_can_install_recommended'      => _n_noop( 'The Hueman theme recommends the Hueman Addons: %1$s.', 'This theme recommends the following plugins: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'hueman' ), // %1$s = plugin name(s)
          'notice_can_activate_required'          => _n_noop( 'The Hueman Addons required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_can_activate_recommended'     => _n_noop( 'The Hueman Addons plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'hueman' ), // %1$s = plugin name(s)
          'notice_ask_to_update'            => _n_noop( 'The Hueman Addons plugin needs to be updated to its latest version to ensure maximum compatibility with the Hueman theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'hueman' ), // %1$s = plugin name(s)
          'install_link'                  => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'hueman' ),
          'activate_link'                 => _n_noop( 'Activate Hueman Addons', 'Activate installed plugins', 'hueman' ),
          'return'                                => __( 'Return to Required Plugins Installer', 'hueman' ),
          'plugin_activated'                      => __( 'Plugin activated successfully.', 'hueman' ),
          'complete'                  => __( 'All plugins installed and activated successfully. %s', 'hueman' ), // %1$s = dashboard link
          'nag_type'                  => 'updated' // Determines admin notice type - can only be 'updated' or 'error'
      )
  );

  tgmpa( $plugins, $config );

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
    return hu_get_page_title();
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


/* ------------------------------------------------------------------------- *
 *  Demo
/* ------------------------------------------------------------------------- */
if ( hu_isprevdem() ) {
    add_filter('hu_display_header_logo', '__return_true');
    add_filter('hu_header_logo_src', 'hu_prevdem_logo' );
    add_filter('hu_footer_logo_src', 'hu_prevdem_logo' );
    function hu_prevdem_logo( $_src ) {
      $logo_path = 'assets/front/img/demo/logo/logo.png';
      if ( file_exists( HU_BASE . $logo_path ) )
        return get_template_directory_uri() . '/' . $logo_path;
      return $_src;
    }
    add_filter('hu_blog_title', 'hu_prevdem_blogheading');
    function hu_prevdem_blogheading() {
        return sprintf('%1$s <span class="hu-blog-subheading">%2$s</span>',
            "THE BLOG",
            "WHAT'S NEW?"
        );
    }

    add_filter('hu_opt_social-links', 'hu_prevdem_socials');
    function hu_prevdem_socials() {
      $def_social = array(
          'title' => '',
          'social-icon' => '',
          'social-link' => '',
          'social-color' => 'rgba(255,255,255,0.7)',
          'social-target' => 1
      );
      $raw = array(
            array(
                'title' => 'Follow us on Twitter',
                'social-icon' => 'fa-twitter'
            ),
            array(
                'title' => 'Follow us on Facebook',
                'social-icon' => 'fa-facebook'
            ),
            array(
                'title' => 'Follow us on Linkedin',
                'social-icon' => 'fa-linkedin'
            ),
            array(
                'title' => 'Follow us on Google',
                'social-icon' => 'fa-google'
            ),
            array(
                'title' => 'Rss feed',
                'social-icon' => 'fa-rss'
            )
      );
      $socials = array();
      foreach ( $raw as $key => $data) {
        $socials[] = wp_parse_args( $data, $def_social );
      }
      return $socials;
    }
}