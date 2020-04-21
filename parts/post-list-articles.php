<?php
/*  Print the post list articles. Runs the WP loop on the $wp_query object.
/* ------------------------------------ */
?>
<?php if ( hu_is_checked('blog-standard') ): ?>
  <div id="grid-wrapper" class="post-list-standard">
    <?php
      // do not allow the browser to pick a size larger than 'thumb-standard'
      if( !function_exists('hu_limit_srcset_img_width_for_thumb_standard') ) {
          function hu_limit_srcset_img_width_for_thumb_standard() { return '320'; }
      }
      // april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
      add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_standard' );
    ?>
    <?php while ( have_posts() ): the_post(); ?>
      <?php get_template_part('content-standard'); ?>
    <?php endwhile; ?>
    <?php remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_standard' ); ?>
  </div>
<?php else: ?>
  <div id="grid-wrapper" class="<?php echo implode( ' ', apply_filters('hu_classic_grid_wrapper_classes', array( 'post-list group') ) ) ?>">
    <?php
      if( !function_exists('hu_limit_srcset_img_width_for_thumb_large') ) {
          // do not allow the browser to pick a size larger than 'thumb-large'
          function hu_limit_srcset_img_width_for_thumb_large() { return '720'; }
      }
      // documented in wp-includes/media.php
      // april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
      add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_large' );

      $columns = apply_filters( 'hu_grid_columns', 2 );
      global $wp_query;
      while ( have_posts() ): the_post();
      if ( 0 == $wp_query->current_post || 0 == $wp_query->current_post % $columns ) { echo '<div class="post-row">'; }
    ?>
        <?php get_template_part('content'); ?>
    <?php if( $wp_query->current_post == $wp_query -> post_count - 1  ||  ( $wp_query->current_post + 1 ) % $columns == 0 ) { echo '</div>'; }; endwhile; ?>

    <?php remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_large' ); ?>
  </div><!--/.post-list-->
<?php endif; ?>

<?php hu_get_template_part('parts/pagination'); ?>
