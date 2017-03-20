<nav class="nav-container group" id="nav-header">
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