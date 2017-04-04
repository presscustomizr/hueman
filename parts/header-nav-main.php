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
  <?php if ( 'both_menus' == $mobile_menu_opt ) { hu_print_mobile_btn(); } ?>
  <div class="nav-text"><!-- put your mobile menu text here --></div>
  <div class="nav-wrap container">
    <?php
      wp_nav_menu(
          array(
            'theme_location'=>'header',
            'menu_class'=>'nav container-inner group',
            'container'=>'',
            'menu_id' => '',
            'fallback_cb'=> apply_filters( 'hu_header_menu_fallback_cb', '' )//set to 'hu_page_menu' on prevdem
          )
      );
    ?>
  </div>
</nav><!--/#nav-header-->