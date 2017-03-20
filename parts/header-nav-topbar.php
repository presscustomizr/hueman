<?php
  $mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
  $topnav_classes = array(
      'nav-container',
      'group',
      apply_filters( 'hu_is_topnav_sticky_on_desktop', true ) ? 'desktop-sticky' : '',
      'top_menu' == $mobile_menu_opt ? 'mobile-menu mobile-sticky' : '',
      hu_has_nav_menu( 'topbar' ) ? '' : 'no-menu-assigned'
  );
  $fallback_cb = apply_filters( 'hu_topbar_menu_fallback_cb', '' )//set to 'hu_page_menu' on prevdem
?>
<nav class="<?php echo implode(' ', $topnav_classes ); ?>" id="nav-topbar">
  <?php if ( 'top_menu' == $mobile_menu_opt ) : ?>
    <div class="mobile-title-logo-in-header"><?php hu_print_logo_or_title();//gets the logo or the site title ?></div>
  <?php endif; ?>
  <?php if ( hu_has_nav_menu( 'topbar' ) || ! empty( $fallback_cb ) ) : ?>
    <?php hu_print_mobile_btn(); ?>
  <?php endif; ?>
  <div class="nav-text"><?php apply_filters( 'hu_mobile_menu_text', '' );//put your mobile menu text here ?></div>
  <div class="nav-wrap container">
    <?php
      wp_nav_menu(
        array(
            'theme_location'=>'topbar',
            'menu_class'=>'nav container-inner group',
            'container'=>'',
            'menu_id' => '',
            'fallback_cb'=> $fallback_cb
        )
      );
    ?>
  </div>

  <?php if ( apply_filters( 'hu_display_mobile_search', ( 'both_menus' == $mobile_menu_opt || ! wp_is_mobile() ) && ( hu_has_nav_menu( 'topbar' ) || ! empty( $fallback_cb ) ) ) ) : ?>
    <div class="container">
      <div class="container-inner">
        <div class="toggle-search"><i class="fa fa-search"></i></div>
        <div class="search-expand">
          <div class="search-expand-inner">
            <?php get_search_form(); ?>
          </div>
        </div>
      </div><!--/.container-inner-->
    </div><!--/.container-->
  <?php endif; ?>

</nav><!--/#nav-topbar-->