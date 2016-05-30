<?php
/**
* Defines the Hueman theme settings map
* On live context, used to generate the default option values
*
*
* @package      Hueman
* @since        3.0.0
* @author       Nicolas GUILLAUME <nicolas@presscustomizr.com>
* @copyright    Copyright (c) 2016, Nicolas GUILLAUME
* @link         http://presscustomizr.com/hueman
* @license      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
if ( ! class_exists( 'HU_utils_settings_map' ) ) :
  class HU_utils_settings_map {
    static $instance;
    private $is_wp_version_before_4_0;
    public $customizer_map = array();

    function __construct () {
      self::$instance =& $this;
      //declare a private property to check wp version >= 4.0
      global $wp_version;
      $this -> is_wp_version_before_4_0 = ( ! version_compare( $wp_version, '4.0', '>=' ) ) ? true : false;
    }//end of construct



    /**
    * Defines sections, settings and function of customizer and return and array
    * Also used to get the default options array, in this case $get_default = true and we DISABLE the __get_option (=>infinite loop)
    *
    * @package Hueman
    * @since Hueman 3.0
    */
    public function hu_get_customizer_map( $get_default = null ) {
      if ( ! empty( $this -> customizer_map ) )
        return $this -> customizer_map;

      //POPULATE THE MAP WITH DEFAULT HUEMAN SETTINGS
      add_filter( 'hu_add_panel_map'        , array( $this, 'hu_popul_panels_map'));
      add_filter( 'hu_remove_section_map'   , array( $this, 'hu_popul_remove_section_map'));
      //theme switcher's enabled when user opened the customizer from the theme's page
      add_filter( 'hu_remove_section_map'   , array( $this, 'hu_set_theme_switcher_visibility'));
      add_filter( 'hu_add_section_map'      , array( $this, 'hu_popul_section_map' ));
      //add controls to the map
      add_filter( 'hu_add_setting_control_map' , array( $this , 'hu_popul_setting_control_map' ), 10, 2 );
      //$this -> hu_populate_setting_control_map();

      //CACHE THE GLOBAL CUSTOMIZER MAP
      $this -> customizer_map = array_merge(
        array( 'add_panel'           => apply_filters( 'hu_add_panel_map', array() ) ),
        array( 'remove_section'      => apply_filters( 'hu_remove_section_map', array() ) ),
        array( 'add_section'         => apply_filters( 'hu_add_section_map', array() ) ),
        array( 'add_setting_control' => apply_filters( 'hu_add_setting_control_map', array(), $get_default ) )
      );
      return apply_filters( 'hu_customizer_map', $this -> customizer_map );
    }



    /**
    * Populate the control map
    * hook : 'hu_add_setting_control_map'
    * => loops on a callback list, each callback is a section setting group
    * @return array()
    *
    * @package Hueman
    * @since Hueman 3.3+
    */
    function hu_popul_setting_control_map( $_map, $get_default = null ) {
      $_new_map = array();
      $_settings_sections = array(
        //GENERAL
         'hu_site_identity_sec',
         'hu_general_design_sec',
         'hu_comments_sec',
         'hu_mobiles_sec',
         'hu_social_links_sec',
         'hu_performance_sec',
         'hu_admin_sec',

        //HEADER
         'hu_header_design_sec',
         'hu_header_widget_sec',

        //CONTENT
         'hu_content_blog_sec',
         'hu_content_single_sec',
         'hu_content_thumbnail_sec',
         'hu_content_layout_sec',
         'hu_sidebars_design_sec',

        //FOOTER
         'hu_footer_design_sec',

      );

      foreach ( $_settings_sections as $_section_cb ) {
        if ( ! method_exists( $this , $_section_cb ) )
          continue;
        //applies a filter to each section settings map => allows plugins (hueman addons for ex.) to add/remove settings
        //each section map takes one boolean param : $get_default
        $_section_map = apply_filters(
          $_section_cb,
          call_user_func_array( array( $this, $_section_cb ), array( $get_default ) )
        );

        if ( ! is_array( $_section_map) )
          continue;

        $_new_map = array_merge( $_new_map, $_section_map );
      }//foreach
      return array_merge( $_map, $_new_map );
    }


    /******************************************************************************************************
    *******************************************************************************************************
    * PANEL : GENERAL
    *******************************************************************************************************
    ******************************************************************************************************/

    /*-----------------------------------------------------------------------------------------------------
                                   SITE IDENTITY
    ------------------------------------------------------------------------------------------------------*/
    //the title_tagline section holds the default WP setting for the Site Title and the Tagline
    //This section has been previously removed from its initial location and added back in the General Settings panel
    //Important Note :
    //IF WP VERSION >= 4.3 AND SITE_ICON SETTING EXISTS
    //=> The following FAV ICON CONTROL is removed (@see class-czr-init.php)
    function hu_site_identity_sec() {
      return array(
          'favicon'  => array(
                'control'   =>  'HU_Customize_Upload_Control' ,
                'label'     =>  __( 'Favicon Upload (supported formats : .ico, .png, .gif)' , 'hueman' ),
                'title'     => __( 'FAVICON' , 'hueman'),
                'section'   => 'title_tagline',//<= this is a default WP section, not created for the Hueman theme
                'type'      => 'czr_upload',
                'sanitize_callback' => array( $this , 'hu_sanitize_number' )
          ),
          'rss-feed'  => array(
                'default'   => '',
                'control'   =>  'HU_Controls',
                'label'     =>  __( 'FeedBurner URL' , 'hueman' ),
                'section'   => 'title_tagline',//<= this is a default WP section, not created for the Hueman theme
                'type'      => 'text',
                'sanitize_callback' => array( $this , 'hu_sanitize_url' ),
                'priority'  => 60,
                'notice'    => __('Enter your full FeedBurner URL (or any other preferred feed URL) if you wish to use FeedBurner over the standard WordPress feed e.g. http://feeds.feedburner.com/yoururlhere ', 'hueman' )
          )
      );
    }

    /*-----------------------------------------------------------------------------------------------------
                                   GLOBAL DESIGN OPTIONS SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_general_design_sec( $get_default = null ) {
      return array(
          'dynamic-styles' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Dynamic Styles', 'hueman'),
                'section'   => 'general_design_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Turn on to use the styling options below' , 'hueman' )
          ),
          'boxed' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __('Boxed Layout', 'hueman'),
                'section'   => 'general_design_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Use a boxed layout' , 'hueman' )
          ),
          'font' => array(
                'default'   => 'source-sans-pro',
                'control'   => 'HU_controls',
                'label'     => __('Font', 'hueman'),
                'section'   => 'general_design_sec',
                'type'      => 'select',
                'choices'    => $this -> hu_get_fonts(),
                'notice'    => __( 'Select a font for your website' , 'hueman' )
          ),
          'container-width'  =>  array(
                'default'       => 1380,
                'control'       => 'HU_controls' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'label'         => __( "Website Max-width" , 'hueman' ),
                'section'       => 'general_design_sec' ,
                'type'          => 'number' ,
                'step'          => 1,
                'min'           => 1024,
                //'transport'     => 'postMessage',
                'notice'        => __('Max-width of the container. If you use 2 sidebars, your container should be at least 1200px.<br /><i>Note: For 720px content (default) use <strong>1380px</strong> for 2 sidebars and <strong>1120px</strong> for 1 sidebar. If you use a combination of both, try something inbetween.</i>', 'hueman')//@todo sprintf and split translations
          ),
          'sidebar-padding' => array(
                'default'   => 30,
                'control'   => 'HU_controls',
                'label'     => __("Sidebar Width", 'hueman'),
                'section'   => 'general_design_sec',
                'type'      => 'select',//@todo create a radio type
                'choices' => array(
                  '30'          => __( '30px padding for widgets' , 'hueman' ),
                  '20'          => __( '20px padding for widgets' , 'hueman' ),
                ),
                'notice'    => __( 'Change left and right sidebars padding' , 'hueman')
          ),
          'color-1' => array(
                'default'     => '#3b8dbd',
                'control'     => 'WP_Customize_Color_Control',
                'label'       => __( 'Primary Color' , 'hueman' ),
                'section'     => 'general_design_sec',
                'type'        =>  'color' ,
                'sanitize_callback'    => array( $this, 'hu_sanitize_hex_color' ),
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                //'transport'   => 'postMessage'
          ),
          'color-2' => array(
                'default'     => '#82b965',
                'control'     => 'WP_Customize_Color_Control',
                'label'       => __( 'Secondary Color' , 'hueman' ),
                'section'     => 'general_design_sec',
                'type'        =>  'color' ,
                'sanitize_callback'    => array( $this, 'hu_sanitize_hex_color' ),
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                //'transport'   => 'postMessage'
          ),
          'body-background' => array(
                //'default'     => array(),
                'default'       => array( 'background-color' => '#eaeaea' ),
                'control'     => 'HU_Body_Background_Control',
                'label'       => __( 'Body Background' , 'hueman' ),
                'description' => __('Set the website background color', 'hueman'),
                'section'     => 'general_design_sec',
                'type'        => 'czr_background' ,
                //'type'        => 'color',
                // 'sanitize_callback'    => array( $this, 'hu_sanitize_body_bg' ),@todo
                // 'sanitize_js_callback' => array( $this, 'hu_sanitize_js_body_bg' ),@todo
                //'transport'   => 'postMessage',
                //'notice'        => __('Set background color and/or upload your own background image.', 'hueman')
          ),
          'color-topbar' => array(
                'default'     => '#26272b',
                'control'     => 'WP_Customize_Color_Control',
                'label'       => __( 'Topbar Background' , 'hueman' ),
                'section'     => 'general_design_sec',
                'type'        =>  'color' ,
                'sanitize_callback'    => array( $this, 'hu_sanitize_hex_color' ),
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                'transport'   => 'postMessage'
          ),
          'color-header' => array(
                'default'     => '#33363b',
                'control'     => 'WP_Customize_Color_Control',
                'label'       => __( 'Header Background' , 'hueman' ),
                'section'     => 'general_design_sec',
                'type'        =>  'color' ,
                'sanitize_callback'    => array( $this, 'hu_sanitize_hex_color' ),
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                'transport'   => 'postMessage'
          ),
          'color-header-menu' => array(
                'default'     => '#33363b',
                'control'     => 'WP_Customize_Color_Control',
                'label'       => __( 'Header Menu Background' , 'hueman' ),
                'section'     => 'general_design_sec',
                'type'        =>  'color' ,
                'sanitize_callback'    => array( $this, 'hu_sanitize_hex_color' ),
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                'transport'   => 'postMessage'
          ),
          'color-footer' => array(
                'default'     => '#33363b',
                'control'     => 'WP_Customize_Color_Control',
                'label'       => __( 'Footer Background' , 'hueman' ),
                'section'     => 'general_design_sec',
                'type'        =>  'color' ,
                'sanitize_callback'    => array( $this, 'hu_sanitize_hex_color' ),
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                'transport'   => 'postMessage'
          ),
          'image-border-radius'  =>  array(
                'default'       => 0,
                'control'       => 'HU_controls' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'label'         => __( "Image Border Radius" , 'hueman' ),
                'section'       => 'general_design_sec' ,
                'type'          => 'number' ,
                'step'          => 1,
                'min'           => 0,
                //'transport'     => 'postMessage',
                'notice'        => __('Give your thumbnails and layout images rounded corners', 'hueman')
          )
      );
    }


    /*-----------------------------------------------------------------------------------------------------
                                   SOCIAL LINKS SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_social_links_sec() {
      return array(
          // 'social-links' => array(
          //       'default'   => array(),
          //       'control'   => 'HU_controls',
          //       'label'     => __('Responsive Layout', 'hueman'),
          //       'description' => __('Create and organize your social links' , 'hueman'),
          //       'section'   => 'social_links_sec',
          //       'type'      => 'dynamic'//@todo create dynamic type
          // )
          'social-links' => array(
                'default'   => array(),//empty array by default
                'control'   => 'HU_Customize_Socials',
                'label'     => __('Create and organize your social links', 'hueman'),
                'section'   => 'social_links_sec',
                'type'      => 'czr_socials',//@todo create dynamic type
                'transport' => 'postMessage',
                'priority'  => 10
          )
      );
    }

    /*-----------------------------------------------------------------------------------------------------
                                   COMMENTS SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_comments_sec() {
      return array(
          'post-comments' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Posts Comments', 'hueman'),
                'section'   => 'comments_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Comments on posts' , 'hueman' )
          ),
          'page-comments' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __('Pages Comments', 'hueman'),
                'section'   => 'comments_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Comments on pages' , 'hueman' )
          )
      );
    }


    /*-----------------------------------------------------------------------------------------------------
                                   MOBILE DEVICES SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_mobiles_sec() {
      return array(
          'responsive' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Enable the Mobile Friendly (or Responsive) layout', 'hueman'),
                'section'   => 'mobiles_sec',
                'type'      => 'checkbox',
                'notice'    => __( "Hueman is a mobile friendly WordPress theme out of the box. This means that it will adapt and render nicely on any devices : desktops, laptops, tablets, smartphones. <br/>If you uncheck this box, this adaptive (or reponsive) behaviour will not be working anymore. In most of the cases, you won't need to disable this option, and it is not recommended." , 'hueman' )
          )
      );
    }


    /*-----------------------------------------------------------------------------------------------------
                                   PERFORMANCE SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_performance_sec() {
      return array(
          'minified-css' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Use a minified stylesheet', 'hueman'),
                'section'   => 'performance_sec',
                'type'      => 'checkbox',
                'notice'    => __( "Unchecking this option is not recommended. Minifying css stylesheets improves performance for your website overall by decreasing the load time." , 'hueman' )
          ),
          'structured-data' => array(
                'default'   => hu_user_started_before_version( '3.1.1' ) ? 0 : 1,
                'control'   => 'HU_controls',
                'label'     => __('Use Structured Data Markup for your posts', 'hueman'),
                'section'   => 'performance_sec',
                'type'      => 'checkbox',
                'notice'    => __( '"Structured data markup" is a standard way to annotate your content so machines can understand it. Implementing it will help your website rank higher in search engines.' , 'hueman' )
          )
      );
    }


     /*-----------------------------------------------------------------------------------------------------
                                   ADMIN SETTINGS
    ------------------------------------------------------------------------------------------------------*/
    function hu_admin_sec() {
      return array(
          'about-page' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Display the "About Hueman" page in the "Appearance" admin menu', 'hueman'),
                'section'   => 'admin_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'This page is intended to provide informations about the Hueman theme : changelog, release note, documentation link. It also display informations about your current install that can be useful if you need to report an issue.' , 'hueman' )
          ),
          'help-button' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Display a Help button in the admin bar', 'hueman'),
                'section'   => 'admin_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'This button links to the "About Hueman" page.' , 'hueman' )
          )
      );
    }



    /******************************************************************************************************
    *******************************************************************************************************
    * PANEL : HEADER
    *******************************************************************************************************
    ******************************************************************************************************/
    /*-----------------------------------------------------------------------------------------------------
                                   HEADER DESIGN SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_header_design_sec() {
      global $wp_version;
      return array(
          'custom-logo'  => array(
                'control'   =>  version_compare( $wp_version, '4.3', '>=' ) ? 'HU_Customize_Cropped_Image_Control' : 'HU_Customize_Upload_Control',
                'label'     =>  __( 'Custom Header Logo' , 'hueman' ),
                'section'   => 'header_design_sec' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                //we can define suggested cropping area and allow it to be flexible (def 150x150 and not flexible)
                'width'     => 250,
                'height'    => 100,
                'flex_width' => true,
                'flex_height' => true,
                //to keep the selected cropped size
                'dst_width'  => false,
                'dst_height'  => false,
                'notice'    => __('Upload your custom logo image. Supported formats : .jpg, .png, .gif, svg, svgz' , 'hueman')
          ),
          'logo-max-height'  =>  array(
                'default'       => 60,
                'control'       => 'HU_controls' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'label'         => __( "Header Logo Image Max-height" , 'hueman' ),
                'section'       => 'header_design_sec' ,
                'type'          => 'number' ,
                'step'          => 1,
                'min'           => 20,
                'transport'     => 'postMessage',
                'notice'        => __('Your logo image should have the double height of this to be high resolution', 'hueman')
          ),
          'site-description' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Display your site's description (tagline)", 'hueman'),
                'section'   => 'header_design_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'The description that appears next to your logo' , 'hueman' )
          ),
          'header-image'  => array(
                'control'   =>  version_compare( $wp_version, '4.3', '>=' ) ? 'HU_Customize_Cropped_Image_Control' : 'HU_Customize_Upload_Control',
                'label'     =>  __( 'Header Image' , 'hueman' ),
                'section'   => 'header_design_sec' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'width'     => 1200,
                'height'    => 180,
                'flex_width' => true,
                'flex_height' => true,
                //to keep the selected cropped size
                'dst_width'  => false,
                'dst_height'  => false,
                'notice'    => __('Upload a header image (supported formats : .jpg, .png, .gif, svg, svgz). This will disable header title/logo, site description, header ads widget' , 'hueman')
          )
        );
    }


    /*-----------------------------------------------------------------------------------------------------
                                   Advertisement Widget SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_header_widget_sec() {
      return array(
          'header-ads' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Display a widget in your header", 'hueman'),
                'section'   => 'header_widget_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Header widget area, perfect to insert advertisements. Note : this feature is not available when a header image is being displayed.' , 'hueman')
          )
      );
    }



    /******************************************************************************************************
    *******************************************************************************************************
    * PANEL : MAIN CONTENT
    *******************************************************************************************************
    ******************************************************************************************************/

    /*-----------------------------------------------------------------------------------------------------
                                   CONTENT LAYOUT SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_content_layout_sec() {
      return array(
          'layout-global' => array(
                'default'   => 'col-3cm',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Global Layout', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices( 'global' ),
                'notice'    => __('Other layouts will override this option if they are set' , 'hueman')
          ),
          'layout-home' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Home', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_home</strong> ] Posts homepage layout' , 'hueman')
          ),
          'layout-single' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Single', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_single</strong> ] Single post layout - If a post has a set layout, it will override this.' , 'hueman')
          ),
          'layout-archive' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Archive', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_archive</strong> ] Category, date, tag and author archive layout' , 'hueman')
          ),
          'layout-archive-category' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Archive - Category', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_category</strong> ] Category archive layout' , 'hueman')
          ),
          'layout-search' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Search', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_search</strong> ] Search page layout' , 'hueman')
          ),
          'layout-404' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Error 404', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_404</strong> ] Error 404 page layout' , 'hueman')
          ),
          'layout-page' => array(
                'default'   => 'inherit',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Default Page', 'hueman'),
                'section'   => 'content_layout_sec',
                'type'      => 'czr_layouts',//@todo create a radio-image type
                'choices'   => $this -> hu_get_content_layout_choices(),
                'notice'    => __('[ <strong>is_page</strong> ] Default page layout - If a page has a set layout, it will override this.' , 'hueman')
          ),
      );
    }


    /*-----------------------------------------------------------------------------------------------------
                                   BLOG CONTENT SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_content_blog_sec() {
      return array(
          'blog-heading-enabled' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Display a custom heading for your blog.", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'checkbox'
          ),
          'blog-heading' => array(
                'default'   => get_bloginfo('name'),
                'control'   => 'HU_controls',
                'label'     => __( 'Blog Heading', 'hueman'),
                'type'      => 'text',
                'section'   => 'content_blog_sec',
                'notice'    => __( 'Your blog heading. Html is allowed. Note : write a blank space to hide the default content.', 'hueman'),
                'sanitize_callback' => array( $this, 'hu_sanitize_html_text_input' )
          ),
          'blog-subheading' => array(
                'default'   => __( 'Blog', 'hueman'),
                'control'   => 'HU_controls',
                'label'     => __( 'Blog Sub-Heading', 'hueman'),
                'type'      => 'text',
                'section'   => 'content_blog_sec',
                'notice'    => __( 'Your blog sub-heading. Html is allowed. Note : write a blank space to hide the default content.', 'hueman'),
                'sanitize_callback' => array( $this, 'hu_sanitize_html_text_input' )
          ),
          'excerpt-length'  =>  array(
                'default'   => 34,
                'control'   => 'HU_controls' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'label'     => __( "Excerpt Length" , 'hueman' ),
                'section'   => 'content_blog_sec' ,
                'type'      => 'number' ,
                'step'      => 1,
                'min'       => 0,
                //'transport' => 'postMessage',
                'notice'    => __( "Set the excerpt length (in number of words)" , "hueman" ),
          ),
          'blog-standard' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __("Display your blog post as a standard list.", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'While the default blog design is a grid of posts, you can check this option and display one post per row, whith the thumbnail beside the text.' , 'hueman')
          ),
          'featured-posts-enabled' => array(
                'default'   => 1,
                'title'       => __( 'Featured posts', 'hueman' ),
                'control'   => 'HU_controls',
                'label'     => __("Feature posts on top of your blog", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Check this box to display a selection of posts with a slideshow, on top of your blog.' , 'hueman')
          ),
          'featured-category' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __("Select a category to feature", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'select',//@todo create a simple cat picker with select type. => evolve to multipicker? Retrocompat ?
                'choices'   => $this -> hu_get_the_cat_list(),
                'notice'    => __( 'If no specific category is selected, the featured posts block will display your latest post(s) from all categories.' , 'hueman')
          ),
          'featured-posts-count'  =>  array(
                'default'   => 1,
                'control'   => 'HU_controls' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'label'     => __( "Featured Post Count" , 'hueman' ),
                'section'   => 'content_blog_sec' ,
                'type'      => 'number' ,
                'step'      => 1,
                'min'       => 0,
                //'transport' => 'postMessage',
                'notice'    => __( "Max number of featured posts to display. <br /><i>Set to 1 and it will show it without any slider script</i><br /><i>Set it to 0 to disable</i>" , "hueman" ),//@todo sprintf split translation
          ),
          'featured-posts-full-content' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __("Display the full post content", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'By default, your featured posts display the first words of their content ( the "excerpt"). Check this box to display the full content.' , 'hueman')
          ),
          'featured-slideshow' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __("Animate your featured posts with a slideshow", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Enables the automatic animation of the featured posts carousel.' , 'hueman')
          ),
          'featured-slideshow-speed'  =>  array(
                'default'   => 5000,
                'control'   => 'HU_controls' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                'label'     => __( "Featured Slideshow Speed" , 'hueman' ),
                'section'   => 'content_blog_sec' ,
                'type'      => 'number' ,
                'step'      => 500,
                'min'       => 500,
                'transport' => 'postMessage',
                'notice'    => __( "Speed of the automatic slideshow animation" , "hueman" ),//@todo sprintf split translation
          ),
          'featured-posts-include' => array(
                'default'   => 0,
                'control'   => 'HU_controls',
                'label'     => __("Display the featured posts also in the list of posts", 'hueman'),
                'section'   => 'content_blog_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'If this box is checked, your featured posts will be displayed both in the featured slider and in the post list below. Usually not recommended because a given post might appear two times on the same page.' , 'hueman')//@todo sprintf split translation
          )
      );
    }



    /*-----------------------------------------------------------------------------------------------------
                                   SINGLE POSTS SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_content_single_sec() {
      return array(
          'author-bio' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Single - Author Bio", 'hueman'),
                'section'   => 'content_single_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Display post author description, if it exists' , 'hueman')
          ),
          'related-posts' => array(
                'default'   => 'categories',
                'control'   => 'HU_controls',
                'label'     => __("Single - Related Posts", 'hueman'),
                'section'   => 'content_single_sec',
                'type'      => 'select',//@todo create a radio type
                'choices' => array(
                  '1'           => __( 'Disable' , 'hueman' ),
                  'categories'  => __( 'Related by categories' , 'hueman' ),
                  'tags'        => __( 'Related by tags' , 'hueman' )
                ),
                'notice'    => __( 'Display randomized related articles below the post' , 'hueman')
          ),
          'post-nav' => array(
                'default'   => 's1',
                'control'   => 'HU_controls',
                'label'     => __("Single - Post Navigation", 'hueman'),
                'section'   => 'content_single_sec',
                'type'      => 'select',//@todo create a radio type
                'choices' => array(
                  '1'           => __( 'Disable' , 'hueman' ),
                  's1'          => __( 'Left Sidebar' , 'hueman' ),
                  's2'          => __( 'Right Sidebar' , 'hueman' ),
                  'content'     => __( 'Below content' , 'hueman' )
                ),
                'notice'    => __( 'Display links to the next and previous article' , 'hueman')
          )
        );
    }


    /*-----------------------------------------------------------------------------------------------------
                                   THUMBNAIL SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_content_thumbnail_sec() {
      return array(
          'placeholder' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Thumbnail Placeholder", 'hueman'),
                'section'   => 'content_thumbnail_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Display featured image placeholders if no featured image is set' , 'hueman')
          ),
          'comment-count' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Thumbnail Comment Count", 'hueman'),
                'section'   => 'content_thumbnail_sec',
                'type'      => 'checkbox',
                'notice'    => __( 'Display comment count on thumbnails' , 'hueman')
          )
        );
    }




    /******************************************************************************************************
    *******************************************************************************************************
    * PANEL : SIDEBARS
    *******************************************************************************************************
    ******************************************************************************************************/
    /*-----------------------------------------------------------------------------------------------------
                                SIDEBAR DESIGN AND MOBILE SETTINGS SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_sidebars_design_sec() {
      return array(
          'sidebar-top' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __('Sidebar Top Boxes', 'hueman'),
                'section'   => 'sidebars_design_sec',
                'type'      => 'checkbox',
                'notice'    => __('Display boxes at the top of the sidebars' , 'hueman')
          ),
          'mobile-sidebar-hide' => array(
                'default'   => '1',
                'control'   => 'HU_controls',
                'label'     => __('Mobile Sidebar Content', 'hueman'),
                'section'   => 'sidebars_design_sec',
                'type'      => 'select',//@todo create a radio type
                'choices' => array(
                  '1'           => __( 'Display both sidebars' , 'hueman' ),
                  's1'          => __( 'Hide primary sidebar' , 'hueman' ),
                  's2'          => __( 'Hide secondary sidebar' , 'hueman' ),
                  's1-s2'       => __( 'Hide both sidebars' , 'hueman' )
                ),
                'notice'    => __('Control how the sidebar content is displayed on smartphone mobile devices (320px). Note : on smartphones the sidebars are displayed below the content.' , 'hueman')
          )
      );
    }




    /******************************************************************************************************
    *******************************************************************************************************
    * PANEL : FOOTER
    *******************************************************************************************************
    ******************************************************************************************************/

    /*-----------------------------------------------------------------------------------------------------
                                  FOOTER DESIGN SECTION
    ------------------------------------------------------------------------------------------------------*/
    function hu_footer_design_sec() {
      global $wp_version;
      return array(
          'footer-ads' => array(
                'default'   => 1,
                'control'   => 'HU_controls',
                'label'     => __("Display a full width widget area in your footer", 'hueman'),
                'section'   => 'footer_design_sec',
                'type'      => 'checkbox',
                'notice'    => __('This zone is located before the other footer widgets and takes 100% of the width. Very appropriate to display a Google Map or an advertisement banner.', 'hueman')
          ),
          'footer-widgets' => array(
                'default'   => '0',
                'control'   => 'HU_Customize_Layout_Control',
                'label'     => __('Select columns to enable footer widgets', 'hueman'),
                'section'   => 'footer_design_sec',
                'type'      => 'czr_layouts',
                'choices'   => $this -> hu_get_footer_layout_choices(),
                'notice'    => __('Recommended number of columns : 3' , 'hueman')
          ),
          'footer-logo'  => array(
                'control'   =>  version_compare( $wp_version, '4.3', '>=' ) ? 'HU_Customize_Cropped_Image_Control' : 'HU_Customize_Upload_Control',
                'label'     =>  __( 'Upload your custom logo image' , 'hueman' ),
                'section'   => 'footer_design_sec' ,
                'sanitize_callback' => array( $this , 'hu_sanitize_number' ),
                //we can define suggested cropping area and allow it to be flexible (def 150x150 and not flexible)
                'width'     => 250,
                'height'    => 100,
                'flex_width' => true,
                'flex_height' => true,
                //to keep the selected cropped size
                'dst_width'  => false,
                'dst_height'  => false,
                'notice'    => __('Upload your custom logo image. Supported formats : .jpg, .png, .gif, svg, svgz' , 'hueman')
          ),
          'copyright' => array(
                'control'   => 'HU_controls',
                'default'   => '',
                'label'     => __( 'Replace the footer copyright text', 'hueman'),
                'type'      => 'text',
                'section'   => 'footer_design_sec',
                'sanitize_callback' => array( $this, 'hu_sanitize_html_text_input' ),
                'notice'    => __( 'Note : Html is allowed.', 'hueman')
          ),
          'credit' => array(
                'control'   => 'HU_controls',
                'default'   => 1,
                'label'     => __( 'Footer credit text', 'hueman'),
                'type'      => 'checkbox',
                'section'   => 'footer_design_sec',
                'transport' => 'postMessage'
          ),
      );
    }




    /******************************************************************************************************
    *******************************************************************************************************
    * PANEL : ADVANCED OPTIONS
    *******************************************************************************************************
    ******************************************************************************************************/
    /*-----------------------------------------------------------------------------------------------------
                                   CUSTOM CSS SECTION
    ------------------------------------------------------------------------------------------------------*/




    /***************************************************************
    * POPULATE PANELS
    ***************************************************************/
    /**
    * hook : hu_add_panel_map
    * @return  associative array of customizer panels
    */
    function hu_popul_panels_map( $panel_map ) {
      $_new_panels = array(
        'hu-general-panel' => array(
                  'priority'       => 10,
                  'capability'     => 'edit_theme_options',
                  'title'          => __( 'Global settings' , 'hueman' ),
                  'description'    => __( "General settings for the Hueman theme : design, comments, mobile, ..." , 'hueman' )
        ),
        'hu-header-panel' => array(
                  'priority'       => 20,
                  'capability'     => 'edit_theme_options',
                  'title'          => __( 'Header' , 'hueman' ),
                  'description'    => __( "Header settings for the Hueman theme." , 'hueman' )
        ),
        'hu-content-panel' => array(
                  'priority'       => 30,
                  'capability'     => 'edit_theme_options',
                  'title'          => __( 'Content' , 'hueman' ),
                  'description'    => __( "Content settings for the Hueman theme." , 'hueman' )
        ),
        'hu-sidebars-panel' => array(
                  'priority'       => 30,
                  'capability'     => 'edit_theme_options',
                  'title'          => __( 'Sidebars' , 'hueman' ),
                  'description'    => __( "Sidebars settings for the Hueman theme." , 'hueman' )
        ),
        'hu-footer-panel' => array(
                  'priority'       => 40,
                  'capability'     => 'edit_theme_options',
                  'title'          => __( 'Footer' , 'hueman' ),
                  'description'    => __( "Footer settings for the Hueman theme." , 'hueman' )
        ),
        'hu-advanced-panel' => array(
                  'priority'       => 1000,
                  'capability'     => 'edit_theme_options',
                  'title'          => __( 'Advanced options' , 'hueman' ),
                  'description'    => __( "Advanced settings for the Hueman theme." , 'hueman' )
        )
      );
      return array_merge( $panel_map, $_new_panels );
    }





    /***************************************************************
    * POPULATE REMOVE SECTIONS
    ***************************************************************/
    /**
     * removes default WP sections
     * hook : hu_remove_section_map
     */
    function hu_popul_remove_section_map( $_sections ) {
      //customizer option array
      $remove_section = array(
        'static_front_page' ,
        'nav',
        'title_tagline'
      );
      return array_merge( $_sections, $remove_section );
    }



    /***************************************************************
    * HANDLES THE THEME SWITCHER (since WP 4.2)
    ***************************************************************/
    /**
    * Print the themes section (themes switcher) when previewing the themes from wp-admin/themes.php
    * hook : hu_remove_section_map
    */
    function hu_set_theme_switcher_visibility( $_sections) {
      //Don't do anything is in preview frame
      //=> because once the preview is ready, a postMessage is sent to the panel frame to refresh the sections and panels
      //Do nothing if WP version under 4.2
      global $wp_version;
      if ( hu_is_customize_preview_frame() || ! version_compare( $wp_version, '4.2', '>=') )
        return $_sections;

      //when user access the theme switcher from the admin bar
      $_theme_switcher_requested = false;
      if ( isset( $_GET['autofocus'] ) ) {
        $autofocus = wp_unslash( $_GET['autofocus'] );
        if ( is_array( $autofocus ) && isset($autofocus['section']) ) {
          $_theme_switcher_requested = 'themes' == $autofocus['section'];
        }
      }

      if ( isset($_GET['theme']) || ! is_array($_sections) || $_theme_switcher_requested )
        return $_sections;

      array_push( $_sections, 'themes');
      return $_sections;
    }




    /***************************************************************
    * POPULATE SECTIONS
    ***************************************************************/
    /**
    * hook : hu_add_section_map
    */
    function hu_popul_section_map( $_sections ) {
      //For nav menus option
      $locations      = get_registered_nav_menus();
      $menus          = wp_get_nav_menus();
      $num_locations  = count( array_keys( $locations ) );
      global $wp_version;
      $nav_section_desc =  sprintf( _n('Your theme supports %s menu. Select which menu you would like to use.', 'Your theme supports %s menus. Select which menu appears in each location.', $num_locations, 'hueman' ), number_format_i18n( $num_locations ) );
      //adapt the nav section description for v4.3 (menu in the customizer from now on)
      if ( version_compare( $wp_version, '4.3', '<' ) ) {
        $nav_section_desc .= "<br/>" . sprintf( __("You can create new menu and edit your menu's content %s." , "hueman"),
          sprintf( '<strong><a href="%1$s" target="_blank" title="%3$s">%2$s &raquo;</a></strong>',
            admin_url('nav-menus.php'),
            __("on the Menus screen in the Appearance section" , "hueman"),
            __("create/edit menus", "hueman")
          )
        );
      } else {
        $nav_section_desc .= "<br/>" . sprintf( __("You can create new menu and edit your menu's content %s." , "hueman"),
          sprintf( '<strong><a href="%1$s" title="%3$s">%2$s &raquo;</a><strong>',
            "javascript:wp.customize.section('nav').container.find('.customize-section-back').trigger('click'); wp.customize.panel('nav_menus').focus();",
            __("in the menu panel" , "hueman"),
            __("create/edit menus", "hueman")
          )
        );
      }

      $nav_section_desc .= "<br/><br/>". __( 'If a menu location has no menu assigned to it, a default page menu will be used.', 'hueman');

      $_new_sections = array(
        /*---------------------------------------------------------------------------------------------
        -> PANEL : GENERAL
        ----------------------------------------------------------------------------------------------*/
        //the title_tagline section holds the default WP setting for the Site Title and the Tagline
        //This section has been previously removed from its initial location and is added back here
        'title_tagline'         => array(
              'title'    => __( 'Site Identity : Title, Tagline and Site Icon', 'hueman' ),
              'priority' => 10,
              'panel'   => 'hu-general-panel'
        ),
        'general_design_sec'         => array(
              'title'    => __( 'General Design Options : Font, Colors, ...', 'hueman' ),
              'priority' => 20,
              'panel'   => 'hu-general-panel'
        ),
        'social_links_sec'         => array(
              'title'    => __( 'Social links', 'hueman' ),
              'priority' => 30,
              'panel'   => 'hu-general-panel'
        ),
        'comments_sec'         => array(
              'title'    => __( 'Comments', 'hueman' ),
              'priority' => 40,
              'panel'   => 'hu-general-panel'
        ),
        'mobiles_sec'         => array(
              'title'    => __( 'Mobile devices', 'hueman' ),
              'priority' => 50,
              'panel'   => 'hu-general-panel'
        ),
        'performance_sec'         => array(
              'title'    => __( 'Performances and SEO', 'hueman' ),
              'priority' => 60,
              'panel'   => 'hu-general-panel'
        ),
        'admin_sec'         => array(
              'title'    => __( 'Hueman Admin Settings', 'hueman' ),
              'priority' => 60,
              'panel'   => 'hu-general-panel'
        ),



        /*---------------------------------------------------------------------------------------------
        -> PANEL : HEADER
        ----------------------------------------------------------------------------------------------*/
        'header_design_sec'         => array(
              'title'    => __( 'Header Design : logo, background, ...', 'hueman' ),
              'priority' => 10,
              'panel'   => 'hu-header-panel'
        ),
        'header_widget_sec'         => array(
              'title'    => __( 'Header Advertisement Widget', 'hueman' ),
              'priority' => 20,
              'panel'   => 'hu-header-panel'
        ),


        /*---------------------------------------------------------------------------------------------
        -> PANEL : CONTENT
        ----------------------------------------------------------------------------------------------*/
        'content_layout_sec'         => array(
              'title'    => __( 'Layout options for the main content', 'hueman' ),
              'priority' => 10,
              'panel'   => 'hu-content-panel'
        ),
        'sidebars_design_sec'         => array(
              'title'    => __( 'Sidebars : Design and Mobile Settings', 'hueman' ),
              'priority' => 20,
              'panel'   => 'hu-content-panel'
        ),
        'content_blog_sec'         => array(
              'title'    => __( 'Blog Design and Content', 'hueman' ),
              'priority' => 30,
              'panel'   => 'hu-content-panel'
        ),
        'content_single_sec'         => array(
              'title'    => __( 'Single Posts Settings', 'hueman' ),
              'priority' => 40,
              'panel'   => 'hu-content-panel'
        ),
        'content_thumbnail_sec'         => array(
              'title'    => __( 'Thumbnails Settings', 'hueman' ),
              'priority' => 40,
              'panel'   => 'hu-content-panel'
        ),

        /*---------------------------------------------------------------------------------------------
        -> PANEL : FOOTER
        ----------------------------------------------------------------------------------------------*/
        'footer_design_sec'         => array(
              'title'    => __( 'Footer Design : Logo, layout, ...', 'hueman' ),
              'priority' => 10,
              'panel'   => 'hu-footer-panel'
        )

      );
      return array_merge( $_sections, $_new_sections );
    }






    /***************************************************************
    * CONTROLS HELPERS
    ***************************************************************/
    function hu_get_fonts() {
      return apply_filters(
        'hu_fonts',
        array(
          'titillium-web'       => 'Titillium Web, Latin (Self-hosted)',
          'titillium-web-ext'   => 'Titillium Web, Latin-Ext',
          'droid-serif'         => 'Droid Serif, Latin',
          'source-sans-pro'     => 'Source Sans Pro, Latin-Ext',
          'lato'                => 'Lato, Latin',
          'raleway'             => 'Raleway, Latin',
          'ubuntu'              => 'Ubuntu, Latin-Ext',
          'ubuntu-cyr'          => 'Ubuntu, Latin / Cyrillic-Ext',
          'roboto-condensed'    => 'Roboto Condensed, Latin-Ext',
          'roboto-condensed-cyr' => 'Roboto Condensed, Latin / Cyrillic-Ext',
          'roboto-slab'         => 'Roboto Slab, Latin-Ext',
          'roboto-slab-cyr'     => 'Roboto Slab, Latin / Cyrillic-Ext',
          'playfair-display'    => 'Playfair Display, Latin-Ext',
          'playfair-display-cyr' => 'Playfair Display, Latin / Cyrillic',
          'open-sans'           => 'Open Sans, Latin-Ext',
          'open-sans-cyr'       => 'Open Sans, Latin / Cyrillic-Ext',
          'pt-serif'            => 'PT Serif, Latin-Ext',
          'pt-serif-cyr'        => 'PT Serif, Latin / Cyrillic-Ext',
          'arial'               => 'Arial',
          'georgia'             => 'Georgia',
          'verdana'             => 'Verdana',
          'tahoma'              => 'Tahoma'
        )
      );
    }


    /*
    * @return array() of cat
    */
    function hu_get_the_cat_list() {
      $list = array(
        "0" => sprintf('-- %1$s --', __('Choose one ', 'hueman') )
      );
      foreach ( get_categories() as $key => $cat) {
        $_id = $cat -> term_id;
        $list[$_id] = $cat -> name;
      }
      return $list;
    }



    /*
    * @return array() of layouts
    * adds an 'inherit' item if requested is not global
    */
    function hu_get_content_layout_choices( $_wot = null ) {
      $_layouts = array(
        'col-1c' => array(
          'src' => get_template_directory_uri() . '/assets/admin/img/col-1c.png',
          'label' => __( '1 Column' , 'hueman' )
        ),
        'col-2cl'=> array(
          'src' => get_template_directory_uri() . '/assets/admin/img/col-2cl.png',
          'label' => __( '2 Columns - Content Left' , 'hueman' )
        ),
        'col-2cr'=> array(
          'src' => get_template_directory_uri() . '/assets/admin/img/col-2cr.png',
          'label' => __( '2 Columns - Content Right' , 'hueman' )
        ),
        'col-3cm'=> array(
          'src' => get_template_directory_uri() . '/assets/admin/img/col-3cm.png',
          'label' => __( '3 Columns - Content Middle' , 'hueman' )
        ),
        'col-3cl'=> array(
          'src' => get_template_directory_uri() . '/assets/admin/img/col-3cl.png',
          'label' => __( '3 Columns - Content Left' , 'hueman' )
        ),
        'col-3cr'=> array(
          'src' => get_template_directory_uri() . '/assets/admin/img/col-3cr.png',
          'label' => __( '3 Columns - Content Right' , 'hueman' )
        )
      );
      if ( 'global' != $_wot )
        return array_merge(
          array(
            'inherit' => array(
              'src' => get_template_directory_uri() . '/assets/admin/img/layout-off.png',
              'label' => __( 'Inherit Global Layout' , 'hueman' )
            )
          ),
          $_layouts
        );
      return $_layouts;
    }



    /*
    * @return array() of layouts
    * adds an 'inherit' item if requested is not global
    */
    function hu_get_footer_layout_choices( $_wot = null ) {
      $_layouts = array(
        '0' => array(
          'src' => get_template_directory_uri() . '/assets/admin/img/footer-widgets-0.png',
          'label' => __( 'Disable' , 'hueman' )
        ),
        '1' => array(
          'src' => get_template_directory_uri() . '/assets/admin/img/footer-widgets-1.png',
          'label' => __( '1 Column' , 'hueman' )
        ),
        '2' => array(
          'src' => get_template_directory_uri() . '/assets/admin/img/footer-widgets-2.png',
          'label' => __( '2 Columns' , 'hueman' )
        ),
        '3' => array(
          'src' => get_template_directory_uri() . '/assets/admin/img/footer-widgets-3.png',
          'label' => __( '3 Columns' , 'hueman' )
        ),
        '4' => array(
          'src' => get_template_directory_uri() . '/assets/admin/img/footer-widgets-4.png',
          'label' => __( '4 Columns' , 'hueman' )
        ),
      );

      return $_layouts;
    }


    /*
    * @return array() of registered sidebars : id => label
     */
    /* DEPRECATED */
    function hu_get_widget_areas() {
      global $wp_registered_sidebars;

      $sidebars = array();
      foreach( $wp_registered_sidebars as $id => $sidebar ) {
        $sidebars[ $id ] = $sidebar[ 'name' ];
      }

      $sidebars = apply_filters( 'hu_authorized_sidebars', $sidebars );
      $_to_return = array();

      //return no sidebars if empty
      if ( ! count( $sidebars ) ) {
        $_to_return['no-sidebars'] = '-- ' . __( 'No Sidebars', 'hueman' )  . ' --';
        return $_to_return;
      }

      //else populate the array
      $_to_return[] = '-- ' . __( 'Choose Sidebar', 'hueman' ) . ' --';

      foreach ( $sidebars as $id => $sidebar ) {
        $id = esc_attr( $id );
        $_to_return[$id] = esc_attr( $sidebar );
      }

      return $_to_return;
    }




    /***************************************************************
    * SANITIZATION HELPERS
    ***************************************************************/
    /**
     * adds sanitization callback funtion : textarea
     * @package Hueman
     * @since Hueman 3.3.0
     */
    function hu_sanitize_textarea( $value) {
      return esc_html( $value);
    }


    /**
     * adds sanitization callback for input including html
     * @package Hueman
     * @since Hueman 3.3.0
     */
    function hu_sanitize_html_text_input( $value) {
      return wp_kses_post( force_balance_tags( $value ) );
    }


    /**
     * adds sanitization callback funtion : number
     * @package Hueman
     * @since Hueman 3.3.0
     */
    function hu_sanitize_number( $value) {
      if ( ! $value || is_null($value) )
        return $value;
      $value = esc_attr( $value); // clean input
      $value = (int) $value; // Force the value into integer type.
        return ( 0 < $value ) ? $value : null;
    }




    /**
     * adds sanitization callback funtion : url
     * @package Hueman
     * @since Hueman 3.3.0
     */
    function hu_sanitize_url( $value) {
      return esc_url( $value);
    }

    /**
     * adds sanitization callback funtion : email
     * @package Hueman
     * @since Hueman 3.3.0
     */
    function hu_sanitize_email( $value) {
      return sanitize_email( $value );
    }









    /********************************************************************************************
    ************ TEMPORARY
    *********************************************************************************************/
    //temporary fix for the background color before final move in the customizer
    function hu_sanitize_bg_color( $value ) {
      if ( is_array($value) ) {
        $color = isset($color['body-background']) ? $color['body-background'] : '#eaeaea';
      }
      if ( $unhashed = sanitize_hex_color_no_hash( $color ) )
        return '#' . $unhashed;

      return $color;
    }


    /**
     * Ensures that any hex color is properly hashed.
     * Otherwise, returns value untouched.
     *
     * This method should only be necessary if using sanitize_hex_color_no_hash().
     *
     * @since 3.4.0
     *
     * @param string $color
     * @return string
     */
    function hu_sanitize_js_body_bg( $color ) {
      if ( is_array($color) ) {
        $color = isset($color['body-background']) ? $color['body-background'] : '#eaeaea';
      }
      if ( $unhashed = sanitize_hex_color_no_hash( $color ) )
        return '#' . $unhashed;

      return $color;
    }

    /********************************************************************************************
    ************ / TEMPORARY
    *********************************************************************************************/
















    /**
     * adds sanitization callback funtion : colors
     * @package Hueman
     * @since Hueman 3.3.0
     */
    function hu_sanitize_hex_color( $color ) {
      if ( $unhashed = sanitize_hex_color_no_hash( $color ) )
        return '#' . $unhashed;

      return $color;
    }


    /**
    * Change upload's path to relative instead of absolute
    * @package Hueman
    * @since Hueman 3.3.0
    */
    function hu_sanitize_uploads( $url ) {
      $upload_dir = wp_upload_dir();
      return str_replace($upload_dir['baseurl'], '', $url);
    }

  }//end of class
endif;
