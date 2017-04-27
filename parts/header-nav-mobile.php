<?php
//MENUS
$class_map = array(
    'main_menu'   => 'header',
    'top_menu'    => 'topbar'
);
$mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );

$has_menu_assigned = false;
if ( array_key_exists( $mobile_menu_opt, $class_map ) ) {
    $has_menu_assigned = hu_has_nav_menu( $class_map[ $mobile_menu_opt ] );
}

$mobile_menu_classes = array(
    'nav-container',
    'group',
    'mobile-menu',
    'no_stick' != hu_normalize_stick_menu_opt( hu_get_option('header-mobile-sticky') ) ? 'mobile-sticky' : '',
    $has_menu_assigned ? '' : 'no-menu-assigned'
);
$mobile_menu_id = 'top_menu' == $mobile_menu_opt ? 'nav-topbar' : 'nav-header';
$mobile_menu_location = 'top_menu' == $mobile_menu_opt ? 'topbar' : 'header';
$fallback_cb = '';

switch( $mobile_menu_opt ) {
    case 'main_menu' :
        $fallback_cb = apply_filters( 'hu_header_menu_fallback_cb', '' );
    break;

    case 'top_menu' :
        $fallback_cb = apply_filters( 'hu_topbar_menu_fallback_cb', ( ! is_multisite() && hu_is_checked( "default-menu-header" ) ) ? 'hu_page_menu' : '' );//set to 'hu_page_menu' on prevdem
    break;
}

$fallback_cb = apply_filters( 'hu_mobile_menu_fallback_cb', $fallback_cb )//set to 'hu_page_menu' on prevdem
?>
<nav class="<?php echo implode(' ', $mobile_menu_classes ); ?>" id="<?php echo $mobile_menu_id; ?>" data-menu-id="<?php echo hu_get_menu_id( 'header'); ?>">
  <div class="mobile-title-logo-in-header"><?php hu_print_logo_or_title();//gets the logo or the site title ?></div>
  <?php //if ( hu_has_nav_menu( 'topbar' ) || ! empty( $fallback_cb ) ) : ?>
    <?php //hu_print_mobile_btn(); ?>
  <?php //endif; ?>

      <?php hu_print_mobile_btn(); ?>

      <div class="nav-text"><?php apply_filters( 'hu_mobile_menu_text', '' );//put your mobile menu text here ?></div>
      <div class="nav-wrap container">
        <?php if ( hu_is_checked( 'mobile-search' ) ) : ?>
          <ul class="nav container-inner group mobile-search">
            <li>
              <?php get_search_form(); ?>
            </li>
          </ul>
        <?php endif; ?>
        <?php
          if ( has_nav_menu( $mobile_menu_location ) || ! empty( $fallback_cb ) ) {
              wp_nav_menu(
                array(
                    'theme_location' => $mobile_menu_location,
                    'menu_class'=>'nav container-inner group',
                    'container'=>'',
                    'menu_id' => '',
                    'fallback_cb'=> $fallback_cb
                )
              );
          }
        ?>
      </div>
</nav><!--/#nav-topbar-->