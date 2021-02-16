<?php
$mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
$headernav_classes = array(
    'nav-container',
    'group',
    'desktop-menu',
    hu_has_nav_menu( 'header' ) ? '' : 'no-menu-assigned'
);
$display_search = ( 'header' == hu_get_option( 'desktop-search' ) ) && ( hu_has_nav_menu( 'header' ) || ! empty( $fallback_cb ) );

$amp_container_attr  = '';
$amp_navigation_attr = '';

if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
	$amp_menu_toggle_id   = 'huAmpheaderExpanded';
	$amp_container_attr  .= ' data-amp-bind-class="' . $amp_menu_toggle_id . ' ? \'nav-wrap container expanded\' : \'nav-wrap container\'"';
	$amp_navigation_attr .= ' data-amp-bind-class="' . $amp_menu_toggle_id . ' ? \'nav container-inner group expanded\' : \'nav container-inner group\'"';
}

?>
<nav class="<?php echo implode(' ', $headernav_classes ); ?>" id="nav-header" data-menu-id="<?php echo hu_get_menu_id( 'header'); ?>">
  <?php if ( 'both_menus' == $mobile_menu_opt ) { hu_print_mobile_btn( 'header' ); } ?>
  <div class="nav-text"><!-- put your mobile menu text here --></div>

  <div class="nav-wrap container" <?php echo $amp_container_attr; ?>>
    <?php if ( $display_search ) : ?>
      <div id="main-header-search" class="container">
        <div class="container-inner">
          <button class="toggle-search"><i class="fas fa-search"></i></button>
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
            'fallback_cb'=> apply_filters( 'hu_header_menu_fallback_cb', '' ), //set to 'hu_page_menu' on prevdem
			'items_wrap' => '<ul id="%1$s" ' . $amp_navigation_attr . ' class="%2$s">%3$s</ul>',
          )
      );
    ?>
  </div>
</nav><!--/#nav-header-->