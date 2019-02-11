<article id="post-<?php the_ID(); ?>" <?php post_class( array( 'group', 'post-standard' , 'grid-item') ); ?>>
	<div class="post-inner post-hover">

		<div class="post-thumbnail">
			<a href="<?php the_permalink(); ?>">
				<?php hu_the_post_thumbnail( apply_filters( 'hu_grid_standard_thumb_size', 'thumb-standard' ), '', $placeholder = true, $placeholder_size = apply_filters( 'hu_grid_standard_placeholder_size', 'thumb-standard' ) ); ?>
				<?php if ( has_post_format('video') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-play"></i></span>'; ?>
				<?php if ( has_post_format('audio') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-volume-up"></i></span>'; ?>
				<?php if ( is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-star"></i></span>'; ?>
			</a>
			<?php if ( hu_is_comment_icon_displayed_on_grid_item_thumbnails() ): ?>
				<a class="post-comments" href="<?php comments_link(); ?>"><i class="far fa-comments"></i><?php comments_number( '0', '1', '%' ); ?></a>
			<?php endif; ?>
		</div><!--/.post-thumbnail-->

		<div class="post-content">

			<div class="post-meta group">
				<p class="post-category"><?php the_category(' / '); ?></p>
				<?php get_template_part('parts/post-list-author-date'); ?>
			</div><!--/.post-meta-->

			<h2 class="post-title entry-title">
				<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute( array( 'before' => __( 'Permalink to ', 'hueman' ) ) ); ?>"><?php the_title(); ?></a>
			</h2><!--/.post-title-->

			<?php if (hu_get_option('excerpt-length') != '0'): ?>
			<div class="entry excerpt entry-summary">
				<?php the_excerpt(); ?>
			</div><!--/.entry-->
			<?php endif; ?>

		</div><!--/.post-content-->

	</div><!--/.post-inner-->
</article><!--/.post-->