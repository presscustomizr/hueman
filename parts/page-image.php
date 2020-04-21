<?php if ( has_post_thumbnail() ): ?>
  <div class="page-image">
  	<div class="image-container">
  		<?php
      $image_size = hu_is_checked( 'singular-page-cropped-feat-img' ) ? 'thumb-large' : 'full';
      if( 'thumb-large' === $image_size && !function_exists('hu_limit_srcset_img_width_for_thumb_large') ) {
          // do not allow the browser to pick a size larger than 'thumb-large'
          function hu_limit_srcset_img_width_for_thumb_large() { return '720'; }
          // documented in wp-includes/media.php
          // april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
          add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_large' );
      }

      hu_the_post_thumbnail($image_size, '', false );//no attr and no placeholder
      if( 'thumb-large' === $image_size ) {
          remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_thumb_large' );
      }
      ?>
  		<?php
  			$caption = get_post(get_post_thumbnail_id())->post_excerpt;
  			$description = get_post(get_post_thumbnail_id())->post_content;
  			echo '<div class="page-image-text">';
  			if ( isset($caption) && $caption ) echo '<div class="caption">'.$caption.'</div>';
  			if ( isset($description) && $description ) echo '<div class="description"><i>'.$description.'</i></div>';
  			echo '</div>';
  		?>
  	</div>
  </div><!--/.page-image-->
<?php endif; ?>