<?php
/*  Print the post author. Compatible with Google Structured data. Must be used in the WordPress loop
* @php return html string
/* ------------------------------------ */
$display_author = hu_is_checked( 'post-meta-author' );
$display_date   = hu_is_checked( 'post-meta-date' );
//error_log( $display_author );
if ( ! ( $display_author || $display_date ) ) {
    return;
}
$published_date = get_the_date( get_option('date_format') );
$machine_readable_published_date = esc_attr( get_the_date( 'c' ) );
?>
<p class="post-byline">
<?php if ( $display_author ) :?>
   <?php _e('by','hueman'); ?>
   <span class="vcard author">
     <span class="fn"><?php the_author_posts_link(); ?></span>
   </span>
   <?php if ( $display_date ) :?>&middot;
    <?php endif; ?>
<?php endif; ?>
<?php if ( $display_date ) :?>
    <?php if ( hu_is_checked('structured-data') ) : ?>
          <?php if( get_the_modified_date() != get_the_date() || get_the_modified_time() != get_the_time() ) : ?>

              <?php
                $modified_date = get_the_modified_date( get_option('date_format') );
                $machine_readable_modified_date = esc_attr( get_the_modified_date( 'c' ) );
              ?>
              <?php _e('Published', 'hueman'); ?> <time class="published" datetime="<?php echo $machine_readable_published_date; ?>"><?php echo $published_date; ?></time>
              &middot; <?php _e('Updated', 'hueman'); ?> <time class="updated" datetime="<?php echo $machine_readable_modified_date; ?>"><?php echo $modified_date; ?></time>
          <?php else : ?>
              <time class="published" datetime="<?php echo $machine_readable_published_date; ?>"><?php echo $published_date; ?></time>
          <?php endif; ?>
    <?php else : ?>
        <span class="published"><?php echo $published_date; ?></span>
    <?php endif ?>
<?php endif; ?>
</p>