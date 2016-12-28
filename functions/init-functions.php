<?php

/* ------------------------------------------------------------------------- *
 *  Demo
/* ------------------------------------------------------------------------- */
//@return bool
function hu_isprevdem() {
  $_active_theme = hu_get_raw_option( 'template' );
  return apply_filters( 'hu_isprevdem', ( $_active_theme != strtolower(THEMENAME) && ! is_child_theme() ) );
}


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
  return is_customize_preview() || ( ! is_admin() && isset($_REQUEST['customize_messenger_channel']) );
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
  return hu_is_customize_left_panel() || hu_is_customize_preview_frame() || hu_doing_customizer_ajax();
}


//@return boolean
function hu_is_partial_refreshed_on() {
  return apply_filters( 'hu_partial_refresh_on', true );
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
  $bool = false;
  if ( has_nav_menu( $_location ) || ! in_array( $_location, array( 'header', 'footer') ) ) {
    $bool = has_nav_menu( $_location );
  } else {
    switch ($_location) {
      case 'footer':
      case 'header':
        $bool = hu_is_checked( "default-menu-{$_location}" );
      break;
    }
  }
  return apply_filters( 'hu_has_nav_menu', $bool, $_location );
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
    || hu_is_blogpage() || is_home() || is_search() || is_archive()
  );
}

/**
* helper
* used to define active callback in the customizer
* => is_single triggers an error in 4.7
* @return  bool
*/
function hu_is_page() {
  return is_page();
}

/**
* helper
* used to define active callback in the customizer
* => is_single triggers an error in 4.7
* @return  bool
*/
function hu_is_single() {
  return is_single();
}

/**
* helper
* used to define active callback in the customizer
* => is_single triggers an error in 4.7
* @return  bool
*/
function hu_is_singular() {
  return is_singular();
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
* helper
* Whether or not we are in the ajax context
* @since v3.2.14
* @return bool
*/
function hu_is_ajax() {

  /*
  * wp_doing_ajax() introduced in 4.7.0
  */
  $wp_doing_ajax = ( function_exists('wp_doing_ajax') && wp_doing_ajax() ) || ( ( defined('DOING_AJAX') && 'DOING_AJAX' ) );

  /*
  * https://core.trac.wordpress.org/ticket/25669#comment:19
  * http://stackoverflow.com/questions/18260537/how-to-check-if-the-request-is-an-ajax-request-with-php
  */
  $_is_ajax      = $wp_doing_ajax || ( ! empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');

  return apply_filters( 'hu_is_ajax', $_is_ajax );
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
* Wrapper of the_post_thumbnail
* It also handles the placeholder image if requested and option checked
* => the goal is to "scope" the filter the thumbnail html only to the Hueman theme.
* => avoid potential conflict with plugins
*
* @echo html
*/
function hu_the_post_thumbnail( $size = 'post-thumbnail', $attr = '', $placeholder = true ) {
  $html = '';
  $post = get_post();
  if ( ! $post || ! has_post_thumbnail() ) {
    if ( hu_is_checked('placeholder') && (bool)$placeholder ) {
      $html = hu_get_placeholder_thumb( $size );
    }
  } else {
    $html = get_the_post_thumbnail( null, $size, $attr );
  }

  echo apply_filters( 'hu_post_thumbnail_html', $html, $size, $attr );
}