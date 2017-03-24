<?php
$mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
$headernav_classes = array(
    'nav-container',
    'group',
    'desktop-menu',
    hu_has_nav_menu( 'header' ) ? '' : 'no-menu-assigned'
);
?>
<nav class="<?php echo implode(' ', $headernav_classes ); ?>" id="nav-header" data-menu-id="<?php echo hu_get_menu_id( 'header'); ?>">
  <?php hu_print_mobile_btn(); ?>
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