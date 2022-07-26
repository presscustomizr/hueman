<?php if ( is_single() ): 
	ob_start();
	next_post_link('%link', '<i class="fas fa-chevron-right"></i><span>%title</span>');
	$next_link = ob_get_clean();

	ob_start();
	previous_post_link('%link', '<i class="fas fa-chevron-left"></i><span>%title</span>');
	$prev_link = ob_get_clean();
	?>
	<ul class="post-nav group">
		<?php if($next_link){ ?>
		<li class="next"><strong><?php _e('Next story', 'hueman'); ?>&nbsp;</strong><?php echo $next_link; ?></li>
		<?php }?>

		<?php if ($prev_link){ ?>
		<li class="previous"><strong><?php _e('Previous story', 'hueman'); ?>&nbsp;</strong><?php echo $prev_link; ?></li>
		<?php } ?>
	</ul>
<?php endif; ?>