<?php while ( have_posts() ): the_post(); ?>
  <article <?php post_class(); ?>>
    <div class="post-inner group">

      <?php hu_get_template_part('parts/single-heading'); ?>

      <?php if( get_post_format() ) { get_template_part('parts/post-formats'); } ?>
      <?php // audio and image post formats historically display the post featured image ?>
      <?php if ( !has_post_format( 'audio' ) && !has_post_format( 'image' ) ) : ?>
        <?php if ( hu_is_checked( 'singular-post-featured-image' ) ) : ?>
            <div class="image-container">
              <?php if ( has_post_thumbnail() ) {
                $image_size = hu_is_checked( 'singular-post-cropped-feat-img' ) ? 'thumb-xxlarge' : 'full';
                 if( 'thumb-xxlarge' === $image_size && !function_exists('hu_limit_srcset_img_width_for_single_post') ) {
                    // do not allow the browser to pick a size larger than 'thumb-large'
                    function hu_limit_srcset_img_width_for_single_post() { return '1320'; }
                    // documented in wp-includes/media.php
                    // april 2020 : added for https://github.com/presscustomizr/hueman/issues/866
                    add_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_single_post' );
                }
                hu_the_post_thumbnail( $image_size, '', false);//no attr, no placeholder
                if( 'thumb-xxlarge' === $image_size ) {
                    remove_filter( 'max_srcset_image_width', 'hu_limit_srcset_img_width_for_single_post' );
                }
                $caption = get_post(get_post_thumbnail_id())->post_excerpt;
                if ( isset($caption) && $caption ) echo '<div class="image-caption">'.$caption.'</div>';
              } ?>
            </div>
        <?php endif; ?>
      <?php endif; ?>

      <div class="clear"></div>

      <div class="<?php echo implode( ' ', apply_filters( 'hu_single_entry_class', array('entry','themeform') ) ) ?>">
        <div class="entry-inner">
          <?php the_content(); ?>
          <nav class="pagination group">
            <?php
              //Checks for and uses wp_pagenavi to display page navigation for multi-page posts.
              if ( function_exists('wp_pagenavi') )
                wp_pagenavi( array( 'type' => 'multipart' ) );
              else
                wp_link_pages(array('before'=>'<div class="post-pages">'.__('Pages:','hueman'),'after'=>'</div>'));
            ?>
          </nav><!--/.pagination-->
        </div>

        <?php do_action( 'hu_after_single_entry_inner' ); ?>

        <div class="clear"></div>
      </div><!--/.entry-->

    </div><!--/.post-inner-->
  </article><!--/.post-->
<?php endwhile; ?>

<div class="clear"></div>

<?php
  if ( hu_is_checked( 'post-tags' ) ) {
    the_tags('<p class="post-tags"><span>'.__('Tags:','hueman').'</span> ','','</p>');
  }
?>

<?php if ( ( hu_is_checked( 'author-bio' ) ) && get_the_author_meta( 'description' ) ): ?>
  <div class="author-bio">
    <div class="bio-avatar"><?php echo get_avatar( get_the_author_meta('user_email'),'128' ); ?></div>
    <p class="bio-name"><?php the_author_meta('display_name'); ?></p>
    <p class="bio-desc"><?php the_author_meta('description'); ?></p>
    <div class="clear"></div>
  </div>
<?php endif; ?>

<?php if ( 'content' == hu_get_option( 'post-nav' ) ) { get_template_part( 'parts/post-nav' ); } ?>

<?php if ( apply_filters( 'hu_is_related_posts_enabled', '1' != hu_get_option( 'related-posts' ) ) ) { hu_get_template_part( 'parts/related-posts' ); } ?>

<?php if ( hu_is_checked('post-comments') ) { comments_template('/comments.php',true); } ?>