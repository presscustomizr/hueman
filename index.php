<?php get_header(); ?>

<section class="content">
  <?php if ( ! hu_is_home_empty() ) : ?>
    	<?php hu_get_template_part('parts/page-title'); ?>

    	<div class="pad group">

    		<?php if ( hu_is_checked('featured-posts-enabled') ) { get_template_part('parts/featured'); } ?>

    		<?php
          if ( have_posts() ) {
              hu_get_template_part( 'parts/post-list-articles' );
          }
        ?>

    	</div><!--/.pad-->
  <?php endif; ?>
</section><!--/.content-->

<?php get_sidebar(); ?>

<?php get_footer(); ?>