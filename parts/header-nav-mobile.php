<?php
//MENUS
$location_map = array(
    'top_menu'    => 'topbar',
    'mobile_menu' => 'mobile',
    'main_menu'   => 'header'
);
$mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );


//SETUP THE MOBILE MENU LOCATION
//Since v3.3.8, the default mobile menu is the topbar
//The idea is to avoid as much as possible having an empty mobile menu for new users.
//If no menu has been assigned to the topbar location yet, let's loop on all possible menu in a specific order to assign a menu anyway.
$mobile_menu_location = '_not_set_';
$has_menu_assigned = false;
if ( array_key_exists( $mobile_menu_opt, $location_map ) && has_nav_menu( $location_map[ $mobile_menu_opt ] ) ) {
    $mobile_menu_location = $location_map[ $mobile_menu_opt ];
    $has_menu_assigned = true;
} else {
    $match = false;
    foreach ( $location_map as $user_opt => $theme_loc ) {
        if ( has_nav_menu( $theme_loc ) && ! $match ) {
            $match = true;
            $mobile_menu_location = $theme_loc;
        }
    }
}


//SETUP THE FALLBACK CB
$fallback_cb = '';
switch( $mobile_menu_opt ) {
    case 'main_menu' :
        $fallback_cb = apply_filters( 'hu_header_menu_fallback_cb', '' );
    break;

    case 'top_menu' :
    case 'mobile_menu' :
        $fallback_cb = apply_filters( 'hu_topbar_menu_fallback_cb', ( ! is_multisite() && hu_is_checked( "default-menu-header" ) ) ? 'hu_page_menu' : '' );//set to 'hu_page_menu' on prevdem
    break;
}
$fallback_cb = apply_filters( 'hu_mobile_menu_fallback_cb', $fallback_cb );//set to 'hu_page_menu' on prevdem

$mobile_menu_classes = array(
    'nav-container',
    'group',
    'mobile-menu',
    'no_stick' != hu_normalize_stick_menu_opt( hu_get_option( 'header-mobile-sticky' ) ) ? 'mobile-sticky' : '',
    $has_menu_assigned ? '' : 'no-menu-assigned'
);

$we_have_a_menu = has_nav_menu( $mobile_menu_location ) || ! empty( $fallback_cb );

?>
<nav class="<?php echo implode(' ', $mobile_menu_classes ); ?>" id="nav-mobile" data-menu-id="<?php echo hu_get_menu_id( 'header'); ?>">
  <div class="mobile-title-logo-in-header"><?php hu_print_logo_or_title( true, true );//gets the logo or the site title ?></div>
  <?php //if ( hu_has_nav_menu( 'topbar' ) || ! empty( $fallback_cb ) ) : ?>
    <?php //hu_print_mobile_btn(); ?>
  <?php //endif; ?>

      <?php hu_print_mobile_btn(); ?>

      <div class="nav-text"><?php apply_filters( 'hu_mobile_menu_text', '' );//put your mobile menu text here ?></div>
      <div class="nav-wrap container">
        <?php if ( hu_is_checked( 'mobile-search' ) ) : ?>
          <ul class="nav container-inner group mobile-search">
            <?php if ( ! $we_have_a_menu && hu_user_can_see_customize_notices_on_front() ) : ?>
                <li>
                  <?php
                      printf( '<p style="text-transform:none;font-size: 0.8em;color:white;">%1$s. <strong><a style="color: white;text-decoration:underline;display:inline;border:none;padding:0;" href="%2$s" title="%3$s">%3$s &raquo;</a></strong></p>',
                          __('No menu has been assigned for mobile devices yet. You can set it from the live customizer', 'hueman'),
                          admin_url( 'customize.php?autofocus[section]=menu_locations' ),
                          __('Customize now', 'hueman')
                      );
                  ?>
                </li>
            <?php else : ?>
                <li>
                  <?php get_search_form(); ?>
                </li>
            <?php endif; ?>
          </ul>
        <?php endif; ?>
        <?php
          if ( $we_have_a_menu ) {
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