<?php
/* Featured Pages prototype testing functions */

/* Customizer panel/sections/settings */
add_filter( 'hu_add_panel_map' , 'hu_fp_popul_panels_map', 20 );
function hu_fp_popul_panels_map( $panels_map ) {
      return array_merge( $panels_map, array(
        'hu-fp-panel' => array(
            'priority'       => 40,
            'capability'     => 'edit_theme_options',
            'title'          => __( 'Featured Pages' , 'hueman' ),
            'description'    => __( 'Featured Pages Prototype for the Hueman theme.' , 'hueman' )
        )
      ));
}

add_filter( 'hu_add_section_map' , 'hu_fp_prototype_popul_section_map' );
function hu_fp_prototype_popul_section_map( $_sections ) {

      return array_merge( $_sections, array(
        'fp_prototype_sec'         => array(
              'title'    => __( 'Featured Pages Prototype', 'hueman' ),
              'priority' => 30,
              'panel'   => 'hu-fp-panel'
        )
      ));
}

add_filter( 'hu_add_setting_control_map', 'hu_popul_setting_control_fp_map', 20, 2);
function hu_popul_setting_control_fp_map( $_map, $get_default = null ) {
      $_section_map = call_user_func_array('hu_fp_prototype_sec', array($get_default) );
      return array_merge( $_map, $_section_map );
}

function hu_fp_prototype_sec( $get_default = null ){
      return array(
        'fp-prototype' => array(
              'default'      => array(),//empty array by default
              'control'      => 'HU_Customize_Modules',
              'label'        => __('Create and organize your Featured Pages', 'hueman'),
              'section'      => 'fp_prototype_sec',
              'type'         => 'czr_module',
              'module_type' => 'czr_fp_module',
              'priority'     => 10
        )
      );
}
/* end Customizer panel/section/settings */


//Allow fp option as array
add_filter( 'hu_get_skope_excluded_options', 'hu_exclude_fp_option' );
function hu_exclude_fp_option( $_excluded ) {
      return array_merge( $_excluded, array('fp-prototype') );
}

//Add czr templates
if ( hu_is_customize_left_panel() ) {
   //Print modules and inputs templates
   hu_load_fp_tmpl();
}

function hu_load_fp_tmpl() {
      $_tmpl = array(
        'tmpl/modules/fp-module-tmpl.php',
      );
      foreach ($_tmpl as $_path) {
        load_template( get_template_directory() . '/functions/czr/fp-prototype/' . $_path );
      }
}


if ( is_admin() ) {
      //load ajax content picker
      load_template( get_template_directory() . '/functions/czr/fp-prototype/czr-content_picker-ajax_actions.php');
      new HU_customize_ajax_content_picker_actions();

      //load ajax fp
      load_template( get_template_directory() . '/functions/czr/fp-prototype/czr-fp-ajax_actions.php');
      new HU_customize_ajax_fp_actions();
}

//Add content picker nonce to the server control params
add_filter( 'hu_js_customizer_control_params', 'hu_add_cp_nonce');
function hu_add_cp_nonce( $params ) {
      return array_merge( $params, array(
        'CZRCpNonce' => wp_create_nonce( 'czr-content-picker-nonce' ),
        'CZRFPNonce' => wp_create_nonce( 'czr-featured-pages-nonce' )
      ));
}


//Add image uploader button_labels and other useful translated strings
add_filter( 'controls_translated_strings', 'hu_add_translated_strings');
function hu_add_translated_strings( $strings) {
      return array_merge( $strings, array(
              'featuredPageAdded'   => __('New Featured Page created ! Scroll down to edit it.', 'hueman'),
              'featuredPageTitle'   => __( 'Featured Page', 'hueman'),
              'featuredPageImgReset' => __( 'Set to the post featured image'),
              'featuredPageResetErr' => __( 'Sorry this post has no featured image' ),
              'featuredPageResetSucc'=> __( 'Featured image found, updating ..' )
      ));
}


//DUMMY FEATURED PAGES RENDERING
add_action( '__after_header', 'dummy_featured_pages' );
function dummy_featured_pages() {
      $fps = hu_get_option('fp-prototype');
      if ( empty($fps) ) return;
      $fp_n = count($fps);
      ?>
      <div class="fps group" style="margin-bottom:100px;clear:both;">
        <div class="fps-inner">
          <?php
            foreach( $fps as $fp_i => $fp ) {
              if ( ! is_array( $fp['fp-post'] ) )
                continue;
              if ( empty( $fp['fp-text'] ) ) {
                $_post    = get_post($fp['fp-post'][0]['id']);
                $_excerpt = wp_trim_words( apply_filters('the_excerpt',  $_post -> post_content ) );
              }else
                $_excerpt = $fp['fp-text'];

              printf( '<div class="fp" style="width:%1$s%%;box-sizing:border-box;padding:10px;float:left">%5$s
                <h1>%2$s</h1><p>%3$s</p><a href="%4$s">%2$s</a></div>',
                100/$fp_n,
                $fp['fp-title'],
                $_excerpt,
                get_permalink( $fp['fp-post'][0]['id'] ),
                ! empty ($fp['fp-image']) ? wp_get_attachment_image( $fp['fp-image'] ) : get_the_post_thumbnail($fp['fp-post'][0]['id'])
              );
            }
          ?>
        </div>
      </div>
      <?php
}
