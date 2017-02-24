<?php while ( have_posts() ): the_post(); ?>
  <article <?php post_class(); ?>>
    <div class="post-inner group">

      <?php hu_get_template_part('parts/single-heading'); ?>

      <?php if( get_post_format() ) { get_template_part('parts/post-formats'); } ?>

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

<?php the_tags('<p class="post-tags"><span>'.__('Tags:','hueman').'</span> ','','</p>'); ?>

<?php if ( ( hu_is_checked( 'author-bio' ) ) && get_the_author_meta( 'description' ) ): ?>
  <div class="author-bio">
    <div class="bio-avatar"><?php echo get_avatar(get_the_author_meta('user_email'),'128'); ?></div>
    <p class="bio-name"><?php the_author_meta('display_name'); ?></p>
    <p class="bio-desc"><?php the_author_meta('description'); ?></p>
    <div class="clear"></div>
  </div>
<?php endif; ?>

<?php if ( 'content' == hu_get_option( 'post-nav' ) ) { get_template_part('parts/post-nav'); } ?>

<?php if ( '1' != hu_get_option( 'related-posts' ) ) { get_template_part('parts/related-posts'); } ?>

<?php if ( hu_is_checked('post-comments') ) { comments_template('/comments.php',true); } ?>