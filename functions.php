<?php
if ( !defined( 'HU_MIN_PHP_VERSION' ) ) define ( 'HU_MIN_PHP_VERSION', 5.3 );
if ( !defined( 'HU_MIN_WP_VERSION' ) ) define ( 'HU_MIN_WP_VERSION', 4.6 );

if ( version_compare( phpversion(), HU_MIN_PHP_VERSION, '<' ) ) {
    add_action( 'admin_notices'             , 'hu_display_min_php_message' );
    return;
}
global $wp_version;
if ( version_compare( $wp_version, HU_MIN_WP_VERSION, '<' ) ) {
    add_action( 'admin_notices'             , 'hu_display_min_wp_message' );
    return;
}

function hu_display_min_php_message() {
    hu_display_min_requirement_notice( __( 'PHP', 'hueman' ), HU_MIN_PHP_VERSION );
}

function hu_display_min_wp_message() {
    hu_display_min_requirement_notice( __( 'WordPress', 'hueman' ), HU_MIN_WP_VERSION );
}


function hu_display_min_requirement_notice( $requires_what, $requires_what_version ) {
    $theme = wp_get_theme()->Name;
    printf( '<div class="error"><p>%1$s</p></div>',
        sprintf( __( 'The <strong>%1$s</strong> theme requires at least %2$s version %3$s', 'hueman' ),
            $theme,
            $requires_what,
            $requires_what_version
        )
    );
}


//Do not remove this
load_template( get_template_directory() . '/functions/init-core.php' );

/**
* The best and safest way to extend the Humean WordPress theme with your own custom code is to create a child theme.
* You can add temporary code snippets and hacks to the current functions.php file, but unlike with a child theme, they will be lost on upgrade.
*
* If you don't know what a child theme is, you really want to spend 5 minutes learning how to use child themes in WordPress, you won't regret it :) !
* https://codex.wordpress.org/Child_Themes
*
*/