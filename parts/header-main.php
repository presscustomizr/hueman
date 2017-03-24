<?php
    //Model definition
    //MENUS
    $class_map = array(
        'main_menu'   => 'main-menu-mobile-on',
        'top_menu'    => 'top-menu-mobile-on',
        'both_menus'  => 'both-menus-mobile-on'
    );
    $mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
    $mobile_menu_class = array_key_exists( $mobile_menu_opt, $class_map ) ? $class_map[ $mobile_menu_opt ] : 'main-menu-mobile-on';

    //HEADER IMAGE
    $_header_img_src = get_header_image();// hu_get_img_src_from_option('header-image');
    $_has_header_img = false != $_header_img_src && ! empty( $_header_img_src );

    //WHEN DO WE DISPLAY THE REGULAR TOP NAV
    //1) when is not mobile
    //2) when is mobile and both_menus
    $display_top_nav = ! wp_is_mobile() || ( wp_is_mobile() && 'both_menus' == $mobile_menu_opt );
    // if ( wp_is_mobile() && 'both_menus' == $mobile_menu_opt ) {
    //     $display_top_nav = true;
    // }
    //hu_has_nav_menu( 'topbar' ) || in_array( $mobile_menu_opt, array( 'top_menu', 'both_menus' )

    $display_header_nav = ! wp_is_mobile() || ( wp_is_mobile() && 'both_menus' == $mobile_menu_opt );
    //( ! wp_is_mobile() && hu_has_nav_menu( 'header' ) ) || in_array( $mobile_menu_opt, array( 'main_menu', 'both_menus' ) )


?>
<header id="header" class="<?php echo apply_filters( 'hu_header_classes', implode(' ', array( $mobile_menu_class ) ) ); ?>">
  <?php if ( wp_is_mobile() || ( ! wp_is_mobile() && 'both_menus' != $mobile_menu_opt ) ) : ?>
      <?php get_template_part('parts/header-nav-mobile'); ?>
  <?php endif; ?>

  <?php if ( $display_top_nav ): ?>
      <?php get_template_part( 'parts/header-nav-topbar' ); ?>
  <?php endif; ?>

  <div class="container group">
    <?php do_action('__before_after_container_inner'); ?>
    <div class="container-inner">

      <?php if ( ! $_has_header_img || ! hu_is_checked( 'use-header-image' ) ) : ?>

              <div class="group pad central-header-zone">
                <?php hu_print_logo_or_title();//gets the logo or the site title ?>
                <?php if ( hu_is_checked('site-description') ): ?><p class="site-description"><?php hu_render_blog_description() ?></p><?php endif; ?>

                <?php if ( hu_is_checked('header-ads') && ! wp_is_mobile() ) : ?>
                  <div id="header-widgets">
                    <?php hu_print_widgets_in_location( 'header-ads' ); ?>
                  </div><!--/#header-ads-->
                <?php endif; ?>
              </div>

      <?php else :  ?>
          <div id="header-image-wrap">
              <?php hu_render_header_image( $_header_img_src ); ?>
          </div>
      <?php endif; ?>

      <?php if ( $display_header_nav ) : ?>
        <?php get_template_part('parts/header-nav-main'); ?>
      <?php endif; ?>

    </div><!--/.container-inner-->
    <?php do_action('__header_after_container_inner'); ?>
  </div><!--/.container-->

</header><!--/#header-->