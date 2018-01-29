<?php
$mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
$headernav_classes = array(
    'nav-container',
    'group',
    'desktop-menu',
    hu_has_nav_menu( 'header' ) ? '' : 'no-menu-assigned'
);
$display_search = ( 'header' == hu_get_option( 'desktop-search' ) ) && ( 'both_menus' != $mobile_menu_opt || ! wp_is_mobile() ) && ( hu_has_nav_menu( 'header' ) || ! empty( $fallback_cb ) );
?>
<nav class="<?php echo implode(' ', $headernav_classes ); ?>" id="nav-header" data-menu-id="<?php echo hu_get_menu_id( 'header'); ?>">
  <?php if ( 'both_menus' == $mobile_menu_opt ) { hu_print_mobile_btn(); } ?>
  <div class="nav-text"><!-- put your mobile menu text here --></div>

  <div class="nav-wrap container">
    <?php if ( $display_search ) : ?>
      <div id="main-header-search" class="container">
        <div class="container-inner">
          <div class="toggle-search"><i class="fas fa-search"></i></div>
          <div class="search-expand">
            <div class="search-expand-inner"><?php get_search_form(); ?></div>
          </div>
        </div><!--/.container-inner-->
      </div><!--/.container-->
    <?php endif; ?>
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