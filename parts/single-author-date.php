<?php
/*  Print the post author. Compatible with Google Structured data. Must be used in the WordPress loop
* @php return html string
/* ------------------------------------ */
?>


<!-- <p class="post-byline"><?php _e('by','hueman'); ?> <?php the_author_posts_link(); ?> &middot; <?php the_time(get_option('date_format')); ?></p> -->

<p class="post-byline"><?php _e('by','hueman'); ?>
   <span class="vcard author">
     <span class="fn"><?php the_author_posts_link(); ?></span>
   </span> &middot;
    <?php if ( hu_is_checked('structured-data') ) : ?>
          <?php if( get_the_modified_date() != get_the_date() || get_the_modified_time() != get_the_time() ) : ?>
              <?php _e('Published', 'hueman'); ?> <time class="published" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time(get_option('date_format')); ?></time>
              &middot; <?php _e('Updated', 'hueman'); ?> <time class="updated" datetime="<?php the_modified_time('Y-m-d H:i:s'); ?>"><?php the_modified_time('F j, Y'); ?></time>
          <?php else : ?>
              <time class="published" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time(get_option('date_format')); ?></time>
          <?php endif; ?>
    <?php else : ?>
        <span class="published"><?php the_date('F j, Y'); ?></span>
    <?php endif ?>
 </p>
