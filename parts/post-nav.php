<?php if ( is_single() ): ?>
	<ul class="post-nav group">
		<li class="next"><strong><?php _e('Next story', 'hueman'); ?>&nbsp;</strong><?php next_post_link('%link', '<i class="fas fa-chevron-right"></i><span>%title</span>'); ?></li>
		<li class="previous"><strong><?php _e('Previous story', 'hueman'); ?>&nbsp;</strong><?php previous_post_link('%link', '<i class="fas fa-chevron-left"></i><span>%title</span>'); ?></li>
	</ul>
<?php endif; ?>