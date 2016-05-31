<?php
/*  Print the post date. Compatible with Google Structured data. Must be used in the WordPress loop
* @php return html string
/* ------------------------------------ */
?>
<p class="post-date">
  <time class="published updated" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time( get_option('date_format') ); ?></time>
</p>

<?php if ( hu_is_checked('structured-data') ) : ?>
  <p class="post-byline" style="display:none">&nbsp;<?php _e('by','hueman'); ?>
    <span class="vcard author">
      <span class="fn"><?php the_author_posts_link(); ?></span>
    </span> &middot; Published <span class="published"><?php echo get_the_date( get_option('date_format') ); ?></span>
    <?php if( get_the_modified_date() != get_the_date() ) : ?> &middot; Last modified <span class="updated"><?php the_modified_date( get_option('date_format') ); ?></span><?php endif; ?>
  </p>
<?php endif ?>