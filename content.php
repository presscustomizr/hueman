<?php
// hu_grid_thumb_size is used in pro to determine the most appropriate size as a function of the number of columns
$thumb_size =  apply_filters( 'hu_grid_thumb_size', 'thumb-large' );

if( !function_exists('hu_limit_srcset_img_width_for_classic_grid') ) {
    // do not allow the browser to pick a size larger than 'thumb-large'
    function hu_limit_srcset_img_width_for_classic_grid() {
        $max_src_size = '720';//<='thumb-large'
        $grid_thumb_size = 'thumb-large';
        // in Hueman Pro, we use different image sizes depending on the chosen column layout
        if ( class_exists('PC_HAPGRIDS') ) {
            $grid_thumb_size = PC_HAPGRIDS::$instance->grid_thumb_size_for_columns;
        }
        $grid_thumb_size = hu_is_checked( 'blog-use-original-image-size' ) ? 'full' : $grid_thumb_size;
        // Map of the size candidates for masonty
        // @see filter 'hu_masonry_grid_thumb_size'
        // @see sizes registered after setup theme in Hueman
        $map = array(
            'thumb-xxlarge' => '1320',
            'thumb-xlarge' => '980',
            'thumb-large' => '720',
            'thumb-large-no-crop' => '720',
            'thumb-medium-no-crop' => '520',
            'thumb-medium' => '520',
            'full' => '1600'
        );

        if ( array_key_exists( $grid_thumb_size, $map ) ) {
            $max_src_size = $map[$grid_thumb_size];
        }
        return $max_src_size;
    }
}
// april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
// filter has to be set in article tmpl (instead of before and after the wp query) to be taken into account when using infinite scroll
if ( !has_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_classic_grid' ) ) {
  add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_classic_grid' );
}
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( array('group', 'grid-item') ); ?>>
	<div class="post-inner post-hover">
    <?php if ( hu_is_checked('blog-standard-show-thumb') ) : ?>
  		<div class="post-thumbnail">
  			<a href="<?php the_permalink(); ?>">
          <?php // note that the image size is full when user checked hu_is_checked( 'blog-use-original-image-size' ) ? 'full' : $thumb_size; ?>
  				<?php hu_the_post_thumbnail( $thumb_size, '', $placeholder = true, $placeholder_size = apply_filters( 'hu_grid_placeholder_size', 'thumb-medium' ) ); ?>
  				<?php if ( has_post_format('video') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-play"></i></span>'; ?>
  				<?php if ( has_post_format('audio') && !is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-volume-up"></i></span>'; ?>
  				<?php if ( is_sticky() ) echo'<span class="thumb-icon"><i class="fas fa-star"></i></span>'; ?>
  			</a>
  			<?php if ( hu_is_comment_icon_displayed_on_grid_item_thumbnails() ) : ?>
  				<a class="post-comments" href="<?php comments_link(); ?>"><i class="far fa-comments"></i><?php comments_number( '0', '1', '%' ); ?></a>
  			<?php endif; ?>
  		</div><!--/.post-thumbnail-->
    <?php endif; ?>
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

		<?php if (hu_get_option('excerpt-length') != '0'): ?>
		<div class="entry excerpt entry-summary">
			<?php the_excerpt(); ?>
		</div><!--/.entry-->
		<?php endif; ?>

	</div><!--/.post-inner-->
</article><!--/.post-->
<?php
if ( has_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_classic_grid' ) ) {
  remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_classic_grid' );
}
?>