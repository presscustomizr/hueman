<?php $layout = hu_layout_class(); ?>
<?php if ( $layout != 'col-1c'): ?>

	<div class="sidebar s1">

		<a class="sidebar-toggle" title="<?php _e('Expand Sidebar','hueman'); ?>"><i class="fa icon-sidebar-toggle"></i></a>

		<div class="sidebar-content">

			<?php if ( hu_is_checked('sidebar-top') ): ?>
  			<div class="sidebar-top group">
          <p><?php echo hu_has_social_links() ? __('Follow:','hueman') : '&nbsp;' ; ?></p>
          <?php hu_print_social_links() ; ?>
  			</div>
			<?php endif; ?>

			<?php if ( hu_get_option( 'post-nav' ) == 's1') { get_template_part('parts/post-nav'); } ?>

			<?php if( is_page_template('page-templates/child-menu.php') ): ?>
			<ul class="child-menu group">
				<?php wp_list_pages('title_li=&sort_column=menu_order&depth=3'); ?>
			</ul>
			<?php endif; ?>

			<?php hu_print_widgets_in_location('s1') ?>

		</div><!--/.sidebar-content-->

	</div><!--/.sidebar-->

	<?php
    if ( in_array( $layout, array('col-3cm', 'col-3cl', 'col-3cr' ) ) ) {
      get_template_part('sidebar-2');
    }
	?>

<?php endif; ?>