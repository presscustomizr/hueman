<?php
  $mobile_menu_opt = hu_get_option( 'header_mobile_menu_layout' );
?>
<nav class="nav-container group" id="nav-topbar">
  <?php if ( 'top_menu' == $mobile_menu_opt ) : ?>
    <div class="mobile-title-logo-in-header"><?php hu_print_logo_or_title();//gets the logo or the site title ?></div>
  <?php endif; ?>
  <div class="nav-toggle"><i class="fa fa-bars"></i></div>
  <div class="nav-text"><?php apply_filters( 'hu_mobile_menu_text', '' );//put your mobile menu text here ?></div>
  <div class="nav-wrap container">
    <?php
      wp_nav_menu(
        array(
            'theme_location'=>'topbar',
            'menu_class'=>'nav container-inner group',
            'container'=>'',
            'menu_id' => '',
            'fallback_cb'=> apply_filters( 'hu_topbar_menu_fallback_cb', '' )//set to 'hu_page_menu' on prevdem
        )
      );
    ?>
  </div>

  <?php if ( apply_filters( 'hu_display_mobile_search', 'both_menus' == $mobile_menu_opt ) ) : ?>
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