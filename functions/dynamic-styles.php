<?php
/* ------------------------------------------------------------------------- *
 *  Dynamic styles
/* ------------------------------------------------------------------------- */

/*  Convert hexadecimal to rgb
/* ------------------------------------ */
if ( ! function_exists( 'hu_hex2rgb' ) ) {

  function hu_hex2rgb( $hex, $array = false ) {
    // skip if already rgb
    if ( hu_is_rgb_color($hex) )
      return $hex;

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

// @return bool
function hu_is_rgb_color( $color = '' ) {
  return is_string( $color ) && false !== strpos($color, 'rgb');
}

/*  Google fonts
/* ------------------------------------ */
if ( ! function_exists( 'hu_print_gfont_head_link' ) ) {
  //@return void()
  //hook : 'wp_head'
  function hu_print_gfont_head_link () {
    $user_font     = hu_get_option( 'font' );
    $gfamily       = hu_get_fonts( array( 'font_id' => $user_font, 'request' => 'src' ) );//'Source+Sans+Pro:400,300italic,300,400italic,600&subset=latin,latin-ext',
    //bail here if self hosted font (titilium) of web font
    if ( ( empty( $gfamily ) || ! is_string( $gfamily ) ) )
      return;

    printf( '<link id="hu-user-gfont" href="//fonts.googleapis.com/css?family=%1$s" rel="stylesheet" type="text/css">', $gfamily );
  }

}
add_action( 'wp_head', 'hu_print_gfont_head_link', 2 );


// Write user option inline style
// @see wp_add_inline_style( 'hueman-main-style', apply_filters( 'ha_user_options_style' , '' ) );
// tThis hook is also used in hueman pro for the user options rules of the slider style for example
add_filter( 'ha_user_options_style', 'hu_get_user_defined_inline_css_rules');

/*  Dynamic css output
/* ------------------------------------ */
if ( ! function_exists( 'hu_get_user_defined_inline_css_rules' ) ) {
  //@return string
  //hook : ha_user_options_style
  function hu_get_user_defined_inline_css_rules() {
      // rgb values
      // $color_1 = hu_get_option('color-1');
      // $color_1_rgb = hu_hex2rgb($color_1);

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
      $container_width = hu_get_option('container-width');
      if ( $container_width != '1380' ) {
          if ( hu_is_checked( 'boxed' ) ) {
              $styles[] = '.boxed #wrapper, .container-inner { max-width: '.$container_width.'px; }';
              $styles[] = '@media only screen and (min-width: 720px) {
                .boxed .desktop-sticky {
                  width: ' . $container_width .'px;
                }
              }';
          }
          else {
              $styles[] = '.container-inner { max-width: '.$container_width.'px; }';
          }
      }

      // sidebar padding
      $sb_pad = hu_get_option('sidebar-padding');
      if ( $sb_pad != '30' ) {
          $styles[]  = '.sidebar .widget { padding-left: '.$sb_pad.'px; padding-right: '.$sb_pad.'px; padding-top: '.$sb_pad.'px; }';
      }


      // primary color
      $prim_color = maybe_hash_hex_color( hu_get_option('color-1') );
      //$def_prim_col = hu_user_started_before_version( '3.3.8' ) ? '#3b8dbd' : '#16cfc1';
      if ( $prim_color != '#16cfc1' ) {
          $styles = array_merge( $styles, hu_get_primary_color_style() );
      }


      $second_color = maybe_hash_hex_color( hu_get_option('color-2') );
      //$def_second_col = hu_user_started_before_version( '3.3.8' ) ? '#82b965' : '#efb93f';
      // secondary color
      if ( $second_color != '#efb93f' ) {
          $styles = array_merge( $styles, hu_get_second_color_style() );
      }

      // what is the transparency setting to be applied to both topbar and mobile menu on scroll ?
      $is_transparent = hu_is_checked( 'transparent-fixed-topnav' );

      // Background color are important ?
      // implemented for https://github.com/presscustomizr/hueman-pro-addons/issues/181
      $header_bg_colors_important = hu_is_checked( 'user-header-bg-color-important' ) ? '!important' : '';

      // topbar color
      // The default background is #121d30  / semi transparent because hu_is_checked( 'transparent-fixed-topnav' ) : rgba(18, 29, 48, 0.8)
      // those default css rules are hard coded in the theme main stylesheed.
      // If user settings are different, let's write a custom rule
      $tb_color = maybe_hash_hex_color( hu_get_option('color-topbar') );
      $is_transparent = hu_is_checked( 'transparent-fixed-topnav' );

      //$def_tb_col = hu_user_started_before_version( '3.3.8' ) ? '#26272b' : '#121d30';
      if ( $tb_color != '#121d30' || ! $is_transparent ) {
          if ( $tb_color != '#121d30' ) {
              $styles[] = '.search-expand,
              #nav-topbar.nav-container { background-color: '.$tb_color.$header_bg_colors_important.'}';
              $styles[] = '@media only screen and (min-width: 720px) {
                #nav-topbar .nav ul { background-color: '.$tb_color.$header_bg_colors_important.'; }
              }';
          }
          if ( $is_transparent && !hu_is_rgb_color($tb_color) ) {
              $sticky_color_rgba = 'rgba(' . hu_hex2rgb( $tb_color ) . ',0.90)';
              $sticky_color_rgba_dark = 'rgba(' . hu_hex2rgb( $tb_color ) . ',0.95)';

              $styles[] = '.is-scrolled #header .nav-container.desktop-sticky,
              .is-scrolled #header .search-expand { background-color: '.$tb_color.$header_bg_colors_important.'; background-color: '.$sticky_color_rgba.$header_bg_colors_important.' }';
              $styles[] = '.is-scrolled .topbar-transparent #nav-topbar.desktop-sticky .nav ul { background-color: '.$tb_color.$header_bg_colors_important.'; background-color: '.$sticky_color_rgba_dark.$header_bg_colors_important.' }';
          }
      }

      // header color
      $h_color = maybe_hash_hex_color( hu_get_option('color-header') );
      //$def_h_col = hu_user_started_before_version( '3.3.8' ) ? '#33363b' : '#454e5c';
      if ( $h_color != '#454e5c' ) {
        $styles[] = '#header { background-color: '.$h_color.'; }
@media only screen and (min-width: 720px) {
  #nav-header .nav ul { background-color: '.$h_color.'; }
}
        ';
      }


      // Mobile menu color
      $mm_color = maybe_hash_hex_color( hu_get_option('color-mobile-menu') );
      if ( $mm_color != '#454e5c' ) {
        $styles[] = '#header #nav-mobile { background-color: '.$mm_color.$header_bg_colors_important.'; }';
      }
      if ( $is_transparent && !hu_is_rgb_color($mm_color) ) {
          $mm_color_rgba = 'rgba(' . hu_hex2rgb( $mm_color ) . ',0.90)';
          //$mm_color_rgba_dark = 'rgba(' . hu_hex2rgb( $mm_color ) . ',0.95)';

          $styles[] = '.is-scrolled #header #nav-mobile { background-color: '.$mm_color.$header_bg_colors_important.'; background-color: '.$mm_color_rgba.$header_bg_colors_important.' }';
          //$styles[] = '.is-scrolled .topbar-transparent #nav-topbar.desktop-sticky .nav ul { background-color: '.$tb_color.'; background-color: '.$mm_color_rgba_dark.' }';
      }


      // header menu color
      $hm_color = maybe_hash_hex_color( hu_get_option('color-header-menu') );
      //$def_hm_col = hu_user_started_before_version( '3.3.8' ) ? '#33363b' : '#454e5c';
      if ( $hm_color != '#454e5c' ) {
        $styles[] = '#nav-header.nav-container, #main-header-search .search-expand { background-color: '.$hm_color.'; }
@media only screen and (min-width: 720px) {
  #nav-header .nav ul { background-color: '.$hm_color.'; }
}
        ';
      }


      // footer color
      if ( maybe_hash_hex_color( hu_get_option('color-footer') ) != '#33363b' ) {
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

      // sidebars background
      $sidebars_bg = maybe_hash_hex_color( hu_get_option('sidebar-background') );
      if ( '#f0f0f0' !== $sidebars_bg ) {
        $styles[] = '.sidebar.expanding, .sidebar.collapsing, .sidebar .sidebar-content, .sidebar .sidebar-toggle, .container-inner > .main::before,.container-inner > .main::after { background-color: '.$sidebars_bg.'; }';
        $styles[] = '@media only screen and (min-width: 480px) and (max-width: 1200px) { .s2.expanded { background-color: '.$sidebars_bg.'; } }';
        $styles[] = '@media only screen and (min-width: 480px) and (max-width: 960px) { .s1.expanded { background-color: '.$sidebars_bg.'; } }';
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
        return '';

      $_p_styles[] = implode( "{$glue}", $styles );

      return implode( "{$glue}", $_p_styles );
    }

}



/* ------------------------------------------------------------------------- *
 *  Dynamic styles Helpers
/* ------------------------------------------------------------------------- */
function hu_get_primary_color_style() {
      $glue    = hu_is_checked('minified-css') ? '' : "\n";
      $styles = array();
      $prim_color = hu_get_option('color-1');
      $styles[]  = '::selection { background-color: '.$prim_color.'; }
::-moz-selection { background-color: '.$prim_color.'; }';

      $_primary_color_color_prop_selectors = array(
          'a',
          'a+span.hu-external::after',
          '.themeform label .required',
          '#flexslider-featured .flex-direction-nav .flex-next:hover',
          '#flexslider-featured .flex-direction-nav .flex-prev:hover',
          '.post-hover:hover .post-title a',
          '.post-title a:hover',
          '.sidebar.s1 .post-nav li a:hover i',
          '.content .post-nav li a:hover i',
          '.post-related a:hover',
          '.sidebar.s1 .widget_rss ul li a',
          '#footer .widget_rss ul li a',
          '.sidebar.s1 .widget_calendar a',
          '#footer .widget_calendar a',
          '.sidebar.s1 .alx-tab .tab-item-category a',
          '.sidebar.s1 .alx-posts .post-item-category a',
          '.sidebar.s1 .alx-tab li:hover .tab-item-title a',
          '.sidebar.s1 .alx-tab li:hover .tab-item-comment a',
          '.sidebar.s1 .alx-posts li:hover .post-item-title a',
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
      $styles[] = $_primary_color_color_prop_selectors ? $_primary_color_color_prop_selectors . '{ color: '.$prim_color.'; }'."{$glue}" : '';

      $_primary_color_background_color_prop_selectors = array(
          '.themeform input[type="submit"]',
          '.themeform button[type="submit"]',
          '.sidebar.s1 .sidebar-top',
          '.sidebar.s1 .sidebar-toggle',
          '#flexslider-featured .flex-control-nav li a.flex-active',
          '.post-tags a:hover',
          '.sidebar.s1 .widget_calendar caption',
          '#footer .widget_calendar caption',
          '.author-bio .bio-avatar:after',
          '.commentlist li.bypostauthor > .comment-body:after',
          '.commentlist li.comment-author-admin > .comment-body:after'
      );

      $_primary_color_background_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_primary_color_background_color_prop_selectors', $_primary_color_background_color_prop_selectors ) );
      $styles[] = $_primary_color_background_color_prop_selectors ? $_primary_color_background_color_prop_selectors . '{ background-color: '.$prim_color.'; }'."{$glue}" : '';

      $styles[] ='.post-format .format-container { border-color: '.$prim_color.'; }';

      $_primary_color_border_bottom_color_prop_selectors = array(
          '.sidebar.s1 .alx-tabs-nav li.active a',
          '#footer .alx-tabs-nav li.active a',
          '.comment-tabs li.active a',
          '.wp-pagenavi a:hover',
          '.wp-pagenavi a:active',
          '.wp-pagenavi span.current'
      );

      $_primary_color_border_bottom_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_primary_color_border_bottom_color_prop_selectors', $_primary_color_border_bottom_color_prop_selectors ) );
      $styles[] = $_primary_color_border_bottom_color_prop_selectors ? $_primary_color_border_bottom_color_prop_selectors . '{ border-bottom-color: '.$prim_color.'!important; }'."{$glue}" : '';

      return $styles;
}//hu_get_primary_color_style


function hu_get_second_color_style() {
    $glue    = hu_is_checked('minified-css') ? '' : "\n";
    $styles = array();
    $styles[] = '.sidebar.s2 .post-nav li a:hover i,
.sidebar.s2 .widget_rss ul li a,
.sidebar.s2 .widget_calendar a,
.sidebar.s2 .alx-tab .tab-item-category a,
.sidebar.s2 .alx-posts .post-item-category a,
.sidebar.s2 .alx-tab li:hover .tab-item-title a,
.sidebar.s2 .alx-tab li:hover .tab-item-comment a,
.sidebar.s2 .alx-posts li:hover .post-item-title a { color: '.hu_get_option('color-2').'; }
';
    $_secondary_color_background_color_prop_selectors = array(
      '.sidebar.s2 .sidebar-top',
      '.sidebar.s2 .sidebar-toggle',
      '.post-comments',
      '.jp-play-bar',
      '.jp-volume-bar-value',
      '.sidebar.s2 .widget_calendar caption'
  );

  $_secondary_color_background_color_prop_selectors = implode( ",{$glue}", apply_filters( 'hu_dynamic_secondary_color_background_color_prop_selectors', $_secondary_color_background_color_prop_selectors ) );
  $styles[] = $_secondary_color_background_color_prop_selectors ? $_secondary_color_background_color_prop_selectors . '{ background-color: '.hu_get_option('color-2').'; }'."{$glue}" : '';

  $styles[] ='.sidebar.s2 .alx-tabs-nav li.active a { border-bottom-color: '.hu_get_option('color-2').'; }
.post-comments::before { border-right-color: '.hu_get_option('color-2').'; }
      ';
    return $styles;
}//hu_get_second_color_style