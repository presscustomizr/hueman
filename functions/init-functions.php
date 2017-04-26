<?php

/* ------------------------------------------------------------------------- *
 *  Demo
/* ------------------------------------------------------------------------- */
//@return bool
function hu_isprevdem() {
    global $wp_customize;
    $is_dirty = false;
    if ( is_object( $wp_customize ) && method_exists( $wp_customize, 'unsanitized_post_values' ) ) {
        $real_cust            = $wp_customize -> unsanitized_post_values( array( 'exclude_changeset' => true ) );
        $_preview_index       = array_key_exists( 'customize_messenger_channel' , $_POST ) ? $_POST['customize_messenger_channel'] : '';
        $_is_first_preview    = false !== strpos( $_preview_index ,'-0' );
        $_doing_ajax_partial  = array_key_exists( 'wp_customize_render_partials', $_POST );
        //There might be cases when the unsanitized post values contains old widgets infos on initial preview load, giving a wrong dirtyness information
        $is_dirty             = ( ! empty( $real_cust ) && ! $_is_first_preview ) || $_doing_ajax_partial;
    }
    return apply_filters( 'hu_isprevdem', ! $is_dirty && hu_get_raw_option( 'template', null, false ) != get_stylesheet() && ! is_child_theme() && ! HU_IS_PRO  );
}

/****************************************************************************
****************************** HELPERS **************************************
*****************************************************************************/
/**
* Returns the "real" queried post ID or if !isset, get_the_ID()
* Checks some contextual booleans
*
*/
function hu_get_id()  {
    if ( in_the_loop() ) {
        $_id            = get_the_ID();
    } else {
        global $post;
        $queried_object   = get_queried_object();
        $_id            = ( ! empty ( $post ) && isset($post -> ID) ) ? $post -> ID : null;
        $_id            = ( isset ($queried_object -> ID) ) ? $queried_object -> ID : $_id;
    }
    return ( is_404() || is_search() || is_archive() ) ? null : $_id;
}

//Use to generate unique menu id attribute data-menu-id
//=> is used in the front js app to populate the collection
//the css # id could not be used because historically not unique in the theme
function hu_get_menu_id( $location = 'menu' ) {
      if ( ! isset( $GLOBALS['menu_id'] ) )
        $GLOBALS['menu_id'] = 0;

      $GLOBALS['menu_id'] = $GLOBALS['menu_id'] + 1;
      return $location . '-' . $GLOBALS['menu_id'];
}

//@return the position of the sidebar as a string, depending on the choosen layout
//=> is used to write an html attribute, used by the front end js
function hu_get_sidebar_position( $sidebar = 's1' ) {
      $layout = hu_get_layout_class();
      $position_map = array(
          's1' => array(
              'col-2cl' => 'right',
              'col-3cl' => 'right',
              'col-3cm' => 'left',
              'col-3cr' => 'left',
          ),
          's2' => array(
              'col-2cr' => 'right',
              'col-3cm' => 'right',
              'col-3cr' => 'middle-left',
              'col-3cl' => 'middle-right',
          )
      );
      if ( ! array_key_exists( $sidebar, $position_map ) )
        return 'left';
      return array_key_exists( $layout, $position_map[ $sidebar ] ) ? $position_map[ $sidebar ][ $layout ] : 'left';
}

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
    $val = hu_get_option( $opt_name );
    //cast to string if array
    $val = is_array($val) ? $val[0] : $val;
    return hu_booleanize_checkbox_val( $val );
}

function hu_booleanize_checkbox_val( $val ) {
    if ( ! $val )
      return false;
    switch ( (string) $val ) {
      case 'off':
      case '' :
        return false;
      case 'on':
      case '1' :
        return true;
      default : return false;
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
* @param $_ver : string free version
* @param $_pro_ver : string pro version
*/
function hu_user_started_before_version( $_ver, $_pro_ver = null ) {
    $_trans = HU_IS_PRO ? 'started_using_hueman_pro' : 'started_using_hueman';
    //the transient is set in HU_utils::hu_init_properties()
    if ( ! get_transient( $_trans ) )
      return false;

    $_ver   = HU_IS_PRO ? $_pro_ver : $_ver;
    if ( ! is_string( $_ver ) )
      return false;

    $_start_version_infos = explode( '|', esc_attr( get_transient( $_trans ) ) );

    if ( ! is_array( $_start_version_infos ) )
      return false;

    switch ( $_start_version_infos[0] ) {
        //in this case we know exactly what was the starting version (most common case)
        case 'with':
            return isset( $_start_version_infos[1] ) ? version_compare( $_start_version_infos[1] , $_ver, '<' ) : true;
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
* @param $location string can be header, footer, topbar
* @return bool
*/
function hu_has_nav_menu( $_location ) {
    $bool = false;
    if ( has_nav_menu( $_location ) || ! in_array( $_location, array( 'topbar', 'footer') ) ) {
      $bool = has_nav_menu( $_location );
    } else {
      switch ($_location) {
        case 'footer':
          $bool = hu_is_checked( "default-menu-footer" );
        break;
        case 'topbar':
          $bool = hu_is_checked( "default-menu-header" );
        break;
      }
    }
    return apply_filters( 'hu_has_nav_menu', $bool, $_location );
}



//@return an array of unfiltered options
//=> all options or a single option val
function hu_get_raw_option( $opt_name = null, $opt_group = null, $from_cache = true ) {
    $alloptions = wp_cache_get( 'alloptions', 'options' );
    $alloptions = maybe_unserialize( $alloptions );
    //is there any option group requested ?
    if ( ! is_null( $opt_group ) && array_key_exists( $opt_group, $alloptions ) ) {
      $alloptions = maybe_unserialize( $alloptions[ $opt_group ] );
    }
    //shall we return a specific option ?
    if ( is_null( $opt_name ) ) {
        return $alloptions;
    } else {
        $opt_value = array_key_exists( $opt_name, $alloptions ) ? maybe_unserialize( $alloptions[ $opt_name ] ) : false;//fallback on cache option val
        //do we need to get the db value instead of the cached one ? <= might be safer with some user installs not properly handling the wp cache
        //=> typically used to checked the template name for czr_fn_isprevdem()
        if ( ! $from_cache ) {
            global $wpdb;
            //@see wp-includes/option.php : get_option()
            $row = $wpdb->get_row( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1", $opt_name ) );
            if ( is_object( $row ) ) {
                $opt_value = $row->option_value;
            }
        }
        return $opt_value;
    }
}



/* ------------------------------------------------------------------------- *
 *  Various Helpers
/* ------------------------------------------------------------------------- */
/**
* helper
* Check if we are displaying posts lists or front page
* => not real home
* @return  bool
*/
function hu_is_home() {
    //get info whether the front page is a list of last posts or a page
    return is_home() || ( is_home() && ( 'posts' == get_option( 'show_on_front' ) || '__nothing__' == get_option( 'show_on_front' ) ) ) || is_front_page();
}


/**
* helper ( can be already defined in hueman-addons)
* Check if we are really on home, all cases covered
* @return  bool
*/
if ( ! function_exists( 'hu_is_real_home') ) {
    function hu_is_real_home() {
        return ( is_home() && ( 'posts' == get_option( 'show_on_front' ) || '__nothing__' == get_option( 'show_on_front' ) ) )
        || ( 0 == get_option( 'page_on_front' ) && 'page' == get_option( 'show_on_front' ) )//<= this is the case when the user want to display a page on home but did not pick a page yet
        || is_front_page();
    }
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
    $_raw_socials = hu_get_option('social-links');
    if ( ! is_array( $_raw_socials ) )
      return;
    //get the social mod opts and the items
    foreach( $_raw_socials as $key => $item ) {
      if ( ! array_key_exists( 'is_mod_opt', $item ) )
          $_social_items[] =  $item;
    }
    return ! empty( $_social_items );
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
    $_img_option    = esc_attr( hu_get_option( $option_name ) );
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

/**
 * adds sanitization callback funtion : colors
 */
function hu_sanitize_hex_color( $color ) {
  if ( $unhashed = sanitize_hex_color_no_hash( $color ) )
    return '#' . $unhashed;

  return $color;
}

//@return bool
//WHEN DO WE DISPLAY THE REGULAR TOP NAV ?
//=> when there's a topbar menu assigned or when the default page menu option "default-menu-header" is checked ( not for multisite @see issue on github )
function hu_is_topbar_displayed() {
  $top_nav_fb = apply_filters( 'hu_topbar_menu_fallback_cb', ( ! is_multisite() && hu_is_checked( "default-menu-header" ) ) ? 'hu_page_menu' : '' );
  return hu_has_nav_menu( 'topbar' ) || ! empty( $top_nav_fb );
}

//WHEN DO WE DISPLAY THE HEADER NAV ?
// => when there's a header menu assigned or when the fallback callback function is set ( with a filter, used in prevdem scenario typically )
function hu_is_header_nav_displayed() {
  $header_nav_fb = apply_filters( 'hu_header_menu_fallback_cb', '' );
  return hu_has_nav_menu( 'header' ) || ! empty( $header_nav_fb );
}