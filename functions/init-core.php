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





/* ------------------------------------------------------------------------- *
 *  Loads and instanciates Utils
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/class-utils-options.php' );
load_template( get_template_directory() . '/functions/class-utils-settings-map.php' );
new HU_utils_options;
new HU_utils_settings_map;


//note:  $default is never used => to remove
function hu_get_option( $option_id, $default = '' ) {
  return HU_utils_options::$inst -> hu_opt( $option_id );
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
load_template( get_template_directory() . '/option-tree/ot-loader.php' );


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
//HU_WEBSITE is the home website of Hueman
if( ! defined( 'HU_WEBSITE' ) )         define( 'HU_WEBSITE' , $hu_base_data['authoruri'] );










/* ------------------------------------------------------------------------- *
 *  Do we need to copy old Option Tree options ?
/* ------------------------------------------------------------------------- */
add_filter('hu_implement_options_compat', 'hu_generate_new_sidebar_options');

//hook : hu_implement_options_compat
//OLD : the sidebar area was an array of two items : title and id
//NEW : now it's and array of 4 items : title, id, [contexts], [locations]
//=> the previous s1* and s2* options are not used anymore, they've been merged in the sidebar-areas option
//=> how to new from old ?
//1)
// function hu_build_new_sidebar_options( $options ) {
//   $_old_sb_opt = isset( $options['sidebar-areas'] ) ? $options['sidebar-areas'] : array();
//   if ( empty($options['sidebar-areas']) )
//     return $options;
//   foreach ( $_old_sb_opt as $key => $value ) {

//   }
// }


//hook : hu_implement_options_compat
function hu_generate_new_sidebar_options($__options) {
  //generates the default widget zone options
  $_default_locations = hu_get_builtin_widget_zones_location();
  $builtin_zones = array();

  foreach ( hu_get_default_widget_zones() as $_zone_id => $_data ) {
    //get the default location
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

  $__options['sidebar-areas'] = array_merge( $builtin_zones, $custom_zones );
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





function hu_update_options() {
  $_options = get_option( HU_THEME_OPTIONS );

  $copy_option_tree = isset( $_GET['copy_option_tree'] );

  //have the option already been copied ?
  if ( isset($_options['has_been_copied']) && true === $_options['has_been_copied'] && ! $copy_option_tree )
    return;

  //if not then grab the options from option tree and copy them into the new option raw
  //Ensure compatibility for some options like sidebar-areas + s1*, s2*options
  $_opt_to_copy = apply_filters('hu_implement_options_compat', get_option( 'option_tree' ) );

  update_option(
    HU_THEME_OPTIONS,
    array_merge( $_opt_to_copy, array('has_been_copied' => true) )
  );

}


//copy old options from option tree framework into new option raw 'hu_theme_options'
//only if user is logged in
if ( is_user_logged_in() )
  hu_update_options();









/* ------------------------------------------------------------------------- *
 *  Load theme files
/* ------------------------------------------------------------------------- */

if ( ! function_exists( 'hu_load' ) ) {

  function hu_load() {
    // Load theme languages
    load_theme_textdomain( 'hueman', get_template_directory().'/languages' );

    // Load theme options and meta boxes
    load_template( get_template_directory() . '/functions/theme-options.php' );
    load_template( get_template_directory() . '/functions/meta-boxes.php' );

    // Load custom widgets
    load_template( get_template_directory() . '/functions/widgets/alx-tabs.php' );
    load_template( get_template_directory() . '/functions/widgets/alx-video.php' );
    load_template( get_template_directory() . '/functions/widgets/alx-posts.php' );

    // Load dynamic styles
    load_template( get_template_directory() . '/functions/dynamic-styles.php' );

    // Load TGM plugin activation
    load_template( get_template_directory() . '/functions/class-tgm-plugin-activation.php' );
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

function hu_get_default_widget_zones() {
  return array(
    'primary' => array(
      'name' => __( 'Primary', 'hueman' ),
      'id' => 'primary',
      'description' => __( "Full width widget zone located in the right sidebar", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>',
    ),
    'secondary' => array(
      'name' => __( 'Secondary', 'hueman' ),
      'id' => 'secondary',
      'description' => __( "Full width widget zone located in the left sidebar", 'hueman'),
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'header-ads' => array(
      'name' => __( 'Header Ads', 'hueman' ),
      'id' => 'header-ads',
      'description' => "Header ads area",
      'before_widget' => '<div id="%1$s" class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ),
    'footer-ads' => array(
      'name' => __( 'Footer Ads', 'hueman'),
      'id' => 'footer-ads',
      'description' => __( "Footer ads area", 'hueman'),
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
    )
  );
}



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



//the original mapping (s1 and s2) has to be kept since it is used in many places
//widget_zone_name => location, title
function hu_get_builtin_widget_zones_location() {
  return array(
    'primary'     => array( 's1' => __('Left Sidebar', 'hueman') ),
    'secondary'   => array( 's2' => __('Right Sidebar', 'hueman') ),
    'header-ads'  => array( 'header-ads' => __('Header', 'hueman') ),
    'footer-ads'  => array( 'footer-ads' => __('Before footer', 'hueman') ),
    'footer-1'    => array( 'footer-1' => __('Footer 1', 'hueman') ),
    'footer-2'    => array( 'footer-2' => __('Footer 2', 'hueman') ),
    'footer-3'    => array( 'footer-3' => __('Footer 3', 'hueman') ),
    'footer-4'    => array( 'footer-4' => __('Footer 4', 'hueman') )
  );
}


if ( ! function_exists( 'hu_maybe_register_builtin_widget_zones' ) ) :

  function hu_maybe_register_builtin_widget_zones() {
    $_map = hu_get_default_widget_zones();

    //when customizing, widgets_init is too early.
    //Therefore, we need to access the customized data from the post global.
    $customized       = array();
    $_has_header_ads  = hu_is_checked('header-ads');
    $_has_footer_ads  = hu_is_checked('footer-ads');
    $_footer_widgets  = intval ( hu_get_option('footer-widgets') );

    if ( hu_is_customizing() && isset($_POST['customized']) ) {
      $_json = json_decode( wp_unslash( $_POST['customized'] ), true );
      if ( ! empty( $_json ) )
        $customized = $_json;
    }


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
    wp_enqueue_script('post-formats', get_template_directory_uri() . '/assets/back/js/post-formats.js', array( 'jquery' ));
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



/*  TGM plugin activation
/* ------------------------------------ */
if ( ! function_exists( 'hu_plugins' ) ) {

  function hu_plugins() {
    if ( hu_is_checked('recommended-plugins') ) {
      // Add the following plugins
      $plugins = array(
        array(
          'name'        => 'Regenerate Thumbnails',
          'slug'        => 'regenerate-thumbnails',
          'required'      => false,
          'force_activation'  => false,
          'force_deactivation'=> false,
        ),
        array(
          'name'        => 'WP-PageNavi',
          'slug'        => 'wp-pagenavi',
          'required'      => false,
          'force_activation'  => false,
          'force_deactivation'=> false,
        ),
        array(
          'name'        => 'Responsive Lightbox',
          'slug'        => 'responsive-lightbox',
          'required'      => false,
          'force_activation'  => false,
          'force_deactivation'=> false,
        ),
        array(
          'name'        => 'Contact Form 7',
          'slug'        => 'contact-form-7',
          'required'      => false,
          'force_activation'  => false,
          'force_deactivation'=> false,
        )
      );
      tgmpa( $plugins );
    }
  }

}
add_action( 'tgmpa_register', 'hu_plugins' );




/* ------------------------------------------------------------------------- *
 *  Loads and instanciates customizer related classes
/* ------------------------------------------------------------------------- */
if ( hu_is_customizing() ) {
  load_template( get_template_directory() . '/functions/class-admin-customize.php' );
  new HU_customize;
}





/* ------------------------------------------------------------------------- *
 *  Loads Front End files
/* ------------------------------------------------------------------------- */
load_template( get_template_directory() . '/functions/init-front.php' );