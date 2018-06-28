<?php

//control scripts and style
//Note that the 'czr-theme-customizer-fmk' is loaded @priority 10
add_action( 'customize_controls_enqueue_scripts'        , 'hu_customize_controls_js_css', 20 );
//preview scripts
//set with priority 20 to be fired after hu_customize_store_db_opt in HU_utils
add_action( 'customize_preview_init'                    , 'hu_customize_preview_js', 20 );
//exports some wp_query informations. Updated on each preview refresh.
add_action( 'customize_preview_init'                    , 'hu_add_preview_footer_action', 20 );

//hook : customize_preview_init
function hu_customize_preview_js() {
    global $wp_version;

    wp_enqueue_script(
        'hu-preview-reactions',
        HU_BASE_URL . 'assets/czr/js/_customize_preview_reactions.js',//src
        'czr-customizer-preview',
        ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
        true//$in_footer = false
    );


    //localizes
    wp_localize_script(
        'czr-customizer-preview', // this is the handle of the base czr fmk
        'themeServerPreviewParams',
        apply_filters('hu_js_customizer_preview_params' ,
            array(
                'wpBuiltinSettings' => HU_customize::$instance -> hu_get_wp_builtin_settings(),
                'themeOptionsPrefix'  => HU_THEME_OPTIONS,
                'fonts' => array( 'src' => hu_get_fonts( array( 'all' => true, 'request' => 'src' ) ), 'family' => hu_get_fonts( array( 'all' => true, 'request' => 'family' ) ) ),

                'copyright' => sprintf('%1$s &copy; %2$s. %3$s',
                  get_bloginfo('name'),
                  date( 'Y' ),
                  __( 'All Rights Reserved.', 'hueman' )
                )
            )
        )
    );
}



/**
 * Add script to controls
 * Dependency : customize-controls located in wp-includes/script-loader.php
 * Hooked on customize_controls_enqueue_scripts located in wp-admin/customize.php
 * @package Hueman
 * @since Hueman 3.3.0
 */
function hu_customize_controls_js_css() {
    wp_enqueue_script(
        'hu-control-dependencies',
        HU_BASE_URL . 'assets/czr/js/_customize_control_dependencies_and_dom_ready_actions.js',//src
        'czr-theme-customizer-fmk',
        ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
        true//$in_footer = false
    );


    $_front_page_content_notice = esc_js( sprintf( __( "Jump to the %s.", 'hueman'),
        sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
          "javascript:wp.customize.section(\'content_blog_sec\').focus();",
          __('blog design panel', 'hueman')
        )
    ) );
    $_header_menu_notice = esc_js( sprintf( __( "The menu currently displayed in your header is a default page menu, you can disable it in the %s.", 'hueman'),
        sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
          "javascript:wp.customize.section(\'header_design_sec\').focus();",
          __('Header Panel', 'hueman')
        )
    ) );
    //localizes
    wp_localize_script(
        'czr-theme-customizer-fmk', // this is the handle of the base czr fmk
        'themeServerControlParams',
        apply_filters('czr_js_customizer_control_params' ,
          array(
              //should be included in all themes
              'wpBuiltinSettings' => HU_customize::$instance -> hu_get_wp_builtin_settings(),
              'isThemeSwitchOn' => ! (bool)HU_IS_PRO,
              'themeSettingList' => HU_utils::$_theme_setting_list,
              'themeOptions'  => HU_THEME_OPTIONS,
              'HUNonce'       => wp_create_nonce( 'hu-customizer-nonce' ),

              'themeName'     => THEMENAME,// <= do we need this ?

              //'optionAjaxAction' => HU_OPT_AJAX_ACTION,//DEPRECATED
              'faviconOptionName' => 'favicon',
              'i18n' => hu_get_czr_translated_strings(),

              // For the control dependencies js file
              'isMultisite' => is_multisite(),
              'frontPageContentNotice' => html_entity_decode( $_front_page_content_notice ),
              'headerMenuNotice' => html_entity_decode( $_header_menu_notice )


          )
        )
    );

}



//hook : customize_preview_init
function hu_add_preview_footer_action() {
    //Add the postMessages actions
    add_action( 'wp_footer', 'hu_add_customize_preview_data' , 20 );
}

//hook : wp_footer in the preview
function hu_add_customize_preview_data() {
    global $wp_query, $wp_customize;
    $current_obj  = get_queried_object();
    $query_data = array(
        'post_id'           => false,
        'post_thumbnail_id' => false,
        'post_title'        => false
    );
    //post, custom post types, page
    if ( is_singular() && ! hu_is_real_home() && isset($current_obj -> post_type) ) {
        $query_data['post_id'] = $current_obj -> ID;
        $query_data['post_title'] = $current_obj -> post_title;
        $query_data['post_thumbnail_id'] = has_post_thumbnail( $current_obj -> ID ) ? get_post_thumbnail_id( $current_obj -> ID ) :  false;
    }

    $_wp_query_infos = array(
        'conditional_tags' => array(),
        'query_data' => $query_data
    );
    $_available_locations = hu_get_available_widget_loc();

    //Populates the conditional tags
    foreach( (array)$wp_query as $prop => $val ) {
        if (  false === strpos($prop, 'is_') )
          continue;
        if ( 'is_home' == $prop )
          $val = hu_is_real_home();

        $_wp_query_infos['conditional_tags'][$prop] = $val;
    }
    $_wp_query_infos = apply_filters( 'czr-preview-query-data', $_wp_query_infos );

    ?>
      <script type="text/javascript" id="czr-customizer-data">
        (function ( _export ){
          _export.czr_wpQueryInfos = <?php echo wp_json_encode( $_wp_query_infos ) ?>;
          _export.availableWidgetLocations = <?php echo wp_json_encode( $_available_locations ) ?>;
        })( _wpCustomizeSettings );
      </script>
    <?php
}



function hu_get_czr_translated_strings() {
    return apply_filters( 'controls_translated_strings',
        array(
              'edit' => __('Edit', 'hueman'),
              'close' => __('Close', 'hueman'),
              'faviconNote' => __( "Your favicon is currently handled with an old method and will not be properly displayed on all devices. You might consider to re-upload your favicon with the new control below." , 'hueman'),
              'locations' => __('Location(s)', 'hueman'),
              'contexts' => __('Context(s)', 'hueman'),
              'notset' => __('Not set', 'hueman'),
              'rss' => __('Rss', 'hueman'),
              'selectSocialIcon' => __('Select a social icon', 'hueman'),
              'followUs' => __('Follow us on', 'hueman'),
              'successMessage' => __('Done !', 'hueman'),
              'socialLinkAdded' => __('New Social Link created ! Scroll down to edit it.', 'hueman'),

              'selectBgRepeat'  => __('Select repeat property', 'hueman'),
              'selectBgAttachment'  => __('Select attachment property', 'hueman'),
              'selectBgPosition'  => __('Select position property', 'hueman'),

              // 'widgetZone' => __('Widget Zone', 'hueman'),
              // 'widgetZoneAdded' => __('New Widget Zone created ! Scroll down to edit it.', 'hueman'),
              // 'inactiveWidgetZone' => __('Inactive in current context/location', 'hueman'),
              // 'unavailableLocation' => __('Unavailable location. Some settings must be changed.', 'hueman'),
              // 'locationWarning' => __('A selected location is not available with the current settings.', 'hueman'),

              'readDocumentation' => __('Learn more about this in the documentation', 'hueman'),
              'Settings' => __('Settings', 'hueman'),
              'Options for' => __('Options for', 'hueman'),

              'skope' => array(
                  //skope reset
                  'Reset the current customizations for' => __('Reset the current customizations for','hueman'),
                  'Reset the theme options published sitewide' => __('Reset the theme options published sitewide','hueman'),
                  'Reset your website published options for' => __('Reset your website published options for','hueman'),
                  'Please confirm that you want to reset your current ( not published ) customizations for' => __('Please confirm that you want to reset your current ( not published ) customizations for','hueman'),
                  'Your customizations have been reset for' => __('Your customizations have been reset for','hueman'),
                  'Please confirm that you want to reset your sitewide published customizations. Note : this will not reset the customizations made in other option scopes' => __('Please confirm that you want to reset your sitewide published customizations. Note : this will not reset the customizations made in other option scopes', 'hueman'),
                  'Please confirm that you want to reset your published customizations for' => __('Please confirm that you want to reset your published customizations for','hueman'),
                  'Your published customizations have been reset for' => __('Your published customizations have been reset for','hueman'),

                  //control reset
                  'Reset your customized ( and published ) value' => __('Reset your customized ( and published ) value', 'hueman'),
                  'Reset your customized ( but not yet published ) value' => __('Reset your customized ( but not yet published ) value', 'hueman'),
                  'Not customized yet, nothing to reset' => __('Not customized yet, nothing to reset', 'hueman'),
                  'Reset your customized ( but not yet published ) value' => __('Reset your customized ( but not yet published ) value', 'hueman'),
                  'Please confirm that you want to reset your current customizations for this option' => __( 'Please confirm that you want to reset your current customizations for this option', 'hueman' ),
                  'Please confirm that you want to reset your current customizations for this option in' => __('Please confirm that you want to reset your current customizations for this option in', 'hueman'),
                  'sitewide' => __('sitewide', 'hueman'),
                  'Your customizations have been reset' => __('Your customizations have been reset', 'hueman'),
                  'This WordPress setting can not be reset sitewide' => __('This WordPress setting can not be reset sitewide', 'hueman'),
                  'Please confirm that you want to reset this option' => __('Please confirm that you want to reset this option', 'hueman'),
                  'Please confirm that you want to reset this option in' => __('Please confirm that you want to reset this option in', 'hueman'),
                  'The option has been reset' => __('The option has been reset', 'hueman'),

                  //control notices
                  'Display informations about the scope of this option.' => __('Display informations about the scope of this option.', 'hueman'),
                  'This option is always customized sitewide and cannot be reset.' => __('This option is always customized sitewide and cannot be reset.', 'hueman'),
                  'Customized. Will be applied sitewide once published.' => __('Customized. Will be applied sitewide once published.','hueman'),
                  'Customized. Will be applied to' => __('Customized. Will be applied to', 'hueman'),
                  'once published.' => __('once published.', 'hueman'),
                  'Customized and applied sitewide.' => __('Customized and applied sitewide.', 'hueman'),
                  'Customized and applied to' => __('Customized and applied to','hueman'),
                  'Default website value applied sitewide.' => __('Default website value applied sitewide.','hueman'),
                  'Default website value.' => __('Default sitewide value.','hueman'),
                  'You can customize this specifically for' => __('You can customize this specifically for', 'hueman'),
                  'Currently inherited from' => __('Currently inherited from','hueman'),
                  'You can customize this specifically for' => __('You can customize this specifically for','hueman'),
                  'The value currently applied to' => __('The value currently applied to','hueman'),
                  'The value that will be applied to' => __('The value that will be applied to','hueman'),
                  'is set in' => __('is set in','hueman'),
                  'is customized in' => __('is customized in','hueman'),

                  //various skope
                  'is always customized sitewide.' => __('is always customized sitewide.', 'hueman'),
                  'Menus are created sitewide.' => __('Menus are created sitewide.', 'hueman'),
                  'Widgets are created sitewide.' => __('Widgets are created sitewide.', 'hueman'),
                  'and' => __('and', 'hueman'),
                  'Switch to scope' => __('Switch to scope', 'hueman'),
                  'In this context :' => __('In this context :', 'hueman'),
                  'inherits from' => __('inherits from', 'hueman'),
                  'overridden by' => __('overridden by', 'hueman'),

                  //error when loading
                  'There was a problem when trying to load the customizer.' => __('There was a problem when trying to load the customizer.','hueman'),
                  'Please refer to' => __('Please refer to','hueman'),
                  'this documentation page' => __('this documentation page','hueman'),
                  'to understand how to fix the problem.' => __('to understand how to fix the problem.','hueman'),

                  //skope preview bottom informations
                  'The customizations made site wide are inherited by all other levels of customization.' => __('The customizations made site wide are inherited by all other levels of customization.', 'hueman'),
                  'The current context' => __('The current context', 'hueman'),
                  'can be customized more specifically at the following level' => __('can be customized more specifically at the following level', 'hueman'),
                  'The current customizations will be applied to' => __('The current customizations will be applied to', 'hueman'),
                  'The options not customized at this level will inherit their value from' => __('The options not customized at this level will inherit their value from', 'hueman'),
                  'can be customized more specifically at the following level' => __('can be customized more specifically at the following level', 'hueman'),
                  'can be customized with a specific set of options.' => __('can be customized with a specific set of options.', 'hueman'),
                  'The options not customized at this level will inherit their value from' => __('The options not customized at this level will inherit their value from', 'hueman')
              )
        )
    );
}