<?php
function hu_register_body_bg_module( $args ) {
    $defaults = array(
        'setting_id' => '',

        'base_url_path' => '',//PC_AC_BASE_URL/inc/czr-modules/social-links/
        'version' => '',

        'option_value' => array(), //<= will be used for the dynamic registration

        'setting' => array(),
        'control' => array(),
        'section' => array(), //array( 'id' => '', 'label' => '' ),

        'sanitize_callback' => '',
        'validate_callback' => ''
    );
    $args = wp_parse_args( $args, $defaults );

    if ( ! isset( $GLOBALS['czr_base_fmk_namespace'] ) ) {
        error_log( __FUNCTION__ . ' => global czr_base_fmk not set' );
        return;
    }

    $czrnamespace = $GLOBALS['czr_base_fmk_namespace'];
    //czr_fn\czr_register_dynamic_module
    $CZR_Fmk_Base_fn = $czrnamespace . 'CZR_Fmk_Base';
    if ( ! function_exists( $CZR_Fmk_Base_fn) ) {
        error_log( __FUNCTION__ . ' => Namespace problem => ' . $CZR_Fmk_Base_fn );
        return;
    }


    $CZR_Fmk_Base_fn() -> czr_pre_register_dynamic_setting( array(
        'setting_id' => $args['setting_id'],
        'module_type' => 'czr_background',
        'option_value' => ! is_array( $args['option_value'] ) ? array() : $args['option_value'],

        'setting' => $args['setting'],

        'section' => $args['section'],

        'control' => $args['control']
    ));

    // czr_fn\czr_register_dynamic_module()
    $CZR_Fmk_Base_fn() -> czr_pre_register_dynamic_module( array(
        'dynamic_registration' => true,
        'module_type' => 'czr_background',

        // 'sanitize_callback' => 'hu_sanitize_callback__czr_social_module',
        // 'validate_callback' => 'hu_validate_callback__czr_social_module',

        'customizer_assets' => array(
            'control_js' => array(
                // handle + params for wp_enqueue_script()
                // @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
                'czr-body-bg-module' => array(
                    'src' => sprintf(
                        '%1$s/assets/js/%2$s',
                        $args['base_url_path'],
                        '_3_2_body_background_module.js'
                    ),
                    'deps' => array('customize-controls' , 'jquery', 'underscore'),
                    'ver' => ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : $args['version'],
                    'in_footer' => true
                )
            ),
            'localized_control_js' => array(
                'deps' => 'czr-customizer-fmk',
                'global_var_name' => 'bodyBGModuleLocalized',
                'params' => array(
                    //background repeat select options
                    'bg_repeat_options' => array(
                        'no-repeat'      => __( 'No Repeat', 'hueman' ),
                        'repeat'         => __( 'Repeat All', 'hueman' ),
                        'repeat-x'       => __( 'Repeat Horizontally', 'hueman' ),
                        'repeat-y'       => __( 'Repeat Vertically', 'hueman' ),
                        'inherit'        => __( 'Inherit', 'hueman' ),
                    ),

                    //background attachment select options
                    'bg_attachment_options' => array(
                        'fixed'           => __( 'Fixed', 'hueman' ),
                        'scroll'          => __( 'Scroll', 'hueman' ),
                        'inherit'         => __( 'Inherit', 'hueman' ),
                    ),

                    //background position select options
                    'bg_position_options' => array(
                        'left top'        => __( 'Left Top', 'hueman' ),
                        'left center'     => __( 'Left Center', 'hueman' ),
                        'left bottom'     => __( 'Left Bottom', 'hueman' ),
                        'center top'      => __( 'Center Top', 'hueman' ),
                        'center center'   => __( 'Center Center', 'hueman' ),
                        'center bottom'   => __( 'Center Bottom', 'hueman' ),
                        'right top'       => __( 'Right Top', 'hueman' ),
                        'right center'    => __( 'Right Center', 'hueman' ),
                        'right bottom'    => __( 'Right Bottom', 'hueman' ),
                    )
                )
            )
        ),

        'tmpl' => array(
            'item-inputs' => array(
                'background-color'           => array(
                    'input_type'  => 'wp_color_alpha',
                    'title'       => __('Color', 'hueman'),
                    'default'     => '#eaeaea',
                    'width-100'   => true
                ),//"#000000",
                'background-image'  => array(
                    'input_type'  => 'upload',
                    'title'       => __('Background Image', 'hueman'),
                ),
                'background-repeat'  => array(
                    'input_type'  => 'select',
                    'title'       => __('Repeat', 'hueman'),
                ),
                'background-attachment'  => array(
                    'input_type'  => 'select',
                    'title'       => __('Background attachment', 'hueman'),
                ),
                'background-position'  => array(
                    'input_type'  => 'select',
                    'title'       => __('Background position', 'hueman'),
                ),
                'background-size'  => array(
                    'input_type'  => 'text',
                    'title'       => __('Background size', 'hueman'),
                    'notice_after'   => sprintf( '%1$s %2$s',
                        __('The background-size CSS property specifies the size of the background images. The size of the image can be fully constrained or only partially in order to preserve its intrinsic ratio.', 'hueman'),
                        sprintf(' %1$s %2$s.',
                            __('Learn more', 'hueman'),
                            sprintf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('developer.mozilla.org/en-US/docs/Web/CSS/background-size'), __('here', 'hueman') )
                        )
                    )
                )
            )
        )//tmpl
    ));
}//hu_register_body_bg_module()
