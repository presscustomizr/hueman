<?php
/* WFC Compatibility code */

/*
* Add theme localized selector titles
*/
add_filter( 'tc_default_selector_title_map', 'hu_wfc_selector_title' );
function hu_wfc_selector_title( $_list) {

  $_hu_list = array(
            'top_menu_items'          => __( 'Top-Menu items' , 'hueman' ),
            'marketing'               => __( 'Featured Pages', 'hueman' ),
            'single_post_title'       => __( 'Single Post titles' , 'hueman' ),
            'single_page_title'       => __( 'Single Page titles' , 'hueman' ),
            'post_content'            => __( 'Post content' , 'hueman' ),
            'post_excerpt'            => __( 'Post excerpt' , 'hueman' ),
            'post_lists'              => __( 'Lists in post/pages' , 'hueman' ),
            'single_category_meta'    => __( 'Single Post Categories meta' , 'hueman' ),
            'single_tag'              => __( 'Single Post tags' , 'hueman' ),
            'archive_type_titles'     => __( 'Archive Type Title' , 'hueman' ),
            'postlist_post_metas'     => __( 'Post list post metas' , 'hueman' ),
            'postlist_category_meta'  => __( 'Post list category meta' , 'hueman' ),
            'single_tags'             => __( 'Single post tags' , 'hueman' ),
            'comment_meta'            => __( 'Comments metas' , 'hueman' ),
            'sidebars_social_links'   => __( 'Sidebar Social Links' , 'hueman' ),
            'sidebars_top'            => __( 'Sidebar Top Boxes' , 'hueman' ),
            'footer_social_links'     => __( 'Footer Social Links', 'hueman' )
  );

  return array_merge( $_list, $_hu_list );
}

add_filter( 'tc_font_customizer_zone_map', 'hu_wfc_zone_map' );
function hu_wfc_zone_map( $zone_map ) {
  $_hu_zone_map = array(
    'marketing'     => array('full-layout'  , __( 'Featured pages' , 'hueman' ))
  );
  return array_merge( $zone_map, $_hu_zone_map ); 
}

/*
* Add self-hosted Font among the WFC WebSafe ones (maybe WFC should have a specific section?!)
*/
add_filter( 'tc_font_customizer_cfonts' , 'add_hu_fonts_to_list' );
function add_hu_fonts_to_list( $original_list ) {
  $_fonts = array(
      array( 'name' => 'Titillium,Arial,sans-serif' ,'subsets'=> array() ),
  );

  return array_merge( $_fonts , $original_list);
}


/*
* Add/Merge theme specific default selector properties
*/
add_filter('tc_selector_properties' , 'hu_selector_properties' );
function hu_selector_properties( $selector_properties ){
  $hu_selector_properties     = array(
              'zone'            => null,
              'selector'        => null,
              'not'             => null,
              'subset'          => null,
              'font-family'     => 'Titillium,Arial,sans-serif',
              'font-weight'     => 'normal',
              'font-style'      => null,
              'color'           => '#666',
              'color-hover'     => 'main',
              'font-size'       => "16px",
              'line-height'     => "1.5em",
              'text-align'      => 'inherit',
              'text-decoration' => 'none',
              'text-transform'  => 'none',
              'letter-spacing'  => 0,
              'static-effect'   => 'none',
              'icon'            => false,
              'important'       => false,
              'title'           => false //used for custom selectors
  );
  return array_merge( $selector_properties, $hu_selector_properties );
}
/*End WFC Compatibility */

/* FPU Compatibility code */
/*
* Custom CSS 
*/
add_action( 'fpu_enqueue_plug_resource_after', 'hu_fpu_enqueue_custom_css' );
function hu_fpu_enqueue_custom_css() {
  $_fpu_style = apply_filters( 'hu_fpu_custom_css', hu_fpu_custom_css() );
  wp_add_inline_style( 'fpu-front-style', $_fpu_style );
}

function hu_fpu_custom_css() {
  /* Hueman compatibility CSS */
  return '#wrapper > .fpc-marketing,
    header + .fpc-marketing {
      padding-bottom: 30px;
    }
    #wrapper > .fpc-marketing {
      margin-bottom: 0px;
    }
    #wrapper  header + .fpc-container.fpc-marketing {
      margin-top: -50px;
      margin-bottom: 60px;
    }
    .fpc-marketing + .featurette-divider.__after_header,
    .fpc-marketing + .featurette-divider.__before_header,
    .fpc-marketing + .featurette-divider.__before_footer {
      display: none;
    }';
  /* End Hueman compatibility CSS*/
}

/* Add fpu backward compatibility hook */
add_filter( 'tc_fpc_get_opt_tc_fp_position' , 'hu_set_fp_position_compatibility' );
function hu_set_fp_position_compatibility( $_option_value ) {

  if ( 'loop_start' == $_option_value && hu_is_checked('featured-posts-enabled') && is_home() ) {
    return '__before_featured';
  }
  return $_option_value;
}
/*End FPU Compatibility */