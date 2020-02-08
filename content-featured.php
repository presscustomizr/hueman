<?php
//Let's determine which image size would be the best for the current user layout
$map = array(
      'col-1c'  => 'thumb-xxlarge',
      'col-2cl' => 'thumb-xlarge',
      'col-2cr' => 'thumb-xlarge',
      'col-3cm' => 'thumb-large',
      'col-3cl' => 'thumb-large',
      'col-3cr' => 'thumb-large'
);
$sb_layout = hu_get_layout_class();
$featured_img_size = array_key_exists( $sb_layout, $map ) ? $map[ $sb_layout ] : null;
//the featured img size is also used to generate a dynamic concatenated css class, featured-img-$featured_img_size
//for which the rule is defined assets/front/css/_parts/0_5_single_post_page.css
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('group'); ?>>
	<div class="post-inner post-hover">
		<div class="post-thumbnail featured-img-<?php echo $featured_img_size; ?>">
			<a href="<?php the_permalink(); ?>">
				<?php hu_the_post_thumbnail( apply_filters( 'hu_grid_featured_thumb_size', $featured_img_size ), '', $placeholder = true, $placeholder_size = apply_filters( 'hu_grid_featured_placeholder_size', $featured_img_size ) ); ?>
				<?php if ( has_post_format('video') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-play"></i></span>'; ?>
				<?php if ( has_post_format('audio') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-volume-up"></i></span>'; ?>
				<?php if ( is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-star"></i></span>'; ?>
			</a>
			<?php if ( hu_is_comment_icon_displayed_on_grid_item_thumbnails() ): ?>
				<a class="post-comments" href="<?php comments_link(); ?>"><i class="far fa-comments"></i><?php comments_number( '0', '1', '%' ); ?></a>
			<?php endif; ?>
		</div><!--/.post-thumbnail-->
    <?php if ( hu_is_checked( 'post-list-meta-category' ) || hu_is_checked( 'post-list-meta-date' ) ) : ?>
  		<div class="post-meta group">
        <?php if ( hu_is_checked( 'post-list-meta-category' ) ) : ?>
          <p class="post-category"><?php the_category(' / '); ?></p>
        <?php endif; ?>
        <?php if ( hu_is_checked( 'post-list-meta-date' ) ) : ?>
          <?php get_template_part('parts/post-list-author-date'); ?>
        <?php endif; ?>
  		</div><!--/.post-meta-->
    <?php endif ?>

		<h2 class="post-title entry-title">
			<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute( array( 'before' => __( 'Permalink to ', 'hueman' ) ) ); ?>"><?php the_title(); ?></a>
		</h2><!--/.post-title-->

		<?php if ( ! hu_is_checked('featured-posts-full-content') ) : ?>
  		<div class="entry excerpt entry-summary">
  			<?php if ( hu_get_option('excerpt-length') != '0' ) { the_excerpt(); } ?>
  		</div><!--/.entry-->
		<?php else : ?>
      <div class="entry excerpt">
        <?php the_content() ?>
      </div><!--/.entry-->
    <?php endif; ?>

	</div><!--/.post-inner-->
</article><!--/.post-->