<?php
if ( ! class_exists( 'HU_Skop_Option' ) ) :
    final class HU_Skop_Option {
        public static $instance;

        public static $_global_opt;
        public static $_group_opt;
        public static $_special_group_opt;
        public static $_local_opt;
        public static $_protected_options;

        public static function hu_skop_opt_instance() {
            if ( ! isset( self::$instance ) && ! ( self::$instance instanceof HU_Skop_Option ) )
              self::$instance = new HU_Skop_Option();
            return self::$instance;
        }

        function __construct() {
            // if ( hu_is_customize_preview_frame() ) {
            //   //refresh the theme options right after the _preview_filter when previewing
            //   add_action( 'customize_preview_init'  , array( $this , 'hu_cache_options' ) );
            // } else {
            //   add_action( 'wp' , array( $this, 'hu_cache_options' ) );
            // }
            add_action( 'wp' , array( $this, 'hu_cache_options' ) );
            add_filter( 'hu_opt', array( $this, 'hu_filter_hu_opt_for_skope' ), 10, 4 );

            HU_Skop_Option::$_protected_options = apply_filters(
                'hu_protected_options',
                array('defaults', 'ver', 'has_been_copied', 'last_update_notice' )
            );
        }


        //the purpose of this function is to store the various skope options as properties
        //instead of getting them each time
        //fired on customize_preview_init if in preview frame
        //fired by constructor otherwise
        //@return void()
        function hu_cache_options() {
            $meta_type = hu_get_skope( 'meta_type', true );
            $_skope_list = array( 'global', 'group', 'special_group', 'local' );
            foreach ($_skope_list as $_skp ) {
                switch ( $_skp ) {
                    case 'global':
                      HU_Skop_Option::$_global_opt = false === get_option( HU_THEME_OPTIONS ) ? array() : (array)get_option( HU_THEME_OPTIONS );
                    break;
                    case 'group':
                      $db_opt_name = $this -> hu_get_skope_opt_name( 'group' );
                      HU_Skop_Option::$_group_opt = $this -> hu_get_skope_opt( 'group', $meta_type, $db_opt_name );
                      HU_Skop_Option::$_group_opt = ! HU_Skop_Option::$_group_opt ? array() : HU_Skop_Option::$_group_opt;
                    break;
                    case 'special_group':
                      $db_opt_name = $this -> hu_get_skope_opt_name( 'special_group' );
                      HU_Skop_Option::$_special_group_opt = $this -> hu_get_skope_opt( 'special_group', $meta_type, $db_opt_name );
                      HU_Skop_Option::$_special_group_opt = ! HU_Skop_Option::$_special_group_opt ? array() : HU_Skop_Option::$_special_group_opt;
                    break;
                    case 'local':
                      $db_opt_name = $this -> hu_get_skope_opt_name( 'local' );
                      HU_Skop_Option::$_local_opt = $this -> hu_get_skope_opt( 'local', $meta_type, $db_opt_name );
                      HU_Skop_Option::$_local_opt = ! HU_Skop_Option::$_local_opt ? array() : HU_Skop_Option::$_local_opt;
                    break;
                }
            }
        }

        //@return the array of cached opt
        function hu_get_cached_opt( $skope = null, $opt_name = null ) {
            $skope = is_null( $skope ) ? 'local' : $skope;
            $_opt_array = array();

            switch ( $skope ) {
                case 'global':
                  $_opt_array = HU_Skop_Option::$_global_opt;
                break;
                case 'group':
                  $_opt_array = HU_Skop_Option::$_group_opt;
                break;
                case 'special_group':
                  $_opt_array = HU_Skop_Option::$_special_group_opt;
                break;
                case 'local':
                  $_opt_array = HU_Skop_Option::$_local_opt;
                break;
            }
            if ( is_null( $opt_name ) )
              return $_opt_array;
            else
              return isset( $_opt_array[$opt_name] ) ? $_opt_array[$opt_name] : '_no_set_';
        }


        /*****************************************************
        * FILTER GET OPTION
        *****************************************************/
        //which option to get ?
        //1) WHEN CUSTOMIZING
        //- if dyn_type is 'option', then let wp do the job
        //- if dyn_type is not option,
        //      A) the requested option name is currently being customized
        //        => if so, then get the customized value
        //      B) the requested option is not being customized, then get the saved db option using dyn_type and opt_name from $_POST
        //
        //2) WHEN NOT CUSTOMIZING
        // A) the current context can have a meta option : posts (post, page, cpt), tax, authors
        //    => retrieve the meta and check if an entry exists for this option
        // B) the current context can have specific global options like home, all_posts, all_pages, all_{custom_post_type}
        //   all_tag, all_cat, all_{custom_tax}, all_authors, 404, search, date
        //     => if so then check if the current option has an entry in this specific global and return it
        // C) the current context has no specific global option, then fall back on the default value
        function hu_filter_hu_opt_for_skope( $_opt_val , $opt_name , $opt_group, $_default_val ) {
            $_new_val = $_opt_val;

            //CUSTOMIZING
            if ( $this -> hu_has_customized_val( $opt_name ) ) {
                return $this -> hu_get_customized_val( $opt_name );
            } else {
                if ( hu_is_customize_preview_frame() ) {
                    $cust_skope = $this -> hu_get_current_customized_skope();
                    $_new_val = $this -> hu_get_customized_skope_option_val( $opt_name, $_opt_val, $cust_skope );
                } else {
                    $skop_opts = array(
                        'local' => $this -> hu_get_cached_opt( 'local', $opt_name ),
                        'group' => $this -> hu_get_cached_opt( 'group', $opt_name ),
                        'special_group' => $this -> hu_get_cached_opt( 'special_group', $opt_name ),
                        'global' => $_opt_val
                    );
                    //priority
                    if ( '_no_set_' != $skop_opts['local'] )
                        $_new_val = $skop_opts['local'];
                    else if ( '_no_set_' != $skop_opts['group'] )
                        $_new_val = $skop_opts['group'];
                    else if ( '_no_set_' != $skop_opts['special_group'] )
                        $_new_val = $skop_opts['special_group'];
                }

            }

            //falls back to global
            return $_new_val;
        }

        //recursive method
        //apply the skope inheritance to return the relevant value
        private function hu_get_customized_skope_option_val( $opt_name, $original_opt_val, $skope ) {
            $skop_opt_val = $this -> hu_get_cached_opt( $skope, $opt_name );
            if ( '_no_set_' != $skop_opt_val )
              return $skop_opt_val;

            if ( 'global' == $skope )
              return $original_opt_val;

            $parent_skope = $this -> hu_get_parent_skope_name( $skope );
            return $this -> hu_get_customized_skope_option_val( $opt_name, $original_opt_val, $parent_skope );

        }


        private function hu_get_parent_skope_name( $skope, $_index = null ) {
            $hierark = array( 'local', 'group', 'special_group', 'global' );
            $parent_ind = -1;
            //get the parent index
            foreach( $hierark as $_key => $_skp ) {
                if ( $skope == $_skp && -1 == $parent_ind )
                  $parent_ind = intval( $_key + 1 ) ;
                continue;
            }
            return isset( $hierark[$parent_ind] ) ? $hierark[$parent_ind] : 'global';
        }


        //@param level : local, group, special_group
        //@param type : post
        function hu_get_skope_opt( $level, $meta_type, $db_opt_name ) {
            $skope = hu_get_skope();
            $_dyn_type = ( hu_is_customize_preview_frame() && isset($_POST['dyn_type']) ) ? $_POST['dyn_type'] : '';
            $_opt = array();

            if( 'local' == $level ) {
              if ( $this -> hu_can_have_meta_opt( $meta_type ) ) {
                  $_id = hu_get_skope('id');
                  switch ($meta_type) {
                      case 'post':
                        $_opt = get_post_meta( $_id , $db_opt_name, true );
                        break;

                      case 'tax':
                        $_opt = get_term_meta( $_id , $db_opt_name, true );
                        break;

                      case 'user':
                        $_opt = get_user_meta( $_id , $db_opt_name, true );
                        break;
                  }
              } else if ( ( 'trans' == $_dyn_type || $this -> hu_can_have_trans_opt( $skope ) ) && false !== get_transient( $db_opt_name ) ) {
                  $_opt = get_transient( $db_opt_name );
              }
            }
            if ( 'group' == $level || 'special_group' == $level ) {
              if ( false !== get_transient( $db_opt_name ) ) {
                  $_opt = get_transient( $db_opt_name );
              }
            }
            return $_opt;
        }















        /******************************************************
        * HELPERS
        *******************************************************/
        //@return the name of the option as a string for a given skope
        function hu_get_skope_opt_name( $level = 'local', $special = '' ) {
            $name = '';
            switch ($level) {
              case 'local':
                $name = strtolower( THEMENAME . '_czr_' . hu_get_skope() );
                break;
              case 'group' :
                if ( ! empty(hu_get_skope('type') ) )
                  $name = strtolower( THEMENAME . '_czr_all_' . hu_get_skope('type') );
                break;
              case 'special_group' :
                $name = strtolower( THEMENAME . '_czr_all_' . hu_get_skope('type') . $special );
                break;
              case 'global':
                $name = HU_THEME_OPTIONS;
                break;
            }
            return $name;
        }

        function hu_is_customized_opt( $opt_name ) {
            $_cust_opt_name = HU_THEME_OPTIONS . '['. $opt_name . ']';
            $_customized = $this -> hu_get_czr_post_values('customized');
            return array_key_exists( $_cust_opt_name, $_customized );
        }

        function hu_get_current_customized_skope() {
            if ( ! isset($_POST['skope']) )
              return 'global';
            return $_POST['skope'];
        }

        function hu_is_customized_dyn_type( $meta_type ) {
            if ( ! isset($_POST['dyn_type']) )
              return '';
            return $meta_type == $_POST['dyn_type'];
        }

        //@return bool
        function hu_has_customized_val( $opt_name ) {
            $_cust_opt_name = HU_THEME_OPTIONS . '['. $opt_name . ']';
            $_customized = $this -> hu_get_czr_post_values('customized');
            return array_key_exists( $_cust_opt_name, $_customized );
        }

        //@return option val : can be any type of variable.
        function hu_get_customized_val( $opt_name ) {
            $_cust_opt_name = HU_THEME_OPTIONS . '['. $opt_name . ']';
            $_customized = $this-> hu_get_czr_post_values('customized');
            return array_key_exists( $_cust_opt_name, $_customized ) ? $_customized[$_cust_opt_name] : false;
        }


        function hu_can_have_meta_opt( $meta_type ) {
            return in_array(
              $meta_type,
              array('post', 'tax', 'user')
            );
        }


        function hu_can_have_trans_opt( $meta_type ) {
            return in_array(
              $meta_type,
              array('home', 'search', '404', 'date')
            );
        }


        function hu_get_czr_post_values() {
            if ( ! isset( $_POST['customized'] ) )
              return array();

            return json_decode( wp_unslash( $_POST['customized'] ), true );
        }

        //@return array of all options or a single option val
        function hu_get_raw_theme_option( $opt_name = null ) {
            global $wpdb;
            $row = $wpdb->get_row( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1", HU_THEME_OPTIONS ) );

            // Has to be get_row instead of get_var because of funkiness with 0, false, null values
            if ( is_object( $row ) ) {
              $value = maybe_unserialize( $row->option_value );
            }
            if ( is_null( $opt_name ) )
              return $value;
            return isset( $value[$opt_name] ) ? $value[$opt_name] : false;
        }

        //@return the name of the currently saved option for a given skope
        //only used for the 'global' skope for now
        //@todo other skope cases
        function hu_get_saved_opt_name( $skope = null ) {
            $skope = is_null( $skope ) ? 'global' : $skope;
            $_opts = $this -> hu_get_raw_theme_option();
            $_saved_opts = array();
            foreach ($_opts as $key => $value) {
                if ( in_array( $key, self::$_protected_options) )
                  continue;
                $_saved_opts[] = $key;
            }
            return $_saved_opts;
        }



        //@return the option array
        // function hu_get_meta_opt( $opt_name, $meta_type ) {
        //     return array();
        // }

        //@return the option array
        // function hu_get_trans_opt( $opt_name, $meta_type ) {
        //     $trans_name = $this -> hu_get_skope_opt_name();
        //     $trans = get_transient( $trans_name );
        //     $trans = false != $trans ? $trans : array();

        //     if ( ! hu_is_customize_preview_frame() )
        //       return $trans;

        //     if ( $this -> hu_is_customized_opt( $opt_name ) && $this -> hu_is_customized_dyn_type( $meta_type ) ) {
        //       //get the customized value for this option
        //       $cust_val = $this -> hu_get_customized_val($opt_name);
        //       //update the trans
        //       $trans[$opt_name] = $cust_val;
        //     }
        //     return $trans;
        // }
    }//class
endif;