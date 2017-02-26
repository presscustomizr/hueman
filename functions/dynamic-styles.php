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
if ( ! function_exists( 'hu_google_fonts' ) ) {

  function hu_google_fonts () {
    if ( ! hu_is_checked('dynamic-styles') )
      return;

    if ( hu_get_option( 'font' ) == 'titillium-web-ext' ) { echo '<link href="//fonts.googleapis.com/css?family=Titillium+Web:400,400italic,300italic,300,600&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'droid-serif' ) { echo '<link href="//fonts.googleapis.com/css?family=Droid+Serif:400,400italic,700" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'source-sans-pro' ) { echo '<link href="//fonts.googleapis.com/css?family=Source+Sans+Pro:400,300italic,300,400italic,600&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'lato' ) { echo '<link href="//fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'raleway' ) { echo '<link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'ubuntu' ) { echo '<link href="//fonts.googleapis.com/css?family=Ubuntu:400,400italic,300italic,300,700&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'ubuntu-cyr' ) { echo '<link href="//fonts.googleapis.com/css?family=Ubuntu:400,400italic,300italic,300,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'roboto-condensed' ) { echo '<link href="//fonts.googleapis.com/css?family=Roboto+Condensed:400,300italic,300,400italic,700&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'roboto-condensed-cyr' ) { echo '<link href="//fonts.googleapis.com/css?family=Roboto+Condensed:400,300italic,300,400italic,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'roboto-slab' ) { echo '<link href="//fonts.googleapis.com/css?family=Roboto+Slab:400,300italic,300,400italic,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'roboto-slab-cyr' ) { echo '<link href="//fonts.googleapis.com/css?family=Roboto+Slab:400,300italic,300,400italic,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'playfair-display' ) { echo '<link href="//fonts.googleapis.com/css?family=Playfair+Display:400,400italic,700&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'playfair-display-cyr' ) { echo '<link href="//fonts.googleapis.com/css?family=Playfair+Display:400,400italic,700&subset=latin,cyrillic" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'open-sans' ) { echo '<link href="//fonts.googleapis.com/css?family=Open+Sans:400,400italic,300italic,300,600&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'open-sans-cyr' ) { echo '<link href="//fonts.googleapis.com/css?family=Open+Sans:400,400italic,300italic,300,600&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'pt-serif' ) { echo '<link href="//fonts.googleapis.com/css?family=PT+Serif:400,700,400italic&subset=latin,latin-ext" rel="stylesheet" type="text/css">'."\n"; }
    if ( hu_get_option( 'font' ) == 'pt-serif-cyr' ) { echo '<link href="//fonts.googleapis.com/css?family=PT+Serif:400,700,400italic&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">'."\n"; }
  }

}
add_action( 'wp_head', 'hu_google_fonts', 2 );


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
      // google fonts
      $google_font = hu_get_option( 'font' );

      switch ( $google_font ) {
        case 'titillium-web-ext'    : $styles[] = 'body { font-family: "Titillium Web", Arial, sans-serif; }';
                                      break;
        case 'droid-serif'          : $styles[] = 'body { font-family: "Droid Serif", serif; }';
                                      break;
        case 'source-sans-pro'      : $styles[] = 'body { font-family: "Source Sans Pro", Arial, sans-serif; }';
                                      break;
        case 'lato'                 : $styles[] = 'body { font-family: "Lato", Arial, sans-serif; }';
                                      break;
        case 'raleway'              : $styles[] = 'body { font-family: "Raleway", Arial, sans-serif; }';
                                      break;
        case 'ubunty'               :
        case 'ubuntu-cyr'           : $styles[] = 'body { font-family: "Ubuntu", Arial, sans-serif; }';
                                      break;
        case 'roboto-condensed'     :
        case 'roboto-condensed-cyr' : $styles[] = 'body { font-family: "Roboto Condensed", Arial, sans-serif; }';
                                      break;
        case 'roboto-slab'          :
        case 'roboto-slab-cyr'      : $styles[] = 'body { font-family: "Roboto Slab", Arial, sans-serif; }';
                                      break;
        case 'playfair-display'     :
        case 'playfair-display-cyr' : $styles[] = 'body { font-family: "Playfair Display", Arial, sans-serif; }';
                                      break;
        case 'open-sans'            :
        case 'open-sans-cyr'        : $styles[] = 'body { font-family: "Open Sans", Arial, sans-serif; }';
                                      break;
        case 'pt-serif'             :
        case 'pt-serif-cyr'         : $styles[] ='body { font-family: "PT Serif", serif; }';
                                      break;
        case 'arial'                : $styles[] = 'body { font-family: Arial, sans-serif; }';
                                      break;
        case 'georgia'              : $styles[] = 'body { font-family: Georgia, serif; }';
                                      break;
        case 'verdana'              : $styles[] = 'body { font-family: Verdana, sans-serif; }';
                                      break;
        case 'tahoma'               : $styles[] = 'body { font-family: Tahoma, sans-serif; }';
                                      break;
      }

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