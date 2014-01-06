<div class="sharrre-container">
	<span><?php _e('Share','hueman'); ?></span>
	<div id="twitter" data-url="<?php echo the_permalink(); ?>" data-text="<?php echo the_title(); ?>" data-title="Tweet"></div>
	<div id="facebook" data-url="<?php echo the_permalink(); ?>" data-text="<?php echo the_title(); ?>" data-title="Like"></div>
	<div id="googleplus" data-url="<?php echo the_permalink(); ?>" data-text="<?php echo the_title(); ?>" data-title="+1"></div>
	<div id="pinterest" data-url="<?php echo the_permalink(); ?>" data-text="<?php echo the_title(); ?>" data-title="Pin It"></div>
</div><!--/.sharrre-container-->

<script type="text/javascript">
	// Sharrre
	jQuery(document).ready(function(){
		jQuery('#twitter').sharrre({
			share: {
				twitter: true
			},
			template: '<a class="box" href="#"><div class="count" href="#">{total}</div><div class="share"><i class="fa fa-twitter"></i></div></a>',
			enableHover: false,
			enableTracking: true,
			buttons: { twitter: {via: '<?php echo ot_get_option('twitter-username'); ?>'}},
			click: function(api, options){
				api.simulateClick();
				api.openPopup('twitter');
			}
		});
		jQuery('#facebook').sharrre({
			share: {
				facebook: true
			},
			template: '<a class="box" href="#"><div class="count" href="#">{total}</div><div class="share"><i class="fa fa-facebook-square"></i></div></a>',
			enableHover: false,
			enableTracking: true,
			click: function(api, options){
				api.simulateClick();
				api.openPopup('facebook');
			}
		});
		jQuery('#googleplus').sharrre({
			share: {
				googlePlus: true
			},
			template: '<a class="box" href="#"><div class="count" href="#">{total}</div><div class="share"><i class="fa fa-google-plus-square"></i></div></a>',
			enableHover: false,
			enableTracking: true,
			urlCurl: '<?php echo get_template_directory_uri() .'/js/sharrre.php'; ?>',
			click: function(api, options){
				api.simulateClick();
				api.openPopup('googlePlus');
			}
		});
		jQuery('#pinterest').sharrre({
			share: {
				pinterest: true
			},
			template: '<a class="box" href="#" rel="nofollow"><div class="count" href="#">{total}</div><div class="share"><i class="fa fa-pinterest"></i></div></a>',
			enableHover: false,
			enableTracking: true,
			buttons: {
			pinterest: {
				description: '<?php echo the_title(); ?>'<?php if( has_post_thumbnail() ){ ?>,media: '<?php echo wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>'<?php } ?>
				}
			},
			click: function(api, options){
				api.simulateClick();
				api.openPopup('pinterest');
			}
		});
	});
</script>