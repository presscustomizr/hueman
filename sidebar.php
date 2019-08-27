<?php $layout = hu_get_layout_class(); ?>
<?php if ( $layout != 'col-1c'): ?>

	<div class="sidebar s1 collapsed" data-position="<?php echo hu_get_sidebar_position( 's1' ); ?>" data-layout="<?php echo $layout ?>" data-sb-id="s1">

		<button class="sidebar-toggle" title="<?php _e('Expand Sidebar','hueman'); ?>"><i class="fas icon-sidebar-toggle"></i></button>

		<div class="sidebar-content">

			<?php if ( hu_is_checked('sidebar-top') ): ?>
  			<div class="sidebar-top group">
          <?php if ( hu_has_social_links() ) : ?>
              <p><?php _e('Follow:','hueman'); ?></p>
          <?php else : //if not customizing, display an empty p for design purposes ?>
              <?php if ( hu_user_can_see_customize_notices_on_front() ) : ?>
                  <?php
                    printf( '<p style="text-transform:none;font-size: 0.8em;">%1$s. <a style="color: white;text-decoration:underline;" href="%2$s" title="%3$s">%3$s &raquo;</a></p>',
                        __('You can set your social links here from the live customizer', 'hueman'),
                        admin_url( 'customize.php?autofocus[section]=social_links_sec' ),
                        __('Customize now', 'hueman')
                    );
                  ?>
              <?php elseif ( ! is_user_logged_in() ) : ?>
                  <?php printf('<p>&nbsp;</p>'); ?>
              <?php endif; ?>
          <?php endif; ?>

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