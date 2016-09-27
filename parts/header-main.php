<header id="header">
  <?php if ( hu_has_nav_menu('topbar') ): ?>
    <?php get_template_part('parts/header-nav-topbar'); ?>
  <?php endif; ?>
  <div class="container group">
    <div class="container-inner">
      <?php
        $_header_img_src = get_header_image();// hu_get_img_src_from_option('header-image');
        $_has_header_img = false != $_header_img_src && ! empty( $_header_img_src );
      ?>
      <?php if ( ! $_has_header_img || ! hu_is_checked( 'use-header-image' ) ) : ?>

        <div class="group pad">
          <?php echo hu_site_title();//gets the logo or the site title ?>
          <?php if ( hu_is_checked('site-description') ): ?><p class="site-description"><?php bloginfo( 'description' ); ?></p><?php endif; ?>

          <?php if ( hu_is_checked('header-ads') ): ?>
            <div id="header-widgets">
              <?php hu_print_widgets_in_location( 'header-ads' ); ?>
            </div><!--/#header-ads-->
          <?php endif; ?>

        </div>

      <?php else :  ?>
          <a href="<?php echo home_url('/'); ?>" rel="home">
            <img class="site-image" src="<?php echo $_header_img_src; ?>" alt="<?php echo get_bloginfo('name'); ?>">
          </a>
      <?php endif; ?>

      <?php if ( hu_has_nav_menu('header') ): ?>
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
                    'fallback_cb'=> 'hu_page_menu'
                  )
              );
            ?>
          </div>
        </nav><!--/#nav-header-->
      <?php endif; ?>

    </div><!--/.container-inner-->
  </div><!--/.container-->
</header><!--/#header-->