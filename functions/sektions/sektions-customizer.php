<?php

//add control class
add_action ( 'customize_register' , 'hu_load_sektions_control', 20, 1 );
function hu_load_sektions_control($manager) {
  $manager -> register_control_type( 'HU_Customize_Modules' );
}

add_action ( 'customize_register' , 'hu_register_sektions_partials' );
//hook : customize_register
function hu_register_sektions_partials( WP_Customize_Manager $wp_customize ) {

    // Abort if selective refresh is not available.
    if ( ! isset( $wp_customize->selective_refresh ) ) {
        return;
    }

    $wp_customize->selective_refresh->add_partial( 'sektions', array(
        'selector' => '#sektions-before-content',
        'settings' => array( 'hu_theme_options[sektions]' ),
        'render_callback' => 'hu_print_modified_sektions',
        //'type' => 'my_partial'
    ) );

    $wp_customize->selective_refresh->add_partial( 'module-collection', array(
        'selector' => '#sektions-before-content',
        'settings' => array( 'hu_theme_options[module-collection]' ),
        'render_callback' => 'hu_print_modified_modules',
        //'type' => 'my_partial'
    ) );
}


add_action( 'customize_controls_enqueue_scripts' ,  'hu_enqueue_sektion_scripts' );
function hu_enqueue_sektion_scripts() {
  wp_enqueue_script(
    'czr-dragula',
    get_template_directory_uri() .'/functions/sektions/assets/js/dragula.min.js',//'https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.1/dragula.min.js',
    array(),
    HUEMAN_VER,
    true
  );
  wp_enqueue_script(
    'czr-dragula-autoscroller-patch',
    get_template_directory_uri() .'/functions/sektions/assets/js/dom-autoscroller.min.js',
    array(),
    HUEMAN_VER,
    true
  );


  // wp_enqueue_style( 'test-jquery-ui-style', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css', array(), null, 'all' );
  // wp_enqueue_script( 'jquery-ui-core' );
  // wp_enqueue_script('jquery-ui-widget' );
  // wp_enqueue_script('jquery-ui-mouse');
  // wp_enqueue_script(
  //   'jquery-ui-resizable',
  //   null,
  //   array( 'jquery', 'jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-mouse')
  //   // HUEMAN_VER,
  //   // $media = 'all'
  // );
  // wp_enqueue_script(
  //   'jquery-ui-droppable',
  //   null,
  //   array( 'jquery', 'jquery-ui-core', 'jquery-ui-widget' )
  //   // HUEMAN_VER,
  //   // $media = 'all'
  // );
}

//add_action('customize_preview_init' , 'hu_print_dragula_css');