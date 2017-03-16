<nav class="nav-container group" id="nav-header">
  <?php if ( 'main_menu' == hu_get_option( 'header_mobile_menu_layout' ) ) : ?>
    <div class="mobile-title-logo-in-header"><?php hu_print_logo_or_title();//gets the logo or the site title ?></div>
  <?php endif; ?>
  <?php if ( apply_filters('hu_old_hamburger', false ) ) : ?>
    <div class="nav-toggle"><i class="fa fa-bars"></i></div>
  <?php else : ?>
    <div class="ham__navbar-toggler collapsed" aria-expanded="false">
      <span class="ham-toggler-menu__span"></span>
    </div>
  <?php endif; ?>
  <div class="nav-text"><!-- put your mobile menu text here --></div>
  <div class="nav-wrap container">
    <?php
      if ( is_multisite() ) {
          $fallback_cb = '';
      } else {
          $fallback_cb = hu_is_checked( "default-menu-header" ) ? 'hu_page_menu' : '';
      }
      wp_nav_menu(
          array(
            'theme_location'=>'header',
            'menu_class'=>'nav container-inner group',
            'container'=>'',
            'menu_id' => '',
            'fallback_cb'=> $fallback_cb//is_multisite() ? '' : 'hu_page_menu'
          )
      );
    ?>
  </div>
</nav><!--/#nav-header-->