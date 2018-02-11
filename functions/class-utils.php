<?php
/**
*
*
* @package      Hueman
* @since        3.0.0
* @author       Nicolas GUILLAUME <nicolas@presscustomizr.com>
* @copyright    Copyright (c) 2016, Nicolas GUILLAUME
* @link         http://presscustomizr.com/hueman
* @license      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
if ( ! class_exists( 'HU_utils' ) ) :
  class HU_utils {
    //Access any method or var of the class with classname::$instance -> var or method():
    static $inst;
    public $default_options;
    public $db_options;
    public $options;//not used in customizer context only
    public $is_customizing;
    public $hu_options_prefixes;
    public static $_theme_setting_list;

    function __construct () {
        self::$inst =& $this;

        //init properties
        //when is_admin, the after_setup_theme is fired too late
        if ( is_admin() && ! hu_is_customizing() ) {
          $this -> hu_init_properties();
        } else {
          add_action( 'after_setup_theme'       , array( $this , 'hu_init_properties') );
        }

        //IMPORTANT : this callback needs to be ran AFTER hu_init_properties.
        add_action( 'after_setup_theme', array( $this, 'hu_cache_theme_setting_list' ), 100 );

        //Various WP filters for
        //content
        //thumbnails => parses image if smartload enabled
        //title
        add_action( 'wp_head'                 , array( $this , 'hu_wp_filters') );

        //refresh the theme options right after the _preview_filter when previewing
        add_action( 'customize_preview_init'  , array( $this , 'hu_customize_refresh_db_opt' ) );
    }//construct



    /***************************
    * EARLY HOOKS
    ****************************/
    /**
    * Init class properties after_setup_theme
    * Fixes the bbpress bug : Notice: bbp_setup_current_user was called incorrectly. The current user is being initialized without using $wp->init()
    * hu_get_default_options uses is_user_logged_in() => was causing the bug
    * hook : after_setup_theme
    *
    */
    function hu_init_properties() {
        //all theme options start by "hu_" by convention
        //$this -> hu_options_prefixes = apply_filters('hu_options_prefixes', array('hu_') );
        $this -> is_customizing   = hu_is_customizing();
        $this -> db_options       = false === get_option( HU_THEME_OPTIONS ) ? array() : (array)get_option( HU_THEME_OPTIONS );
        $this -> default_options  = $this -> hu_get_default_options();
        $_trans                   = HU_IS_PRO ? 'started_using_hueman_pro' : 'started_using_hueman';

        //What was the theme version when the user started to use Hueman?
        //new install = no options yet
        //very high duration transient, this transient could actually be an option but as per the wordpress.org themes guidelines, only one option is allowed for the theme settings
        if ( ! hu_isprevdem() ) {
              if ( ! get_transient( $_trans ) ) {
                  set_transient(
                      $_trans,
                      sprintf('%s|%s' , count( $this -> db_options ) >= 1 ? 'before' : 'with' , HUEMAN_VER ),
                      60*60*24*3650
                  );
              }
              if ( ! get_transient( 'hu_start_date' ) && class_exists( 'DateTime' ) ) {
                  set_transient(
                      'hu_start_date',
                      new DateTime("now"),
                      60*60*24*3650
                  );
              }
        }
        //the db updates for retro compat can be done now.
        //=> @see functions/init-retro-compat.php
        do_action('hu_init_options_done');
    }


    /* ------------------------------------------------------------------------- *
     *  CACHE THE LIST OF THEME SETTINGS ONLY
    /* ------------------------------------------------------------------------- */
    //Fired in __construct()
    //Note : the 'sidebar-areas' setting is not listed in that list because registered specifically
    function hu_cache_theme_setting_list() {
        if ( is_array(self::$_theme_setting_list) && ! empty( self::$_theme_setting_list ) )
          return;
        $_settings_map = HU_utils_settings_map::$instance -> hu_get_customizer_map( null, 'add_setting_control' );
        $_settings = array();
        foreach ( $_settings_map as $_id => $data ) {
            $_settings[] = $_id;
        }
        //$default_options = HU_utils::$inst -> hu_get_default_options();
        self::$_theme_setting_list = $_settings;
    }


    /***************************
    * ON WP_HEAD
    ****************************/
    /**
    * hook : wp_head
    */
    function hu_wp_filters() {
        if ( apply_filters( 'hu_img_smart_load_enabled', ! hu_is_ajax() && hu_is_checked('smart_load_img') ) ) {
            add_filter( 'the_content'                       , array( $this , 'hu_parse_imgs' ), PHP_INT_MAX );
            add_filter( 'hu_post_thumbnail_html'            , array( $this , 'hu_parse_imgs' ) );
        }
        add_filter( 'wp_title'                            , array( $this , 'hu_wp_title' ), 10, 2 );
    }


    /**
    * hook : the_content
    * Inspired from Unveil Lazy Load plugin : https://wordpress.org/plugins/unveil-lazy-load/ by @marubon
    *
    * @return string
    */
    function hu_parse_imgs( $_html ) {
        $_bool = is_feed() || is_preview() || ( wp_is_mobile() && apply_filters('hu_disable_img_smart_load_mobiles', false ) );

        if ( apply_filters( 'hu_disable_img_smart_load', $_bool, current_filter() ) )
          return $_html;

        $allowed_image_extentions = apply_filters( 'hu_smartload_allowed_img_extensions', array(
            'bmp',
            'gif',
            'jpeg',
            'jpg',
            'jpe',
            'tif',
            'tiff',
            'ico',
            'png',
            'svg',
            'svgz'
        ) );

        if ( empty( $allowed_image_extentions ) || ! is_array( $allowed_image_extentions ) ) {
          return $_html;
        }

        $img_extensions_pattern = sprintf( "(?:%s)", implode( '|', $allowed_image_extentions ) );
        $pattern                = '#<img([^>]+?)src=[\'"]?([^\'"\s>]+\.'.$img_extensions_pattern.'[^\'"\s>]*)[\'"]?([^>]*)>#i';

        return preg_replace_callback( $pattern, array( $this , 'hu_regex_callback' ) , $_html);
    }


    /**
    * callback of preg_replace_callback in hu_parse_imgs
    * Inspired from Unveil Lazy Load plugin : https://wordpress.org/plugins/unveil-lazy-load/ by @marubon
    *
    * @return string
    */
    private function hu_regex_callback( $matches ) {
        $_placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

        if ( false !== strpos( $matches[0], 'data-src' ) || preg_match('/ data-smartload *= *"false" */', $matches[0]) ) {
          return $matches[0];
        } else {
          return apply_filters( 'hu_img_smartloaded',
            str_replace( array('srcset=', 'sizes='), array('data-srcset=', 'data-sizes='),
                sprintf('<img %1$s src="%2$s" data-src="%3$s" %4$s>',
                    $matches[1],
                    $_placeholder,
                    $matches[2],
                    $matches[3]
                )
            )
          );
        }
    }



    /**
    * Title element formating
    * Hook : wp_title
    *
    */
    function hu_wp_title( $title, $sep ) {
        if ( function_exists( '_wp_render_title_tag' ) )
          return $title;

        global $paged, $page;

        if ( is_feed() )
          return $title;

        // Add the site name.
        $title .= get_bloginfo( 'name' );

        // Add the site description for the home/front page.
        $site_description = get_bloginfo( 'description' , 'display' );
        if ( $site_description && hu_is_home() )
          $title = "$title $sep $site_description";

        // Add a page number if necessary.
        if ( $paged >= 2 || $page >= 2 )
          $title = "$title $sep " . sprintf( __( 'Page %s' , 'hueman' ), max( $paged, $page ) );

        return $title;
    }





    /****************************************************************************
    ****************************** OPTIONS **************************************
    *****************************************************************************/
    /**
    * Returns the default options array
    *
    * @package Hueman
    * @since Hueman 3.0.0
    */
    function hu_get_default_options() {
        $_db_opts     = empty($this -> db_options) ? $this -> hu_cache_db_options() : $this -> db_options;
        $def_options  = isset($_db_opts['defaults']) ? $_db_opts['defaults'] : array();

        //Don't update if default options are not empty + customizing context
        //customizing out ? => we can assume that the user has at least refresh the default once (because logged in, see conditions below) before accessing the customizer
        //customizing => takes into account if user has set a filter or added a new customizer setting
        if ( ! empty($def_options) && $this -> is_customizing )
          return apply_filters( 'hu_default_options', $def_options );

        //Never update the defaults when wp_installing()
        //prevent issue https://github.com/presscustomizr/hueman/issues/571
        //Always update/generate the default option when (OR) :
        // 1) current user can edit theme options
        // 2) they are not defined
        // 3) theme version not defined
        // 4) versions are different
        if ( ! wp_installing() ) {
            if ( current_user_can('edit_theme_options') || empty($def_options) || ! isset($def_options['ver']) || 0 != version_compare( $def_options['ver'] , HUEMAN_VER ) ) {
                $def_options          = $this -> hu_generate_default_options( HU_utils_settings_map::$instance -> hu_get_customizer_map( $get_default_option = 'true' ) , HU_THEME_OPTIONS );
                //Adds the version in default
                $def_options['ver']   =  HUEMAN_VER;

                //writes the new value in db (merging raw options with the new defaults )
                //=> will abort when wp_cache_get() returns false
                // => prevent issue https://github.com/presscustomizr/hueman/issues/571
                $this -> hu_set_option( 'defaults', $def_options, HU_THEME_OPTIONS );
            }
        }
        return apply_filters( 'hu_default_options', $def_options );
    }



    /**
    * Generates the default options array from a customizer map + add slider option
    *
    */
    function hu_generate_default_options( $map, $option_group = null ) {
        //do we have to look in a specific group of option (plugin?)
        $option_group   = is_null($option_group) ? HU_THEME_OPTIONS : $option_group;

        //initialize the default array with the sliders options
        $defaults = array();

        foreach ($map['add_setting_control'] as $key => $options) {

          $option_name = $key;
          //write default option in array
          if( isset($options['default']) )
            $defaults[$option_name] = ( 'checkbox' == $options['type'] ) ? (bool) $options['default'] : $options['default'];
          else
            $defaults[$option_name] = null;
        }//end foreach

        return $defaults;
    }



    /**
    * Returns an option from the options array of the theme.
    *
    * @package Hueman
    */
    function hu_opt( $option_name , $option_group = null, $use_default = true ) {
        //do we have to look for a specific group of option (plugin?)
        $option_group = is_null( $option_group ) ? HU_THEME_OPTIONS : $option_group;
        //when customizing, the db_options property is refreshed each time the preview is refreshed in 'customize_preview_init'
        $_db_options  = empty($this -> db_options) ? $this -> hu_cache_db_options() : $this -> db_options;

        //do we have to use the default ?
        $__options    = $_db_options;
        $_default_val = false;
        if ( $use_default ) {
          $_defaults      = $this -> default_options;
          if ( is_array($_defaults) && isset($_defaults[$option_name]) )
            $_default_val = $_defaults[$option_name];
          $__options      = wp_parse_args( $_db_options, $_defaults );
        }

        //assign false value if does not exist, just like WP does
        $_single_opt    = isset( $__options[$option_name] ) ? $__options[$option_name] : false;

        //allow ctx filtering globally
        $_single_opt = apply_filters( "hu_opt" , $_single_opt , $option_name , $option_group, $_default_val );

        //allow single option filtering
        return apply_filters( "hu_opt_{$option_name}" , $_single_opt , $option_name , $option_group, $_default_val );
    }



    /**
    * Get the saved options in customizer Screen, merge them with the default theme options array and return the updated global options array
    *
    */
    function hu_get_theme_options ( $option_group = null ) {
        //do we have to look in a specific group of option (plugin?)
        $option_group       = is_null($option_group) ? HU_THEME_OPTIONS : $option_group;
        $saved              = empty($this -> db_options) ? $this -> hu_cache_db_options() : $this -> db_options;
        $defaults           = $this -> default_options;
        $__options          = wp_parse_args( $saved, $defaults );
        //$__options        = array_intersect_key( $__options, $defaults );
      return $__options;
    }



    /**
    * Set an option value in the theme option group
    * @param $option_name : string
    * @param $option_value : sanitized option value, can be a string, a boolean or an array
    * @param $option_group : string ( like hu_theme_options )
    * @return  void
    *
    */
    function hu_set_option( $option_name , $option_value, $option_group = null ) {
        $option_group           = is_null($option_group) ? HU_THEME_OPTIONS : $option_group;

        //Get raw to :
        //avoid filtering
        //avoid merging with defaults
        //Reminder : hu_get_raw_option( $opt_name = null, $opt_group = null, $from_cache = true, $report_error = false )
        //get the raw option and enabled the wp error report
        //=> prevent issue https://github.com/presscustomizr/hueman/issues/571
        $_options               = $this -> hu_get_unfiltered_theme_options( $option_group );

        //Always make sure that getting raw options returns valid data
        //For example, when opening wp-activate.php, wp_cache_get( 'alloptions', 'options' ); returns false
        //=> which might lead to reset all previous user theme options when using update_option()
        // => prevent issue https://github.com/presscustomizr/hueman/issues/571
        if ( is_wp_error( $_options ) ) {
            error_log( $_options -> get_error_code() );
            return;
        } else {
            $_options[$option_name] = $option_value;
            update_option( $option_group, $_options );
        }
    }


    /**
    * The purpose of this callback is to refresh and store the theme options in a property on each customize preview refresh
    * => preview performance improvement
    * 'customize_preview_init' is fired on wp_loaded, once WordPress is fully loaded ( after 'init', before 'wp') and right after the call to 'customize_register'
    * This method is fired just after the theme option has been filtered for each settings by the WP_Customize_Setting::_preview_filter() callback
    * => if this method is fired before this hook when customizing, the user changes won't be taken into account on preview refresh
    *
    * hook : customize_preview_init
    * @return  void
    *
    */
    function hu_customize_refresh_db_opt(){
        $this -> db_options = false === get_option( HU_THEME_OPTIONS ) ? array() : (array)get_option( HU_THEME_OPTIONS );
    }


    /**
    * In live context (not customizing || admin) cache the theme options
    *
    */
    function hu_cache_db_options($opt_group = null) {
        $opt_group = is_null( $opt_group ) ? HU_THEME_OPTIONS : $opt_group;
        $this -> db_options = false === get_option( $opt_group ) ? array() : (array)get_option( $opt_group );
        return $this -> db_options;
    }


    //@return an array of options
    //This is mostly a copy of the built-in get_option with the difference that
    //1) by default retrieves only the theme options
    //2) removes the "pre_option_{$name}", "default_option_{$name}", "option_{$name}" filters
    //3) doesn't care about the special case when $option in array array('siteurl', 'home', 'category_base', 'tag_base'),
    //   as they are out of scope here
    //
    // The filter suppression is specially needed due to:
    // a) avoid plugins (qtranslate, other lang plugins) filtering the theme options value, which might mess theme options when we update the options on front
    // (e.g. to set the defaults, or to perform our retro compat options updates, or either to set the user started before option)
    // b) speed up the theme option retrieval when we are sure we don't need the theme options to be filtered in any case
    function hu_get_unfiltered_theme_options( $option = null, $default = array() ) {
        $option           = is_null($option) ? HU_THEME_OPTIONS : $option;

        global $wpdb;

        $option_group = trim( $option);

        if ( empty( $option ) )
            return false;

        if ( defined( 'WP_SETUP_CONFIG' ) )
            return false;

        if ( ! wp_installing() ) {
            // prevent non-existent options from triggering multiple queries
            $notoptions = wp_cache_get( 'notoptions', 'options' );
            if ( isset( $notoptions[ $option ] ) ) {
                return $default;
            }

            $alloptions = wp_load_alloptions();

            if ( isset( $alloptions[$option] ) ) {
                $value = $alloptions[$option];
            } else {
                $value = wp_cache_get( $option, 'options' );

                if ( false === $value ) {
                    $row = $wpdb->get_row( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1", $option ) );

                    // Has to be get_row instead of get_var because of funkiness with 0, false, null values
                    if ( is_object( $row ) ) {
                        $value = $row->option_value;
                        wp_cache_add( $option, $value, 'options' );
                    } else { // option does not exist, so we must cache its non-existence
                        if ( ! is_array( $notoptions ) ) {
                             $notoptions = array();
                        }
                        $notoptions[$option] = true;
                        wp_cache_set( 'notoptions', $notoptions, 'options' );

                        return $default;
                    }
                }
            }
        } else {
            $suppress = $wpdb->suppress_errors();
            $row = $wpdb->get_row( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1", $option ) );
            $wpdb->suppress_errors( $suppress );
            if ( is_object( $row ) ) {
                $value = $row->option_value;
            } else {
                return $default;
            }
        }

        return maybe_unserialize( $value );
    }
  }//end of class
endif;