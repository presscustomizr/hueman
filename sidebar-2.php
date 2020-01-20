<div class="sidebar s2 collapsed" data-position="<?php echo hu_get_sidebar_position( 's2' ); ?>" data-layout="<?php echo hu_get_layout_class(); ?>" data-sb-id="s2">

	<button class="sidebar-toggle" title="<?php _e('Expand Sidebar','hueman'); ?>"><i class="fas sidebar-toggle-arrows"></i></button>

	<div class="sidebar-content">

		<?php if ( hu_is_checked('sidebar-top') ): ?>
  		<div class="sidebar-top group">
        <?php
          // wp_kses_post() Sanitizes content for allowed HTML tags for post content.
          // see https://developer.wordpress.org/reference/functions/wp_kses_post/
          $sb_text = wp_kses_post( hu_get_option( 'secondary-sb-text' ) );
          if ( !empty( $sb_text ) ) {
              echo apply_filters( 'secondary_sb_text', sprintf( '<p>%1$s</p>', hu_get_option( 'secondary-sb-text' ) ) );
          }
        ?>
  		</div>
		<?php endif; ?>

		<?php if ( hu_get_option( 'post-nav' ) == 's2') { get_template_part('parts/post-nav'); } ?>

		<?php hu_print_widgets_in_location('s2') ?>

	</div><!--/.sidebar-content-->

</div><!--/.sidebar-->