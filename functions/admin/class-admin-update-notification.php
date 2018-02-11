<?php
/**
* Update notifications system in WP admin
*/
if ( ! class_exists( 'HU_admin_update_notification' ) ) :
    class HU_admin_update_notification {
        static $instance;

        function __construct () {
            self::$instance =& $this;
            //UPDATE NOTICE
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
            $opt_name                   = 'last_update_notice';
            $last_update_notice_values  = hu_get_option($opt_name);
            $show_new_notice = false;

            if ( ! $last_update_notice_values || ! is_array($last_update_notice_values) ) {
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
            //or until the notice has been displayed 5 times.
            if ( version_compare( HUEMAN_VER, $_db_version , '>' ) ) {
                //CASE 1 : displayed less than 5 times
                if ( $_db_displayed_count < 5 ) {
                    $show_new_notice = true;
                    //increments the counter
                    (int) $_db_displayed_count++;
                    $last_update_notice_values["display_count"] = $_db_displayed_count;
                    //updates the option val with the new count
                    HU_utils::$inst->hu_set_option( $opt_name, $last_update_notice_values );
                }
                //CASE 2 : displayed 5 times => automatic dismiss
                else {
                    //reset option value with new version and counter to 0
                    $new_val  = array( "version" => HUEMAN_VER, "display_count" => 0 );
                    HU_utils::$inst->hu_set_option( $opt_name, $new_val );
                }//end else
            }//end if

            //always display in dev mode
            //$show_new_notice = ( defined( 'CZR_DEV' ) && CZR_DEV ) ? true : $show_new_notice;

            if ( ! $show_new_notice )
              return;

            ob_start();
              ?>
              <div class="updated czr-update-notice" style="position:relative;">
                <?php
                  echo apply_filters(
                    'hu_update_notice',
                    sprintf('<h3>%1$s %2$s %3$s %4$s :D</h3>',
                      __( "Good, you've just upgraded to", "hueman"),
                      'Hueman',
                      __( "version", "hueman"),
                      HUEMAN_VER
                    )
                  );
                ?>
                <?php
                  echo apply_filters(
                    'hu_update_notice',
                    sprintf( '<h4>%1$s <a class="" href="%2$s" title="%3$s" target="_blank">%3$s &raquo;</a></h4>%4$s',
                      __( "We'd like to introduce the new features we've been working on.", "hueman"),
                      HU_WEBSITE . "/category/hueman-releases/",
                      __( "Read the latest release notes" , "hueman" ),
                      ! HU_IS_PRO ? sprintf( '<a class="button button-primary upgrade-to-pro" href="%1$s" title="%2$s" target="_blank">%2$s &raquo;</a>',
                        esc_url('presscustomizr.com/hueman-pro?ref=a'),
                        __( "Upgrade to Hueman Pro", "hueman" )
                      ) : ''
                    )
                  );
                ?>
                <p style="text-align:right;position: absolute;font-size: 1.1em;<?php echo is_rtl()? 'left' : 'right';?>: 7px;bottom: -6px;">
                <?php printf('<a href="#" title="%1$s" class="tc-dismiss-update-notice"> ( %1$s <strong>X</strong> ) </a>',
                    __('close' , 'hueman')
                  );
                ?>
                </p>
                <p>
                  <?php
                  printf(
                    __( 'If you like %1$s please leave us a %2$s rating. A huge thanks in advance!', 'hueman' ),
                    sprintf( '<strong>%s</strong>', esc_html__( 'the Hueman theme', 'hueman' ) ),
                    sprintf( '<a href="%1$s" target="_blank" class="czr-rating-link">&#9733;&#9733;&#9733;&#9733;&#9733;</a>', esc_url( 'wordpress.org/support/theme/hueman/reviews/?filter=5#new-post') )
                  );
                  ?>
                </p>
              </div>
              <?php
            $_html = ob_get_contents();
            if ($_html) ob_end_clean();
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

                      $_el.closest('.updated').slideToggle('fast');
                    });
                };//end of fn

                //on load
                $( function($) {
                  $('.tc-dismiss-update-notice').click( function( e ) {
                    e.preventDefault();
                    _ajax_action( $(this) );
                  } );
                } );

              } )( jQuery );


            </script>
            <?php
        }


    }//end of class
endif;