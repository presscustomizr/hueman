<nav class="nav-container group" id="nav-topbar">
  <?php if ( ! wp_is_mobile() || ( wp_is_mobile() && in_array( $mobile_menu_opt, array( 'top_menu', 'both_menus' ) ) ) ) : ?>
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
            'fallback_cb'=> false
        )
      );
    ?>
  </div>

  <?php if ( apply_filters( 'hu_display_mobile_search', false ) ) : ?>
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