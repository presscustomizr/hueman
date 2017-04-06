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

<?php do_action( '__before_featured' ); ?>
<?php if ( is_home() && !is_paged() && ( hu_get_option('featured-posts-count') =='1') && $featured->have_posts() ): // No slider if 1 post is featured ?>

	<div class="featured">
		<?php while ( $featured->have_posts() ): $featured->the_post(); ?>
			<?php get_template_part('content-featured'); ?>
		<?php endwhile; ?>
	</div><!--/.featured-->

<?php elseif ( is_home() && !is_paged() && ( '0' != hu_get_option('featured-posts-count') ) && $featured->have_posts() ): // Show slider if posts are not 1 or 0 ?>

	<script type="text/javascript">
		// Check if first slider image is loaded, and load flexslider on document ready
		jQuery(function($){
		 var firstImage = $('#flexslider-featured').find('img').filter(':first'),
			checkforloaded = setInterval(function() {
				var image = firstImage.get(0);
				if (image.complete || image.readyState == 'complete' || image.readyState == 4) {
					clearInterval(checkforloaded);

					$.when( $('#flexslider-featured').flexslider({
						animation: "slide",
						useCSS: false, // Fix iPad flickering issue
						directionNav: true,
						controlNav: true,
						pauseOnHover: true,
						animationSpeed: 400,
						smoothHeight: true,
            rtl: <?php echo json_encode( is_rtl() ) ?>,
						touch: <?php echo apply_filters('hu_flexslider_touch_support' , true); ?>,
						slideshow: <?php echo hu_is_checked('featured-slideshow') ? 'true' : 'false'; ?>,
						slideshowSpeed: <?php echo hu_get_option('featured-slideshow-speed', 5000); ?>,
					}) ).done( function() {
            var $_self = $(this);
                _trigger = function( $_self ) {
              $_self.trigger('featured-slider-ready');
            };
            _trigger = _.debounce( _trigger, 100 );
            _trigger( $_self );
          } );

				}
			}, 20);
		});
	</script>

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
<?php do_action( '__after_featured' ); ?>
