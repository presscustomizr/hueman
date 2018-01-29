<div class="sidebar s2 collapsed" data-position="<?php echo hu_get_sidebar_position( 's2' ); ?>" data-layout="<?php echo hu_get_layout_class(); ?>" data-sb-id="s2">

	<a class="sidebar-toggle" title="<?php _e('Expand Sidebar','hueman'); ?>"><i class="fas icon-sidebar-toggle"></i></a>

	<div class="sidebar-content">

		<?php if ( hu_is_checked('sidebar-top') ): ?>
  		<div class="sidebar-top group">
  			<p><?php _e('More','hueman'); ?></p>
  		</div>
		<?php endif; ?>

		<?php if ( hu_get_option( 'post-nav' ) == 's2') { get_template_part('parts/post-nav'); } ?>

		<?php hu_print_widgets_in_location('s2') ?>

	</div><!--/.sidebar-content-->

</div><!--/.sidebar-->