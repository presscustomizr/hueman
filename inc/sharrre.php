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
		
		<?php if ( ot_get_option( 'sharrre-scrollable' ) == 'on' ): ?>		
			// Scrollable sharrre bar, contributed by Erik Frye. Awesome!
			var shareContainer = jQuery(".sharrre-container"),
			header = jQuery('#header'),
			postEntry = jQuery('.entry'),
			$window = jQuery(window),
			distanceFromTop = 20,
			startSharePosition = shareContainer.offset(),
			contentBottom = postEntry.offset().top + postEntry.outerHeight(),
			topOfTemplate = header.offset().top;
			getTopSpacing();

			shareScroll = function(){
				if($window.width() > 719){	
					var scrollTop = $window.scrollTop() + topOfTemplate,
					stopLocation = contentBottom - (shareContainer.outerHeight() + topSpacing);
					if(scrollTop > stopLocation){
						shareContainer.offset({top: contentBottom - shareContainer.outerHeight(),left: startSharePosition.left});
					}
					else if(scrollTop >= postEntry.offset().top-topSpacing){
						shareContainer.offset({top: scrollTop + topSpacing, left: startSharePosition.left});
					}else if(scrollTop < startSharePosition.top+(topSpacing-1)){
						shareContainer.offset({top: startSharePosition.top,left:startSharePosition.left});
					}
				}
			},

			shareMove = function(){
				startSharePosition = shareContainer.offset();
				contentBottom = postEntry.offset().top + postEntry.outerHeight();
				topOfTemplate = header.offset().top;
				getTopSpacing();
			};

			/* As new images load the page content body gets longer. The bottom of the content area needs to be adjusted in case images are still loading. */
			setTimeout(function() {
				contentBottom = postEntry.offset().top + postEntry.outerHeight();
			}, 2000);

			if (window.addEventListener) {
				window.addEventListener('scroll', shareScroll, false);
				window.addEventListener('resize', shareMove, false);
			} else if (window.attachEvent) {
				window.attachEvent('onscroll', shareScroll);
				window.attachEvent('onresize', shareMove);
			}

			function getTopSpacing(){
				if($window.width() > 1024)
					topSpacing = distanceFromTop + jQuery('.nav-wrap').outerHeight();
				else
					topSpacing = distanceFromTop;
			}
		<?php endif; ?>
		
	});
</script>