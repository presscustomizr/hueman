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

      //build the support url
      //build the support url
      $this -> support_url = HU_IS_PRO ? esc_url( sprintf( '%ssupport' , 'presscustomizr.com/' ) ) : esc_url('wordpress.org/support/theme/hueman');
      //fix #wpfooter absolute positioning in the welcome and about pages
      add_action( 'admin_print_styles'      , array( $this, 'hu_fix_wp_footer_link_style') );
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
     * @package Hueman
     * @since Hueman 3.0.4
     */
    function hu_welcome_panel() {
      $_theme_name    = HU_IS_PRO ? 'Hueman Pro' : 'Hueman';

      ?>
      <div class="hueman-admin-panel">
        <div class="about-text tc-welcome">
          <?php
            $title = sprintf( '<h1 class="czr-welcome-title">%1$s %2$s %3$s :)</h1>',
              __( "Thank you for using", "hueman" ),
              $_theme_name,
              HUEMAN_VER
            );
            echo convert_smilies( $title );
          ?>

          <?php
            if ( !HU_IS_PRO ) {
              printf( '<h3>%1$s ❤️.</h3><h4>%2$s</h4><h4 style="font-weight:bold">%3$s 🙏</h4>',
                sprintf( __( "If you enjoy using the Hueman theme for your website, you will love %s", "hueman"),
                  sprintf( '<a style="color:#d87f00" href="%1$s" title="%2$s" target="_blank">%2$s</a>', 'https://presscustomizr.com/hueman-pro/', __("Hueman Pro", "hueman") )
                ),
                __("With Hueman Pro, you get premium features like infinite scrolling, footer and header customization, font customizer and many more. In addition, our premium support will be there to help you resolve any issue you may have with the theme. When installing Hueman Pro, all your previous options used in Hueman free are kept.", 'hueman'),
                __('And of course your support allows us to keep the theme at the highest level for your website. Thank you!', 'hueman')
              );
            }
          ?>
        </div>
          
        <?php echo $this->hu_print_changelog(); ?>

        
        <div class="czr-col-50 first-col">
          <h3 style="font-size:1.3em;"><?php _e( 'Knowledge base','hueman' ); ?></h3>
          <p><?php _e( "We have prepared a complete online documentation of the theme.",'hueman' ) ?></br>
          <a class="button-primary review-hueman" href="<?php echo 'https://docs.presscustomizr.com/' ?>" target="_blank"><?php _e('Hueman Documentation','hueman'); ?></a></p>
          <!-- Place this tag where you want the widget to render. -->
        </div>
        
        <div class="czr-col-50">
          <h3 style="font-size:1.3em;"><?php _e( 'Share your feedback','hueman' ); ?></h3>
          <p><?php _e( 'If you are happy with the theme, say it on wordpress.org and give Hueman a nice review!','hueman' ) ?></br>
          <a class="button-primary review-hueman" href="<?php echo esc_url('wordpress.org/support/view/theme-reviews/hueman') ?>" target="_blank"><?php _e('Share a review','hueman'); ?></a></p>
        </div>

      <?php echo $this->hu_config_infos() ?>
    </div><!-- //#hueman-admin-panel -->
    <?php
  }
     



    /**
   * Extract changelog of latest version from readme.txt file
   *
   */
    function hu_print_changelog() {
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
      ?>

      <div id="hueman-changelog" class="changelog">
        <h3><?php printf( __( 'Changelog' , 'hueman' ) , HUEMAN_VER ); ?></h3>
        <p><?php echo $html ?></p>
        <p><strong><?php printf('<a href="%1$s" title="%2$s" target="_blank" rel="noopener noreferrer">%2$s %3$s</a>',
                    HU_WEBSITE . "/category/hueman-releases/",
                    __( "Read the latest release notes" , "hueman" ),
                    is_rtl() ? '&laquo;' : '&raquo;'
          ); ?></strong></p>
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
      $theme_data   = wp_get_theme();
      $theme        = $theme_data->Name . ' ' . $theme_data->Version;
      $parent_theme = $theme_data->Template;
      if ( ! empty( $parent_theme ) ) {
        $parent_theme_data = wp_get_theme( $parent_theme );
        $parent_theme      = $parent_theme_data->Name . ' ' . $parent_theme_data->Version;
      }

      ?>
<div class="hu-config-info">
<h3><?php _e( 'System Information', 'hueman' ); ?></h3>
<h4 style="text-align: left"><?php _e( 'Please include the following information when posting support requests' , 'hueman' ) ?></h4>
<textarea readonly="readonly" onclick="this.focus();this.select()" id="system-info-textarea" name="tc-sysinfo" title="<?php _e( 'To copy the system infos, click below then press Ctrl + C (PC) or Cmd + C (Mac).', 'hueman' ); ?>" style="width: 100%;min-height: 800px;font-family: Menlo,Monaco,monospace;background: 0 0;white-space: pre;overflow: auto;display:block;">
<?php do_action( '__system_config_before' ); ?>
# SITE_URL:               <?php echo site_url() . "\n"; ?>
# HOME_URL:               <?php echo esc_url( home_url() ) . "\n"; ?>
# IS MULTISITE :          <?php echo is_multisite() ? 'Yes' . "\n" : 'No' . "\n" ?>

# ACTIVE THEME :          <?php echo $theme . "\n"; ?>
<?php if ( $parent_theme !== $theme ) : ?>
# PARENT THEME :          <?php echo $parent_theme . "\n"; ?>
<?php endif; ?>
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
</div><?php // .wrap ?>
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
      $screen = get_current_screen();
      if ( ! is_object( $screen ) || 'appearance_page_welcome' != $screen-> id )
        return;
      ?>
        <style type="text/css" id="tc-fix-wp-footer-position">
          .wp-admin #wpfooter {bottom: inherit;}
        </style>
      <?php
    }

  }//end of class
endif;