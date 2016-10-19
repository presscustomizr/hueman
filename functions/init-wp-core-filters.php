<?php
/* ------------------------------------------------------------------------- *
 *  WP Core Filters
/* ------------------------------------------------------------------------- */
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
    require_once( ABSPATH . WPINC . '/class-oembed.php' );
    $wp_oembed = _wp_oembed_get_object();
    $provider = $wp_oembed -> get_provider( $url, $args = '' );
    if ( ! $provider || false === $data = $wp_oembed->fetch( $provider, $url, $args ) ) {
      return $html;
    }
    $type = $data -> type;
    switch( $type ) {
        case 'video' :
          $html = sprintf('<div class="video-container">%1$s</div>', $html );
        break;
    }
    return $html;
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