<?php get_header(); ?>

<section class="content">

	<?php get_template_part('inc/page-title'); ?>

	<div class="pad group">

		<?php while ( have_posts() ): the_post(); ?>

			<article <?php post_class('group'); ?>>

				<?php get_template_part('inc/page-image'); ?>

				<h1 class="entry-title"><?php the_title(); ?></h1>

				<div class="entry themeform">

					<div class="entry-content"><?php the_content(); ?></div>
					<p class="post-byline"><?php _e('by','hueman'); ?>
						<span class="vcard author">
							<span class="fn"><a href="<?php get_the_author_link(); ?>" rel="author"><?php the_author() ?></a></span>
						</span> &middot; Published <time class="published" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_date('F j, Y'); ?></time>
						<?php if( get_the_modified_date() != get_the_date() ) : ?> &middot; Last modified <time class="updated" datetime="<?php the_modified_time('Y-m-d H:i:s'); ?>"><?php the_modified_date('F j, Y'); ?></time><?php endif; ?>
					</p>

					<div class="clear"></div>
				</div><!--/.entry-->

			</article>

			<?php if ( ot_get_option('page-comments') == 'on' ) { comments_template('/comments.php',true); } ?>

		<?php endwhile; ?>

	</div><!--/.pad-->

</section><!--/.content-->

<?php get_sidebar(); ?>

<?php get_footer(); ?>