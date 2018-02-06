<?php
/* ------------------------------------------------------------------------- *
 *  Admin panel functions
/* ------------------------------------------------------------------------- */

/*  Post formats script
/* ------------------------------------ */
if ( ! function_exists( 'hu_post_formats_script' ) ) {

  function hu_post_formats_script( $hook ) {
    // Only load on posts, pages
    if ( !in_array($hook, array('post.php','post-new.php')) )
      return;
    wp_enqueue_script('post-formats', get_template_directory_uri() . '/assets/admin/js/post-formats.js', array( 'jquery' ));
  }

}
add_action( 'admin_enqueue_scripts', 'hu_post_formats_script');


/* ------------------------------------------------------------------------- *
 *  Loads and instanciates admin pages related classes
/* ------------------------------------------------------------------------- */
if ( is_admin() && ! hu_is_customizing() ) {
    if ( ! defined( 'HU_IS_PRO' ) || ! HU_IS_PRO ) {
        //Update notice
        load_template( get_template_directory() . '/functions/admin/class-admin-update-notification.php' );
        new HU_admin_update_notification;
    }
    if ( hu_is_checked('about-page') ) {
      load_template( get_template_directory() . '/functions/admin/class-admin-page.php' );
      new HU_admin_page;
    }
}

add_action( 'admin_init' , 'hu_admin_style' );
add_action( 'wp_before_admin_bar_render', 'hu_add_help_button' );

function hu_admin_style() {
  wp_enqueue_style(
    'hu-admincss',
    sprintf('%1$sassets/admin/css/hu_admin.css' , HU_BASE_URL ),
    array(),
    ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER
  );
}


function hu_add_help_button() {
   if ( ! current_user_can( 'edit_theme_options' ) || ! hu_is_checked('help-button') || ! hu_is_checked('about-page') )
    return;
  global $wp_admin_bar;
  $wp_admin_bar->add_menu( array(
     'parent' => 'top-secondary', // Off on the right side
     'id' => 'tc-hueman-help' ,
     'title' =>  __( '' , 'hueman' ),
     'href' => admin_url( 'themes.php?page=welcome.php&help=true' ),
     'meta'   => array(
        'title'  => __( 'Need help with the Hueman theme ? Click here!', 'hueman' ),
      ),
   ));
}


/* ------------------------------------------------------------------------- *
 *  Loads Required Plugin Class and Setup
/* ------------------------------------------------------------------------- */
if ( ! HU_IS_PRO_ADDONS && ! HU_IS_PRO && is_admin() && ! hu_is_customizing() ) {
    /**
    * Include the TGM_Plugin_Activation class.
    */
    load_template( get_template_directory() . '/functions/admin/class-tgm-plugin-activation.php' );
    add_action( 'tgmpa_register', 'hu_register_required_plugins' );
}


/**
 * Register the required plugins for this theme.
 *
 * In this example, we register two plugins - one included with the TGMPA library
 * and one from the .org repo.
 *
 * The variable passed to tgmpa_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into tgmpa_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */
function hu_register_required_plugins() {

  /**
   * Array of plugin arrays. Required keys are name and slug.
   * If the source is NOT from the .org repo, then source is also required.
   */
  $plugins = array(

    // This is an example of how to include a plugin pre-packaged with a theme
    // array(
    //   'name'            => 'TGM Example Plugin', // The plugin name
    //   'slug'            => 'tgm-example-plugin', // The plugin slug (typically the folder name)
    //   'source'          => get_stylesheet_directory() . '/lib/plugins/tgm-example-plugin.zip', // The plugin source
    //   'required'        => true, // If false, the plugin is only 'recommended' instead of required
    //   'version'         => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
    //   'force_activation'    => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
    //   'force_deactivation'  => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
    //   'external_url'      => '', // If set, overrides default API URL and points to an external URL
    // ),

    // This is an example of how to include a plugin from the WordPress Plugin Repository
    array(
      'name'    => 'Hueman Addons',
      'slug'    => 'hueman-addons',
      'required'  => false,
    ),

  );


  /**
   * Array of configuration settings. Amend each line as needed.
   * If you want the default strings to be available under your own theme domain,
   * leave the strings uncommented.
   * Some of the strings are added into a sprintf, so see the comments at the
   * end of each line for what each argument will be.
   */
  $config = array(
      'id'           => 'hueman',                 // Unique ID for hashing notices for multiple instances of TGMPA.
      'default_path' => '',                      // Default absolute path to bundled plugins.
      'menu'         => 'tgmpa-install-plugins', // Menu slug.
      'has_notices'  => true,                    // Show admin notices or not.
      'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
      'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
      'is_automatic' => false,                   // Automatically activate plugins after installation or not.
      'message'      => '',                      // Message to output right before the plugins table.
      'message'       => '',              // Message to output right before the plugins table
      'strings'         => array(
          'page_title'                            => __( 'Install Required Plugins', 'hueman' ),
          'menu_title'                            => __( 'Install Plugins', 'hueman' ),
          'installing'                            => __( 'Installing Plugin: %s', 'hueman' ), // %1$s = plugin name
          'oops'                                  => __( 'Something went wrong with the plugin API.', 'hueman' ),
          'notice_can_install_required'           => _n_noop( 'The Hueman theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_can_install_recommended'      => _n_noop( 'The Hueman theme recommends the Hueman Addons: %1$s.', 'This theme recommends the following plugins: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'hueman' ), // %1$s = plugin name(s)
          'notice_can_activate_required'          => _n_noop( 'The Hueman Addons required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_can_activate_recommended'     => _n_noop( 'The Hueman Addons plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'hueman' ), // %1$s = plugin name(s)
          'notice_ask_to_update'            => _n_noop( 'The Hueman Addons plugin needs to be updated to its latest version to ensure maximum compatibility with the Hueman theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'hueman' ), // %1$s = plugin name(s)
          'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'hueman' ), // %1$s = plugin name(s)
          'install_link'                  => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'hueman' ),
          'activate_link'                 => _n_noop( 'Activate Hueman Addons', 'Activate installed plugins', 'hueman' ),
          'return'                                => __( 'Return to Required Plugins Installer', 'hueman' ),
          'plugin_activated'                      => __( 'Plugin activated successfully.', 'hueman' ),
          'complete'                  => __( 'All plugins installed and activated successfully. %s', 'hueman' ), // %1$s = dashboard link
          'nag_type'                  => 'updated' // Determines admin notice type - can only be 'updated' or 'error'
      )
  );

  tgmpa( $plugins, $config );

}




/* ------------------------------------------------------------------------- *
 *  Initialize the meta boxes.
/* ------------------------------------------------------------------------- */
//Managing plugins on jetpack's wordpress.com dashboard fix
//https://github.com/presscustomizr/hueman/issues/541
//For some reason admin_init is fired but is_admin() returns false
//so some required OT admin files are not loaded:
//see OT_Loader::admin_includes() : it returns if not is_admin()
if ( is_admin() ) {
    add_action( 'admin_init', 'hu_custom_meta_boxes' );
}

function hu_custom_meta_boxes() {

    /*  Custom meta boxes
    /* ------------------------------------ */
    $page_options = array(
      'id'          => 'page-options',
      'title'       => 'Page Options',
      'desc'        => '',
      'pages'       => array( 'page' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'   => 'Heading',
          'id'    => '_heading',
          'type'    => 'text'
        ),
        array(
          'label'   => 'Subheading',
          'id'    => '_subheading',
          'type'    => 'text'
        ),
        array(
          'label'   => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the primary sidebar.', 'hueman'), __('Notes : 1)This will override any default settings of the customizer options panel. 2) The primary sidebar is placed on the left in a 3 columns layout. It can be on the right in a 2 columns layout, when the content is on the left.', 'hueman') ),
          'id'    => '_sidebar_primary',
          'type'    => 'sidebar-select',
          'desc'    => ''
        ),
        array(
          'label'   => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the secondary sidebar.', 'hueman'), __('Notes : 1)This will override any default settings of the customizer options panel. 2) The secondary sidebar is placed on the right in a 3 columns layout.', 'hueman') ),
          'id'    => '_sidebar_secondary',
          'type'    => 'sidebar-select',
          'desc'    => ''
        )
      )
    );

    $post_options = array(
      'id'          => 'post-options',
      'title'       => 'Post Options',
      'desc'        => '',
      'pages'       => apply_filters( 'hu_custom_meta_boxes_post_options_in', array( 'post') ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'    => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the left sidebar.', 'hueman'), __('This will override any default settings of the customizer options panel.', 'hueman') ),
          'id'    => '_sidebar_primary',
          'type'    => 'sidebar-select',
          'desc'    => ''
        ),
        array(
          'label'    => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a widget zone for the right sidebar.', 'hueman'), __('This will override any default settings of the customizer options panel.', 'hueman') ),
          'id'    => '_sidebar_secondary',
          'type'    => 'sidebar-select',
          'desc'    => ''
        )
      )
    );


    if ( apply_filters( 'hu_enable_singular_layout_meta_box', true ) ) {
      $post_options['fields'][] = array(
          'label'   => 'Layout',
          'id'    => '_layout',
          'type'    => 'radio-image',
          'desc'    => 'Overrides the default layout option',
          'std'   => 'inherit',
          'choices' => array(
            array(
              'value'   => 'inherit',
              'label'   => 'Inherit Layout',
              'src'   => get_template_directory_uri() . '/assets/admin/img/layout-off.png'
            ),
            array(
              'value'   => 'col-1c',
              'label'   => '1 Column',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-1c.png'
            ),
            array(
              'value'   => 'col-2cl',
              'label'   => '2 Column Left',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-2cl.png'
            ),
            array(
              'value'   => 'col-2cr',
              'label'   => '2 Column Right',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-2cr.png'
            ),
            array(
              'value'   => 'col-3cm',
              'label'   => '3 Column Middle',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-3cm.png'
            ),
            array(
              'value'   => 'col-3cl',
              'label'   => '3 Column Left',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-3cl.png'
            ),
            array(
              'value'   => 'col-3cr',
              'label'   => '3 Column Right',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-3cr.png'
            )
          )
        );

        $page_options['fields'][] = array(
          'label'   => sprintf('%1$s</br><i style="font-size:12px">%2$s</i>', __('Select a layout for this page.', 'hueman'), __('This will override any default settings of the customizer options panel.', 'hueman') ),
          'id'    => '_layout',
          'type'    => 'radio-image',
          'desc'    => '',
          'std'   => 'inherit',
          'choices' => array(
            array(
              'value'   => 'inherit',
              'label'   => 'Inherit Layout',
              'src'   => get_template_directory_uri() . '/assets/admin/img/layout-off.png'
            ),
            array(
              'value'   => 'col-1c',
              'label'   => '1 Column',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-1c.png'
            ),
            array(
              'value'   => 'col-2cl',
              'label'   => '2 Column Left',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-2cl.png'
            ),
            array(
              'value'   => 'col-2cr',
              'label'   => '2 Column Right',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-2cr.png'
            ),
            array(
              'value'   => 'col-3cm',
              'label'   => '3 Column Middle',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-3cm.png'
            ),
            array(
              'value'   => 'col-3cl',
              'label'   => '3 Column Left',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-3cl.png'
            ),
            array(
              'value'   => 'col-3cr',
              'label'   => '3 Column Right',
              'src'   => get_template_directory_uri() . '/assets/admin/img/col-3cr.png'
            )
          )
        );
    }



    //post format are @fromfull => keep it in hueman on wp.org
    $post_format_audio = array(
      'id'          => 'format-audio',
      'title'       => 'Format: Audio',
      'desc'        => 'These settings enable you to embed audio into your posts. You must provide both .mp3 and .ogg/.oga file formats in order for self hosted audio to function accross all browsers.',
      'pages'       => array( 'post' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'   => 'MP3 File URL',
          'id'    => '_audio_mp3_url',
          'type'    => 'upload',
          'desc'    => 'The URL to the .mp3 or .m4a audio file'
        ),
        array(
          'label'   => 'OGA File URL',
          'id'    => '_audio_ogg_url',
          'type'    => 'upload',
          'desc'    => 'The URL to the .oga, .ogg audio file'
        )
      )
    );
    $post_format_gallery = array(
      'id'          => 'format-gallery',
      'title'       => 'Format: Gallery',
      'desc'        => '<a title="Add Media" data-editor="content" class="button insert-media add_media" id="insert-media-button" href="#">Add Media</a> <br /><br />
                To create a gallery, upload your images and then select "<strong>Uploaded to this post</strong>" from the dropdown (in the media popup) to see images attached to this post. You can drag to re-order or delete them there. <br /><br /><i>Note: Do not click the "Insert into post" button. Only use the "Insert Media" section of the upload popup, not "Create Gallery" which is for standard post galleries.</i>',
      'pages'       => array( 'post' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array()
    );
    $post_format_chat = array(
      'id'          => 'format-chat',
      'title'       => 'Format: Chat',
      'desc'        => 'Input chat dialogue.',
      'pages'       => array( 'post' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'   => 'Chat Text',
          'id'    => '_chat',
          'type'    => 'textarea',
          'rows'    => '2'
        )
      )
    );
    $post_format_link = array(
      'id'          => 'format-link',
      'title'       => 'Format: Link',
      'desc'        => 'Input your link.',
      'pages'       => array( 'post' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'   => 'Link Title',
          'id'    => '_link_title',
          'type'    => 'text'
        ),
        array(
          'label'   => 'Link URL',
          'id'    => '_link_url',
          'type'    => 'text'
        )
      )
    );
    $post_format_quote = array(
      'id'          => 'format-quote',
      'title'       => 'Format: Quote',
      'desc'        => 'Input your quote.',
      'pages'       => array( 'post' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'   => 'Quote',
          'id'    => '_quote',
          'type'    => 'textarea',
          'rows'    => '2'
        ),
        array(
          'label'   => 'Quote Author',
          'id'    => '_quote_author',
          'type'    => 'text'
        )
      )
    );
    $post_format_video = array(
      'id'          => 'format-video',
      'title'       => 'Format: Video',
      'desc'        => 'These settings enable you to embed videos into your posts.',
      'pages'       => array( 'post' ),
      'context'     => 'normal',
      'priority'    => 'high',
      'fields'      => array(
        array(
          'label'   => 'Video URL',
          'id'    => '_video_url',
          'type'    => 'text',
          'desc'    => ''
        )
      )
    );

    /*  Register meta boxes
    /* ------------------------------------ */
    ot_register_meta_box( $page_options );
    ot_register_meta_box( $post_format_audio );
    ot_register_meta_box( $post_format_chat );
    ot_register_meta_box( $post_format_gallery );
    ot_register_meta_box( $post_format_link );
    ot_register_meta_box( $post_format_quote );
    ot_register_meta_box( $post_format_video );
    ot_register_meta_box( $post_options );
}


if ( is_admin() && ! hu_is_customizing() ) {
    add_action( 'after_setup_theme' , 'hu_add_editor_style' );
    //@return void()
    //hook : after_setup_theme
    function hu_add_editor_style() {
        //we need only the relative path, otherwise get_editor_stylesheets() will treat this as external CSS
        //which means:
        //a) child-themes cannot override it
        //b) no check on the file existence will be made (producing the rtl error, for instance : https://github.com/presscustomizr/customizr/issues/926)
        $_stylesheets = array(
            'assets/admin/css/editor-style.css',
            //hu_get_front_style_url(),
            //get_stylesheet_uri()
        );
        $gfont_src = hu_maybe_add_gfonts_to_editor();
        if ( apply_filters( 'hu_add_user_fonts_to_editor' , false != $gfont_src ) )
          $_stylesheets = array_merge( $_stylesheets , $gfont_src );

        add_editor_style( $_stylesheets );
    }


    /*
    * @return css string
    *
    */
    function hu_maybe_add_gfonts_to_editor() {
      $user_font     = hu_get_option( 'font' );
      $gfamily       = hu_get_fonts( array( 'font_id' => $user_font, 'request' => 'src' ) );//'Source+Sans+Pro:400,300italic,300,400italic,600&subset=latin,latin-ext',
      //bail here if self hosted font (titilium) of web font
      if ( ( empty( $gfamily ) || ! is_string( $gfamily ) ) )
        return;

      //Commas in a URL need to be encoded before the string can be passed to add_editor_style.
      return array(
        str_replace(
          ',',
          '%2C',
          sprintf( '//fonts.googleapis.com/css?family=%s', $gfamily )
        )
      );
    }
}

add_filter( 'tiny_mce_before_init'  , 'hu_user_defined_tinymce_css' );

/**
* Extend TinyMCE config with a setup function.
* See http://www.tinymce.com/wiki.php/API3:event.tinymce.Editor.onInit
* http://wordpress.stackexchange.com/questions/120831/how-to-add-custom-css-theme-option-to-tinymce
* @package Customizr
* @since Customizr 3.2.11
*
*/
function hu_user_defined_tinymce_css( $init ) {
  if ( ! apply_filters( 'hu_add_custom_fonts_to_editor' , true ) )
    return $init;

  if ( 'tinymce' != wp_default_editor() )
    return $init;

  //some plugins fire tiny mce editor in the customizer
  //in this case, the CZR_resource class has to be loaded
  // if ( ! class_exists('CZR_resources') || ! is_object(CZR_resources::$instance) ) {
  //   CZR___::$instance -> czr_fn_req_once( 'inc/czr-init.php' );
  //   new CZR_resources();
  // }

  // google / web fonts style
  $user_font    = hu_get_option( 'font' );
  $family       = hu_get_fonts( array( 'font_id' => $user_font, 'request' => 'family' ) );//'"Raleway", Arial, sans-serif'
  $family       = ( empty( $family ) || ! is_string( $family ) ) ? "'Titillium Web', Arial, sans-serif" : $family;

  //maybe add rtl class
  $_mce_body_context = is_rtl() ? 'mce-content-body.rtl' : 'mce-content-body';

  //fonts
  $_css = "body.{$_mce_body_context}{ font-family : {$family}; }\n";

  $init['content_style'] = trim( preg_replace('/\s+/', ' ', $_css ) );

  return $init;
}