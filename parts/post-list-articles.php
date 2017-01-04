<?php
/*  Print the post list articles. Runs the WP loop on the $wp_query object.
/* ------------------------------------ */
?>
<?php if ( hu_is_checked('blog-standard') ): ?>
  <?php while ( have_posts() ): the_post(); ?>
    <?php get_template_part('content-standard'); ?>
  <?php endwhile; ?>
<?php else: ?>
  <div id="grid-wrapper" class="post-list group">
    <?php global $wp_query; echo '<div class="post-row">'; while ( have_posts() ): the_post(); ?>
      <?php get_template_part('content'); ?>
    <?php if( ( $wp_query->current_post + 1 ) % 2 == 0 ) { echo '</div><div class="post-row">'; }; endwhile; echo '</div>'; ?>
  </div><!--/.post-list-->
<?php endif; ?>

<?php get_template_part('parts/pagination'); ?>