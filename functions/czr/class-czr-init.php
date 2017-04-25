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
      add_action( 'customize_register'                       , array( $this , 'hu_augment_customizer' ),10,1);

      //add the customizer built with the builder below
      add_action( 'customize_register'                       , array( $this , 'hu_customize_register' ), 20, 1 );
      //add the customizer built with the builder below
      add_action( 'customize_register'                       , array( $this , 'hu_schedule_register_sidebar_section' ), 1000, 1 );
      //modify some WP built-in settings / controls / sections
      add_action( 'customize_register'                       , array( $this , 'hu_alter_wp_customizer_settings' ), 1000, 1 );

      //Partial refreshs
      add_action( 'customize_register'                       , array( $this,  'hu_register_partials' ) );
      //Clean some deprecated options (header-image for example, now handled with wp header_image theme mod)
      add_action( 'customize_save_after'                      , array( $this,  'hu_clean_deprecated_options' ) );

      //custom logo compatibility option for WP version < WP 4.5
      //the Hueman theme has switched to the WP custom_logo theme mod since v3.2.4
      //for older version, the previous control is used
      if ( ! function_exists( 'the_custom_logo' ) ) {
        add_filter( 'hu_site_identity_sec', array( $this, 'hu_register_old_custom_logo') );
      }


      //Print modules and inputs templates
      $this -> hu_load_tmpl();
      //Add the module data server side generated + additional resources (like the WP text editor)
      $this -> hu_load_module_data_resources();

      //populate the css_attr property, used both server side and on the customize panel (passed via serverControlParams )
      $this -> css_attr = $this -> hu_get_controls_css_attr();

      locate_template( 'functions/czr/czr-resources.php', true, true );
    }


    /* ------------------------------------------------------------------------- *
     *  DEPRECATED OPTIONS
    /* ------------------------------------------------------------------------- */
    //hook : customize_save_after
    //When the users modifies the header_image, check if the old option exists and remove it if needed
    function hu_clean_deprecated_options( $manager_inst ) {
      //can we do things ?
      if ( ! $manager_inst->is_preview() ) {
        return;
      }
      $action = 'save-customize_' . $manager_inst->get_stylesheet();
      if ( ! check_ajax_referer( $action, 'nonce', false ) ) {
        return;
      }
      //only attempt to update option when header_image is modified
      $setting_validities = $manager_inst->validate_setting_values( $manager_inst->unsanitized_post_values() );
      if ( ! is_array( $setting_validities ) || ! isset($setting_validities['header_image'] ) )
        return;
      //clean old option if exists
      $_options = get_option( HU_THEME_OPTIONS );
      if ( isset($_options['header-image']) ) {
        unset( $_options['header-image']);
        update_option( HU_THEME_OPTIONS, $_options );
      }
    }



    //hook : hu_site_identity_sec
    //Registers the custom logo for WP version < 4.5
    function hu_register_old_custom_logo( $settings ) {
        global $wp_version;
        return array_merge(
          $settings,
          array(
              'custom-logo'  => array(
                'control'   =>  version_compare( $wp_version, '4.3', '>=' ) ? 'HU_Customize_Cropped_Image_Control' : 'HU_Customize_Upload_Control',
                'label'     =>  __( 'Custom Header Logo' , 'hueman' ),
                'section'   => 'title_tagline' ,
                'sanitize_callback' => array( HU_utils_settings_map::$instance , 'hu_sanitize_number' ),
                //we can define suggested cropping area and allow it to be flexible (def 150x150 and not flexible)
                'width'     => 250,
                'height'    => 100,
                'flex_width' => true,
                'flex_height' => true,
                //to keep the selected cropped size
                'dst_width'  => false,
                'dst_height'  => false,
                'notice'    => __('Upload your custom logo image. Supported formats : .jpg, .png, .gif, svg, svgz' , 'hueman'),
                'priority' => 7
              )
          )
        );
    }





    /* ------------------------------------------------------------------------- *
     *  AUGMENT CUSTOMIZER SERVER SIDE
    /* ------------------------------------------------------------------------- */
    /**
    * Augments wp customize controls and settings classes
    * @package Hueman
    * @since Hueman 3.0
    */
    function hu_augment_customizer( $manager ) {
      $_classes = array(
        'controls/class-base-control.php',
        'controls/class-cropped-image-control.php',

        'controls/class-layout-control.php',
        'controls/class-multipicker-control.php',
        'controls/class-modules-control.php',

        'controls/class-upload-control.php',

        'panels/class-panels.php',

        'sections/class-widgets-section.php',
        'sections/class-pro-section.php',

        'settings/class-settings.php'
      );
      foreach ($_classes as $_path) {
          locate_template( 'functions/czr/' . $_path , $load = true, $require_once = true );
      }

      //Registered types are eligible to be rendered via JS and created dynamically.
      if ( class_exists('HU_Customize_Cropped_Image_Control') )
        $manager -> register_control_type( 'HU_Customize_Cropped_Image_Control' );

      if ( class_exists('HU_Customize_Panels') )
        $manager -> register_panel_type( 'HU_Customize_Panels');

      if ( ! HU_IS_PRO && class_exists('HU_Customize_Section_Pro') ) {
        $manager -> register_section_type( 'HU_Customize_Section_Pro');
      }
    }





    /* ------------------------------------------------------------------------- *
     *  PARTIALS
    /* ------------------------------------------------------------------------- */
    //hook : customize_register
    function hu_register_partials( WP_Customize_Manager $wp_customize ) {
        //Bail if selective refresh is not available (old versions) or disabled (for skope for example)
        if ( ! isset( $wp_customize->selective_refresh ) || ! hu_is_partial_refreshed_on() ) {
            return;
        }
        $wp_customize->selective_refresh->add_partial( 'social_links', array(
            'selector' => '.social-links',
            'settings' => array( 'hu_theme_options[social-links]' ),
            'render_callback' => 'hu_print_social_links',
        ) );

        $wp_customize->selective_refresh->add_partial( 'header_image', array(
            'selector' => '#header-image-wrap',
            'settings' => array( 'header_image' ),
            'render_callback' => 'hu_render_header_image',
        ) );

        $wp_customize->selective_refresh->add_partial( 'site_title', array(
            'selector' => '.site-title',
            'settings' => array( 'blogname' ),
            'render_callback' => 'hu_do_render_logo_site_tite',
        ) );
        $wp_customize->selective_refresh->add_partial( 'site_description', array(
            'selector' => '.site-description',
            'settings' => array( 'blogdescription' ),
            'render_callback' => 'hu_render_blog_description',
        ) );
    }




    /* ------------------------------------------------------------------------- *
     *  LOAD MODULES AND INPUTS TEMPLATES
    /* ------------------------------------------------------------------------- */
    function hu_load_tmpl() {
      $_tmpl = array(
        'tmpl/modules/all-modules-tmpl.php',
        'tmpl/modules/body_bg-module-tmpl.php',
        'tmpl/modules/social-module-tmpl.php',
        'tmpl/modules/widgets-areas-module-tmpl.php',
        'tmpl/modules/text_editor-module-tmpl.php',
        'tmpl/modules/slide-module-tmpl.php',

        'tmpl/inputs/img-uploader-tmpl.php',
        'tmpl/inputs/text_editor-input-tmpl.php'
      );
      foreach ($_tmpl as $_path) {
        locate_template( 'functions/czr/' . $_path , $load = true, $require_once = true );
      }
    }


    function hu_load_module_data_resources() {
      locate_template( 'functions/czr/modules/modules-data.php' , $load = true, $require_once = true );
      locate_template( 'functions/czr/modules/modules-resources.php' , $load = true, $require_once = true );
    }




    /* ------------------------------------------------------------------------- *
     *  MODIFY SETTINGS, CONTROLS, SECTIONS, PANELS SERVER SIDE
    /* ------------------------------------------------------------------------- */
    /*
    * Since the WP_Customize_Manager::$controls and $settings are protected properties, one way to alter them is to use the get_setting and get_control methods
    * Another way is to remove the control and add it back as an instance of a custom class and with new properties
    * and set new property values
    * hook : hu_customize_register:30
    * @return void()
    */
    function hu_alter_wp_customizer_settings( $wp_customize ) {
      //SOME SETTINGS TRANSPORT
      if ( is_object( $wp_customize -> get_setting( 'blogname' ) ) ) {
        $wp_customize -> get_setting( 'blogname' )->transport = 'postMessage';
      }
      if ( is_object( $wp_customize -> get_setting( 'blogdescription' ) ) ) {
        $wp_customize -> get_setting( 'blogdescription' )->transport = 'postMessage';
      }

      //ONLY IF SELECTIVE REFRESH IS SUPPORTED
      if ( isset( $wp_customize->selective_refresh ) && is_object( $wp_customize -> get_setting( 'header_image' ) ) ) {
        $wp_customize -> get_setting( 'header_image' )->transport = 'postMessage';
      }
      if ( isset( $wp_customize->selective_refresh ) && is_object( $wp_customize -> get_setting( 'header_image_data' ) ) ) {
        $wp_customize -> get_setting( 'header_image_data' )->transport = 'postMessage';
      }

      //MOVE WP FRONT PAGE SECTION TO CONTENT PANEL
      if ( is_object( $wp_customize -> get_section( 'static_front_page' ) ) ) {
        $wp_customize -> get_section( 'static_front_page' ) -> panel = '';//'hu-content-panel';
        $wp_customize -> get_section( 'static_front_page' ) -> title = __( 'Front Page Content', 'hueman' );
        $wp_customize -> get_section( 'static_front_page' ) -> priority = 10;
        $wp_customize -> get_section( 'static_front_page' ) -> active_callback = 'hu_is_home';
      }

      //CHANGE THE STATIC FRONT PAGE WP CONTROLS
      if ( is_object( $wp_customize -> get_control( 'show_on_front' ) ) ) {
        $wp_customize -> get_control( 'show_on_front' ) -> type = 'select';
        $wp_customize -> get_control( 'show_on_front' ) -> choices = array(
            '__nothing__'   => __( 'Don\'t show any posts or page' , 'hueman'),
            'posts'   => __( 'Your latest posts' , 'hueman'),
            'page'    => __( 'A static page' , 'hueman'  )
        );
      }


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
      // $locations    = get_registered_nav_menus();
      // $menus        = wp_get_nav_menus();
      // $choices      = array( '' => __( '&mdash; Select &mdash;', 'hueman' ) );
      // foreach ( $menus as $menu ) {
      //   $choices[ $menu->term_id ] = wp_html_excerpt( $menu->name, 40, '&hellip;' );
      // }
      // $_priorities  = array(
      //   'topbar' => 10,
      //   'header' => 20,
      //   'footer' => 30
      // );

      // //WP only adds the menu(s) settings and controls if the user has created at least one menu.
      // //1) if no menus yet, we still want to display the menu picker + add a notice with a link to the admin menu creation panel
      // //=> add_setting and add_control for each menu location. Check if they are set first by security
      // //2) if user has already created a menu, the settings are already created, we just need to update the controls.
      // $_priority = 0;
      // //assign new priorities to the menus controls
      // foreach ( $locations as $location => $description ) {
      //   $menu_setting_id = "nav_menu_locations[{$location}]";

      //   //create the settings if they don't exist
      //   //=> in the condition, make sure that the setting has really not been created yet (maybe over secured)
      //   if ( ! $menus && ! is_object( $wp_customize->get_setting($menu_setting_id ) ) ) {
      //     $wp_customize -> add_setting( $menu_setting_id, array(
      //       'sanitize_callback' => 'absint',
      //       'theme_supports'    => 'menus',
      //     ) );
      //   }

      //   //remove the controls if they exists
      //   if ( is_object( $wp_customize->get_control( $menu_setting_id ) ) ) {
      //     $wp_customize -> remove_control( $menu_setting_id );
      //   }

      //   //replace the controls by our custom controls
      //   $_control_properties = array(
      //     'label'   => $description,
      //     'section' => 'menu_locations',
      //     'title'   => "main" == $location ? __( 'Assign menus to locations' , 'hueman') : false,
      //     'type'    => 'select',
      //     'choices' => $choices,
      //     'priority' => isset($_priorities[$location]) ? $_priorities[$location] : $_priority
      //   );

      //   //add a notice property if no menu created yet.
      //   if ( ! $menus ) {
      //     //adapt the nav section description for v4.3 (menu in the customizer from now on)
      //     $_create_menu_link =  version_compare( $GLOBALS['wp_version'], '4.3', '<' ) ? admin_url('nav-menus.php') : "javascript:wp.customize.section('nav').container.find('.customize-section-back').trigger('click'); wp.customize.panel('nav_menus').focus();";
      //     $_control_properties['notice'] = sprintf( __("You haven't created any menu yet. %s or check the %s to learn more about menus.", "hueman"),
      //       sprintf( '<strong><a href="%1$s" title="%2$s">%2$s</a></strong>', $_create_menu_link, __("Create a new menu now" , "hueman") ),
      //       sprintf( '<a href="%1$s" title="%2$s" target="_blank">%2$s</a>', esc_url('codex.wordpress.org/WordPress_Menu_User_Guide'),  __("WordPress documentation" , "hueman") )
      //     );
      //   }

      //   $wp_customize -> add_control( new HU_controls( $wp_customize, $menu_setting_id, $_control_properties ) );

      //   $_priority = $_priority + 10;
      // }//foreach


      //MOVE THE HEADER IMAGE CONTROL INTO THE HEADER DESIGN SECTION
      if ( is_object( $wp_customize -> get_control( 'header_image' ) ) ) {
        $wp_customize -> get_control( 'header_image' ) -> section = 'header_image_sec';
        $wp_customize -> get_control( 'header_image' ) -> priority = 100;
      }

      //CHANGE THE CUSTOM LOGO PRIORITY
      //check if custom_logo is registered first for backward compatibility => custom_logo was introduced in WP 4.5.
      if ( is_object( $wp_customize->get_control( 'custom_logo' ) ) ) {
        $wp_customize -> get_control( 'custom_logo' ) -> priority = 7;
      }

      //The selective refresh support will be added later to the custom logo
      if ( isset( $wp_customize->selective_refresh ) && is_object($wp_customize->get_setting( 'custom_logo' ) ) ) {
        $wp_customize -> selective_refresh -> remove_partial( 'custom_logo' );
        $wp_customize -> get_setting( 'custom_logo' ) -> transport = 'refresh';
      }

      //MOVE THE CUSTOM CSS SECTION (introduced in 4.7) INTO THE GLOBAL SETTINGS PANEL
      if ( is_object( $wp_customize->get_section( 'custom_css' ) ) ) {
        $wp_customize -> get_section( 'custom_css' ) -> panel = 'hu-advanced-panel';
        $wp_customize -> get_section( 'custom_css' ) -> priority = 40;
      }

      //CHANGE CUSTOM_CSS DEFAULT
      $custom_css_setting_id = sprintf( 'custom_css[%s]', get_stylesheet() );
      if ( is_object( $wp_customize->get_setting( $custom_css_setting_id ) ) ) {
        $original = $wp_customize->get_setting( $custom_css_setting_id )->default;
        $new_def = sprintf( "%s\n%s\n%s\n*/",
            substr( $original, 0, strlen($original) - 2),
            __( "Use this field to test small chunks of CSS code. For important CSS customizations, it is recommended to modify the style.css file of a child theme." , 'hueman' ),
            'http' . esc_url( '//codex.wordpress.org/Child_Themes' )
        );
        $wp_customize->get_setting( $custom_css_setting_id )->default = $new_def;
      }
    }//end of hu_alter_wp_customizer_settings()


    /*
    * hook : '__after_setting_control' (declared in class-controls-settings.php)
    * Display a title for the favicon control, after the logo
    */
    function hu_add_favicon_title($set_id) {
      printf( '<h3 class="czr-hueman-title">%s</h3>', __( 'SITE ICON' , 'hueman') );
    }








    /* ------------------------------------------------------------------------- *
     *  WIDGETS SPECIFICS
    /* ------------------------------------------------------------------------- */
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
     * Note that the related setting added in this section must always be registered early in customize_register
     */
    function hu_schedule_register_sidebar_section( $wp_customize ) {
      $this -> hu_customize_factory (
        $wp_customize,
        $this -> hu_customize_arguments(),
        array(
          'add_setting' => array(
              'sidebar-areas' => array(
                    'default'   => array(),//empty array by default
                    'control'   => 'HU_Customize_Modules',
                    'label'     => __('Create And Order Widget Areas', 'hueman'),
                    'section'   => CZR_DYN_WIDGETS_SECTION,
                    'type'      => 'czr_module',
                    'module_type' => 'czr_widget_areas_module',
                    'notice'    => __('You must save changes for the new areas to appear below. <br /><i>Warning: Make sure each area has a unique ID.</i>' , 'hueman'),
                    'transport' => 'postMessage',
                    'skoped' => false
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
                  'control'   => 'HU_Customize_Modules',
                  'label'     => __('Create And Manage Widget Areas', 'hueman'),
                  'section'   => $_widget_section_name,
                  'type'      => 'czr_module',
                  'module_type' => 'czr_widget_areas_module',
                  'notice'    => __('You must save changes for the new areas to appear below. <br /><i>Warning: Make sure each area has a unique ID.</i>' , 'hueman'),
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










    /* ------------------------------------------------------------------------- *
     *  FACTORY
    /* ------------------------------------------------------------------------- */
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
                'title',
                'czr_subtitle',
                'description',
                'priority' ,
                'theme_supports',
                'capability',
                'type'
          ),
          'sections' => array(
                'title' ,
                'priority' ,
                'description',
                'panel',
                'theme_supports',
                'type',
                'active_callback',
                'pro_text',
                'pro_url'
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

                'module_type',
                'syncCollection',

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
                'dst_height',

                'ubq_section'
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
          $wp_customize -> add_panel( new HU_Customize_Panels( $wp_customize, $p_key, $panel_options ) );
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










    /* ------------------------------------------------------------------------- *
     *  HELPERS
    /* ------------------------------------------------------------------------- */
    function hu_get_controls_css_attr() {
      return apply_filters('controls_css_attr',
          array(
            'multi_input_wrapper' => 'czr-multi-input-wrapper',
            'sub_set_wrapper'     => 'czr-sub-set',
            'sub_set_input'       => 'czr-input',
            'img_upload_container' => 'czr-imgup-container',

            'edit_modopt_icon'    => 'czr-toggle-modopt',
            'close_modopt_icon'   => 'czr-close-modopt',
            'mod_opt_wrapper'     => 'czr-mod-opt-wrapper',


            'items_wrapper'     => 'czr-items-wrapper',
            'single_item'        => 'czr-single-item',
            'item_content'      => 'czr-item-content',
            'item_header'       => 'czr-item-header',
            'item_title'        => 'czr-item-title',
            'item_btns'         => 'czr-item-btns',
            'item_sort_handle'   => 'czr-item-sort-handle',

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
            'pre_add_item_content'   => 'czr-pre-add-view-content',
            'cancel_pre_add_btn'  => 'czr-cancel-add-new',
            'add_new_btn'       => 'czr-add-new',
            'pre_add_success'   => 'czr-add-success'
        )
      );
    }



    //@return array of WP builtin settings
    function hu_get_wp_builtin_settings() {
      return array(
        'blogname',
        'blogdescription',
        'site_icon',
        'custom_logo',
        'background_color',
        'show_on_front',
        'page_on_front',
        'page_for_posts',
        'header_image',
        'header_image_data'
      );
    }
  }//end of class
endif;