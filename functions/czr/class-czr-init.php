<?php
/**
* Customizer actions and filters
*
*
* @package      Hueman
* @since        3.0+
* @author       Nicolas GUILLAUME <nicolas@presscustomizr.com>
* @copyright    Copyright (c) 2016, Nicolas GUILLAUME
* @link         http://presscustomizr.com/hueman
* @license      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
if ( ! class_exists( 'HU_customize' ) ) :
  class HU_customize {
    static $instance;
    public $control_translations;
    public $css_attr;

    function __construct () {
      self::$instance =& $this;

      //v3.1.2 option update : registered sidebar names have changed
      $this -> hu_update_widget_database_option();
      //define useful constants
      if( ! defined( 'CZR_DYN_WIDGETS_SECTION' ) )      define( 'CZR_DYN_WIDGETS_SECTION' , 'dyn_widgets_section' );

      //add control class
      add_action( 'customize_register'                        , array( $this , 'hu_augment_customizer' ),10,1);

      //add the customizer built with the builder below
      add_action( 'customize_register'                       , array( $this , 'hu_customize_register' ), 20, 1 );
      //add the customizer built with the builder below
      add_action( 'customize_register'                        , array( $this , 'hu_schedule_register_sidebar_section' ), 1000, 1 );
      //modify some WP built-in settings / controls / sections
      add_action( 'customize_register'                       , array( $this , 'hu_alter_wp_customizer_settings' ), 30, 1 );
       //Partial refreshs
      add_action( 'customize_register'                        , array( $this,  'hu_register_partials' ) );

      //populate the css_attr property, used both server side and on the customize panel (passed via serverControlParams )
      $this -> css_attr = $this -> hu_get_controls_css_attr();

      locate_template( 'functions/czr/czr-resources.php', true, true );
    }


    /**
    * Augments wp customize controls and settings classes
    * @package Hueman
    * @since Hueman 3.0
    */
    function hu_augment_customizer( $manager ) {
      $_classes = array(
        'controls/class-base-control.php',
        'controls/class-base-advanced-control.php',
        'controls/class-background-control.php',
        'controls/class-cropped-image-control.php',
        'controls/class-dynamic-control.php',
        'controls/class-layout-control.php',
        'controls/class-multipicker-control.php',
        'controls/class-socials-control.php',
        'controls/class-upload-control.php',
        'controls/class-widget-areas-control.php',

        'sections/class-widgets-section.php',

        'settings/class-settings.php'
      );
      foreach ($_classes as $_path) {
        locate_template( 'functions/czr/' . $_path , $load = true, $require_once = true );
      }

      //Registered types are eligible to be rendered via JS and created dynamically.
      if ( class_exists('HU_Customize_Cropped_Image_Control') )
        $manager -> register_control_type( 'HU_Customize_Cropped_Image_Control' );
    }


    //hook : customize_register
    function hu_register_partials( WP_Customize_Manager $wp_customize ) {

        // Abort if selective refresh is not available.
        if ( ! isset( $wp_customize->selective_refresh ) ) {
            return;
        }

        $wp_customize->selective_refresh->add_partial( 'social_links', array(
            'selector' => '.social-links',
            'settings' => array( 'hu_theme_options[social-links]' ),
            'render_callback' => 'hu_print_social_links',
            //'type' => 'my_partial'
        ) );
    }


    //updates the names of the built-in widget zones for users who installed the theme before v3.1.2
    function hu_update_widget_database_option() {
      if ( ! hu_user_started_before_version('3.1.2') )
        return;

      $_options             = get_option('hu_theme_options');
      $_update_widget_areas = array();

      if ( ! isset($_options['sidebar-areas']) || ! is_array($_options['sidebar-areas']) )
        return;

      $_zones   = hu_get_default_widget_zones();
      foreach ( $_options['sidebar-areas'] as $key => $data ) {
        if ( ! array_key_exists($data['id'], $_zones) )
          continue;
        $_id = $data['id'];
        $_options['sidebar-areas'][$key]['title'] = $_zones[$_id]['name'];
      }

      update_option('hu_theme_options', $_options );
    }






    /*
    * Since the WP_Customize_Manager::$controls and $settings are protected properties, one way to alter them is to use the get_setting and get_control methods
    * Another way is to remove the control and add it back as an instance of a custom class and with new properties
    * and set new property values
    * hook : hu_customize_register:30
    * @return void()
    */
    function hu_alter_wp_customizer_settings( $wp_customize ) {
      //CHANGE BLOGNAME AND BLOGDESCRIPTION TRANSPORT
      $wp_customize -> get_setting( 'blogname' )->transport = 'postMessage';
      $wp_customize -> get_setting( 'blogdescription' )->transport = 'postMessage';


      //IF WP VERSION >= 4.3 AND SITE_ICON SETTING EXISTS
      //=> REMOVE OLD FAV ICON CONTROL
      //=> CHANGE SITE ICON DEFAULT WP SECTION TO LOGO SECTION
      global $wp_version;
      if ( version_compare( $wp_version, '4.3', '>=' ) && is_object( $wp_customize -> get_control( 'site_icon' ) ) ) {
        $hu_option_group = HU_THEME_OPTIONS;
        $wp_customize -> remove_control( "{$hu_option_group}[favicon]" );
        //note : the setting is kept because used in the customizer js api to handle the transition between Hueman favicon to WP site icon.
        $wp_customize -> get_control( 'site_icon' ) -> section = 'title_tagline';

        //add a favicon title after the logo upload
        //@todo : update the callback
        //add_action( '__after_setting_control' , array( $this , 'hu_add_favicon_title') );
      }//end ALTER SITE ICON


      //CHANGE MENUS PROPERTIES
      $locations    = get_registered_nav_menus();
      $menus        = wp_get_nav_menus();
      $choices      = array( '' => __( '&mdash; Select &mdash;', 'hueman' ) );
      foreach ( $menus as $menu ) {
        $choices[ $menu->term_id ] = wp_html_excerpt( $menu->name, 40, '&hellip;' );
      }
      $_priorities  = array(
        'topbar' => 10,
        'header' => 20,
        'footer' => 30
      );

      //WP only adds the menu(s) settings and controls if the user has created at least one menu.
      //1) if no menus yet, we still want to display the menu picker + add a notice with a link to the admin menu creation panel
      //=> add_setting and add_control for each menu location. Check if they are set first by security
      //2) if user has already created a menu, the settings are already created, we just need to update the controls.
      $_priority = 0;
      //assign new priorities to the menus controls
      foreach ( $locations as $location => $description ) {
        $menu_setting_id = "nav_menu_locations[{$location}]";

        //create the settings if they don't exist
        //=> in the condition, make sure that the setting has really not been created yet (maybe over secured)
        if ( ! $menus && ! is_object( $wp_customize->get_setting($menu_setting_id ) ) ) {
          $wp_customize -> add_setting( $menu_setting_id, array(
            'sanitize_callback' => 'absint',
            'theme_supports'    => 'menus',
          ) );
        }

        //remove the controls if they exists
        if ( is_object( $wp_customize->get_control( $menu_setting_id ) ) ) {
          $wp_customize -> remove_control( $menu_setting_id );
        }

        //replace the controls by our custom controls
        $_control_properties = array(
          'label'   => $description,
          'section' => 'nav',
          'title'   => "main" == $location ? __( 'Assign menus to locations' , 'hueman') : false,
          'type'    => 'select',
          'choices' => $choices,
          'priority' => isset($_priorities[$location]) ? $_priorities[$location] : $_priority
        );

        //add a notice property if no menu created yet.
        if ( ! $menus ) {
          //adapt the nav section description for v4.3 (menu in the customizer from now on)
          $_create_menu_link =  version_compare( $GLOBALS['wp_version'], '4.3', '<' ) ? admin_url('nav-menus.php') : "javascript:wp.customize.section('nav').container.find('.customize-section-back').trigger('click'); wp.customize.panel('nav_menus').focus();";
          $_control_properties['notice'] = sprintf( __("You haven't created any menu yet. %s or check the %s to learn more about menus.", "hueman"),
            sprintf( '<strong><a href="%1$s" title="%2$s">%2$s</a></strong>', $_create_menu_link, __("Create a new menu now" , "hueman") ),
            sprintf( '<a href="%1$s" title="%2$s" target="_blank">%2$s</a>', esc_url('codex.wordpress.org/WordPress_Menu_User_Guide'),  __("WordPress documentation" , "hueman") )
          );
        }

        $wp_customize -> add_control( new HU_controls( $wp_customize, $menu_setting_id, $_control_properties ) );

        $_priority = $_priority + 10;
      }//foreach
    }


    /*
    * hook : '__after_setting_control' (declared in class-controls-settings.php)
    * Display a title for the favicon control, after the logo
    */
    function hu_add_favicon_title($set_id) {
      printf( '<h3 class="czr-hueman-title">%s</h3>', __( 'SITE ICON' , 'hueman') );
    }



    /**
     * Why this ?
     * Unlike the other panels, which are all added on customize_register, the Widgets panel is added on 2 different hooks
     * 1) customize_register for the left panel
     * 2) 'wp' for the preview frame.
     * @see  WP_Customize_Widgets::schedule_customize_register()
     *
     * Therefore to add a section and a control to the Widgets panel, we have to follow the same logic
     * if not, the added section will always be deactivated.
     *
     * However, the related setting added in this section must always be registered early in customize_register
     */
    function hu_schedule_register_sidebar_section( $wp_customize ) {
      $this -> hu_customize_factory (
        $wp_customize,
        $this -> hu_customize_arguments(),
        array(
          'add_setting' => array(
              'sidebar-areas' => array(
                    'default'   => array(),//empty array by default
                    'control'   => 'HU_Customize_Widget_Areas_Control',
                    'label'     => __('Create And Order Widget Areas', 'hueman'),
                    'section'   => CZR_DYN_WIDGETS_SECTION,
                    'type'      => 'czr_sidebars',
                    'transport' => 'postMessage'
              )

          )
        )
      );


      //$this->hu_customize_register( $wp_customize );
      if ( is_admin() ) {
        $this -> hu_register_sidebar_section( $wp_customize );
      } else {
        add_action( 'wp', array( $this, 'hu_register_sidebar_section' ) );
      }
    }


    function hu_register_sidebar_section( $wp_customize ) {
      $_widget_section_name = CZR_DYN_WIDGETS_SECTION;
      $_map = array(
        'add_control' => array(
            'sidebar-areas' => array(
                  'default'   => array(),//empty array by default
                  'control'   => 'HU_Customize_Widget_Areas_Control',
                  'label'     => __('Create And Manage Widget Areas', 'hueman'),
                  'section'   => $_widget_section_name,
                  'type'      => 'czr_sidebars',
                  'transport' => 'postMessage'
            )

        ),//'add_control'
        'add_section' => array(
            "{$_widget_section_name}" => array(
              'title'    => __( 'Create and manage widget zones', 'hueman' ),
              'priority' => 1000,
              'panel'    => 'widgets',
              'section_class' => 'HU_Customize_Manage_Widgets_Section',
              'type' => 'widget_zones_management'
            )

        )//add_section
      );//map


      //wp_customize is not defined when hooked on wp
      if ( 'wp' == current_filter() )
        global $wp_customize;

      $this -> hu_customize_factory (
        $wp_customize,
        $this -> hu_customize_arguments(),
        $_map
      );

      $wp_customize -> get_panel('widgets') -> title = __('Dynamic Sidebars and Widgets', 'hueman');
    }


    /**
    * Generates customizer sections, settings and controls
    * @package Hueman
    * @since Hueman 3.0
    */
    function hu_customize_register( $wp_customize) {
      return $this -> hu_customize_factory (
        $wp_customize,
        $this -> hu_customize_arguments(),
        HU_utils_settings_map::$instance -> hu_get_customizer_map()
      );
    }




    /**
     * Defines authorized arguments for panels, sections, settings and controls
     * @package Hueman
     * @since Hueman 3.0
     */
    function hu_customize_arguments() {
      $args = array(
          'panels' => array(
                'title' ,
                'description',
                'priority' ,
                'theme_supports',
                'capability'
          ),
          'sections' => array(
                'title' ,
                'priority' ,
                'description',
                'panel',
                'theme_supports',
                'type'
          ),
          'settings' => array(
                'default'     =>  null,
                'capability'    =>  'manage_options' ,
                'setting_type'    =>  'option' ,
                'sanitize_callback' =>  null,
                'sanitize_js_callback'  =>  null,
                'transport'     =>  null
          ),
          'controls' => array(
                'title' ,
                'label' ,
                'description',
                'section' ,
                'settings',
                'type' ,
                'choices' ,
                'priority' ,
                'sanitize_callback',
                'sanitize_js_callback',
                'notice' ,
                'buttontext' ,//button specific
                'link' ,//button specific
                'step' ,//number specific
                'min' ,//number specific
                'range-input' ,
                'max',
                'cssid',
                'slider_default',
                'active_callback',
                'content_after',
                'content_before',
                'icon',
                'width',
                'height',
                'flex_width',
                'flex_height',
                'dst_width',
                'dst_height'
          )
      );
      return apply_filters( 'hu_customizer_arguments', $args );
    }





    /**
     * Generates customizer
     * @package Hueman
     * @since Hueman 3.0
     */
    function hu_customize_factory ( $wp_customize , $args, $setup ) {
      global $wp_version;
      //add panels if current WP version >= 4.0
      if ( isset( $setup['add_panel']) && version_compare( $wp_version, '4.0', '>=' ) ) {
        foreach ( $setup['add_panel'] as $p_key => $p_options ) {
          //declares the clean section option array
          $panel_options = array();
          //checks authorized panel args
          foreach( $args['panels'] as $p_set) {
            $panel_options[$p_set] = isset( $p_options[$p_set]) ?  $p_options[$p_set] : null;
          }
          $wp_customize -> add_panel( $p_key, $panel_options );
        }
      }

      //remove sections
      if ( isset( $setup['remove_section'])) {
        foreach ( $setup['remove_section'] as $section) {
          $wp_customize -> remove_section( $section);
        }
      }

      //add sections
      if ( isset( $setup['add_section'])) {
        foreach ( $setup['add_section'] as  $key => $options) {
          //generate section array
          $option_section = array();

          foreach( $args['sections'] as $sec) {
            $option_section[$sec] = isset( $options[$sec]) ?  $options[$sec] : null;
          }

          //instanciate a custom class if defined
          if( ! isset( $options['section_class']) )
            $wp_customize -> add_section( $key,$option_section);
          else if ( isset( $options['section_class']) && class_exists($options['section_class']) )
            $wp_customize -> add_section( new $options['section_class']( $wp_customize, $key, $option_section ));

        }//end foreach
      }//end if


      //add setting alone
      if ( isset( $setup['add_setting'])) {

        foreach ( $setup['add_setting'] as $key => $options) {
          //isolates the option name for the setting's filter
          $f_option = preg_match_all( '/\[(.*?)\]/' , $key , $match );
          $f_option_name = isset( $match[1][0] )  ? $match[1][0] : 'setting';

          $hu_option_group = HU_THEME_OPTIONS;

          $_opt_name = "{$hu_option_group}[{$key}]";

          //declares settings array
          $option_settings = array();
          foreach( $args['settings'] as $set => $set_value) {
            if ( $set == 'setting_type' ) {
              $option_settings['type'] = isset( $options['setting_type']) ?  $options['setting_type'] : $args['settings'][$set];
              $option_settings['type'] = apply_filters( "{$f_option_name}_customizer_set", $option_settings['type'] , $set );
            }
            else {
              $option_settings[$set] = isset( $options[$set]) ?  $options[$set] : $args['settings'][$set];
              $option_settings[$set] = apply_filters( "{$f_option_name}_customizer_set" , $option_settings[$set] , $set );
            }
          }

          //add setting
          if ( class_exists('HU_Customize_Setting') )
            $wp_customize -> add_setting( new HU_Customize_Setting ( $wp_customize, $_opt_name, $option_settings ) );
          else
            $wp_customize -> add_setting( $_opt_name, $option_settings );
        }//end for each
      }//end if isset


      //add control alone
      if ( isset( $setup['add_control'])) {

        foreach ( $setup['add_control'] as $key => $options) {
          //isolates the option name for the setting's filter
          $f_option = preg_match_all( '/\[(.*?)\]/' , $key , $match );
          $f_option_name = isset( $match[1][0] )  ? $match[1][0] : 'setting';

          $hu_option_group = HU_THEME_OPTIONS;

          $_opt_name = "{$hu_option_group}[{$key}]";

          //generate controls array
          $option_controls = array();
          foreach( $args['controls'] as $con) {
            $option_controls[$con] = isset( $options[$con]) ?  $options[$con] : null;
          }

          //add control with a class instanciation if not default
          if( ! isset( $options['control']) )
            $wp_customize -> add_control( $_opt_name, $option_controls );
          else
            $wp_customize -> add_control( new $options['control']( $wp_customize, $_opt_name, $option_controls ));

        }//end for each
      }//end if isset



      //add settings and controls
      if ( isset( $setup['add_setting_control'])) {

        foreach ( $setup['add_setting_control'] as $key => $options) {
          //isolates the option name for the setting's filter
          $f_option = preg_match_all( '/\[(.*?)\]/' , $key , $match );
          $f_option_name = isset( $match[1][0] )  ? $match[1][0] : 'setting';

          $hu_option_group = HU_THEME_OPTIONS;

          $_opt_name = "{$hu_option_group}[{$key}]";

          //declares settings array
          $option_settings = array();
          foreach( $args['settings'] as $set => $set_value) {
            if ( $set == 'setting_type' ) {
              $option_settings['type'] = isset( $options['setting_type']) ?  $options['setting_type'] : $args['settings'][$set];
              $option_settings['type'] = apply_filters( "{$f_option_name}_customizer_set", $option_settings['type'] , $set );
            }
            else {
              $option_settings[$set] = isset( $options[$set]) ?  $options[$set] : $args['settings'][$set];
              $option_settings[$set] = apply_filters( "{$f_option_name}_customizer_set" , $option_settings[$set] , $set );
            }
          }

          //add setting
          if ( class_exists('HU_Customize_Setting') )
            $wp_customize -> add_setting( new HU_Customize_Setting ( $wp_customize, $_opt_name, $option_settings ) );
          else
            $wp_customize -> add_setting( $_opt_name, $option_settings );

          //generate controls array
          $option_controls = array();
          foreach( $args['controls'] as $con) {
            $option_controls[$con] = isset( $options[$con]) ?  $options[$con] : null;
          }

          //add control with a class instanciation if not default
          if( ! isset( $options['control']) )
            $wp_customize -> add_control( $_opt_name, $option_controls );
          else
            $wp_customize -> add_control( new $options['control']( $wp_customize, $_opt_name, $option_controls ));

        }//end for each
      }//end if isset
    }//end of customize generator function



    function hu_get_controls_css_attr() {
      return apply_filters('controls_css_attr',
          array(
            'multi_input_wrapper' => 'czr-multi-input-wrapper',
            'sub_set_wrapper'     => 'czr-sub-set',
            'sub_set_input'       => 'czr-input',
            'img_upload_container' => 'czr-imgup-container',

            'views_wrapper'     => 'czr-views-wrapper',
            'inner_view'        => 'czr-inner-view',
            'view_content'      => 'czr-view-content',
            'view_header'       => 'czr-view-header',
            'view_title'        => 'czr-view-title',
            'view_buttons'      => 'czr-view-buttons',
            'sortable_handle'   => 'czr-sortable-handle',

            //remove dialog
            'display_alert_btn' => 'czr-display-alert',
            'remove_alert_wrapper'   => 'czr-remove-alert-wrapper',
            'cancel_alert_btn'  => 'czr-cancel-button',
            'remove_view_btn'        => 'czr-remove-button',

            'edit_view_btn'     => 'czr-edit-view',
            //pre add dialog
            'open_pre_add_btn'      => 'czr-open-pre-add-new',
            'adding_new'        => 'czr-adding-new',
            'pre_add_wrapper'   => 'czr-pre-add-wrapper',
            'pre_add_view_content'   => 'czr-pre-add-view-content',
            'cancel_pre_add_btn'  => 'czr-cancel-add-new',
            'add_new_btn'       => 'czr-add-new',
            'pre_add_success'   => 'czr-add-success'
        )
      );
    }

    function hu_get_translated_strings() {
      return apply_filters('controls_translated_strings',
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
                'widgetZone' => __('Widget Zone', 'hueman'),
                'widgetZoneAdded' => __('New Widget Zone created ! Scroll down to edit it.', 'hueman'),
                'inactiveWidgetZone' => __('Inactive in current context/location', 'hueman'),
                'unavailableLocation' => __('Unavailable location. Some settings must be changed.', 'hueman'),
                'locationWarning' => __('A selected location is not available with the current settings.', 'hueman'),
                'readDocumentation' => __('Learn more about this in the documentation', 'hueman')
          )
      );
    }

    //@return array of WP builtin settings
    function hu_get_wp_builtin_settings() {
      return array(
        'blogname',
        'blogdescription',
        'site-icon',
        'custom-logo',
        'background_color',
        'show_on_front',
        'page_on_front',
        'page_for_posts'
      );
    }
  }//end of class
endif;
