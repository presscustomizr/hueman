<?php if ( ! hu_is_home_empty() ) : ?>

    <?php if ( hu_is_checked('featured-posts-enabled') ) { get_template_part('parts/featured'); } ?>
    <?php
      if ( have_posts() ) {
          hu_get_template_part( 'parts/post-list-articles' );
      }
    ?>

<?php endif; ?>