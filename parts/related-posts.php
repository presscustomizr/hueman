<?php $related = hu_get_related_posts(); ?>

<?php if ( $related->have_posts() ): ?>
<?php
//Let's determine which image size would be the best for the current user layout
//added april 2020 for https://github.com/presscustomizr/hueman/issues/866
$map = array(
      'col-1c'  => 'thumb-medium',//520w
      'col-2cl' => 'thumb-medium',
      'col-2cr' => 'thumb-medium',
      'col-3cm' => 'thumb-medium',
      'col-3cl' => 'thumb-medium',
      'col-3cr' => 'thumb-medium'
);
$sb_layout = hu_get_layout_class();
$related_img_size = array_key_exists( $sb_layout, $map ) ? $map[ $sb_layout ] : null;

?>
<h4 class="heading">
	<i class="far fa-hand-point-right"></i><?php _e('You may also like...','hueman'); ?>
</h4>

<ul class="related-posts group">
  <?php
    // do not allow the browser to pick a size larger than 'thumb-medium'
    if( !function_exists('hu_limit_srcset_img_width_for_rel_post_thumb') ) {
        function hu_limit_srcset_img_width_for_rel_post_thumb() { return '520'; }
    }
    // april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
    add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_rel_post_thumb' );
  ?>
	<?php while ( $related->have_posts() ) : $related->the_post(); ?>
	<li class="related post-hover">
		<article <?php post_class(); ?>>

			<div class="post-thumbnail">
				<a href="<?php the_permalink(); ?>" class="hu-rel-post-thumb">
					<?php hu_the_post_thumbnail( $related_img_size ); ?>
					<?php if ( has_post_format('video') && !is_sticky() ) echo'<span class="thumb-icon small"><i class="fas fa-play"></i></span>'; ?>
					<?php if ( has_post_format('audio') && !is_sticky() ) echo'<span class="thumb-icon small"><i class="fas fa-volume-up"></i></span>'; ?>
					<?php if ( is_sticky() ) echo'<span class="thumb-icon small"><i class="fas fa-star"></i></span>'; ?>
				</a>
				<?php if ( comments_open() && ( hu_is_checked( 'comment-count' ) ) ): ?>
					<a class="post-comments" href="<?php comments_link(); ?>"><i class="far fa-comments"></i><?php comments_number( '0', '1', '%' ); ?></a>
				<?php endif; ?>
			</div><!--/.post-thumbnail-->

			<div class="related-inner">

				<h4 class="post-title entry-title">
					<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute( array( 'before' => __( 'Permalink to ', 'hueman' ) ) ); ?>"><?php the_title(); ?></a>
				</h4><!--/.post-title-->

				<div class="post-meta group">
					<?php get_template_part('parts/post-list-author-date'); ?>
				</div><!--/.post-meta-->

			</div><!--/.related-inner-->

		</article>
	</li><!--/.related-->
	<?php endwhile; ?>
	<?php wp_reset_postdata(); ?>
  <?php remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_rel_post_thumb' ); ?>

</ul><!--/.post-related-->
<?php endif; ?>

<?php wp_reset_query(); ?>
