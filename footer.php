        </div><!--/.main-inner-->
      </div><!--/.main-->
    </div><!--/.container-inner-->
  </div><!--/.container-->

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

    $_bool = false;
    if ( hu_is_customizing() ) {
      $_bool = $_footer_columns > 0;
    } else {
      $_bool = $_footer_columns > 0;
      $_one_widget_zone_active = false;

      for ( $i = 1; $i <= $_footer_columns; $i++ ) {
        if ( $_one_widget_zone_active )
          continue;
        if ( is_active_sidebar( "footer-{$i}" ) )
          $_one_widget_zone_active = true;
      }//for

      $_bool = $_bool && $_one_widget_zone_active;
    }

    if ( $_bool ) : ?>

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

    <?php endif; //$_bool ?>

    <?php if ( has_nav_menu( 'footer' ) ): ?>
      <nav class="nav-container group" id="nav-footer">
        <div class="nav-toggle"><i class="fa fa-bars"></i></div>
        <div class="nav-text"><!-- put your mobile menu text here --></div>
        <div class="nav-wrap"><?php wp_nav_menu( array('theme_location'=>'footer','menu_class'=>'nav container group','container'=>'','menu_id'=>'','fallback_cb'=>false) ); ?></div>
      </nav><!--/#nav-footer-->
    <?php endif; ?>

    <section class="container" id="footer-bottom">
      <div class="container-inner">

        <a id="back-to-top" href="#"><i class="fa fa-angle-up"></i></a>

        <div class="pad group">

          <div class="grid one-half">
            <?php $_footer_logo_img_src = hu_get_img_src_from_option('footer-logo'); ?>
            <?php if ( false !== $_footer_logo_img_src && ! empty($_footer_logo_img_src) ) : ?>
              <img id="footer-logo" src="<?php echo $_footer_logo_img_src; ?>" alt="<?php get_bloginfo('name'); ?>">
            <?php endif; ?>

            <div id="copyright">
              <?php if ( hu_get_option( 'copyright' ) ) : ?>
                <p><?php echo wp_kses_post( hu_get_option( 'copyright' ) ); ?></p>
              <?php else: ?>
                <p><?php bloginfo(); ?> &copy; <?php echo date( 'Y' ); ?>. <?php _e( 'All Rights Reserved.', 'hueman' ); ?></p>
              <?php endif; ?>
            </div><!--/#copyright-->

            <?php if ( hu_is_checked( 'credit' ) || hu_is_customizing() ) : ?>
              <div id="credit" style="<?php echo ! hu_is_checked( 'credit' ) ? 'display:none' : ''; ?>">
                <p><?php _e('Powered by','hueman'); ?> <a href="http://wordpress.org" target="_blank">WordPress</a>. <?php _e('Theme by','hueman'); ?> <a href="http://presscustomizr.com">Press Customizr</a>.</p>
              </div><!--/#credit-->
            <?php endif; ?>

          </div>

          <div class="grid one-half last">
            <?php hu_print_social_links(); ?>
          </div>

        </div><!--/.pad-->

      </div><!--/.container-inner-->
    </section><!--/.container-->

  </footer><!--/#footer-->

</div><!--/#wrapper-->

<?php wp_footer(); ?>
</body>
</html>
