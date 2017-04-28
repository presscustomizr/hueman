<?php
/* ------------------------------------------------------------------------- *
 *  Template functions (pluggables)
 *  https://codex.wordpress.org/Pluggable_Functions
/* ------------------------------------------------------------------------- */

/*  Print the wp content
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_content') ) {
  //@return void()
  //Print the content based on the template string
  function hu_get_content( $tmpl = 'tmpl/index-tmpl', $print = true ) {
    $tmpl = hu_is_authorized_tmpl( $tmpl ) ? $tmpl : 'tmpl/index-tmpl';
    $seks = apply_filters(  'hu_content_sektions', array( 'wp' ) );
    //Are we good after filtering ?
    if ( ! is_array( $seks ) )
      return;
    ob_start();
    ?>
      <?php do_action( '__before_content_section', $tmpl ); ?>
        <section class="content">
          <?php hu_get_template_part('parts/page-title'); ?>
          <div class="pad group">
            <?php
              foreach ( $seks as $_id ) {
                  if ( 'wp' == $_id )
                    hu_get_template_part( $tmpl );
                  else
                    hu_print_sek( $_id );
              }
            ?>
          </div><!--/.pad-->
        </section><!--/.content-->
      <?php do_action( '__after_content_section', $tmpl ); ?>
    <?php
    $html = ob_get_contents();
    if ($html) ob_end_clean();
    if ( $print )
      echo $html;
    else
      return $html;
  }
}

//helper
//@return bool
function hu_is_authorized_tmpl( $tmpl ) {
    $ct_map = apply_filters(
        'hu_content_map',
        array( 'tmpl/index-tmpl', 'tmpl/archive-tmpl', 'tmpl/page-tmpl', 'tmpl/single-tmpl', 'tmpl/search-tmpl', 'tmpl/404-tmpl' )
    );
    //Are we good after filtering ?
    if ( ! is_array( $ct_map ) || ! is_string( $tmpl ) )
      return;
    return in_array( $tmpl, $ct_map );
}


if ( ! function_exists( 'hu_print_sek') ) {
  //@return void
  function hu_print_sek( $sek_id ) {
      do_action( "hu_sek_{$sek_id}" );
  }
}


/*  Mobile Button
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_mobile_btn' ) ) {
    function hu_print_mobile_btn() {
      ?>
      <?php if ( apply_filters( 'hu_is_simple_mobile_menu_btn', 'simple' == hu_get_option( 'header_mobile_btn' ) ) ) : ?>
        <div class="nav-toggle"><i class="fa fa-bars"></i></div>
      <?php else : ?>
        <!-- <div class="ham__navbar-toggler collapsed" aria-expanded="false">
          <div class="ham__navbar-span-wrapper">
            <span class="ham-toggler-menu__span"></span>
          </div>
        </div> -->
        <div class="ham__navbar-toggler-two collapsed" title="Menu" aria-expanded="false">
          <div class="ham__navbar-span-wrapper">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </div>
        </div>
      <?php endif; ?>
      <?php
    }
}


/*  Layout class
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_layout_class' ) ) {

  //$default = 'col-3cm' set in setting map
  function hu_get_layout_class() {
    // Default layout
    $layout = 'col-3cm';
    $has_post_meta = false;
        /* if ( is_array(hu_is_real_home()) )
      array_walk_recursive(hu_is_real_home(), function(&$v) { $v = htmlspecialchars($v); }); */

    // Check for page/post specific layout
    if ( ! hu_is_real_home() && ( is_page() || is_single() ) ) {
        // Reset post data
        wp_reset_postdata();
        global $post;
        // Get meta
        $meta = get_post_meta($post->ID,'_layout',true);
        // Get if set and not set to inherit
        if ( isset($meta) && !empty($meta) && $meta != 'inherit' ) {
          $layout = $meta;
          $has_post_meta = true;
        }
        // Else check for page-global / single-global
        elseif ( is_single() && ( hu_get_option('layout-single') !='inherit' ) ) $layout = hu_get_option( 'layout-single' );
        elseif ( is_page() && ( hu_get_option('layout-page') !='inherit' ) ) $layout = hu_get_option( 'layout-page' );
        // Else get global option
        else $layout = hu_get_option( 'layout-global' );
    }
    // Set layout based on page
    elseif ( hu_is_real_home() && ( hu_get_option('layout-home') != 'inherit' ) ) $layout = hu_get_option( 'layout-home' );
    elseif ( is_category() && ( hu_get_option('layout-archive-category') != 'inherit' ) ) $layout = hu_get_option( 'layout-archive-category' );
    elseif ( is_archive() && ( hu_get_option('layout-archive') != 'inherit' ) ) $layout = hu_get_option( 'layout-archive' );
    elseif ( is_search() && ( hu_get_option('layout-search') != 'inherit' ) ) $layout = hu_get_option( 'layout-search' );
    elseif ( is_404() && ( hu_get_option('layout-404') != 'inherit' ) ) $layout = hu_get_option( 'layout-404' );

    // Global option
    else $layout = hu_get_option('layout-global' );
    // Return layout class
    return apply_filters( 'hu_layout_class', $layout, $has_post_meta );
  }

}

//for retro compat
function hu_layout_class() {
  return hu_get_layout_class();
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
    $_sb_opt_val = hu_get_option('sidebar-areas');
    //Make sure the sidebar-areas option is properly set
    //if the option is empty, then re-generate it from the defaults
    if ( ! is_array($_sb_opt_val) || empty( $_sb_opt_val ) ) {
        $__options = get_option( HU_THEME_OPTIONS );
        $__options['sidebar-areas'] = hu_generate_new_sidebar_options();
        update_option( HU_THEME_OPTIONS, $__options );
    }

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
  global $wp_registered_sidebars, $wp_registered_widgets;
  if ( ! isset($wp_registered_sidebars[$_id]) ) {
    return;
  }

  $sidebars_widgets = wp_get_sidebars_widgets();

  if ( hu_is_customize_preview_frame() && ! hu_isprevdem() ) {
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

  do_action('__before_print_dynamic_sidebar', $sidebars_widgets, $_id );

  //print it
  dynamic_sidebar( $_id );
}


/*  Social links
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_social_links' ) ) {
  function hu_print_social_links() {
    $_raw_socials     = hu_get_option('social-links');
    $_default_color   = array('rgb(90,90,90)', '#5a5a5a'); //both notations
    $_default_size    = '14'; //px
    $_social_opts     = array( 'social-size' => $_default_size );
    $_social_items    = array();

    //get the social mod opts and the items
    foreach( $_raw_socials as $key => $item ) {
      if ( ! array_key_exists( 'is_mod_opt', $item ) ) {
          $_social_items[] =  $item;
      } else {
          $_social_opts = wp_parse_args( $item, $_social_opts );
      }
    }

    if ( empty( $_social_items ) ) {
        if ( hu_is_customizing() ) {
            printf( '<ul class="social-links"><li style="font-size:0.9em;color:white"><span><i>%1$s</i></span></li></ul>',
                __('You can set your social links here from the live customizer', 'hueman')
            );
        }
        return;
    }

    $font_size_value = $_social_opts['social-size'];
    //if the size is the default one, do not add the inline style css
    $social_size_css  = empty( $font_size_value ) || $_default_size == $font_size_value ? '' : "font-size:{$font_size_value}px";

    echo '<ul class="social-links">';
      foreach( $_social_items as $key => $item ) {
        //skip if mod_opt
        if ( array_key_exists( 'is_mod_opt', $item ) )
          continue;

         /* Maybe build inline style */
        $social_color_css      = isset($item['social-color']) ? esc_attr($item['social-color']) : $_default_color[0];
        //if the color is the default one, do not print the inline style css
        $social_color_css      = in_array( $social_color_css, $_default_color ) ? '' : "color:{$social_color_css}";
        $style_props           = implode( ';', array_filter( array( $social_color_css, $social_size_css ) ) );

        $style_attr            = $style_props ? sprintf(' style="%1$s"', $style_props ) : '';

        //do we have an id set ?
        //Typically not if the user still uses the old options value.
        //So, if the id is not present, let's build it base on the key, like when added to the collection in the customizer

        // Put them together
        printf( '<li><a rel="nofollow" class="social-tooltip" %1$s title="%2$s" href="%3$s" %4$s %5$s><i class="fa %6$s"></i></a></li>',
            ! hu_is_customizing() ? '' : sprintf( 'data-model-id="%1$s"', ! isset( $item['id'] ) ? 'hu_socials_'. $key : $item['id'] ),
            isset($item['title']) ? esc_attr( $item['title'] ) : '',
            ( isset($item['social-link']) && ! empty( $item['social-link'] ) ) ? esc_url( $item['social-link'] ) : 'javascript:void(0)',
            ( isset($item['social-target']) && false != $item['social-target'] ) ? 'target="_blank"' : '',
            $style_attr,
            isset($item['social-icon']) ? esc_attr($item['social-icon']) : ''
        );
      }
    echo '</ul>';
  }
}

/*  Header image callback
/* ------------------------------------ */
if ( ! function_exists( 'hu_render_header_image' ) ) {
  function hu_render_header_image( $_header_img_src = null ) {
    echo sprintf('<a href="%1$s" rel="home"><img class="site-image" src="%2$s" alt="%3$s"></a>',
        home_url('/'),
        get_header_image(),
        get_bloginfo('name')
    );
  }
}

/*  Site name/logo and tagline callbacks
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_logo_or_title' ) ) {
    function hu_print_logo_or_title( $echo = true ) {
        // Text or image?
        // Since v3.2.4, uses the WP 'custom_logo' theme mod option. Set with a filter.
        $is_image = false;
        if ( false != hu_get_img_src_from_option( 'custom-logo' ) && apply_filters( 'hu_display_header_logo', hu_is_checked('display-header-logo') ) ) {
            $logo_src = apply_filters( 'hu_header_logo_src' , hu_get_img_src_from_option( 'custom-logo' ) );
            $logo_or_title = '<img src="'. $logo_src . '" alt="' . get_bloginfo('name'). '">';
            $is_image = true;
        } else {
            $logo_or_title = get_bloginfo( 'name' );
        }

        ob_start();
          ?>
            <p class="site-title"><?php hu_do_render_logo_site_tite( $logo_or_title ) ?></p>
          <?php
        $html = ob_get_contents();
        if ($html) ob_end_clean();
        if ( $echo )
          echo apply_filters('hu_logo_title', $html );
        else
          return apply_filters('hu_logo_title', $html );
    }
}


if ( ! function_exists( 'hu_do_render_logo_site_tite' ) ) {
    function hu_do_render_logo_site_tite( $logo_or_title = null, $echo = true ) {
        //typically, logo_or_title is not provided when partially refreshed from the customizer
        if ( is_null( $logo_or_title ) || hu_is_ajax() ) {
            // Text or image?
            // Since v3.2.4, uses the WP 'custom_logo' theme mod option. Set with a filter.
            if ( false != hu_get_img_src_from_option( 'custom-logo' ) && apply_filters( 'hu_display_header_logo', hu_is_checked('display-header-logo') ) ) {
                $logo_src = apply_filters( 'hu_header_logo_src' , hu_get_img_src_from_option( 'custom-logo' ) );
                $logo_or_title = '<img src="'. $logo_src . '" alt="' . get_bloginfo('name'). '">';
            } else {
                $logo_or_title = get_bloginfo('name');
            }
        }
        if ( $echo ) {
            printf( '<a class="custom-logo-link" href="%1$s" rel="home" title="%3$s">%2$s</a>',
                home_url('/'),
                $logo_or_title,
                sprintf( '%1$s | %2$s', get_bloginfo('name') , __('Home page', 'hueman') )
            );
        } else {
            return sprintf( '<a class="custom-logo-link" href="%1$s" rel="home" title="%3$s">%2$s</a>',
                home_url('/'),
                $logo_or_title,
                sprintf( '%1$s | %2$s', get_bloginfo('name') , __('Home page', 'hueman') )
            );
        }
    }
}


if ( ! function_exists( 'hu_render_blog_description' ) ) {
    function hu_render_blog_description() {
        echo get_bloginfo( 'description' );
    }
}

/*  Retro compat function for child theme users
/* ------------------------------------ */
if ( ! function_exists( 'hu_site_title' ) ) {
  function hu_site_title() {
      return hu_print_logo_or_title( false );
  }
}

/*  Page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_page_title' ) ) {

  function hu_get_page_title() {
    global $post;

    $heading = esc_attr( get_post_meta($post->ID,'_heading',true) );
    $subheading = esc_attr( get_post_meta($post->ID,'_subheading',true) );
    $title = $heading ? $heading: get_the_title();
    if($subheading) {
      $title = $title.' <span>'.$subheading.'</span>';
    }

    return $title;
  }

}


/*  Search Page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_search_title' ) ) {
  function hu_get_search_title() {
      global $wp_query;

      $search_results = $wp_query -> found_posts;
      $icon           = have_posts() ? '<i class="fa fa-search"></i> ' : '<i class="fa fa-exclamation-circle"></i> ';

      if ( 1 == $search_results ) {
          return sprintf( '%1$s%2$s %3$s', $icon, $search_results, __('Search result','hueman') );
      } else {
          return sprintf( '%1$s%2$s %3$s', $icon, $search_results, __('Search results','hueman') );
      }
  }
}


/*  404 Page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_404_title' ) ) {
  function hu_get_404_title() {
    return sprintf('<i class="fa fa-exclamation-circle"></i>%1$s <span>%2$s </span>',
        __('Error 404.','hueman'),
        __('Page not found!','hueman')
    );
  }
}


/*  Author Page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_author_title' ) ) {
  function hu_get_author_title() {
    $author = get_userdata( get_query_var('author') );
    return sprintf('<i class="fa fa-user"></i>%1$s <span>%2$s </span>',
        __('Author:','hueman'),
        $author->display_name
    );
  }
}


/*  Term Page title
/* @todo => generalize to all taxinomies, including custom ones
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_term_page_title' ) ) {
  function hu_get_term_page_title() {
    if ( is_category() ) {
      $title = sprintf('<i class="fa fa-folder-open"></i>%1$s <span>%2$s </span>',
          __('Category:','hueman'),
          single_cat_title('', false)
      );
    } else if ( is_tag() ) {
      $title = sprintf('<i class="fa fa-tags"></i>%1$s <span>%2$s </span>',
          __('Tagged:','hueman'),
          single_tag_title('', false)
      );
    }
    return $title;
  }
}


/*  Date archive page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_date_archive_title' ) ) {
  function hu_get_date_archive_title() {
    if ( is_day() ) {
      $title = sprintf('<i class="fa fa-calendar"></i>%1$s <span>%2$s </span>',
          __('Daily Archive:','hueman'),
          get_the_time('F j, Y')
      );
    } else if ( is_month() ) {
      $title = sprintf('<i class="fa fa-calendar"></i>%1$s <span>%2$s </span>',
          __('Monthly Archive:','hueman'),
          get_the_time('F Y')
      );
    } else if ( is_year() ) {
      $title = sprintf('<i class="fa fa-calendar"></i>%1$s <span>%2$s </span>',
          __('Yearly Archive:','hueman'),
          get_the_time('Y')
      );
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

    return apply_filters( 'hu_blog_title', sprintf('%1$s <span class="hu-blog-subheading">%2$s</span>',
        $heading,
        $subheading
      )
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





/* ------------------------------------------------------------------------- *
 *  Placeholder thumbs for preview demo mode
/* ------------------------------------------------------------------------- */
/* Echoes the <img> tag of the placeholder thumbnail
*  + an animated svg icon
*  the src property can be filtered
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_placeholder_thumb' ) ) {

  function hu_get_placeholder_thumb( $_requested_size = 'thumb-medium' ) {
    $_unique_id = uniqid();
    $filter = false;
    $_sizes = array( 'thumb-medium', 'thumb-small', 'thumb-standard' );
    if ( ! in_array($_requested_size, $_sizes) )
      $_requested_size = 'thumb-medium';
    //default $img_src
    $_img_src = get_template_directory_uri() . "/assets/front/img/{$_requested_size}.png";

    if ( apply_filters( 'hu-use-svg-thumb-placeholder', true ) ) {
        $_size = $_requested_size . '-empty';
        $_img_src = get_template_directory_uri() . "/assets/front/img/{$_size}.png";
        $_svg_height = in_array($_size, array( 'thumb-medium', 'thumb-standard' ) ) ? 100 : 60;
        ?>
        <svg class="hu-svg-placeholder <?php echo $_size; ?>" id="<?php echo $_unique_id; ?>" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M928 832q0-14-9-23t-23-9q-66 0-113 47t-47 113q0 14 9 23t23 9 23-9 9-23q0-40 28-68t68-28q14 0 23-9t9-23zm224 130q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-1024 574h1536v-128h-1536v128zm1152-574q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm-1024-642h384v-128h-384v128zm-128 192h1536v-256h-828l-64 128h-644v128zm1664-256v1280q0 53-37.5 90.5t-90.5 37.5h-1536q-53 0-90.5-37.5t-37.5-90.5v-1280q0-53 37.5-90.5t90.5-37.5h1536q53 0 90.5 37.5t37.5 90.5z"/></svg>

        <script type="text/javascript">
          jQuery( function($){
            if ( $('#flexslider-featured').length ) {
              $('#flexslider-featured').on('featured-slider-ready', function() {
                $( '#<?php echo $_unique_id; ?>' ).animateSvg();
              });
            } else { $( '#<?php echo $_unique_id; ?>' ).animateSvg( { svg_opacity : 0.3, filter_opacity : 0.5 } ); }
          });
        </script>
        <?php
    }

    $_img_src = apply_filters( 'hu_placeholder_thumb_src', $_img_src, $_requested_size );
    $filter = apply_filters( 'hu_placeholder_thumb_filter', false );

    //make sure we did not lose the img_src
    if ( false == $_img_src )
      $_img_src = get_template_directory_uri() . "/assets/front/img/{$_requested_size}.png";

    printf( ' %1$s<img class="hu-img-placeholder" src="%2$s" alt="%3$s" data-hu-post-id="%4$s" />',
      false !== $filter ? $filter : '',
      $_img_src,
      get_the_title(),
      $_unique_id
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
    $classes[] = hu_get_layout_class();
    $classes[] = hu_is_checked( 'boxed' ) ? 'boxed' : 'full-width';
    if ( hu_has_nav_menu('topbar') ) { $classes[] = 'topbar-enabled'; }
    if ( hu_get_option( 'mobile-sidebar-hide' ) == 's1' ) { $classes[] = 'mobile-sidebar-hide-s1'; }
    if ( hu_get_option( 'mobile-sidebar-hide' ) == 's2' ) { $classes[] = 'mobile-sidebar-hide-s2'; }
    if ( hu_get_option( 'mobile-sidebar-hide' ) == 's1-s2' ) { $classes[] = 'mobile-sidebar-hide'; }
    if ( wp_is_mobile() ) { $classes[] = 'wp-is-mobile'; };

    //Stickyness of menus
    //=> hu_normalize_stick_menu_opt() is used to ensure retro compat with the previously boolean option type
    $desktop_sticky = hu_normalize_stick_menu_opt( hu_get_option('header-desktop-sticky') );
    $mobile_sticky = hu_normalize_stick_menu_opt( hu_get_option('header-mobile-sticky') );

    if ( 'no_stick' != $desktop_sticky ) { $classes[] = 'header-desktop-sticky'; }
    if ( 'no_stick' != $mobile_sticky ) { $classes[] = 'header-mobile-sticky'; }

    return $classes;
  }
}
add_filter( 'body_class', 'hu_body_class' );



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


/*  Custom logo
/* ------------------------------------ */
//the purpose of this filter is to handle the retro-compatibility for the WP custom logo introduced in wp 4.5 and implemented in Hueman v3.2.4+
if ( ! function_exists( 'hu_set_custom_logo' ) ) {
  function hu_set_custom_logo( $_src, $option_name ) {
    if ( 'custom-logo' != $option_name )
      return $_src;
    //do we have a custom logo available in the theme_mods ?
    if ( ! function_exists( 'the_custom_logo' ) )
      return $_src;
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    if ( false == $custom_logo_id || empty($custom_logo_id) )
      return $_src;

    return hu_get_img_src( $custom_logo_id );
  }
}
add_filter( 'hu_img_src_from_option', 'hu_set_custom_logo', 10, 2 );




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
//hook : wp_enqueue_scripts
if ( ! function_exists( 'hu_scripts' ) ) {
  function hu_scripts() {
    if ( has_post_format( 'gallery' ) || ( is_home() && ! is_paged() && ( hu_get_option('featured-posts-count') != '0' ) ) ) {
      wp_enqueue_script(
        'flexslider',
        get_template_directory_uri() . '/assets/front/js/lib/jquery.flexslider.min.js',
        array( 'jquery' ),
        '',
        false
      );
    }

    if ( has_post_format( 'audio' ) ) {
      wp_enqueue_script(
        'jplayer',
        get_template_directory_uri() . '/assets/front/js/lib/jquery.jplayer.min.js',
        array( 'jquery' ),
        '',
        true
      );
    }

    wp_enqueue_script(
        'hu-front-scripts',
        sprintf('%1$s/assets/front/js/scripts%2$s.js' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
        array( 'jquery', 'underscore' ),
        ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
        true
    );

    if ( is_singular() && get_option( 'thread_comments' ) && comments_open() ) {
      wp_enqueue_script( 'comment-reply' );
    }

    global $wp_registered_widgets;
    $_regwdgt = array();
    foreach ( $wp_registered_widgets as $_key => $_value) {
      $_regwdgt[] = $_key;
    }
    wp_localize_script(
          'hu-front-scripts',
          'HUParams',
          apply_filters( 'hu_customizr_script_params' , array(
              '_disabled'          => apply_filters( 'hu_disabled_front_js_parts', array() ),
              'SmoothScroll'      => array(
                'Enabled' => apply_filters('hu_enable_smoothscroll', ! wp_is_mobile() && hu_is_checked('smoothscroll') ),
                'Options' => apply_filters('hu_smoothscroll_options', array( 'touchpadSupport' => false ) )
              ),
              'centerAllImg'      => apply_filters( 'hu_center_img', true ),
              'timerOnScrollAllBrowsers' => apply_filters( 'hu_timer_on_scroll_for_all_browser' , true), //<= if false, for ie only
              'extLinksStyle'       => hu_is_checked('ext_link_style'),
              'extLinksTargetExt'   => hu_is_checked('ext_link_target'),
              'extLinksSkipSelectors'   => apply_filters(
                'hu_ext_links_skip_selectors',
                array(
                  'classes' => array('btn', 'button'),
                  'ids' => array()
                )
              ),
              'imgSmartLoadEnabled' => apply_filters( 'hu_img_smart_load_enabled', hu_is_checked('smart_load_img') ),
              'imgSmartLoadOpts'    => apply_filters( 'hu_img_smart_load_options' , array(
                    'parentSelectors' => array(
                        '.container .content',
                        '.container .sidebar',
                        '#footer',
                        '#header-widgets'
                    ),
                    'opts'     => array(
                        'excludeImg' => array( '.tc-holder-img' ),
                        'fadeIn_options' => 100
                    )
              )),
              'goldenRatio'         => apply_filters( 'hu_grid_golden_ratio' , 1.618 ),
              'gridGoldenRatioLimit' => apply_filters( 'hu_grid_golden_ratio_limit' , 350),
              'sbStickyUserSettings' => array( 'desktop' => hu_is_checked('desktop-sticky-sb'), 'mobile' => hu_is_checked('mobile-sticky-sb') && wp_is_mobile() ),
              'menuStickyUserSettings' => array(
                  'desktop' => hu_normalize_stick_menu_opt( hu_get_option('header-desktop-sticky') ),
                  'mobile'  => hu_normalize_stick_menu_opt( hu_get_option('header-mobile-sticky') )
              ),
              'isDevMode' => ( defined('WP_DEBUG') && true === WP_DEBUG ) || ( defined('CZR_DEV') && true === CZR_DEV )
            )
        )//end of filter
       );//wp_localize_script()
  }//function
}
add_action( 'wp_enqueue_scripts', 'hu_scripts' );

/* ------------------------------------------------------------------------- *
 *  Helper for header and mobile sticky setting
 *  => previously set with a checkbox. Since v3.3.10 the option is a string set with a select input type
/* ------------------------------------------------------------------------- */
function hu_normalize_stick_menu_opt( $opt_val = 'stick_up' ) {
    //since v3.3.10, the option should be a string among those : 'no_stick', 'stick_up', 'stick_always'
    //before, the option could be : booleans : true, false, numeric : 1, 0, or strings '1', '0'
    //if the current value is a string longer than 1, then nothing to worry about.
    //if not, then we have to apply the following correspondance mapping :
    // [ true or 1 or '1' <=> hu_is_checked( $opt_val ) ] => 'stick_up'
    //else
    //'no_stick'
    if ( is_string( $opt_val ) && 1 < strlen( $opt_val ) ) {
        return $opt_val;
    } else {
        return hu_booleanize_checkbox_val( $opt_val ) ? 'stick_up' : 'no_stick';
    }
}


/*  Enqueue css
/* ------------------------------------ */
if ( ! function_exists( 'hu_styles' ) ) {
  function hu_styles() {
    //registered only, will be loaded as a dependency of the wp style.css
    wp_register_style(
        'hueman-main-style',
        hu_get_front_style_url(),//defined in init-core
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
        array('hueman-main-style'),
        ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
        'all'
    );

    //can be dequeued() if already loaded by a plugin.
    //=> wp_dequeue_style( 'hueman-font-awesome' )
    wp_enqueue_style(
        'hueman-font-awesome',
        sprintf('%1$s/assets/front/css/%2$s',
            get_template_directory_uri(),
            hu_is_checked('minified-css') ? 'font-awesome.min.css' : 'dev-font-awesome.css'
        ),
        array( 'theme-stylesheet' ),
        ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
        'all'
    );
    wp_add_inline_style( 'theme-stylesheet', apply_filters( 'ha_user_options_style' , '' ) );
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


//@return void
//A utility to override the default tmpl from a plugin
//falls back on get_template_part( $path )
function hu_get_template_part( $path ) {
    $_filter = basename($path);
    //allows developers to deactivate a particular template
    if ( ! apply_filters( 'hu_is_template_part_on', true, $_filter ) )
      return;
    $_custom_path = apply_filters( "hu_tmpl_{$_filter}", false );
    if ( ! $_custom_path )
      get_template_part( $path );
    else if ( '' != $_custom_path )
      load_template( $_custom_path, true );//true for require_once
}




/* ------------------------------------------------------------------------- *
 *  Page Menu
/* ------------------------------------------------------------------------- */
/**
 * Display or retrieve list of pages with optional home link.
 * Modified copy of wp_page_menu()
 * @return string html menu
 */
function hu_page_menu( $args = array() ) {
  $defaults = array('show_home' => true, 'sort_column' => 'menu_order, post_title', 'menu_class' => 'menu', 'echo' => true, 'link_before' => '', 'link_after' => '');
  $args = wp_parse_args( $args, $defaults );

  $args = apply_filters( 'wp_page_menu_args', $args );

  $menu = '';

  $list_args = $args;

  // Show Home in the menu
  if ( ! empty($args['show_home']) ) {
    if ( true === $args['show_home'] || '1' === $args['show_home'] || 1 === $args['show_home'] )
      $text = __('Home' , 'hueman');
    else
      $text = $args['show_home'];
    $class = '';
    if ( is_front_page() && !is_paged() )
      $class = 'class="current_page_item"';
    $menu .= '<li ' . $class . '><a href="' . home_url( '/' ) . '">' . $args['link_before'] . $text . $args['link_after'] . '</a></li>';
    // If the front page is a page, add it to the exclude list
    if (get_option('show_on_front') == 'page') {
      if ( !empty( $list_args['exclude'] ) ) {
        $list_args['exclude'] .= ',';
      } else {
        $list_args['exclude'] = '';
      }
      $list_args['exclude'] .= get_option('page_on_front');
    }
  }

  $list_args['echo'] = false;
  $list_args['title_li'] = '';
  $menu .= str_replace( array( "\r", "\n", "\t" ), '', hu_list_pages($list_args) );

  // if ( $menu )
  //   $menu = '<ul>' . $menu . '</ul>';

  //$menu = '<div class="' . esc_attr($args['menu_class']) . '">' . $menu . "</div>\n";

  if ( $menu )
    $menu = '<ul class="' . esc_attr($args['menu_class']) . '">' . $menu . '</ul>';

  //$menu = apply_filters( 'wp_page_menu', $menu, $args );
  if ( $args['echo'] )
    echo $menu;
  else
    return $menu;
}


/**
 * Retrieve or display list of pages in list (li) format.
 * Modified copy of wp_list_pages
 * @return string HTML list of pages.
 */
function hu_list_pages( $args = '' ) {
  $defaults = array(
    'depth' => 0, 'show_date' => '',
    'date_format' => get_option( 'date_format' ),
    'child_of' => 0, 'exclude' => '',
    'title_li' => __( 'Pages', 'hueman' ), 'echo' => 1,
    'authors' => '', 'sort_column' => 'menu_order, post_title',
    'link_before' => '', 'link_after' => '', 'walker' => '',
  );

  $r = wp_parse_args( $args, $defaults );

  $output = '';
  $current_page = 0;

  // sanitize, mostly to keep spaces out
  $r['exclude'] = preg_replace( '/[^0-9,]/', '', $r['exclude'] );

  // Allow plugins to filter an array of excluded pages (but don't put a nullstring into the array)
  $exclude_array = ( $r['exclude'] ) ? explode( ',', $r['exclude'] ) : array();

  $r['exclude'] = implode( ',', apply_filters( 'wp_list_pages_excludes', $exclude_array ) );

  // Query pages.
  $r['hierarchical'] = 0;
  $pages = get_pages( $r );

  if ( ! empty( $pages ) ) {
    if ( $r['title_li'] ) {
      $output .= '<li class="pagenav">' . $r['title_li'] . '<ul>';
    }
    global $wp_query;
    if ( is_page() || is_attachment() || $wp_query->is_posts_page ) {
      $current_page = get_queried_object_id();
    } elseif ( is_singular() ) {
      $queried_object = get_queried_object();
      if ( is_post_type_hierarchical( $queried_object->post_type ) ) {
        $current_page = $queried_object->ID;
      }
    }

    $output .= hu_walk_page_tree( $pages, $r['depth'], $current_page, $r );

    if ( $r['title_li'] ) {
      $output .= '</ul></li>';
    }
  }

  $html = apply_filters( 'wp_list_pages', $output, $r );

  if ( $r['echo'] ) {
    echo $html;
  } else {
    return $html;
  }
}


/**
 * Retrieve HTML list content for page list.
 *
 * @uses Walker_Page to create HTML list content.
 * @since 2.1.0
 * @see Walker_Page::walk() for parameters and return description.
 */
function hu_walk_page_tree($pages, $depth, $current_page, $r) {
  // if ( empty($r['walker']) )
  //   $walker = new Walker_Page;
  // else
  //   $walker = $r['walker'];
  $walker = new Walker_Page;

  foreach ( (array) $pages as $page ) {
    if ( $page->post_parent )
      $r['pages_with_children'][ $page->post_parent ] = true;
  }

  $args = array($pages, $depth, $r, $current_page);
  return call_user_func_array(array($walker, 'walk'), $args);
}