<?php
//do not remove this
load_template( get_template_directory() . '/functions/init-core.php' );

/**
* The best and safest way to extend the Humean WordPress theme with your own custom code is to create a child theme.
* You can add temporary code snippets and hacks to the current functions.php file, but unlike with a child theme, they will be lost on upgrade.
*
* If you don't know what a child theme is, you really want to spend 5 minutes learning how to use child themes in WordPress, you won't regret it :) !
* https://codex.wordpress.org/Child_Themes
*
*/


/* Testing purpose only */
/* if ( is_array(hu_get_option('body-background') ) )
  array_walk_recursive(hu_get_option('body-background', ) function(&$v) { $v = htmlspecialchars($v); }); */

add_action('__before_content', function() {
  ?>
    <pre>
      <?php print_r( hu_get_option('body-background') ); ?>
    </pre>
  <?php
  /* if ( is_array('social-links') )
    array_walk_recursive('social-links', function(&$v) { $v = htmlspecialchars($v); }); */
  ?>
    <pre>
      <?php print_r( hu_get_option('social-links') ); ?>
    </pre>
  <?php
});