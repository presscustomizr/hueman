<?php
$post_classes = array(
  'group',
  'post-standard',
  'grid-item',
  !hu_is_checked('blog-standard-show-thumb') ? '' : 'excerpt'
);

// do not allow the browser to pick a size larger than 'thumb-standard'
if( !function_exists('hu_limit_srcset_img_width_for_thumb_standard') ) {
    function hu_limit_srcset_img_width_for_thumb_standard() { return '320'; }
}
// april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
// filter has to be set in article tmpl (instead of before and after the wp query) to be taken into account when using infinite scroll
if ( !has_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_standard' ) ) {
  add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_standard' );
}
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( $post_classes ); ?>>
	<div class="post-inner post-hover">
    <?php if ( hu_is_checked('blog-standard-show-thumb') ) : ?>
  		<div class="post-thumbnail">
  			<a href="<?php the_permalink(); ?>">
          <?php // note that the image size is full when user checked hu_is_checked( 'blog-use-original-image-size' ) ? 'full' : $thumb_size; ?>
  				<?php hu_the_post_thumbnail( apply_filters( 'hu_grid_standard_thumb_size', 'thumb-standard' ), '', $placeholder = true, $placeholder_size = apply_filters( 'hu_grid_standard_placeholder_size', 'thumb-standard' ) ); ?>
  				<?php if ( has_post_format('video') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-play"></i></span>'; ?>
  				<?php if ( has_post_format('audio') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-volume-up"></i></span>'; ?>
  				<?php if ( is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-star"></i></span>'; ?>
  			</a>
  			<?php if ( hu_is_comment_icon_displayed_on_grid_item_thumbnails() ): ?>
  				<a class="post-comments" href="<?php comments_link(); ?>"><i class="far fa-comments"></i><?php comments_number( '0', '1', '%' ); ?></a>
  			<?php endif; ?>
  		</div><!--/.post-thumbnail-->
    <?php endif; ?>
		<div class="post-content">
      <?php if ( hu_is_checked( 'post-list-meta-category' ) || hu_is_checked( 'post-list-meta-date' ) ) : ?>
  			<div class="post-meta group">
          <?php if ( hu_is_checked( 'post-list-meta-category' ) ) : ?>
            <p class="post-category"><?php the_category(' / '); ?></p>
          <?php endif; ?>
          <?php if ( hu_is_checked( 'post-list-meta-date' ) ) : ?>
            <?php get_template_part('parts/post-list-author-date'); ?>
          <?php endif; ?>
  			</div><!--/.post-meta-->
      <?php endif; ?>
			<h2 class="post-title entry-title">
				<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute( array( 'before' => __( 'Permalink to ', 'hueman' ) ) ); ?>"><?php the_title(); ?></a>
			</h2><!--/.post-title-->
      <?php if ( hu_is_checked('blog-standard-full-content') ) { ?>
      <div class="entry entry-summary">
        <?php the_content(); ?>
      </div><!--/.entry-->
			<?php } else if (hu_get_option('excerpt-length') != '0') { ?>
			<div class="entry excerpt entry-summary">
				<?php the_excerpt(); ?>
			</div><!--/.entry-->
			<?php } ?>

		</div><!--/.post-content-->

	</div><!--/.post-inner-->
</article><!--/.post-->
<?php
if ( has_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_standard' ) ) {
  remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_standard' );
}
?>