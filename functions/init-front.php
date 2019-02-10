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
if( ! function_exists('hu_is_authorized_tmpl') ) {
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
        <div class="nav-toggle"><i class="fas fa-bars"></i></div>
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
    if ( hu_is_checked( 'force-layout-global' ) ) {
        $layout = hu_get_option( 'layout-global' );
    }
    elseif ( ! hu_is_real_home() && ( is_page() || is_single() ) ) {
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
    if ( 'header-ads' !== $_id ) {// we don't want to print a placeholder for the header ads widget zone.
        if ( empty( $sidebars_widgets[ $_id ] ) || ! is_array( $sidebars_widgets[ $_id ] ) ) {
          printf('<div class="widget" id="hu-widget-zone-when-customizing-%3$s"><div class="hu-placeholder-widget"><h3>%1$s<br/><span class="zone-name">"%2$s"</span></h3></div></div>',
            __('Add widgets to the zone :', 'hueman'),
            $wp_registered_sidebars[$_id]['name'],
            $_id
          );
        }
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

    if ( ! is_array( $_raw_socials ) )
      return;

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

    //FA5 backward compatibility with FA4
    //see https://github.com/presscustomizr/customizr/issues/1364
    $_fa_solid_icons = array(
        'fa-envelope',
        'fa-envelope-square',
        'fa-mobile',
        'fa-mobile-alt',
        'fa-phone',
        'fa-phone-square',
        'fa-rss',
        'fa-rss-square',
        'fa-share-alt',
        'fa-share-alt-square'
    );
    $_fa_icon_replacements = array(
        'fa-bitbucket-square'     => 'fa-bitbucket',
        'fa-facebook-official'    => 'fa-facebook-f',
        'fa-google-plus-circle'   => 'fa-google-plus',
        'fa-google-plus-official' => 'fa-google-plus',
        'fa-linkedin-square'      => 'fa-linkedin',
        'fa-youtube-play'         => 'fa-youtube'
    );

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
        $icon_class            = isset($item['social-icon']) ? esc_attr($item['social-icon']) : '';


        //FA5 backward compatibility with FA4
        //see https://github.com/presscustomizr/customizr/issues/1364
        //by default they're brands
        $fa_group              = 'fab';
        //perform replacements for missing icons
        $icon_class            = str_replace( array_keys( $_fa_icon_replacements ), array_values( $_fa_icon_replacements ), $icon_class );
        //then treat the -o case: We just use the fa-envelope-o as of now
        if ( strlen( $icon_class ) - 2 == strpos( $icon_class, '-o' ) ) {
            $icon_class        = str_replace( '-o', '', $icon_class );
            $fa_group          = 'far';
        }
        //treat the few solid icons
        else if ( in_array( $icon_class, $_fa_solid_icons ) ){
            $fa_group          = 'fas';
        }
        $icon_class            = "{$fa_group} {$icon_class}";

        // links like tel:*** or skype:**** or call:**** should work
        // implemented for https://github.com/presscustomizr/social-links-modules/issues/7
        $social_link = 'javascript:void(0)';
        if ( isset($item['social-link']) && ! empty( $item['social-link'] ) ) {
            if ( false !== strpos($item['social-link'], 'callto:') || false !== strpos($item['social-link'], 'tel:') || false !== strpos($item['social-link'], 'skype:') ) {
                $social_link = esc_attr( $item['social-link'] );
            } else {
                $social_link = esc_url( $item['social-link'] );
            }
        }

        // Put them together
        printf( '<li><a rel="nofollow" class="social-tooltip" %1$s title="%2$s" aria-label="%2$s" href="%3$s" %4$s %5$s><i class="%6$s"></i></a></li>',
            ! hu_is_customizing() ? '' : sprintf( 'data-model-id="%1$s"', ! isset( $item['id'] ) ? 'hu_socials_'. $key : $item['id'] ),
            isset($item['title']) ? esc_attr( $item['title'] ) : '',
            $social_link,
            ( isset($item['social-target']) && false != $item['social-target'] ) ? 'target="_blank"' : '',
            $style_attr,
            $icon_class
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
//@utility used on front end and partial refresh
//@return string, either a textual or a logo imr src
function hu_get_logo_title( $is_mobile_menu = false ) {
    // Text or image?
    // Since v3.2.4, uses the WP 'custom_logo' theme mod option. Set with a filter.
    $logo_src = false;
    $is_logo_src_set = false;
    $logo_or_title = hu_is_checked( 'display-header-title' ) ? get_bloginfo( 'name' ) : '';

    // Do we have to display a logo ?
    // Then, let's display the relevant one ( desktop or mobile ), if set
    if ( apply_filters( 'hu_display_header_logo', hu_is_checked( 'display-header-logo' ) ) ) {
        //if $is_mobile_menu, let's check if we have a specific logo for mobile set
        if ( $is_mobile_menu ) {
            $logo_src = hu_get_img_src_from_option( 'mobile-header-logo' );
            $is_logo_src_set = false !== $logo_src && ! empty( $logo_src );
        }
        if ( ( $is_mobile_menu && ! $is_logo_src_set ) || ! $is_mobile_menu ) {
            $logo_src = hu_get_img_src_from_option( 'custom-logo' );
            $is_logo_src_set = false !== $logo_src && ! empty( $logo_src );
        }
        if ( $is_logo_src_set ) {
            $logo_src = apply_filters( 'hu_header_logo_src' , $logo_src, $is_mobile_menu );
            $logo_or_title = '<img src="'. $logo_src . '" alt="' . get_bloginfo('name'). '">';
        }
    }//if apply_filters( 'hu_display_header_logo', hu_is_checked( 'display-header-logo' )
    return $logo_or_title;
}


if ( ! function_exists( 'hu_print_logo_or_title' ) ) {
    function hu_print_logo_or_title( $echo = true, $is_mobile_menu = false ) {
        $logo_or_title = hu_get_logo_title( $is_mobile_menu );
        // => If no logo is set and  ! hu_is_checked( 'display-header-title' ), the logo title is empty.
        ob_start();
            do_action( '__before_logo_or_site_title', $logo_or_title );
            if ( ! empty( $logo_or_title ) ) {
                ?>
                  <p class="site-title"><?php hu_do_render_logo_site_tite( $logo_or_title ) ?></p>
                <?php
            }
            do_action( '__after_logo_or_site_title', $logo_or_title );
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
           $logo_or_title = hu_get_logo_title();
        }
        // => If no logo is set and  ! hu_is_checked( 'display-header-title' ), the logo title is empty.
        if ( ! empty( $logo_or_title ) ) {
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
      $icon           = have_posts() ? '<i class="fas fa-search"></i> ' : '<i class="fas fa-exclamation-circle"></i> ';

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
    return sprintf('<i class="fas fa-exclamation-circle"></i>%1$s <span>%2$s </span>',
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
    if ( ! hu_is_checked( 'archive-title-with-icon' ) ) {
        return $author->display_name;
    } else {
        return sprintf('<i class="fas fa-user"></i>%1$s <span>%2$s </span>',
            __('Author:','hueman'),
            $author->display_name
        );
    }
  }
}


/*  Term Page title
/* @todo => generalize to all taxinomies, including custom ones
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_term_page_title' ) ) {
  function hu_get_term_page_title() {
    if ( is_category() ) {
      if ( ! hu_is_checked( 'archive-title-with-icon' ) ) {
          $title = single_cat_title('', false);
      } else {
          $title = sprintf('<i class="fas fa-folder-open"></i>%1$s <span>%2$s </span>',
              __('Category:','hueman'),
              single_cat_title('', false)
          );
      }
    } else if ( is_tag() ) {
      if ( ! hu_is_checked( 'archive-title-with-icon' ) ) {
          $title = single_tag_title('', false);
      } else {
          $title = sprintf('<i class="fas fa-tags"></i>%1$s <span>%2$s </span>',
              __('Tagged:','hueman'),
              single_tag_title('', false)
          );
      }
    }
    return $title;
  }
}


/*  Date archive page title
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_date_archive_title' ) ) {
  function hu_get_date_archive_title() {
    if ( is_day() ) {
      if ( ! hu_is_checked( 'archive-title-with-icon' ) ) {
          $title = get_the_time('F j, Y');
      } else {
          $title = sprintf('<i class="fas fa-calendar"></i>%1$s <span>%2$s </span>',
              __('Daily Archive:','hueman'),
              get_the_time('F j, Y')
          );
      }

    } else if ( is_month() ) {
      if ( ! hu_is_checked( 'archive-title-with-icon' ) ) {
          $title = get_the_time('F Y');
      } else {
          $title = sprintf('<i class="fas fa-calendar"></i>%1$s <span>%2$s </span>',
              __('Monthly Archive:','hueman'),
              get_the_time('F Y')
          );
      }

    } else if ( is_year() ) {
      if ( ! hu_is_checked( 'archive-title-with-icon' ) ) {
          $title = get_the_time('Y');
      } else {
          $title = sprintf('<i class="fas fa-calendar"></i>%1$s <span>%2$s </span>',
              __('Yearly Archive:','hueman'),
              get_the_time('Y')
          );
      }
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
function hu_get_related_posts() {
    wp_reset_postdata();
    global $post;

    // Define shared post arguments
    $args = array(
        'no_found_rows'           => true,
        'update_post_meta_cache'  => false,
        'update_post_term_cache'  => false,
        'ignore_sticky_posts'     => 1,
        'orderby'                 => 'rand',
        'post__not_in'            => array( $post->ID ),
        'posts_per_page'          => 3
    );

    // Related by categories
    if ( hu_get_option( 'related-posts' ) == 'categories' ) {
        $cats = get_post_meta( $post->ID, 'related-cat', true );

        if ( ! $cats ) {
            $cats = wp_get_post_categories( $post->ID, array( 'fields'=>'ids' ) );
            $args['category__in'] = $cats;
        } else {
            $args['cat'] = $cats;
        }
    }

    // Related by tags
    if ( hu_get_option( 'related-posts' ) == 'tags' ) {
        $tags = get_post_meta($post->ID, 'related-tag', true);

        if ( ! $tags ) {
            $tags = wp_get_post_tags( $post->ID, array( 'fields'=>'ids') );
            $args['tag__in'] = $tags;
        } else {
            $args['tag_slug__in'] = explode( ',', $tags );
        }
        if ( ! $tags ) { $break = true; }
    }
    // if isset( $break ), returns and empty query
    return ! isset( $break ) ? new WP_Query( $args ) : new WP_Query;
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
if ( ! function_exists( 'hu_print_placeholder_thumb' ) ) {

  function hu_print_placeholder_thumb( $_requested_size = 'thumb-medium' ) {
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
      the_title_attribute( 'echo=0' ),
      $_unique_id
    );
  }
}








/* ------------------------------------------------------------------------- *
 *  FILTERS
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

    //Note : no stickyness implemented when 2 menus ( 'both_menus') are displayed on mobiles ( => like it was historically in the earliest version in Hueman )
    if ( 'no_stick' != $mobile_sticky && 'both_menus' != hu_get_option( 'header_mobile_menu_layout' ) ) { $classes[] = 'header-mobile-sticky'; }

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



//hook : hu_front_js_localized_params
//Add the fittext params on front if the user option is checked
//@param $localized = array()
function hu_add_fittext_js_front_params( $localized = array() ) {
    $localized = ! is_array( $localized ) ? array() : $localized;

    if ( ! hu_is_checked( 'fittext' ) )
      return $localized;

    //user font-size preprocess
    $user_font_size = hu_get_option( 'body-font-size' );
    $user_font_size = is_numeric( $user_font_size ) ? $user_font_size : '16';


    return array_merge( $localized , array(
        //Fittext
        'fitTextMap'      => array(
            //Singular headings
            'single_post_title' => array(
                'selectors' => '.single h1.entry-title',
                'minEm'     => 1.375,
                'maxEm'     => 2.62
            ),
            'page_title' => array(
                'selectors' => '.page-title h1',
                'minEm'     => 1,
                'maxEm'     => 1.3
            ),
            'home_page_title' => array(
                'selectors' => '.home .page-title',
                'minEm'     => 1,
                'maxEm'     => 1.2,
                'compression' => 2.5
            ),

            //post lists
            'post_titles' => array(
                'selectors' => '.blog .post-title, .archive .post-title',
                'minEm'     => 1.375,
                'maxEm'     => 1.475
            ),
            'featured_post_titles' => array(
                'selectors' => '.featured .post-title',
                'minEm'     => 1.375,
                'maxEm'     => 2.125
            ),

            //Comments
            'comments' => array(
                'selectors' => '.commentlist li',
                'minEm'     => 0.8125,
                'maxEm'     => 0.93,
                'compression' => 2.5
            ),

            //entry content p and hx headings
            'entry' => array(
                'selectors' => '.entry',
                'minEm'     => 0.9375,
                'maxEm'     => 1.125,
                'compression' => 2.5
            ),
            'content_h1' => array(
                'selectors' => '.entry h1, .woocommerce div.product h1.product_title',
                'minEm'     => 1.875 * 0.9375,//this factor is the .entry inherited font-size @media only screen and (max-width: 719px) {.entry : .9375em }
                'maxEm'     => 2.375 * 1.125//this factor is the .entry inherited font-size : 1.125em
            ),
            'content_h2' => array(
                'selectors' => '.entry h2',
                'minEm'     => 1.625 * 0.9375,//this factor is the .entry inherited font-size @media only screen and (max-width: 719px) {.entry : .9375em }
                'maxEm'     => 2.125 * 1.125//this factor is the .entry inherited font-size : 1.125em
            ),
            'content_h3' => array(
                'selectors' => '.entry h3',
                'minEm'     => 1.5 * 0.9375,//this factor is the .entry inherited font-size @media only screen and (max-width: 719px) {.entry : .9375em }
                'maxEm'     => 1.75 * 1.125//this factor is the .entry inherited font-size : 1.125em
            ),
            'content_h4' => array(
                'selectors' => '.entry h4',
                'minEm'     => 1.375 * 0.9375,//this factor is the .entry inherited font-size @media only screen and (max-width: 719px) {.entry : .9375em }
                'maxEm'     => 1.5 * 1.125//this factor is the .entry inherited font-size : 1.125em
            ),
            'content_h5' => array(
                'selectors' => '.entry h5',
                'minEm'     => 1.125 * 0.9375,//this factor is the .entry inherited font-size @media only screen and (max-width: 719px) {.entry : .9375em }
                'maxEm'     => 1.25 * 1.125//this factor is the .entry inherited font-size : 1.125em
            ),
            'content_h6' => array(
                'selectors' => '.entry h6',
                'minEm'     => 1 * 0.9375,//this factor is the .entry inherited font-size @media only screen and (max-width: 719px) {.entry : .9375em }
                'maxEm'     => 1.125 * 1.125,//this factor is the .entry inherited font-size : 1.125em,
                'compression' => 2.5
            )
        ),
        'userFontSize'    => $user_font_size,
        'fitTextCompression' => apply_filters( 'hu_fittext_compression', 1.5 )
    ) );
}
add_filter( 'hu_front_js_localized_params', 'hu_add_fittext_js_front_params' );






/* ------------------------------------------------------------------------- *
 *  Styles and scripts
/* ------------------------------------------------------------------------- */
/*  Enqueue javascript
/* ------------------------------------ */
//hook : wp_enqueue_scripts
if ( ! function_exists( 'hu_scripts' ) ) {
  function hu_scripts() {
    if ( hu_is_full_nimble_tmpl() )
      return;
    if ( hu_is_checked( 'js-mobile-detect') ) {
      wp_enqueue_script(
        'mobile-detect',
        get_template_directory_uri() . '/assets/front/js/libs/mobile-detect.min.js',
        array(),
        '',
        false
      );
    }

    if ( has_post_format( 'gallery' ) || ( is_home() && ! is_paged() && ( hu_get_option('featured-posts-count') != '0' ) ) ) {
      wp_enqueue_script(
        'flexslider',
        get_template_directory_uri() . '/assets/front/js/libs/jquery.flexslider.min.js',
        array( 'jquery' ),
        '',
        false
      );
    }

    if ( has_post_format( 'audio' ) ) {
      wp_enqueue_script(
        'jplayer',
        get_template_directory_uri() . '/assets/front/js/libs/jquery.jplayer.min.js',
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

    //Welcome note preprocess
    $is_welcome_note_on = false;
    $welcome_note_content = '';
    if ( ! HU_IS_PRO && hu_user_started_with_current_version() ) {
        // Welcome note deactivated since TRT request on slack
        // implemented in release following since https://github.com/presscustomizr/hueman/issues/683
        $is_welcome_note_on = apply_filters(
            'hu_is_welcome_front_notification_on',
            false
            //hu_user_can_see_customize_notices_on_front() && ! hu_is_customizing() && ! hu_isprevdem() && 'dismissed' != get_transient( 'hu_welcome_note_status' )
        );
        if ( $is_welcome_note_on ) {
            $welcome_note_content = hu_get_welcome_note_content();
        }
    }

    //user started with
    $started_on = get_transient( 'hu_start_date' );

    wp_localize_script(
          'hu-front-scripts',
          'HUParams',
          apply_filters( 'hu_front_js_localized_params' , array(
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
                'sbStickyUserSettings' => array(
                    'desktop' => hu_is_checked('desktop-sticky-sb'),
                    'mobile' => hu_is_checked( 'mobile-sticky-sb' )
                ),
                'isWPMobile' => wp_is_mobile(),
                'menuStickyUserSettings' => array(
                    'desktop' => hu_normalize_stick_menu_opt( hu_get_option( 'header-desktop-sticky' ) ),
                    'mobile'  => hu_normalize_stick_menu_opt( hu_get_option( 'header-mobile-sticky' ) )
                ),
                'mobileSubmenuExpandOnClick' => esc_attr( hu_get_option( 'mobile-submenu-click' ) ),
                'submenuTogglerIcon'   => '<i class="fas fa-angle-down"></i>',
                'isDevMode' => ( defined('WP_DEBUG') && true === WP_DEBUG ) || ( defined('CZR_DEV') && true === CZR_DEV ),
                //AJAX
                'ajaxUrl'        => add_query_arg(
                      array( 'huajax' => true ), //to scope our ajax calls
                      set_url_scheme( home_url( '/' ) )
                ),
                'frontNonce'   => array( 'id' => 'HuFrontNonce', 'handle' => wp_create_nonce( 'hu-front-nonce' ) ),

                //Welcome
                'userStarted' => array(
                      'with' => get_transient( HU_IS_PRO ? 'started_using_hueman_pro' : 'started_using_hueman' ),
                      'on' => is_object( $started_on ) ? (array)$started_on : $started_on
                ),
                'isWelcomeNoteOn' => $is_welcome_note_on,
                'welcomeContent'  => $welcome_note_content,
                'i18n' => array(
                  'collapsibleExpand'   => __( 'Expand', 'hueman' ),
                  'collapsibleCollapse' => __( 'Collapse', 'hueman' )
                ),
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


// ENQUEUE CSS
// The style priority order is, without child theme :
// 1) main hueman css
// 2) dynamic inline style with wp_add_inline_style() ( @see dynamic style + hueman pro )
// 3) wp-custom-css ( if any )
//
// and with child theme
// 1) main hueman css
// 2) dynamic inline style with wp_add_inline_style() ( @see dynamic style + hueman pro )
// 3) child theme style.css
// 4) wp-custom-css ( if any )
//
// The parent style.css is not needed when no child theme used
// Let's save a useless http request !
/* ------------------------------------ */
if ( ! function_exists( 'hu_styles' ) ) {
  function hu_styles() {
    // Dec 2018 : When using the full nimble template, header + content + footer, we still need to load the Hueman stylesheet to have the Hueman widgets style
    // if ( hu_is_full_nimble_tmpl() )
    //   return;

    //Registered only if child theme => will be loaded as a dependency when enqueuing wp child style.css
    if ( is_child_theme() ) {
        wp_register_style(
            'hueman-main-style',
            hu_get_front_style_url(),//defined in init-core
            array(),
            ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
            'all'
        );
    } else {
        wp_enqueue_style(
            'hueman-main-style',
            hu_get_front_style_url(),//defined in init-core
            array(),
            ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
            'all'
        );
    }

    //Always loaded before a child theme style.css if any
    wp_add_inline_style( 'hueman-main-style', apply_filters( 'ha_user_options_style' , '' ) );

    //This function loads the main theme stylesheet or the child theme one
    //1) Not mandatory if only the main theme is activated. But mandatory if a child theme is used (otherwise the child theme style won't be loaded)
    //2) must be loaded dependant of 'hueman-main', to make it easier to override the main stylesheet rules without having to increase the specificicty of each child theme css rules
    if ( is_child_theme() ) {
        wp_enqueue_style(
            'theme-stylesheet',
            get_stylesheet_uri(),
            array('hueman-main-style'),
            ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
            'all'
        );
    }

    //can be dequeued() if already loaded by a plugin.
    //=> wp_dequeue_style( 'hueman-font-awesome' )
    wp_enqueue_style(
        'hueman-font-awesome',
        sprintf('%1$s/assets/front/css/%2$s',
            get_template_directory_uri(),
            hu_is_checked('minified-css') ? 'font-awesome.min.css' : 'dev-font-awesome.css'
        ),
        is_child_theme() ? array( 'theme-stylesheet' ) : array(),
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




add_filter( 'hu_masonry_grid_thumb_size',  'hu_maybe_replace_blog_thumb_size_with_full' );
add_filter( 'hu_grid_featured_thumb_size', 'hu_maybe_replace_blog_thumb_size_with_full' );
add_filter( 'hu_grid_standard_thumb_size', 'hu_maybe_replace_blog_thumb_size_with_full' );
add_filter( 'hu_grid_thumb_size',          'hu_maybe_replace_blog_thumb_size_with_full' );

//@return string thumb-size
//Filter to override the default grid thumb sizes
//hook: 'hu_masonry_grid_thumb_size'
//hook: 'hu_grid_thumb_size'
function hu_maybe_replace_blog_thumb_size_with_full( $thumb_size ) {
  return hu_is_checked( 'blog-use-original-image-size' ) ? 'full' : $thumb_size;
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










/* ------------------------------------------------------------------------- *
 *  AJAX
/* ------------------------------------------------------------------------- */
add_action( 'template_redirect', 'hu_ajax_response' );
function hu_ajax_response() {
    //check
    if ( ! hu_is_ajax() )
        return false;

    //do nothing if not doing a specific huajax call
    if ( ! ( isset( $_GET[ 'huajax' ] ) && $_GET[ 'huajax' ] ) )
        return false;

    // Require an action parameter
    if ( ! isset( $_REQUEST['action'] ) || empty( $_REQUEST['action'] ) )
        die( '0' );

    // Will be used by hu_is_ajax();
    if ( ! defined( 'DOING_AJAX' ) )
        define( 'DOING_AJAX', true );

    //Nonce is not needed as long as we don't write in the db
    //Furthermore, when a cache plugin is used, front nonces can not be used.
    //@see https://github.com/presscustomizr/hueman/issues/512
    //'frontNonce'   => array( 'id' => 'HuFrontNonce', 'handle' => wp_create_nonce( 'hu-front-nonce' ) )
    if ( isset( $_REQUEST['withNonce'] ) && true == $_REQUEST['withNonce'] )
        check_ajax_referer( 'hu-front-nonce', 'HuFrontNonce' );

    @header( 'Content-Type: text/html; charset=' . get_option( 'blog_charset' ) );
    send_nosniff_header();

    $action = $_REQUEST['action'];//we know it is set at this point
    do_action( "hu_ajax_{$action}"  );
    die( '0' );
}

//This ajax requests solves the problem of knowing if wp_is_mobile() in a front js script, when the website is using a cache plugin
//without a cache plugin, we could localize the wp_is_mobile() boolean
//with a cache plugin, we need to always get a fresh answer from the server
add_action( 'hu_ajax_hu_wp_is_mobile', 'hu_ajax_wp_is_mobile' );
function hu_ajax_wp_is_mobile() {
    wp_send_json_success( array( 'is_mobile' => wp_is_mobile() ) );
}




/* ------------------------------------------------------------------------- *
 *  Include attachments in search results
/* ------------------------------------------------------------------------- */
add_action ( 'pre_get_posts' , 'hu_include_attachments_in_search' );
/**
* hook : pre_get_posts
* @return  void()
* Includes attachments in search results
*/
function hu_include_attachments_in_search( $query ) {
    if ( ! $query -> is_search || ! apply_filters( 'hu_include_attachments_in_search_results' , hu_is_checked( 'attachments-in-search' ) ) )
      return;

    // add post status 'inherit'
    $post_status = $query->get( 'post_status' );
    if ( ! $post_status || 'publish' == $post_status )
      $post_status = array( 'publish', 'inherit' );
    if ( is_array( $post_status ) )
      $post_status[] = 'inherit';

    $query->set( 'post_status', $post_status );
}


/* ------------------------------------------------------------------------- *
 *  Include attachments in search results
/* ------------------------------------------------------------------------- */
add_action ( 'pre_get_posts' , 'hu_include_cpt_in_lists' );
/**
* hook : pre_get_posts
* Includes Custom Posts Types (set to public and excluded_from_search_result = false) in archives and search results
* In archives, it handles the case where a CPT has been registered and associated with an existing built-in taxonomy like category or post_tag
* @return void()
*/
function hu_include_cpt_in_lists( $query ) {
    if (
      is_admin()
      || ! $query->is_main_query()
      || ! apply_filters('hu_include_cpt_in_archives' , false)
      || ! ( $query->is_search || $query->is_archive )
    ) { return; }

    //filter the post types to include, they must be public and not excluded from search
    //we also exclude the built-in types, to exclude pages and attachments, we'll add standard posts later
    $post_types         = get_post_types( array( 'public' => true, 'exclude_from_search' => false, '_builtin' => false) );

    //add standard posts
    $post_types['post'] = 'post';
    if ( $query -> is_search ){
        // add standard pages in search results => new wp behavior
        $post_types['page'] = 'page';
        // allow attachments to be included in search results by tc_include_attachments_in_search method
        if ( apply_filters( 'hu_include_attachments_in_search_results' , hu_is_checked( 'attachments-in-search' ) ) )
          $post_types['attachment'] = 'attachment';
    }

    // add standard pages in search results
    $query->set('post_type', $post_types );
}

/* ------------------------------------------------------------------------- *
 *  Filter home/blog posts by category
/* ------------------------------------------------------------------------- */
add_action( 'pre_get_posts', 'ha_filter_home_blog_posts_by_tax' );
/**
 * hook : pre_get_posts
 * Filter home/blog posts by tax: cat
*/
function ha_filter_home_blog_posts_by_tax( $query ) {
    _ha_filter_home_blog_posts_by_tax( $query );
}

//Make sure the infinite scroll query object is filtered as well
add_filter ( 'infinite_scroll_query_object' , 'ha_filter_home_blog_infinite_posts_by_tax' );
/**
 * hook : infinite_scroll_query_object
 * Filter infinite home/blog posts by tax: cat
*/
function ha_filter_home_blog_infinite_posts_by_tax( $query ) {
    return _ha_filter_home_blog_posts_by_tax( $query, $reset_cat_category_name = true );
}

function _ha_filter_home_blog_posts_by_tax( $query, $reset_cat_category_name = false ) {
    // when we have to filter?
    // in home and blog page
    if ( is_admin() || ! $query->is_main_query() || ! ( ( is_home() && 'posts' == get_option('show_on_front') ) || $query->is_posts_page ) ) {
        return $query;
    }

    // temp: do not filter in when classic grid enabled and infinite scroll enabled in home/blog
    // we do something similar in Customizr.
    // The problem is that in our infinite scroll "binding" we have a code to modify the main query
    // when the classic-grid layout is selected, in order to fill all the grid rows.
    // For some reason, setting the query category__in var below makes the query (hence the whole page) act like a category archive,
    if ( 'classic-grid' === esc_attr( hu_get_option( 'pro_post_list_design' ) ) &&
            class_exists( 'PC_HAPINF' ) && esc_attr( hu_get_option( 'infinite-scroll' ) ) ) {
        return $query;
    }

    // categories
    // we have to ignore sticky posts (do not prepend them)
    $cats = hu_get_option( 'blog-restrict-by-cat' );
    $cats = array_filter( $cats, 'hu_category_id_exists' );
    if ( is_array( $cats ) && ! empty( $cats ) ){
        // Fix for https://github.com/presscustomizr/hueman-pro/issues/25
        // Basically when we filtering the blog with more than one category
        // "infinte posts" are filtered by the category with the smaller ID defined in $cats.
        // The reason is that the infinite scroll query takes ar arguments the query vars of the
        // "first page" query, that are localized and then sent back in the ajax request, and
        // when we apply the category__in 'filter' to the blog page, for some reason, the main wp_query
        // vars "cat" and "category_name" are set as the ID and the name of the smaller ID defined in $cats.
        // With the if block below we vaoid this unwanted behavior.
        if ( $reset_cat_category_name ) {
            $query->set( 'cat', '' );
            $query->set( 'category_name', '' );
        }
        $query->set( 'category__in', $cats );
        $query->set( 'ignore_sticky_posts', 1 );
    }

    return $query;
}



/* ------------------------------------------------------------------------- *
 *  WELCOME NOTE
/* ------------------------------------------------------------------------- */
//This function is invoked only when :
//1) ! HU_IS_PRO && hu_user_started_with_current_version()
//2) AND if the welcome note can be displayed : hu_user_can_see_customize_notices_on_front() && ! hu_is_customizing() && ! hu_isprevdem() && 'dismissed' != get_transient( 'hu_welcome_note_status' )
//It returns a welcome note html string that will be localized in the front js
//@return html string
function hu_get_welcome_note_content() {
    // beautify notice text using some defaults the_content filter callbacks
    // => turns emoticon :D into an svg
    foreach ( array( 'wptexturize', 'convert_smilies', 'wpautop') as $callback ) {
      if ( function_exists( $callback ) )
          add_filter( 'hu_front_welcome_note_html', $callback );
    }
    ob_start();
      ?>
        <div id="bottom-welcome-note">
          <div class="note-content">
            <h2><?php printf( '%1$s :D' , __('Welcome in the Hueman theme', 'hueman' ) ); ?></h2>
              <?php
                  printf('<p>%1$s <a href="%2$s" target="_blank">%3$s</a> %4$s</p>',
                      __('The theme offers a wide range', 'hueman'),
                       admin_url( 'customize.php'),
                      __('of customization options', 'hueman'),
                      __('to let you create the best possible websites.', 'hueman' )
                  );
                  printf('<p>%1$s : <a href="%2$s" title="%3$s" target="_blank">%3$s <i class="fas fa-external-link-alt" aria-hidden="true"></i></a>&nbsp;,<a href="%4$s" title="%5$s" target="_blank">%5$s <i class="fas fa-external-link-alt" aria-hidden="true"></i></a></p>',
                      __("If you need inspiration, you can visit our online demos", 'hueman'),
                      esc_url('https://wp-themes.com/hueman/'),
                      __('Hueman Demo 1', 'hueman'),
                      esc_url('demo-hueman.presscustomizr.com/'),
                      __('Hueman Demo 2', 'hueman')
                  );
                  printf( '<br/><br/><p>%1$s <a href="%2$s" target="_blank">%3$s <i class="fas fa-external-link-alt" aria-hidden="true"></i></a></p>',
                      __('To help you getting started with Hueman, we have published', 'hueman'),
                      esc_url('docs.presscustomizr.com/article/236-first-steps-with-the-hueman-wordpress-theme'),
                      __('a short guide here.', 'hueman')
                  );
              ?>
              <span class="fas fa-times close-note" title="Close"></span>
          </div>
        </div>
      <?php
    $html = ob_get_contents();
    if ($html) ob_end_clean();
    return apply_filters('hu_front_welcome_note_html', $html );
}


add_action( 'hu_ajax_dismiss_welcome_front', 'hu_dismiss_welcome_front' );
function hu_dismiss_welcome_front() {
    set_transient( 'hu_welcome_note_status', 'dismissed' , 60*60*24*365*20 );//20 years of peace
    wp_send_json_success( array( 'status_note' => 'dismissed' ) );
}
