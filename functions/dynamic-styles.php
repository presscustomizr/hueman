<?php
/* ------------------------------------------------------------------------- *
 *  Dynamic styles
/* ------------------------------------------------------------------------- */

/*  Convert hexadecimal to rgb
/* ------------------------------------ */
if ( ! function_exists( 'hu_hex2rgb' ) ) {

  function hu_hex2rgb( $hex, $array=false ) {
    $hex = str_replace("#", "", $hex);

    if ( strlen($hex) == 3 ) {
      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
    } else {
      $r = hexdec(substr($hex,0,2));
      $g = hexdec(substr($hex,2,2));
      $b = hexdec(substr($hex,4,2));
    }

    $rgb = array( $r, $g, $b );
    if ( !$array ) { $rgb = implode(",", $rgb); }
    return $rgb;
  }

}


/*  Google fonts
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_gfont_head_link' ) ) {
  //@return void()
  //hook : 'wp_head'
  function hu_print_gfont_head_link () {
    if ( ! hu_is_checked('dynamic-styles') )
      return;

    $user_font     = hu_get_option( 'font' );
    $gfamily       = hu_get_fonts( array( 'font_id' => $user_font, 'request' => 'src' ) );//'Source+Sans+Pro:400,300italic,300,400italic,600&subset=latin,latin-ext',
    //bail here if self hosted font (titilium) of web font
    if ( ( empty( $gfamily ) || ! is_string( $gfamily ) ) )
      return;

    printf( '<link id="hu-user-gfont" href="//fonts.googleapis.com/css?family=%1$s" rel="stylesheet" type="text/css">', $gfamily );
  }

}
add_action( 'wp_head', 'hu_print_gfont_head_link', 2 );


/*  Dynamic css output
/* ------------------------------------ */
if ( ! function_exists( 'hu_dynamic_css' ) ) {

  function hu_dynamic_css() {
    if ( ! hu_is_checked('dynamic-styles') )
      return;
      // rgb values
      $color_1 = hu_get_option('color-1');
      $color_1_rgb = hu_hex2rgb($color_1);

      $glue    = hu_is_checked('minified-css') ? '' : "\n";

      //start computing style
      $styles   = array();

      // google / web fonts style
      $user_font    = hu_get_option( 'font' );
      $user_font_size = hu_get_option( 'body-font-size' );
      $user_font_size = is_numeric( $user_font_size ) ? $user_font_size : '16';
      //turn into rem
      $remsize      = $user_font_size / 16;
      $remsize      = number_format( (float)$remsize, 2, '.', '');
      $family       = hu_get_fonts( array( 'font_id' => $user_font, 'request' => 'family' ) );//'"Raleway", Arial, sans-serif'
      if ( ! empty( $family ) && is_string( $family ) ) {
          $styles[]     = sprintf('body { font-family:%1$s;font-size:%2$srem }', $family, $remsize );
      } else {
          $styles[]     = sprintf('body { font-size:%1$srem; }', $remsize );
      }

      //specific font size for menu items, also customized live
      $styles[] = '@media only screen and (min-width: 720px) {
        .nav > li { font-size:' . $remsize .'rem; }
      }';
      //sprintf('@media only screen and (min-width: 720px) { .nav > li { font-size:%1$srem; } }', $remsize );

      // container width
      if ( hu_get_option('container-width') != '1380' ) {
          if ( hu_is_checked( 'boxed' ) ) {
              $styles[] = '.boxed #wrapper, .container-inner { max-width: '.hu_get_option('container-width').'px; }';
          }
          else {
              $styles[] = '.container-inner { max-width: '.hu_get_option('container-width').'px; }';
          }
      }

      // sidebar padding
      if ( hu_get_option('sidebar-padding') != '30' ) {
          $styles[]  = '.sidebar .widget { padding-left: '.hu_get_option('sidebar-padding').'px; padding-right: '.hu_get_option('sidebar-padding').'px; padding-top: '.hu_get_option('sidebar-padding').'px; }';
      }
      // primary color
      if ( hu_get_option('color-1') != '#3b8dbd' ) {
        $styles[]  = '::selection { background-color: '.hu_get_option('color-1').'; }
::-moz-selection { background-color: '.hu_get_option('color-1').'; }';

        $_primary_color_color_prop_selectors = array(
          'a',
          '.themeform label .required',
          '#flexslider-featured .flex-direction-nav .flex-next:hover',
          '#flexslider-featured .flex-direction-nav .flex-prev:hover',
          '.post-hover:hover .post-title a',
          '.post-title a:hover',
          '.s1 .post-nav li a:hover i',
          '.content .post-nav li a:hover i',
          '.post-related a:hover',
          '.s1 .widget_rss ul li a',
          '#footer .widget_rss ul li a',
          '.s1 .widget_calendar a',
          '#footer .widget_calendar a',
          '.s1 .alx-tab .tab-item-category a',
          '.s1 .alx-posts .post-item-category a',
          '.s1 .alx-tab li:hover .tab-item-title a',
          '.s1 .alx-tab li:hover .tab-item-comment a',
          '.s1 .alx-posts li:hover .post-item-title a',
          '#footer .alx-tab .tab-item-category a',
          '#footer .alx-posts .post-item-category a',
          '#footer .alx-tab li:hover .tab-item-title a',
          '#footer .alx-tab li:hover .tab-item-comment a',
          '#footer .alx-posts li:hover .post-item-title a',
          '.comment-tabs li.active a',
          '.comment-awaiting-moderation',
          '.child-menu a:hover',
          '.child-menu .current_page_item > a',
          '.wp-pagenavi a'
        );

        $_primary_color_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_primary_color_color_prop_selectors', $_primary_color_color_prop_selectors ) );
        $styles[] = $_primary_color_color_prop_selectors ? $_primary_color_color_prop_selectors . '{ color: '.hu_get_option('color-1').'; }'."{$glue}" : '';

        $_primary_color_background_color_prop_selectors = array(
          '.themeform input[type="submit"]',
          '.themeform button[type="submit"]',
          '.s1 .sidebar-top',
          '.s1 .sidebar-toggle',
          '#flexslider-featured .flex-control-nav li a.flex-active',
          '.post-tags a:hover',
          '.s1 .widget_calendar caption',
          '#footer .widget_calendar caption',
          '.author-bio .bio-avatar:after',
          '.commentlist li.bypostauthor > .comment-body:after',
          '.commentlist li.comment-author-admin > .comment-body:after'
        );

        $_primary_color_background_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_primary_color_background_color_prop_selectors', $_primary_color_background_color_prop_selectors ) );
        $styles[] = $_primary_color_background_color_prop_selectors ? $_primary_color_background_color_prop_selectors . '{ background-color: '.hu_get_option('color-1').'; }'."{$glue}" : '';

        $styles[] ='.post-format .format-container { border-color: '.hu_get_option('color-1').'; }';

        $_primary_color_border_bottom_color_prop_selectors = array(
          '.s1 .alx-tabs-nav li.active a',
          '#footer .alx-tabs-nav li.active a',
          '.comment-tabs li.active a',
          '.wp-pagenavi a:hover',
          '.wp-pagenavi a:active',
          '.wp-pagenavi span.current'
        );

        $_primary_color_border_bottom_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_primary_color_border_bottom_color_prop_selectors', $_primary_color_border_bottom_color_prop_selectors ) );
        $styles[] = $_primary_color_border_bottom_color_prop_selectors ? $_primary_color_border_bottom_color_prop_selectors . '{ border-bottom-color: '.hu_get_option('color-1').'!important; }'."{$glue}" : '';

      }//end primary color

      // secondary color
      if ( hu_get_option('color-2') != '#82b965' ) {
        $styles[] = '.s2 .post-nav li a:hover i,
.s2 .widget_rss ul li a,
.s2 .widget_calendar a,
.s2 .alx-tab .tab-item-category a,
.s2 .alx-posts .post-item-category a,
.s2 .alx-tab li:hover .tab-item-title a,
.s2 .alx-tab li:hover .tab-item-comment a,
.s2 .alx-posts li:hover .post-item-title a { color: '.hu_get_option('color-2').'; }
';
      $_secondary_color_background_color_prop_selectors = array(
        '.s2 .sidebar-top',
        '.s2 .sidebar-toggle',
        '.post-comments',
        '.jp-play-bar',
        '.jp-volume-bar-value',
        '.s2 .widget_calendar caption'
    );

    $_secondary_color_background_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_secondary_color_background_color_prop_selectors', $_secondary_color_background_color_prop_selectors ) );
    $styles[] = $_secondary_color_background_color_prop_selectors ? $_secondary_color_background_color_prop_selectors . '{ background-color: '.hu_get_option('color-2').'; }'."{$glue}" : '';

    $styles[] ='.s2 .alx-tabs-nav li.active a { border-bottom-color: '.hu_get_option('color-2').'; }
.post-comments span:before { border-right-color: '.hu_get_option('color-2').'; }
        ';
      }
      // topbar color
      if ( hu_get_option('color-topbar') != '#26272b' ) {
        $styles[] = '.search-expand,
#nav-topbar.nav-container { background-color: '.hu_get_option('color-topbar').'; }
@media only screen and (min-width: 720px) {
  #nav-topbar .nav ul { background-color: '.hu_get_option('color-topbar').'; }
}
        ';
      }
      // header color
      if ( hu_get_option('color-header') != '#33363b' ) {
        $styles[] = '#header { background-color: '.hu_get_option('color-header').'; }
@media only screen and (min-width: 720px) {
  #nav-header .nav ul { background-color: '.hu_get_option('color-header').'; }
}
        ';
      }
      // header menu color
      if ( hu_get_option('color-header-menu') != '' ) {
        $styles[] = '#nav-header.nav-container { background-color: '.hu_get_option('color-header-menu').'; }
@media only screen and (min-width: 720px) {
  #nav-header .nav ul { background-color: '.hu_get_option('color-header-menu').'; }
}
        ';
      }
      // footer color
      if ( hu_get_option('color-footer') != '#33363b' ) {
        $styles[] = '#footer-bottom { background-color: '.hu_get_option('color-footer').'; }';
      }
      // header logo max-height
      if ( hu_get_option('logo-max-height') != '60' ) {
        $styles[] = '.site-title a img { max-height: '.hu_get_option('logo-max-height').'px; }';
      }
      // image border radius
      if ( hu_get_option('image-border-radius') != '0' ) {
        $styles[] = 'img { -webkit-border-radius: '.hu_get_option('image-border-radius').'px; border-radius: '.hu_get_option('image-border-radius').'px; }';
      }
      // // body background (old)
      // if ( hu_get_option('body-background') != '#eaeaea' ) {
      //  $styles .= 'body { background-color: '.hu_get_option('body-background').'; }';
      // }

      // body background (@fromfull) => keep on wp.org
      $body_bg = hu_get_option('body-background');
      if ( ! empty( $body_bg ) ) {
        //for users of wp.org version prior to 3.0+, this option is an hex color string.
        if ( is_string($body_bg) ) {
          $styles[] = 'body { background-color: ' . $body_bg . '; }';
        } elseif ( is_array($body_bg) ) {
          //set-up sub-options
          foreach ( array( 'color', 'image', 'attachment', 'position', 'size', 'repeat' ) as $prop ) {
            $body_bg[ "background-{$prop}" ] = isset( $body_bg[ "background-{$prop}" ] ) ? $body_bg[ "background-{$prop}" ] : '';
          }
          //background_image retrieve src
          $body_bg[ 'background-image' ]   = hu_get_img_src( $body_bg[ 'background-image' ] );

          $body_bg_style                   = '';

          //set-up style
          if ( $body_bg[ 'background-image' ]  ) {
            $body_bg_style  = 'background: '.$body_bg['background-color'].' url('.$body_bg['background-image'].') '.$body_bg['background-repeat'].' '.$body_bg['background-position']. ';';
            $body_bg_style .= 'background-attachment:'.$body_bg[ 'background-attachment' ].';';
            if ( $body_bg[ 'background-size' ] )
              $body_bg_style .=  'background-size: '.$body_bg['background-size'].';';
            $styles[] = 'body {'. $body_bg_style . "}\n";
          }
          elseif ( $body_bg['background-color'] ) {
            $styles[] = 'body { background-color: '.$body_bg['background-color'].'; }';
          }
        }
      }
      // end computing

      if ( empty ( $styles ) )
        return;

      // start output
      $_p_styles   = array( '<style type="text/css">' );
      $_p_styles[] = '/* Dynamic CSS: For no styles in head, copy and put the css below in your child theme\'s style.css, disable dynamic styles */';
      $_p_styles[] = implode( "{$glue}", $styles );
      $_p_styles[] = '</style>'."\n";
      //end output;

      //print
      echo implode( "{$glue}", $_p_styles );
    }

}
add_action( 'wp_head', 'hu_dynamic_css', 100 );