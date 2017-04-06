<?php
/* ------------------------------------------------------------------------- *
 *  This file is loaded when hu_isprevdem() === true
/* ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------- *
 *  Smart Loading
/* ------------------------------------------------------------------------- */
add_filter( 'hu_opt_smart_load_img', '__return_true' );

/* ------------------------------------------------------------------------- *
 *  Colors
/* ------------------------------------------------------------------------- */
add_action( 'wp', 'hu_set_color_filters');
function hu_set_color_filters() {
    $colors = array(
        'color-topbar',
        'color-header',
        'color-header-menu',
        'color-mobile-menu',
        'color-1',
        'color-2'
    );
    foreach ( $colors as $opt ) {
        add_filter( "hu_opt_{$opt}", 'hu_set_color' );
    }
}

function hu_set_color( $color ) {
    switch ( current_filter() ) {
        case 'hu_opt_color-topbar':
          return '#121d30';//since v3.3.8
          break;
        case 'hu_opt_color-header':
        case 'hu_opt_color-header-menu':
        case 'hu_opt_color-mobile-menu':
          return '#454e5c';//since v3.3.8
          break;
        case 'hu_opt_color-1':
          return '#16cfc1';//since v3.3.8
          break;
        case 'hu_opt_color-2':
          return '#efb93f';//since v3.3.8
          break;
    }
    return $color;
}


/* ------------------------------------------------------------------------- *
 *  Footer Widgets
/* ------------------------------------------------------------------------- */
//print demo widgets in the footer
add_filter('hu_is_active_footer_widget_zone', '__return_true' );



/* ------------------------------------------------------------------------- *
 *  PlaceHolder Thumbnails
/* ------------------------------------------------------------------------- */
add_filter('hu_placeholder_thumb_src', 'hu_filter_prevdem_placeholder_thumb_src', 10, 2 );
function hu_filter_prevdem_placeholder_thumb_src( $_src, $_size ) {
  return hu_get_prevdem_img_src( $_size );
}
add_filter('hu_placeholder_thumb_filter', 'hu_filter_prevdem_placeholder_thumb_filter' );
function hu_filter_prevdem_placeholder_thumb_filter() {
  return '<span class="filter-placeholder"></span>';
}
add_filter( 'hu-use-svg-thumb-placeholder', '__return_false' );

/* Placeholder thumb helper
*  @return a random img src string
*  Can be recursive if a specific img size is not found
*/
function hu_get_prevdem_img_src( $_size = 'thumb-medium', $i = 0 ) {
    //prevent infinite loop
    if ( 10 == $i ) {
      return;
    }
    $sizes_suffix_map = array(
        'thumb-small'     => '160x160',
        'thumb-medium'    => '520x245',
        'thumb-standard'  => '320x320'
    );
    $requested_size = isset( $sizes_suffix_map[$_size] ) ? $sizes_suffix_map[$_size] : '520x245';
    $path = HU_BASE . 'assets/front/img/demo/';
    //Build or re-build the global dem img array
    if ( ! isset( $GLOBALS['prevdem_img'] ) || empty( $GLOBALS['prevdem_img'] ) ) {
        $imgs = array();
        if ( is_dir( $path ) ) {
          $imgs = scandir( $path );
        }
        $candidates = array();
        if ( ! $imgs || empty( $imgs ) )
          return array();

        foreach ( $imgs as $img ) {
          if ( '.' === $img[0] || is_dir( $path . $img ) ) {
            continue;
          }
          $candidates[] = $img;
        }
        $GLOBALS['prevdem_img'] = $candidates;
    }
    $candidates = $GLOBALS['prevdem_img'];
    //get a random image name
    $rand_key = array_rand($candidates);
    $img_name = $candidates[ $rand_key ];
    //extract img prefix
    $img_prefix_expl = explode( '-', $img_name );
    $img_prefix = $img_prefix_expl[0];

    $requested_size_img_name = "{$img_prefix}-{$requested_size}.jpg";
    //if file does not exists, reset the global and recursively call it again
    if ( ! file_exists( $path . $requested_size_img_name ) ) {
      unset( $GLOBALS['prevdem_img'] );
      $i++;
      return hu_get_prevdem_img_src( $_size, $i );
    }
    //unset all sizes of the img found and update the global
    $new_candidates = $candidates;
    foreach ( $candidates as $_key => $_img ) {
      if ( substr( $_img , 0, strlen( "{$img_prefix}-" ) ) == "{$img_prefix}-" ) {
        unset( $new_candidates[$_key] );
      }
    }
    $GLOBALS['prevdem_img'] = $new_candidates;
    return get_template_directory_uri() . '/assets/front/img/demo/' . $requested_size_img_name;
}





/* ------------------------------------------------------------------------- *
 *  Sidebars Widgets
/* ------------------------------------------------------------------------- */
add_action('__before_print_dynamic_sidebar', 'hu_maybe_print_prevdem_widgets', 10, 2 );
//@param $sidebars_widgets = wp_get_sidebars_widgets()
//@param $_zone_id = id of the widget zone, ex : primary
function hu_maybe_print_prevdem_widgets( $sidebars_widgets, $_zone_id ) {
     //stop here is the zone id has already been populated with widgets
    if ( array_key_exists( $_zone_id, $sidebars_widgets ) && is_array( $sidebars_widgets[$_zone_id] ) && ! empty($sidebars_widgets[$_zone_id] ) )
      return;

    //we only want to print default widgets in primary and secondary sidebars
    if ( ! in_array( $_zone_id, array( 'primary', 'secondary', 'footer-1', 'footer-2', 'footer-3') ) )
      return;

    $_widgets_to_print = array();
    switch ($_zone_id) {
      case 'primary':
        $_widgets_to_print[] = array(
          'AlxPosts' => array(
            'args' => array('before_title' => sprintf('<h3 class="widget-title">%s</h3>', __( 'Discover', 'hueman') ) )
          )
        );
      break;
      case 'secondary':
        $_widgets_to_print[] = array(
          'AlxTabs' => array(
            'args' => array('before_title' => sprintf('<h3 class="widget-title">%s</h3>', __( 'Recommended', 'hueman') ) )
          )
        );
      break;
      case 'footer-1':
        $_widgets_to_print[] = array(
          'WP_Widget_Recent_Posts' => array(
            'instance' => array(
              'title' => __( 'RECENT POSTS', 'hueman'),
              'number' => 4
            ),
            'args' => array(
              //'before_title' => sprintf('<h3 class="widget-title">%s</h3>', __( 'Recent Posts', 'hueman') )
            )
          )
        );
      break;
      case 'footer-2':
        $_widgets_to_print[] = array(
          'WP_Widget_Recent_Comments' => array(
            'instance' => array(
              'title' => __( 'RECENT COMMENTS', 'hueman'),
              'number' => 4
            ),
            'args' => array(
              //'before_title' => sprintf('<h3 class="widget-title">%s</h3>', __( 'Recent Posts', 'hueman') )
            )
          )
        );
      break;
      case 'footer-3':
        $_widgets_to_print[] = array(
          'AlxTabs' => array(
            'instance' => array(
              'recent_enable'   => 0,
              'comments_enable'   => 0,
              'tags_enable'     => 0,
              'popular_num' => 2,
            ),
            'args' => array('before_title' => sprintf('<h3 class="widget-title"><strong>%s</strong></h3>', __( 'HIGHLIGHTS', 'hueman') ) )
          )
        );
      break;
    }
    if ( empty($_widgets_to_print) )
      return;

    //find the widget instance ids
    $_wgt_instances = array();

    foreach ( $_widgets_to_print as $_wgt ) {
      foreach (  $_wgt as $_class => $params ) {
          if ( class_exists( $_class) ) {
            $_instance = isset( $params['instance'] ) ? $params['instance'] : array();
            $_args = isset( $params['args'] ) ? $params['args'] : array();
            the_widget( $_class, $_instance, $_args );
          }
      }
    }
}

/* ------------------------------------------------------------------------- *
 *  Nav Menus =>
 *  Header : assign page menu
 *  Topnav : show and assign the page menu to topbar
/* ------------------------------------------------------------------------- */
add_filter( 'hu_has_nav_menu', 'hu_set_pd_menu' );
function hu_set_pd_menu( $location ) {
    switch( $location ) {
        case 'footer' :
        case 'topbar' :
            return true;
        break;
        case 'header' :
            return has_nav_menu( $location );
        break;
    }
}
add_filter( 'hu_opt_default-menu-header', '__return_true' );
add_filter( 'hu_mobile_menu_fallback_cb', 'hu_set_fb_page_menu');
add_filter( 'hu_topbar_menu_fallback_cb', 'hu_set_fb_page_menu' );
function hu_set_fb_page_menu() {
  return 'hu_page_menu';
}



/* ------------------------------------------------------------------------- *
 *  Header and Footer Logo
/* ------------------------------------------------------------------------- */
add_filter('hu_display_header_logo', '__return_true');
add_filter('hu_header_logo_src', 'hu_prevdem_logo' );
add_filter('hu_footer_logo_src', 'hu_prevdem_logo' );
function hu_prevdem_logo( $_src ) {
  if ( hu_is_customizing() )
    return $_src;
  $logo_path = 'assets/front/img/demo/logo/logo.png';
  if ( file_exists( HU_BASE . $logo_path ) )
    return get_template_directory_uri() . '/' . $logo_path;
  return $_src;
}


/* ------------------------------------------------------------------------- *
 *  Blog title
/* ------------------------------------------------------------------------- */
add_filter('hu_blog_title', 'hu_prevdem_blogheading');
function hu_prevdem_blogheading() {
    return sprintf('%1$s <span class="hu-blog-subheading">%2$s</span>',
        "THE BLOG",
        "WHAT'S NEW?"
    );
}


/* ------------------------------------------------------------------------- *
 *  Social Links
/* ------------------------------------------------------------------------- */
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

/* ------------------------------------------------------------------------- *
 *  Front Page
/* ------------------------------------------------------------------------- */
add_filter('option_show_on_front', 'hu_prevdem_fp_content', 9999 );
add_filter('pre_option_show_on_front', 'hu_prevdem_fp_content', 9999 );
function hu_prevdem_fp_content( $val ) {
    if ( hu_is_customizing() )
      return $val;
    return 'posts';
}