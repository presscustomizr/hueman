<?php if ((category_description() != '') && !is_paged()) : ?>
  <div class="notebox">
    <?php echo category_description(); ?>
  </div>
<?php endif; ?>

<?php
  if ( have_posts() ) {
      hu_get_template_part( 'parts/post-list-articles' );
  }
?>