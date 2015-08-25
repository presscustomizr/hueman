<article id="post-<?php the_ID(); ?>" <?php post_class('group'); ?>>
	<div class="post-inner post-hover">

		<div class="post-thumbnail">
			<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<?php if ( has_post_thumbnail() ): ?>
					<?php the_post_thumbnail('thumb-medium'); ?>
				<?php elseif ( ot_get_option('placeholder') != 'off' ): ?>
					<img src="<?php echo get_template_directory_uri(); ?>/img/thumb-medium.png" alt="<?php the_title(); ?>" />
				<?php endif; ?>
				<?php if ( has_post_format('video') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fa fa-play"></i></span>'; ?>
				<?php if ( has_post_format('audio') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fa fa-volume-up"></i></span>'; ?>
				<?php if ( is_sticky() ) echo'<span class="thumb-icon"><i class="fa fa-star"></i></span>'; ?>
			</a>
			<?php if ( comments_open() && ( ot_get_option( 'comment-count' ) != 'off' ) ): ?>
				<a class="post-comments" href="<?php comments_link(); ?>"><span><i class="fa fa-comments-o"></i><?php comments_number( '0', '1', '%' ); ?></span></a>
			<?php endif; ?>
		</div><!--/.post-thumbnail-->

		<div class="post-meta group">
			<p class="post-category"><?php the_category(' / '); ?></p>
			<p class="post-date"><time class="published updated" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time('j M, Y'); ?></time></p>

			<p style="display:none" class="post-byline"><?php _e('by','hueman'); ?>
				<span class="vcard author">
					<span class="fn"><a href="<?php get_the_author_link(); ?>" rel="author"><?php the_author() ?></a></span>
				</span> &middot; Published <span class="published"><?php the_date('F j, Y'); ?></span>
				<?php if( get_the_modified_date() != get_the_date() ) : ?> &middot; Last modified <span class="updated"><?php the_modified_date('F j, Y'); ?></span><?php endif; ?>
			</p>

		</div><!--/.post-meta-->

		<h2 class="post-title entry-title">
			<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a>
		</h2><!--/.post-title-->

		<?php if (ot_get_option('excerpt-length') != '0'): ?>
		<div class="entry excerpt entry-summary">
			<?php the_excerpt(); ?>
		</div><!--/.entry-->
		<?php endif; ?>

	</div><!--/.post-inner-->
</article><!--/.post-->