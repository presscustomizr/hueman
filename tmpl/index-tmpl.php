<?php if ( ! hu_is_home_empty() ) : ?>
    <?php do_action( '__before_featured' ); ?>
    <?php if ( hu_is_checked('featured-posts-enabled') ) { get_template_part('parts/featured'); } ?>
    <?php do_action( '__after_featured' ); ?>
    <?php
      if ( have_posts() ) {
          hu_get_template_part( 'parts/post-list-articles' );
      }
    ?>

<?php endif; ?>