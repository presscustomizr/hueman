<?php
// Query featured entries
$featured = new WP_Query(
  	array(
    		'no_found_rows'				   => false,
    		'update_post_meta_cache' => false,
    		'update_post_term_cache' => false,
    		'ignore_sticky_posts'		 => 1,
    		'posts_per_page'			   => hu_get_option('featured-posts-count'),
    		'cat'						         => hu_get_option('featured-category')
  	)
);
?>

<?php if ( is_home() && !is_paged() && ( hu_get_option('featured-posts-count') =='1') && $featured->have_posts() ): // No slider if 1 post is featured ?>

	<div class="featured">
		<?php while ( $featured->have_posts() ): $featured->the_post(); ?>
			<?php get_template_part('content-featured'); ?>
		<?php endwhile; ?>
	</div><!--/.featured-->

<?php elseif ( is_home() && !is_paged() && ( '0' != hu_get_option('featured-posts-count') ) && $featured->have_posts() ): // Show slider if posts are not 1 or 0 ?>

	<div class="featured flexslider" id="flexslider-featured">
		<ul class="slides">
			<?php while ( $featured->have_posts() ): $featured->the_post(); ?>
			<li>
				<?php get_template_part('content-featured'); ?>
			</li>
			<?php endwhile; ?>
		</ul>
	</div><!--/.featured-->

<?php endif; ?>
<?php wp_reset_postdata(); ?>