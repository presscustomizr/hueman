<?php
/* ------------------------------------------------------------------------- *
 *  Define some useful constants
/* ------------------------------------------------------------------------- */
//get WP_Theme object of Hueman
$hu_theme                     = wp_get_theme();

//Get infos from parent theme if using a child theme
$hu_theme = $hu_theme -> parent() ? $hu_theme -> parent() : $hu_theme;
$hu_base_data = array();

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

//HU_IS_PRO
if( ! defined( 'HU_IS_PRO' ) ) define( 'HU_IS_PRO' , file_exists( HU_BASE . 'functions/init-pro.php' ) && "hueman-pro" == sanitize_file_name( strtolower($hu_theme -> name) ) );

//HU_WEBSITE is the home website of Hueman
if( ! defined( 'HU_WEBSITE' ) )         define( 'HU_WEBSITE' , $hu_base_data['authoruri'] );



/* ------------------------------------------------------------------------- *
 *  Loads Pluggable Functions
/* ------------------------------------------------------------------------- */
load_template( HU_BASE . 'functions/init-functions.php' );


/* ------------------------------------------------------------------------- *
 *  PrevDem
/* ------------------------------------------------------------------------- */
if ( hu_isprevdem() ) {
  load_template( get_template_directory() . '/functions/init-prevdem.php' );
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
 *  Loads and instanciates Utils Classes
/* ------------------------------------------------------------------------- */
load_template( HU_BASE . 'functions/class-utils-settings-map.php' );
new HU_utils_settings_map;
load_template( HU_BASE . 'functions/class-utils.php' );
new HU_utils;
//note:  $default is never used => to remove
function hu_get_option( $option_id, $default = '' ) {
  return HU_utils::$inst -> hu_opt( $option_id );
}


/* ------------------------------------------------------------------------- *
 *  Sidebars and Widgets Init
 *  => Loads Custom Widgets
 *  => Registers sidebars
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-sidebars-widgets.php' );


/* ------------------------------------------------------------------------- *
 *  Retro compatibility process and functions
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-retro-compat.php' );


/* ------------------------------------------------------------------------- *
 *  Pro
/* ------------------------------------------------------------------------- */
// Load pro template file only if needed
if ( HU_IS_PRO ) {
  load_template( HU_BASE . 'functions/init-pro.php' );
  new HU_init_pro();
}


/* ------------------------------------------------------------------------- *
* Load OptionTree framework
* Has to be loaded before after_setup_theme (important for plugin compatibility like ACF)
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/option-tree/ot-loader.php' );


/* ------------------------------------------------------------------------- *
 *  Text Domain
 *  Meta Boxes
 *  Registers Image Sizes, Theme Supports, Nav Menus
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-after-setup-theme.php' );


/* ------------------------------------------------------------------------- *
 *  Plugins Compatibility
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-plugins-compat.php' );



/* ------------------------------------------------------------------------- *
 *   WP Core Filters : upload_mimes, embeds, image_resize_dimensions, widget_text
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-wp-core-filters.php' );



/* ------------------------------------------------------------------------- *
 *  Init Admin actions and filters
 *  Meta Boxes
 *  TGM Plugin recommendation
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-admin.php' );


/* ------------------------------------------------------------------------- *
 *  Loads and instanciates customizer related classes
/* ------------------------------------------------------------------------- */
if ( hu_is_customizing() ) {
  load_template( get_template_directory() . '/functions/czr/class-czr-init.php' );
  new HU_customize();
}



/* ------------------------------------------------------------------------- *
 *  Loads Front End files
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-front.php' );
// Load dynamic styles
load_template( get_template_directory() . '/functions/dynamic-styles.php' );

do_action('hu_hueman_loaded');