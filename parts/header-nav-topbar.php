<nav class="nav-container group" id="nav-topbar">
  <div class="nav-toggle"><i class="fa fa-bars"></i></div>
  <div class="nav-text"><!-- put your mobile menu text here --></div>
  <div class="nav-wrap container"><?php wp_nav_menu(array('theme_location'=>'topbar','menu_class'=>'nav container-inner group','container'=>'','menu_id' => '','fallback_cb'=> false)); ?></div>

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

</nav><!--/#nav-topbar-->