<?php
    //Model definition
    //MENUS
    $class_map = array(
        'main_menu'   => 'main-menu-mobile-on',
        'top_menu'    => 'top-menu-mobile-on',
        'mobile_menu' => 'specific-mobile-menu-on',
        'both_menus'  => 'both-menus-mobile-on'
    );
    $mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
    $mobile_menu_class = array_key_exists( $mobile_menu_opt, $class_map ) ? $class_map[ $mobile_menu_opt ] : 'main-menu-mobile-on';

    //HEADER IMAGE
    $_header_img_src = get_header_image();// hu_get_img_src_from_option('header-image');
    $_has_header_img = false != $_header_img_src && ! empty( $_header_img_src );
    $_print_header_img = $_has_header_img && hu_is_checked( 'use-header-image' );

    //WHEN DO WE DISPLAY THE REGULAR TOP NAV
    //=> when there's a topbar menu assigned or when the default page menu option "default-menu-header" is checked ( not for multisite @see issue on github )
    //@see hu_is_topbar_displayed() in init-functions.php

    //WHEN DO WE DISPLAY THE HEADER NAV ?
    // => when there's a header menu assigned or when the fallback callback function is set ( with a filter, used in prevdem scenario typically )
    //@see hu_is_header_nav_displayed() in init-functions.php
    //( ! wp_is_mobile() && hu_has_nav_menu( 'header' ) ) || in_array( $mobile_menu_opt, array( 'main_menu', 'both_menus' ) )

    //HEADER CSS CLASSES
    $header_classes = array(
        $mobile_menu_class,
        'both_menus' == $mobile_menu_opt ? 'two-mobile-menus' : 'one-mobile-menu',
        hu_get_option( 'header_mobile_menu_layout' ),
        hu_is_checked( 'header-ads-desktop' ) ? 'header-ads-desktop' : '',
        hu_is_checked( 'header-ads-mobile' ) ? 'header-ads-mobile' : '',
        hu_is_checked( 'transparent-fixed-topnav') ? 'topbar-transparent' : '',
        $_print_header_img ? 'has-header-img' : 'no-header-img'
    );

?>
<header id="header" class="<?php echo apply_filters( 'hu_header_classes', implode(' ', $header_classes ) ); ?>">
  <?php if ( 'both_menus' != $mobile_menu_opt ) : //if both menus is the user option, we won't use the mobile navigation ?>
      <?php get_template_part('parts/header-nav-mobile'); ?>
  <?php endif; ?>

  <?php if ( hu_is_topbar_displayed() ) : ?>
      <?php get_template_part( 'parts/header-nav-topbar' ); ?>
  <?php endif; ?>

  <div class="container group">
    <?php do_action('__before_after_container_inner'); ?>
    <div class="container-inner">

      <?php if ( ! $_print_header_img ) : ?>
              <div class="group pad central-header-zone">
                  <div class="logo-tagline-group">
                      <?php hu_print_logo_or_title();//gets the logo or the site title ?>
                      <?php if ( hu_is_checked('site-description') ) : ?>
                          <p class="site-description"><?php hu_render_blog_description() ?></p>
                      <?php endif; ?>
                  </div>

                  <?php if ( hu_is_checked('header-ads') ) : ?>
                      <div id="header-widgets">
                          <?php hu_print_widgets_in_location( 'header-ads' ); ?>
                      </div><!--/#header-ads-->
                  <?php endif; ?>
              </div>
      <?php else :  ?>
          <div id="header-image-wrap">
              <div class="group pad central-header-zone">
                  <?php if ( hu_is_checked( 'logo-title-on-header-image' ) ) : ?>
                      <div class="logo-tagline-group">
                          <?php hu_print_logo_or_title();//gets the logo or the site title ?>
                          <?php if ( hu_is_checked('site-description') ) : ?>
                              <p class="site-description"><?php hu_render_blog_description() ?></p>
                          <?php endif; ?>
                      </div>
                  <?php endif; ?>
                  <?php if ( hu_is_checked('header-ads') ) : ?>
                      <div id="header-widgets">
                          <?php hu_print_widgets_in_location( 'header-ads' ); ?>
                      </div><!--/#header-ads-->
                  <?php endif; ?>
              </div>

              <?php hu_render_header_image( $_header_img_src ); ?>
          </div>
      <?php endif; ?>

      <?php if ( hu_is_header_nav_displayed() ) : ?>
          <?php get_template_part('parts/header-nav-main'); ?>
      <?php endif; ?>

    </div><!--/.container-inner-->
    <?php do_action('__header_after_container_inner'); ?>
  </div><!--/.container-->

</header><!--/#header-->