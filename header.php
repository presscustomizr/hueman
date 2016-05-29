<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="wrapper">

  <header id="header">
    <?php if ( has_nav_menu('topbar') ): ?>
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
    <?php endif; ?>

    <div class="container group">
      <div class="container-inner">
        <?php $_header_img_src = hu_get_img_src_from_option('header-image'); ?>
        <?php if ( ! $_header_img_src || empty( $_header_img_src ) ): //@fromfull to keep ?>

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
  <?php do_action('__after_header') ; ?>
  <div class="container" id="page">
    <div class="container-inner">
      <div class="main">
        <div class="main-inner group">
