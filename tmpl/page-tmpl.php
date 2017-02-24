<?php while ( have_posts() ): the_post(); ?>

  <article <?php post_class('group'); ?>>

    <?php hu_get_template_part('parts/page-image'); ?>

    <div class="entry themeform">
      <?php the_content(); ?>
      <div class="clear"></div>
    </div><!--/.entry-->

  </article>

  <?php if ( hu_is_checked('page-comments') ) { comments_template('/comments.php',true); } ?>

<?php endwhile; ?>