<?php
/*  Print the post list articles. Runs the WP loop on the $wp_query object.
/* ------------------------------------ */
?>
<?php if ( hu_is_checked('blog-standard') ): ?>
  <div id="grid-wrapper" class="post-list-standard">
    <?php while ( have_posts() ): the_post(); ?>
      <?php get_template_part('content-standard'); ?>
    <?php endwhile; ?>
  </div>
<?php else: ?>
  <div id="grid-wrapper" class="<?php echo implode( ' ', apply_filters('hu_classic_grid_wrapper_classes', array( 'post-list group') ) ) ?>">
    <?php
      $columns = apply_filters( 'hu_grid_columns', 2 );
      global $wp_query;
      while ( have_posts() ): the_post();
      if ( 0 == $wp_query->current_post || 0 == $wp_query->current_post % $columns ) { echo '<div class="post-row">'; }
    ?>
        <?php get_template_part('content'); ?>
    <?php if( $wp_query->current_post == $wp_query -> post_count - 1  ||  ( $wp_query->current_post + 1 ) % $columns == 0 ) { echo '</div>'; }; endwhile; ?>
  </div><!--/.post-list-->
<?php endif; ?>

<?php hu_get_template_part('parts/pagination'); ?>
