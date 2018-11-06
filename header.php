<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11" />
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="wrapper">

  <?php do_action('__before_header') ; ?>

  <?php hu_get_template_part('parts/header-main'); ?>

  <?php do_action('__after_header') ; ?>

  <div class="container" id="page">
    <div class="container-inner">
      <?php do_action('__before_main') ; ?>
      <div class="main">
        <div class="main-inner group">
          <?php do_action('__before_content') ; ?>
