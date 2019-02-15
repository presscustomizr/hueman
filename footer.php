        </div><!--/.main-inner-->
      </div><!--/.main-->
    </div><!--/.container-inner-->
  </div><!--/.container-->
  <?php do_action('__before_footer') ; ?>
  <footer id="footer">

    <?php if ( hu_is_checked('footer-ads') ) : ?>
      <?php
        ob_start();
        hu_print_widgets_in_location( 'footer-ads' );
        $full_width_widget_html = ob_get_contents();
      ?>
      <?php if ( ! empty($full_width_widget_html) ) : ob_end_clean(); ?>
        <section class="container" id="footer-full-width-widget">
          <div class="container-inner">
            <?php hu_print_widgets_in_location( 'footer-ads' ); ?>
          </div><!--/.container-inner-->
        </section><!--/.container-->
      <?php endif; ?>
    <?php endif; ?>

    <?php // footer widgets
    $_footer_columns = 0;
    if ( 0 != intval( hu_get_option( 'footer-widgets' ) ) ) {
        $_footer_columns = intval( hu_get_option( 'footer-widgets' ) );
        if( $_footer_columns == 1) $class = 'one-full';
        if( $_footer_columns == 2) $class = 'one-half';
        if( $_footer_columns == 3) $class = 'one-third';
        if( $_footer_columns == 4) $class = 'one-fourth';
    }


    //when do we display the widget wrapper on front end ?
    // - there's at least a column
    // - the widget zone(s) in the column(s) have at least one widget ( => is_active_sidebar() )

    //when do we display the widget wrapper when customizing ?
    //- there's at least one column

    $is_widget_wrapper_on = false;
    if ( hu_is_customizing() ) {
        $is_widget_wrapper_on = $_footer_columns > 0;
    } else {
        $is_widget_wrapper_on = $_footer_columns > 0;
        $_one_widget_zone_active = false;

        for ( $i = 1; $i <= $_footer_columns; $i++ ) {
          if ( $_one_widget_zone_active )
            continue;
          if ( apply_filters( 'hu_is_active_footer_widget_zone', is_active_sidebar( "footer-{$i}" ), $i, $_footer_columns ) )
            $_one_widget_zone_active = true;
        }//for

        $is_widget_wrapper_on = $is_widget_wrapper_on && $_one_widget_zone_active;
    }

    if ( $is_widget_wrapper_on ) : ?>

        <section class="container" id="footer-widgets">
          <div class="container-inner">

            <div class="pad group">

              <?php for ($i = 1; $i <= $_footer_columns ;$i++ ) : ?>
                  <div class="footer-widget-<?php echo $i; ?> grid <?php echo $class; ?> <?php if ( $i == $_footer_columns ) { echo 'last'; } ?>">
                    <?php hu_print_widgets_in_location( 'footer-' . $i ); ?>
                  </div>
              <?php endfor; ?>

            </div><!--/.pad-->

          </div><!--/.container-inner-->
        </section><!--/.container-->

    <?php endif; //$is_widget_wrapper_on ?>

    <?php if ( hu_has_nav_menu( 'footer' ) ): ?>
      <nav class="nav-container group" id="nav-footer" data-menu-id="<?php echo hu_get_menu_id( 'footer'); ?>" data-menu-scrollable="false">
        <?php hu_print_mobile_btn(); ?>
        <div class="nav-text"><?php apply_filters( 'hu_mobile_menu_text', '' );//put your mobile menu text here ?></div>
        <div class="nav-wrap">
          <?php
            wp_nav_menu(
                array(
                  'theme_location'=>'footer',
                  'menu_class'=>'nav container group',
                  'container'=>'',
                  'menu_id'=>'',
                  'fallback_cb'=> 'hu_page_menu'
              )
            );
          ?>
        </div>
      </nav><!--/#nav-footer-->
    <?php endif; ?>

    <section class="container" id="footer-bottom">
      <div class="container-inner">

        <a id="back-to-top" href="#"><i class="fas fa-angle-up"></i></a>

        <div class="pad group">

          <div class="grid one-half">
            <?php $_footer_logo_img_src = apply_filters( 'hu_footer_logo_src', hu_get_img_src_from_option('footer-logo') ); ?>
            <?php if ( false !== $_footer_logo_img_src && ! empty($_footer_logo_img_src) ) : ?>
              <img id="footer-logo" src="<?php echo $_footer_logo_img_src; ?>" alt="<?php get_bloginfo('name'); ?>">
            <?php endif; ?>

            <div id="copyright">
                <p><?php echo apply_filters('hu_parse_template_tags', wp_kses_post( hu_get_option( 'copyright' ) ) ); ?></p>
            </div><!--/#copyright-->

            <?php if ( hu_is_checked( 'credit' ) || hu_is_customizing() ) : ?>
              <?php
                $hu_theme = wp_get_theme();
              ?>
              <?php ob_start(); ?>
                  <div id="credit" style="<?php echo ! hu_is_checked( 'credit' ) ? 'display:none' : ''; ?>">
                    <p><?php _e('Powered by','hueman'); ?>&nbsp;<a class="fab fa-wordpress" title="<?php _e( 'Powered by WordPress', 'hueman' ) ?>" href="<?php echo esc_url( __( 'https://wordpress.org/', 'hueman' ) ); ?>" target="_blank"></a> - <?php _e('Designed with the','hueman'); ?>&nbsp;<a href="<?php echo $hu_theme -> get('ThemeURI'); ?>" title="<?php _e('Hueman theme','hueman'); ?>"><?php _e('Hueman theme','hueman'); ?></a></p>
                  </div><!--/#credit-->
              <?php
                $credits_html = ob_get_contents();
                if ($credits_html) ob_end_clean();
                echo apply_filters( 'hu_credits_html', $credits_html );
              ?>
            <?php endif; ?>

          </div>

          <div class="grid one-half last">
            <?php if ( hu_has_social_links() || hu_is_customizing() ) : ?>
              <?php hu_print_social_links(); ?>
            <?php else : //if not customizing, display an empty p for design purposes ?>
                <?php if ( hu_user_can_see_customize_notices_on_front() ) : ?>
                    <?php
                      printf( '<p style="text-transform:none;text-align: right;">%1$s. <br/><a style="color: white;text-decoration:underline;" href="%2$s" title="%3$s">%3$s &raquo;</a></p>',
                          __('You can set your social links here from the live customizer', 'hueman'),
                          admin_url( 'customize.php?autofocus[section]=social_links_sec' ),
                          __('Customize now', 'hueman')
                      );
                    ?>
                <?php endif; ?>
            <?php endif; ?>
          </div>

        </div><!--/.pad-->

      </div><!--/.container-inner-->
    </section><!--/.container-->

  </footer><!--/#footer-->

</div><!--/#wrapper-->

<?php wp_footer(); ?>
</body>
</html>