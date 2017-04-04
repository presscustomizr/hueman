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
    //=> when there's a topbar menu assigned or when the default page menu option "default-menu-header" is checked ( not for multisite @see issue on github )
    $top_nav_fb = apply_filters( 'hu_topbar_menu_fallback_cb', ( ! is_multisite() && hu_is_checked( "default-menu-header" ) ) ? 'hu_page_menu' : '' );
    $display_top_nav = hu_has_nav_menu( 'topbar' ) || ! empty( $top_nav_fb );

    //WHEN DO WE DISPLAY THE HEADER NAW ?
    // => when there's a header menu assigned or when the fallback callback function is set ( with a filter, used in prevdem scenario typically )
    $header_nav_fb = apply_filters( 'hu_header_menu_fallback_cb', '' );
    $display_header_nav = hu_has_nav_menu( 'header' ) || ! empty( $header_nav_fb );
    //( ! wp_is_mobile() && hu_has_nav_menu( 'header' ) ) || in_array( $mobile_menu_opt, array( 'main_menu', 'both_menus' ) )


?>
<header id="header" class="<?php echo apply_filters( 'hu_header_classes', implode(' ', array( $mobile_menu_class ) ) ); ?>">
  <?php if ( 'both_menus' != $mobile_menu_opt ) : //if both menus is the user option, we won't use the mobile navigation ?>
      <?php get_template_part('parts/header-nav-mobile'); ?>
  <?php endif; ?>

  <?php if ( $display_top_nav ) : //$display_top_nav ): ?>
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

      <?php if ( $display_header_nav ) : //$display_header_nav ) : ?>
        <?php get_template_part('parts/header-nav-main'); ?>
      <?php endif; ?>

    </div><!--/.container-inner-->
    <?php do_action('__header_after_container_inner'); ?>
  </div><!--/.container-->

</header><!--/#header-->