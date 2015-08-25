<?php get_header(); ?>

<section class="content">

	<?php get_template_part('inc/page-title'); ?>

	<?php if ( ot_get_option('before-content-widget') == 'on' ): ?>
	<div id="before-content-widget">
		<?php dynamic_sidebar( 'before-content-widget' ); ?>
	</div><!--/#before-content-widget-->
	<?php endif; ?>

	<div class="pad group">

		<?php while ( have_posts() ): the_post(); ?>

			<article <?php post_class('group'); ?>>

				<?php get_template_part('inc/page-image'); ?>

				<div class="entry themeform">
					<?php the_content(); ?>
					<div class="clear"></div>
				</div><!--/.entry-->

			</article>

			<?php if ( ot_get_option('before-com-widget') == 'on' ): ?>
			<div id="before-com-widget">
				<?php dynamic_sidebar( 'before-com-widget' ); ?>
			</div><!--/#before-com-widget-->
			<?php endif; ?>

			<?php if ( ot_get_option('page-comments') == 'on' ) { comments_template('/comments.php',true); } ?>

		<?php endwhile; ?>

	</div><!--/.pad-->

	<?php if ( ot_get_option('after-content-widget') == 'on' ): ?>
	<div id="after-content-widget">
		<?php dynamic_sidebar( 'after-content-widget' ); ?>
	</div><!--/#after-content-widget-->
	<?php endif; ?>

</section><!--/.content-->

<?php get_sidebar(); ?>

<?php get_footer(); ?>