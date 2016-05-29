<?php
/* ------------------------------------------------------------------------- *
 *  Template functions (pluggables)
 *  https://codex.wordpress.org/Pluggable_Functions
/* ------------------------------------------------------------------------- */

/*  Layout class
/* ------------------------------------ */
if ( ! function_exists( 'hu_layout_class' ) ) {

  function hu_layout_class() {
    // Default layout
    $layout = 'col-3cm';
    $default = 'col-3cm';

    // Check for page/post specific layout
    if ( is_page() || is_single() ) {
      // Reset post data
      wp_reset_postdata();
      global $post;
      // Get meta
      $meta = get_post_meta($post->ID,'_layout',true);
      // Get if set and not set to inherit
      if ( isset($meta) && !empty($meta) && $meta != 'inherit' ) { $layout = $meta; }
      // Else check for page-global / single-global
      elseif ( is_single() && ( hu_get_option('layout-single') !='inherit' ) ) $layout = hu_get_option('layout-single',''.$default.'');
      elseif ( is_page() && ( hu_get_option('layout-page') !='inherit' ) ) $layout = hu_get_option('layout-page',''.$default.'');
      // Else get global option
      else $layout = hu_get_option('layout-global',''.$default.'');
    }

    // Set layout based on page
    elseif ( is_home() && ( hu_get_option('layout-home') !='inherit' ) ) $layout = hu_get_option('layout-home',''.$default.'');
    elseif ( is_category() && ( hu_get_option('layout-archive-category') !='inherit' ) ) $layout = hu_get_option('layout-archive-category',''.$default.'');
    elseif ( is_archive() && ( hu_get_option('layout-archive') !='inherit' ) ) $layout = hu_get_option('layout-archive',''.$default.'');
    elseif ( is_search() && ( hu_get_option('layout-search') !='inherit' ) ) $layout = hu_get_option('layout-search',''.$default.'');
    elseif ( is_404() && ( hu_get_option('layout-404') !='inherit' ) ) $layout = hu_get_option('layout-404',''.$default.'');

    // Global option
    else $layout = hu_get_option('layout-global',''.$default.'');

    // Return layout class
    return $layout;
  }

}




/*  Maybe print relevant widget zones in a location
/* ------------------------------------ */
//what are the widget zones to display in this location ?
//Is the zone a built-in one or a custom ?
//  => if built-in zone, then it's location is pre-defined
//  => if custom zone, then let's check if there's any custom zones registered to this location by the user
//Is it allowed in this context ?
//=> once we have a list of candidates, let's try to print their dynamic sidebars

//hu_get_widget_zone_rosetta_stone() returns
// 's1'          => 'primary',
// 's2'          => 'secondary',
// 'header-ads'  => 'header-ads',
// 'footer-ads'  => 'footer-ads',
// 'footer-1'    => 'footer-1',
// 'footer-2'    => 'footer-2',
// 'footer-3'    => 'footer-3',
// 'footer-4'    => 'footer-4'
if ( ! function_exists('hu_print_widgets_in_location') ) {
  function hu_print_widgets_in_location( $location ) {
    $_eligible_zones = array();

    if ( false != hu_get_singular_meta_widget_zone( $location ) ) {
      $_eligible_zones[] = hu_get_singular_meta_widget_zone( $location );
    } else {
      $_eligible_zones    = apply_filters(
        'hu_eligible_widget_zones',
        array(),
        $location,
        hu_get_option('sidebar-areas')
      );
    }
    //print a message if this location is visible but has not eligible widget zones to display
    //=> print only when customizing
    if ( empty( $_eligible_zones ) && in_array( $location, array('s1', 's2') ) && hu_is_customize_preview_frame() ) {
        printf('<div class="widget"><div class="hu-placeholder-widget"><h3>%1$s<br/></h3><p>%2$s</p></div></div>',
        __('No widget zones available in this sidebar.', 'hueman'),
        __('You can add Widget Areas here from the customizer, in the <strong>Dynamic Sidebars and Widgets</strong> panel, or you can change the layout to remove this sidebar in <strong>Content &raquo; Layout Options for the main content</strong>.', 'hueman')
      );
      return;
    }

    foreach ( $_eligible_zones as $_id ) {
      hu_print_dynamic_sidebars( $_id, $location );
    }
  }
}//endif


//the job of this function is to print a dynamic widget zone if exists
//if exists but empty, and if the user is in a customization context, let's print a placeholder
function hu_print_dynamic_sidebars( $_id, $location ) {
  global $wp_registered_sidebars;
  $sidebars_widgets = wp_get_sidebars_widgets();

  if ( ! isset($wp_registered_sidebars[$_id]) ) {
    return;
  }


  if ( hu_is_customize_preview_frame() ) {
    //is there a meta setting overriding the customizer ?
    if ( false != hu_get_singular_meta_widget_zone($location) ) {
      printf('<div class="widget"><div class="hu-placeholder-widget"><h3>%1$s<br/><span class="zone-name">"%2$s"</span> %3$s</h3><br/><p>%4$s</p></div></div>',
        __('You have already assigned the following widget zone here : ', 'hueman'),
        $wp_registered_sidebars[$_id]['name'],
        __('in this post or page options.', 'hueman'),
        __('You can change or disable this setting by editing the options of the current post / page.', 'hueman')
      );
    }

    if ( empty( $sidebars_widgets[ $_id ] ) || ! is_array( $sidebars_widgets[ $_id ] ) ) {
      printf('<div class="widget"><div class="hu-placeholder-widget"><h3>%1$s<br/><span class="zone-name">"%2$s"</span></h3></div></div>',
        __('Add widgets to the zone :', 'hueman'),
        $wp_registered_sidebars[$_id]['name']
      );
    }
  }//end if customizing

  //print it
  dynamic_sidebar($_id);
}


/*  Social links
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_social_links' ) ) {
  function hu_print_social_links() {
    $_socials = hu_get_option('social-links');
    if ( empty( $_socials ) )
      return;

    echo '<ul class="social-links">';
    foreach( $_socials as $key => $item ) {
      //do we have an id set ?
      //Typically not if the user still uses the old options value.
      //So, if the id is not present, let's build it base on the key, like when added to the collection in the customizer

      // Put them together
      printf( '<li><a rel="nofollow" class="social-tooltip" %1$s title="%2$s" href="%3$s" %4$s style="color:%5$s"><i class="fa %6$s"></i></a></li>',
        ! hu_is_customizing() ? '' : sprintf( 'data-model-id="%1$s"', ! isset( $item['id'] ) ? 'hu_socials_'. $key : $item['id'] ),
        isset($item['title']) ? esc_attr( $item['title'] ) : '',
        ( isset($item['social-link']) && ! empty( $item['social-link'] ) ) ? esc_url( $item['social-link'] ) : 'javascript:void(0)',
        ( isset($item['social-target']) && false != $item['social-target'] ) ? 'target="_blank"' : '',
        isset($item['social-color']) ? esc_attr($item['social-color']) : '#000',
        isset($item['social-icon']) ? esc_attr($item['social-icon']) : ''
      );
    }
    echo '</ul>';
  }
}



/*  Site name/logo
/* ------------------------------------ */
if ( ! function_exists( 'hu_site_title' ) ) {

  function hu_site_title() {
    // Text or image?
    if ( false != hu_get_img_src_from_option( 'custom-logo' ) ) {
      $logo = '<img src="'. hu_get_img_src_from_option( 'custom-logo' ) . '" alt="'.get_bloginfo('name').'">';
    } else {
      $logo = get_bloginfo('name');
    }

    $link = '<a href="'.home_url('/').'" rel="home">'.$logo.'</a>';

    if ( is_front_page() || is_home() ) {
      $sitename = '<h1 class="site-title">'.$link.'</h1>'."\n";
    } else {
      $sitename = '<p class="site-title">'.$link.'</p>'."\n";
    }

    return $sitename;
  }

}


/*  Page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_page_title' ) ) {

  function hu_page_title() {
    global $post;

    $heading = esc_attr( get_post_meta($post->ID,'_heading',true) );
    $subheading = esc_attr( get_post_meta($post->ID,'_subheading',true) );
    $title = $heading?$heading:the_title();
    if($subheading) {
      $title = $title.' <span>'.$subheading.'</span>';
    }

    return $title;
  }

}


/*  Blog title
/* ------------------------------------ */
if ( ! function_exists( 'hu_blog_title' ) ) {

  function hu_blog_title() {
    $heading    =  wp_kses_post( hu_get_option('blog-heading') );
    $heading    = $heading ? $heading : get_bloginfo('name');
    $subheading =  wp_kses_post( hu_get_option('blog-subheading') );
    $subheading = $subheading ? $subheading : __('Blog', 'hueman');

    return sprintf('%1$s <span class="hu-blog-subheading">%2$s</span>',
      $heading,
      $subheading
    );
  }

}


/*  Related posts
/* ------------------------------------ */
if ( ! function_exists( 'hu_related_posts' ) ) {

  function hu_related_posts() {
    wp_reset_postdata();
    global $post;

    // Define shared post arguments
    $args = array(
      'no_found_rows'       => true,
      'update_post_meta_cache'  => false,
      'update_post_term_cache'  => false,
      'ignore_sticky_posts'   => 1,
      'orderby'         => 'rand',
      'post__not_in'        => array($post->ID),
      'posts_per_page'      => 3
    );
    // Related by categories
    if ( hu_get_option('related-posts') == 'categories' ) {

      $cats = get_post_meta($post->ID, 'related-cat', true);

      if ( !$cats ) {
        $cats = wp_get_post_categories($post->ID, array('fields'=>'ids'));
        $args['category__in'] = $cats;
      } else {
        $args['cat'] = $cats;
      }
    }
    // Related by tags
    if ( hu_get_option('related-posts') == 'tags' ) {

      $tags = get_post_meta($post->ID, 'related-tag', true);

      if ( !$tags ) {
        $tags = wp_get_post_tags($post->ID, array('fields'=>'ids'));
        $args['tag__in'] = $tags;
      } else {
        $args['tag_slug__in'] = explode(',', $tags);
      }
      if ( !$tags ) { $break = true; }
    }

    $query = !isset($break)?new WP_Query($args):new WP_Query;
    return $query;
  }

}


/*  Get images attached to post
/* ------------------------------------ */
if ( ! function_exists( 'hu_post_images' ) ) {

  function hu_post_images( $args=array() ) {
    global $post;

    $defaults = array(
      'numberposts'   => -1,
      'order'       => 'ASC',
      'orderby'     => 'menu_order',
      'post_mime_type'  => 'image',
      'post_parent'   =>  $post->ID,
      'post_type'     => 'attachment',
    );

    $args = wp_parse_args( $args, $defaults );

    return get_posts( $args );
  }

}


/*  Get featured post ids
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_featured_post_ids' ) ) {

  function hu_get_featured_post_ids() {
    $args = array(
      'category'    => hu_get_option('featured-category'),
      'numberposts' => hu_get_option('featured-posts-count')
    );
    $posts = get_posts($args);
    if ( !$posts ) return false;
    foreach ( $posts as $post )
      $ids[] = $post->ID;
    return $ids;
  }

}


/*  Echoes the <img> tag of the placeholder thumbnail
*   the src property can be filtered
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_placeholder_thumb' ) ) {

  function hu_print_placeholder_thumb() {
    printf( '<img src="%1$s" alt="%2$s" />',
      apply_filters( 'hu_placeholder_thumb_src' , get_template_directory_uri() . '/assets/front/img/thumb-medium.png' ),
      get_the_title()
    );
  }

}


/* ------------------------------------------------------------------------- *
 *  Filters
/* ------------------------------------------------------------------------- */

/*  Body class
/* ------------------------------------ */
if ( ! function_exists( 'hu_body_class' ) ) {

  function hu_body_class( $classes ) {
    $classes[] = hu_layout_class();
    $classes[] = hu_is_checked( 'boxed' ) ? 'boxed' : 'full-width';
    if ( has_nav_menu('topbar') ) { $classes[] = 'topbar-enabled'; }
    if ( hu_get_option( 'mobile-sidebar-hide' ) == 's1' ) { $classes[] = 'mobile-sidebar-hide-s1'; }
    if ( hu_get_option( 'mobile-sidebar-hide' ) == 's2' ) { $classes[] = 'mobile-sidebar-hide-s2'; }
    if ( hu_get_option( 'mobile-sidebar-hide' ) == 's1-s2' ) { $classes[] = 'mobile-sidebar-hide'; }
    return $classes;
  }

}
add_filter( 'body_class', 'hu_body_class' );


/*  Custom rss feed
/* ------------------------------------ */
if ( ! function_exists( 'hu_feed_link' ) ) {

  function hu_feed_link( $output, $feed ) {
    // Do not redirect comments feed
    if ( strpos( $output, 'comments' ) )
      return $output;
    // Return feed url
    return esc_url( hu_get_option('rss-feed',$output) );
  }

}
add_filter( 'feed_link', 'hu_feed_link', 10, 2 );


/*  Custom favicon
/* ------------------------------------ */
if ( ! function_exists( 'hu_favicon' ) ) {

  function hu_favicon() {
    if ( hu_get_option('favicon') ) {
      echo '<link rel="shortcut icon" href="'.hu_get_option('favicon').'" />'."\n";
    }
  }

}
add_filter( 'wp_head', 'hu_favicon' );


/*  Excerpt ending
/* ------------------------------------ */
if ( ! function_exists( 'hu_excerpt_more' ) ) {

  function hu_excerpt_more( $more ) {
    return '&#46;&#46;&#46;';
  }

}
add_filter( 'excerpt_more', 'hu_excerpt_more' );


/*  Excerpt length
/* ------------------------------------ */
if ( ! function_exists( 'hu_excerpt_length' ) ) {

  function hu_excerpt_length( $length ) {
    return hu_get_option('excerpt-length',$length);
  }

}
add_filter( 'excerpt_length', 'hu_excerpt_length', 999 );





/*  Browser detection body_class() output
/* ------------------------------------ */
if ( ! function_exists( 'hu_browser_body_class' ) ) {

  function hu_browser_body_class( $classes ) {
    global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;

    if($is_lynx) $classes[] = 'lynx';
    elseif($is_gecko) $classes[] = 'gecko';
    elseif($is_opera) $classes[] = 'opera';
    elseif($is_NS4) $classes[] = 'ns4';
    elseif($is_safari) $classes[] = 'safari';
    elseif($is_chrome) $classes[] = 'chrome';
    elseif($is_IE) {
      $browser = $_SERVER['HTTP_USER_AGENT'];
      $browser = substr( "$browser", 25, 8);
      if ($browser == "MSIE 7.0"  ) {
        $classes[] = 'ie7';
        $classes[] = 'ie';
      } elseif ($browser == "MSIE 6.0" ) {
        $classes[] = 'ie6';
        $classes[] = 'ie';
      } elseif ($browser == "MSIE 8.0" ) {
        $classes[] = 'ie8';
        $classes[] = 'ie';
      } elseif ($browser == "MSIE 9.0" ) {
        $classes[] = 'ie9';
        $classes[] = 'ie';
      } else {
        $classes[] = 'ie';
      }
    }
    else $classes[] = 'unknown';

    if( $is_iphone ) $classes[] = 'iphone';

    return $classes;
  }

}
add_filter( 'body_class', 'hu_browser_body_class' );





/* ------------------------------------------------------------------------- *
 *  Styles and scripts
/* ------------------------------------------------------------------------- */
/*  Enqueue javascript
/* ------------------------------------ */
if ( ! function_exists( 'hu_scripts' ) ) {
  function hu_scripts() {
    if ( has_post_format( 'gallery' ) || ( is_home() && ! is_paged() && ( hu_get_option('featured-posts-count') != '0' ) ) ) {
      wp_enqueue_script( 'flexslider', get_template_directory_uri() . '/assets/front/js/jquery.flexslider.min.js', array( 'jquery' ),'', false );
    }

    if ( has_post_format( 'audio' ) ) {
      wp_enqueue_script( 'jplayer', get_template_directory_uri() . '/assets/front/js/jquery.jplayer.min.js', array( 'jquery' ),'', true );
    }

    wp_enqueue_script(
      'scripts',
      sprintf('%1$s/assets/front/js/scripts%2$s.js' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
      array( 'jquery' ),
      ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
      true
    );

    if ( is_singular() && get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
  }
}
add_action( 'wp_enqueue_scripts', 'hu_scripts' );


/*  Enqueue css
/* ------------------------------------ */
if ( ! function_exists( 'hu_styles' ) ) {
  function hu_styles() {
    $_main_style = hu_is_checked('responsive') ? 'main' : 'main-not-responsive';

    //registered only, will be loaded as a dependency of the wp style.css
    wp_register_style(
      'hueman-main',
      sprintf('%1$s/assets/front/css/%2$s%3$s.css',
          get_template_directory_uri(),
          $_main_style,
          hu_is_checked('minified-css') ? '.min' : ''
      ),
      array(),
      ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
      'all'
    );

    //This function loads the main theme stylesheet or the child theme one
    //1) Not mandatory if only the main theme is activated. But mandatory if a child theme is used (otherwise the child theme style won't be loaded)
    //2) must be loaded as a dependency of 'hueman-main', to make it easier to override the main stylesheet rules without having to increase the specificicty of each child theme css rules
    wp_enqueue_style(
      'theme-stylesheet',
      get_stylesheet_uri(),
      array('hueman-main'),
      ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
      'all'
    );
  }
}
add_action( 'wp_enqueue_scripts', 'hu_styles' );









/* ------------------------------------------------------------------------- *
 *  Actions
/* ------------------------------------------------------------------------- */

/*  Include or exclude featured articles in loop
/* ------------------------------------ */
if ( ! function_exists( 'hu_pre_get_posts' ) ) {

  function hu_pre_get_posts( $query ) {
    // Is the featured post option enabled ?
    if ( ! hu_is_checked('featured-posts-enabled') )
      return;
    // Are we on main query ?
    if ( ! $query->is_main_query() )
      return;
    // Are we on the blog page ?
    if ( ! $query->is_home() )
      return;

    if ( $query->is_home() ) {

      // Featured posts enabled
      if ( hu_get_option('featured-posts-count') != '0' && false !== (bool)hu_get_option('featured-posts-count')  ) {
        // Get featured post ids
        $featured_post_ids = hu_get_featured_post_ids();
        // Exclude posts
        if ( $featured_post_ids && ! hu_is_checked('featured-posts-include') )
          $query->set('post__not_in', $featured_post_ids);
      }
    }
  }

}
add_action( 'pre_get_posts', 'hu_pre_get_posts' );


/*  Script for no-js / js class
/* ------------------------------------ */
if ( ! function_exists( 'hu_html_js_class' ) ) {

  function hu_html_js_class () {
    echo '<script>document.documentElement.className = document.documentElement.className.replace("no-js","js");</script>'. "\n";
  }

}
add_action( 'wp_head', 'hu_html_js_class', 1 );


/*  IE js header
/* ------------------------------------ */
if ( ! function_exists( 'hu_ie_js_header' ) ) {

  function hu_ie_js_header () {
    echo '<!--[if lt IE 9]>'. "\n";
    echo '<script src="' . esc_url( get_template_directory_uri() . '/assets/front/js/ie/html5shiv-printshiv.min.js' ) . '"></script>'. "\n";
    echo '<script src="' . esc_url( get_template_directory_uri() . '/assets/front/js/ie/selectivizr.js' ) . '"></script>'. "\n";
    echo '<![endif]-->'. "\n";
  }

}
add_action( 'wp_head', 'hu_ie_js_header' );


/*  IE js footer
/* ------------------------------------ */
if ( ! function_exists( 'hu_ie_js_footer' ) ) {

  function hu_ie_js_footer () {
    echo '<!--[if lt IE 9]>'. "\n";
    echo '<script src="' . esc_url( get_template_directory_uri() . '/assets/front/js/ie/respond.js' ) . '"></script>'. "\n";
    echo '<![endif]-->'. "\n";
  }

}
add_action( 'wp_footer', 'hu_ie_js_footer', 20 );



/*  WooCommerce basic support
/* ------------------------------------ */
function hu_wc_wrapper_start() {
  echo '<section class="content">';
  echo '<div class="pad">';
}
function hu_wc_wrapper_end() {
  echo '</div>';
  echo '</section>';
}
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
add_action('woocommerce_before_main_content', 'hu_wc_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'hu_wc_wrapper_end', 10);


/*  WP-PageNavi support - @devinsays (via GitHub)
/* ------------------------------------ */
function hu_deregister_styles() {
  wp_deregister_style( 'wp-pagenavi' );
}
add_action( 'wp_print_styles', 'hu_deregister_styles', 100 );









/* ------------------------------------------------------------------------- *
 *  Widgets and sidebars helpers
/* ------------------------------------------------------------------------- */
//@return false or string if a meta widget zone is found.
function hu_get_singular_meta_widget_zone( $location ) {
  //for single post and page, users can set a widget zone for the right and left sidebars
  //if set, those widget zones will override the global settings
  //must be singular == is_page || is_single
  if ( ! is_singular() )
    return;

  //we might request "primary" instead of "s1"
  //in this case, normalize the location name
  $_rosetta = hu_get_widget_zone_rosetta_stone();
  if ( in_array( $location, $_rosetta) ) {
    $location = array_search( $location, $_rosetta );
  }

  $_meta_map = array(
    's1'   => '_sidebar_primary',
    's2'   => '_sidebar_secondary'
  );

  if ( ! isset($_meta_map[$location]) )
    return;

  wp_reset_postdata();
  global $post;
  $meta_zone = get_post_meta(
    $post->ID,
    $_meta_map[$location],
    true
  );

  return ! $meta_zone ? false : $meta_zone;
}


add_filter('hu_eligible_widget_zones', 'hu_get_widget_zones_in_location', 3, 10);
add_filter('hu_eligible_widget_zones', 'hu_get_widget_zones_in_context', 3, 20);





// 'primary'     => array( 's1' => __('Left Sidebar', 'hueman') ),
// 'secondary'   => array( 's2' => __('Right Sidebar', 'hueman') ),
// 'header-ads'  => array( 'header-ads' => __('Header', 'hueman') ),
// 'footer-ads'  => array( 'footer-ads' => __('Before footer', 'hueman') ),
// 'footer-1'    => array( 'footer-1' => __('Footer 1', 'hueman') ),
// 'footer-2'    => array( 'footer-2' => __('Footer 2', 'hueman') ),
// 'footer-3'    => array( 'footer-3' => __('Footer 3', 'hueman') ),
// 'footer-4'    => array( 'footer-4' => __('Footer 4', 'hueman') )
//hook : hu_eligible_widget_zones : 10
function hu_get_widget_zones_in_location( $_eligible_zones = array() , $location , $_user_option = null) {
  //what are the zones assigned by the user to this location ?
  if ( empty( $_user_option ) )
    return $_eligible_zones;

  foreach ( $_user_option as $key => $_zone ) {
    $_id = $_zone['id'];

    if( ! array_key_exists('locations', $_zone) ) {
      if ( hu_is_builtin_widget_zone($_id) ) {
        $builtin_locations = hu_get_builtin_widget_zones_location();
        foreach ( $builtin_locations as $_zone_id => $_location_data ) {
          if ( $location == key($_location_data) )
            $_eligible_zones[] = $_zone_id;
        }//foreach
      }//if
      continue;
    }

    //do we have a location match ?
    if ( isset($_zone['locations']) && in_array($location, $_zone['locations']) )
      $_eligible_zones[] = $_zone['id'];
  }//foreach

  return $_eligible_zones;
}



//hook : hu_eligible_widget_zones : 20
function hu_get_widget_zones_in_context( $_eligible_zones = array(), $location, $_user_option = null ) {
  $_contextualized = array();
  //context => callback
  $_map_conditionals = array(
    'home'              => 'hu_is_home',
    'blog-page'         => 'hu_is_blogpage',
    'page'              => 'is_page',
    'single'            => 'is_single',
    'archive'           => 'is_archive',
    'archive-category'  => 'is_category',
    'search'            => 'is_search',
    '404'               => 'is_404'
  );

  foreach ( $_eligible_zones as $_zone_id ) {
    //BUILT IN ZONES
    //is a context set for a the built-in zones?
    //If no specific context option is found yet, then allow by default
    $_user_allowed_contexts = hu_get_widget_zone_allowed_contexts($_zone_id);

    if ( 'no_option_found' == $_user_allowed_contexts && hu_is_builtin_widget_zone($_zone_id) ) {
      $_contextualized[] = $_zone_id;
    }
    elseif ( is_array($_user_allowed_contexts) && ! empty($_user_allowed_contexts) ) {
      if ( hu_is_widget_zone_allowed_in_context( $_user_allowed_contexts, $_map_conditionals) )
        $_contextualized[] = $_zone_id;
    }
  }

  return $_contextualized;
}

//helper
function hu_is_builtin_widget_zone( $id ) {
  return array_key_exists( $id, hu_get_builtin_widget_zones_location() );
}


//@id = widget zone id
//@user_option = array() or null
//@returns a string 'no_option_found' or an array of allowed contexts
function hu_get_widget_zone_allowed_contexts( $id, $_user_option = null ) {
  $_user_option = is_null($_user_option) ? hu_get_option('sidebar-areas') : $_user_option;
  $allowed_contexts = array();
  $no_option_found = true;
  foreach ( $_user_option as $key => $_zone ) {

    if ( $id != $_zone['id'] || ! empty($allowed_contexts) )
      continue;

    if ( array_key_exists('contexts', $_zone) ) {
      $allowed_contexts = is_array($_zone['contexts']) ? $_zone['contexts'] : array();
      $no_option_found = false;
    }
  }
  return $no_option_found ? 'no_option_found' : $allowed_contexts;
}





//helper
//@contexts = array()
//@map_conditionals = array()
function hu_is_widget_zone_allowed_in_context( $_contexts, $_map_conditionals ) {
  if ( ! is_array($_contexts) )
    return;

  foreach ($_map_conditionals as $_context_id => $_cb) {
    if ( ! function_exists($_cb) || ! in_array($_context_id, $_contexts) )
      continue;
    if ( true === call_user_func($_cb) )
      return true;
  }

  if ( in_array( '_all_', $_contexts ) )
    return true;

  return false;
}
