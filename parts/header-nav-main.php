<?php
  $mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
?>
<nav class="nav-container group" id="nav-header">
  <?php if ( ! wp_is_mobile() || ( wp_is_mobile() && in_array( $mobile_menu_opt, array( 'main_menu', 'both_menus' ) ) ) ) : ?>
    <div class="mobile-title-logo-in-header"><?php hu_print_logo_or_title();//gets the logo or the site title ?></div>
  <?php endif; ?>
  <div class="nav-toggle"><i class="fa fa-bars"></i></div>
  <div class="nav-text"><!-- put your mobile menu text here --></div>
  <div class="nav-wrap container">
    <?php
      wp_nav_menu(
          array(
            'theme_location'=>'header',
            'menu_class'=>'nav container-inner group',
            'container'=>'',
            'menu_id' => '',
            'fallback_cb'=> is_multisite() ? '' : 'hu_page_menu'
          )
      );
    ?>
  </div>
</nav><!--/#nav-header-->