<?php
/**
* Update notifications system in WP admin
*/
if ( !class_exists( 'HU_admin_update_notification' ) ) :
    class HU_admin_update_notification {
        static $instance;

        function __construct () {
            self::$instance =& $this;

            //UPDATE NOTICE
            if( !defined( 'HU_SHOW_UPDATE_NOTIFICATION' ) ) { define( 'HU_SHOW_UPDATE_NOTIFICATION', HUEMAN_VER !== '3.7.3' ); }
            add_action( 'admin_notices'         , array( $this, 'hu_may_be_display_update_notice') );
            //always add the ajax action
            add_action( 'wp_ajax_dismiss_hueman_update_notice'    , array( $this , 'hu_dismiss_update_notice_action' ) );
            add_action( 'admin_footer'                  , array( $this , 'hu_write_ajax_dismis_script' ) );
            /* beautify admin notice text using some defaults the_content filter callbacks */
            foreach ( array( 'wptexturize', 'convert_smilies', 'wpautop') as $callback ) {
              if ( function_exists( $callback ) )
                  add_filter( 'hu_update_notice', $callback );
            }
        }



        /**********************************************************************************
        * UPDATE NOTICE
        * User gets notified when the version stores in the db option 'last_update_notice'
        * is < current version of the theme (HUEMAN_VER)
        * User can dismiss the notice and the option get updated by ajax to the current version
        * The notice will be displayed a maximum of 5 times and will be automatically dismissed until the next update.
        * => users won't be notified again until the next update.
        **********************************************************************************/
        /**
        * hook : admin_notices
        */
        function hu_may_be_display_update_notice() {
            if ( !defined('HU_SHOW_UPDATE_NOTIFICATION') || !HU_SHOW_UPDATE_NOTIFICATION )
              return;
            $screen = get_current_screen();
            if ( is_object($screen) && 'appearance_page_welcome' === $screen-> id )
              return;

            $opt_name                   = 'last_update_notice';
            $last_update_notice_values  = hu_get_option($opt_name);
            $show_new_notice = false;
            $display_ct = 10;

            if ( !$last_update_notice_values || !is_array($last_update_notice_values) ) {
                //first time user of the theme, the option does not exist
                // 1) initialize it => set it to the current Hueman version, displayed 0 times.
                // 2) update in db
                $last_update_notice_values = array( "version" => HUEMAN_VER, "display_count" => 0 );
                HU_utils::$inst->hu_set_option( $opt_name, $last_update_notice_values );
                //already user of the theme ?
                if ( hu_user_started_before_version( HUEMAN_VER ) )
                  $show_new_notice = true;
            }

            $_db_version          = $last_update_notice_values["version"];
            $_db_displayed_count  = $last_update_notice_values["display_count"];

            //user who just upgraded the theme will be notified until he/she clicks on the dismiss link
            //or until the notice has been displayed n times.
            if ( version_compare( HUEMAN_VER, $_db_version , '>' ) ) {
                //CASE 1 : displayed less than n times
                if ( $_db_displayed_count < $display_ct ) {
                    $show_new_notice = true;
                    //increments the counter
                    (int) $_db_displayed_count++;
                    $last_update_notice_values["display_count"] = $_db_displayed_count;
                    //updates the option val with the new count
                    HU_utils::$inst->hu_set_option( $opt_name, $last_update_notice_values );
                }
                //CASE 2 : displayed n times => automatic dismiss
                else {
                    //reset option value with new version and counter to 0
                    $new_val  = array( "version" => HUEMAN_VER, "display_count" => 0 );
                    HU_utils::$inst->hu_set_option( $opt_name, $new_val );
                }//end else
            }//end if

            //always display in dev mode
            $show_new_notice = ( defined('CZR_DEV') && CZR_DEV ) || $show_new_notice;
            if ( !$show_new_notice )
              return;
            //prefixed HU_Plugin_Activation because of the possible issue : https://github.com/presscustomizr/customizr/issues/1603
            if ( !hu_is_plugin_active('nimble-builder/nimble-builder.php') && class_exists('HU_Plugin_Activation') && !HU_Plugin_Activation::get_instance()->hu_is_notice_dismissed() )
              return;

            ob_start();
              ?>
              <div class="notice notice-info czr-update-notice" style="position:relative;">
              <?php
                echo apply_filters(
                  'hu_update_notice',
                  sprintf('<h3>➡️ %1$s %2$s %3$s %4$s. <strong><a href="%5$s" title="%6$s">%6$s %7$s</a></strong></h3>',
                    __( "You have recently updated to", "hueman"),
                    HU_IS_PRO ? 'Hueman Pro' : 'Hueman',
                    __( "version", "hueman"),
                    HUEMAN_VER,
                    admin_url() .'themes.php?page=welcome.php',
                    __( "Make sure to read the changelog" , "hueman" ),
                    is_rtl() ? '&laquo;' : '&raquo;'
                  )
                );
              ?>
                <p style="text-align:right;position: absolute;font-size: 1.1em;<?php echo is_rtl()? 'left' : 'right';?>: 7px;bottom: -6px;">
                <?php printf('<a href="#" title="%1$s" class="tc-dismiss-update-notice"> ( %1$s <strong>X</strong> ) </a>',
                    __('close' , 'hueman')
                  );
                ?>
                </p>
              </div>
              <?php
            $_html = ob_get_clean();
            echo $_html;
        }


        /**
        * hook : wp_ajax_dismiss_hueman_update_notice
        * => sets the last_update_notice to the current Hueman version when user click on dismiss notice link
        */
        function hu_dismiss_update_notice_action() {
            check_ajax_referer( 'dismiss-update-notice-nonce', 'dismissUpdateNoticeNonce' );
            //reset option value with new version and counter to 0
            $new_val  = array( "version" => HUEMAN_VER, "display_count" => 0 );
            HU_utils::$inst->hu_set_option( 'last_update_notice', $new_val );
            wp_die();
        }



        /**
        * hook : admin_footer
        */
        function hu_write_ajax_dismis_script() {
            ?>
            <script type="text/javascript" id="tc-dismiss-update-notice">
              ( function($){
                var _ajax_action = function( $_el ) {
                    var AjaxUrl = "<?php echo admin_url( 'admin-ajax.php' ); ?>",
                        _query  = {
                            action  : 'dismiss_hueman_update_notice',
                            dismissUpdateNoticeNonce :  "<?php echo wp_create_nonce( 'dismiss-update-notice-nonce' ); ?>"
                        },
                        $ = jQuery,
                        request = $.post( AjaxUrl, _query );

                    request.fail( function ( response ) {
                      //console.log('response when failed : ', response);
                    });
                    request.done( function( response ) {
                      //console.log('RESPONSE DONE', $_el, response);
                      // Check if the user is logged out.
                      if ( '0' === response )
                        return;
                      // Check for cheaters.
                      if ( '-1' === response )
                        return;
                    });
                };//end of fn

                //on load
                $( function($) {
                  $('.tc-dismiss-update-notice').on('click', function( e ) {
                    e.preventDefault();
                    $(this).closest('.czr-update-notice').slideToggle('fast');
                    _ajax_action( $(this) );
                  } );
                } );

              } )( jQuery );


            </script>
            <?php
        }


    }//end of class
endif;