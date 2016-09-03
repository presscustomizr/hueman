<header id="header">
  <?php if ( has_nav_menu('topbar') ): ?>
    <?php get_template_part('parts/header-nav-topbar'); ?>
  <?php endif; ?>
  <div class="container group">
    <div class="container-inner">
      <?php $_header_img_src = hu_get_img_src_from_option('header-image'); ?>
      <?php if ( ! $_header_img_src || empty( $_header_img_src ) ): ?>

        <div class="group pad">
          <?php echo hu_site_title(); ?>
          <?php if ( hu_is_checked('site-description') ): ?><p class="site-description"><?php bloginfo( 'description' ); ?></p><?php endif; ?>

          <?php if ( hu_is_checked('header-ads') ): ?>
            <div id="header-widgets">
              <?php hu_print_widgets_in_location( 'header-ads' ); ?>
            </div><!--/#header-ads-->
          <?php endif; ?>

        </div>

      <?php else :  ?>
          <a href="<?php echo home_url('/'); ?>" rel="home">
            <img class="site-image" src="<?php echo hu_get_img_src_from_option('header-image'); ?>" alt="<?php echo get_bloginfo('name'); ?>">
          </a>
      <?php endif; ?>

      <?php if ( has_nav_menu('header') ): ?>
        <nav class="nav-container group" id="nav-header">
          <div class="nav-toggle"><i class="fa fa-bars"></i></div>
          <div class="nav-text"><!-- put your mobile menu text here --></div>
          <div class="nav-wrap container"><?php wp_nav_menu(array('theme_location'=>'header','menu_class'=>'nav container-inner group','container'=>'','menu_id' => '','fallback_cb'=> false)); ?></div>
        </nav><!--/#nav-header-->
      <?php endif; ?>

    </div><!--/.container-inner-->
  </div><!--/.container-->
</header><!--/#header-->