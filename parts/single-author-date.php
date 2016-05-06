<?php
/*  Print the post author. Compatible with Google Structured data. Must be used in the WordPress loop
* @php return html string
/* ------------------------------------ */
?>
<p class="post-byline"><?php _e('by','hueman'); ?>
   <span class="vcard author">
     <span class="fn"><?php the_author_posts_link(); ?></span>
   </span> &middot;
    <?php if ( hu_is_checked('structured-data') ) : ?>
          <?php if( get_the_modified_date() != get_the_date() || get_the_modified_time() != get_the_time() ) : ?>
              <?php _e('Published', 'hueman'); ?> <time class="published" datetime="<?php the_date( get_option('date_format') ); ?>"><?php the_date( get_option('date_format') ); ?></time>
              &middot; <?php _e('Updated', 'hueman'); ?> <time class="updated" datetime="<?php the_modified_date( get_option('date_format') ); ?>"><?php the_modified_date( get_option('date_format') ); ?></time>
          <?php else : ?>
              <time class="published" datetime="<?php the_date( get_option('date_format') ); ?>"><?php the_date( get_option('date_format') ); ?></time>
          <?php endif; ?>
    <?php else : ?>
        <span class="published"><?php the_date( get_option('date_format') ); ?></span>
    <?php endif ?>
 </p>