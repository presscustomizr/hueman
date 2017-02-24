<div class="notebox">
  <?php _e('For the term','hueman'); ?> "<span><?php echo get_search_query(); ?></span>".
  <?php if ( !have_posts() ): ?>
    <?php _e('Please try another search:','hueman'); ?>
  <?php endif; ?>
  <div class="search-again">
    <?php get_search_form(); ?>
  </div>
</div>

<?php
  if ( have_posts() ) {
      hu_get_template_part( 'parts/post-list-articles' );
  }
?>