<?php
/*  Print the post date. Compatible with Google Structured data. Must be used in the WordPress loop
* @php return html string
/* ------------------------------------ */
?>
<p class="post-date">
  <time class="published updated" datetime="<?php the_time('Y-m-d H:i:s'); ?>"><?php the_time( apply_filters('hu_post_date_format', 'j M, Y' ) ); ?></time>
</p>

<?php if ( hu_is_checked('structured-data') ) : ?>
  <p class="post-byline" style="display:none"><?php _e('by','hueman'); ?>
    <span class="vcard author">
      <span class="fn"><a href="<?php get_the_author_link(); ?>" rel="author"><?php the_author() ?></a></span>
    </span> &middot; Published <span class="published"><?php the_date('F j, Y'); ?></span>
    <?php if( get_the_modified_date() != get_the_date() ) : ?> &middot; Last modified <span class="updated"><?php the_modified_date('F j, Y'); ?></span><?php endif; ?>
  </p>
<?php endif ?>