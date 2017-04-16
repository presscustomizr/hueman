<?php
/**
* Init admin page actions : Welcome, help page
*
*/
if ( ! class_exists( 'HU_admin_page' ) ) :
  class HU_admin_page {
    static $instance;
    public $support_url;

    function __construct () {
      self::$instance =& $this;
      //add welcome page in menu
      add_action( 'admin_menu'             , array( $this , 'hu_add_welcome_page' ));
      //upgrade notice
      //add_action( '__before_changelog'     , array( $this, 'hu_print_upgrade_admin_notice'));
      //config infos
      add_action( '__after_welcome_panel'  , array( $this , 'hu_config_infos' ), 10 );
      //changelog
      add_action( '__after_welcome_panel'  , array( $this , 'hu_print_changelog' ), 20);

      //build the support url
      //build the support url
      $this -> support_url = HU_IS_PRO ? esc_url( sprintf( '%ssupport' , 'presscustomizr.com/' ) ) : esc_url('wordpress.org/support/theme/hueman');
      //fix #wpfooter absolute positioning in the welcome and about pages
      add_action( 'admin_print_styles'      , array( $this, 'hu_fix_wp_footer_link_style') );
    }

    function hu_print_upgrade_admin_notice() {
      // if ( ! isset( $_REQUEST['page'] ) || $_REQUEST['page'] != 'welcome.php' )
      //   return;
      ?>
      <div class="notice notice-warning" style="display:block!important">
        <br/><br/>
            <?php
              printf(
                __( '<h2>As per the WordPress themes guidelines (%1$s), all the Hueman theme options have been moved to the %2$s.</h2>', 'hueman' ),
                sprintf('<a href="%1$s" target="_blank">%2$s</a>', esc_url('https://make.wordpress.org/themes/handbook/review/required/#options-and-settings'), __('more informations here', 'hueman') ),
                sprintf('<a href="%1$s">%2$s</a>', admin_url('customize.php'), __('customizer', 'hueman') )
              );
            ?>
          <p><?php _e("All your previous options have been kept and are available in the customizer options panel.", "hueman" ) ?>
          <br/>
          <br/>
      </div>
      <?php
    }

   /**
   * Add fallback admin page.
   * @package Hueman
   * @since Hueman 1.1
   */
    function hu_add_welcome_page() {
        $_name = __( 'About Hueman' , 'hueman' );
        $_name = HU_IS_PRO ? sprintf( '%s Pro', $_name ) : $_name;

        $theme_page = add_theme_page(
            $_name,   // Name of page
            $_name,   // Label in menu
            'edit_theme_options' ,          // Capability required
            'welcome.php' ,             // Menu slug, used to uniquely identify the page
            array( $this , 'hu_welcome_panel' )         //function to be called to output the content of this page
        );
    }



      /**
     * Render welcome admin page.
     */
      function hu_welcome_panel() {
        $is_help        = isset($_GET['help'])  ?  true : false;
        $_support_url   = $this -> support_url;
        $_theme_name    = HU_IS_PRO ? 'Hueman Pro' : 'Hueman';

        do_action('__before_welcome_panel');

        ?>
        <div id="hueman-admin-panel" class="wrap about-wrap">
          <?php
            if ( $is_help ) {
              printf( '<h1 style="font-size: 2.5em;" class="need-help-title">%1$s %2$s ?</h1>',
                __( "Need help with", 'hueman' ),
                $_theme_name
              );
            } else {
              printf( '<h1 class="need-help-title">%1$s %2$s %3$s</h1>',
                __( "Welcome to", 'hueman' ),
                $_theme_name,
                HUEMAN_VER
              );
            }
          ?>


          <?php if ( $is_help ) : ?>

            <?php $this -> hu_render_help_content(); ?>

          <?php else: ?>

            <div class="about-text tc-welcome">
              <?php
                printf( '<p>%1$s %2$s</p> <p>%3$s. <strong>%4$s</strong></p>',
                  __( "Thank you for using the Hueman WordPress theme for your website.", 'hueman' ),
                  sprintf( __( "Hueman %s has more features, is safer and more stable than ever to help you designing an awesome webdesign.", 'hueman' ), HUEMAN_VER ),
                  sprintf( __( "For more informations about this new version of the theme, %s or check the changelog below", "hueman" ),
                    sprintf('<a href="%1$s" target="_blank">%2$s</a>', HU_WEBSITE . "/category/hueman-releases/", __( "read the latest release notes" , "hueman" ) )
                  ),
                  sprintf('<a href="#hueman-changelog" title="%1$s">%1$s</a>', __( 'Changelog' , 'hueman' ) )
                );

                printf( '<p><strong>%1$s</strong></p>',
                  sprintf( __( "The best way to start with %s is to read the %s and visit the %s.", 'hueman'),
                    $_theme_name,
                    sprintf( '<a href="%1$s" title="%2$s" target="_blank" style="font-style:italic">%2$s</a>', esc_url('docs.presscustomizr.com/article/236-first-steps-with-the-hueman-wordpress-theme'), __("getting started guide", 'hueman') ),
                    sprintf( '<a href="%1$s" title="%2$s" target="_blank">%2$s</a>', esc_url('demo-hueman.presscustomizr.com'), __("demo website", 'hueman') )
                  )
                );
              ?>
            </div>

          <?php endif; ?>

          <?php if ( is_child_theme() ) : ?>
            <div class="changelog point-releases"></div>

            <div class="tc-upgrade-notice">
              <p>
              <?php
                printf( __('You are using a child theme of Hueman %1$s : always check the %2$s after upgrading to see if a function or a template has been deprecated.' , 'hueman'),
                  'v'.HUEMAN_VER,
                  '<strong><a href="#hueman-changelog">changelog</a></strong>'
                  );
                ?>
              </p>
            </div>
          <?php endif; ?>

          <div class="changelog point-releases"></div>


        <?php do_action( '__after_welcome_panel' ); ?>

        <div class="return-to-dashboard">
          <a href="<?php echo esc_url( self_admin_url() ); ?>"><?php
            is_blog_admin() ? _e( 'Go to Dashboard &rarr; Home','hueman' ) : _e( 'Go to Dashboard','hueman' ); ?></a>
        </div>

      </div><!-- //#hueman-admin-panel -->
      <?php
    }


    function hu_render_help_content() {
      ob_start();
      ?>
        <div class="changelog">
              <div class="about-text tc-welcome">
            <?php
              printf( '<p>%1$s</p>',
                sprintf( __( "The best way to start is to read the %s." , 'hueman' ),
                  sprintf('<a href="%1$s" title="%2$s" target="_blank">%2$s</a>', esc_url('docs.presscustomizr.com/article/236-first-steps-with-the-hueman-wordpress-theme'), __("knowledge base" , 'hueman') )
                )
              );
              if ( ! HU_IS_PRO ) {
                  printf( '<p>%1$s <a href="%2$s" title="support forum" target="_blank">%3$s</a>.</p>',
                      __( "If you don't find an answer to your question in the documentation, don't panic :) ! The Hueman theme is used by a large number of webmasters constantly reporting bugs and potential issues. If you encounter a problem with the theme, chances are that it's already been reported and fixed in the", 'hueman' ),
                      $this -> support_url,
                      __('support forum', 'hueman')
                    );//printf
              }
              ?>
            </div>
            <div class="feature-section col two-col">
              <div class="col">
                  <a class="button-secondary hueman-help" title="documentation" href="<?php echo esc_url('docs.presscustomizr.com/article/236-first-steps-with-the-hueman-wordpress-theme') ?>" target="_blank"><?php _e( 'Open the knowledge base','hueman' ); ?></a>
              </div>
            </div><!-- .two-col -->
          </div><!-- .changelog -->
        <?php
      $html = ob_get_contents();
      if ($html) ob_end_clean();
      echo convert_smilies($html);
    }


    /**
   * Extract changelog of latest version from readme.txt file
   *
   */
    function hu_print_changelog() {
      if ( isset($_GET['help']) )
        return;
      if( ! file_exists(HU_BASE."readme.txt") ) {
        return;
      }
      if( ! is_readable(HU_BASE."readme.txt") ) {
        echo '<p>The changelog in readme.txt is not readable.</p>';
        return;
      }

      $html = '';
      $stylelines = explode("\n", implode('', file(HU_BASE."readme.txt")));
      $read = false;
      $is_title = false;

      foreach ($stylelines as $line) {
          $is_title = 0 === strpos($line, '= ');

          //we start reading after current version title
          if ( 0 === strpos($line, '= '.HUEMAN_VER) ) {
            $read = true;
          }

          if ( ! $read )
            continue;

          if ( $is_title ) {
            $html .= sprintf( '<strong>%1$s</strong><br/>', esc_attr( $line ) );
          } else {
            $html .= sprintf( '<i>%1$s</i><br/>', esc_attr( $line ) );
          }
      }
      do_action('__before_changelog')
      ?>

      <div id="hueman-changelog" class="changelog">
        <h3><?php printf( __( 'Changelog' , 'hueman' ) , HUEMAN_VER ); ?></h3>
          <p><?php echo $html ?></p>
      </div>
      <?php
    }



    /*
    * Inspired by Easy Digital Download plugin by Pippin Williamson
    * @since 3.2.1
    */
    function hu_config_infos() {
      global $wpdb;
      //get WP_Theme
      $_theme                     = wp_get_theme();

      //Get infos from parent theme if using a child theme
      $_theme = $_theme -> parent() ? $_theme -> parent() : $_theme;

      ?>
<div class="wrap">
<h3><?php _e( 'System Informations', 'hueman' ); ?></h3>
<h4 style="text-align: left"><?php _e( 'Please include the following informations when posting support requests' , 'hueman' ) ?></h4>
<textarea readonly="readonly" onclick="this.focus();this.select()" id="system-info-textarea" name="tc-sysinfo" title="<?php _e( 'To copy the system infos, click below then press Ctrl + C (PC) or Cmd + C (Mac).', 'hueman' ); ?>" style="width: 800px;min-height: 800px;font-family: Menlo,Monaco,monospace;background: 0 0;white-space: pre;overflow: auto;display:block;">
<?php do_action( '__system_config_before' ); ?>
# SITE_URL:               <?php echo site_url() . "\n"; ?>
# HOME_URL:               <?php echo home_url() . "\n"; ?>
# IS MULTISITE :          <?php echo is_multisite() ? 'Yes' . "\n" : 'No' . "\n" ?>

# THEME | VERSION :       <?php echo sprintf( '%1$s | v%2$s', $_theme -> name , HUEMAN_VER ) . "\n"; ?>
# WP VERSION :            <?php echo get_bloginfo( 'version' ) . "\n"; ?>
# PERMALINK STRUCTURE :   <?php echo get_option( 'permalink_structure' ) . "\n"; ?>
<?php
$plugins = get_plugins();
$active_plugins = get_option( 'active_plugins', array() );
?>
<?php if ( empty($active_plugins) ) : ?>
# NO ACTIVE PLUGINS
<?php else : ?>
# <?php echo count($active_plugins); ?> ACTIVE PLUGINS :
<?php
  foreach ( $plugins as $plugin_path => $plugin ) {
    // If the plugin isn't active, don't show it.
    if ( ! in_array( $plugin_path, $active_plugins ) )
      continue;

    echo '                          - ' . $plugin['Name'] . ' (version ' . $plugin['Version'] .')' ."\n";
  }
?>
<?php endif;//end if active plugins not empty ?>
<?php
if ( is_multisite() ) :
?>
#  NETWORK ACTIVE PLUGINS:
<?php
$plugins = wp_get_active_network_plugins();
$active_plugins = get_site_option( 'active_sitewide_plugins', array() );

foreach ( $plugins as $plugin_path ) {
  $plugin_base = plugin_basename( $plugin_path );

  // If the plugin isn't active, don't show it.
  if ( ! array_key_exists( $plugin_base, $active_plugins ) )
    continue;

  $plugin = get_plugin_data( $plugin_path );

  echo '                          - ' . $plugin['Name'] . ' ( version ' . $plugin['Version'] .' )' ."\n";
}
endif;
//GET MYSQL VERSION
global $wpdb;
$mysql_ver =  ( ! empty( $wpdb->use_mysqli ) && $wpdb->use_mysqli ) ? @mysqli_get_server_info( $wpdb->dbh ) : '';
?>

# PHP Version:            <?php echo PHP_VERSION . "\n"; ?>
# MySQL Version:          <?php echo $mysql_ver . "\n"; ?>
# Web Server Info:        <?php echo $_SERVER['SERVER_SOFTWARE'] . "\n"; ?>

# WordPress Memory Limit: <?php echo ( $this -> hu_let_to_num( WP_MEMORY_LIMIT )/( 1024 ) )."MB"; ?><?php echo "\n"; ?>
# PHP Memory Limit:       <?php echo ini_get( 'memory_limit' ) . "\n"; ?>
# PHP Upload Max Size:    <?php echo ini_get( 'upload_max_filesize' ) . "\n"; ?>
# PHP Post Max Size:      <?php echo ini_get( 'post_max_size' ) . "\n"; ?>
# PHP Upload Max Filesize:<?php echo ini_get( 'upload_max_filesize' ) . "\n"; ?>
# PHP Time Limit:         <?php echo ini_get( 'max_execution_time' ) . "\n"; ?>
# PHP Max Input Vars:     <?php echo ini_get( 'max_input_vars' ) . "\n"; ?>
# PHP Arg Separator:      <?php echo ini_get( 'arg_separator.output' ) . "\n"; ?>
# PHP Allow URL File Open:<?php echo ini_get( 'allow_url_fopen' ) ? "Yes" : "No\n"; ?>

# WP_DEBUG:               <?php echo defined( 'WP_DEBUG' ) ? WP_DEBUG ? 'Enabled' . "\n" : 'Disabled' . "\n" : 'Not set' . "\n" ?>

# Show On Front:          <?php echo get_option( 'show_on_front' ) . "\n" ?>
# Page On Front:          <?php $id = get_option( 'page_on_front' ); echo get_the_title( $id ) . '(#' . $id . ')' . "\n" ?>
# Page For Posts:         <?php $id = get_option( 'page_for_posts' ); echo get_the_title( $id ) . '(#' . $id . ')' . "\n" ?>
<?php do_action( '__system_config_after' ); ?>
</textarea>
</div>
</div>
      <?php
      }//end of function


      /**
       * TC Let To Num
       *
       * Does Size Conversions
       *
       *
       * @since 3.2.2
       */
      function hu_let_to_num( $v ) {
        $l   = substr( $v, -1 );
        $ret = substr( $v, 0, -1 );

        switch ( strtoupper( $l ) ) {
          case 'P': // fall-through
          case 'T': // fall-through
          case 'G': // fall-through
          case 'M': // fall-through
          case 'K': // fall-through
            $ret *= 1024;
            break;
          default:
            break;
        }

        return $ret;
      }

    /**
    * hook : admin_print_styles
    * fix the absolute positioning of the wp footer admin link in the welcome pages
    * @return void
    */
    function hu_fix_wp_footer_link_style() {
      /* if ( is_array(get_current_screen()) )
        array_walk_recursive(get_current_screen(), function(&$v) { $v = htmlspecialchars($v); }); */
      $screen = get_current_screen();
      if ( 'appearance_page_welcome' != $screen-> id )
        return;
      ?>
        <style type="text/css" id="tc-fix-wp-footer-position">
          .wp-admin #wpfooter {bottom: inherit;}
        </style>
      <?php
    }

  }//end of class
endif;